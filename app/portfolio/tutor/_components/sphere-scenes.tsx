"use client";

import dynamic from "next/dynamic";

export const VolumeOfConeScene = dynamic(
	() => import("@/app/articles/spheres/_components/cone/volume-of-cone-scene"),
	{ ssr: false },
);

export const VolumeOfSphereScene = dynamic(
	() =>
		import("@/app/articles/spheres/_components/sphere/volume-of-sphere-scene"),
	{ ssr: false },
);

export const VolumeOfParaboloidScene = dynamic(
	() =>
		import(
			"@/app/articles/spheres/_components/paraboloid/volume-of-paraboloid-scene"
		),
	{ ssr: false },
);
