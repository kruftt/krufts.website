import * as THREE from "three";

// Shared dimensions. The bounding prism is a cube of side 2*RADIUS with its
// base on y = 0 and top on y = HEIGHT, so HEIGHT === 2 * RADIUS keeps it cubic.
export const RADIUS = 1;
export const HEIGHT = 2 * RADIUS;
export const SEG = 64; // ring subdivisions used for the morphing solid + cage

// Vertical drop height for the staged copies in steps 3 & 4.
export const STAGE_HEIGHT = 2.6;

const _p = new THREE.Vector2();
const _pa = new THREE.Vector2();

/**
 * A point on a ring blended between a unit circle and a unit square.
 * squareness 0 => circle, 1 => square (corner reaches sqrt(2)).
 */
export function ringPoint(
	angle: number,
	squareness: number,
	out: THREE.Vector2 = _p,
): THREE.Vector2 {
	const c = Math.cos(angle);
	const s = Math.sin(angle);
	const m = Math.max(Math.abs(c), Math.abs(s)) || 1;
	out.x = c * (1 - squareness) + (c / m) * squareness;
	out.y = s * (1 - squareness) + (s / m) * squareness;
	return out;
}

// Shoelace area of the SEG-sampled ring polygon at a given squareness.
function ringArea(squareness: number): number {
	let area = 0;
	let px = 0;
	let py = 0;
	for (let i = 0; i <= SEG; i++) {
		const r = ringPoint(((i % SEG) / SEG) * Math.PI * 2, squareness, _pa);
		if (i > 0) area += px * r.y - r.x * py;
		px = r.x;
		py = r.y;
	}
	return Math.abs(area) / 2;
}

// The square (squareness = 1) sets the reference area; every intermediate ring
// is scaled to match it, so the morph preserves cross-sectional area — the
// starting circle and the final square enclose the same area.
const SQUARE_AREA = ringArea(1);

/** Uniform scale that normalizes a ring's area to the square's (area-preserving). */
export function ringScale(squareness: number): number {
	return Math.sqrt(SQUARE_AREA / ringArea(squareness));
}

// ---- Morphing solid (cone -> square pyramid) ---------------------------------
// Vertex layout: [0..SEG) base ring, [SEG] apex, [SEG + 1] base centre.

export function createSolidGeometry(): THREE.BufferGeometry {
	const geom = new THREE.BufferGeometry();
	const count = SEG + 2;
	geom.setAttribute(
		"position",
		new THREE.BufferAttribute(new Float32Array(count * 3), 3),
	);

	const apex = SEG;
	const centre = SEG + 1;
	const index: number[] = [];
	for (let i = 0; i < SEG; i++) {
		const next = (i + 1) % SEG;
		index.push(i, next, apex); // side face
		index.push(centre, next, i); // base cap (downward)
	}
	geom.setIndex(index);
	updateSolid(geom, 0, 0, 0);
	return geom;
}

export function updateSolid(
	geom: THREE.BufferGeometry,
	squareness: number,
	apexX: number,
	apexZ: number,
): void {
	const pos = geom.attributes.position.array as Float32Array;
	const k = RADIUS * ringScale(squareness);
	for (let i = 0; i < SEG; i++) {
		const r = ringPoint((i / SEG) * Math.PI * 2, squareness);
		pos[i * 3] = r.x * k;
		pos[i * 3 + 1] = 0;
		pos[i * 3 + 2] = r.y * k;
	}
	pos[SEG * 3] = apexX;
	pos[SEG * 3 + 1] = HEIGHT;
	pos[SEG * 3 + 2] = apexZ;
	pos[(SEG + 1) * 3] = 0;
	pos[(SEG + 1) * 3 + 1] = 0;
	pos[(SEG + 1) * 3 + 2] = 0;
	geom.attributes.position.needsUpdate = true;
	geom.computeVertexNormals();
}

// ---- Pyramid #1 edge wireframe ----------------------------------------------
// The morphing solid's apex moves, so its outline is drawn as a dedicated
// 8-edge line: 4 base corners (indices 0..3) + apex (index 4).

const PYRAMID_CORNER_ANGLES = [0, 1, 2, 3].map(
	(k) => (0.125 + k * 0.25) * Math.PI * 2,
);

export function createPyramidEdges(): THREE.BufferGeometry {
	const geom = new THREE.BufferGeometry();
	geom.setAttribute(
		"position",
		new THREE.BufferAttribute(new Float32Array(5 * 3), 3),
	);
	// base loop + four slant edges to the apex
	geom.setIndex([0, 1, 1, 2, 2, 3, 3, 0, 0, 4, 1, 4, 2, 4, 3, 4]);
	updatePyramidEdges(geom, 1, RADIUS, RADIUS);
	return geom;
}

export function updatePyramidEdges(
	geom: THREE.BufferGeometry,
	squareness: number,
	apexX: number,
	apexZ: number,
): void {
	const pos = geom.attributes.position.array as Float32Array;
	const k = RADIUS * ringScale(squareness);
	for (let i = 0; i < 4; i++) {
		const r = ringPoint(PYRAMID_CORNER_ANGLES[i], squareness);
		pos[i * 3] = r.x * k;
		pos[i * 3 + 1] = 0;
		pos[i * 3 + 2] = r.y * k;
	}
	pos[12] = apexX;
	pos[13] = HEIGHT;
	pos[14] = apexZ;
	geom.attributes.position.needsUpdate = true;
}

// ---- Bounding cage (cylinder -> cube) ---------------------------------------
// Vertex layout: [0..SEG) bottom ring (y = 0), [SEG..2*SEG) top ring (y = HEIGHT).

// Corner ring indices (45, 135, 225, 315 degrees) become the cube's vertical edges.
const CORNER_INDICES = [0, 1, 2, 3].map((k) =>
	Math.round(SEG * (0.125 + k * 0.25)),
);

export function createCageGeometry(): THREE.BufferGeometry {
	const geom = new THREE.BufferGeometry();
	geom.setAttribute(
		"position",
		new THREE.BufferAttribute(new Float32Array(SEG * 2 * 3), 3),
	);

	const index: number[] = [];
	for (let i = 0; i < SEG; i++) {
		const next = (i + 1) % SEG;
		index.push(i, next); // bottom ring edge
		index.push(SEG + i, SEG + next); // top ring edge
	}
	for (const c of CORNER_INDICES) {
		index.push(c, SEG + c); // vertical edge
	}
	geom.setIndex(index);
	updateCage(geom, 0);
	return geom;
}

export function updateCage(geom: THREE.BufferGeometry, squareness: number): void {
	const pos = geom.attributes.position.array as Float32Array;
	const k = RADIUS * ringScale(squareness);
	for (let i = 0; i < SEG; i++) {
		const r = ringPoint((i / SEG) * Math.PI * 2, squareness);
		const x = r.x * k;
		const z = r.y * k;
		pos[i * 3] = x;
		pos[i * 3 + 1] = 0;
		pos[i * 3 + 2] = z;
		pos[(SEG + i) * 3] = x;
		pos[(SEG + i) * 3 + 1] = HEIGHT;
		pos[(SEG + i) * 3 + 2] = z;
	}
	geom.attributes.position.needsUpdate = true;
}

// ---- Rigid pyramid copies (steps 3 & 4) -------------------------------------
// Same shape as the finished morph, but expressed with its apex at the local
// origin so a group placed at the apex corner can rotate it about the shared
// vertex.

export function createRigidPyramidGeometry(
	apex: THREE.Vector3,
): THREE.BufferGeometry {
	const a = apex;
	// Base corners of the final pyramid in world space (bottom face), minus apex.
	const corners: [number, number, number][] = [
		[RADIUS, 0, RADIUS],
		[-RADIUS, 0, RADIUS],
		[-RADIUS, 0, -RADIUS],
		[RADIUS, 0, -RADIUS],
	].map(([x, y, z]) => [x - a.x, y - a.y, z - a.z]);

	const centre: [number, number, number] = [
		0 - a.x,
		0 - a.y,
		0 - a.z,
	];
	const positions: number[] = [];
	for (const c of corners) positions.push(...c);
	positions.push(0, 0, 0); // apex (index 4)
	positions.push(...centre); // base centre (index 5)

	const geom = new THREE.BufferGeometry();
	geom.setAttribute(
		"position",
		new THREE.Float32BufferAttribute(positions, 3),
	);
	const apexIdx = 4;
	const baseIdx = 5;
	const index: number[] = [];
	for (let i = 0; i < 4; i++) {
		const next = (i + 1) % 4;
		index.push(i, next, apexIdx); // side
		index.push(baseIdx, next, i); // base cap
	}
	geom.setIndex(index);
	geom.computeVertexNormals();
	return geom;
}

/**
 * Rotation (by turns * 120 degrees) about the body diagonal `axis` through the
 * shared apex, mapping pyramid #1 onto copy #turns.
 */
export function diagonalQuaternion(
	turns: 1 | 2,
	axis: THREE.Vector3,
): THREE.Quaternion {
	return new THREE.Quaternion().setFromAxisAngle(
		axis,
		(turns * 2 * Math.PI) / 3,
	);
}
