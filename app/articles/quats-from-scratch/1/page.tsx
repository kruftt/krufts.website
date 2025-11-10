export default function Page1({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <article>
      <h2 className="m-auto text-3xl mt-8 flex justify-center">
        Dimension 1
      </h2>
      <h3 className="m-auto text-l mb-4 flex justify-center">
        <i>... Measure!</i>
      </h3>

      <img src="/img/math/ray.png" className="max-w-7/8 max-h-35 m-auto" alt="A ray from the origin." />
      
      <p>
        Suppose now we have a dimension, a way to measure apart, and a ray of light shines from the origin. At some arbitrary point to our liking we can declare that the ray has <i>officially</i> reached 1 unit from the origin. This basis measurement enables us to measure distances to other points by comparison.
      </p>
      <p>
        Moving a point from the origin is called performing a translation, meaning "to carry across". We carry the point, put it down, and say we have changed its "position", meaning "the spot where it has been put". Translation is represented by addition.
      </p>
      <div className="w-full flex flex-col text-center">
        <span>{"\\(0+1=1\\)"}</span>
        <span>{"\\(0+r=p\\)"}</span>
      </div>
      <p>
        What have we lost by adding this dimension? The simplicity of the singularity. It is no longer the case that there is only one point and all actions take this point to itself. Equations are easier to deal with when 0 is the only element, but we've exchanged that simple structure for points on a line. These can at least be ordered with respect to their directions and distances from the origin, with each having its own place along the same line.
      </p>
      <h2 className="m-auto text-3xl mt-8 flex justify-center">
        Snakes and Ladders
      </h2>
      <h3 className="m-auto text-l mb-4 flex justify-center">
        <i>A hop, skip, and a jump</i>
      </h3>
      <p>
        Imagine that going along a dimension is like scaling a ladder with rungs spaced one unit apart. The number of rungs on the ladder is proportional to its length. Accordingly, these lengths are called "scalars", as they tell us how many rungs it would take to scale to a given position. We can add and multiply these scalars produce different translations. When we multiply two scalars together, it is as if we are using one whole ladder as the rungs of the other.
      </p>
      <img src="/img/math/scalar_multiples.png" className="max-w-7/8 max-h-80 m-auto" alt="A ray from the origin." />

      <div className="w-full flex flex-col text-center">
        <span>{"\\(p+r=p'\\)"}</span>
        <span>{"\\(r\\cdot p=p'\\)"}</span>
      </div>
      <p>
        When multiplying by 1, we stay at the same scale and get back the same point p. In a sense multiplying by 1 says, "just be yourself". Accordingly, it is called the multiplicative identity. Contrast this with multiplying by 0, which says, "I don't care where you thought you were going, you're here now!" One could call multiplying by 0 "termination", since once there is no space between the rungs on the ladder, there is no climbing out. 0 is the end of the line, the terminus.
      </p>
      <div className="w-full flex flex-col text-center">
        <span>{"\\(1\\cdot p=p\\)"}</span>
        <span>{"\\(0\\cdot p=0\\)"}</span>
      </div>
      <p>
        Okay, so but what if we slide down a snake? What action takes us back toward the origin? This is the "inverse" translation, meaning "turned inward". But where do we get if we keep going? The respective positions reached by going forward vs backward are called "opposites", meaning "placed across". They are called additive inverses, since adding them together gets 0.
      </p>
      <br />
      <img src="/img/math/opposites.png" className="max-w-7/8 max-h-16 m-auto" alt="A ray from the origin." />
      <div className="w-full flex flex-col text-center">
        <span>{"\\(p+(-p)=0\\)"}</span>
      </div>

      <p>
        The movement of going from a position to its opposite, or vice versa, is called a "reflection" meaning "something that is bent back". There are two ways we can bend back, we can either do two inverse translations, or scale by -1, focusing on either translation or scaling respectively.
      </p>
      <div className="w-full flex flex-col text-center">
        <span>{"\\(p+(-p)+(-p)=-p\\)"}</span>
        <span>{"\\(-1\\cdot r=-p\\)"}</span>
      </div>

      <p>
        Notice that we've gotten two directions, forward and backward, out of a single dimension. In this way, even though we can represent both a point and the action of getting to that point with the same number, we can think about the action as specifying two distinct aspects of behavior, namely "which direction" and "how far".
      </p>
      <img src="/img/math/scalar_action.png" className="max-w-7/8 max-h-11 m-auto" alt="A ray from the origin." />

      <p>
        We can put these two separate pieces of information next to each other as component coordinates, where the phrase "component coordinates" means roughly "parts placed together in order".
      </p>

      <h2 className="m-auto text-3xl mt-8 flex justify-center">
        There and Back Again
      </h2>
      <h3 className="m-auto text-l mb-4 flex justify-center">
        <i>It's all about the journey</i>
      </h3>
      <p>
        Let's say we go on a walk and return to where we started. From the perspective of our final position, its just the same as if we never left! If we want any record of our journey we have to look at the distances of each of our series of actions. Then we could add up all the "how fars" while ignoring the direction. Taking just the distance without regard to direction is called the "modulus", meaning "little measure".
      </p>

      <div className="w-full flex justify-center gap-8 flex-wrap">
        <div className="flex flex-col text-center">
          <img src="/img/math/0_p.png" className="max-w-7/8 max-h-14 m-auto mb-4" alt="A ray from the origin." />
          <span>{"\\(pos(+,r)+pos(-,r)\\)"}</span>
          <span>{"\\(=p+(-p)\\)"}</span>
          <span>{"\\(=0\\)"}</span>
        </div>
        <div className="flex flex-col text-center">
          <img src="/img/math/2_d.png" className="max-w-7/8 max-h-14 m-auto mb-4" alt="A ray from the origin." />
          <span>{"\\(mod(+,r)+mod(-,r)\\)"}</span>
          <span>{"\\(=d+d\\)"}</span>
          <span>{"\\(=2d\\)"}</span>
        </div>
      </div>
      <p>
        If we want to take a walk of distance {"\\(d\\)"} and get back to where we started, we need to walk a distance of {"\\(\\frac{d}{2}\\)"} there and back again. The distance function doesn't care what direction we go and sums up the same either way. This behavior is called being "even". Meanwhile, going in the opposite direction changes the sign of the resulting position. This is called being "odd". The difference is that the position takes orientation into account while distance doesn't.
      </p>

      <p>
        If, instead of adding up the two parts of our journey, we take the difference between them, we bring out the odd/position behavior instead of the even/distance behavior:
      </p>

      <div className="w-full flex justify-center gap-8 flex-wrap">
        <div className="flex flex-col text-center">
          <img src="/img/math/2_p.png" className="max-w-7/8 max-h-14 m-auto mb-4" alt="A ray from the origin." />
          <span>{"\\(pos(+,r)-pos(-,r)\\)"}</span>
          <span>{"\\(=p-(-p)\\)"}</span>
          <span>{"\\(=2p\\)"}</span>
        </div>
        <div className="flex flex-col text-center">
          <img src="/img/math/0_d.png" className="max-w-7/8 max-h-14 m-auto mb-4" alt="A ray from the origin." />
          <span>{"\\(mod(+,r)-mod(-,r)\\)"}</span>
          <span>{"\\(=d-d\\)"}</span>
          <span>{"\\(=0\\)"}</span>
        </div>
      </div>

      <p>
        Here we have isolated the even and odd behaviors by using a two-step operation that does or does not negate/reflect the second step.
      </p>

    </article>
  );
}
