'use client'
import MathInline from '@/components/general/math-inline';
import MathBlock from '@/components/general/math-block';
import { QuatsHeader } from '../components';
import OneDee from '@/components/quats/one-dee';
import OnePath from '@/components/quats/one-path';
import JsdImage from "@/components/general/jsdelivr-image"

export default function Page1() {
  return (
    <article>
      <QuatsHeader>
        {"Dimension 1"}
        {"... Measure!"}
      </QuatsHeader>

      <JsdImage src="quats/ray.png" className="max-w-7/8 max-h-35 m-auto" alt="A ray from the origin." />
      
      <p>
        BANG! Suppose now we have a dimension, a way to measure apart, and a ray of light shines forth from the origin. At some arbitrary distance we can declare that the ray has <i>officially</i> traveled <MathInline>1</MathInline> unit. This basis measurement enables us to measure distances to other points by comparison.
      </p>
      
      <p>
        Moving a point from the origin is called performing a translation, meaning "to carry across". If we carry the point and put it down, we say we have changed its "position", meaning "the spot where it has been put". Translation can be represented by addition:
      </p>
      
      <MathBlock>
        {"0+1=1"}
        {"0+r=p"}
      </MathBlock>
      
      <p>
        What have we lost by adding this dimension? The simplicity of the singularity. It is no longer the case that there is only one point and all actions take this point to itself. Equations are easier to deal with when <MathInline>0</MathInline> is the only element, but we've exchanged that simple structure for points on a line. These can at least be ordered with respect to their directions and distances from the origin, with each having its own place along the same line.
      </p>
      
      <QuatsHeader>
        {"Snakes and Ladders"}
        {"A Hop, Skip, and a Jump"}
      </QuatsHeader>

      <p>
        Imagine that going along a dimension is like scaling a ladder, with rungs one unit apart. The number of rungs on the ladder is proportional to its length. Accordingly, these lengths are called "scalars", as they tell us how many rungs it would take to scale to a given position. We can add and multiply these scalars produce different translations. When we multiply two scalars together, it is as if we are using one whole ladder as the rungs of the other.
      </p>
      <JsdImage src="quats/scalar_multiples.png" className="max-w-7/8 max-h-80 m-auto" alt="Scalar Operations." />

      <MathBlock>
        {"p+r=p'"}
        {"rp=p'"}
      </MathBlock>

      <p>
        When multiplying by <MathInline>1</MathInline>, we stay at the same scale and the same point <MathInline>p</MathInline>. In a sense multiplying by <MathInline>1</MathInline> says, "just be yourself". Accordingly, it is called the multiplicative identity. Contrast this with multiplying by <MathInline>0</MathInline>, which says, "I don't care where you thought you were going, you're here now!" One could call multiplying by <MathInline>0</MathInline> "termination", since once there is no space between the rungs on the ladder, there is no climbing out. <MathInline>0</MathInline> is the end of the line, the terminus.
      </p>
      <MathBlock>
        {"1\\cdot p=p"}
        {"0\\cdot p=0"}
      </MathBlock>
      <p>
        Okay, but what if we slide down a snake? What action takes us back toward the origin? This is the "inverse" translation, meaning "turned inward". But where do we get if we keep going? The respective positions reached by going forward vs backward are called "opposites", meaning "placed across". They are called additive inverses, since adding them together yields <MathInline>0</MathInline>.
      </p>
      
      <JsdImage src="quats/opposites.png" className="max-w-7/8 max-h-16 m-auto" alt="Opposite directions." />
      <MathBlock>
        {"p+(-p)=0"}
      </MathBlock>

      <p>
        The movement of going from a position to its opposite, or vice versa, is called a "reflection" meaning "something that is bent back". In order to "bend back", we can either do two inverse translations or simply scale by <MathInline>-1</MathInline>, focusing on translation or scaling respectively.
      </p>
      <MathBlock>
          {"p+(-p)+(-p)=-p"}
          {"(-1)r=-p"}
      </MathBlock>
 
      <p>
        Notice that we've gotten two directions, forward and backward, out of a single dimension. In this way, even though we can represent both a point and the action of getting to that point with the same number, we can think about the action as specifying two distinct aspects of behavior, namely "which direction?" and "how far?".
      </p>

      <OneDee className={'mt-12 mb-8'}></OneDee>

      {/* <JsdImage src="quats/scalar_action.png" className="max-w-7/8 max-h-11 m-auto mt-5!" alt="A ray from the origin." /> */}

      <p>
        We can put these two separate pieces of information next to each other as component coordinates, where the phrase "component coordinates" means roughly "parts placed together in order".
      </p>

      <QuatsHeader>
        {"There and Back Again"}
        {"It's All About the Journey"}
      </QuatsHeader>

      <JsdImage src="quats/path.png" className="max-w-7/8 max-h-20 m-auto mb-4" alt="To p and back again." />

      <p>
        Let's say we go on a walk and return to where we started. From the perspective of our final position, its just the same as if we never left! If we want any record of our journey we have to look at the distances of each step. Then we could add up all the "how fars" while ignoring the direction.
      </p>
      <p>
        Taking just the distance without regard to direction is called the "modulus", meaning "little measure". 
      </p>

      <div className="w-full flex justify-center gap-8 flex-wrap">
        <div className="flex flex-col text-center">
          <JsdImage src="quats/0_p.png" className="max-w-7/8 max-h-14 m-auto mb-4" alt="No total change of position." />
          <MathBlock>
            {"pos(+,r)+pos(-,r)"}
            {"=p+(-p)"}
            {"=0"}
          </MathBlock>
        </div>
        <div className="flex flex-col text-center">
          <JsdImage src="quats/2_d.png" className="max-w-7/8 max-h-14 m-auto mb-4" alt="2d distance traveled." />
          <MathBlock>
            {"mod(+,r)+mod(-,r)"}
            {"=d+d"}
            {"=2d"}
          </MathBlock>
        </div>
      </div>
      <p>
        If we want to take a walk of distance <MathInline>d</MathInline> and get back to where we started, we need to walk a distance of <MathInline>{"\\frac{d}{2}"}</MathInline> there and back again. The distance function doesn't care what direction we go and sums up the same either way. This behavior is called being "even". Meanwhile, going in the opposite direction changes the sign of the resulting position. This is called being "odd". The difference is that the position is taking the orientation into account while the distance travelled is not.
      </p>
      <p>
        If, instead of adding up the two parts of our journey, we take the difference between them, we bring out the odd, position behavior instead of the even, distance behavior:
      </p>

      <div className="w-full flex justify-center gap-8 flex-wrap">
        <div className="flex flex-col text-center">
          <JsdImage src="quats/2_p.png" className="max-w-7/8 max-h-14 m-auto mb-4" alt="2p difference of positions." />
          <MathBlock>
            {"pos(+,r)-pos(-,r)"}
            {"=p-(-p)"}
            {"=2p"}
          </MathBlock>
        </div>
        <div className="flex flex-col text-center">
          <JsdImage src="quats/0_d.png" className="max-w-7/8 max-h-14 m-auto mb-4" alt="0 difference in distances traveled." />
          <MathBlock>
            {"mod(+,r)-mod(-,r)"}
            {"=d-d"}
            {"=0"}
          </MathBlock>
        </div>
      </div>

      <p>
        Here we have isolated the even and odd behaviors by either summing up or taking the difference of the two legs of the journey.
      </p>

      <OnePath className='max-w-7/8 m-auto mt-8'></OnePath>

    </article>
  );
}
