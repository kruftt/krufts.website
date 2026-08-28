'use client'
import dynamic from "next/dynamic";
import { SpheresHeader } from "../_components/spheres-header";

const VolumeOfConeScene = dynamic(
  () => import("../_components/cone/volume-of-cone-scene"),
  { ssr: false },
);

const VolumeOfSphereScene = dynamic(
  () => import("../_components/sphere/volume-of-sphere-scene"),
  { ssr: false },
);

const VolumeOfParaboloidScene = dynamic(
  () => import("../_components/paraboloid/volume-of-paraboloid-scene"),
  { ssr: false },
);

export default function Volume() {
  return (
    <article>
      <SpheresHeader>
        {"Volume"}
      </SpheresHeader>
      <div>
        <p>
          Slicing a sphere against a cone and a cylinder.
        </p>
      </div>

      <VolumeOfConeScene className="my-8" />
      <VolumeOfSphereScene className="my-8" />
      <VolumeOfParaboloidScene className="my-8" />

    </article>
  )
}
