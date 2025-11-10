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
        We would like to extend our ability to rotate into three dimensions and to write down a corresponding algebra. We have previously noted that each component of action needs its own element in the algebra. Lets look at what the pieces of a 3d rotation are.
      </p>
      <p>
        The basic picture is similar to 2 dimensions in that it clearly involves an exchange of direction from one direction to another. The main difference is that in 3 dimensions there is an <i>axis</i> of rotation that goes along for the ride without exchanging with the other two. We can picture a top spinning on its axis:
      </p>

      (TODO: Change to merry-go-round with handles. Add knob to axis)
      <div className="flex flex-col items-center">
        <img src="/img/math/top.png" className="max-w-7/8 max-h-70" alt="A ray from the origin." />
      </div>
      <p>
        Just as in 1 and 2 dimensions, we have a modulus and an argument, but now we need something more. We need to know the axis of rotation.
      </p>

      <div className="text-center">
        {"\\((r,\\theta,\\hat{v_{a}})\\)"}
      </div>


      <p>
        To form an algebra, the first thing we need is to know how much to stay vs how much to rotate. Just like with the complex numbers, we can then use the pythagorean theorem to transition between the "stay" and "rotate" behaviors. In the 2-D case the rotation behavior was relatively straightforward. We needed the 4 directions of the two dimensions to go in a cycle, which was achieved by a swap and a flip. In the 3-D case there is an additional "rotating in place" behavior along the axis.
      </p>

      <img src="/img/math/3d_components.png" className="max-w-7/8 max-h-80 m-auto" alt="A ray from the origin." />

      <h2 className="m-auto text-3xl mt-8 flex justify-center">
        A Bubble Collapses
      </h2>
      <h3 className="m-auto text-l mb-4 flex justify-center">
        <i>The Singularity is Here</i>
      </h3>

      <p>
        Suppose we just keep the exact same setup as in two dimensions and tack on another dimension, the axis of rotation, to go along for the ride:
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
        There are some strange things afoot, the first of which is that {"\\(ij \\neq ji \\)"}. The order of actions can no longer be switched, they no longer commute ("commute" means "change together"). This is reflecting the fact that rotating along the plane of rotation of one of the imaginary variables leaves the other alone, so we have to be clear which is rotating which, whereas in two dimensions we could freely interchange terms.
      </p>

      <p>
        That's not so bad, but unfortunately the second issue is catastrophic. We can see it by substituting {"\\(ij=j\\)"} into itself:
      </p>

      <div className="flex flex-col items-center">
        <span>{"\\(ij=j\\)"}</span>
        <span>{"\\(iij=j\\)"}</span>
        <span>{"\\(-j=j\\)"}</span>
        <span>{"\\(2j=0\\)"}</span>
        <span>{"\\(i=j=0\\)"}</span>
      </div>

      (TODO: change to actually bursting)
      <img src="/img/math/bubble.png" className="max-w-7/8 max-h-80 m-auto" alt="A ray from the origin." />

      <p>
        Its all collapsed! What happened!? The problem is we are trying to get these elements to perform double duty. To cause a rotation with the first statement and to act as the identity action in the second. But when we combine these behaviors into a single statement it collapses back into the singularity, which is the only place where both of these behaviors can be part of the same action.
      </p>

      <h2 className="m-auto text-3xl mt-8 flex justify-center">
        The Third Wheel
      </h2>
      <h3 className="m-auto text-l mb-4 flex justify-center">
        <i>Two is Company, Three's a crowd</i>
      </h3>

      <p>
        In 2 dimensions, we only had one possible plane of rotation, so we were able to use only one algebraic variable to represent turning in that plane. Conveniently, this allows us to think of both points and rotations in 2-Dimensions. But now we have three possible planes of rotation and we need a variable for each one, in addition to information about how much to rotate. Therefore, looking ahead we expect terms in our algebra to have the general form:
      </p>

      <div className="text-center">
        <div>{"\\(a + bi + cj + dk\\)"}</div>
      </div>

      (TODO: Label axes)
      <img src="/img/math/planar_actions.png" className="max-w-7/8 max-h-80 m-auto" alt="A ray from the origin." />

      <p>
        With each variable representing a rotation action in one of the planes of rotation / around one of the axes. Furthermore, we know 1 cannot be on an axis or else the algebra collapses. So now we have three algebraic variables, taking up all three dimensions. Where has 1, the identity action, gone? How do we interpret what these actions do to 1? E.g. we know that:
      </p>
      <div className="text-center">
        {"\\(i\\cdot1=i\\)"}
      </div>
      <p>
        But 1 no longer has a place in our picture!
      </p>

      <p>
        Consider that turning all the way around on an axis is positionally equivalent to staying in place. Algebraically we can say {"\\(i^4=1\\)"}. But we also know that {"\\(i\\neq \\pm1\\)"}. This means i must cycle with 1 in exactly the same 4-step procedure as in the 2-D case.
      </p>

      <div className="bg-[url(/img/math/twister.png)] bg-cover bg-center max-w-7/8 pb-4 m-auto">

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
          <span>{"\\(ij=k\\)"}</span>
          <span>{"\\(jk=i\\)"}</span>
          <span>{"\\(ki=j\\)"}</span>
          <span>{"\\(ij=k\\)"}</span>
          <span>{"\\(ijk=k^2\\)"}</span>
          <span>{"\\(ijk=-1\\)"}</span>
          <span>{"\\(ijk=i^2=j^2=k^2=-1\\)"}</span>
        </div>
      </div>

      <p>
        Things are getting a bit carried away! We have an algebra that can rotate on all three axes, but it does something else. Part of the axis of rotation is getting cycled toward -1. It has been broken into two components, and the part that rotated in place, the twisted component, is liable to collapse or end up going the wrong way entirely! We only know where its "supposed" to go because of the context of the rotation that generated it.
      </p>

      (TODO: label the actions of the outer cycle)
      <img src="/img/math/axis_actions.png" className="max-w-7/8 max-h-80 m-auto" alt="A ray from the origin." />

      <p>
        After doing a rotation, we <i>could</i> step out of the algebra and use the pythagorean theorem to sum up the lengths of the two components, but this completely defeats the purpose of having an algebra, its not balancing what we want! We need to be able to undo the twist without undoing the rotation. We have to do something like go on a two-part walk and sum the positional differences in position while canceling out the travelling, or in this case, twisting.
      </p>

      <h2 className="m-auto text-3xl mt-8 flex justify-center">
        Controlled Opposition
      </h2>
      <h3 className="m-auto text-l mb-4 flex justify-center">
        <i>How to pull the strings</i>
      </h3>

      <img src="/img/math/cats_cradle.png" className="max-w-7/8 max-h-80 m-auto" alt="A ray from the origin." />

      <p>
        Is there anything fundamentally different between the two cycles that will allow them to be separated? Recall that the order in which axes multiply matters because it keeps track of which axis is rotating the other. We need to connect this anti-symmetric behavior that occurs between two dimensions with the symmetric behavior of an axis twisting on itself, in which the order is irrelevant.
      </p>

      TODO: Join these pictures and update so the dots actually represent components of the rotating point! Also add a label for i* action

      <div className="flex justify-evenly">
        <img src="/img/math/ij_vs_ji.png" className="max-w-7/8 max-h-90 m-auto" alt="A ray from the origin." />
        <img src="/img/math/symmetric.png" className="max-w-7/8 max-h-70 m-auto" alt="A ray from the origin." />
      </div>

      <p>
        Here we compare the resulting actions from swapping the order of {"\\(ii\\)"} and {"\\(ij\\)"} respectively. When acting on itself, the order doesn't matter, but when acting within the plane of rotation, reversing the order has the effect of reversing the rotation, from counter-clockwise to counter-clockwise.
      </p>

      <p>
        Now suppose we have taken the action i. The components j and k have taken one step in the cycle, while the component i, along the axis of rotation, has done a counter-clockwise twist into -1. We would like to undo this twist but double the rotation by doing a reverse twist from the opposite side. Lets look at the next step, this time with the action {"\\(i^*\\)"} to undo the twist.
      </p>

      (TODO: Change color of i*)
      <img src="/img/math/i_inverse.png" className="max-w-7/8 max-h-100 m-auto" alt="A ray from the origin." />

      <p>
        Now, instead of following the counter-clockwise green path we follow the clockwise red path, but this from with respect to the opposing axis, such that the rotation doubles up and the twisting cancels out.
      </p>

      <p>
      </p>

      (final drawing of the two parts of the operations together)
      (final drawing of all the terms going through the 2-step process)

      (3d interactive visualization)

      (composition: think of quat * quat mult in geo alegra, in which the real is stay-in-place)
      (POSITION : TWIST :: ACTION : REST)

      (What if we wanted to keep track of direction in 2-Dimensions)

      (Give a page with the advanced take in few words.. that in geometric algebra the twisted part is actually a 3-blade that is untwisted by the 2-blade rotor elements into vectors. But when you multiply two quaternions together you're only multiplying rotors and getting rotors or scalars back out. So you don't have to interpret the 3-blade.)

    </article>
  );
}
