import { useFrame, useThree } from "@react-three/fiber";
import { useCallback, useEffect, useRef } from "react";
import * as THREE from "three";
import { FADE_MS } from "./constants";

const FADE_S = FADE_MS / 1000;
const _p = new THREE.Vector3();
const _dir = new THREE.Vector3();

type OrbitLike = {
	enabled: boolean;
	target: THREE.Vector3;
	update: () => void;
};

// Eases a material's opacity toward `goal` at a fixed rate (FADE_S to cross the
// full 0..1 range). Materials should start at opacity 0 so they fade in on mount.
//
// `opaqueWhenDone` is for meshes that are meant to be solid once faded in: a
// `transparent` material stays in three.js's transparent queue even at full
// opacity, where it is sorted against the other transparent meshes rather than
// drawn first. Clearing the flag on arrival puts it back in the opaque pass, so
// translucent pieces blend over it correctly from every angle.
export function useFade(
	ref: { current: THREE.Material | null },
	goal: number,
	opaqueWhenDone = false,
) {
	useFrame((_, delta) => {
		const m = ref.current;
		if (!m) return;
		const step = delta / FADE_S;
		const d = goal - m.opacity;
		m.opacity += Math.abs(d) <= step ? d : Math.sign(d) * step;
		if (opaqueWhenDone) {
			const wantTransparent = m.opacity < 1;
			if (m.transparent !== wantTransparent) {
				m.transparent = wantTransparent;
				m.needsUpdate = true;
			}
		}
	});
}

// Drives the canvas cursor: `grab` while hovering a live draggable, `grabbing`
// while dragging it. Resets on pointer release and on unmount so a mid-drag
// commit (which unmounts the active DragControls) never leaves it stuck.
export function useGrabCursor(enabled: boolean) {
	const gl = useThree((s) => s.gl.domElement);
	const dragging = useRef(false);
	const hovering = useRef(false);
	const apply = useCallback(() => {
		gl.style.cursor = dragging.current
			? "grabbing"
			: hovering.current
				? "grab"
				: "";
	}, [gl]);
	useEffect(() => {
		const up = () => {
			if (dragging.current) {
				dragging.current = false;
				apply();
			}
		};
		window.addEventListener("pointerup", up);
		return () => {
			window.removeEventListener("pointerup", up);
			dragging.current = false;
			hovering.current = false;
			gl.style.cursor = "";
		};
	}, [apply, gl]);
	return {
		onHover: (h: boolean) => {
			if (!enabled) return;
			hovering.current = h;
			apply();
		},
		onDragStart: () => {
			dragging.current = true;
			apply();
		},
	};
}

// Per-view depth sort for interpenetrating translucent meshes that tile a volume
// (share faces, no overlap): set renderOrder from the distance between a chosen
// local reference point and the camera so the nearer mesh draws last (on top).
// With depthWrite off this gives correct blending from every angle.
export function useDepthSort(
	ref: { current: THREE.Mesh | null },
	localPoint: THREE.Vector3,
) {
	const camera = useThree((s) => s.camera);
	useFrame(() => {
		const m = ref.current;
		if (!m) return;
		_p.copy(localPoint);
		m.localToWorld(_p);
		m.renderOrder = -_p.distanceTo(camera.position);
	});
}

// A step commits mid-drag, which unmounts the active DragControls before its
// drag-end fires — so it never re-enables OrbitControls, leaving it stuck off.
// Re-enable on the next pointer release instead: this keeps the camera from
// hijacking the still-held pointer at the moment of commit, and restores it once
// the user lets go, ready for a fresh click.
export function useOrbitAutoEnable() {
	const controls = useThree((s) => s.controls) as OrbitLike | null;
	useEffect(() => {
		if (!controls) return;
		const enable = () => {
			controls.enabled = true;
		};
		window.addEventListener("pointerup", enable);
		return () => window.removeEventListener("pointerup", enable);
	}, [controls]);
}

// Eases the orbit framing toward a target pivot height + camera distance,
// preserving the user's current view direction (only pivot y and distance
// change). Starts from wherever the camera currently is, so it always eases in
// smoothly and re-triggers whenever the target changes.
export function useOrbitFraming(targetY: number, targetDist: number) {
	const controls = useThree((s) => s.controls) as OrbitLike | null;
	const camera = useThree((s) => s.camera);
	const frame = useRef<{ y: number; dist: number } | null>(null);
	const animating = useRef(true);
	useEffect(() => {
		animating.current = true;
	}, [targetY, targetDist]);
	useFrame(() => {
		if (!animating.current || !controls) return;
		if (!frame.current) {
			frame.current = {
				y: controls.target.y,
				dist: camera.position.distanceTo(controls.target),
			};
		}
		const f = frame.current;
		f.y += (targetY - f.y) * 0.12;
		f.dist += (targetDist - f.dist) * 0.12;
		_dir.copy(camera.position).sub(controls.target).normalize();
		controls.target.set(0, f.y, 0);
		camera.position.copy(controls.target).addScaledVector(_dir, f.dist);
		controls.update();
		if (Math.abs(targetY - f.y) < 0.002 && Math.abs(targetDist - f.dist) < 0.01) {
			animating.current = false;
		}
	});
}
