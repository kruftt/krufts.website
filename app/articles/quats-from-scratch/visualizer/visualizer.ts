// import { createContext, useReducer, ActionDispatch } from "react"
import * as THREE from "three"
import { Line2 } from 'three/addons/lines/Line2.js'
import { LineGeometry } from 'three/addons/lines/LineGeometry.js';
import { LineMaterial } from 'three/addons/lines/LineMaterial.js';

const TAU = 6.2831853
// const ONE_OVER_EIGHT_ROOT_2 = 0.088388834
const ONE_OVER_ROOT_TWO = 0.70710678
const ORIGIN = new THREE.Vector3(0, 0, 0);

const WIDTH_RATIO = 0.8
const HEIGHT_RATIO = 0.9
const LINE_WIDTH = 3
const SPIRAL_SAMPLES = 100;
const ARC_SAMPLES = 100
const D_TAU = TAU / SPIRAL_SAMPLES;


const m_vector = new LineMaterial(
  {
    color: 0x000000,
    linewidth: LINE_WIDTH * 2,
  }
);
const m_shadow = new LineMaterial(
  {
    color: 0x606060,
    linewidth: LINE_WIDTH,
    opacity: 0.8,
    transparent: true,
  }
);
const m_axis = new LineMaterial(
  {
    color: 0x000000,
    linewidth: 1,
  }
);


export class Visualizer {
  scene: THREE.Scene
  renderer: THREE.WebGLRenderer
  camera: THREE.Camera
  axes: VisualizerAxes
  theta: number
  q_0: THREE.Quaternion
  q_1: THREE.Quaternion
  q_2: THREE.Quaternion
  p_0: THREE.Vector3
  p_1: THREE.Vector3
  p_2: THREE.Vector3
  vec_0: VisualizerVector
  vec_1: VisualizerVector
  vec_2: VisualizerVector
  arc_1: VisualizerArc
  arc_2: VisualizerArc
  spiral: { axis: THREE.Vector3[], plane: THREE.Vector3[] }

  constructor() {
    const scene = this.scene = new THREE.Scene();
    const renderer = this.renderer = new THREE.WebGLRenderer();
    const camera = this.camera = new THREE.PerspectiveCamera(75, 1.33, 0.1, 1000);
    
    const _size = Math.max(
      Math.min(window.innerWidth * WIDTH_RATIO, window.innerHeight * HEIGHT_RATIO),
      512)
    renderer.setSize(_size, _size * .75);
    renderer.setClearAlpha(0);
    camera.position.x = 1.0;
    camera.position.y = 0.8;
    camera.position.z = 1.2;
    camera.lookAt(0,0,0);

    const spiral_axis: THREE.Vector3[] = [], spiral_plane: THREE.Vector3[] = []
    this.spiral = { axis: spiral_axis, plane: spiral_plane }

    for (let i = 0; i < SPIRAL_SAMPLES; i++) {
      this.spiral.axis.push(new THREE.Vector3(0, 0, 0))
      this.spiral.plane.push(new THREE.Vector3(0, 0, 0))
    }

    this.axes = new VisualizerAxes()
    this.theta = 0
    this.q_0 = new THREE.Quaternion(0, ONE_OVER_ROOT_TWO, ONE_OVER_ROOT_TWO, 0)
    this.q_1 = new THREE.Quaternion(0, 0, 0, 0)
    this.q_2 = new THREE.Quaternion(0, 0, 0, 0)
    this.p_0 = new THREE.Vector3(0, ONE_OVER_ROOT_TWO, ONE_OVER_ROOT_TWO)
    this.p_1 = new THREE.Vector3(0, 0, 0)
    this.p_2 = new THREE.Vector3(0, 0, 0)
    this.vec_0 = new VisualizerVector(this.p_0)
    this.vec_1 = new VisualizerVector(this.p_1)
    this.vec_2 = new VisualizerVector(this.p_2)
    this.arc_1 = new VisualizerArc(this.q_0, this.q_1)
    this.arc_2 = new VisualizerArc(this.q_1, this.q_2)

    scene.add(...this.axes.lines)
    scene.add(...this.vec_0.lines)
    scene.add(...this.vec_1.lines)
    scene.add(...this.vec_2.lines)
    scene.add(this.arc_1.line)
    scene.add(this.arc_2.line)

    this.setTheta(Math.PI * 0.4)
  }

  setTheta(theta: number) {
    this.theta = theta
    const _cos = Math.cos(theta)
    const _sin = Math.sin(theta)
    const half_theta = 0.5 * theta
    const half_cos = Math.cos(half_theta)
    const half_sin = Math.sin(half_theta)
    
    const q = new THREE.Quaternion(0, ONE_OVER_ROOT_TWO, ONE_OVER_ROOT_TWO, 0)
    
    const rotor = new THREE.Quaternion(0,half_sin,0,half_cos)
    q.premultiply(rotor)
    this.q_1.set(q.x, q.y, q.z, q.w)
    q.multiply(rotor.invert())
    this.q_2.set(q.x, q.y, q.z, q.w)
    
    quatToPoint(this.q_1, this.p_1)
    quatToPoint(this.q_2, this.p_2)
    
    // update Spiral
    // const spiral_points = this.spiral.axis
    // const spiral_shadow = this.spiral.plane
    // let i, spiral_cos, spiral_sin, _p, _p2, _a, _b, _z
    // for (i = 0; i < SPIRAL_SAMPLES; i++) {
    //   _p = spiral_points[i]
    //   _p2 = spiral_shadow[i]
    //   spiral_cos = Math.cos(i * D_TAU)
    //   spiral_sin = Math.sin(i * D_TAU)
    //   _z = half_sin * ONE_OVER_EIGHT_ROOT_2 * (1 - spiral_cos)
    //   _a = _z * spiral_cos + ONE_OVER_ROOT_TWO
    //   _b = _z * spiral_sin
    //   _p2.z = _p.z = _a*half_cos - _b*half_sin
    //   _p2.x = _p.x = _a*half_sin + _b*half_cos
    //   _p.y = half_cos * D_HEIGHT * i
    // }
    const spiral_points = this.spiral.axis
    const spiral_shadow = this.spiral.plane
    let i, phi, __cos, __sin = 0, _p, _p2
    const r = - this.q_1.w / TAU
    const d_height = this.q_1.y / SPIRAL_SAMPLES;
    for (i = 0; i < SPIRAL_SAMPLES; i++) {
      phi = i * D_TAU
      _p = spiral_points[i]
      _p2 = spiral_shadow[i]
      __cos = r * Math.cos(phi)
      __sin = r * Math.sin(phi)
      _p2.x = _p.x = ONE_OVER_ROOT_TWO * (half_sin * (1 - r + __cos) + half_cos * __sin)
      _p2.z = _p.z = ONE_OVER_ROOT_TWO * (half_cos * (1 - r + __cos) - half_sin * __sin)
      _p.y = i * d_height
    }

    this.update()
  }

  update() {
    this.vec_0.update()
    this.vec_1.update(this.spiral)
    this.vec_2.update()
    this.arc_1.update(this.theta)
    this.arc_2.update(this.theta)
    this.renderer.render(this.scene, this.camera);
  }
}


class VisualizerAxes {
  lines: Line2[]
  constructor() {
    this.lines = []
    this.lines.push(new Line2(new LineGeometry()
      .setFromPoints([new THREE.Vector3(-1, 0, 0), new THREE.Vector3(1, 0, 0)]), m_axis))
    this.lines.push(new Line2(new LineGeometry()
      .setFromPoints([new THREE.Vector3(0, -1, 0), new THREE.Vector3(0, 1, 0)]), m_axis))
    this.lines.push(new Line2(new LineGeometry()
      .setFromPoints([new THREE.Vector3(0, 0, -1), new THREE.Vector3(0, 0, 1)]), m_axis))
  }
}


class VisualizerVector {
  p_plane: THREE.Vector3
  lines: [Line2, Line2, Line2]
  
  constructor(public p: THREE.Vector3) {
    this.p_plane = new THREE.Vector3(0, 0, 0)
    this.lines = [
      new Line2(new LineGeometry(), m_vector),
      new Line2(new LineGeometry(), m_shadow),
      new Line2(new LineGeometry(), m_shadow),
    ]
    this.update()
  }

  update(spiral?: { plane: THREE.Vector3[], axis: THREE.Vector3[] }) {
    this.p_plane.x = this.p.x
    this.p_plane.z = this.p.z
    this.lines[0].geometry.setFromPoints([ORIGIN, this.p])

    if (spiral) {
      this.lines[1].geometry.setFromPoints(spiral.axis)
      this.lines[2].geometry.setFromPoints([ORIGIN, this.p_plane, ...spiral.plane])
    } else {
      this.lines[1].geometry.setFromPoints([this.p_plane, this.p])
      this.lines[2].geometry.setFromPoints([ORIGIN, this.p_plane])
    }
  }
}


function quatToPoint(q: THREE.Quaternion, p: THREE.Vector3) {
  p.set(q.x, q.y, q.z)
}


class VisualizerArc {
  geometry: LineGeometry
  line: Line2
  points: THREE.Vector3[]

  constructor(public q1: THREE.Quaternion, public q2: THREE.Quaternion) {
    this.geometry = new LineGeometry()
    this.line = new Line2(this.geometry, m_shadow)
    this.points = []
    for (let i=0; i < ARC_SAMPLES; i++) {
      this.points.push(new THREE.Vector3(0,0,0))
    }
  }

  update(theta: number) {
    const d_theta = 0.5 * theta / ARC_SAMPLES
    let r = new THREE.Quaternion(this.q1.x, this.q1.y, this.q1.z, this.q1.w)
    let rotor = new THREE.Quaternion(0, Math.sin(d_theta), 0, Math.cos(d_theta))
    let reverse = false
    if (r.w != 0) {
      rotor.y = -rotor.y
      reverse = true
    }

    let _p
    for (let i = 0; i < ARC_SAMPLES; i++) {
      _p = this.points[i]
      quatToPoint(r, _p)
      if (reverse) {
        r.multiply(rotor)
      } else {
        r.premultiply(rotor)
      }
    }

    this.geometry.setFromPoints(this.points)
  }
}

