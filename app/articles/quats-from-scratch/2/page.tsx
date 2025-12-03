'use client'
import MathInline from '@/components/general/math-inline';
import MathBlock from '@/components/general/math-block';
import { QuatsHeader } from '@/components/quats/quats-header';
import TwoDee from '@/components/quats/two-dee';
import Swapper from '@/components/quats/swapper';
import JsdImage from "@/components/general/jsdelivr-image"

export default function Page2() {
  return (
    <article>

      <QuatsHeader>
        {"Dimension 2"}
        {"We're Ramping"}
      </QuatsHeader>

      <p>
        Now let's suppose that we have a second dimension, just like the first, and we're free to move in either dimension independently. What happens when we move in both directions at the same time? The answer depends on what kind of space we're in, and here we're assuming we're in good old-fashioned Euclidean space, where the pythagorean theorem holds:
      </p>

      <div className="flex flex-wrap justify-evenly">
        <JsdImage src="quats/pythagorean.png" className="max-w-7/8 max-h-60" alt="The Pythagorean Theorem." />
        <JsdImage src="quats/trig.png" className="max-w-7/8 max-h-60" alt="The Trigonometric functions." />
      </div>

      <p>
        This means that moving along the first dimension for a distance of <MathInline>a</MathInline> and along the second dimension for a distance of <MathInline>b</MathInline> results in the same position as moving a distance of <MathInline>{"\\sqrt{a^2 + b^2}"}</MathInline> straight toward the final position. The theorem tell us how to translate away from the origin at an angle <MathInline>θ</MathInline> and modulus <MathInline>r</MathInline>:
      </p>

      <MathBlock>
        {"(r,\\theta)\\rightarrow (r\\cos{\\theta}, r\\sin(\\theta))"}
      </MathBlock>

      <p>
        The angle <MathInline>θ</MathInline> is sometimes referred to as the "argument", apparently coming from its uses in astronomy for measuring celestial positions. The root of "argue" means "to shine", as if a verbal argument shines light on an issue and an angle argument tracks the motion of shiny celestial objects.
      </p>

      <p>
        Now that we can point in any combination of two directions, what have we lost? We've lost the ability to order all the points along a single line. We can still order the points along a given direction, but not in general.
      </p>

      <p>
        So then, how do we think about the actual action of rotation? How do we take a point from where we got by going along one direction, to where we would have gotten had we gone in another direction? Similar to taking the inverse in 1 dimension, but we want to be able to go in any combination of 2 directions.
      </p>

      <QuatsHeader>
        {"What Goes Around Comes Around"}
        {"Something Worth Reflecting On"}
      </QuatsHeader>

      <p>
        In order to rotate, there two basic behaviors we have to capture. The first is easy, staying in the same direction. We already know how to do that: multiply by <MathInline>1</MathInline>, our affirming friend, the identity element. The other is to rotate, that is, to shift our position from one dimension to the other. This is similar to reflecting between opposites along the same dimension, but shifting to another instead.
      </p>

      <p>
        We can understand the essence of rotation to be going from pointing in one direction to pointing in another. To model this movement we can start by exchanging the two dimensions. In other words, we can take the point <MathInline>(a,b)</MathInline> to the point <MathInline>(b,a)</MathInline>, equivalent to reflecting across the line <MathInline>a=b</MathInline>. This takes <MathInline>{"a \\rightarrow b"}</MathInline>, which we want, but also takes <MathInline>{"b \\rightarrow a"}</MathInline>, which is in the wrong direction! We need a second movement to flip <MathInline>b</MathInline> around and get all four going in a cycle. I recommend trying this two-step operation with a piece of paper, flipping it across its diagonal and then horizontal, just to get a tangible feeling for how these two flips rotate the page a quarter turn.
      </p>

      <JsdImage src="quats/reflect_to_rotate.png" className="max-w-7/8 max-h-85 m-auto" alt="2 reflections make a rotation." />

      <p>
        Let's briefly compare these two reflections. The first reflection involves swapping the components. The effect it has on a given position depends on the distance between its components. If one part of the journey to <MathInline>p</MathInline> was longer than the other, which was longer gets swapped.
      </p>
      <p>
        This gets combined with the second reflection, which negates only the first coordinate. Notice that this changes the effect of the first reflection the next time around, e.g. if the components were in the same direction, now they are in opposite directions.
      </p>

      <div className="flex flex-wrap justify-center">
        <JsdImage src="quats/opposing_directions.png" className="max-w-7/8 max-h-60" alt="Opposing directions captures their relationship." />
        <JsdImage src="quats/opposing_components.png" className="max-w-7/8 max-h-60" alt="The components are independent." />
      </div>

      <p>
        Normally, repeatedly negating a number causes it to alternate between plus and minus in a 2-step cycle, but now the number is getting swapped out each time and two separate numbers are going through the 2-step cycle independently. Therefore the full cycle takes 4 rather than 2. 
      </p>

      <Swapper></Swapper>

      <p>
        If we reverse the order of the reflections, the first component gets negated before getting swapped, causing the rotation to move in the opposite direction. This operation is called the conjugate, meaning "joined together". Notice that applying a rotation and then applying its conjugate will do and then undo the reflections in the reverse order. They are inverse operations.
      </p>

      {/* <MathBlock>ABBA = 1</MathBlock> */}

      <QuatsHeader>
        {"Complexification"}
        {"Getting All Mixed Up"}
      </QuatsHeader>


      <p>
        Now that we know both how to stay in place <MathInline>{"(a,b)\\rightarrow(a,b)"}</MathInline> and go in a cycle <MathInline>{"(a,b)\\rightarrow(-b,a)"}</MathInline>, we can transition between them according to the pythagorean theorem:
      </p>

      <div className="flex justify-center">
        <JsdImage src="quats/2d_components.png" className="max-w-7/8 max-h-80" alt="The components of a 2d rotation." />
      </div>

      <p>
        Each component in the resulting position is itself composed of two terms, one that <i>stayed</i> in place and one that <i>cycled</i> in from the other component. This combination captures the rotational behavior.
      </p>

      <p>
        Therefore, similar to the 1 dimensional case, we have two aspects of translations in 2 dimensions, namely "which direction?" and "how far?" The domain of direction has expanded from facing forward or backward, <MathInline>{"\\{-1,1\\}"}</MathInline>, to being able to turn around (here in either direction), <MathInline>{"[-2\\pi:2\\pi]"}</MathInline>. Notice that turning around to face backward can no longer be considered a simple reflection across the first dimension, but rather all points in the plane of rotation invert through the origin so that "left" and "right" dont get mirrored. Rotating turns around via two reflections, not one.
      </p>

      <div className="flex justify-center items-center gap-4 mt-6">
        <span className="font-bold">1-D</span>
        <MathInline>{"(r,\\pm)"}</MathInline>
        <div className="flex flex-col">
          <MathInline>{"\\ r : [0:\\infty)"}</MathInline>
          <MathInline>{"\\pm : \\{-1, 1\\}"}</MathInline>
        </div>
      </div>

      <div className="flex justify-center items-center gap-4 mt-4 mb-6">
        <span className="font-bold">2-D</span>
        <MathInline>{"(r,\\theta)"}</MathInline>
        <div className="flex flex-col">
          <MathInline>{"r : [0:\\infty)"}</MathInline>
          <MathInline>{"\\theta : [-2\\pi,2\\pi]"}</MathInline>
        </div>
      </div>

      <TwoDee></TwoDee>

      <p>
        The word "complex" means "folded together". The complex numbers enfold these two reflections, and therefore the resulting 4-way cyclic relationship, into a piece of mathematical origami called an algebra. The word "algebra" is associated with creating symbolic systems that encode rules and operations, and we would like to be able to combine and manipulate rotations in singular equations, without having to break them up into individually defined components. In order for an algebra to keep track of the two actions of staying and rotating, it needs a variable for each one.
      </p>

      <p>
        Consider that a point in 2D has two interpretations. First, as position coordinates, and secondly, as a 2-part action composed of a translation and a rotation. When we consider just the rotation part, we said that the first component represents the <i>stay</i> (or reverse) behavior, while the second component represents the <i>cycle</i> behavior. Together they must make a triangle with hypotenuse length <MathInline>1</MathInline> so as not to cause any scaling.
      </p>
      <p>
        We already have a symbol for the <i>stay</i> behavior, our old friend the identity element, <MathInline>1</MathInline>. Now we need an element to capture the <i>cycle</i> behavior. The standard notation is to use the letter <MathInline>i</MathInline>, which will act a marker representing the second component:
      </p>

      <div className="flex flex-wrap justify-evenly gap-4">
        <div className="flex flex-col items-center">
          <span>Stay : <MathInline>1</MathInline></span>
          <MathInline>{"(a,b)\\rightarrow(a,b)"}</MathInline>
          <MathInline>{"a+bi\\rightarrow a+bi"}</MathInline>
        </div>
        <div className="flex flex-col items-center">
          <span>Cycle : <MathInline>i</MathInline></span>
          <MathInline>{"(a,b)\\rightarrow(-b,a)"}</MathInline>
          <MathInline>{"a+bi\\rightarrow -b+ai"}</MathInline>
        </div>
      </div>

      <p>
        If we multiply <MathInline>i</MathInline> by itself, that is, take <MathInline>{"(0,1) \\rightarrow (-1,0)"}</MathInline> we see it gives the expected behavior of <MathInline>{"i^{2}=-1"}</MathInline>. Now we can relabel the picture above, substituting in our algebraic representation:
      </p>

      <div className="flex flex-col items-center">
        <JsdImage src="quats/2d_imaginary.png" className="max-w-7/8 max-h-80" alt="Imaginary multiplication." />
        <span>Each component is made of a part that <i>stayed</i> and a part that <i>cycled</i>.</span>
      </div>

      <QuatsHeader>
        {"The Middle Way"}
        {"As Above, So Below"}
        {/* {"Mere Reflection"} */}
        {/* {"So mote it be"} */}
        {/* {"Balance in all things"} */}
        {/* The Spitting Image */}
        {/* Two Peas in a Pod */}
        {/* <i>Practically a Mirror Reflection</i> */}
      </QuatsHeader>

      <p>
        Previously, we noted that reversing the order of reflections causes rotations to reverse, which is called the conjugate. Since <MathInline>{"i"}</MathInline> captures the cycling behavior in our algebra, negating the <MathInline>{"i"}</MathInline> component causes the rotation to move in the opposite direction. When multiplied by its conjugate, the rotations represented by complex numbers cancel out, resulting in a point on the real number line.
      </p>

      <MathBlock>
        {"z = a + bi"}
        {"z^* = a - bi"}
        {"zz^* = a^2 + b^2"}
      </MathBlock>

      <p>
        Since complex numbers are a form of multiplication, and division is the inverse of multiplication, conjugation, which undoes the rotation, is a sort of division on rotations. It undoes the action of its conjugate:
      </p>

      <MathBlock>
        {"z = \\cos{\\theta} + i\\sin{\\theta}"}
        {"z^* = \\cos{\\theta} - i\\sin{\\theta}"}
        {"zz^* = \\cos^2{\\theta} + \\sin^2{\\theta} = 1"}
      </MathBlock>

      <p>
        Notice that multiplying by the conjugate is giving us back the pythagorean theorem, which we started with when we first moved from one dimension to two. By undoing any sort of rotation we've ended up back in 1 dimension. All we have to do to get the original value of <MathInline>r</MathInline> back is to take the square root. This distance from the origin is sometimes called the "Euclidean norm", where "norm" is a generalized term for distances and magnitudes. In broader contexts, the euclidean distance, calculated by summing the squares of the components, is referred to as the <MathInline>L^2</MathInline> norm (<MathInline>L</MathInline> named after Lebesgue).
      </p>

      <MathBlock>
        {"\\sqrt{zz^*} = \\sqrt{a^2 + b^2} = r"}
      </MathBlock>

      <div className="flex justify-center mt-10 mb-6">
        <JsdImage src="quats/conjugate.png" className="max-w-7/8 max-h-70" alt="The complex conjugate." />
      </div>

    </article>
  );
}
