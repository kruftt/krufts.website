import '@/app/articles/quats-from-scratch/3/3d.css'

export default function Page3({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <article>
      <h2 className="m-auto text-3xl mt-8 flex justify-center">
        Dimension 3
      </h2>
      <h3 className="m-auto text-l mb-4 flex justify-center">
        <i>It all revolves around this</i>
      </h3>

      <p>
        Home at last, three dimensions. We get from two to three dimensions in the same way as before, tack on another dimension, gesture at the pythagorean theorem, and call it good. This gives us a position in three 3 dimensions that we can add, subtract, and scale as desired.
      </p>

      <div className="text-center">
        {"\\(p=(a,b,c)\\)"}
      </div>

      <p>
        We would like to extend our rotation capabilities into three dimensions and to write down a corresponding algebra. We have previously noted that each component of action needs its own element in the algebra. Lets look at what the pieces of a 3d rotation are.
      </p>
      <p>
        The basic picture is similar to 2 dimensions in that it clearly involves an exchange of direction from one direction to another. The main difference is that in 3 dimensions there is an <i>axis</i> of rotation that goes along for the ride without exchanging with the other two. We can picture a top spinning on its axis:
      </p>

      <div className="flex flex-col items-center">
        <img src="/img/math/top.png" className="max-w-7/8 max-h-70" alt="A ray from the origin." />
      </div>
      <p>
        Just as in 1 and 2 dimensions, we have a modulus and an argument, but now we need something more. We need to know the axis of rotation.
      </p>

      

      <p>
        To form an algebra, the first thing we need is to know how much to stay vs how much to rotate. Just like with the complex numbers, we can then use the pythagorean theorem to transition between the "stay" and "rotate" behaviors. In the 2-D case the rotation behavior was relatively straightforward. We did a swap and a flip to get the two dimensions going in a cycle. In the 3-D case, there is an additional "rotating in place" behavior along the axis alongside the two cycling components. That is to say, when doing a quarter rotation along the first axis we expect our translated point to be:
      </p>

      <div className="text-center">
        {"\\((a,b,c) \\rightarrow (a,-c,b)\\)"}
      </div>

      <p>
        Where the first component {"\\(a\\)"} is on the axis of rotation, and {"\\(b\\)"} and {"\\(c\\)"} are being rotated in the plane.
      </p>

      <img src="/img/math/3d_components.png" className="max-w-7/8 max-h-100 m-auto" alt="A ray from the origin." />

      <h2 className="m-auto text-3xl mt-8 flex justify-center">
        A Bubble Collapses
      </h2>
      <h3 className="m-auto text-l mb-4 flex justify-center">
        <i>The Singularity is Here</i>
      </h3>

      <p>
        Suppose we just keep the exact same setup as in two dimensions and tack on the axis of rotation to go along for the ride:
      </p>

      <img src="/img/math/two_var.png" className="max-w-7/8 max-h-80 m-auto" alt="A ray from the origin." />

      <div className="flex justify-evenly">
        <div className="flex flex-col items-center">
          <span>{"\\(i^2=-1\\)"}</span>
          <span>{"\\(ij=j\\)"}</span>
        </div>
        <div className="flex flex-col items-center">
          <span>{"\\(j^2=-1\\)"}</span>
          <span>{"\\(ji=i\\)"}</span>
        </div>
      </div>

      <p>
        There are some strange things afoot, the first of which is that {"\\(ij \\neq ji \\)"}. The order of actions can no longer be switched, they no longer commute ("commute" means "change together"). This is reflecting the fact that we have to be clear which axis is doing the rotating and which is being rotated. Doing rotations in reverse order does not usually result in the same translation. This is contrary to two dimensions in which we could exchange the order freely, and only the total amount of rotation mattered in the end. Losing commutativity is certainly a complication but appears unavoidable, given the issue of axes rotating each other. 
      </p>

      <p>
        Moving on to the second issue and, unfortunately, it is catastrophic. We can see it by substituting {"\\(ij=j\\)"} into itself:
      </p>

      <div className="flex flex-col items-center">
        <span>{"\\(ij=j\\)"}</span>
        <span>{"\\(iij=j\\)"}</span>
        <span>{"\\(-j=j\\)"}</span>
        <span>{"\\(2j=0\\)"}</span>
        <span>{"\\(i=j=0\\)"}</span>
      </div>

      <img src="/img/math/bubble.png" className="max-w-7/8 max-h-60 m-auto mt-8 mb-6" alt="A ray from the origin." />

      <p>
        Its all collapsed! What happened!? The problem is we are trying to get these elements to perform double duty. The first statements, like {"\\(i^2=-1\\)"}, tell them to act as rotations, while the second statements, {"\\(ij=j\\)"}, tell them to act as the identity. But when we combine these behaviors into a single statement it collapses back into the singularity, which is the only place where both of these behaviors can be part of the same action! Similarly, if {"\\(i\\)"} and {"\\(j\\)"} dont affect each other, how will we rotate between them? We cannot expect {"\\(1\\)"} to step in and perform double duty either.
      </p>

      <h2 className="m-auto text-3xl mt-8 flex justify-center">
        The Third Wheel
      </h2>
      <h3 className="m-auto text-l mb-4 flex justify-center">
        <i>Two is Company, Three's a crowd</i>
      </h3>

      <p>
        In 2 dimensions, we only had one possible plane of rotation, so we were able to use only one algebraic variable to represent turning in that plane. Conveniently, this allows us to think of both points and rotations in 2-Dimensions. But now that we have three possible planes of rotation, we need a variable for each one. Plus, we need extra room for information about how much to rotate at all. Therefore, looking ahead we expect terms in our algebra to have the general form:
      </p>

      <div className="text-center">
        <div>{"\\(a + bi + cj + dk\\)"}</div>
      </div>

      <img src="/img/math/planar_actions.png" className="max-w-7/8 max-h-100 m-auto mt-8 mb-4" alt="A ray from the origin." />

      <p>
        Each complex variable represents a rotation action in one of the planes of rotation / around one of the axes, while the real component represents staying in place. Furthermore, we know this real component cannot be on an axis or else the algebra collapses. So now we have three algebraic variables, taking up all three dimensions. Where has the real component gone? Can we just forget it entirely? How do we interpret what these actions do e.g. to the number 1? We know that:
      </p>
      <div className="text-center">
        {"\\(i\\cdot1=i\\)"}
      </div>
      <p>
        But 1 is no longer in our picture! 
      </p>

      <p>
        Consider that turning all the way around on an axis is, at least positionally, equivalent to staying in place. Algebraically we can say {"\\(i^4=1\\)"}. But we also know that {"\\(i\\neq \\pm1\\)"}. This means i must cycle with 1 in exactly the same 4-step procedure as in the 2-D case.
      </p>

      <div className="bg-[url(/img/math/twister.png)] bg-cover bg-center w-1/1 pb-10 z-10">

        <h2 className="m-auto text-3xl mt-8 flex justify-center">
          The Eye of the Storm
        </h2>
        <h3 className="m-auto text-l mb-4 flex justify-center">
          <i>It's a real twister</i>
        </h3>

        <div className="flex flex-col items-center">
          <span>Therefore we have:</span>
          <span>{"\\(i^2=-1\\)"}</span>
          <span>{"\\(j^2=-1\\)"}</span>
          <span>{"\\(k^2=-1\\)"}</span>
          <br />
          <span>{"\\(ij=k\\)"}</span>
          <span>{"\\(jk=i\\)"}</span>
          <span>{"\\(ki=j\\)"}</span>
          <br />
          <span>{"\\(ij=k\\)"}</span>
          <span>{"\\(ijk=k^2\\)"}</span>
          <span>{"\\(ijk=-1\\)"}</span>
          <span>{"\\(ijk=i^2=j^2=k^2=-1\\)"}</span>
        </div>
      </div>

      <p>
        The algebra doesn't collapse, but things are getting a bit carried away! We have an algebra that can rotate on all three axes, but it does something else. Part of the component parallel to the axis of rotation, the part that is twisting in place, is getting cycled toward -1. We were only considering the real component to be part of the action, meaning "stay-in-place", but now its part of the resulting position. The component along the axis is therefore liable to collapse to 0 or to end up going the opposite way entirely! We only know where its "supposed" to go because of the context of the action that generated it.
      </p>

      <img src="/img/math/axis_actions.png" className="max-w-7/8 max-h-80 m-auto" alt="A ray from the origin." />

      <p>
        Its important to look here at what the algebra is telling us. It is saying that the "stay-in-place" and "rotate-in-place" behaviors are two aspects of the same behavior. They both have the same effect on the final position, of not moving, but how they get there is different. Therefore the "position" that it gives back to us splits the axis component in two, the part that stayed and the part that twisted. If we want to view a quaternion as representing a point in 3d space, we have to transform it in such a way that the scalar component remains 0, but if there is any part parallel to the axis of rotation then the twisting accumulates in the scalar component!
      </p>

      <p>
        After doing a multiplication, we <i>could</i> step out of the algebra and use the pythagorean theorem to sum up the lengths of the axis and twisted components, but this completely defeats the purpose of having an algebra! We need to be able to undo the twist without undoing the rotation. We have to go on a walk "there and back again", to turn left then right, or in this case, to twist and untwist.
      </p>

      <h2 className="m-auto text-3xl mt-8 flex justify-center">
        Controlled Opposition
      </h2>
      <h3 className="m-auto text-l mb-4 flex justify-center">
        <i>How to pull the strings</i>
      </h3>

      <img src="/img/math/cats_cradle.png" className="max-w-7/8 max-h-80 m-auto" alt="A ray from the origin." />

      <p>
        Is there anything fundamentally different between the two cycles that will allow them to be separated? Recall that the order in which axes multiply matters because it keeps track of which axis is rotating the other. We need to connect this antisymmetric behavior on the plane of rotation, where order matters, with the symmetric behavior of an axis twisting on itself, where the order is irrelevant.
      </p>

      <p>
        Let's look at the resulting actions from swapping the order of {"\\(ii\\)"} and {"\\(ij\\)"}. The green and gold arrows represent left and right multiplication by {"\\(i\\)"} respectively. When acting on itself, the order doesn't matter, but when acting within the plane of rotation, reversing the order makes it as if we rotated from the opposite axis, along the red arrow! Switching the order gives a reversed rotation, but with the same twist along the axis.
      </p>

      <div className="flex justify-evenly">
        <img src="/img/math/ij_vs_ji.png" className="max-w-7/8 max-h-100 m-auto" alt="A ray from the origin." />
      </div>


      <p>
        Now suppose we have taken the first green action, i. j has moved to k, while i, along the axis of rotation, has done a twist into -1. We take advantage of the anti-commutativity in the plane of rotation to undo this twist while doubling up on the rotation. Lets look at the next step, with the complex conjugate {"\\(i^*\\)"}, to undo the twist.
      </p>

      <img src="/img/math/i_inverse.png" className="max-w-7/8 max-h-100 m-auto" alt="A ray from the origin." />

      <p>
        Now, instead of following the counter-clockwise green path representing left multiplication by {"\\(i^*\\)"}, we multiply on the right and we follow the gold/red paths. The rotation doubles and the twist cancels out, leaving us only with movement in the plane of rotation!
      </p>

      <div className='flex justify-center'>
        <div className="relative">
          <img src="/img/math/ij_vs_ji.png" id="c1" className="m-auto cycle max-w-7/8 max-h-100" alt="A ray from the origin." />
          <img src="/img/math/i_inverse.png" id="c2" className="cycle max-w-7/8 max-h-100" alt="A ray from the origin." />
          <img src="/img/math/rotation_result.png" id="c3" className="cycle max-w-7/8 max-h-100" alt="A ray from the origin." />
        </div>
      </div>


      <div className="flex flex-col items-center">
        <span>{"\\(i(i+j)i^*\\)"}</span>
        <span>{"\\((-1+k)i^*\\)"}</span>
        <span>{"\\(i - j\\)"}</span>
      </div>

      <p>
        We have performed a rotation action around {"\\(i\\)"}, but this time going a full half circle (as opposed to a quarter turn in 2d) by performing the action twice in order to do and undo the twist. This is why quaternions use half the angle of the rotation they are meant to represent. Therefore, to perform a rotation of angle {"\\(\\theta\\)"} around axis {"\\(i\\)"}, we can use a quaternion that looks strikingly similar to the 2d case, but the angle has been divided in 2 for its use in this two-step operation:
      </p>

      <div className="flex flex-col items-center">
        <span>{"\\(q = \\cos{\\frac{\\theta}{2}}+i\\sin{\\frac{\\theta}{2}}\\)"}</span>
        <span>{"\\(q^{-1} = \\cos{\\frac{\\theta}{2}}-i\\sin{\\frac{\\theta}{2}}\\)"}</span>
        <span>{"\\(p' = qpq^{-1}\\)"}</span>
      </div>

      <p>
        So we've rotated a vector {"\\(p\\)"} around {"\\(i\\)"} for an angle {"\\(\\theta\\)"}. But, seeing as we've defined everything symmetrically, {"\\(i\\)"} could have been any unit vector involving {"\\((i,j,k)\\)"} around which to rotate! Any quaternion with a length of 1, called a versor, could be substituted in for {"\\(q\\)"} in order to rotate around its axis.
      </p>

      <h2 className="m-auto text-3xl mt-8 flex justify-center">
        The Middle Way
      </h2>
      <h3 className="m-auto text-l mb-4 flex justify-center">
        <i>Its a push and pull</i>
      </h3>

      <p>
        This process of placing a versor and its conjugate on either side is called conjugation. The word <i>conjugate</i> apparently shares a root with the word <i>yoke</i>, as in a beam that binds working oxen. We can say we have conjugated {"\\(p\\)"} by {"\\(q\\)"} in order to rotate it, so {"\\(p\\)"} and {"\\(p'\\)"} are related through {"\\(q\\)"}. I suppose the quaternions are like oxen, working hard to rotate {"\\(p\\)"} around the axis via the yoke of conjugation!
      </p>

      <p>
        Tracing through all the components of the operation, we can see how the real component in the second step, the twist, gets cancelled out, while the rotation doubles up:
      </p>

      <div className='flex justify-center'>
        <div className="relative">
          <img src="/img/math/yoke_terms.png" id="y1" className="m-auto yoke max-w-9/10 max-h-150" alt="A ray from the origin." />
          <img src="/img/math/yoke_actions.png" id="y2" className="yoke max-w-9/10 max-h-150" alt="A ray from the origin." />
        </div>
      </div>

      <div className='flex flex-col items-center'>
        <span>{"\\(p = ai + bj + ck\\)"}</span>
        <span>{"\\(q = \\cos{\\frac{\\theta}{2}} + \\sin{\\frac{\\theta}{2}}\\hat{u}\\)"}</span>
        <span>{"\\(q^{-1} = \\cos{\\frac{\\theta}{2}} - \\sin{\\frac{\\theta}{2}}\\hat{u}\\)"}</span>
        <span>{"\\(p' = qpq^{-1}\\)"}</span>
      </div>

    </article>
  );
}
