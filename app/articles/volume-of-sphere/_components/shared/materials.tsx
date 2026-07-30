import type { Ref } from "react";
import * as THREE from "three";

// SOLID is the piece the reader reshapes; PIECE_A / PIECE_B are the pieces added
// on top of it afterwards (the two pyramid copies in the cone proof).
const CAGE_COLOR = "#334155";
const HANDLE_COLOR = "#eab308";
export const SOLID_COLOR = "#3b82f6";
export const PIECE_A_COLOR = "#10b981";
export const PIECE_B_COLOR = "#f59e0b";

export const FILL_OPACITY = 0.55;
export const HANDLE_OPACITY = 1;

// The shared look for every draggable handle: a warm glow, starting invisible so
// useFade can bring it in on mount and take it away when its step commits.
export function HandleMaterial({ matRef }: { matRef: Ref<THREE.Material> }) {
	return (
		<meshStandardMaterial
			ref={matRef}
			color={HANDLE_COLOR}
			emissive={HANDLE_COLOR}
			emissiveIntensity={0.4}
			transparent
			opacity={0}
		/>
	);
}

// Every wireframe in both scenes: cages, cube edges, pyramid outlines. The render
// order and the material have to travel together, so this owns both.
//
// A wireframe traces the solids it describes, so its lines are unavoidably
// coincident with their surfaces — the cube's edges lie in the pyramids' faces,
// the cylinder's verticals along the shell's wall, the bottom ring in the plane of
// the base disc. Two things follow from that.
//
// `depthWrite` is off because a line that writes depth leaves the translucent
// surface touching it winning or losing the depth test per pixel and per frame,
// which reads as the wireframe flashing. Nudging the cage outward does not cover
// it — some of those coincidences are coplanar rather than radial, so they stay
// coincident from any grazing view. Whether it flashes at all comes down to how a
// driver interpolates depth along a line versus across a triangle: Firefox looked
// clean where Chromium did not.
//
// But with neither the lines nor the fills writing depth, paint order decides
// everything, and lines drawn in the opaque pass come first — so every translucent
// surface overlapping them blends over them, including surfaces that are behind.
// Flush lines all but disappear. Hence `transparent` and a high `renderOrder`,
// which put the wireframe last in the transparent queue, after every fill.
//
// Net effect: lines read crisply wherever they are not actually hidden. They still
// depth-*test*, so the opaque sphere occludes the ones behind it — that cue is the
// one worth keeping. The cue this gives up is translucent fills tinting the lines
// behind them, so the far side of a cage now reads as clearly as the near side.
const CAGE_RENDER_ORDER = 1000;

export function CageLines({
	geometry,
	opacity,
	matRef,
}: {
	geometry: THREE.BufferGeometry;
	opacity?: number;
	matRef?: Ref<THREE.Material>;
}) {
	return (
		<lineSegments geometry={geometry} renderOrder={CAGE_RENDER_ORDER}>
			<lineBasicMaterial
				ref={matRef}
				color={CAGE_COLOR}
				transparent
				opacity={opacity ?? 1}
				depthWrite={false}
			/>
		</lineSegments>
	);
}

// The shared translucent fill (no depth write, so overlapping pieces blend
// rather than occlude — see useDepthSort for the ordering).
export function FillMaterial({
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
