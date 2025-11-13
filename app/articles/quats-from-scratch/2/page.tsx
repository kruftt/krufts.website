export default function Page2({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <article>

      <h2 className="m-auto text-3xl mt-8 flex justify-center">
        Dimension 2
      </h2>
      <h3 className="m-auto text-l mb-4 flex justify-center">
        <i>We're Ramping</i>
      </h3>
      <p>
        Suppose now we have a second dimension, just like the first, and we're free to move in either dimension independently. This raises the question, "What happens when we move in both directions at the same time?" The answer depends on what kind of space we're in, and here we're assuming we're in good old-fashioned Euclidean space, where the pythagorean theorem holds:
      </p>

      <div className="flex flex-wrap justify-evenly">
        <img src="/img/math/pythagorean.png" className="max-w-7/8 max-h-60" alt="A ray from the origin." />
        <img src="/img/math/trig.png" className="max-w-7/8 max-h-60" alt="A ray from the origin." />
      </div>

      <p>
        This means that moving along the first dimension for a distance of {"\\(a\\)"} and the second dimension for a distance of {"\\(b\\)"} results in the same position as moving a distance of {"\\(\\sqrt{a^2 + b^2}\\)"} straight toward the final position. The theorem tell us how to translate away from the origin at an angle θ and modulus r:
      </p>
      <div className="text-center">
        {"\\((r,\\theta)\\rightarrow (r\\cos{\\theta}, r\\sin(\\theta))\\)"}
      </div>
      <p>
        The angle θ is sometimes referred to as the "argument", apparently coming from its uses in astronomy for measuring celestial positions. The root of the word "argue" has to do with "shining", as if an argument shines light on an issue and the argument helps track the orbital motion of shiny celestial objects. In this sense I think of the <i>argument</i> θ as specifying the direction of a shining ray of light.
      </p>
      <p>
        Now that we can go continuously between two directions, what have we lost? We've lost the ability to order all our points along a single line. We can still order points along a given direction, but not in general.
      </p>
      <p>
        This raises another question, which is, "How do we think about the actual action of rotation?" We want to take a point from where we got by going along one direction, to where we would have gone had we went in another direction. Similar to going backward in 1 dimension, but we want to be able to go in any combination of 2 directions, instead of just the opposite direction.
      </p>

      <h2 className="m-auto text-3xl mt-8 flex justify-center">
        What Goes Around Comes Around
      </h2>
      <h3 className="m-auto text-l mb-4 flex justify-center">
        <i>Something worth reflecting on</i>
      </h3>
      <p>
        In order to rotate there two basic behaviors we have to capture. The first is easy, staying in the same direction. We already know how to do that: multiply by 1, our affirming friend the identity element, as represented by + in the (+/-, r) notation for moving in one dimension. The other behavior is to rotate, that is, to shift our position from one dimension to the other, like reflecting between opposites along the same dimension, but shifting to other dimensions instead.
      </p>
      <p>
        We can understand the basic behavior of rotating to be going from pointing in one direction to another. We can start just by exchanging the two dimensions. In other words we can take point (a,b) to the point (b,a), as on the left below, equivalent to reflecting across the line a=b. Imagine flipping a piece of paper along its diagonal axis.
      </p>

      <div className="flex justify-center">
        <img src="/img/math/reflect_to_rotate.png" className="max-w-7/8 max-h-60" alt="A ray from the origin." />
      </div>
      <p>
        This flips points along the two dimensions, but we're not there yet. Consider the point (1,1), where does that go? When we swap we end up back at (1,1), we haven't moved at all! Swapping distances doesn't have any effect along the diagonal where they're the same size. In addition to the swap, one component needs to be reflected to split them up. We need to flip the piece of paper a second time. We'll do it across the vertical axis: (b,a) -&gt; (-b,a). This gets all four directions going in a cycle together, rotating the first component toward the second.
      </p>
      <p>
        Let's briefly compare these two reflections. The second looks more simple, involving just the first coordinate. How much this operation translates a given point depends only on what's in the first coordinate. The important point is that that component is negated while the other is not.
      </p>
      <p>
        The first reflection, however, involves swapping the components. It depends on the relationship between them, similar to taking the differences between the two parts of our walk. How much it translates a given point depends on the differences in distance between the two components on the journey to that point. If one part of the journey to p was longer than the other, which was longer gets swapped.
      </p>

      <div className="flex flex-wrap justify-center">
        <img src="/img/math/opposing_directions.png" className="max-w-7/8 max-h-60" alt="A ray from the origin." />
        <img src="/img/math/opposing_components.png" className="max-w-7/8 max-h-60" alt="A ray from the origin." />
      </div>

      <p>
        This means we can view rotation as another two-step process, this time using reflections, to leverage different behaviors. What gets reflected in the first step depends on the difference between the two components, whereas what gets reflected in the second depends only on the first component. This difference puts the four directions into a cycle.
      </p>

      <p>
        Consider what happens when we reverse the order of the reflections. The first component gets negated before getting swapped, which causes the rotation to move in the opposite direction. This operation is called the conjugate, meaning "joined together", like a yoke joining oxen. Notice that applying a rotation and then applying its conjugate will do and then undo all the reflections in the reverse order. They are inverse operations.
      </p>

      <div className="flex flex-wrap justify-center">
        {"\\(ABBA = 1\\)"}
      </div>


      <h2 className="m-auto text-3xl mt-8 flex justify-center">
        Complexification
      </h2>
      <h3 className="m-auto text-l mb-4 flex justify-center">
        <i>Getting it all mixed up</i>
      </h3>


      <p>
        Now that we know both how to stay in place {"\\((a,b)\\rightarrow(a,b)\\)"} and go in a cycle {"\\((a,b)\\rightarrow(-b,a)\\)"}, we can transition between them according to the pythagorean theorem. Note that our triangle here is in the space of actions, not in the space of positions. We're using it to derive a formula for rotating position coordinates according to argument θ.
      </p>

      <div className="flex justify-center">
        <img src="/img/math/2d_components.png" className="max-w-7/8 max-h-80" alt="A ray from the origin." />
      </div>

      <p>
        Each component in the resulting rotation is itself composed of two components, one part that stayed in place and one part that cycled in from the other component.
      </p>
      <p>
        We have the same two basic actions as in one dimension: a change of direction and a movement. The domain of changing direction has expanded from facing forward or backward: {"\\(\\{1,-1\\}\\)"} to being able to turn around: {"\\([-\\pi:\\pi]\\)"}. From this we can see that we could have defined the action in one dimension in a more extensible way by using the same argument θ, but with the domain restricted to {"\\(\\{0,\\pi\\}\\)"} and taking the cosine to get 1 and -1. Personally, I find it easier to think of in terms of forward and backward, but I will use θ here to make it clear that the one is a subset of the other.
      </p>

      <div className="flex justify-center items-center gap-4">
        <span className="font-bold">1-D</span>
        <span>{"\\((r,\\theta)\\)"}</span>
        <div className="flex flex-col">
          <span>{"\\(r : [0:\\infty)\\)"}</span>
          <span>{"\\(\\theta : \\{0,\\pi\\}\\)"}</span>
        </div>
      </div>
      <div className="flex justify-center items-center gap-4 mt-4">
        <span className="font-bold">2-D</span>
        <span>{"\\((r,\\theta)\\)"}</span>
        <div className="flex flex-col">
          <span>{"\\(r : [0:\\infty)\\)"}</span>
          <span>{"\\(\\theta : [-\\pi,\\pi]\\)"}</span>
        </div>
      </div>

      <p>
        The word "complex" means "folded together", and the complex numbers encode this "mixed up" 4-way cyclic relationship into an algebra. The word "algebra" is associated with creating systems that help us balance out equations. We would like to be able to combine and manipulate these rotations in single equations, without breaking them up into components. In order for an algebra to keep track of the two actions of staying and rotating, it needs a variable for each one.
      </p>
      <p>
        Consider that a point in 2-D has two interpretations. First, as position coordinates, and secondly, as a rotation and scaling action, provided that we use it to transform another point as outlined above. When interpreted as a rotation action without any scaling, we said that the first component represents the "stay" behavior, while the second component represents the "cycle" behavior, and we have to keep them length 1 according to the pythagorean theorem. We already have a symbol for the "stay" behavior, our old friend the identity element, 1. Now we need an element to capture the "cycle" behavior. The standard notation is to use the letter <i>i</i>, which will act a marker representing the second component:
      </p>

      <div className="flex flex-wrap justify-evenly gap-4">
        <div className="flex flex-col items-center">
          <span>Stay : {"\\(1\\)"}</span>
          <span>{"\\((a,b)\\rightarrow(a,b)\\)"}</span>
          <span>{"\\(a+bi\\rightarrow a+bi\\)"}</span>
        </div>
        <div className="flex flex-col items-center">
          <span>Cycle : {"\\(i\\)"}</span>
          <span>{"\\((a,b)\\rightarrow(-b,a)\\)"}</span>
          <span>{"\\(a+bi\\rightarrow -b+ai\\)"}</span>
        </div>
      </div>

      <p>
        If we multiply i by itself, that is, take {"\\((0,1) \\rightarrow (-1,0)\\)"} we see it gives the expected behavior of {"\\(i^{2}=-1\\)"}. Now we can relabel the picture above, substituting in our algebraic representation:
      </p>
      <div className="flex flex-col items-center">
        <img src="/img/math/2d_imaginary.png" className="max-w-7/8 max-h-80" alt="A ray from the origin." />
        <span>Each component is made of a part that stayed and a part that cycled in.</span>
      </div>

      <p>
        Previously we noted that reversing the order of reflections causes rotations to reverse, which is called conjugation. Since {"\\(i\\)"} captures the cycling behavior in our algebra, negating the {"\\(i\\)"} component causes the rotation to move in the opposite direction. When multiplied by its conjugate, the rotations represented by complex numbers cancel out and result in a point on the real axis, meaning the result is an action that doesn't rotate (it may still have scaling).
      </p>

      <div className="flex flex-col flex-wrap items-center">
        {"\\(z = a + bi\\)"}
        {"\\(z^* = a - bi\\)"}
        {"\\(zz^* = a^2 + b^2\\)"}
      </div>

      <p>
        Since complex numbers are a form of multiplication, conjugation is a division on rotations, since it undoes the rotation of its conjugate:
      </p>

      <div className="flex flex-col items-center">
        {"\\(z = \\cos{\\theta} + i\\sin{\\theta}\\)"}
        {"\\(zz^* = \\cos^2{\\theta} + \\sin^2{\\theta} = 1\\)"}
      </div>

      (TODO: CONJUGATE DRAWING)

      <p>
        Actions that take a position from a multi-dimensional space to the real line in a way that preserves information about the order of distance are called norms. Here if we take the square root of the result, just like in the pythagorean theorem, we will get the modulus. This is called the euclidean norm, because it gives the euclidean distance from the origin to a given point.
      </p>
      <div className="flex justify-center">
        {"\\(\\sqrt{zz^*} = \\sqrt{a^2 + b^2} = r\\)"}
      </div>
    </article>
  );
}
