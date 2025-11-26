// 'use client'
import JsdImage from "@/components/general/jsdelivr-image"

export default function QuatsFromScratch() {
  return (
    <article>
      <div>
        <p>
          Quaternions in areas that involve 3D rotations, such as computer vision, graphics, robotics, and physics. Even though quaternions are frequently in use and were the original source of the 3D vector operations that most are familiar with, the dot and cross products, they all too often remain shrouded in mystery. There is a common misconception that understanding these <i>complex</i> algebraic objects requires a special capacity to imagine non-intuitive 4-dimensional spaces, but I am here to tell you that this is not the case!
        </p>
        <JsdImage src="quats/quat_to_vec.png" className="max-w-7/8 max-h-80 m-auto" alt="Quaternion multiplication contains the dot and cross products." />
        <p>
          Some aspects of the common story may seem a bit fishy:
        </p>
        <ul className="list-disc ml-8 mt-4 mb-6">
          <li>Why do quaternions have 4 variables when we can picture something rotating in 3d space just fine?</li>
          <li>Why do rotation quaternions, "versors", use half the rotation angle?</li>
          <li>Supposing vector and matrix operations are better, why do we still use quaternions in actual practice?</li>
          <li>If there are no good intuitions for how they work, how could Hamilton have conceived of them while out on a walk, before the standard vector operations?</li>
        </ul>
        <p>
          Hopefully I can help illuminate these questions and more. I'd like to present a mathematical story about a way that quaternions could have been motivated and discovered. We'll start in 0 dimensions and work our way up. At each level we'll look at points within the space and operations on them, before coming to focus on rotations and then on 3D rotations in particular. At the end we'll look forward toward what's called the Clifford or geometric algebra, which further clarifies and builds on the story presented here.
        </p>
        <p>
          Although I've attempted to work "from scratch" and make this article as self-contained as possible, my main objectives are to clarify and build intuitions about how and why quaternions work the way they do. If this is your first introduction to the topic, expect to require other materials to be able to follow through the whole thing! This is intended to be a supplement, rather than a replacement. I've tried to emphasize algebraic and geometric perspectives that I've found useful both for my own mathematical intuition building and for working with 3d software tools and libraries, but I hope this article can be enjoyed by anyone interested in quaternions for whatever reason!
        </p>
      </div>
    </article>
  )
}