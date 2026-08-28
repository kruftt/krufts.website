import type * as THREE from "three";
import {
	buildShell,
	createCage as buildCage,
	polarSamples,
	type ShellProfile,
	writeShell,
} from "../shared/shell";

export { SEG } from "../shared/shell";

// Shared dimensions. A sphere of radius RADIUS sits centred on the equator plane
// y = MID, inscribed in a cylinder of the same radius spanning y = 0..HEIGHT, so
// HEIGHT === 2 * RADIUS keeps it inscribed.
export const RADIUS = 1;
export const MID = RADIUS;
export const HEIGHT = 2 * RADIUS;

const NY = 48; // profile samples along each of the shell's two curves

// Vertical drop height for the staged sphere and cap.
export const STAGE_HEIGHT = 2.2;

// ---- The carved shell (cone -> half-cylinder minus half-ball) ----------------
//
// The shared one-parameter family, sampled by the sphere's polar angle phi (0 at
// the flat base, pi/2 at the pinch). That gives the whole family a clean closed
// form:
//
//   y     = RADIUS * (1 - cos phi)                 height above the flat base
//   inner = t * RADIUS * sin phi                   the cavity
//   outer = RADIUS * sqrt(t^2 sin^2 + cos^2)       the outer wall
//
// t = 0 leaves inner = 0 and outer = RADIUS * cos phi = RADIUS - y: a cone with its
// base on y = 0 and its apex at y = RADIUS. t = 1 gives outer = RADIUS (the cylinder
// wall) and inner = the sphere's own radius at that height, i.e. the bottom
// half-cylinder with the bottom half-ball carved out of it.
//
// In between, every slice has area pi*(outer^2 - inner^2) = pi*(RADIUS cos phi)^2 =
// pi*(RADIUS - y)^2 — the same disc the cone has at that height — so the morph holds
// the volume at (1/3) pi RADIUS^3 throughout. It also keeps outer <= RADIUS, so the
// shell never leaves the cylinder. See shared/shell.ts for why sin/cos is all the
// condition the family asks of a profile.
const PROFILE: ShellProfile = {
	radius: RADIUS,
	samples: polarSamples(NY, (_sin, cos) => RADIUS * (1 - cos)),
};

/**
 * Builds the carved shell. The default starts as the cone (t = 0) and is the piece
 * the reader morphs; `mirrored` builds the finished cap instead, which is static at
 * t = 1 and anchored on its pinch ring, so a group at the equator carries it to the
 * top of the cylinder.
 */
export function createShell(mirrored = false): THREE.BufferGeometry {
	return buildShell(PROFILE, { mirrored, t: mirrored ? 1 : 0 });
}

/** Rewrites the morphing shell's vertices in place. Called every frame. */
export function updateShell(geom: THREE.BufferGeometry, t: number): void {
	writeShell(geom, PROFILE, t);
}

/** The cylinder outline as LineSegments; the scene draws it in two halves. */
export function createCage(fromY: number, toY: number): THREE.BufferGeometry {
	return buildCage(RADIUS, fromY, toY);
}
