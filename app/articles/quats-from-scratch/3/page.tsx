'use client'
import '@/app/articles/quats-from-scratch/3/3d.css'
import MathBlock from '@/components/general/math-block';
import MathInline from '@/components/general/math-inline';
import { QuatsHeader, QuatsCycle } from '../components';

export default function Page3() {
  return (
    <article>

      <QuatsHeader>
        {"Dimension 3"}
        {"It all revolves around this"}
      </QuatsHeader>


      <p>
        Home at last, three dimensions. We get from two to three dimensions in the same way as before, tack on another dimension, gesture at the pythagorean theorem, and call it good. This gives us a position in three 3 dimensions that we can add, subtract, and scale as desired.
      </p>

      <MathBlock>
        p=(a,b,c)
      </MathBlock>

      <p>
        We would like to extend our rotation capabilities into three dimensions and to write down a corresponding algebra. We have previously noted that each component of action needs its own element in the algebra. Lets look at what the pieces of a 3d rotation are.
      </p>

      <p>
        The basic picture is similar to 2 dimensions in that it clearly involves an exchange of direction from one direction to another in a cycle. The main difference is that in 3 dimensions there is an <i>axis</i> of rotation that goes along for the ride without exchanging with the other two. We can picture a top spinning on its axis:
      </p>

      <div className="flex flex-col items-center">
        <img src="/img/math/top.png" className="max-w-7/8 max-h-70" alt="A ray from the origin." />

      </div>

      <p>
        Just as in 1 and 2 dimensions, we can have a modulus (scaling) and an argument (rotation), but now we need something more. Now we need to know the axis of rotation.
      </p>

      <p>
        To form an algebra, the first information we need is how much to stay vs how much to rotate. Just like with 2-Dimensions, we can then use the pythagorean theorem to transition between the "stay" and "rotate" behaviors. In the 2-D case the rotation behavior was relatively straightforward. We did a swap and a flip to get the two dimensions going in a cycle. In the 3-D case, there is an additional "rotating in place" behavior along the axis alongside the two cycling components. That is to say, when doing a quarter rotation along the first axis we expect our translated point to be:
      </p>

      <div className="text-center">
        <MathInline>{"(a,b,c) \\rightarrow (a,-c,b)"}</MathInline>

      </div>

      <p>
        Where the first component <MathInline>a</MathInline> is on the axis of rotation, and <MathInline>b</MathInline> and <MathInline>c</MathInline> are being rotated in the plane.
      </p>

      <img src="/img/math/3d_components.png" className="max-w-7/8 max-h-100 m-auto" alt="A ray from the origin." />


      <QuatsHeader>
        {"The Bubble Collapses"}
        {"The Singularity is Here"}
      </QuatsHeader>      
      <p>
        Suppose we just keep the exact same setup as in two dimensions, but just add an additional complex variable. Each can rotate in its plane, but stays still when the other is rotating:
      </p>

      <img src="/img/math/two_var.png" className="max-w-7/8 max-h-80 m-auto" alt="A ray from the origin." />

      <div className="flex justify-evenly">
        <MathBlock>
          {"i^2=-1"}
          {"ij=j"}
        </MathBlock>
        <MathBlock>
          {"j^2=-1"}
          {"ji=i"}
        </MathBlock>

      </div>

      <p>
        There are some strange things afoot, the first of which is that <MathInline>{"ij \\neq ji"}</MathInline>. The order of actions can no longer be switched, they no longer commute ("commute" means "change together"). This is reflecting the fact that we have to be clear which axis is doing the rotating and which is being rotated. Doing rotations in reverse order does not usually result in the same translation. This is contrary to two dimensions in which we could exchange the order freely, and only the total amount of rotation mattered in the end. Losing commutativity is certainly a complication but appears unavoidable, given the issue of axes rotating each other. 
      </p>

      <p>
        Moving on to the second issue and, unfortunately, it is catastrophic. We can see it by substituting <MathInline>ij=j</MathInline> into itself:
      </p>

      <MathBlock>
        {"ij=j"}
        {"iij=j"}
        {"-j=j"}
        {"2j=0"}
        {"i=j=0"}
      </MathBlock>

      <img src="/img/math/bubble.png" className="max-w-7/8 max-h-60 m-auto mt-8 mb-6" alt="A ray from the origin." />

      <p>
        Its all collapsed! What happened!? The problem is we are trying to get these elements to perform double duty. The first statements, like <MathInline>i^2=-1</MathInline>, tell them to act as rotations, while the second statements, <MathInline>ij=j</MathInline>, tell them to act as the identity. But when we combine these behaviors into a single statement it collapses back into the singularity, which is the only place where both of these behaviors can be part of the same action! Similarly, if <MathInline>i</MathInline> and <MathInline>j</MathInline> dont affect each other, how will we rotate between them? We cannot expect <MathInline>1</MathInline> to step in and cause a rotation.
      </p>
      
      
      <QuatsHeader>
        {"The Third Wheel"}
        {"Two is Company, Three's a crowd"}
      </QuatsHeader>
      
      
      <p>
        In 2 dimensions, we only had one possible plane of rotation, so we were able to use only one algebraic variable to represent turning in that plane. Conveniently, this allows us to think of both points and rotations in 2-Dimensions. But now that we have three possible planes of rotation, we need a variable for each one. Plus, we need extra room for information about how much to rotate at all. Therefore, looking ahead we expect terms in our algebra to have the general form:
      </p>

      <MathBlock>
        a + bi + cj + dk
      </MathBlock>

      <img src="/img/math/planar_actions.png" className="max-w-7/8 max-h-100 m-auto mt-8 mb-4" alt="A ray from the origin." />

      <p>
        Each complex variable represents a rotation action in one of the planes of rotation / around one of the axes, while the real component represents staying in place (or purely reversing). Furthermore, we know that the real component cannot be on an axis or else the algebra collapses. So now we have three algebraic variables, taking up all three dimensions. Where has the real component gone? Can we just forget it entirely? How do we interpret what these actions do e.g. to the number 1? We know that:
      </p>

      <MathBlock>
        {"i\\cdot1=i"}
      </MathBlock>

      <p>
        But 1 is no longer in our picture! 
      </p>

      <p>
        Consider that turning all the way around on an axis is, at least positionally, equivalent to staying in place. Algebraically we can say <MathInline>i^4=1</MathInline>. But we also know that <MathInline>{"i\\neq \\pm1"}</MathInline>. This means <MathInline>i</MathInline> must cycle with <MathInline>1</MathInline> in exactly the same 4-step procedure as in the 2-D case.
      </p>

      <div className="bg-[url(/img/math/twister.png)] bg-cover bg-center w-1/1 pb-10 z-10">



        <QuatsHeader>
          {"The Eye of the Storm"}
          {"It's a real twister"}
        </QuatsHeader>


        <div className="flex flex-col items-center">
          <span>Therefore we have:</span>
          <MathBlock>
            {"i^2=-1"}
            {"j^2=-1"}
            {"k^2=-1"}
          </MathBlock>
          <MathBlock>
            {"ij=k"}
            {"jk=i"}
            {"ki=j"}
          </MathBlock>
          <MathBlock>
            {"ij=k"}
            {"ijk=k^2"}
            {"ijk=-1"}
            {"ijk=i^2=j^2=k^2=-1"}
          </MathBlock>
        </div>

      </div>

      <p>
        The algebra doesn't collapse, but things are getting a bit carried away! We have an algebra that can rotate on all three axes, but it does something else. Part of the component parallel to the axis of rotation, the part that is twisting in place, is getting cycled toward -1. We were only considering the real component to be part of the action, meaning roughly "stay-in-place", but now its part of the resulting position. The component along the axis is therefore liable to collapse to 0 or to end up going the opposite way entirely! We only know where its "supposed" to go because of the context of the action that generated it.
      </p>

      <img src="/img/math/axis_actions.png" className="max-w-7/8 max-h-80 m-auto" alt="A ray from the origin." />

      <p>
        Its important to look here at what the algebra is telling us. It is saying that the "stay-in-place" and "rotate-in-place" behaviors are two aspects of the same overarching behavior. They both have the same effect on the final position, of not moving, but how they get there is different. Therefore the "position" that multiplication gives back to us splits the axis component in two, the part that stayed and the part that twisted.
      </p>

      <p>
        After doing a multiplication, we <i>could</i> step out of the algebra and use the pythagorean theorem to sum up the lengths of the axis and twisted components, but this completely defeats the purpose of having an algebra! We need to be able to undo the twist without undoing the rotation. Another two-step process is in order.
      </p>


      <QuatsHeader>
        {"Controlled Opposition"}
        {"How to pull the strings"}
      </QuatsHeader>


      <img src="/img/math/cats_cradle.png" className="max-w-7/8 max-h-80 m-auto" alt="A ray from the origin." />

      <p>
        Is there anything fundamentally different between the two cycles that will allow them to be separated? Recall that the order in which axes multiply matters because it keeps track of which axis is rotating the other. We need to contrast this antisymmetric behavior on the plane of rotation, where order matters, with the symmetric behavior of an axis twisting on itself, where the order is irrelevant.
      </p>

      <p>
        Let's look at the resulting actions from swapping the order of <MathInline>ii</MathInline> and <MathInline>ij</MathInline>. The green and gold arrows represent left and right multiplication by <MathInline>i</MathInline> respectively. When acting on itself, the order doesn't matter, but when acting within the plane of rotation, reversing the order makes it as if we rotated from the opposite axis, along the red arrow! This is expressed by the statement <MathInline>{'ji=-ij'}</MathInline>. Switching the order gives a reversed rotation, but with the same twist along the axis.
      </p>

      <img src="/img/math/ij_vs_ji.png" className="max-w-7/8 max-h-100 m-auto" alt="A ray from the origin." />

      <p>
        Now suppose we have taken the green arrow, <MathInline>i</MathInline>. <MathInline>j</MathInline> has moved to <MathInline>k</MathInline>, while <MathInline>i</MathInline>, along the axis of rotation, has done a twist into <MathInline>-1</MathInline>. We take advantage of the anti-commutativity in the plane of rotation to undo this twist while doubling up on the rotation. Lets look at the next step, with the complex conjugate <MathInline>i^*</MathInline>, to undo the twist.
      </p>

      <img src="/img/math/i_inverse.png" className="max-w-7/8 max-h-100 m-auto" alt="A ray from the origin." />

      <p>
        Now, instead of following the counter-clockwise green path representing left multiplication by <MathInline>i^*</MathInline>, we multiply on the right and we follow the gold/red paths. The rotation doubles and the twist cancels out, leaving us only with movement in the plane of rotation!
      </p>

      <QuatsCycle>
        <img src="/img/math/ij_vs_ji.png" id="c1" className="m-auto cycle max-w-7/8 max-h-100" alt="A ray from the origin." />
        <img src="/img/math/i_inverse.png" id="c2" className="cycle max-w-7/8 max-h-100" alt="A ray from the origin." />
        <img src="/img/math/rotation_result.png" id="c3" className="cycle max-w-7/8 max-h-100" alt="A ray from the origin." />
      </QuatsCycle>

      <MathBlock>
        {"i(i+j)i^*"}
        {"(-1+k)i^*"}
        {"i - j"}
      </MathBlock>

      <p>
        We have performed a rotation action around <MathInline>i</MathInline>, but this time going a full half circle (as opposed to a quarter turn in 2d) by performing the action twice in order to do and undo the twist. This is why quaternions use half the angle of the rotation they are meant to represent. Therefore, to perform a rotation of angle <MathInline>{"\\theta"}</MathInline> around axis <MathInline>i</MathInline>, we can use a quaternion that looks strikingly similar to the 2d case, but the angle has been divided in 2 for its use in this two-step operation:
      </p>

      <MathBlock>
        {"q = \\cos{\\frac{\\theta}{2}}+i\\sin{\\frac{\\theta}{2}}"}
        {"q^{-1} = \\cos{\\frac{\\theta}{2}}-i\\sin{\\frac{\\theta}{2}}"}
        {"p' = qpq^{-1}"}
      </MathBlock>

      <p>
        So we've rotated a vector <MathInline>p</MathInline> around <MathInline>i</MathInline> for an angle <MathInline>{"\\theta"}</MathInline>. But, seeing as we've defined everything symmetrically, <MathInline>i</MathInline> could have been any unit vector involving <MathInline>(i,j,k)</MathInline> around which to rotate! Any quaternion with a norm of <MathInline>1</MathInline>, called a versor (meaning "turner"), could be substituted in for <MathInline>q</MathInline> in order to rotate around its axis.
      </p>



      <QuatsHeader>
        {"The Middle Way"}
        {"Its a push and pull"}
      </QuatsHeader>


      <p>
        This process of placing a versor and its conjugate on either side is called conjugation. The word <i>conjugate</i> shares a root with the word <i>yoke</i>, as in a beam that binds working oxen. We can say we have conjugated <MathInline>p</MathInline> by <MathInline>q</MathInline> in order to rotate it, so <MathInline>p</MathInline> and <MathInline>p'</MathInline> are related through <MathInline>q</MathInline>. I suppose the quaternions are like oxen, working hard to rotate <MathInline>p</MathInline> around the axis via the yoke of conjugation!
      </p>

      <p>
        Tracing through the operation, we can see how the real component, the twist, gets cancelled out, while the rotation doubles up:
      </p>

      <QuatsCycle>
        <img src="/img/math/yoke_terms.png" id="y1" className="m-auto yoke max-w-9/10 max-h-150" alt="A ray from the origin." />
        <img src="/img/math/yoke_actions.png" id="y2" className="yoke max-w-9/10 max-h-150" alt="A ray from the origin." />
      </QuatsCycle>

      <MathBlock>
        {"p = ai + bj + ck"}
        {"q = \\cos{\\frac{\\theta}{2}} + \\sin{\\frac{\\theta}{2}}\\hat{u}"}
        {"q^{-1} = \\cos{\\frac{\\theta}{2}} - \\sin{\\frac{\\theta}{2}}\\hat{u}"}
        {"p' = qpq^{-1}"}
      </MathBlock>

    </article>
  );
}
