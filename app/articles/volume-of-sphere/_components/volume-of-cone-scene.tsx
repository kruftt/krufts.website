"use client";

import { DragControls, OrbitControls } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { type Ref, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { cn } from "@/lib/utils";
import {
	createCageGeometry,
	createPyramidEdges,
	createRigidPyramidGeometry,
	createSolidGeometry,
	diagonalQuaternion,
	HEIGHT,
	RADIUS,
	ringScale,
	STAGE_HEIGHT,
	updateCage,
	updatePyramidEdges,
	updateSolid,
} from "./geometry";
import {
	useDepthSort,
	useFade,
	useGrabCursor,
	useOrbitAutoEnable,
	useOrbitFraming,
} from "./scene-hooks";
import {
	DONE_CAPTION,
	FADE_MS,
	STEP_CAPTIONS,
	STEP_COUNT,
} from "./step-sequence";

// ---- tuning -----------------------------------------------------------------
const COMMIT = 0.985; // morph progress that locks a step
const SEAT_EPS = 0.03; // how close to the seat counts as "dropped in"
const HANDLE_COLOR = "#eab308";
const SOLID_COLOR = "#3b82f6";
const COPY1_COLOR = "#10b981";
const COPY2_COLOR = "#f59e0b";
const CAGE_COLOR = "#334155";
const FILL_OPACITY = 0.55;
const HANDLE_OPACITY = 1;

const ONE = new THREE.Vector3(1, 1, 1);
// The area-preserving morph enlarges the circle, so its edge (where the step-1
// handle rests at squareness 0) sits at this radius; it drags out to the square
// corner at RADIUS * sqrt2 (squareness 1).
const EDGE_R = RADIUS * ringScale(0);
const _v = new THREE.Vector3();
const _out = new THREE.Vector3();

// The cube corner each pyramid fills — where three of its faces coincide with
// three cube faces. In every pyramid's local frame (apex at the origin) this is
// straight down from the apex. Distance from this corner to the camera orders
// the tiling pyramids correctly from any viewpoint (their centroids sit too
// close together near the cube centre to disambiguate).
const LOCAL_SORT_CORNER = new THREE.Vector3(0, -HEIGHT, 0);

function clamp01(x: number) {
	return Math.min(1, Math.max(0, x));
}

// The shared translucent pyramid fill (no depth write, so overlapping copies
// blend rather than occlude — see useDepthSort for the ordering).
function FillMaterial({
	color,
	opacity,
	matRef,
}: {
	color: string;
	opacity: number;
	matRef?: Ref<THREE.Material>;
}) {
	return (
		<meshStandardMaterial
			ref={matRef}
			color={color}
			transparent
			opacity={opacity}
			side={THREE.DoubleSide}
			depthWrite={false}
		/>
	);
}

// Orbit pivot height + camera distance to ease toward at the start of each step.
// Step 1 pulls in on the cone; step 3 pulls out and raises the pivot to the top
// of the box, balancing the seated pyramids below with the copy floating above.
function framingFor(step: number): { y: number; dist: number } {
	if (step <= 0) return { y: HEIGHT / 2, dist: 4.8 };
	if (step === 1) return { y: HEIGHT / 2, dist: 6 };
	// Complete: nothing floats above anymore, so recenter on the cube.
	if (step >= STEP_COUNT) return { y: HEIGHT / 2, dist: 6 };
	// Steps 3-4: pivot raised to the top of the box to balance the floating copy.
	return { y: HEIGHT, dist: 8.5 };
}

// A small draggable sphere confined to a horizontal plane. `project` maps the
// raw drag-plane point to a constrained handle position (written to `out`) and
// returns the [0,1] progress for that position — this is where step 1's radial
// lock lives. autoTransform is off so we own the handle's position.
function MorphHandle({
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
	useFade(matRef, fadingOut ? 0 : HANDLE_OPACITY);
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
				<meshStandardMaterial
					ref={matRef}
					color={HANDLE_COLOR}
					emissive={HANDLE_COLOR}
					emissiveIntensity={0.4}
					transparent
					opacity={0}
				/>
			</mesh>
		</DragControls>
	);
}

// A rigid pyramid copy that the reader drags straight down into its cube slot.
function DropPyramid({
	geometry,
	edges,
	quaternion,
	apex,
	color,
	active,
	onSeated,
}: {
	geometry: THREE.BufferGeometry;
	edges: THREE.BufferGeometry;
	quaternion: THREE.Quaternion;
	apex: THREE.Vector3;
	color: string;
	active: boolean;
	onSeated: () => void;
}) {
	const groupRef = useRef<THREE.Group>(null);
	const meshRef = useRef<THREE.Mesh>(null);
	const matRef = useRef<THREE.Material>(null);
	const done = useRef(false);
	const cursor = useGrabCursor(active);
	useDepthSort(meshRef, LOCAL_SORT_CORNER);
	useFade(matRef, FILL_OPACITY);
	const initial = useMemo(
		() =>
			new THREE.Matrix4().compose(
				new THREE.Vector3(apex.x, HEIGHT + STAGE_HEIGHT, apex.z),
				quaternion,
				ONE,
			),
		[quaternion, apex],
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
				[apex.x, apex.x],
				[HEIGHT, HEIGHT + STAGE_HEIGHT],
				[apex.z, apex.z],
			]}
			onDrag={(local) => {
				_v.setFromMatrixPosition(local);
				if (!done.current && _v.y <= HEIGHT + SEAT_EPS) {
					done.current = true;
					const g = groupRef.current;
					if (g) {
						g.matrix.setPosition(apex.x, HEIGHT, apex.z);
						g.updateMatrixWorld(true);
					}
					onSeated();
				}
			}}
		>
			<mesh ref={meshRef} geometry={geometry}>
				<FillMaterial color={color} opacity={0} matRef={matRef} />
			</mesh>
			<lineSegments geometry={edges}>
				<lineBasicMaterial color={CAGE_COLOR} />
			</lineSegments>
		</DragControls>
	);
}

function Scene({
	currentStep,
	committing,
	onAdvance,
}: {
	currentStep: number;
	committing: boolean;
	onAdvance: () => void;
}) {
	const solidGeom = useMemo(() => createSolidGeometry(), []);
	const cageGeom = useMemo(() => createCageGeometry(), []);
	const pyramidEdges = useMemo(() => createPyramidEdges(), []);

	// The top corner the apex is dropped into (chosen at step-2 commit). Its body
	// diagonal is the axis the two copies rotate about. Defaults to (+,+).
	const [corner, setCorner] = useState({ sx: 1, sz: 1 });
	const cornerVec = useMemo(
		() => new THREE.Vector3(corner.sx * RADIUS, HEIGHT, corner.sz * RADIUS),
		[corner],
	);
	const rigidGeom = useMemo(
		() => createRigidPyramidGeometry(cornerVec),
		[cornerVec],
	);
	const rigidEdges = useMemo(
		() => new THREE.EdgesGeometry(rigidGeom),
		[rigidGeom],
	);
	const axis = useMemo(
		() => new THREE.Vector3(corner.sx, 1, corner.sz).normalize(),
		[corner],
	);
	const q1 = useMemo(() => diagonalQuaternion(1, axis), [axis]);
	const q2 = useMemo(() => diagonalQuaternion(2, axis), [axis]);

	// Live morph parameters, driven imperatively by the drag handles.
	const squareness = useRef(0);
	const apex = useRef({ x: 0, z: 0 });

	// Rigid pyramid #1 (steps 3-4) participates in the same per-view depth sort.
	const solidMeshRef = useRef<THREE.Mesh>(null);
	useDepthSort(solidMeshRef, LOCAL_SORT_CORNER);

	useOrbitAutoEnable();
	const framing = framingFor(currentStep);
	useOrbitFraming(framing.y, framing.dist);

	useFrame(() => {
		updateSolid(solidGeom, squareness.current, apex.current.x, apex.current.z);
		updateCage(cageGeom, squareness.current);
		updatePyramidEdges(
			pyramidEdges,
			squareness.current,
			apex.current.x,
			apex.current.z,
		);
	});

	const step1Initial = useMemo(() => {
		const r = EDGE_R * Math.SQRT1_2;
		return new THREE.Matrix4().setPosition(r, 0, r);
	}, []);
	const step2Initial = useMemo(
		() => new THREE.Matrix4().setPosition(0, HEIGHT, 0),
		[],
	);

	return (
		<>
			<ambientLight intensity={0.75} />
			<directionalLight position={[5, 8, 4]} intensity={0.9} />
			<OrbitControls
				makeDefault
				enablePan={false}
				enableZoom
				target={[0, HEIGHT / 2, 0]}
				minDistance={4}
				maxDistance={12}
			/>

			{/* Steps 1-2: the live morphing solid (cone -> leaning pyramid). Its
			    mesh sits at the world origin, but that's fine here since nothing
			    else overlaps it yet. */}
			{currentStep < 2 && (
				<mesh geometry={solidGeom}>
					<FillMaterial color={SOLID_COLOR} opacity={FILL_OPACITY} />
				</mesh>
			)}
			<lineSegments geometry={cageGeom}>
				<lineBasicMaterial color={CAGE_COLOR} />
			</lineSegments>
			{currentStep === 1 && (
				<lineSegments geometry={pyramidEdges}>
					<lineBasicMaterial color={CAGE_COLOR} />
				</lineSegments>
			)}

			{/* Steps 3-4: pyramid #1 is now the corner pyramid, geometrically
			    identical to a copy. Render it the same way (a rigid group anchored
			    at the shared apex V) so all three transparent pyramids sort from the
			    same origin — no blend-order flipping or flashing. */}
			{currentStep >= 2 && (
				<group position={[cornerVec.x, cornerVec.y, cornerVec.z]}>
					<mesh ref={solidMeshRef} geometry={rigidGeom}>
						<FillMaterial color={SOLID_COLOR} opacity={FILL_OPACITY} />
					</mesh>
					<lineSegments geometry={rigidEdges}>
						<lineBasicMaterial color={CAGE_COLOR} />
					</lineSegments>
				</group>
			)}

			{currentStep === 0 && (
				<MorphHandle
					initial={step1Initial}
					project={(intended, out) => {
						// Lock to the 45-degree radial line: project onto it, clamp the
						// radius between the circle edge (EDGE_R) and the square corner
						// (R*sqrt2), and map that span to squareness.
						const radius = Math.min(
							RADIUS * Math.SQRT2,
							Math.max(EDGE_R, (intended.x + intended.z) * Math.SQRT1_2),
						);
						out.set(radius * Math.SQRT1_2, 0, radius * Math.SQRT1_2);
						const s = clamp01(
							(radius - EDGE_R) / (RADIUS * Math.SQRT2 - EDGE_R),
						);
						squareness.current = s;
						return s;
					}}
					onCommit={() => {
						squareness.current = 1;
						onAdvance();
					}}
					fadingOut={committing}
				/>
			)}

			{currentStep === 1 && (
				<MorphHandle
					initial={step2Initial}
					project={(intended, out) => {
						// The apex may travel anywhere across the top face, toward any
						// of the four corners.
						const x = Math.min(RADIUS, Math.max(-RADIUS, intended.x));
						const z = Math.min(RADIUS, Math.max(-RADIUS, intended.z));
						out.set(x, HEIGHT, z);
						apex.current = { x, z };
						return clamp01(Math.hypot(x, z) / (RADIUS * Math.SQRT2));
					}}
					onCommit={() => {
						const sx = apex.current.x >= 0 ? 1 : -1;
						const sz = apex.current.z >= 0 ? 1 : -1;
						apex.current = { x: sx * RADIUS, z: sz * RADIUS };
						setCorner({ sx, sz });
						onAdvance();
					}}
					fadingOut={committing}
				/>
			)}

			{currentStep >= 2 && (
				<DropPyramid
					geometry={rigidGeom}
					edges={rigidEdges}
					quaternion={q1}
					apex={cornerVec}
					color={COPY1_COLOR}
					active={currentStep === 2}
					onSeated={onAdvance}
				/>
			)}
			{currentStep >= 3 && (
				<DropPyramid
					geometry={rigidGeom}
					edges={rigidEdges}
					quaternion={q2}
					apex={cornerVec}
					color={COPY2_COLOR}
					active={currentStep === 3}
					onSeated={onAdvance}
				/>
			)}
		</>
	);
}

export default function VolumeOfConeScene({
	className,
}: {
	className?: string;
}) {
	const [currentStep, setCurrentStep] = useState(0);
	const [committing, setCommitting] = useState(false);
	const [nonce, setNonce] = useState(0);

	// On commit, hold the step for one fade so the outgoing handle fades out
	// before the next step's handle / copies fade in.
	const advance = () => {
		setCommitting(true);
		window.setTimeout(() => {
			setCurrentStep((s) => Math.min(STEP_COUNT, s + 1));
			setCommitting(false);
		}, FADE_MS);
	};
	const reset = () => {
		setCurrentStep(0);
		setCommitting(false);
		setNonce((n) => n + 1);
	};

	const done = currentStep >= STEP_COUNT;
	const caption = done ? DONE_CAPTION : STEP_CAPTIONS[currentStep];

	return (
		<div className={cn("select-none", className)}>
			<div className="m-auto w-full max-w-160 aspect-4/3 rounded-xl bg-white text-[#111] overflow-hidden">
				<Canvas
					key={nonce}
					// Default affordance: drag anywhere to orbit. `cursor` inherits, so
					// useGrabCursor's inline canvas style overrides this over a handle
					// and falls back to it elsewhere.
					className="cursor-all-scroll"
					gl={{ antialias: true }}
					camera={{ position: [-0.9, 2.5, 2.6], fov: 45 }}
				>
					<Scene
						currentStep={currentStep}
						committing={committing}
						onAdvance={advance}
					/>
				</Canvas>
			</div>

			<div className="mt-6 flex items-center justify-center gap-3">
				{STEP_CAPTIONS.map((cap, i) => (
					<div
						key={cap}
						className={cn(
							"w-3 h-3 rounded-md outline-2 outline-black transition-colors",
							i < currentStep ? "bg-black" : "bg-transparent",
							i === currentStep ? "outline-dashed" : "",
						)}
					/>
				))}
			</div>

  		<p className="mt-4 text-center min-h-[3em]">{caption}</p>

			<div className="flex justify-center">
				<button
					type="button"
					onClick={reset}
					className={cn(
						"border border-gray-400 pt-1 pb-1 pl-3 pr-3 rounded-lg",
						"bg-primary-foreground hover:bg-accent active:bg-muted cursor-pointer",
					)}
				>
					Reset
				</button>
			</div>
		</div>
	);
}
