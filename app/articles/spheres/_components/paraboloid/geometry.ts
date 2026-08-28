import type * as THREE from "three";
import {
	buildShell,
	createCage as buildCage,
	polarSamples,
	type ShellProfile,
	writeShell,
} from "../shared/shell";

export { SEG } from "../shared/shell";

// Shared dimensions: the cone proof's cylinder, radius RADIUS and height HEIGHT,
// so all three figures in the article read at the same scale.
export const RADIUS = 1;
export const HEIGHT = 2;
export const MID = HEIGHT / 2;

const NY = 48; // profile samples along each of the shell's two curves

// Vertical drop height for the staged paraboloid. It hangs by its vertex, which is
// its lowest point, so this is also its clearance above the top of the cylinder.
export const STAGE_HEIGHT = 2.6;

// ---- The carved shell (paraboloid -> cylinder minus paraboloid) --------------
//
// The shared one-parameter family again, sampled by the same polar angle the sphere
// proof uses (0 at the flat base, pi/2 at the pinch). Only the height of each sample
// differs — that is the entire difference between the two proofs:
//
//   y     = HEIGHT * sin^2 phi                     height above the flat base
//   inner = t * RADIUS * sin phi                   the cavity
//   outer = RADIUS * sqrt(t^2 sin^2 + cos^2)       the outer wall
//
// t = 0 leaves inner = 0 and outer = RADIUS * cos phi = RADIUS * sqrt(1 - y/HEIGHT),
// which is the paraboloid y = HEIGHT * (1 - r^2/RADIUS^2): a dome standing on the
// base of the cylinder with its apex at the top. t = 1 gives outer = RADIUS (the
// cylinder wall) and inner = RADIUS * sqrt(y/HEIGHT), the paraboloid the other way
// up — so the shell becomes the cylinder with a paraboloid carved out of it.
//
// In between, every slice has area pi*(outer^2 - inner^2) = pi*(RADIUS cos phi)^2 =
// pi*RADIUS^2*(1 - y/HEIGHT), the same disc the starting dome has at that height, so
// the morph holds the volume at (1/2) pi RADIUS^2 HEIGHT throughout. outer <= RADIUS
// at every t, so the shell never leaves the cylinder.
//
// That is the whole proof, and unlike the sphere it does not lean on the cone
// result. The carved-out paraboloid is the starting dome reflected — swap y for
// HEIGHT - y in either and you get the other — so the two are congruent, and the
// morph says they have equal volume. Together they fill the cylinder, so each is
// half of it.
const PROFILE: ShellProfile = {
	radius: RADIUS,
	samples: polarSamples(NY, (sin) => HEIGHT * sin * sin),
};

/** Builds the morphing shell, starting as the dome (t = 0). */
export function createShell(): THREE.BufferGeometry {
	return buildShell(PROFILE);
}

/** Rewrites the morphing shell's vertices in place. Called every frame. */
export function updateShell(geom: THREE.BufferGeometry, t: number): void {
	writeShell(geom, PROFILE, t);
}

/**
 * The paraboloid the reader drops in, which is the same shell mirrored and left at
 * t = 0 — the congruence above, spelled as geometry. Mirroring measures height
 * downward from the flat base, which stands the dome on its apex: the piece runs
 * from its vertex at the local origin up to its full-radius rim at y = HEIGHT, which
 * is exactly the cavity the morph leaves behind.
 */
export function createParaboloid(): THREE.BufferGeometry {
	return buildShell(PROFILE, { mirrored: true });
}

/** The cylinder outline as LineSegments. */
export function createCage(fromY: number, toY: number): THREE.BufferGeometry {
	return buildCage(RADIUS, fromY, toY);
}
