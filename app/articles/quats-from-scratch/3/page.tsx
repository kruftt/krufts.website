'use client'
import '@/app/articles/quats-from-scratch/3/3d.css'
import MathBlock from '@/components/general/math-block';
import MathInline from '@/components/general/math-inline';
import { QuatsHeader } from '@/components/quats/quats-header';
import { QuatsCycle } from '@/components/quats/quats-cycle';
import ThreeSwapper from '@/components/quats/three-swap';
import JsdImage from "@/components/general/jsdelivr-image"

export default function Page3() {
  const twister_url = process.env.NODE_ENV === "development"
    ? 'bg-[url(/img/quats/twister.png)]'
    : 'bg-[url(https://cdn.jsdelivr.net/gh/kruftt/krufts.website@images/quats/twister.png)]'

  return (
    <article>

      <QuatsHeader>
        {"Dimension 3"}
        {"It All Revolves Around This"}
      </QuatsHeader>


      <p>
        Home at last, three dimensions. We get from two to three dimensions in the same way as before, tack on another dimension, gesture at the pythagorean theorem, and call it good. This gives us a position in three 3 dimensions that we can add, subtract, and scale as desired.
      </p>

      <MathBlock>
        p=(a,b,c)
      </MathBlock>

      <p>
        We would like to extend our rotation capabilities into three dimensions and to write down a corresponding algebra. We have previously noted that each component of behavior needs its own element. Lets look at what the pieces of a 3d rotation are.
      </p>

      <p>
        The basics are similar to 2 dimensions in that rotation clearly involves an exchange from one direction to another in a cycle. The main difference is that in 3 dimensions there is an <i>axis</i> of rotation that goes along for the ride, without any exchanging. We can picture a top spinning on its axis:
      </p>

      <div className="flex flex-col items-center">
        <JsdImage src="quats/top.png" className="max-w-7/8 max-h-70" alt="A spinning top." />

      </div>

      <p>
        Therefore, in addition to knowing how much we want to rotate, we also need to know the axis of rotation.
      </p>

      <p>
        First, we'll need to know how to <i>stay</i> vs how to <i>rotate</i>. Then we can use the pythagorean theorem to transition between the <i>stay</i> and <i>rotate</i> behaviors, just like with 2 dimensions. In the 2D case, the rotation behavior was relatively straightforward, involving a swap and a flip to get the four directions going in a cycle. In the 3D case, there is an additional "rotating in place" behavior along the axis, alongside the cycling components. That is to say, when doing a quarter rotation along the first axis we expect our translated point to be:
      </p>

      <div className="text-center">
        <MathInline>{"(a,b,c) \\rightarrow (a,-c,b)"}</MathInline>

      </div>

      <p>
        Where the first component <MathInline>a</MathInline> is on the axis of rotation, and <MathInline>b</MathInline> and <MathInline>c</MathInline> are in the plane of rotation.
      </p>

      <JsdImage src="quats/3d_components.png" className="max-w-7/8 max-h-100 m-auto" alt="The components of a 3d rotation action." />


      <QuatsHeader>
        {"A Bubble Bursts"}
        {"The Singularity is Here"}
      </QuatsHeader>      
      <p>
        Suppose we keep the exact same setup as in two dimensions and add an additional complex variable. Each can rotate in its plane, but stays still while the other is rotating:
      </p>

      <JsdImage src="quats/two_var.png" className="max-w-7/8 max-h-80 m-auto" alt="Two variable algebra." />

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
        This does indeed allow us to rotate in these two planes, but there are some strange things afoot. The first is that <MathInline>{"ij \\neq ji"}</MathInline>. The order of actions can no longer be switched, they no longer commute ("commute" means "change together"). This is reflecting the fact that we have to be clear which axis is doing the rotating and which is being rotated. Doing rotations in reverse order does not usually result in the same translation. This is contrary to two dimensions in which we could exchange the order freely, and only the total amount of rotation mattered. Given this issue of axes rotating each other, losing commutativity appears to be an unavoidable complication.
      </p>

      <p>
        Moving on to the second issue and, unfortunately, it is catastrophic. We can see it by substituting <MathInline>j=ij</MathInline> into itself:
      </p>

      <MathBlock>
        {"j=ij"}
        {"j=iij"}
        {"j=-j"}
        {"2j=0"}
        {"i=j=0"}
      </MathBlock>

      <JsdImage src="quats/bubble.png" className="max-w-7/8 max-h-60 m-auto mt-8 mb-6" alt="The bubble bursts." />

      <p>
        Its all collapsed! What happened!? The issue is we are trying to get these elements to perform double duty. The first statements, like <MathInline>i^2=-1</MathInline>, tell them to act as rotations, while the second statements, <MathInline>ij=j</MathInline>, tell them to act as the identity. But when we combine these behaviors into a single statement, the algebra collapses back into the singularity, the only place where both of these behaviors can be part of the same action! Similarly, if <MathInline>i</MathInline> and <MathInline>j</MathInline> dont affect each other, how could we rotate between them? We cannot expect <MathInline>1</MathInline> to step in and cause a rotation or else we will overload it's behavior as well, ending in another catastrophe.
      </p>
      
      
      <QuatsHeader>
        {"The Third Wheel"}
        {"Two is Company, Three's a Crowd"}
      </QuatsHeader>
      
      
      <p>
        In 2 dimensions we only had one possible plane of rotation and were able to use a single algebraic variable to represent turning in that plane. Conveniently, this allowed us to think of points both as positions and actions, freely switching between perspectives. But now that we have three possible planes of rotation, not only do we need a variable for each one, but we still need extra room for information about how much to rotate at all. Therefore, looking ahead, we expect terms in our algebra to have the general form:
      </p>

      <MathBlock>
        a + bi + cj + dk
      </MathBlock>

      <JsdImage src="quats/planar_actions.png" className="max-w-7/8 max-h-100 m-auto mt-8 mb-4" alt="Three planar actions." />

      <p>
        Each complex variable represents a quater rotation in one of the planes / around one of the axes, while the real component represents staying in place (or purely reversing). Furthermore, we know that the real component cannot be on an axis or else the algebra collapses. So now we have three algebraic variables, taking up all three dimensions. Where has the real component gone? Can we just forget it entirely? How do we interpret what these rotations do e.g. to <MathInline>1</MathInline>? We know that:
      </p>

      <MathBlock>
        {"i\\cdot1=i"}
      </MathBlock>

      <p>
        But <MathInline>1</MathInline> is no longer in our picture! 
      </p>

      <p>
        Consider that turning all the way around on an axis is, at least positionally, equivalent to staying in place. Algebraically we can say <MathInline>i^4=1</MathInline>. But we also know that <MathInline>{"i\\neq \\pm1"}</MathInline>. This means <MathInline>i</MathInline> must cycle with <MathInline>1</MathInline> in exactly the same 4-step procedure as in the 2D case.
      </p>

      <div className={`${twister_url} bg-cover bg-center w-1/1 pb-10 z-10`}>


        <QuatsHeader>
          {"The Eye of the Storm"}
          {"It's a Real Twister"}
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
        The algebra doesn't collapse, but things are getting a bit carried away! We have an algebra that can rotate around all three axes, but it does something else. Part of the component parallel to the axis of rotation, the part that is twisting in place, is getting cycled toward <MathInline>-1</MathInline>. We were only considering the real component to be part of the action, meaning roughly <i>stay-in-place</i>, but now its part of the resulting position! Meanwhile, the component along the axis is liable to collapse to <MathInline>0</MathInline> or to end up going the opposite way entirely! We only know where its "supposed" to go because of the context of the action that generated it.
      </p>

      <JsdImage src="quats/axis_actions.png" className="max-w-7/8 max-h-80 m-auto" alt="Two cycles of action." />

      <p>
        Let's look at what the algebra is telling us. Its saying that the <i>stay-in-place</i> and <i>rotate-in-place</i> behaviors are two aspects of the same overarching behavior, that of not moving. They both have the same effect on the final position, but how they get there is different. Therefore the "position" that multiplication gives back to us has its axis split in two, the part that stayed and the part that twisted.
      </p>

      <p>
        After doing a multiplication, we <i>could</i> step out of the algebra and use the pythagorean theorem to sum up the lengths of the axis and twisted components, but this completely defeats the purpose of having an algebra! We need to be able to undo the twist without undoing the rotation. Another two-step process is in order.
      </p>


      <QuatsHeader>
        {"Controlled Opposition"}
        {"How to Pull the Strings"}
      </QuatsHeader>


      <JsdImage src="quats/cats_cradle.png" className="max-w-7/8 max-h-80 m-auto" alt="Can you see the pattern?" />

      <p>
        Is there anything fundamentally different between the two cycles that will allow them to be separated? Recall that the order in which axes multiply matters because it keeps track of which axis is rotating the other. We need to contrast this antisymmetric behavior on the plane of rotation, where order matters, with the symmetric behavior of an axis twisting on itself, where the order is irrelevant.
      </p>

      <p>
        Let's look at the resulting of swapping the order of <MathInline>ii</MathInline> and <MathInline>ij</MathInline>. The green and gold arrows represent left and right multiplication by <MathInline>i</MathInline> respectively. When acting on itself, the order doesn't matter, but when acting within the plane of rotation, reversing the order makes it as if we rotated from the opposite axis, along the red arrow! This is expressed by the statement <MathInline>{'ji=-ij'}</MathInline>. Switching the order gives a reversed rotation, but with the same twist along the axis.
      </p>

      <JsdImage src="quats/ij_vs_ji.png" className="max-w-7/8 max-h-100 m-auto" alt="ij vs ji." />

      <p>
        Suppose that we have multiplied on the left by <MathInline>i</MathInline>, represented by the green arrow above. <MathInline>j</MathInline> has moved to <MathInline>k</MathInline>, while <MathInline>i</MathInline>, along the axis of rotation, has done a twist into <MathInline>-1</MathInline>. We'll take advantage of the anti-commutativity in the plane of rotation to undo this twist while doubling up on the rotation. Lets look at the next step, multiplying by the conjugate <MathInline>i^*</MathInline> <i>on the right</i>, to undo the twist.
      </p>

      <JsdImage src="quats/i_inverse.png" className="max-w-7/8 max-h-100 m-auto" alt="i*j vs ji*." />

      <p>
        Now, instead of following the counter-clockwise green path representing left multiplication by <MathInline>i^*</MathInline>, we multiply on the right and we follow the gold/red paths. The rotation doubles and the twist cancels out, leaving us only with movement in the plane of rotation!
      </p>

      <QuatsCycle>
        <JsdImage src="quats/ij_vs_ji.png" id="c1" className="m-auto cycle max-w-7/8 max-h-100" alt="ij vs ji." />
        <JsdImage src="quats/i_inverse.png" id="c2" className="cycle max-w-7/8 max-h-100" alt="i*j vs ji*." />
        <JsdImage src="quats/rotation_result.png" id="c3" className="cycle max-w-7/8 max-h-100" alt="The rotation result." />
      </QuatsCycle>

      <MathBlock>
        {"i(i+j)i^*"}
        {"(-1+k)i^*"}
        {"i - j"}
      </MathBlock>

      <p>
        We have performed a rotation around <MathInline>i</MathInline>, but this time going a full half turn (as opposed to a quarter turn in 2d) by performing 2 actions in order to do and undo the twist along the axis of rotation. The fact that we have to do and undo the twist means that the amount of rotation done in each step gets doubled up on the whole. This double action is the reason why quaternions use half the angle of the rotation they are meant to represent. Therefore, to perform a rotation of angle <MathInline>{"\\theta"}</MathInline> around axis <MathInline>i</MathInline>, we can use a quaternion that looks strikingly similar to a 2d complex number doing the same rotation, but the angle is divided in 2:
      </p>

      <MathBlock>
        {"q = \\cos{\\frac{\\theta}{2}}+i\\sin{\\frac{\\theta}{2}}"}
        {"q^{-1} = \\cos{\\frac{\\theta}{2}}-i\\sin{\\frac{\\theta}{2}}"}
        {"p' = qpq^{-1}"}
      </MathBlock>

      <p>
        So we've rotated a vector <MathInline>p</MathInline> around <MathInline>i</MathInline> for an angle <MathInline>{"\\theta"}</MathInline>. But, seeing as we've defined everything symmetrically, <MathInline>i</MathInline> could have been any unit vector involving <MathInline>(i,j,k)</MathInline> around which to rotate! Any quaternion with a norm of <MathInline>1</MathInline>, called a versor (meaning "turner"), could be substituted in for <MathInline>q</MathInline> in order to rotate around its axis.
      </p>

      <ThreeSwapper></ThreeSwapper>


      <QuatsHeader>
        {"Getting Yoked"}
        {"Its a Push and Pull"}
        {/* {"Its the Middle Way"} */}
      </QuatsHeader>

      <p>
        This process of placing a versor and its conjugate on either side is called conjugation. The word <i>conjugate</i> shares a root with the word <i>yoke</i>, as in a beam that binds working oxen. We can say that we have conjugated <MathInline>p</MathInline> by <MathInline>q</MathInline> in order to rotate it, so <MathInline>p</MathInline> and <MathInline>p'</MathInline> are related through <MathInline>q</MathInline> by conjugation. I suppose that versors are like oxen, working hard to rotate <MathInline>p</MathInline> around the axis via the yoke of conjugation!
      </p>

      <p>
        Tracing through the operation, we can see how the real component, the twist, gets cancelled out, while the rotation doubles up:
      </p>

      <QuatsCycle>
        <JsdImage src="quats/yoke_terms.png" id="y1" className="m-auto yoke max-w-9/10 max-h-150" alt="Yoked terms." />
        <JsdImage src="quats/yoke_actions.png" id="y2" className="yoke max-w-9/10 max-h-150" alt="Yoked actions." />
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
