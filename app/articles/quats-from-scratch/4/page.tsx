'use client'

import QuaternionVisualizer from '@/components/quats/visualizer';
import { QuatsHeader } from '@/components/quats/quats-header';
import MathInline from '@/components/general/math-inline';
import MathBlock from '@/components/general/math-block';
import JsdImage from '@/components/general/jsdelivr-image';

export default function Page4() {
  return (
    <div>
      <QuatsHeader>
        {"Picture This!"}
        {"Let's Do The Twist"}
      </QuatsHeader>

      <p>
        We can visualize the rotation of <MathInline>p</MathInline> by <MathInline>q</MathInline> by picturing a twisting action along the axis of rotation. As the parallel components of <MathInline>p</MathInline> are twisted, they maintain their overall length. In this way, we can picture quaternions rotating points in 3d, enriched by our understanding of the algebra and conjugation:
      </p>
      
      <QuaternionVisualizer></QuaternionVisualizer>

      <p>
        Notice how the point <MathInline>p</MathInline> first appears as a "pure" quaternion, with no real component, before being multiplied by <MathInline>q</MathInline> on the left. The intermediate product <MathInline>qp</MathInline> breaks up the parallel component such that it can no longer be directly interpreted as a simple component in 3d space, but rather has an additional twist. Then, after completing the conjugation, the twist cancels out and we are free to interpret <MathInline>p'</MathInline> as a normal point again. The ability to move back and forth between viewing <MathInline>p</MathInline> as a 3D point or a quaternion depends on conjugation cancelling out the twist.
      </p>

      {/* <p>
        But what about the quaternion <MathInline>q</MathInline>? Can it not also be interpreted as a point?
      </p> */}

      <QuatsHeader>
        {"Vector Operations"}
        {"Cross Your p's and Dot Your q's"}
      </QuatsHeader>

      <p>
        Notice what happens to the intermediate term, <MathInline>qp</MathInline>, when the angle is <MathInline>{"\\pi"}</MathInline>. (Reloading the page sets <MathInline>{"\\theta"}</MathInline> to <MathInline>{"\\pi"}</MathInline>) The component parallel to the axis collapses entirely into a twist. Just like in 2D, a quarter turn captures the purely rotational behavior, i.e. the shift of one direction entirely into another. This is quite useful because it tells us the length of the component of <MathInline>p</MathInline> that was parallel to <MathInline>q</MathInline> without it being mixed up with the orthogonal component. ("orthogonal" means "right angle", coming from  "rectus" meaning roughly "standing up straight") Similarly, the vector part of <MathInline>qp</MathInline> is nothing more than the component of <MathInline>p</MathInline> that was orthogonal to <MathInline>q</MathInline> to begin with, but rotated exactly a quarter turn such that it ends up orthogonal to both.
      </p>

      <p>
        The twisted/real part is called (the negative of) the dot product, <MathInline>{"- p \\cdot q"}</MathInline>, while the vector part is the cross product, <MathInline>{"p \\times q"}</MathInline>. These terms are so useful in and of themselves that they were separated out from the quaternion algebra and put to work as independent operations in vector and matrix calculus, partially to avoid the necessity of conjugation. Their utility comes from the fact that they can be used independently to compute and manipulate these components as desired, but this utility comes at the cost of potentially obscuring relationships that are more apparent within the quaternion algebra.
      </p>


      <QuatsHeader>
        {"Paired Composition"}
        {"The Algebraic Tag Team"}
        {/* {"Pressure Under Composure"} */}
        {/* {"Its Standpoint Technology"} */}
      </QuatsHeader>

      <p>
        We've demonstrated how points, temporarily represented as quaternions, can be rotated by conjugation, but how do we rotate rotations themselves? It turns out this is already in our picture! Consider what happens if we were to apply a second rotation, i.e. to conjugate the first versor with a second:
      </p>

      <MathBlock inline={true}>
        {"q_{2}(q_{1}(p)q_{1}^{'})q_{2}^{'}"}
        {"(q_{2}q_{1})(p)(q_{1}^{'}q_{2}^{'})"}
      </MathBlock>

      <p>
        By re-associating the multiplications, we see that the composed rotation is nothing more than the product of two quaternions. Yet this is exactly what is represented, twice, in the visualization above! Its just that the quaternions <MathInline>p</MathInline> and <MathInline>p'</MathInline>, which double as regular 3D points, are guaranteed (and required) to be pure, but we can still see all the behaviors involved in multiplying one quaternion by another by looking at the intermediate term <MathInline>qp</MathInline>. 
      </p>

      <p>
        A bit of a sleight of hand has occurred and its not unreasonable to worry that we are somehow overloading the meaning of the real component. On the one hand, we are saying that as a position it signifies a <i>twist</i>, and on the other hand, as an action it signifies <i>stay</i>. How we interpret it depends on whether or not the component is appearing as part of the rotation of a point or as part of the composition of two rotations. Furthermore, our imaginary vectors themselves seem to be performing double duty, both as axes and planes of rotation! It is up to us to keep the picture and the meaning of these operations clear.
      </p>

      <p>
        Toward that end, lets finish with a brief consideration of what's called a "geometric" or "Clifford algebra". In these there is indeed a difference between the <i>stay-in-place</i> and <i>twist</i> behaviors that is not explicit in the quaternion algebra alone. In fact, they are different types of objects! When composing rotations, the only terms involved are those of the even subalgebra, in 0 or 2 dimensions. These are the scalars and bivectors, meaning <i>stay</i> and <i>rotate</i> respectively. However, when rotating a point, the odd sub-algebra, containing 1 and 3 dimensions, is involved. In this case the intermediate term in the conjugation that results from <i>rotating in place</i> is an oriented volume, not a scalar. Once this oriented volume is "wound into being" it can be "unwound" along any axis. I.e. its not necessarily aligned to any particular direction or plane of rotation. This detail, however, is irrelevant in the context of rotating 3d points, in which multiplication always occurs in the context of a conjugation.
      </p>

      <JsdImage src="quats/subalgebras.png" className="max-h-120 m-auto" alt="Geometric subalgebras." />

      <p>
        When switching our interpretation of quaternions between rotations and positions, what we are doing in terms of the geometric algebra is switching between <i>dual</i> subspaces. That is to say, the axis of rotation is in a dual subspace to the plane of rotation, where together they fill the entirety of 3D. Similarly, the "twisted" oriented volume component forms a dual subspace with the scalar component, together "filling" 3D space. The quaternion variables are able to carry these complementary meanings, at least provided that we generally take care not to get things twisted!
      </p>

      <QuatsHeader>
        {"The End"}
      </QuatsHeader>

      <p>
        I hope you enjoyed exploring these wonderful mathematical objects with me. If you have comments, critiques, suggestions, or requests, please <a className='text-teal-700 font-bold' href="mailto:kruft.webmaster@gmail.com">send me an email</a>!
      </p>

      <p className='text-center'>- Kruft</p>

    </div>
  )
}
