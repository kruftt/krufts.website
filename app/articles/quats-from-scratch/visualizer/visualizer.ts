// import { createContext, useReducer, ActionDispatch } from "react"
import * as THREE from "three"
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { Line2 } from 'three/addons/lines/Line2.js'
import { LineGeometry } from 'three/addons/lines/LineGeometry.js';
import { LineMaterial } from 'three/addons/lines/LineMaterial.js';

const TAU = 6.2831853
// const ONE_OVER_EIGHT_ROOT_2 = 0.088388834
const ONE_OVER_ROOT_TWO = 0.70710678
const ORIGIN = new THREE.Vector3(0, 0, 0);

const WIDTH_RATIO = 0.95
const HEIGHT_RATIO = 0.9
const FONT_SIZE = 42
const TEXT_SCALE = 0.002
const SHADOW_WIDTH = 2
const Q_WIDTH = 3
const ARC_WIDTH = 4
const VECTOR_WIDTH = 5
const SPIRAL_SAMPLES = 120;
const ARC_SAMPLES = 120
const D_TAU = TAU / (SPIRAL_SAMPLES - 1);

const REGION_OPACITY = 0.42
const ARC_OPACITY = 0.75
const AXIS_OPACITY = 0.75
const SHADOW_OPACITY = 0.75
const SPIRAL_OPACITY = 0.75

const C_SHADOW = 0x606060
const C_GREEN = 0x0c8773
const C_RED = 0xa01752

const m_vector = new LineMaterial({
  color: 0x000000,
  linewidth: VECTOR_WIDTH,
});
const m_shadow = new LineMaterial({
  color: C_SHADOW,
  linewidth: SHADOW_WIDTH,
  opacity: SHADOW_OPACITY,   
  transparent: true,
});
const m_spiral_shadow = new LineMaterial({
  color: C_SHADOW,
  linewidth: SHADOW_WIDTH,
  opacity: SPIRAL_OPACITY,   
  transparent: true,
});

const m_axis_one = new LineMaterial({
  color: C_GREEN,
  linewidth: Q_WIDTH,
  opacity: AXIS_OPACITY,
  transparent: true,
});
const m_arc_one = new LineMaterial({
  color: C_GREEN,
  linewidth: ARC_WIDTH,
  opacity: ARC_OPACITY,
  transparent: true,
});
const m_region_one = new THREE.MeshBasicMaterial({
  color: C_GREEN,
  side: THREE.DoubleSide,
  opacity: REGION_OPACITY,
  transparent: true
})

const m_axis_two = new LineMaterial({
  color: C_RED,
  linewidth: Q_WIDTH,
  opacity: AXIS_OPACITY,
  transparent: true,
});
const m_arc_two = new LineMaterial({
  color: C_RED,
  linewidth: ARC_WIDTH,
  opacity: ARC_OPACITY,
  transparent: true,
});
const m_region_two = new THREE.MeshBasicMaterial({
  color: C_RED,
  side: THREE.DoubleSide,
  opacity: REGION_OPACITY,
  transparent: true
})

const m_axis = new LineMaterial({
  color: 0x000000,
  linewidth: 1,
});


export class Visualizer {
  scene: THREE.Scene
  renderer: THREE.WebGLRenderer
  camera: THREE.Camera
  controls: OrbitControls
  // axes: VisualizerAxes
  theta: number
  aq_1: THREE.Quaternion
  aq_2: THREE.Quaternion
  ap_1: THREE.Vector3
  ap_2: THREE.Vector3
  q_0: THREE.Quaternion
  q_1: THREE.Quaternion
  q_2: THREE.Quaternion
  a_1: VisualizerVector
  a_2: VisualizerVector
  p_0: THREE.Vector3
  p_1: THREE.Vector3
  p_2: THREE.Vector3
  vec_0: VisualizerVector
  vec_1: VisualizerVector
  vec_2: VisualizerVector
  arc_1: VisualizerArc
  arc_2: VisualizerArc
  
  constructor() {
    const scene = this.scene = new THREE.Scene();
    const renderer = this.renderer = new THREE.WebGLRenderer();
    const camera = this.camera = new THREE.PerspectiveCamera(67, 1.7, 0.01, 4);
    const controls = this.controls = new OrbitControls(camera, renderer.domElement);
    
    const _size = Math.max(Math.min(window.innerWidth * WIDTH_RATIO, window.innerHeight * HEIGHT_RATIO), 512)
    renderer.setSize(_size, _size * .5625);
    renderer.setClearAlpha(0);
    camera.position.set(1.0, 0.9, 1.2)
    
    controls.enablePan = false
    controls.maxDistance = 3
    controls.minDistance = 0.5
    controls.target.y = 0.19
    controls.update()

    // this.axes = new VisualizerAxes(scene)
    this.theta = 0
    this.aq_1 = new THREE.Quaternion(1, 0, 0, 0)
    this.aq_2 = new THREE.Quaternion(1, 0, 0, 0)
    this.ap_1 = new THREE.Vector3(0, 0, 1) 
    this.ap_2 = new THREE.Vector3(0, 0, 1) 
    this.a_1 = new VisualizerVector(scene, m_axis_one, this.aq_1, this.ap_1, 1, "q")
    this.a_2 = new VisualizerVector(scene, m_axis_two, this.aq_2, this.ap_2, 1, "q*")
    this.q_0 = new THREE.Quaternion(0, ONE_OVER_ROOT_TWO, ONE_OVER_ROOT_TWO, 0)
    this.q_1 = new THREE.Quaternion(0, 0, 0, 0)
    this.q_2 = new THREE.Quaternion(0, 0, 0, 0)
    this.p_0 = new THREE.Vector3(0, ONE_OVER_ROOT_TWO, ONE_OVER_ROOT_TWO)
    this.p_1 = new THREE.Vector3(0, 0, 0)
    this.p_2 = new THREE.Vector3(0, 0, 0)
    this.vec_0 = new VisualizerVector(scene, m_vector, this.q_0, this.p_0, ONE_OVER_ROOT_TWO, "p")
    this.vec_1 = new VisualizerVector(scene, m_vector, this.q_1, this.p_1, ONE_OVER_ROOT_TWO, "qp")
    this.vec_2 = new VisualizerVector(scene, m_vector, this.q_2, this.p_2, ONE_OVER_ROOT_TWO, "qpq*")
    this.arc_1 = new VisualizerArc(scene, this.q_0, this.q_1, m_arc_one, m_region_one)
    this.arc_2 = new VisualizerArc(scene, this.q_1, this.q_2, m_arc_two, m_region_two)

    this.setTheta(Math.PI * 0.75)
    renderer.setAnimationLoop(() => {
      this.a_1.render(this.camera)
      this.a_2.render(this.camera)
      this.vec_0.render(this.camera)
      this.vec_1.render(this.camera)
      this.vec_2.render(this.camera)
      renderer.render(scene, camera)
    })
  }

  setTheta(theta: number) {
    this.theta = theta
    this.update()
  }

  update() {
    const theta = this.theta
    const cos = Math.cos(theta)
    const sin = Math.sin(theta)
    const half_theta = 0.5 * theta
    const half_cos = Math.cos(half_theta)
    const half_sin = Math.sin(half_theta)
    
    this.aq_1.set(0, half_sin, 0, half_cos)
    this.aq_2.set(0, -half_sin, 0, half_cos)
    this.ap_1.set(0, half_sin, 0)
    this.ap_2.set(0, -half_sin, 0)
    
    const q = new THREE.Quaternion(0, ONE_OVER_ROOT_TWO, ONE_OVER_ROOT_TWO, 0)
    const rotor = new THREE.Quaternion(0, half_sin, 0, half_cos)
    q.premultiply(rotor)
    this.q_1.copy(q)
    q.multiply(rotor.invert())
    this.q_2.copy(q)

    quatToPoint(this.q_1, this.p_1)
    quatToPoint(this.q_2, this.p_2)

    this.a_1.update(theta, half_cos, half_sin)
    this.a_2.update(theta, cos, sin)
    this.vec_0.update(theta, 0, 0)
    this.vec_1.update(theta, half_cos, half_sin)
    this.vec_2.update(theta, 0, sin)
    this.arc_1.update(theta)
    this.arc_2.update(theta)
  }
}


class VisualizerAxes {
  lines: Line2[]
  constructor(scene: THREE.Scene) {
    this.lines = []
    this.lines.push(new Line2(new LineGeometry()
      .setFromPoints([new THREE.Vector3(-1, 0, 0), new THREE.Vector3(1, 0, 0)]), m_axis))
    this.lines.push(new Line2(new LineGeometry()
      .setFromPoints([new THREE.Vector3(0, -1, 0), new THREE.Vector3(0, 1, 0)]), m_axis))
    this.lines.push(new Line2(new LineGeometry()
      .setFromPoints([new THREE.Vector3(0, 0, -1), new THREE.Vector3(0, 0, 1)]), m_axis))
    scene.add(...this.lines)
  }
}


class VisualizerVector {
  p_plane: THREE.Vector3
  /**
   * [vector, axis, spiral_shadow, plane]
   */
  lines: [Line2, Line2, Line2, Line2]
  label?: THREE.Mesh
  spiral_axis: THREE.Vector3[]
  spiral_plane: THREE.Vector3[] 
  
  constructor(scene: THREE.Scene, mat: LineMaterial, public q: THREE.Quaternion, public p: THREE.Vector3, public norm: number, name: string) {
    this.p_plane = new THREE.Vector3(0, 0, 0)

    this.lines = [
      new Line2(new LineGeometry(), mat),
      new Line2(new LineGeometry(), m_shadow),
      new Line2(new LineGeometry(), m_spiral_shadow),
      new Line2(new LineGeometry(), m_shadow),
    ]

    this.spiral_axis = []
    this.spiral_plane = []
    const spiral_axis = this.spiral_axis
    const spiral_plane = this.spiral_plane

    for (let i = 0; i < SPIRAL_SAMPLES; i++) {
      spiral_axis.push(new THREE.Vector3(0, 0, 0))
      spiral_plane.push(new THREE.Vector3(0, 0, 0))
    }
    
    const ctx = makeLabelCanvas(FONT_SIZE, name)
    if (ctx) {
      const tex = new THREE.CanvasTexture(ctx)
      tex.minFilter = THREE.LinearFilter
      tex.wrapS = THREE.ClampToEdgeWrapping
      tex.wrapT = THREE.ClampToEdgeWrapping
      
      const mat = new THREE.MeshBasicMaterial({
        map: tex,
        transparent: true
      })

      this.label = new THREE.Mesh(
        new THREE.PlaneGeometry(ctx.width * TEXT_SCALE, ctx.height * TEXT_SCALE),
        mat
      )

      this.label.renderOrder = 1
      scene.add(this.label)
    }
    
    scene.add(...this.lines)
  }

  render(camera: THREE.Camera) {
    if (!this.label) return
    this.label.lookAt(camera.position)
  }

  update(theta: number, sin: number, cos: number) {
    this.p_plane.x = this.p.x
    this.p_plane.z = this.p.z

    const spiral_axis = this.spiral_axis
    const spiral_plane = this.spiral_plane
    let i, phi, __cos, __sin = 0, _p, _p2
    const r = - this.q.w / TAU
    const d_height = this.q.y / (SPIRAL_SAMPLES - 1);
    
    for (i = 0; i < SPIRAL_SAMPLES; i++) {
      phi = i * D_TAU
      _p = spiral_axis[i]
      _p2 = spiral_plane[i]
      __cos = r * Math.cos(phi)
      __sin = r * Math.sin(phi)
      _p2.x = _p.x = this.p.x + this.norm * (cos * (__cos - r) - sin * __sin)
      _p2.z = _p.z = this.p.z + this.norm * (sin * (__cos - r) + cos * __sin)
      _p.y = i * d_height
    }

    this.lines[0].geometry.setFromPoints([ORIGIN, this.p])
    this.lines[1].geometry.setFromPoints(spiral_axis)
    this.lines[2].geometry.setFromPoints(spiral_plane)
    this.lines[3].geometry.setFromPoints([ORIGIN, this.p_plane])

    const _l = this.label
    if (_l) {
      const length = this.p.length()
      const ratio = (length + 0.12) / (length + 0.0000001)
      _l.position.set(
        this.p.x * ratio,
        this.p.y * ratio,
        this.p.z * ratio,
      )
    }
  }
}


function quatToPoint(q: THREE.Quaternion, p: THREE.Vector3) {
  p.set(q.x, q.y, q.z)
}


class VisualizerArc {
  line: Line2
  region: THREE.Mesh
  points: THREE.Vector3[]
  faces: THREE.Vector3[]

  constructor(
    scene: THREE.Scene,
    public q1: THREE.Quaternion,
    public q2: THREE.Quaternion,
    m_arc: LineMaterial,
    m_region: THREE.Material
  ) {
    this.line = new Line2(new LineGeometry(), m_arc)
    
    this.points = []
    this.faces = []
    for (let i=0; i < ARC_SAMPLES - 1; i++) {
      this.points.push(new THREE.Vector3(0,0,0))
      this.faces.push(ORIGIN, new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, 0))
    }
    this.points.push(new THREE.Vector3(0,0,0))
    this.region = new THREE.Mesh(new THREE.BufferGeometry(), m_region)
    this.region.renderOrder = 1

    scene.add(this.line)
    scene.add(this.region)
  }

  update(theta: number) {
    const d_theta = 0.5 * theta / (ARC_SAMPLES - 1)
    let r = new THREE.Quaternion(this.q1.x, this.q1.y, this.q1.z, this.q1.w)
    let rotor = new THREE.Quaternion(0, Math.sin(d_theta), 0, Math.cos(d_theta))
    let reverse = false
    if (r.w != 0) {
      rotor.y = -rotor.y
      reverse = true
    }

    let _p1, _p2
    _p2 = this.points[0]
    quatToPoint(r, _p2)
    if (reverse) {
      r.multiply(rotor)
    } else {
      r.premultiply(rotor)
    }
    
    for (let i = 0; i < ARC_SAMPLES - 1; i++) {
      _p1 = this.points[i]
      _p2 = this.points[i+1]
      quatToPoint(r, _p2)
      this.faces[(3*i)+1].set(_p1.x, 0, _p1.z)
      this.faces[(3*i)+2].set(_p2.x, 0, _p2.z)
      
      if (reverse) {
        r.multiply(rotor)
      } else {
        r.premultiply(rotor)
      }
    }

    this.line.geometry.setFromPoints(this.points)
    this.region.geometry.setFromPoints(this.faces)
    // this.region.geometry.computeVertexNormals()
  }
}

function makeLabelCanvas(size: number, name: string) {
  const border = 2
  const two_border = 2 * border
  const ctx = document.createElement('canvas').getContext('2d')
  if (!ctx) return
  const font = `bold ${size}px sans-serif`
  ctx.font = font
  const width = ctx.measureText(name).width + two_border
  const height = size + two_border
  ctx.canvas.width = width
  ctx.canvas.height = height
  ctx.font = font
  ctx.textBaseline = 'top'
  // ctx.fillStyle = 'white';
  // ctx.fillRect(0, 0, width, height);
  ctx.fillStyle = 'black';
  ctx.fillText(name, border, border);
  return ctx.canvas;
}

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
