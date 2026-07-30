import * as THREE from "three";

// Shared dimensions. A sphere of radius RADIUS sits centred on the equator plane
// y = MID, inscribed in a cylinder of the same radius spanning y = 0..HEIGHT, so
// HEIGHT === 2 * RADIUS keeps it inscribed.
export const RADIUS = 1;
export const MID = RADIUS;
export const HEIGHT = 2 * RADIUS;

export const SEG = 64; // ring subdivisions around the axis
const NY = 48; // profile samples along each of the shell's two curves

// Vertical drop height for the staged sphere and cap.
export const STAGE_HEIGHT = 2.2;

// Angular tables for the revolution, shared by the shell and the cage.
const RING_COS = new Float32Array(SEG);
const RING_SIN = new Float32Array(SEG);
for (let i = 0; i < SEG; i++) {
	const a = (i / SEG) * Math.PI * 2;
	RING_COS[i] = Math.cos(a);
	RING_SIN[i] = Math.sin(a);
}

// ---- The carved shell (cone -> half-cylinder minus half-ball) ----------------
//
// A solid of revolution driven by one parameter, t. Sampling the profile by the
// sphere's polar angle phi (0 at the flat base, pi/2 at the pinch) rather than by
// height gives the whole family a clean closed form:
//
//   y     = RADIUS * (1 - cos phi)                 height above the flat base
//   inner = t * RADIUS * sin phi                   the cavity
//   outer = RADIUS * sqrt(t^2 sin^2 + cos^2)       the outer wall
//
// t = 0 leaves inner = 0 and outer = RADIUS * cos phi = RADIUS - y: a cone with
// its base on y = 0 and its apex at y = RADIUS. t = 1 gives outer = RADIUS (the
// cylinder wall) and inner = the sphere's own radius at that height, i.e. the
// bottom half-cylinder with the bottom half-ball carved out of it.
//
// In between, every slice has area pi*(outer^2 - inner^2) = pi*(RADIUS cos phi)^2
// = pi*(RADIUS - y)^2 — the same disc the cone has at that height — so the morph
// holds the volume at (1/3) pi RADIUS^3 throughout. Cavalieri, as in the cone
// proof. It also keeps outer <= RADIUS, so the shell never leaves the cylinder.
//
// Polar-angle sampling additionally clusters profile points near the base, which
// is where the cavity flares out fastest (its surface meets the base plane
// tangentially).

const PROFILE_SIN = new Float32Array(NY);
const PROFILE_COS = new Float32Array(NY);
for (let k = 0; k < NY; k++) {
	const phi = (k / (NY - 1)) * (Math.PI / 2);
	PROFILE_SIN[k] = Math.sin(phi);
	PROFILE_COS[k] = Math.cos(phi);
}

// Profile ring layout, walked as one closed loop so a single revolved index
// buffer covers the entire closed surface — base cap, outer wall and cavity:
//
//   [0]                 base centre (radius 0, on y = 0)
//   [1]                 base rim
//   [2 .. NY+1]         outer wall, base -> pinch
//   [NY+2 .. 2*NY+1]    cavity, pinch -> base centre
//
// The base needs no special case: inner is 0 at phi = 0 for every t, so the
// bottom is always the full disc of radius RADIUS.
//
// Three of those rings are deliberate duplicates — the base rim ([1] and [2]),
// the pinch ([NY+1] and [NY+2]) and the base centre ([0] and [2*NY+1]) — so that
// each of the three surfaces carries its own vertices where it creases against
// the next. Sharing them instead is actively wrong, not just soft: the pinch is a
// knife edge, so averaging the outer wall's outward normal with the cavity's
// inward one cancels to nothing and normalizes floating-point residue up to unit
// length, giving a garbage direction that ignores the surface's symmetry. The
// base centre cancels the same way, disc against cavity. Both showed up as
// wrongly-lit bands, on the equator and around the bottom pole. The bands joining
// each pair have zero area, so they contribute nothing to either normal.
const P = 2 * NY + 2;

const _p = new THREE.Vector2();

// Radius (x) and height above the flat base (y) of profile ring `i` at progress
// `t`.
function profilePoint(i: number, t: number, out: THREE.Vector2): THREE.Vector2 {
	if (i === 0) return out.set(0, 0); // base centre
	if (i === 1) return out.set(RADIUS, 0); // base rim
	const onOuter = i <= NY + 1;
	const k = onOuter ? i - 2 : 2 * NY + 1 - i;
	const sin = PROFILE_SIN[k];
	const cos = PROFILE_COS[k];
	out.x = onOuter
		? RADIUS * Math.sqrt(t * t * sin * sin + cos * cos)
		: t * RADIUS * sin;
	out.y = RADIUS * (1 - cos);
	return out;
}

function writeShell(
	geom: THREE.BufferGeometry,
	t: number,
	mirrored: boolean,
): void {
	const pos = geom.attributes.position.array as Float32Array;
	for (let i = 0; i < P; i++) {
		const p = profilePoint(i, t, _p);
		// A mirrored shell measures its height downward from the flat base, which
		// puts its pinch ring on the local origin plane — so the group holding it
		// sits at the equator and the shell rises to the top of the cylinder.
		const y = mirrored ? RADIUS - p.y : p.y;
		for (let j = 0; j < SEG; j++) {
			const n = (i * SEG + j) * 3;
			pos[n] = p.x * RING_COS[j];
			pos[n + 1] = y;
			pos[n + 2] = p.x * RING_SIN[j];
		}
	}
	geom.attributes.position.needsUpdate = true;
	geom.computeVertexNormals();
	// Bounds are deliberately not recomputed: the shell's extent is the same at
	// every t (the base disc already spans the full radius at t = 0, and the pinch
	// already reaches y = RADIUS), so the bounding volume never goes stale.
}

/**
 * Builds the carved shell. The default starts as the cone (t = 0) and is the
 * piece the reader morphs; `mirrored` builds the finished cap instead, which is
 * static at t = 1 and anchored on its pinch ring.
 */
export function createShell(mirrored = false): THREE.BufferGeometry {
	const geom = new THREE.BufferGeometry();
	geom.setAttribute(
		"position",
		new THREE.BufferAttribute(new Float32Array(P * SEG * 3), 3),
	);

	const index: number[] = [];
	for (let i = 0; i < P; i++) {
		const iNext = (i + 1) % P;
		for (let j = 0; j < SEG; j++) {
			const jNext = (j + 1) % SEG;
			const a = i * SEG + j;
			const b = iNext * SEG + j;
			const c = iNext * SEG + jNext;
			const d = i * SEG + jNext;
			// Walking the profile loop base -> outer wall -> pinch -> cavity -> base
			// leaves these facing out of the solid. Mirroring flips the handedness,
			// so the winding has to flip with it.
			if (mirrored) index.push(a, c, b, a, d, c);
			else index.push(a, b, c, a, c, d);
		}
	}
	geom.setIndex(index);

	writeShell(geom, mirrored ? 1 : 0, mirrored);
	return geom;
}

/** Rewrites the morphing shell's vertices in place. Called every frame. */
export function updateShell(geom: THREE.BufferGeometry, t: number): void {
	writeShell(geom, t, false);
}

// ---- Bounding cage -----------------------------------------------------------
// The cylinder outline as LineSegments: a ring at each end plus four verticals,
// placed at the same angles the cone proof puts its cube edges. The scene draws
// the bottom half alone for steps 1-2 and adds the top half for step 3; both
// halves draw the ring on the equator, which is invisible as they share a colour.

const VERTICAL_INDICES = [0, 1, 2, 3].map((k) =>
	Math.round(SEG * (0.125 + k * 0.25)),
);

export function createCage(fromY: number, toY: number): THREE.BufferGeometry {
	const geom = new THREE.BufferGeometry();
	const pos = new Float32Array(SEG * 2 * 3);
	for (let i = 0; i < SEG; i++) {
		const x = RADIUS * RING_COS[i];
		const z = RADIUS * RING_SIN[i];
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
