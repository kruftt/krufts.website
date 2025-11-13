'use client'
import { ChangeEvent, ChangeEventHandler, useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
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
      <div>
        Now that we have an interpretation of quaternions both as actions and as positions (with a twist), at least in the context of rotations, we can visualize the rotation, aka the conjugation, of p by q:
      </div>
      <div className='flex justify-center' ref={sceneElement}></div>
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
      <div className='text-center'>
        Notice the arcs stay within a cylindrical hull
      </div>
      (composition: think of quat * quat mult in geo alegra, in which the real is stay-in-place)
      

      (What if we wanted to keep track of direction in 2-Dimensions)

      (Give a page with the advanced take in few words.. that in geometric algebra the twisted part is actually a 3-blade that is untwisted by the 2-blade rotor elements into vectors. But when you multiply two quaternions together you're only multiplying rotors and getting rotors or scalars back out. So you don't have to interpret the 3-blade.)
    </div>
  )
}
