// 'use client'
import JsdImage from "@/components/general/jsdelivr-image"

export default function QuatsFromScratch() {
  return (
    <article>
      <div>
        <p>
          Quaternions come up in domains that involve 3d rotations, such as computer vision and graphics, robotics, physics, and others. Even though quaternions were the original source of the 3d vector operations that most people are familiar with, the dot and cross products, they unfortunately remain an enigma to many people who use them. There is a common misconception that understanding these <i>complex</i> algebraic objects requires a special capacity to imagine a non-intuitive 4-dimensional space, but I am here to tell you that this is not the case!
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
          Hopefully I can help illuminate these questions and more in this article. We'll find that taking a walk, which generally involves going around a loop and coming back to where you started, was an especially appropriate action for Hamilton to be taking during which to have an insight into the structure of rotations. 
        </p>
        <p>
          We'll start in 0 dimensions and work our way up. At each level we'll look at points within the space and operations we can perform on them. Although I've attempted to make this article as self-contained as possible and to build quaternions "from scratch", my main objective is to help those who are already somewhat familiar with quaternions to build deeper intuitions. If this is your first introduction to the topic, expect to have to reference some additional sources to be able to follow the whole thing! I've tried to emphasize algebraic, geometric, and operational perspectives that I have found useful for working with 3d software tools and libraries, but also hope it can be enjoyed more broadly by anyone interested in these fascinating structures for whatever reason!
        </p>
      </div>
    </article>
  )
}