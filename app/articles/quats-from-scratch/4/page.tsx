'use client'
import { ChangeEvent, ChangeEventHandler, useEffect, useRef, useState } from 'react';
import { Visualizer } from './visualizer';

const TAU = 2.0 * Math.PI

export default () => {
  const sceneElement = useRef<HTMLDivElement>(null);
  let visualizer: Visualizer

  useEffect(() => {
    visualizer = new Visualizer();
    sceneElement.current!.appendChild(visualizer.renderer.domElement)
  })

  function updateTheta(e: ChangeEvent<HTMLInputElement>) {
    const v = parseFloat(e.target.value);
    visualizer.setTheta(v)
  }

  return (
    <div>
      <h2 className="m-auto text-3xl mt-8 flex justify-center">
        Picture This
      </h2>
      <h3 className="m-auto text-l mb-4 flex justify-center">
        <i>Let's do the twist!</i>
      </h3>

      <p>
        Now that we have an interpretation of quaternions, at least in the context of 3d rotations, both as actions and as positions, we can visualize the rotation of p by q by considering a twisting action around the axis. As the components are twisted, they maintain their overall length:
      </p>
      <div className='flex justify-center'>
        <div ref={sceneElement}></div>
      </div>
      <div className='flex justify-center gap-4'>
        <span className='font-bold text-2xl'>-2π</span>
        {/* <span>{"\\(-2\\pi\\)"}</span> */}
        <input
          type="range" min={-TAU} step={TAU/180} max={TAU+0.001} defaultValue={Math.PI/2} onChange={updateTheta}
          className='grow max-w-150'  
        />
        <span className='font-bold text-2xl'>2π</span>
        {/* <span>{"\\(2\\pi\\)"}</span> */}
      </div>
      <p>
        The twisting and untwisting occurs with respect to the axis of rotation. Conjugating p by q guarantees it will twist and untwist along the same axis. In this way, we can picture quaternions rotating points in 3d, enriched by our understanding of the algebra!*
      </p>

      <h2 className="m-auto text-3xl mt-8 flex justify-center">
        The End
      </h2>
      <h3 className="m-auto text-l mb-4 flex justify-center">
        <i>... for now</i>
      </h3>
      
      <p>
        I hope you enjoyed exploring these wonderful mathematical objects with me. In the future I would like to extend this article to include sections on composition and interpolation, with comparisons to matrix operations. Check back later for more!
      </p>

      {/* <p>
        If you did enjoy this article and can spare the change, please TODO: Buy me a coffee! It will make it possible for me to make more content like this in the future! 
      </p> */}

      <p>

      </p>

      <hr className='mt-10 mb-10' />

      <p>
        <b>*</b> For those who are familiar, note that in the geometric algebra there is a difference between the "stay-in-place" and "twist" behaviors that is not present in the quaternion algebra alone. When composing rotations, the only terms involved are scalars and bivectors, meaning <b>stay-in-place/reflect</b> and <b>rotate</b> respectively. However, when rotating a point, the intermediate term in the calculation coming from the "twisting" is an oriented volume. So once this oriented volume is wound into being it can be "unwound" along any axis, its not aligned to any particular plane of rotation, which may be suggested by the visualization above. This detail, however, is irrelevant in the context of rotating 3d points, in which we are always performing a conjugation.
      </p>

    </div>
  )
}
