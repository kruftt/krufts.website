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
      <div className='flex justify-center' ref={sceneElement}></div>
      <div className='flex justify-center'>
        <input
          type="range" min={-TAU} step={TAU/180} max={TAU+0.001} defaultValue={0} onChange={updateTheta}
          className='w-7/8'  
        />
      </div>
      <div className='text-center'>
        Notice the arcs stay within a cylindrical hull
      </div>
    </div>
  )
}
