"use client";

import { OrbitControls } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { clamp01 } from "../shared/constants";
import { DropSolid, MorphHandle } from "../shared/handles";
import {
	CageLines,
	FILL_OPACITY,
	FillMaterial,
	PIECE_A_COLOR,
	PIECE_B_COLOR,
	SOLID_COLOR,
} from "../shared/materials";
import ProofScene, { type StepState } from "../shared/proof-scene";
import {
	useDepthSort,
	useFade,
	useOrbitAutoEnable,
	useOrbitFraming,
} from "../shared/scene-hooks";
import { DONE_CAPTION, STEP_CAPTIONS, STEP_COUNT } from "./captions";
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

// The area-preserving morph enlarges the circle, so its edge (where the step-1
// handle rests at squareness 0) sits at this radius; it drags out to the square
// corner at RADIUS * sqrt2 (squareness 1).
const EDGE_R = RADIUS * ringScale(0);

// The cube corner each pyramid fills — where three of its faces coincide with
// three cube faces. In every pyramid's local frame (apex at the origin) this is
// straight down from the apex. Distance from this corner to the camera orders
// the tiling pyramids correctly from any viewpoint (their centroids sit too
// close together near the cube centre to disambiguate).
const LOCAL_SORT_CORNER = new THREE.Vector3(0, -HEIGHT, 0);

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

// A rigid pyramid body: translucent fill plus wireframe, depth-sorted per view.
// The dropped copies fade in on mount; the corner pyramid does not, since it
// takes over from the morphing solid at full opacity in the same frame.
function PyramidBody({
	geometry,
	edges,
	color,
	fadeIn = true,
}: {
	geometry: THREE.BufferGeometry;
	edges: THREE.BufferGeometry;
	color: string;
	fadeIn?: boolean;
}) {
	const meshRef = useRef<THREE.Mesh>(null);
	const matRef = useRef<THREE.Material>(null);
	useDepthSort(meshRef, LOCAL_SORT_CORNER);
	useFade(matRef, FILL_OPACITY);
	return (
		<>
			<mesh ref={meshRef} geometry={geometry}>
				<FillMaterial
					color={color}
					opacity={fadeIn ? 0 : FILL_OPACITY}
					matRef={matRef}
				/>
			</mesh>
			<CageLines geometry={edges} />
		</>
	);
}

function Scene({ currentStep, committing, onAdvance }: StepState) {
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
			<CageLines geometry={cageGeom} />
			{currentStep === 1 && (
				<CageLines geometry={pyramidEdges} />
			)}

			{/* Steps 3-4: pyramid #1 is now the corner pyramid, geometrically
			    identical to a copy. Render it the same way (a rigid group anchored
			    at the shared apex V) so all three transparent pyramids sort from the
			    same origin — no blend-order flipping or flashing. */}
			{currentStep >= 2 && (
				<group position={[cornerVec.x, cornerVec.y, cornerVec.z]}>
					<PyramidBody
						geometry={rigidGeom}
						edges={rigidEdges}
						color={SOLID_COLOR}
						fadeIn={false}
					/>
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
				<DropSolid
					seat={cornerVec}
					stageHeight={STAGE_HEIGHT}
					quaternion={q1}
					active={currentStep === 2}
					onSeated={onAdvance}
				>
					<PyramidBody
						geometry={rigidGeom}
						edges={rigidEdges}
						color={PIECE_A_COLOR}
					/>
				</DropSolid>
			)}
			{currentStep >= 3 && (
				<DropSolid
					seat={cornerVec}
					stageHeight={STAGE_HEIGHT}
					quaternion={q2}
					active={currentStep === 3}
					onSeated={onAdvance}
				>
					<PyramidBody
						geometry={rigidGeom}
						edges={rigidEdges}
						color={PIECE_B_COLOR}
					/>
				</DropSolid>
			)}
		</>
	);
}

export default function VolumeOfConeScene({
	className,
}: {
	className?: string;
}) {
	return (
		<ProofScene
			className={className}
			captions={STEP_CAPTIONS}
			doneCaption={DONE_CAPTION}
			camera={{ position: [-0.9, 2.5, 2.6], fov: 45 }}
		>
			{(state) => <Scene {...state} />}
		</ProofScene>
	);
}
