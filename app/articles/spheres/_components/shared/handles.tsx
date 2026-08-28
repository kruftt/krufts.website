import { DragControls } from "@react-three/drei";
import { type ReactNode, useMemo, useRef } from "react";
import * as THREE from "three";
import { COMMIT, SEAT_EPS } from "./constants";
import { HandleMaterial, HANDLE_OPACITY } from "./materials";
import { useFade, useGrabCursor } from "./scene-hooks";

const ONE = new THREE.Vector3(1, 1, 1);
const NO_ROTATION = new THREE.Quaternion();
const _v = new THREE.Vector3();
const _out = new THREE.Vector3();

// A small draggable sphere confined to a horizontal plane. `project` maps the
// raw drag-plane point to a constrained handle position (written to `out`) and
// returns the [0,1] progress for that position — this is where a step's motion
// lock lives. autoTransform is off so we own the handle's position.
export function MorphHandle({
	initial,
	project,
	onCommit,
	fadingOut,
}: {
	initial: THREE.Matrix4;
	project: (intended: THREE.Vector3, out: THREE.Vector3) => number;
	onCommit: () => void;
	fadingOut: boolean;
}) {
	const groupRef = useRef<THREE.Group>(null);
	const matRef = useRef<THREE.Material>(null);
	const done = useRef(false);
	const cursor = useGrabCursor(!fadingOut);
	// Fades in on mount; fades out once its step commits and starts transitioning.
	// Opaque in between: see RingHandle for why that matters.
	useFade(matRef, fadingOut ? 0 : HANDLE_OPACITY, true);
	return (
		<DragControls
			ref={groupRef}
			matrix={initial}
			autoTransform={false}
			axisLock="y"
			dragConfig={{ enabled: !fadingOut }}
			onHover={cursor.onHover}
			onDragStart={cursor.onDragStart}
			onDrag={(local) => {
				_v.setFromMatrixPosition(local);
				const p = project(_v, _out);
				const g = groupRef.current;
				if (g) {
					g.matrix.setPosition(_out.x, _out.y, _out.z);
					g.updateMatrixWorld(true);
				}
				if (!done.current && p >= COMMIT) {
					done.current = true;
					onCommit();
				}
			}}
		>
			<mesh>
				<sphereGeometry args={[0.11, 24, 24]} />
				<HandleMaterial matRef={matRef} />
			</mesh>
		</DragControls>
	);
}

// ---- Ring handle -------------------------------------------------------------
// A torus lying in a horizontal plane, centred on the y axis, whose *radius* is
// the thing being dragged rather than its position. It collapses to a small knot
// on the axis at progress 0 and opens out to `maxRadius` at progress 1.

const TUBE = 0.06;
const RING_SEG = 48;
const TUBE_SEG = 12;

const TUBE_COS = new Float32Array(TUBE_SEG);
const TUBE_SIN = new Float32Array(TUBE_SEG);
for (let j = 0; j < TUBE_SEG; j++) {
	const v = (j / TUBE_SEG) * Math.PI * 2;
	TUBE_COS[j] = Math.cos(v);
	TUBE_SIN[j] = Math.sin(v);
}
const RING_COS = new Float32Array(RING_SEG);
const RING_SIN = new Float32Array(RING_SEG);
for (let i = 0; i < RING_SEG; i++) {
	const u = (i / RING_SEG) * Math.PI * 2;
	RING_COS[i] = Math.cos(u);
	RING_SIN[i] = Math.sin(u);
}

function createRingGeometry(): THREE.BufferGeometry {
	const geom = new THREE.BufferGeometry();
	const count = RING_SEG * TUBE_SEG;
	geom.setAttribute(
		"position",
		new THREE.BufferAttribute(new Float32Array(count * 3), 3),
	);

	const normals = new Float32Array(count * 3);
	const index: number[] = [];
	for (let i = 0; i < RING_SEG; i++) {
		const iNext = (i + 1) % RING_SEG;
		for (let j = 0; j < TUBE_SEG; j++) {
			const jNext = (j + 1) % TUBE_SEG;
			const n = (i * TUBE_SEG + j) * 3;
			// A torus normal depends only on the two angles, not on the ring radius,
			// so it is written once here and left alone while the ring grows.
			normals[n] = TUBE_COS[j] * RING_COS[i];
			normals[n + 1] = TUBE_SIN[j];
			normals[n + 2] = TUBE_COS[j] * RING_SIN[i];

			const a = i * TUBE_SEG + j;
			const b = iNext * TUBE_SEG + j;
			const c = iNext * TUBE_SEG + jNext;
			const d = i * TUBE_SEG + jNext;
			index.push(a, d, c, a, c, b);
		}
	}
	geom.setAttribute("normal", new THREE.BufferAttribute(normals, 3));
	geom.setIndex(index);

	updateRingGeometry(geom, 0);
	return geom;
}

function updateRingGeometry(geom: THREE.BufferGeometry, radius: number): void {
	const pos = geom.attributes.position.array as Float32Array;
	for (let i = 0; i < RING_SEG; i++) {
		for (let j = 0; j < TUBE_SEG; j++) {
			const r = radius + TUBE * TUBE_COS[j];
			const n = (i * TUBE_SEG + j) * 3;
			pos[n] = r * RING_COS[i];
			pos[n + 1] = TUBE * TUBE_SIN[j];
			pos[n + 2] = r * RING_SIN[i];
		}
	}
	geom.attributes.position.needsUpdate = true;
	// This is a drag target that changes size, so its bounds have to keep up — a
	// stale bounding sphere would make the raycast miss the grown ring.
	geom.computeBoundingSphere();
}

export function RingHandle({
	y,
	maxRadius,
	onProgress,
	onCommit,
	fadingOut,
}: {
	y: number;
	maxRadius: number;
	onProgress: (progress: number) => void;
	onCommit: () => void;
	fadingOut: boolean;
}) {
	const matRef = useRef<THREE.Material>(null);
	const done = useRef(false);
	const radius = useRef(0);
	// Where the pointer took hold: the radial direction it grabbed from and the
	// ring radius at that moment. `fromAxis` marks a grab on the collapsed knot,
	// which has no meaningful radial direction to measure against.
	const grab = useRef({ ux: 0, uz: 0, radius: 0, fromAxis: true });
	const cursor = useGrabCursor(!fadingOut);
	const geom = useMemo(() => createRingGeometry(), []);
	const initial = useMemo(() => new THREE.Matrix4().setPosition(0, y, 0), [y]);
	// A handle at rest is fully opaque, so `opaqueWhenDone` moves it into the
	// opaque pass once it has faded in. Left in the transparent queue it would be
	// sorted against the translucent solids by object origin rather than per
	// fragment, and the ring's origin sits directly above the solid's — a near tie
	// that flips back and forth as the camera crosses the ring's own height.
	// Opaque, it writes depth and draws first, so the solids blend over it
	// correctly from every angle.
	useFade(matRef, fadingOut ? 0 : HANDLE_OPACITY, true);

	const apply = (r: number) => {
		radius.current = r;
		updateRingGeometry(geom, r);
		onProgress(r / maxRadius);
	};

	return (
		<DragControls
			matrix={initial}
			autoTransform={false}
			axisLock="y"
			dragConfig={{ enabled: !fadingOut }}
			onHover={cursor.onHover}
			onDragStart={cursor.onDragStart}
			onDrag={(local) => {
				// Once committed the ring is locked fully open. DragControls goes on
				// reporting drags until the pointer is released, and the commit fires at
				// COMMIT rather than at 1, so taking those would wind the shape back off
				// its finished state — leaving the reader's next step fitted to a shape
				// that is a fraction short.
				if (done.current) return;
				// The group never moves, so what DragControls calls the intended
				// position is really the pointer's displacement across the drag plane
				// from the point where it took hold of the ring. Resolving that along
				// the grab direction gives the change in radius, which works from any
				// side of the ring and ignores motion along it.
				_v.setFromMatrixPosition(local);
				const g = grab.current;
				const r = g.fromAxis
					? Math.hypot(_v.x, _v.z)
					: g.radius + _v.x * g.ux + _v.z * g.uz;
				const clamped = Math.min(maxRadius, Math.max(0, r));
				apply(clamped);
				if (!done.current && clamped / maxRadius >= COMMIT) {
					done.current = true;
					apply(maxRadius);
					onCommit();
				}
			}}
		>
			<mesh
				geometry={geom}
				onPointerDown={(e) => {
					// DragControls reports displacement only, so the direction the ring
					// was grabbed from has to come from the hit point. The ring is
					// centred on the world y axis, so its own x/z are the radial offset.
					// Within a tube radius of the axis that direction is noise, and the
					// ring is a knot anyway, so fall back to plain distance dragged.
					const h = Math.hypot(e.point.x, e.point.z);
					const fromAxis = h <= TUBE;
					grab.current = {
						ux: fromAxis ? 0 : e.point.x / h,
						uz: fromAxis ? 0 : e.point.z / h,
						radius: radius.current,
						fromAxis,
					};
				}}
			>
				<HandleMaterial matRef={matRef} />
			</mesh>
		</DragControls>
	);
}

// A rigid piece that the reader drags straight down into its slot: it starts
// `stageHeight` above `seat`, is pinned to that vertical line, and calls
// `onSeated` once it arrives. Owns only the drag; `children` supply the body.
export function DropSolid({
	seat,
	stageHeight,
	quaternion,
	active,
	onSeated,
	children,
}: {
	seat: THREE.Vector3;
	stageHeight: number;
	quaternion?: THREE.Quaternion;
	active: boolean;
	onSeated: () => void;
	children: ReactNode;
}) {
	const groupRef = useRef<THREE.Group>(null);
	const done = useRef(false);
	const cursor = useGrabCursor(active);
	const initial = useMemo(
		() =>
			new THREE.Matrix4().compose(
				new THREE.Vector3(seat.x, seat.y + stageHeight, seat.z),
				quaternion ?? NO_ROTATION,
				ONE,
			),
		[seat, stageHeight, quaternion],
	);
	return (
		<DragControls
			ref={groupRef}
			matrix={initial}
			autoTransform
			dragConfig={{ enabled: active }}
			onHover={cursor.onHover}
			onDragStart={cursor.onDragStart}
			dragLimits={[
				[seat.x, seat.x],
				[seat.y, seat.y + stageHeight],
				[seat.z, seat.z],
			]}
			onDrag={(local) => {
				_v.setFromMatrixPosition(local);
				if (!done.current && _v.y > seat.y + SEAT_EPS) return;
				// Once seated, stay seated. DragControls goes on writing the pointer's
				// position into the matrix until the pointer is released, so re-pinning
				// every frame is what stops the piece being left hanging just short of
				// its slot depending on where the pointer happened to stop.
				const g = groupRef.current;
				if (g) {
					g.matrix.setPosition(seat.x, seat.y, seat.z);
					g.updateMatrixWorld(true);
				}
				if (!done.current) {
					done.current = true;
					onSeated();
				}
			}}
		>
			{children}
		</DragControls>
	);
}
