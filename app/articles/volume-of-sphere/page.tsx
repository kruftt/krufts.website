'use client'
import dynamic from "next/dynamic";
// import MathBlock from "@/components/general/math-block";
import MathInline from "@/components/general/math-inline";
// import JsdImage from "@/components/general/jsdelivr-image"

const VolumeOfConeScene = dynamic(
  () => import("./_components/cone/volume-of-cone-scene"),
  { ssr: false },
);

const VolumeOfSphereScene = dynamic(
  () => import("./_components/sphere/volume-of-sphere-scene"),
  { ssr: false },
);

export default function VolumeOfSphere() {
  return (
    <>
      <h1 className="text-center text-2xl mt-6 mb-10">
        Volume of Sphere
      </h1>
      <article>
        <div>
          <p>
            It's commonly known that the volume of a sphere is <MathInline>{"\\frac{4}{3}\\pi r^3"}</MathInline>,
            which was apparently discovered by Archimedes long before the invention of calculus. How was this possible?
            In this presentation we will see how we can picture the relationships between the volume of a
            cylinder, a cone, a pyramid, and a sphere!
          </p>
        </div>

        <div>
          <p>
            We'll start with the volume of a cone. Below is a cone tucked inside a
            cylinder. Lets shape the cone into something easier to work with:
          </p>
        </div>

        <VolumeOfConeScene className="my-8" />

        <div>
          <p>
            Now we can put that to work. Below is another cone, this time only
            half as tall as the cylinder we're working toward. Watch what happens
            when we push it out of the way:
          </p>
        </div>

        <VolumeOfSphereScene className="my-8" />

      </article>
    </>
  )
}
