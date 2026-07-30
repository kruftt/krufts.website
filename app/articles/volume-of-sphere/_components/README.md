# Volume-of-Cone visualization

An interactive three.js / react-three-fiber proof that a cone is one third of its
bounding cylinder. The reader drags shapes through four steps:

1. **Cone → square pyramid** — drag the base edge radially outward; the bounding
   cage morphs cylinder → cube in lockstep.
2. **Cavalieri shift** — drag the apex to a top corner of the cube.
3. **First copy** — drag a rotated copy straight down into the cube.
4. **Second copy** — drag a third copy down to fill the cube.

Three identical pyramids fill the cube, so the cone (= one pyramid via Cavalieri)
is one third of the cylinder.

The code is split into four files: pure geometry, reusable R3F hooks, sequence
constants, and the scene/component tree.

---

## `geometry.ts`

Pure geometry helpers — no React, only `THREE`. Everything is built around one
idea: the cone→pyramid solid and the cylinder→cube cage are the same
"generalized prism" whose cross-section blends between a circle and a square via
a single `squareness` parameter. Shared dimension constants (`RADIUS`, `HEIGHT`,
`SEG`, `STAGE_HEIGHT`) live at the top.

- **`ringPoint(angle, squareness, out?)`** — Returns a point on a ring that
  blends between the unit circle (`squareness = 0`) and the unit square
  (`squareness = 1`, corners reaching √2). The primitive every other builder uses
  to get the circle↔square morph.
- **`ringScale(squareness)`** — The uniform scale that normalizes a ring's area to
  the square's, so the morph is **area-preserving**: the starting circle and the
  final square enclose the same area (the square is left unscaled; the circle is
  enlarged by ≈1.13). This makes the cone→pyramid step volume-preserving, i.e. a
  visible Cavalieri argument. Used by `updateSolid`, `updateCage`, and
  `updatePyramidEdges`.
- **`createSolidGeometry()`** — Builds the morphing solid's `BufferGeometry`
  (`SEG` base-ring vertices + apex + base centre, indexed into side faces and a
  base cap). Initialised as a cone.
- **`updateSolid(geom, squareness, apexX, apexZ)`** — Rewrites the solid's vertex
  positions in place for a given `squareness` and apex position, then recomputes
  normals. Called every frame while a handle is dragged.
- **`createPyramidEdges()`** — Builds the dedicated 8-edge wireframe for pyramid
  #1 (4 base corners + apex, drawn as line segments). Separate from the solid
  because the apex moves and needs its own crisp outline.
- **`updatePyramidEdges(geom, squareness, apexX, apexZ)`** — Updates the five
  wireframe vertices to match the solid's current corners and apex.
- **`createCageGeometry()`** — Builds the bounding cage as `LineSegments`: a
  bottom ring, a top ring, and four vertical edges at the square's corners
  (cylinder when round, cube when square).
- **`updateCage(geom, squareness)`** — Rewrites the cage's ring vertices for the
  current `squareness`, morphing cylinder ↔ cube.
- **`createRigidPyramidGeometry(apex)`** — Builds a static square pyramid (base =
  cube bottom face, apex = the given corner) expressed with its **apex at the
  local origin**, so a group placed at the apex can rotate it about the shared
  vertex. Used for pyramid #1 (steps 3–4) and both copies.
- **`diagonalQuaternion(turns, axis)`** — Returns the rotation of `turns × 120°`
  about the cube's body-diagonal `axis`, mapping pyramid #1 onto copy #1 / #2.

---

## `scene-hooks.ts`

Reusable react-three-fiber hooks pulled out of the scene component. All are
generic (no proof-specific knowledge); the domain constants stay in the scene.

- **`useFade(ref, goal)`** — Eases a material's `opacity` toward `goal` at a fixed
  rate (`FADE_S` to cross the full 0..1 range). Materials start at `opacity: 0`,
  so they fade in on mount and fade out when `goal` becomes 0.
- **`useGrabCursor(enabled)`** — Manages the canvas cursor: `grab` while hovering
  a live draggable, `grabbing` while dragging. Resets on pointer release and on
  unmount (so a mid-drag commit that unmounts the handle never leaves the cursor
  stuck). Returns `{ onHover, onDragStart }` to wire into `DragControls`.
- **`useDepthSort(ref, localPoint)`** — Each frame, sets the mesh's `renderOrder`
  from the distance between a chosen local reference point and the camera, so the
  nearer of several interpenetrating translucent meshes draws last (on top). With
  `depthWrite` off this yields correct blending from any angle.
- **`useOrbitAutoEnable()`** — Re-enables the default `OrbitControls` on the next
  pointer release. Works around commits that unmount the active `DragControls`
  before its drag-end fires (which would otherwise leave orbit stuck off), while
  preventing the camera from hijacking the still-held pointer at commit time.
- **`useOrbitFraming(targetY, targetDist)`** — Eases the orbit pivot height and
  camera distance toward a target, preserving the user's current view direction.
  Seeds from the actual camera on the first frame and re-arms whenever the target
  changes.

---

## `step-sequence.ts`

Small constants module for the linear 4-step sequence (no logic). Its `STEP_*`
values are indexed by the scene's `currentStep`.

- **`STEP_CAPTIONS`** — The instruction text shown under the canvas for each step.
- **`STEP_COUNT`** — Number of steps (`STEP_CAPTIONS.length`); reaching it means
  the proof is complete.
- **`DONE_CAPTION`** — The closing line shown once the cube is full.
- **`FADE_MS`** — Step-transition fade duration; the step advance is held this
  long so the outgoing handle fades before the next one fades in. Shared by
  `useFade` (via `scene-hooks`) and the parent's advance timer.

---

## `volume-of-cone-scene.tsx`

The component tree. Top-of-file constants cover tuning (`COMMIT`, `SEAT_EPS`),
colors, opacities, reused `THREE` temporaries, and `LOCAL_SORT_CORNER` (the
per-pyramid depth-sort reference point — the cube corner each pyramid fills,
which in local space is straight down from the apex).

- **`clamp01(x)`** — Clamps a number to `[0, 1]`. Used by the handle `project`
  functions to turn a constrained drag position into progress.
- **`FillMaterial({ color, opacity, matRef? })`** — The shared translucent pyramid
  fill material (`transparent`, `DoubleSide`, `depthWrite={false}`). Centralises
  the material config used by all three pyramids; `matRef` lets `useFade` animate
  it.
- **`framingFor(step)`** — Returns the orbit pivot height + camera distance preset
  for a given step: pull in on the cone (step 1), pull out and raise the pivot for
  the drops (steps 3–4), recenter on the cube once complete.
- **`MorphHandle({ initial, project, onCommit, fadingOut })`** — The draggable
  sphere for steps 1–2. `DragControls` with `autoTransform` off; `project` maps
  the raw drag-plane point to a constrained handle position and returns `[0,1]`
  progress (radial lock in step 1, top-face travel in step 2). Commits once
  progress crosses `COMMIT`; fades in on mount and out on `fadingOut`.
- **`DropPyramid({ geometry, edges, quaternion, apex, color, active, onSeated })`**
  — A rigid pyramid copy for steps 3–4. `DragControls` clamped to a vertical drop
  above the shared apex; calls `onSeated` when it reaches the slot. Fades in on
  mount, participates in `useDepthSort`, and is only draggable while `active`.
- **`Scene({ currentStep, committing, onAdvance })`** — The contents rendered
  inside `<Canvas>`: lights, `OrbitControls`, the morphing solid + cage (steps
  1–2) or the rigid corner pyramid (steps 3–4), the pyramid edge wireframes, the
  active handle, and the drop copies. Owns the live morph refs (`squareness`,
  `apex`) driven imperatively in a `useFrame`, the chosen apex corner state, and
  the memoized geometries/quaternions. Wires in the camera hooks
  (`useOrbitAutoEnable`, `useOrbitFraming`).
- **`VolumeOfConeScene({ className })`** *(default export)* — The outer DOM
  component. Holds the step state machine (`currentStep`, `committing`, reset
  `nonce`), renders the `<Canvas>` with `<Scene>`, and the caption + step-dot row
  + Reset button below it. `advance` sets `committing` and delays the actual step
  bump by `FADE_MS` so transitions cross-fade.
