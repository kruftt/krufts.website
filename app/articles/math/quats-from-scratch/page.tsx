import { MathJax } from "better-react-mathjax"

export default function QuatsFromScratch() {
  return (
    <article>
      <div className="text-center">
        <h1 className="m-auto max-w-2/5 text-3xl mt-4 mb-12 flex justify-center">
          Quaternions from Scratch
        </h1>
      </div>
      <div>
        <MathJax>
          <p>
            Quaternions come up in subjects that deal with 3d rotations, such as computer vision and graphics, robotics, and physics. Even though quaternions were the original source of the 3d vector operations that most people are familiar with, the dot product and the cross product, they unfortunately remain an enigma to many people who use them. There is a common misconception that understanding these <i>complex</i> algebraic devices requires a special capacity to imagine a non-intuitive 4-dimensional space, but I am here to tell you that this is not the case!
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
            We'll start at 0 dimensional space and work our way up. At each level we'll look at points within in the space and operations we can perform on them.
          </p>
          <h2 className="m-auto text-3xl mt-8 flex justify-center">
            Dimension 0
          </h2>
          <h3 className="m-auto text-l mb-4 flex justify-center">
            <i>Let There Be</i>
          </h3>
          <img src="/img/math/zero.png" className="max-w-7/8 max-h-20 m-auto mb-4" alt="Zero." />
          <p>
            The word "dimension" means "to measure apart". In 0 dimensions, there is no way to "measure apart" from the origin. The meaning of "origin" is "to begin", "to rise", and "to come forth". We have the reference point from which we could potentially measure, but no dimension defined in which to do so. The only actions we can take are to stay where we are, since there is nowhere else to go. In 0 dimensions the beginning and the end are one, a singularity.
          </p>
          <div className="w-full flex flex-col text-center">
            <span>{"\\(p=0\\)"}</span>
          </div>
          
          <h2 className="m-auto text-3xl mt-8 flex justify-center">
            Dimension 1
          </h2>
          <h3 className="m-auto text-l mb-4 flex justify-center">
            <i>Let There Be Measure</i>
          </h3>
          <img src="/img/math/ray.png" className="max-w-7/8 max-h-35 m-auto" alt="A ray from the origin." />
          <p>
            Suppose now we have a dimension, a way to "measure apart". What can we do? We can start at the origin and move along this dimension, like a ray of light. We can stop at some point and make it our basis, declaring "we are now 1 unit from the origin". Then we can measure distances to other points by comparison to our new basis element.
          </p>
          <p>
            Moving a point from the origin is called translation, meaning literally "to carry across". We carry the point, put it down, then say we have changed its "position", meaning "the spot where it has been put". Translation is represented by addition.
          </p>
          <div className="w-full flex flex-col text-center">
            <span>{"\\(0+1=1\\)"}</span>
            <span>{"\\(0+r=p\\)"}</span>
          </div>
          <p>
            What have we lost by adding this dimension? The simplicity of the singularity. It is no longer the case that there is only one point and all actions take this point to itself. Equations are easier to deal with when 0 is the only element, but we've exchanged that simple structure for points on a line. These can at least be ordered with respect to their directions and distances from the origin, with each having its own place along the same line.
          </p>
          <h2 className="m-auto text-3xl mt-8 flex justify-center">
            Scalars and Scaling
          </h2>
          <h3 className="m-auto text-l mb-4 flex justify-center">
            <i>Ladders all the way down</i>
          </h3>
          <p>
            Imagine that going along a ray is like scaling a ladder with rungs that are one unit apart. The number of rungs on the ladder is proportional to its length. Accordingly, these lengths are called "scalars", as they tell us how many rungs it would take to scale to a given position. We can add and multiply these scalars to move around the line. When we multiply two scalars together, it is as if we are using the entirety of one as the rungs of the other.
          </p>
          <img src="/img/math/scalar_multiples.png" className="max-w-7/8 max-h-60 m-auto" alt="A ray from the origin." />
          <p>
            If we multiply by 1, we stay at the same scale. 1 says, "Don't change, be yourself!". Accordingly, it is called the multiplicative identity. Contrast this with multiplying by 0, which says, "Whatever you were doing doesn't matter, it's over now!" You might say to multiply by 0 is to terminate, since once the ladder shrinks to scale 0, there is no getting out. 0 is the end of the line.
          </p>
          <div className="w-full flex flex-col text-center">
            <span>{"\\(1*p=p\\)"}</span>
            <span>{"\\(0*p=0\\)"}</span>
          </div>
          <p>
            Okay, so but what if we climb back down a ladder? If we are able to move from the origin out to a position, what action takes us back toward the origin? This is the "inverse" translation, meaning "turned inward". But then where do we get if we keep going? What if we had walked the other direction to begin with? The respective positions reached by going forward vs backward are called "opposites", meaning "placed across". Since adding them together gets 0, they are called additive inverses.
          </p>
          <br />
          <img src="/img/math/opposites.png" className="max-w-7/8 max-h-18 m-auto" alt="A ray from the origin." />
          <div className="w-full flex flex-col text-center">
            <span>{"\\(p+(-p)=0\\)"}</span>
          </div>
          
          
          <p>
            The movement of going from a position to its opposite, or vice versa, is called a "reflection" meaning "something that is bent back". There are two ways we can take a reflection, we can either do two inverse translations, or scale by -1.
          </p>
          <div className="w-full flex flex-col text-center">
            <span>{"\\(p+2(-p)=-p\\)"}</span>
            <span>{"\\((-1)(p)=-p\\)"}</span>
          </div>
          <p>
            Notice that we've gotten two directions out of a single dimension by considering whether go forward or backward from the origin. In this way, even though we can represent both a point and an action of getting to that point by a single real number, we can think about the action as specifying two aspects of behavior, namely "which direction" and "how far".
          </p>
          <img src="/img/math/scalar_action.png" className="max-w-7/8 max-h-12 m-auto" alt="A ray from the origin." />

          <h2 className="m-auto text-3xl mt-8 flex justify-center">
            There and Back Again
          </h2>
          <h3 className="m-auto text-l mb-4 flex justify-center">
            <i>Who's Keeping Track?</i>
          </h3>
          <p>
            Let's say we go on a strenuous hike and return to where we started. From the perspective of our final position, its just the same as if we never left! If we want any record of our journey we have to look at the distances of each of our series of actions. Then we could add up all the "how fars" while ignoring the direction, as if we had taken the absolute values at each step of the path.
          </p>
          (TODO: change distance to length)
          <div className="w-full flex justify-center gap-8 flex-wrap">
            <div className="flex flex-col text-center">
              <img src="/img/math/0_p.png" className="max-w-7/8 max-h-14 m-auto mb-4" alt="A ray from the origin." />
              <span>{"\\(position(+,r)+position(-,r)\\)"}</span>
              <span>{"\\(=p+(-p)\\)"}</span>
              <span>{"\\(=0\\)"}</span>
            </div>
            <div className="flex flex-col text-center">
              <img src="/img/math/2_d.png" className="max-w-7/8 max-h-14 m-auto mb-4" alt="A ray from the origin." />
              <span>{"\\(distance(+,r)+distance(-,r)\\)"}</span>
              <span>{"\\(=d+d\\)"}</span>
              <span>{"\\(=2d\\)"}</span>
            </div>
          </div>
          <p>
            If we want to take a hike of distance {"\\(d\\)"} and get back to where we started, we need to walk a distance of {"\\(\\frac{d}{2}\\)"} out and back again. The distance function doesn't care what direction we go and sums up the same either way. This sort of behavior is called being "even". Meanwhile, going in the opposite direction changes the sign of the resulting position. This is called being "odd". The difference is that the position takes orientation into account while distance doesn't.
          </p>

          <p>
            But what's to stop us from turning around and then moving backward in order to go what was originally forward? Nothing! It turns out we actually have two ways of getting to any given point. Either we can turn to face the point and go straight there, or else we can face away from the point and move backward. This feature of having two ways to get to each position is called a double-cover. If we only look at the resulting position, however, we lose track of how we got there.
          </p>
          <div className="flex flex-wrap justify-evenly">
            <img src="/img/math/double_cover_1.png" className="max-w-7/8 max-h-30" alt="A ray from the origin." />
            <img src="/img/math/double_cover_2.png" className="max-w-7/8 max-h-30" alt="A ray from the origin." />
          </div>
          
          <p>
            If, instead of adding them up, we take the differences between the first and second parts of our walk, we bring out the odd/position behavior instead of the even/distance behavior:
          </p>

          <div className="w-full flex justify-center gap-8 flex-wrap">
            <div className="flex flex-col text-center">
              <img src="/img/math/2_p.png" className="max-w-7/8 max-h-14 m-auto mb-4" alt="A ray from the origin." />
              <span>{"\\(position(+,r)-position(-,r)\\)"}</span>
              <span>{"\\(=p-(-p)\\)"}</span>
              <span>{"\\(=2p\\)"}</span>
            </div>
            <div className="flex flex-col text-center">
              <img src="/img/math/0_d.png" className="max-w-7/8 max-h-14 m-auto mb-4" alt="A ray from the origin." />
              <span>{"\\(distance(+,r)-distance(-,r)\\)"}</span>
              <span>{"\\(=d-d\\)"}</span>
              <span>{"\\(=0\\)"}</span>
            </div>
          </div>

          <p>
            Isolating different behaviors in this way, by decomposing into independent components, then negating one of the components or not in a two-term operation, is a common technique.
          </p>
          
          {/* <h2 className="m-auto text-3xl mt-8 flex justify-center">
            Let There Be ... Identify, Invert, Terminate!
          </h2>
          <h3 className="m-auto text-l mb-4 flex justify-center">
            <i>Who died and made you king?</i>
          </h3>
          (todo -- cover these in their relevant sections)
          <p>
            Let's take a moment to consider where we are. We declared a dimension and the movement of a point from the origin along this dimension, called a translation. We can track the distance of a translation with scalar values, and can take scalar multiples of translations. So we have translation and scaling, but there are some special things to note.
          </p>
          
          <p>
            Next, consider the operation of translating by 0. This was possible even in the singularity. This represents a translation in which the final position is the same as the start. If we add 0 to any other scalar, we will stay at that scalar. For this reason, 0 is called the additive identity.
          </p>
          <p>
            Adding 1
          </p>
          <p>
            Next consider multiplication by 1. As an action it says, "Do the same thing, don't change, be yourself!". Some find 1 to be overly affirming. At any rate 1 is referred to as the "identity element" and multiplying by 1 is called the "multiplicative identity". 
          </p>
          <p>
            multiplication by -1.
          </p>
          <p>
            So, scalar actions allow us to go forward or backward as well as shorter or farther. We can go up or down the ladder, or walk forward or backward, as one prefers to imagine. Notice that although we consider our points as being in one dimension, with a domain of [-inf:inf], we can consider those same points as actions with two components, the +/- sign, effectively taking a value of +/- 1 and the scalar magnitude, taking a value of 0 or greater.
          </p> */}
          <br />
          <h2 className="m-auto text-3xl mt-8 flex justify-center">
            Dimension 2
          </h2>
          <h3 className="m-auto text-l mb-4 flex justify-center">
            <i>We're Ramping</i>
          </h3>
          <p>
            Suppose now we have a second dimension, just like the first, and we're free to move in either dimension independently. This raises the question, "What happens when we move in both directions at the same time?" The answer depends on what kind of space we're in, and here we're assuming we're in good old-fashioned Euclidean space, where the pythagorean theorem holds:
          </p>
          
          <div className="flex flex-wrap justify-evenly">
            <img src="/img/math/pythagorean.png" className="max-w-7/8 max-h-60" alt="A ray from the origin." />
            <img src="/img/math/trig.png" className="max-w-7/8 max-h-60" alt="A ray from the origin." />
          </div>
          
          <p>
            Meaning that if we move a distance of a along the first dimension and a distance of b along the second dimension, it is the same as moving a distance of {"\\(\\sqrt{a^2 + b^2}\\)"} straight toward the final position. If we want to scale this distance, we can simply scale both components, which will keep us going in the same direction.
          </p>
          <p>
            This is all well and good but raises another question, what about an action that takes us from where we got by going along one direction, to where we would have gone had we gone in another direction? Similar to taking the reflection in 1 dimension, but instead of going in the opposite direction, we can go in any combination of directions instead.
          </p>
          <h2 className="m-auto text-3xl mt-8 flex justify-center">
            Rotation
          </h2>
          <h3 className="m-auto text-l mb-4 flex justify-center">
            <i>What goes around comes around</i>
          </h3>
          (basic drawing of rotation)
          {/*
          (Reflection (multiplicative inverse) is double additive inverse, rotation is double reflection - rotational inverse)
          */}
          <p>
            There are two basic behaviors we want to capture. The first is easy, staying in place, staying in the same direction. We already know how to do that: multiply by 1, our affirming friend the identity element. The other behavior is to rotate, that is, to shift our position from one direction to another. We can take a base case of rotating such that we go from along the first direction to along the second. That is to say we want it to take the point (a,0) to the point (0,a) and similarly the point from (-a,0) to (0,-a).
          </p>
          (drawing of the two axis movements)
          <p>
            This works for rotating scalar distance from the first dimension to the second, but how should we rotate from the second back to the first? Our first guess could be to proceed in the same away, by a simple swap, resulting in taking (a,b) -&gt; (b,a). This works in the same way to rotate the point (0,1), along the second dimension, to (1,0), along the first. But now consider the point (1,1), where does that go? When we swap we end up back at (1,1). We wanted to go in a totally different direction but we haven't moved at all! We're moving forward in both directions in the same amount, so swapping which distance we go in which direction doesn't have any effect. During one of the swaps, we need to invert the direction to split them up: (a,b) -&gt; (b,-a). This gets all four directions going in a cycle together. We can finally rest assured that walking backwards is the same as turning around and walking forwards.
          </p>
          (drawing of the two options for moving b)
          <p>
            Now that we have our two behaviors, staying in place and going in a cycle, we can exchange between them according to the pythagorean theorem. This will keep the overall distance we are going the same while allowing us to change direction.
          </p>
          (Drawing of 2d grid with R action on the unit circle)

          (TODO: Some comments here about losing ordering but gaining continuous orientation).

          <h2 className="m-auto text-3xl mt-8 flex justify-center">
            Complexification
          </h2>
          <h3 className="m-auto text-l mb-4 flex justify-center">
            <i>Getting all mixed up</i>
          </h3>
          <p>
            (rcos, -rsin) = rotate and scale
            The word "complex" means "folded together", and the complex numbers are folded together into a cycle.

            point as (x,y) euclidean coordinates
            point as defining (r, theta) scale and rotation
            
            position -+ action toggle
            positions are independent scalars
            The action is a complex of the information
            the range of theta is [-2pi:2pi], analogous to (-1, 1) before
          </p>
          
          <h2 className="m-auto text-3xl mt-8 flex justify-center">
            Dimension 3
          </h2>
          <h3 className="m-auto text-l mb-4 flex justify-center">
            <i>It's getting crowded</i>
          </h3>
          
          The amount of behavior is stored in the same way.. start with the identity transform.
          cos(t) + sin(t)*Rotate map

          - Jumping Through hoops
          
          The rotation behavior depends on the axis unit vector
          Use pictures here for guidance on what the rotation mapping is like in general
          There is a rotation component just like in 2d.
          But there is also an axis component, that is rotating in place

          <h2 className="m-auto text-3xl mt-8 flex justify-center">
            The Eye of the Storm
          </h2>
          <h3 className="m-auto text-l mb-4 flex justify-center">
            <i>It's a real twister</i>
          </h3>

          <h2 className="m-auto text-3xl mt-8 flex justify-center">
            Controlled Opposition
          </h2>
          <h3 className="m-auto text-l mb-4 flex justify-center">
            <i>How to pull the strings</i>
          </h3>
          
          The straight cos(t) piece and the rotated sin(t) piece are separated but we have to get them back together
          push/pull left/right
          This is what causes anti-commutativity
          Or do we..?

          (side-by-side diagram with left and right unit quaternions that can be manipulated?)

          position vs action toggle


          real component is the immeasurable direction

                    
            
          

          go back and show 2d was lacking orientation without dividing the operation into 2 (2d is non-ordered, we need to be table to take 2 shortest paths to the same place)

          <p>
            When
            <span>{"\\(ax^2 + bx + c\\)"}</span>
            . Then 
            <span>{"\\(x = \\frac{-b \\pm \\sqrt{b^2-4ac}}{2a}.\\)"}</span>
            Also: 
            <span>{"\\(\\frac{10}{4x} \\approx 2^{12}\\)"}</span>
          </p>
        </MathJax>
      </div>
    </article>
  )
}