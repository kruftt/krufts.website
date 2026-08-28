import * as THREE from "three";

// The revolved carved shell, shared by the sphere and paraboloid proofs.
//
// Both proofs open a solid of revolution out against the wall of its bounding
// cylinder, and both do it with the same one-parameter family. Write the cavity's
// radius at some height as a fraction `cavity` of the cylinder's radius R, and the
// starting solid's radius there as a fraction `wall`. Then for progress t:
//
//   inner = t * R * cavity
//   outer = R * sqrt(t^2 * cavity^2 + wall^2)
//
// t = 0 leaves inner = 0 and outer = R * wall — the starting solid. t = 1 gives
// inner = R * cavity, the cavity's true radius, and outer = R * sqrt(cavity^2 +
// wall^2). So the single condition
//
//   cavity^2 + wall^2 = 1
//
// is what makes t = 1 land exactly on the cylinder wall, and it is the same
// condition that makes the morph volume-preserving: every slice has area
// pi * (outer^2 - inner^2) = pi * R^2 * wall^2, which does not mention t at all.
// The solid the reader starts with and the cylinder-minus-cavity they finish with
// have equal volume, slice by slice. Cavalieri, as in the cone proof.
//
// What each proof supplies is only the height of each sample — that is the whole
// of the difference between a hemisphere and a paraboloid here.

export const SEG = 64; // ring subdivisions around the axis

// Angular tables for the revolution, shared by the shells and the cages.
const RING_COS = new Float32Array(SEG);
const RING_SIN = new Float32Array(SEG);
for (let i = 0; i < SEG; i++) {
	const a = (i / SEG) * Math.PI * 2;
	RING_COS[i] = Math.cos(a);
	RING_SIN[i] = Math.sin(a);
}

/**
 * One sample of a shell's profile. `cavity` and `wall` are radii as a fraction of
 * the cylinder's and must satisfy `cavity^2 + wall^2 = 1`; `y` is the height above
 * the flat base.
 */
export type ShellSample = { cavity: number; wall: number; y: number };

/**
 * A shell's profile: the cylinder radius plus the samples running from the flat
 * base (`cavity = 0`, `wall = 1`) to the pinch (`cavity = 1`, `wall = 0`).
 */
export type ShellProfile = {
	radius: number;
	samples: readonly ShellSample[];
};

/**
 * Samples a profile at `count` evenly spaced polar angles from 0 at the base to
 * pi/2 at the pinch, taking the height of each from `heightAt`. `sin^2 + cos^2 = 1`
 * satisfies the shell's condition for free, and the clustering is what both proofs
 * want: the cavity meets the base plane tangentially in each, so ds/dy runs away
 * there and uniform height sampling visibly facets the flare where the hole opens.
 */
export function polarSamples(
	count: number,
	heightAt: (sin: number, cos: number) => number,
): ShellSample[] {
	const samples: ShellSample[] = [];
	for (let k = 0; k < count; k++) {
		const phi = (k / (count - 1)) * (Math.PI / 2);
		const sin = Math.sin(phi);
		const cos = Math.cos(phi);
		samples.push({ cavity: sin, wall: cos, y: heightAt(sin, cos) });
	}
	return samples;
}

// Profile ring layout, walked as one closed loop so a single revolved index buffer
// covers the entire closed surface — base cap, outer wall and cavity:
//
//   [0]                 base centre (radius 0, on y = 0)
//   [1]                 base rim
//   [2 .. NY+1]         outer wall, base -> pinch
//   [NY+2 .. 2*NY+1]    cavity, pinch -> base centre
//
// The base needs no special case: `cavity` is 0 at the first sample for every t, so
// the bottom is always the full disc of radius `radius`.
//
// Three of those rings are deliberate duplicates — the base rim ([1] and [2]), the
// pinch ([NY+1] and [NY+2]) and the base centre ([0] and [2*NY+1]) — so that each of
// the three surfaces carries its own vertices where it creases against the next.
// Sharing them instead is actively wrong, not just soft: the pinch is a knife edge,
// so averaging the outer wall's outward normal with the cavity's inward one cancels
// to nothing and normalizes floating-point residue up to unit length, giving a
// garbage direction that ignores the surface's symmetry. The base centre cancels the
// same way, disc against cavity. Both showed up as wrongly-lit bands, on the equator
// and around the bottom pole. The bands joining each pair have zero area, so they
// contribute nothing to either normal.
const ringCount = (profile: ShellProfile) => 2 * profile.samples.length + 2;

const _p = new THREE.Vector2();

// Radius (x) and height above the flat base (y) of profile ring `i` at progress `t`.
function profilePoint(
	profile: ShellProfile,
	i: number,
	t: number,
	out: THREE.Vector2,
): THREE.Vector2 {
	const r = profile.radius;
	if (i === 0) return out.set(0, 0); // base centre
	if (i === 1) return out.set(r, 0); // base rim
	const ny = profile.samples.length;
	const onOuter = i <= ny + 1;
	const s = profile.samples[onOuter ? i - 2 : 2 * ny + 1 - i];
	out.x = onOuter
		? r * Math.sqrt(t * t * s.cavity * s.cavity + s.wall * s.wall)
		: t * r * s.cavity;
	out.y = s.y;
	return out;
}

/**
 * Rewrites a shell's vertices in place for progress `t`. Called every frame while
 * the reader drags.
 */
export function writeShell(
	geom: THREE.BufferGeometry,
	profile: ShellProfile,
	t: number,
	mirrored = false,
): void {
	const pos = geom.attributes.position.array as Float32Array;
	const rings = ringCount(profile);
	// The pinch is the last sample, so its height is the profile's full extent.
	const height = profile.samples[profile.samples.length - 1].y;
	for (let i = 0; i < rings; i++) {
		const p = profilePoint(profile, i, t, _p);
		// A mirrored shell measures its height downward from the flat base, which puts
		// its pinch ring on the local origin plane — so a group placed where the pinch
		// belongs carries the rest of the shell into place above it.
		const y = mirrored ? height - p.y : p.y;
		for (let j = 0; j < SEG; j++) {
			const n = (i * SEG + j) * 3;
			pos[n] = p.x * RING_COS[j];
			pos[n + 1] = y;
			pos[n + 2] = p.x * RING_SIN[j];
		}
	}
	geom.attributes.position.needsUpdate = true;
	geom.computeVertexNormals();
	// Bounds are deliberately not recomputed: the shell's extent is the same at every
	// t (the base disc already spans the full radius at t = 0, and the pinch already
	// reaches the full height), so the bounding volume never goes stale.
}

/**
 * Builds a carved shell from its profile at progress `t`. `mirrored` flips it about
 * its own mid-height, for a copy that hangs from its pinch rather than standing on
 * its base.
 */
export function buildShell(
	profile: ShellProfile,
	{ mirrored = false, t = 0 }: { mirrored?: boolean; t?: number } = {},
): THREE.BufferGeometry {
	const geom = new THREE.BufferGeometry();
	const rings = ringCount(profile);
	geom.setAttribute(
		"position",
		new THREE.BufferAttribute(new Float32Array(rings * SEG * 3), 3),
	);

	const index: number[] = [];
	for (let i = 0; i < rings; i++) {
		const iNext = (i + 1) % rings;
		for (let j = 0; j < SEG; j++) {
			const jNext = (j + 1) % SEG;
			const a = i * SEG + j;
			const b = iNext * SEG + j;
			const c = iNext * SEG + jNext;
			const d = i * SEG + jNext;
			// Walking the profile loop base -> outer wall -> pinch -> cavity -> base
			// leaves these facing out of the solid. Mirroring flips the handedness, so
			// the winding has to flip with it.
			if (mirrored) index.push(a, c, b, a, d, c);
			else index.push(a, b, c, a, c, d);
		}
	}
	geom.setIndex(index);

	writeShell(geom, profile, t, mirrored);
	return geom;
}

// ---- Bounding cage -----------------------------------------------------------
// The cylinder outline as LineSegments: a ring at each end plus four verticals,
// placed at the same angles the cone proof puts its cube edges. A proof that draws
// the cylinder in halves calls this once per half; both halves draw the ring on the
// shared plane, which is invisible as they share a colour.

const VERTICAL_INDICES = [0, 1, 2, 3].map((k) =>
	Math.round(SEG * (0.125 + k * 0.25)),
);

export function createCage(
	radius: number,
	fromY: number,
	toY: number,
): THREE.BufferGeometry {
	const geom = new THREE.BufferGeometry();
	const pos = new Float32Array(SEG * 2 * 3);
	for (let i = 0; i < SEG; i++) {
		const x = radius * RING_COS[i];
		const z = radius * RING_SIN[i];
		pos[i * 3] = x;
		pos[i * 3 + 1] = fromY;
		pos[i * 3 + 2] = z;
		pos[(SEG + i) * 3] = x;
		pos[(SEG + i) * 3 + 1] = toY;
		pos[(SEG + i) * 3 + 2] = z;
	}
	geom.setAttribute("position", new THREE.BufferAttribute(pos, 3));

	const index: number[] = [];
	for (let i = 0; i < SEG; i++) {
		const next = (i + 1) % SEG;
		index.push(i, next); // ring at fromY
		index.push(SEG + i, SEG + next); // ring at toY
	}
	for (const c of VERTICAL_INDICES) index.push(c, SEG + c);
	geom.setIndex(index);
	return geom;
}
