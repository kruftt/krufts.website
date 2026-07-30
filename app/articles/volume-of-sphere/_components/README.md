# Volume-of-sphere visualizations

Two interactive three.js / react-three-fiber proofs for the article, each a linear
sequence of steps the reader drags through. `shared/` holds the pieces both use;
each scene owns its geometry and captions. `page.tsx` pulls both in with
`dynamic(..., { ssr: false })`.

```
shared/   constants.ts  scene-hooks.ts  materials.tsx  handles.tsx  proof-scene.tsx
cone/     geometry.ts   captions.ts     volume-of-cone-scene.tsx
sphere/   geometry.ts   captions.ts     volume-of-sphere-scene.tsx
```

---

## The cone proof

A proof that a cone is one third of its bounding cylinder. Four steps:

1. **Cone → square pyramid** — drag the base edge radially outward; the bounding
   cage morphs cylinder → cube in lockstep.
2. **Cavalieri shift** — drag the apex to a top corner of the cube.
3. **First copy** — drag a rotated copy straight down into the cube.
4. **Second copy** — drag a third copy down to fill the cube.

Three identical pyramids fill the cube, so the cone (= one pyramid via Cavalieri)
is one third of the cylinder.

## The sphere proof

Picks up where the first leaves off. A sphere of radius `R` sits centred on the
equator plane `y = MID`, inscribed in a cylinder of radius `R` and height `2R`:

- Cylinder = `2πR³`.
- *Bottom half-cylinder minus bottom half-ball* = `πR³ − ⅔πR³ = ⅓πR³` — exactly
  the volume of a cone of radius `R` and height `R`.
- Two of those pieces (bottom plus mirrored cap) = `⅔πR³`, so
  sphere = `2πR³ − ⅔πR³ = ⁴⁄₃πR³`.

Because the first proof's result is scale-independent, this scene may open on a
*new* cone of radius `R` and height `R` in a squat cylinder, with no bridging step
to justify. Three steps:

1. **Carve** — drag the ring at the cone's apex out to the cylinder wall. The cone
   opens from its axis into the bottom half-cylinder with a hemispherical bite
   taken out of it.
2. **Seat the sphere** — drag the sphere down; its bottom half fills the hollow
   exactly, its top half stands above the equator.
3. **Cap it** — drag the mirrored piece onto the equator plane, closing the
   cylinder around the sphere.

The figure deliberately shares the cone proof's dimensions (radius 1, height 2),
so step 1 — which only uses the bottom half — reads smaller than the first figure
until the cap arrives.

### Step 1 is an exact area-preserving morph

Sampling the profile by the sphere's polar angle `φ` (0 at the flat base, `π/2` at
the pinch) rather than by height gives the whole family a closed form:

```
y     = R(1 − cos φ)                height above the flat base
inner = t·R·sin φ                   the cavity
outer = R·√(t² sin²φ + cos²φ)       the outer wall
```

| | |
|---|---|
| `t = 0` | `inner ≡ 0`, `outer = R cos φ = R − y` → **the cone** |
| `t = 1` | `inner` = the sphere's own radius at that height, `outer ≡ R` → **half-cylinder minus half-ball** |
| every `t` | slice area `= π(outer² − inner²) = π(R − y)²` → volume holds at `⅓πR³` throughout (Cavalieri, as in the cone proof) |
| `y = 0` | `outer = R` for all `t` → the base rim is **pinned**; the slanted side swings out around it |
| `y = R` | `inner = outer = t·R` → the solid **pinches to a circle** whose radius is the drag parameter itself |
| all `t` | `outer ≤ R` → the shell never leaves the cylinder |

The pinch circle is the mouth of the cavity, and the ring handle rides on it — so
the handle's radius maps to `t` with no remapping, unlike the cone proof's step 1.

Polar-angle sampling is not just for the closed form: the cavity meets the base
plane tangentially, so `ds/dy → ∞` there and uniform height sampling visibly
facets the flare where the hole opens.

### What was measured, not assumed

Checked by building the meshes headlessly and measuring them (one-off scripts, not
kept — they are cheap to recreate):

- **Signed volume** via the divergence theorem, `⅙Σ v₀·(v₁×v₂)` over the index
  buffer, which is positive only if the winding is outward: `1.0455…1.0461` across
  `t` against an exact `⅓π = 1.047198`. The deficit at `t = 0` is `−0.161%`,
  exactly the area ratio of a 64-gon inscribed in a circle — so the profile
  discretization contributes nothing there, as it should, the cone's profile being
  straight lines.
- **Manifold**: every edge shared by exactly two triangles with consistent
  direction, for the shell and the mirrored cap. This is what catches a mistake in
  the closed profile loop.
- **Cavity on the sphere** to `7.5e-8` at `t = 1` (float32 precision).
- **Assembled**: the two carved pieces come to `0.3330` of the cylinder against an
  exact `⅓`, and the cap seats flush at `y = [1, 2]`.

---

## Rendering and drag constraints

Six non-obvious things, each of which looks like a bug somewhere else if undone.
Between them they account for every artifact this pair of scenes has thrown, and
most took several wrong turns to pin down — the notes on what was *ruled out* are
as much the point as the fixes. The recurring lesson: an artifact that appears
"sometimes" is far more often input state or vertex data than it is depth
precision, which was chased twice here and was never the cause.

**Transparent materials stay in the transparent queue at full opacity.** Three.js
sorts that queue by *object origin* depth, not per fragment, so two objects whose
origins sit near the same depth flip order as the camera moves. Everything meant
to read as solid — the sphere, both handles, the upper cage — therefore fades in
with `useFade`'s `opaqueWhenDone`, which clears the `transparent` flag on arrival so
the object leaves that sort entirely. Without it the ring handle pops in and out of
the shell as the camera crosses the ring's own height, since the ring's origin sits
directly above the shell's.

**A committed drag keeps arriving.** `DragControls` goes on reporting `onDrag`
until the pointer is actually released, and a step commits at `COMMIT` (0.985)
rather than at 1 — so anything that keeps consuming those reports winds the shape
back off its finished state by however far the cursor drifted before letting go.
Both draggables guard against it, and both had to learn the hard way: `DropSolid`
re-pins to its seat on every frame after arriving, and `RingHandle` ignores drags
outright once committed. This is worth suspecting first for any "sometimes" bug
that depends on how the mouse was released. In the sphere proof it left the shell a
fraction short of open, which put the sphere **0.013** through the cavity — eight
times its clearance, worst exactly on the equator — and read as a band there.
`Scene` also pins the shell fully open past step 1, so no future input path can
reintroduce it.

**`DragControls` reports displacement, not position, for a handle that never
moves.** It computes `dragOffset = grabPoint − groupPosition` at drag start and
reports `intended = planeHit − dragOffset`. `RingHandle`'s group is fixed on the
axis and only its *radius* changes, so `intended.xz` is the pointer's in-plane
displacement from wherever it grabbed. Turning that into a radius needs the grab
direction, which `onDragStart` does not provide — hence the `onPointerDown` on the
ring mesh, whose `e.point` supplies it. Resolving displacement along that
direction is what makes the ring behave when grabbed from its far side.

**The sphere and the cavity nearly touch, and one constant keeps them apart.** At
`t = 1` the cavity is exactly the unit sphere centred on `MID` and the sphere body
is concentric with it, so along any ray the cavity is always hit first — and no
drift off the seat changes that, since drifting *widens* the gap (`2.00e-3` at the
seat, `2.45e-3` at a `0.03` drift). What concentricity does not cover is faceting:
both are polygonal approximations of the same sphere, with vertices exactly on it
and faces just inside, so at equal size they interleave, measured at `4.5e-4`.
`SPHERE_RADIUS = RADIUS - 0.002` clears the cavity by `1.97e-3` at every sphere
vertex, a quarter of a pixel at this scale.

The clearance is narrowest exactly on the equator — which is also where the pinch
crease, the cage's equator ring and the shell's pinch all sit, so every flicker
ever seen in that band turned out to be something else on this list, never this
clearance. **Depth precision was never a candidate**: on the 24-bit buffer this
runs on, `2e-3` spans ~170 levels even at full zoom-out. It was chased twice
anyway — via `polygonOffset` and via a tightened `near`/`far`, both since reverted —
so it is worth writing down that the cameras use plain defaults and want nothing
else. Should something one day genuinely need more depth range, note that raising
`near` clips the piece staged overhead, which comes within half a unit of the
camera when zoomed in from above.

**Do not let a knife-edge crease share vertices.** `createShell` duplicates the
rings at the pinch, the base rim and the base centre so each surface carries its
own. Where two surfaces meet at ~180° — the outer wall against the cavity at the
pinch, the base disc against the cavity at the centre — averaging their face
normals cancels the real direction to near zero and then normalizes the
floating-point residue up to unit length. The measured pinch normal was
`(0.005, 0.45, -0.89)` at azimuth 0, where symmetry demands `z = 0`; the noise had
become the whole vector. It rendered as wrongly-lit bands on the equator and
around the bottom pole, which read as the sphere showing through the shell — the
band shifted with the camera, and the shell's colour over the sphere went weak in
one place and dark in the other. Worth recognising the shape of that bug: a
*colour* change alongside a depth-looking artifact points at normals, not depth.
The bands joining each duplicated pair have zero area, so they contribute nothing
to either normal.

**Wireframes must not write depth.** A wireframe traces the solids it describes,
so its lines are unavoidably coincident with their surfaces — the cube's edges lie
in the pyramids' faces, the cylinder's verticals along the shell's wall, the bottom
ring in the plane of the base disc, and in the sphere proof the two cages share the
ring on the equator. An opaque line writes depth, so the translucent surface
touching it then wins or loses the depth test per pixel and per frame, which reads
as the wireframe flashing. `CageLines` sets `depthWrite: false` for every wireframe
in both scenes, which removes the contest.

That alone is not enough, though, and the second half matters as much as the first.
With neither the lines nor the fills writing depth, paint order decides everything —
and lines in the opaque pass are drawn *first*, so every translucent surface
overlapping them blends over them, including surfaces that are actually behind.
Flush lines all but disappear. So `CageLines` also marks them `transparent` and
gives them a high `renderOrder`, putting the wireframe last in the transparent
queue, after every fill. Lines then read crisply wherever they are not genuinely
hidden, and still depth-*test*, so the opaque sphere occludes the ones behind it.
The cue deliberately given up is translucent fills tinting the lines behind them:
the far side of a cage now reads as clearly as the near side.

Two things this cost a few rounds to learn. **Nudging the cage outward does not
cover it** — that was tried, and several of those coincidences are coplanar rather
than radial (bottom ring in the base disc's plane, top ring in the cap's), so they
stay coincident from any grazing view however far out the radius goes. With
`depthWrite` off it is unnecessary anyway, so both cages sit exactly on the bound
they represent, which is what the proof actually claims. And it is
browser-dependent, because whether it flashes comes down to how a driver
interpolates depth along a line versus across a triangle: Firefox looked clean
where Chromium did not, on identical geometry.

---

## `shared/constants.ts`

Cross-cutting tuning, no logic.

- **`FADE_MS`** — Step-transition fade duration; the step advance is held this
  long so the outgoing handle fades before the next one fades in. Shared by
  `useFade` and `ProofScene`'s advance timer.
- **`COMMIT`** — The morph progress (0..1) at which a drag step locks in.
- **`SEAT_EPS`** — How close to its seat a dropped piece counts as arrived.
- **`clamp01(x)`** — Clamps to `[0, 1]`. Used by handle `project` functions to
  turn a constrained drag position into progress.

## `shared/scene-hooks.ts`

Reusable react-three-fiber hooks. All are generic (no proof-specific knowledge);
the domain constants stay in the scenes.

- **`useFade(ref, goal, opaqueWhenDone?)`** — Eases a material's `opacity` toward
  `goal` at a fixed rate (`FADE_S` to cross the full 0..1 range). Materials start
  at `opacity: 0`, so they fade in on mount and fade out when `goal` becomes 0.
  For `opaqueWhenDone`, see the constraints section above.
- **`useGrabCursor(enabled)`** — Manages the canvas cursor: `grab` while hovering
  a live draggable, `grabbing` while dragging. Resets on pointer release and on
  unmount (so a mid-drag commit that unmounts the handle never leaves the cursor
  stuck). Returns `{ onHover, onDragStart }` to wire into `DragControls`.
- **`useDepthSort(ref, localPoint)`** — Each frame, sets the mesh's `renderOrder`
  from the distance between a chosen local reference point and the camera, so the
  nearer of several interpenetrating translucent meshes draws last (on top). With
  `depthWrite` off this yields correct blending from any angle. Used by the cone
  proof, whose three pyramids genuinely interpenetrate; the sphere proof needs
  none of it, having exactly one opaque body.
- **`useOrbitAutoEnable()`** — Re-enables the default `OrbitControls` on the next
  pointer release. Works around commits that unmount the active `DragControls`
  before its drag-end fires (which would otherwise leave orbit stuck off), while
  preventing the camera from hijacking the still-held pointer at commit time.
- **`useOrbitFraming(targetY, targetDist)`** — Eases the orbit pivot height and
  camera distance toward a target, preserving the user's current view direction.
  Seeds from the actual camera on the first frame and re-arms whenever the target
  changes. Distances must stay within the scene's `OrbitControls`
  `minDistance`/`maxDistance`, which re-clamp on `update()`.

## `shared/materials.tsx`

- **Colour constants** — `SOLID_COLOR` (the piece the reader reshapes),
  `PIECE_A_COLOR` / `PIECE_B_COLOR` (the pieces added on top of it afterwards),
  plus `FILL_OPACITY` and `HANDLE_OPACITY`. The A/B pair names the palette, not an
  order: the cone proof uses them in sequence, the sphere proof uses B for its
  sphere and A for its cap. The cage and handle colours stay private to the two
  material components below, since nothing else needs to name them.
- **`HandleMaterial({ matRef })`** — The shared look for every draggable handle: a
  warm glow, starting invisible so `useFade` can bring it in.
- **`FillMaterial({ color, opacity, matRef? })`** — The shared translucent fill
  (`transparent`, `DoubleSide`, `depthWrite={false}`).
- **`CageLines({ geometry, opacity?, matRef? })`** — Every wireframe in both scenes:
  cages, cube edges, pyramid outlines. It owns the `lineSegments` as well as the
  material, because the `renderOrder` and the `depthWrite: false` only work as a
  pair — see the constraints section, where both are load-bearing rather than
  cosmetic. Pass `opacity` only for a wireframe that fades in.

## `shared/handles.tsx`

The three draggable affordances, plus the ring's torus geometry, which lives here
because it carries no knowledge of either proof and its grab threshold is tied to
the tube radius.

- **`MorphHandle({ initial, project, onCommit, fadingOut })`** — A draggable
  sphere confined to a horizontal plane. `DragControls` with `autoTransform` off;
  `project` maps the raw drag-plane point to a constrained handle position and
  returns `[0,1]` progress, which is where each step's motion lock lives. Commits
  once progress crosses `COMMIT`; fades in on mount and out on `fadingOut`.
- **`RingHandle({ y, maxRadius, onProgress, onCommit, fadingOut })`** — A torus in
  a horizontal plane, centred on the y axis, whose *radius* is what gets dragged
  rather than its position. Collapses to a small knot on the axis at progress 0
  and opens to `maxRadius` at 1, reporting progress through `onProgress` and
  committing at `COMMIT`. Grabbing the collapsed knot falls back to plain distance
  dragged, since within a tube radius of the axis there is no meaningful radial
  direction to measure against. Its geometry rebuilds in place as the ring grows,
  and recomputes its bounding sphere each time — it is a drag target that changes
  size, and stale bounds make the raycast miss.
- **`DropSolid({ seat, stageHeight, quaternion?, active, onSeated, children })`**
  — A rigid piece the reader drags straight down into its slot. Starts
  `stageHeight` above `seat`, is pinned to that vertical line by `dragLimits`,
  snaps and calls `onSeated` on arrival, and is only draggable while `active`. It
  owns the drag only; `children` supply the body, so each scene keeps its own
  fill, wireframe, fade and depth-sort. It re-pins to the seat on *every* drag
  frame after arriving, not just the first: `DragControls` keeps writing the
  pointer's position into the matrix until the pointer is released, and the step
  stays live for one `FADE_MS` after `onSeated`, so a single snap would leave the
  piece hanging up to `SEAT_EPS` short of its slot depending on where the pointer
  stopped.

## `shared/proof-scene.tsx`

- **`StepState`** — `{ currentStep, committing, onAdvance }`, what a scene needs
  from the step machine.
- **`ProofScene({ captions, doneCaption, camera, className, children })`** — The
  shell both scenes share: the `<Canvas>`, the step-dot row, the caption, and the
  Reset button, plus the step state machine (`currentStep`, `committing`, reset
  `nonce`) driving them. `advance` sets `committing` and delays the actual step
  bump by `FADE_MS` so transitions cross-fade. `children` is a render prop taking
  `StepState`, so the scene contents mount inside the canvas. The step count is
  `captions.length`; reaching it means the proof is complete.

---

## `cone/geometry.ts`

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

## `cone/captions.ts`

The instruction text for each step (`STEP_CAPTIONS`), the count derived from it
(`STEP_COUNT`, used by `framingFor`), and the closing line (`DONE_CAPTION`).

## `cone/volume-of-cone-scene.tsx`

Top-of-file constants cover `EDGE_R` (where the step-1 handle rests, given the
area-preserving enlargement of the circle) and `LOCAL_SORT_CORNER` (the
per-pyramid depth-sort reference point — the cube corner each pyramid fills,
which in local space is straight down from the apex).

- **`framingFor(step)`** — Orbit pivot height + camera distance preset per step:
  pull in on the cone (step 1), pull out and raise the pivot for the drops
  (steps 3–4), recentre on the cube once complete.
- **`PyramidBody({ geometry, edges, color, fadeIn? })`** — A rigid pyramid body:
  translucent fill plus wireframe, depth-sorted per view. The dropped copies fade
  in on mount; the corner pyramid passes `fadeIn={false}`, since it takes over
  from the morphing solid at full opacity in the same frame.
- **`Scene(StepState)`** — Everything inside the canvas: lights, `OrbitControls`,
  the morphing solid + cage (steps 1–2) or the rigid corner pyramid (steps 3–4),
  the pyramid edge wireframes, the active handle, and the two `DropSolid` copies.
  Owns the live morph refs (`squareness`, `apex`) driven imperatively in a
  `useFrame`, the chosen apex corner state, and the memoized geometries and
  quaternions. Wires in `useOrbitAutoEnable` and `useOrbitFraming`.
- **`VolumeOfConeScene({ className })`** *(default export)* — Renders `ProofScene`
  with this proof's captions and camera, and `Scene` as its render prop.

---

## `sphere/geometry.ts`

Pure geometry, built around the one-parameter family described above. Dimension
constants (`RADIUS`, `MID`, `HEIGHT`, `SEG`, `STAGE_HEIGHT`, plus an internal `NY`
for the profile sampling) live at the top, with the angular and polar-angle tables
that keep the per-frame work to one `sqrt` per profile ring and no trigonometry at
all.

- **`createShell(mirrored?)`** — Builds the carved shell as a single revolved
  closed profile — base centre → base rim → outer wall → pinch → cavity → back —
  so one index buffer covers the whole closed surface, base cap included. No
  special case is needed at the base: `inner` is 0 at `φ = 0` for every `t`, so the
  bottom is always the full disc. Three rings are duplicated to keep the creases
  hard; see the constraints section, since sharing them is a real defect rather
  than a cosmetic one. The default starts as the cone (`t = 0`) and is
  the piece the reader morphs; `mirrored` builds the finished cap instead, static
  at `t = 1`, measuring height downward from its flat base so it is anchored on its
  pinch ring and a group at the equator carries it to the cylinder's top.
  Mirroring flips the handedness, so the winding flips with it.
- **`updateShell(geom, t)`** — Rewrites the morphing shell's vertices in place and
  recomputes normals. Deliberately does *not* recompute bounds: the shell's extent
  is identical at every `t` — the base disc already spans the full radius at
  `t = 0` and the pinch already reaches `y = RADIUS` — so they never go stale.
- **`createCage(fromY, toY)`** — The cylinder outline as `LineSegments`: a ring at
  each end plus four verticals, at the same angles the cone proof puts its cube
  edges. Called twice; both halves draw the ring on the equator, which is
  invisible as they share a colour.

## `sphere/captions.ts`

Same shape as the cone proof's: `STEP_CAPTIONS`, `STEP_COUNT`, `DONE_CAPTION`.

## `sphere/volume-of-sphere-scene.tsx`

`SPHERE_RADIUS` is the deliberate hair under `RADIUS` explained in the
constraints section.

- **`framingFor(step)`** — Sits close on the squat half-cylinder for the carve,
  pulls out and raises the pivot for the two drops to make room for the piece
  staged overhead, and recentres on the whole cylinder once complete.
- **`SphereBody()`** — The sphere: the one opaque body in the scene, which is what
  lets the translucent shells blend over it from every angle with no depth sorting
  to arrange. Its latitude bands are deliberately coarser than the cavity's.
- **`CapBody({ geometry })`** — The mirrored shell, translucent like the piece it
  is a copy of, fading in when its step begins.
- **`UpperCage({ geometry })`** — The top half of the cylinder outline, revealed
  only at step 3, when there is finally something up there to bound.
- **`Scene(StepState)`** — Lights, `OrbitControls`, the morphing shell and lower
  cage, then the ring handle and the two `DropSolid` drops as their steps arrive.
  Owns the live `progress` ref the ring handle drives, alongside an `applied` ref
  so an idle frame costs nothing — rebuilding the shell means recomputing normals
  over a few thousand vertices, which is not worth doing when nothing has moved.
  Both drops share one seat vector: the sphere lands there on its centre, the cap
  on its pinch ring.
- **`VolumeOfSphereScene({ className })`** *(default export)* — Renders
  `ProofScene` with this proof's captions and camera, and `Scene` as its render
  prop.
