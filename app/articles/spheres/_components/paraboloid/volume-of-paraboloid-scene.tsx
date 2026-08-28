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
	PIECE_B_COLOR,
	SOLID_COLOR,
} from "../shared/materials";
import ProofScene, { type StepState } from "../shared/proof-scene";
import {
	useFade,
	useOrbitAutoEnable,
	useOrbitFraming,
} from "../shared/scene-hooks";
import { DONE_CAPTION, STEP_CAPTIONS } from "./captions";
import {
	createCage,
	createParaboloid,
	createShell,
	HEIGHT,
	MID,
	RADIUS,
	STAGE_HEIGHT,
	updateShell,
} from "./geometry";

// The dropped piece and the cavity it fills are the same surface at the same
// sample points — the polar-angle table is symmetric about pi/4, so mirroring
// walks it backwards and lands on exactly the same profile. Untreated the two
// meshes would coincide outright, so the piece is scaled in radially to sit
// inside the hollow. The shrink has to be *relative*, unlike the sphere proof's
// absolute one: both the clearance and the sagitta of a 64-gon chord scale with
// the local radius, so a fixed offset would be far too generous at the rim and
// too mean at the vertex. 0.003 against a chord that dips 0.0012 in leaves every
// vertex of the piece ~1.8e-3 clear of the cavity's faces at the rim, matching
// what the sphere proof settled on, and holds that ratio all the way down.
const DROP_SCALE = 1 - 0.003;

// The radial shrink does nothing at the vertex, where both surfaces meet the axis
// at the same point — and worse, the piece's surface is *tangent* to the base plane
// there (y = HEIGHT * r^2 / RADIUS^2 is flat at r = 0), so it lies nearly coplanar
// with the shell's base disc across a small disc around the bottom pole. That is
// the same place the sphere proof's normals bug showed, and this one would read
// similarly: a speckle where the depth test goes either way per pixel. Seating the
// piece a hair high separates them everywhere. The cost is its rim finishing 2e-3
// above the cage's top ring, which is a line that does not write depth and does not
// care.
const SEAT_LIFT = 0.002;

// Orbit pivot height + camera distance to ease toward at the start of each step.
// The morph sits close on the cylinder; the drop pulls out and raises the pivot to
// make room for the piece staged overhead, which hangs by its vertex and so reaches
// STAGE_HEIGHT + HEIGHT at its rim.
function framingFor(step: number): { y: number; dist: number } {
	if (step === 1) return { y: MID * 1.8, dist: 9 };
	return { y: MID, dist: 5.5 };
}

// The paraboloid the reader drops in: the one opaque body in the scene, which is
// what lets the translucent shell blend over it from every angle with no depth
// sorting to arrange.
function ParaboloidBody({ geometry }: { geometry: THREE.BufferGeometry }) {
	const matRef = useRef<THREE.Material>(null);
	// Opaque once seated, hence `opaqueWhenDone` — a material left `transparent`
	// would stay in the transparent queue at full opacity and be sorted against the
	// shell by object origin instead of drawn ahead of it.
	useFade(matRef, 1, true);
	return (
		<mesh geometry={geometry} scale={[DROP_SCALE, 1, DROP_SCALE]}>
			<meshStandardMaterial
				ref={matRef}
				color={PIECE_B_COLOR}
				transparent
				opacity={0}
			/>
		</mesh>
	);
}

function Scene({ currentStep, committing, onAdvance }: StepState) {
	const shellGeom = useMemo(() => createShell(), []);
	const dropGeom = useMemo(() => createParaboloid(), []);
	// One cage for the whole cylinder, from the start: unlike the sphere proof there
	// is never a moment when half of it bounds nothing, since the dome already spans
	// the full height.
	const cage = useMemo(() => createCage(0, HEIGHT), []);
	const seat = useMemo(() => new THREE.Vector3(0, SEAT_LIFT, 0), []);

	// Live morph progress, driven imperatively by the ring handle. `applied` tracks
	// what the mesh currently shows, so an idle frame costs nothing — rebuilding the
	// shell means recomputing normals over a few thousand vertices, which is not
	// worth doing when nothing has moved.
	const progress = useRef(0);
	const applied = useRef(0);

	useOrbitAutoEnable();
	const framing = framingFor(currentStep);
	useOrbitFraming(framing.y, framing.dist);

	useFrame(() => {
		// Past the morph the shell is pinned fully open, whatever the handle last
		// reported. The drop depends on the cavity being exactly the paraboloid — a
		// shell even a percent short leaves the piece protruding through it by several
		// times the clearance the two are built to.
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
				target={[0, MID, 0]}
				minDistance={3}
				maxDistance={14}
			/>

			<mesh geometry={shellGeom}>
				<FillMaterial color={SOLID_COLOR} opacity={FILL_OPACITY} />
			</mesh>
			<CageLines geometry={cage} />

			{currentStep === 0 && (
				// The pinch rides at the top of the cylinder and its radius *is* the morph
				// parameter, so the handle's radius maps to progress with no remapping.
				<RingHandle
					y={HEIGHT}
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
					<ParaboloidBody geometry={dropGeom} />
				</DropSolid>
			)}
		</>
	);
}

export default function VolumeOfParaboloidScene({
	className,
}: {
	className?: string;
}) {
	return (
		<ProofScene
			className={className}
			captions={STEP_CAPTIONS}
			doneCaption={DONE_CAPTION}
			camera={{ position: [-1.4, 2.2, 4.5], fov: 45 }}
		>
			{(state) => <Scene {...state} />}
		</ProofScene>
	);
}
