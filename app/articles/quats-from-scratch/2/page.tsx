'use client'
import MathInline from '@/components/general/math-inline';
import MathBlock from '@/components/general/math-block';
import { QuatsHeader } from '../components';
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
        Suppose now we have a second dimension, just like the first, and we're free to move in either dimension independently. This raises the question, "What happens when we move in both directions at the same time?" The answer depends on what kind of space we're in and here we're assuming we're in good old-fashioned Euclidean space, where the pythagorean theorem holds:
      </p>

      <div className="flex flex-wrap justify-evenly">
        <JsdImage src="quats/pythagorean.png" className="max-w-7/8 max-h-60" alt="The Pythagorean Theorem." />
        <JsdImage src="quats/trig.png" className="max-w-7/8 max-h-60" alt="The Trigonometric functions." />
      </div>

      <p>
        This means that moving along the first dimension for a distance of <MathInline>a</MathInline> and the second dimension for a distance of <MathInline>b</MathInline> results in the same position as moving a distance of <MathInline>{"\\sqrt{a^2 + b^2}"}</MathInline> straight toward the final position. The theorem tell us how to translate away from the origin at an angle <MathInline>θ</MathInline> and modulus <MathInline>r</MathInline>:
      </p>

      <MathBlock>
        {"(r,\\theta)\\rightarrow (r\\cos{\\theta}, r\\sin(\\theta))"}
      </MathBlock>

      <p>
        The angle <MathInline>θ</MathInline> is sometimes referred to as the "argument", apparently coming from its uses in astronomy for measuring celestial positions. The root of the word "argue" has to do with "shining", as if an argument shines light on an issue and the argument helps track the orbital motion of shiny celestial objects. In this sense I think of the argument <MathInline>θ</MathInline> as specifying the direction of a shining ray of light.
      </p>

      <p>
        Now that we can point in any combination of two directions, what have we lost? We've lost the ability to order all our points along a single line. We can still order points along any particular direction, but not in general.
      </p>

      <p>
        This raises another question, which is, "How do we think about the actual action of rotation?" How do we take a point from where we got by going along one direction, to where we would have gotten had we went in another direction? Similar to going backward in 1 dimension, but to be able to go in any combination of 2 directions.
      </p>

      <QuatsHeader>
        {"What Goes Around Comes Around"}
        {"Something worth reflecting on"}
      </QuatsHeader>

      <p>
        In order to rotate, there two basic behaviors we have to capture. The first is easy, staying in the same direction. We already know how to do that: multiply by <MathInline>1</MathInline>, our affirming friend the identity element, represented by <MathInline>+</MathInline> in the <MathInline>{"(\\pm , r)"}</MathInline> notation. The other is to rotate, that is, to shift our position from one dimension to the other. This is similar to reflecting between opposites along the same dimension, but shifting to another dimension instead.
      </p>

      <p>
        We can understand the essence of rotation to be going from pointing in one direction to pointing in another. To model this movement we can start by exchanging the two dimensions. In other words we can take point <MathInline>(a,b)</MathInline> to the point <MathInline>(b,a)</MathInline>, equivalent to reflecting across the line <MathInline>a=b</MathInline>, or flipping a piece of paper along its diagonal axis. This takes <MathInline>{"a \\rightarrow b"}</MathInline>, but moves <MathInline>b</MathInline> in the wrong direction. We need a second movement to flip <MathInline>b</MathInline> around and get the directions going in a cycle.
      </p>

      <JsdImage src="quats/reflect_to_rotate.png" className="max-w-7/8 max-h-85 m-auto" alt="2 reflections make a rotation." />

      <p>
        Let's briefly compare these two reflections. The first reflection involves swapping the components. Its effect on a given position depends on the relationship between its components, similar to taking the differences between the two parts of our walk. How much it translates a given point depends on the differences in distance between the two components on the journey to that point. If one part of the journey to <MathInline>p</MathInline> was longer than the other, which was longer gets swapped.
      </p>
      <p>
        This gets combined with the second reflection, which only negates the first coordinate. Notice that this completely changes the effect of the first reflection the next time around, e.g. if the components were in the same direction, now they are in opposite directions.
      </p>

      <div className="flex flex-wrap justify-center">
        <JsdImage src="quats/opposing_directions.png" className="max-w-7/8 max-h-60" alt="Opposing directions captures their relationship." />
        <JsdImage src="quats/opposing_components.png" className="max-w-7/8 max-h-60" alt="The components are independent." />
      </div>

      <p>
        Normally, when we repeatedly negate a number it goes in a cycle of 2: plus, minus, plus, minus, etc. But here the number is getting swapped out each time, and we are cycling between negating one of the two numbers. Therefore the full cycle takes 4 rather than 2. Notice that the second reflection, i.e. the negation, is a 1-dimensional operation with a cycle of length 2, and similarly the first reflection, i.e. the swap, is a 2-dimensional operation, but also with a cycle length of 2. When properly mixed together these two alternating behaviors make a cycle of length 4.
      </p>

      <Swapper></Swapper>

      <p>
        One further note about what happens when we reverse the order of the reflections. In this case the first component would be negated before getting swapped, which causes the rotation to move in the opposite direction. This operation is called the conjugate, meaning "joined together". Notice that applying a rotation and then applying its conjugate will do and then undo the reflections in the reverse order. They are inverse operations.
      </p>

      <MathBlock>ABBA = 1</MathBlock>

      <QuatsHeader>
        {"Complexification"}
        {"Getting it all mixed up"}
      </QuatsHeader>


      <p>
        Now that we know both how to stay in place <MathInline>{"(a,b)\\rightarrow(a,b)"}</MathInline> and go in a cycle <MathInline>{"(a,b)\\rightarrow(-b,a)"}</MathInline>, we can transition between them according to the pythagorean theorem. Note that our triangle here is in the space of actions, not in the space of positions. We're using it to derive a formula for rotating positions according to an argument <MathInline>θ</MathInline>.
      </p>

      <div className="flex justify-center">
        <JsdImage src="quats/2d_components.png" className="max-w-7/8 max-h-80" alt="The components of a 2d rotation." />
      </div>

      <p>
        Each component in the resulting rotation is itself composed of two terms, one that stayed in place and one that cycled in from the other component. This combination captures the rotational behavior.
      </p>

      <p>
        Therefore, similar to the 1 dimensional case, we can divide an action in 2 dimensions into two parts, "which direction?" and "how far?" The domain of direction has expanded from facing forward or backward, <MathInline>{"\\{-1,1\\}"}</MathInline>, to being able to turn around (here in either direction), <MathInline>{"[-2\\pi:2\\pi]"}</MathInline>. Notice that turning around to face backward can no longer be considered a simple reflection across the first dimension, but rather all points in the plane of rotation must invert through the origin so that "left" and "right" dont get mirrored.
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
        The word "complex" means "folded together", and the complex numbers encode this "mixed up" 4-way cyclic relationship into an algebra. The word "algebra" is associated with creating systems that help us balance out equations. We would like to be able to combine and manipulate these rotations in singular equations, without having to break them up into individually defined components. In order for an algebra to keep track of the two actions of staying and rotating, it needs a variable for each one.
      </p>

      <p>
        Consider that a point in 2-D has two interpretations. First, as position coordinates, and secondly, as an action, provided that we use it to transform another point as outlined above. When interpreted as a rotation action without any scaling, we said that the first component represents the <i>stay</i> (or reverse) behavior, while the second component represents the <i>cycle</i> behavior. Together they must make a triangle with hypotenuse length <MathInline>1</MathInline>, according to the pythagorean theorem, so as not to cause any scaling.
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
        Actions that take a position to a scalar such that information about distance is preserved are called norms. Here, if we take the square root of multiplication by the conjugate, just like in the pythagorean theorem, we will get the modulus. This is called the euclidean norm, because it gives the euclidean distance from the origin to a given point. I.e. it gives <MathInline>r</MathInline>, the scalar part of the action that could take a point from <MathInline>0</MathInline> to <MathInline>p</MathInline>.
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
