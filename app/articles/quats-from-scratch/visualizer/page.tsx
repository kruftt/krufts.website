'use client'
import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function Visualizer() {
  const sceneElement = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1.0, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(600, 400);
    renderer.setClearAlpha(0);
    sceneElement.current!.appendChild(renderer.domElement);

    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    camera.position.z = 5;

    function animate() {
      cube.rotation.x += 0.01;
      cube.rotation.y -= 0.01;
      renderer.render(scene, camera);
    }
    renderer.setAnimationLoop(animate);

    console.log('done')

    return () => {
      // sceneElement.current!.removeChild(renderer.domElement);
    }
  });


  return (
    <div>
      hello from QuatMult
      <div ref={sceneElement}></div>
    </div>
  )
}