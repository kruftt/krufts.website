"use client";

import { OrbitControls } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { DropSolid, RingHandle } from "../shared/handles";
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
	useFade,
	useOrbitAutoEnable,
	useOrbitFraming,
} from "../shared/scene-hooks";
import { DONE_CAPTION, STEP_CAPTIONS, STEP_COUNT } from "./captions";
import {
	createCage,
	createShell,
	HEIGHT,
	MID,
	RADIUS,
	SEG,
	STAGE_HEIGHT,
	updateShell,
} from "./geometry";

// The sphere is drawn a hair under its true radius. It and the carved cavity are
// both polygonal approximations of the same sphere, and their vertices land on it
// exactly while their faces fall just inside — so at equal size they interleave by
// ~4.5e-4 and the seated half picks up a speckle. 0.002 clears the cavity by
// 1.97e-3 at every sphere vertex, a quarter of a pixel at this scale.
const SPHERE_RADIUS = RADIUS - 0.002;

// Orbit pivot height + camera distance to ease toward at the start of each step.
// Step 1 sits close on the squat half-cylinder; the drops pull out and raise the
// pivot to make room for the piece staged overhead.
function framingFor(step: number): { y: number; dist: number } {
	if (step <= 0) return { y: MID / 2, dist: 4.5 };
	// Complete: nothing floats above anymore, so recentre on the whole cylinder.
	if (step >= STEP_COUNT) return { y: MID, dist: 5.5 };
	if (step === 1) return { y: MID * 1.6, dist: 8 };
	return { y: MID * 1.4, dist: 8.5 };
}

// The sphere: the one opaque body in the scene. Three.js draws the opaque pass
// before the transparent one, so the translucent shells blend over it correctly
// from every angle with no depth sorting to arrange. Its latitude bands are
// deliberately coarser than the cavity's, keeping its faces inside the hollow.
function SphereBody() {
	const matRef = useRef<THREE.Material>(null);
	// Opaque once seated, hence `opaqueWhenDone` — a material left `transparent`
	// would stay in the transparent queue at full opacity and be sorted against
	// the shells instead of drawn ahead of them.
	useFade(matRef, 1, true);
	return (
		<mesh>
			<sphereGeometry args={[SPHERE_RADIUS, SEG, 48]} />
			<meshStandardMaterial
				ref={matRef}
				color={PIECE_B_COLOR}
				transparent
				opacity={0}
			/>
		</mesh>
	);
}

// The cap: the carved shell mirrored, so its hollow takes the sphere's top half
// and its flat face closes the cylinder off. Translucent like the piece it is a
// copy of, and it fades in when its step begins.
function CapBody({ geometry }: { geometry: THREE.BufferGeometry }) {
	const matRef = useRef<THREE.Material>(null);
	useFade(matRef, FILL_OPACITY);
	return (
		<mesh geometry={geometry}>
			<FillMaterial color={PIECE_A_COLOR} opacity={0} matRef={matRef} />
		</mesh>
	);
}

// The top half of the cylinder outline, which only becomes the point once there
// is something up there to bound.
function UpperCage({ geometry }: { geometry: THREE.BufferGeometry }) {
	const matRef = useRef<THREE.Material>(null);
	// No `opaqueWhenDone` here, unlike the sphere and the handles: CageLines pins
	// the wireframe's place in the transparent queue by renderOrder, so there is no
	// origin-depth tie for it to escape, and going opaque would move it back ahead
	// of the fills it needs to draw over.
	useFade(matRef, 1);
	return <CageLines geometry={geometry} opacity={0} matRef={matRef} />;
}

function Scene({ currentStep, committing, onAdvance }: StepState) {
	const shellGeom = useMemo(() => createShell(), []);
	const capGeom = useMemo(() => createShell(true), []);
	const lowerCage = useMemo(() => createCage(0, MID), []);
	const upperCage = useMemo(() => createCage(MID, HEIGHT), []);
	// Both dropped pieces land on the equator plane: the sphere seats there on its
	// centre, putting half of it in the hollow, and the cap seats there on its
	// pinch ring, which is the rim of its own hollow.
	const seat = useMemo(() => new THREE.Vector3(0, MID, 0), []);

	// Live morph progress, driven imperatively by the ring handle. `applied`
	// tracks what the mesh currently shows, so an idle frame costs nothing —
	// rebuilding the shell means recomputing normals over a few thousand
	// vertices, which is not worth doing when nothing has moved.
	const progress = useRef(0);
	const applied = useRef(0);

	useOrbitAutoEnable();
	const framing = framingFor(currentStep);
	useOrbitFraming(framing.y, framing.dist);

	useFrame(() => {
		// Past the carve the shell is pinned fully open, whatever the handle last
		// reported. Everything after depends on the cavity being exactly the sphere's
		// radius — a shell even a percent short leaves the sphere protruding through
		// it by several times the clearance the two are built to, right at the
		// equator where the fit is meant to read as exact.
		const t = currentStep > 0 ? 1 : progress.current;
		if (applied.current === t) return;
		applied.current = t;
		updateShell(shellGeom, t);
	});

	return (
		<>
			<ambientLight intensity={0.75} />
			<directionalLight position={[5, 8, 4]} intensity={0.9} />
			<OrbitControls
				makeDefault
				enablePan={false}
				enableZoom
				target={[0, MID / 2, 0]}
				minDistance={3}
				maxDistance={14}
			/>

			<mesh geometry={shellGeom}>
				<FillMaterial color={SOLID_COLOR} opacity={FILL_OPACITY} />
			</mesh>
			<CageLines geometry={lowerCage} />

			{currentStep === 0 && (
				<RingHandle
					y={MID}
					maxRadius={RADIUS}
					onProgress={(t) => {
						progress.current = t;
					}}
					onCommit={() => {
						progress.current = 1;
						onAdvance();
					}}
					fadingOut={committing}
				/>
			)}

			{currentStep >= 1 && (
				<DropSolid
					seat={seat}
					stageHeight={STAGE_HEIGHT}
					active={currentStep === 1}
					onSeated={onAdvance}
				>
					<SphereBody />
				</DropSolid>
			)}

			{currentStep >= 2 && (
				<>
					<UpperCage geometry={upperCage} />
					<DropSolid
						seat={seat}
						stageHeight={STAGE_HEIGHT}
						active={currentStep === 2}
						onSeated={onAdvance}
					>
						<CapBody geometry={capGeom} />
					</DropSolid>
				</>
			)}
		</>
	);
}

export default function VolumeOfSphereScene({
	className,
}: {
	className?: string;
}) {
	return (
		<ProofScene
			className={className}
			captions={STEP_CAPTIONS}
			doneCaption={DONE_CAPTION}
			camera={{ position: [-1, 1.6, 3.2], fov: 45 }}
		>
			{(state) => <Scene {...state} />}
		</ProofScene>
	);
}
