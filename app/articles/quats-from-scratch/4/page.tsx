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

/**


      <p>
        A minor sleight of hand has occurred, somewhere along the line, allowing us to interpret quaternions as both actions and positions, and the dot product both as a twist and a dimensionless length. It is the special properties of 3D space that make these possible. The key point is that in 3 dimensions, a plane of rotation and its axis are "dual spaces", together filling all three dimensions. Therefore if you know one, so you know the other, they form a pair.
      </p>

      <p>
        In quaternions we have two parts, the real part and the vector part. If the pair of a vector is a plane, then what is the pair of a real number, of the "stay-in-place" part? The plane of rotation takes up 2 dimensions and the axis takes up 1, together filling all 3. Meanwhile the real part takes up 0 dimensions, so its pair would have to take up all three on its own, i.e. it would have to be a volume.
      </p>





<p>
        If we're able to view <MathInline>p</MathInline> both as a point and as a quaternion, then what happens if we view <MathInline>q</MathInline> as a point? Afterall, if <MathInline>{"\\theta = \\pi"}</MathInline>, then <MathInline>q</MathInline> represents a quarter turn and has no real component. It's just a unit vector on the axis of rotation, but at that rate we could consider any of <MathInline>p</MathInline>, <MathInline>q</MathInline>, or <MathInline>qp</MathInline> as either being an axis or a point being rotated.
      </p>
      <p>
         Consider that:
      </p>

      <MathBlock>
        {"(qp)q = -pq^2 = -p(-1) = p"}
      </MathBlock>

      <p>
        In other words, if we multiply <MathInline>q</MathInline> by <MathInline>qp</MathInline> on the left, we get back <MathInline>p</MathInline>. So just by switching the order, thereby switching the axis, we're switching which we're interpreting as points to be rotated and which as axes of rotation.
      </p> 

<p>
         can see that quaternions compose each other in the same way that they multiply points. The only issue is that, in order to be regular 3d points, the real component of the quaternion must be zero. Yet the intermediate product of rotating a point, <MathInline>qp</MathInline>, has a non-zero real component. So the two actions leaving this position give us an idea of what happens when quaternions that represent rotations, i.e. versors, multiply each other. Its basically the same as multiplying positions! The only difference is that vesors are not guaranteed to be pure, which is the special case of rotating a quarter turn. So rotating 1/4 turn is analogous to a position without any twist. A position with total twist is analogous to either identity or inversion.
      </p> 



<p>
        We have been focusing on the ability to view quaternions as positions, but what of viewing positions as quaternions? What if we use positions as rotations? In the 2d case, a point and the action to take <MathInline>1</MathInline> to that point were one and the same. This is not the case in 3d, where a point specifies an axis of rotation. Then, considered as a quaternion, if there is no real component, i.e. there is no "stay-in-place" component, then it must represent a full quarter turn, taking one dimension on the axis of rotation fully into the other.
      </p> 


*/