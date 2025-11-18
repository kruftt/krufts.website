'use client'

import { ChangeEvent, ChangeEventHandler, useEffect, useRef, useState } from 'react';
import QuaternionVisualizer from '@/components/quats/visualizer';
import { QuatsHeader } from '../components';
import MathInline from '@/components/general/math-inline';
import MathBlock from '@/components/general/math-block';

const TAU = 2.0 * Math.PI

export default () => {
  

  return (
    <div>
      <QuatsHeader>
        {"Picture This"}
        {"Let's do the twist!"}
      </QuatsHeader>

      <p>
        We can visualize the rotation of <MathInline>p</MathInline> by <MathInline>q</MathInline> by picturing a twisting action along the axis of rotation. As the parallel components of <MathInline>p</MathInline> are twisted, they maintain their overall length. In this way, we can picture quaternions rotating points in 3d, enriched by our understanding of the algebra:
      </p>
      
      <QuaternionVisualizer></QuaternionVisualizer>

      <p>
        Notice how <MathInline>p</MathInline> first appears as a point, i.e. as a "pure" quaternion with no real component, and then is multiplied by <MathInline>q</MathInline> on the left. The intermediate product <MathInline>qp</MathInline> breaks up the component parallel to the axis such that it can no longer be directly interpreted as a point in 3d space, at least without an additional twist. Then, after finishing the conjugation, the twist cancels out and we are free to interpret <MathInline>p'</MathInline> as a normal point again. The ability to move back and forth between interpretations depends on conjugation cancelling out the twist.
      </p>

      {/* <p>
        But what about the quaternion <MathInline>q</MathInline>? Can it not also be interpreted as a point?
      </p> */}

      <QuatsHeader>
        {"Vector Operations"}
        {"Cross your p's and dot your q's"}
      </QuatsHeader>

      <p>
        Notice what happens to the intermediate term, <MathInline>qp</MathInline>, when the angle is <MathInline>{"\\pi"}</MathInline>. (Reloading the page will set <MathInline>{"\\theta"}</MathInline> to <MathInline>{"\\pi"}</MathInline>) The component parallel to the axis collapses entirely into a twist. Just like in the case of 2-D, a quarter turn captures the purely rotational behavior, the shift of one dimension entirely into another in a 4-step cyclical fashion. This is quite useful because it tells us the length of the component of <MathInline>p</MathInline> parallel to <MathInline>q</MathInline>. Similarly, the vector part of <MathInline>qp</MathInline> the component of <MathInline>p</MathInline> orthogonal to <MathInline>q</MathInline>, rotated exactly a quarter turn such that it ends up orthogonal to both.
      </p>

      <p>
        The twisted/real part is (the negative of what is) called the dot product, <MathInline>{"- p \\cdot q"}</MathInline>, while the vector part is the cross product, <MathInline>{"p \\times q"}</MathInline>. These terms are so useful in and of themselves that they were separated out from the quaternion algebra and put to work as independent operations in vector and matrix calculus, partially to avoid the necessity of conjugation. Their utility comes from the fact that they can be used independently to compute and manipulate these components as needed, but this utility is a bit of a double-edged sword, as it has the potential to obscure relationships that are more apparent within the quaternion algebra.
      </p>


      <QuatsHeader>
        {"Paired Composition"}
        {"Its a joint authorship"}
        {/* {"Pressure Under Composure"} */}
        {/* {"Its Standpoint Technology"} */}
      </QuatsHeader>

      <p>
        We've demonstrated how points, temporarily represented as quaternions, can be rotated by conjugation, but how do we rotate rotations themselves? It turns out this is basically the same picture! Consider what happens if we were to apply a second composition to the first:
      </p>

      <MathBlock inline={true}>
        {"q_{2}(q_{1}(p)q_{1}^{'})q_{2}^{'}"}
        {"(q_{2}q_{1})(p)(q_{1}^{'}q_{2}^{'})"}
      </MathBlock>

      <p>
        By re-associating the multiplications, we see that the composed rotation is nothing more than the product of two quaternions, but this is exactly what is represented, twice, in the visualization. Its just that the points <MathInline>p</MathInline> and <MathInline>p'</MathInline> have been guaranteed to be pure quaternions, which would thereby represent quater-turn rotations.
      </p>

      <p>
        A bit of a sleight of hand has occurred here, and its not unreasonable e.g. to worry we are somehow overloading the meaning of the real component. On the one hand, we are saying that as a position it signifies a twist, and on the other, that as an action it means "stay". How we are interpreting it depends on whether or not the component is appearing as part of the rotation of a point or as part of the composition of two rotations. It is up to us to keep both the picture and the use of these operations clear.
      </p>

      <p>
        On the other hand, in the geometric algebra, there is a difference between the "stay-in-place" and "twist" behaviors that is not present in the quaternion algebra alone. In fact, they are different types of objects entirely. When composing rotations, the only terms involved are those of the even sub-algebra, scalars and bivectors, meaning <b>stay-in-place/reflect</b> and <b>rotate</b> respectively. However, when rotating a point, the odd sub-algebra is involved, and the intermediate term in the calculation coming from the "twisting" is an oriented volume rather than a scalar. Once this oriented volume is "wound into being" it can be "unwound" along any axis, its not necessarily aligned to any particular plane of rotation. This detail, however, is irrelevant in the context of rotating 3d points, which are always part of a conjugation.
      </p>


      {/* comment about planes and axes being duals? */}

    </div>
  )
}

/**


      <p>
        A minor sleight of hand has occurred, somewhere along the line, allowing us to interpret quaternions as both actions and positions, and the dot product both as a twist and a dimensionless length. It is the special properties of 3-D space that make these possible. The key point is that in 3 dimensions, a plane of rotation and its axis are "dual spaces", together filling all three dimensions. Therefore if you know one, so you know the other, they form a pair.
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