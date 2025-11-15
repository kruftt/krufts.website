'use client'

export default function QuatsFromScratch() {
  return (
    <article>
      <div>
        <p>
          Quaternions are an algebra that come up in subjects dealing with 3d rotations, such as computer vision and graphics, robotics, and physics. Even though quaternions were the original source of the 3d vector operations that most people are familiar with, the dot product and the cross product, they unfortunately remain an enigma to many people who use them. There is a common misconception that understanding these <i>complex</i> algebraic devices requires a special capacity to imagine a non-intuitive 4-dimensional space, but I am here to tell you that this is not the case!
        </p>
        <img src="/img/math/quat_to_vec.png" className="max-w-7/8 max-h-80 m-auto" alt="Quaternion multiplication contains the dot and cross products." />
        <p>
          Some aspects of the common story may seem a bit fishy:
        </p>
        <ul className="list-disc ml-8 mt-4 mb-6">
          <li>Why do quaternions have 4 variables when we can picture something rotating in 3d space just fine?</li>
          <li>Why do rotation quaternions, "versors", use half the rotation angle?</li>
          <li>Supposing vector and matrix operations are better, why do we still use quaternions in actual practice?</li>
          <li>If there are no good intuitions for how they work, how could someone have conceived of them while out on a walk, before the standard vector operations?</li>
        </ul>
        <p>
          Hopefully I can help illuminate these questions and more in this article. I'll add ahead of time that I think taking a walk, which generally involves going around a loop and coming back to where you started, is an especially appropriate action to be taking during which to have an insight into the structure of rotations. 
        </p>
        <p>
          We'll start in 0 dimensions and work our way up. At each level we'll look at points within in the space and operations we can perform on them. 
        </p>
        <p>
          I intend for this article to be a refresher or something like a second or third introduction to the various topics inside, with a strong emphasis on geometric perspectives that I think are useful for people who use various 2d and 3d software programs. I also hope it can be enjoyed more broadly by people who are interested in these fascinating structures for whatever reason!
        </p>
      </div>
    </article>
  )
}