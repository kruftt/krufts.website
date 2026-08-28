'use client'
import dynamic from "next/dynamic";
// import MathBlock from "@/components/general/math-block";
import MathInline from "@/components/general/math-inline";
import JsdImage from "@/components/general/jsdelivr-image";
// import JsdImage from "@/components/general/jsdelivr-image"


export default function VolumeOfSphere() {
  return (
    <>
      <article>
        <div>
          <p>
            It's fairly commonly known that the circumference of a circle is <MathInline>{"2\\pi r"}</MathInline>,
            the area is <MathInline>{"\\pi r^2"}</MathInline>,
            the volume of a sphere is <MathInline>{"\\frac{4}{3}\\pi r^3"}</MathInline>,
            and its surface area is <MathInline>{"4\\pi r^2"}</MathInline>.
            Amazingly, these facts were discovered by Archimedes thousands of years before the invention of calculus.
            How was this possible?
          </p>
          <JsdImage
            alt="Properties of the sphere."
            src="cavalieri/sphere.png"
            width={982}
            height={913}
            className="max-h-75 m-auto"
          />
          <p>
            In this article we will trace through some of the ancient steps that can help us to understand
            some of the wonderous properties of spheres, all without using the tools of modern calculus!
          </p>
          <p>
            First things first, lets remind ourselves of the intuitive picture of what we mean by length, area, and volume.
            We say that length is a a measure of a 1D space, an area is a measure of 2D space, and volume is a measure of 3D space:
          </p>
          <JsdImage
            alt="An illustration of a line segment, a square, and a cube"
            src="cavalieri/measures.png"
            width={1805}
            height={746}
            className="max-h-65 m-auto"
          />
          <p>
            So long as we stick with lines, rectangles, and rectangular cuboids, measuring these spaces
            is straightforward. We can imagine using a straight-edged ruler and measuring the length of each side.
            Then, to get an area or volume, we can simply multiply these lengths together to get the result.
          </p>
          <p>
            However, things get dramatically more complicated when we start considering curved edges.
            Before we get going, we need to prepare some geometric tools that will help us deal with this difficulty.
          </p>
          <p>
            You're very likely familiar with the first of these, as its perhaps our best friend in geometry,
            the pythagorean theorem:
          </p>
          <JsdImage
  					src="quats/pythagorean.png"
  					width={954}
  					height={900}
  					className="max-w-7/8 max-h-60 m-auto"
  					alt="The Pythagorean Theorem."
  				/>
          <p>
            So far so good, but we'll need one more construction which is a bit more involved.
            This is called the angle bisector theorem, it tells us about the relationships within a triangle that
            has been split in half by bisecting (which means "to cut in two") one of the angles.
          </p>
        </div>
      </article>
    </>
  )
}
