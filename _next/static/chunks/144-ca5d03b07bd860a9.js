"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[144],{843:(t,e)=>{Object.defineProperty(e,"__esModule",{value:!0}),!function(t,e){for(var i in e)Object.defineProperty(t,i,{enumerable:!0,get:e[i]})}(e,{bindSnapshot:function(){return a},createAsyncLocalStorage:function(){return o},createSnapshot:function(){return r}});let i=Object.defineProperty(Error("Invariant: AsyncLocalStorage accessed in runtime where it is not available"),"__NEXT_ERROR_CODE",{value:"E504",enumerable:!1,configurable:!0});class n{disable(){throw i}getStore(){}run(){throw i}exit(){throw i}enterWith(){throw i}static bind(t){return t}}let s="undefined"!=typeof globalThis&&globalThis.AsyncLocalStorage;function o(){return s?new s:new n}function a(t){return s?s.bind(t):n.bind(t)}function r(){return s?s.snapshot():function(t,...e){return t(...e)}}},1620:(t,e,i)=>{function n(t){let{moduleIds:e}=t;return null}Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"PreloadChunks",{enumerable:!0,get:function(){return n}}),i(1834),i(4175),i(3475),i(3082)},2909:(t,e,i)=>{Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return l}});let n=i(1834),s=i(8210),o=i(6409);function a(t){return{default:t&&"default"in t?t.default:t}}i(1620);let r={loader:()=>Promise.resolve(a(()=>null)),loading:null,ssr:!0},l=function(t){let e={...r,...t},i=(0,s.lazy)(()=>e.loader().then(a)),l=e.loading;function h(t){let a=l?(0,n.jsx)(l,{isLoading:!0,pastDelay:!0,error:null}):null,r=!e.ssr||!!e.loading,h=r?s.Suspense:s.Fragment,d=e.ssr?(0,n.jsxs)(n.Fragment,{children:[null,(0,n.jsx)(i,{...t})]}):(0,n.jsx)(o.BailoutToCSR,{reason:"next/dynamic",children:(0,n.jsx)(i,{...t})});return(0,n.jsx)(h,{...r?{fallback:a}:{},children:d})}return h.displayName="LoadableComponent",h}},3018:(t,e,i)=>{let n,s;i.d(e,{X:()=>P});var o=i(4193),a=i(6840),r=i(7343);let l=new o.IUQ,h=new o.Pq0,d=new o.Pq0,c=new o.IUQ,u=new o.IUQ,p=new o.IUQ,m=new o.Pq0,f=new o.kn4,_=new o.cZY,y=new o.Pq0,v=new o.NRn,g=new o.iyt,b=new o.IUQ;function w(t,e,i){return b.set(0,0,-e,1).applyMatrix4(t.projectionMatrix),b.multiplyScalar(1/b.w),b.x=s/i.width,b.y=s/i.height,b.applyMatrix4(t.projectionMatrixInverse),b.multiplyScalar(1/b.w),Math.abs(Math.max(b.x,b.y))}class S extends o.eaF{constructor(t=new a.n,e=new r.G({color:0xffffff*Math.random()})){super(t,e),this.isLineSegments2=!0,this.type="LineSegments2"}computeLineDistances(){let t=this.geometry,e=t.attributes.instanceStart,i=t.attributes.instanceEnd,n=new Float32Array(2*e.count);for(let t=0,s=0,o=e.count;t<o;t++,s+=2)h.fromBufferAttribute(e,t),d.fromBufferAttribute(i,t),n[s]=0===s?0:n[s-1],n[s+1]=n[s]+h.distanceTo(d);let s=new o.LuO(n,2,1);return t.setAttribute("instanceDistanceStart",new o.eHs(s,1,0)),t.setAttribute("instanceDistanceEnd",new o.eHs(s,1,1)),this}raycast(t,e){let i,a,r=this.material.worldUnits,l=t.camera;null!==l||r||console.error('LineSegments2: "Raycaster.camera" needs to be set in order to raycast against LineSegments2 while worldUnits is set to false.');let h=void 0!==t.params.Line2&&t.params.Line2.threshold||0;n=t.ray;let d=this.matrixWorld,b=this.geometry,S=this.material;if(s=S.linewidth+h,null===b.boundingSphere&&b.computeBoundingSphere(),g.copy(b.boundingSphere).applyMatrix4(d),r)i=.5*s;else{let t=Math.max(l.near,g.distanceToPoint(n.origin));i=w(l,t,S.resolution)}if(g.radius+=i,!1!==n.intersectsSphere(g)){if(null===b.boundingBox&&b.computeBoundingBox(),v.copy(b.boundingBox).applyMatrix4(d),r)a=.5*s;else{let t=Math.max(l.near,v.distanceToPoint(n.origin));a=w(l,t,S.resolution)}v.expandByScalar(a),!1!==n.intersectsBox(v)&&(r?function(t,e){let i=t.matrixWorld,a=t.geometry,r=a.attributes.instanceStart,l=a.attributes.instanceEnd,h=Math.min(a.instanceCount,r.count);for(let a=0;a<h;a++){_.start.fromBufferAttribute(r,a),_.end.fromBufferAttribute(l,a),_.applyMatrix4(i);let h=new o.Pq0,d=new o.Pq0;n.distanceSqToSegment(_.start,_.end,d,h),d.distanceTo(h)<.5*s&&e.push({point:d,pointOnLine:h,distance:n.origin.distanceTo(d),object:t,face:null,faceIndex:a,uv:null,uv1:null})}}(this,e):function(t,e,i){let a=e.projectionMatrix,r=t.material.resolution,l=t.matrixWorld,h=t.geometry,d=h.attributes.instanceStart,v=h.attributes.instanceEnd,g=Math.min(h.instanceCount,d.count),b=-e.near;n.at(1,p),p.w=1,p.applyMatrix4(e.matrixWorldInverse),p.applyMatrix4(a),p.multiplyScalar(1/p.w),p.x*=r.x/2,p.y*=r.y/2,p.z=0,m.copy(p),f.multiplyMatrices(e.matrixWorldInverse,l);for(let e=0;e<g;e++){if(c.fromBufferAttribute(d,e),u.fromBufferAttribute(v,e),c.w=1,u.w=1,c.applyMatrix4(f),u.applyMatrix4(f),c.z>b&&u.z>b)continue;if(c.z>b){let t=c.z-u.z,e=(c.z-b)/t;c.lerp(u,e)}else if(u.z>b){let t=u.z-c.z,e=(u.z-b)/t;u.lerp(c,e)}c.applyMatrix4(a),u.applyMatrix4(a),c.multiplyScalar(1/c.w),u.multiplyScalar(1/u.w),c.x*=r.x/2,c.y*=r.y/2,u.x*=r.x/2,u.y*=r.y/2,_.start.copy(c),_.start.z=0,_.end.copy(u),_.end.z=0;let h=_.closestPointToPointParameter(m,!0);_.at(h,y);let p=o.cj9.lerp(c.z,u.z,h),g=p>=-1&&p<=1,w=m.distanceTo(y)<.5*s;if(g&&w){_.start.fromBufferAttribute(d,e),_.end.fromBufferAttribute(v,e),_.start.applyMatrix4(l),_.end.applyMatrix4(l);let s=new o.Pq0,a=new o.Pq0;n.distanceSqToSegment(_.start,_.end,a,s),i.push({point:a,pointOnLine:s,distance:n.origin.distanceTo(a),object:t,face:null,faceIndex:e,uv:null,uv1:null})}}}(this,l,e))}}onBeforeRender(t){let e=this.material.uniforms;e&&e.resolution&&(t.getViewport(l),this.material.uniforms.resolution.value.set(l.z,l.w))}}var E=i(3434);class P extends S{constructor(t=new E.v,e=new r.G({color:0xffffff*Math.random()})){super(t,e),this.isLine2=!0,this.type="Line2"}}},3115:(t,e,i)=>{i.d(e,{N:()=>p});var n=i(4193);let s={type:"change"},o={type:"start"},a={type:"end"},r=new n.RlV,l=new n.Zcv,h=Math.cos(70*n.cj9.DEG2RAD),d=new n.Pq0,c=2*Math.PI,u={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6};class p extends n.H2z{constructor(t,e=null){super(t,e),this.state=u.NONE,this.target=new n.Pq0,this.cursor=new n.Pq0,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.keyRotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:n.kBv.ROTATE,MIDDLE:n.kBv.DOLLY,RIGHT:n.kBv.PAN},this.touches={ONE:n.wtR.ROTATE,TWO:n.wtR.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._domElementKeyEvents=null,this._lastPosition=new n.Pq0,this._lastQuaternion=new n.PTz,this._lastTargetPosition=new n.Pq0,this._quat=new n.PTz().setFromUnitVectors(t.up,new n.Pq0(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new n.YHV,this._sphericalDelta=new n.YHV,this._scale=1,this._panOffset=new n.Pq0,this._rotateStart=new n.I9Y,this._rotateEnd=new n.I9Y,this._rotateDelta=new n.I9Y,this._panStart=new n.I9Y,this._panEnd=new n.I9Y,this._panDelta=new n.I9Y,this._dollyStart=new n.I9Y,this._dollyEnd=new n.I9Y,this._dollyDelta=new n.I9Y,this._dollyDirection=new n.Pq0,this._mouse=new n.I9Y,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=f.bind(this),this._onPointerDown=m.bind(this),this._onPointerUp=_.bind(this),this._onContextMenu=E.bind(this),this._onMouseWheel=g.bind(this),this._onKeyDown=b.bind(this),this._onTouchStart=w.bind(this),this._onTouchMove=S.bind(this),this._onMouseDown=y.bind(this),this._onMouseMove=v.bind(this),this._interceptControlDown=P.bind(this),this._interceptControlUp=x.bind(this),null!==this.domElement&&this.connect(this.domElement),this.update()}connect(t){super.connect(t),this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents(),this.domElement.getRootNode().removeEventListener("keydown",this._interceptControlDown,{capture:!0}),this.domElement.style.touchAction="auto"}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(t){t.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=t}stopListenToKeyEvents(){null!==this._domElementKeyEvents&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(s),this.update(),this.state=u.NONE}update(t=null){let e=this.object.position;d.copy(e).sub(this.target),d.applyQuaternion(this._quat),this._spherical.setFromVector3(d),this.autoRotate&&this.state===u.NONE&&this._rotateLeft(this._getAutoRotationAngle(t)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let i=this.minAzimuthAngle,o=this.maxAzimuthAngle;isFinite(i)&&isFinite(o)&&(i<-Math.PI?i+=c:i>Math.PI&&(i-=c),o<-Math.PI?o+=c:o>Math.PI&&(o-=c),i<=o?this._spherical.theta=Math.max(i,Math.min(o,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(i+o)/2?Math.max(i,this._spherical.theta):Math.min(o,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),!0===this.enableDamping?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let a=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{let t=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),a=t!=this._spherical.radius}if(d.setFromSpherical(this._spherical),d.applyQuaternion(this._quatInverse),e.copy(this.target).add(d),this.object.lookAt(this.target),!0===this.enableDamping?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let t=null;if(this.object.isPerspectiveCamera){let e=d.length();t=this._clampDistance(e*this._scale);let i=e-t;this.object.position.addScaledVector(this._dollyDirection,i),this.object.updateMatrixWorld(),a=!!i}else if(this.object.isOrthographicCamera){let e=new n.Pq0(this._mouse.x,this._mouse.y,0);e.unproject(this.object);let i=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),a=i!==this.object.zoom;let s=new n.Pq0(this._mouse.x,this._mouse.y,0);s.unproject(this.object),this.object.position.sub(s).add(e),this.object.updateMatrixWorld(),t=d.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;null!==t&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(t).add(this.object.position):(r.origin.copy(this.object.position),r.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(r.direction))<h?this.object.lookAt(this.target):(l.setFromNormalAndCoplanarPoint(this.object.up,this.target),r.intersectPlane(l,this.target))))}else if(this.object.isOrthographicCamera){let t=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),t!==this.object.zoom&&(this.object.updateProjectionMatrix(),a=!0)}return this._scale=1,this._performCursorZoom=!1,!!(a||this._lastPosition.distanceToSquared(this.object.position)>1e-6||8*(1-this._lastQuaternion.dot(this.object.quaternion))>1e-6||this._lastTargetPosition.distanceToSquared(this.target)>1e-6)&&(this.dispatchEvent(s),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0)}_getAutoRotationAngle(t){return null!==t?c/60*this.autoRotateSpeed*t:c/60/60*this.autoRotateSpeed}_getZoomScale(t){let e=Math.abs(.01*t);return Math.pow(.95,this.zoomSpeed*e)}_rotateLeft(t){this._sphericalDelta.theta-=t}_rotateUp(t){this._sphericalDelta.phi-=t}_panLeft(t,e){d.setFromMatrixColumn(e,0),d.multiplyScalar(-t),this._panOffset.add(d)}_panUp(t,e){!0===this.screenSpacePanning?d.setFromMatrixColumn(e,1):(d.setFromMatrixColumn(e,0),d.crossVectors(this.object.up,d)),d.multiplyScalar(t),this._panOffset.add(d)}_pan(t,e){let i=this.domElement;if(this.object.isPerspectiveCamera){let n=this.object.position;d.copy(n).sub(this.target);let s=d.length();s*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*t*s/i.clientHeight,this.object.matrix),this._panUp(2*e*s/i.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(t*(this.object.right-this.object.left)/this.object.zoom/i.clientWidth,this.object.matrix),this._panUp(e*(this.object.top-this.object.bottom)/this.object.zoom/i.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(t){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=t:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(t){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=t:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(t,e){if(!this.zoomToCursor)return;this._performCursorZoom=!0;let i=this.domElement.getBoundingClientRect(),n=t-i.left,s=e-i.top,o=i.width,a=i.height;this._mouse.x=n/o*2-1,this._mouse.y=-(s/a*2)+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(t){return Math.max(this.minDistance,Math.min(this.maxDistance,t))}_handleMouseDownRotate(t){this._rotateStart.set(t.clientX,t.clientY)}_handleMouseDownDolly(t){this._updateZoomParameters(t.clientX,t.clientX),this._dollyStart.set(t.clientX,t.clientY)}_handleMouseDownPan(t){this._panStart.set(t.clientX,t.clientY)}_handleMouseMoveRotate(t){this._rotateEnd.set(t.clientX,t.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);let e=this.domElement;this._rotateLeft(c*this._rotateDelta.x/e.clientHeight),this._rotateUp(c*this._rotateDelta.y/e.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(t){this._dollyEnd.set(t.clientX,t.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(t){this._panEnd.set(t.clientX,t.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(t){this._updateZoomParameters(t.clientX,t.clientY),t.deltaY<0?this._dollyIn(this._getZoomScale(t.deltaY)):t.deltaY>0&&this._dollyOut(this._getZoomScale(t.deltaY)),this.update()}_handleKeyDown(t){let e=!1;switch(t.code){case this.keys.UP:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateUp(c*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,this.keyPanSpeed),e=!0;break;case this.keys.BOTTOM:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateUp(-c*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,-this.keyPanSpeed),e=!0;break;case this.keys.LEFT:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateLeft(c*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(this.keyPanSpeed,0),e=!0;break;case this.keys.RIGHT:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateLeft(-c*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(-this.keyPanSpeed,0),e=!0}e&&(t.preventDefault(),this.update())}_handleTouchStartRotate(t){if(1===this._pointers.length)this._rotateStart.set(t.pageX,t.pageY);else{let e=this._getSecondPointerPosition(t),i=.5*(t.pageX+e.x),n=.5*(t.pageY+e.y);this._rotateStart.set(i,n)}}_handleTouchStartPan(t){if(1===this._pointers.length)this._panStart.set(t.pageX,t.pageY);else{let e=this._getSecondPointerPosition(t),i=.5*(t.pageX+e.x),n=.5*(t.pageY+e.y);this._panStart.set(i,n)}}_handleTouchStartDolly(t){let e=this._getSecondPointerPosition(t),i=t.pageX-e.x,n=t.pageY-e.y,s=Math.sqrt(i*i+n*n);this._dollyStart.set(0,s)}_handleTouchStartDollyPan(t){this.enableZoom&&this._handleTouchStartDolly(t),this.enablePan&&this._handleTouchStartPan(t)}_handleTouchStartDollyRotate(t){this.enableZoom&&this._handleTouchStartDolly(t),this.enableRotate&&this._handleTouchStartRotate(t)}_handleTouchMoveRotate(t){if(1==this._pointers.length)this._rotateEnd.set(t.pageX,t.pageY);else{let e=this._getSecondPointerPosition(t),i=.5*(t.pageX+e.x),n=.5*(t.pageY+e.y);this._rotateEnd.set(i,n)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);let e=this.domElement;this._rotateLeft(c*this._rotateDelta.x/e.clientHeight),this._rotateUp(c*this._rotateDelta.y/e.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(t){if(1===this._pointers.length)this._panEnd.set(t.pageX,t.pageY);else{let e=this._getSecondPointerPosition(t),i=.5*(t.pageX+e.x),n=.5*(t.pageY+e.y);this._panEnd.set(i,n)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(t){let e=this._getSecondPointerPosition(t),i=t.pageX-e.x,n=t.pageY-e.y,s=Math.sqrt(i*i+n*n);this._dollyEnd.set(0,s),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);let o=(t.pageX+e.x)*.5,a=(t.pageY+e.y)*.5;this._updateZoomParameters(o,a)}_handleTouchMoveDollyPan(t){this.enableZoom&&this._handleTouchMoveDolly(t),this.enablePan&&this._handleTouchMovePan(t)}_handleTouchMoveDollyRotate(t){this.enableZoom&&this._handleTouchMoveDolly(t),this.enableRotate&&this._handleTouchMoveRotate(t)}_addPointer(t){this._pointers.push(t.pointerId)}_removePointer(t){delete this._pointerPositions[t.pointerId];for(let e=0;e<this._pointers.length;e++)if(this._pointers[e]==t.pointerId)return void this._pointers.splice(e,1)}_isTrackingPointer(t){for(let e=0;e<this._pointers.length;e++)if(this._pointers[e]==t.pointerId)return!0;return!1}_trackPointer(t){let e=this._pointerPositions[t.pointerId];void 0===e&&(e=new n.I9Y,this._pointerPositions[t.pointerId]=e),e.set(t.pageX,t.pageY)}_getSecondPointerPosition(t){let e=t.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[e]}_customWheelEvent(t){let e=t.deltaMode,i={clientX:t.clientX,clientY:t.clientY,deltaY:t.deltaY};switch(e){case 1:i.deltaY*=16;break;case 2:i.deltaY*=100}return t.ctrlKey&&!this._controlActive&&(i.deltaY*=10),i}}function m(t){!1!==this.enabled&&(0===this._pointers.length&&(this.domElement.setPointerCapture(t.pointerId),this.domElement.addEventListener("pointermove",this._onPointerMove),this.domElement.addEventListener("pointerup",this._onPointerUp)),this._isTrackingPointer(t)||(this._addPointer(t),"touch"===t.pointerType?this._onTouchStart(t):this._onMouseDown(t)))}function f(t){!1!==this.enabled&&("touch"===t.pointerType?this._onTouchMove(t):this._onMouseMove(t))}function _(t){switch(this._removePointer(t),this._pointers.length){case 0:this.domElement.releasePointerCapture(t.pointerId),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(a),this.state=u.NONE;break;case 1:let e=this._pointers[0],i=this._pointerPositions[e];this._onTouchStart({pointerId:e,pageX:i.x,pageY:i.y})}}function y(t){let e;switch(t.button){case 0:e=this.mouseButtons.LEFT;break;case 1:e=this.mouseButtons.MIDDLE;break;case 2:e=this.mouseButtons.RIGHT;break;default:e=-1}switch(e){case n.kBv.DOLLY:if(!1===this.enableZoom)return;this._handleMouseDownDolly(t),this.state=u.DOLLY;break;case n.kBv.ROTATE:if(t.ctrlKey||t.metaKey||t.shiftKey){if(!1===this.enablePan)return;this._handleMouseDownPan(t),this.state=u.PAN}else{if(!1===this.enableRotate)return;this._handleMouseDownRotate(t),this.state=u.ROTATE}break;case n.kBv.PAN:if(t.ctrlKey||t.metaKey||t.shiftKey){if(!1===this.enableRotate)return;this._handleMouseDownRotate(t),this.state=u.ROTATE}else{if(!1===this.enablePan)return;this._handleMouseDownPan(t),this.state=u.PAN}break;default:this.state=u.NONE}this.state!==u.NONE&&this.dispatchEvent(o)}function v(t){switch(this.state){case u.ROTATE:if(!1===this.enableRotate)return;this._handleMouseMoveRotate(t);break;case u.DOLLY:if(!1===this.enableZoom)return;this._handleMouseMoveDolly(t);break;case u.PAN:if(!1===this.enablePan)return;this._handleMouseMovePan(t)}}function g(t){!1!==this.enabled&&!1!==this.enableZoom&&this.state===u.NONE&&(t.preventDefault(),this.dispatchEvent(o),this._handleMouseWheel(this._customWheelEvent(t)),this.dispatchEvent(a))}function b(t){!1!==this.enabled&&this._handleKeyDown(t)}function w(t){switch(this._trackPointer(t),this._pointers.length){case 1:switch(this.touches.ONE){case n.wtR.ROTATE:if(!1===this.enableRotate)return;this._handleTouchStartRotate(t),this.state=u.TOUCH_ROTATE;break;case n.wtR.PAN:if(!1===this.enablePan)return;this._handleTouchStartPan(t),this.state=u.TOUCH_PAN;break;default:this.state=u.NONE}break;case 2:switch(this.touches.TWO){case n.wtR.DOLLY_PAN:if(!1===this.enableZoom&&!1===this.enablePan)return;this._handleTouchStartDollyPan(t),this.state=u.TOUCH_DOLLY_PAN;break;case n.wtR.DOLLY_ROTATE:if(!1===this.enableZoom&&!1===this.enableRotate)return;this._handleTouchStartDollyRotate(t),this.state=u.TOUCH_DOLLY_ROTATE;break;default:this.state=u.NONE}break;default:this.state=u.NONE}this.state!==u.NONE&&this.dispatchEvent(o)}function S(t){switch(this._trackPointer(t),this.state){case u.TOUCH_ROTATE:if(!1===this.enableRotate)return;this._handleTouchMoveRotate(t),this.update();break;case u.TOUCH_PAN:if(!1===this.enablePan)return;this._handleTouchMovePan(t),this.update();break;case u.TOUCH_DOLLY_PAN:if(!1===this.enableZoom&&!1===this.enablePan)return;this._handleTouchMoveDollyPan(t),this.update();break;case u.TOUCH_DOLLY_ROTATE:if(!1===this.enableZoom&&!1===this.enableRotate)return;this._handleTouchMoveDollyRotate(t),this.update();break;default:this.state=u.NONE}}function E(t){!1!==this.enabled&&t.preventDefault()}function P(t){"Control"===t.key&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function x(t){"Control"===t.key&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}},3434:(t,e,i)=>{i.d(e,{v:()=>s});var n=i(6840);class s extends n.n{constructor(){super(),this.isLineGeometry=!0,this.type="LineGeometry"}setPositions(t){let e=t.length-3,i=new Float32Array(2*e);for(let n=0;n<e;n+=3)i[2*n]=t[n],i[2*n+1]=t[n+1],i[2*n+2]=t[n+2],i[2*n+3]=t[n+3],i[2*n+4]=t[n+4],i[2*n+5]=t[n+5];return super.setPositions(i),this}setColors(t){let e=t.length-3,i=new Float32Array(2*e);for(let n=0;n<e;n+=3)i[2*n]=t[n],i[2*n+1]=t[n+1],i[2*n+2]=t[n+2],i[2*n+3]=t[n+3],i[2*n+4]=t[n+4],i[2*n+5]=t[n+5];return super.setColors(i),this}setFromPoints(t){let e=t.length-1,i=new Float32Array(6*e);for(let n=0;n<e;n++)i[6*n]=t[n].x,i[6*n+1]=t[n].y,i[6*n+2]=t[n].z||0,i[6*n+3]=t[n+1].x,i[6*n+4]=t[n+1].y,i[6*n+5]=t[n+1].z||0;return super.setPositions(i),this}fromLine(t){let e=t.geometry;return this.setPositions(e.attributes.position.array),this}}},3475:(t,e,i)=>{Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"workAsyncStorage",{enumerable:!0,get:function(){return n.workAsyncStorageInstance}});let n=i(6269)},5290:(t,e,i)=>{Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return s}});let n=i(5679)._(i(2909));function s(t,e){var i;let s={};"function"==typeof t&&(s.loader=t);let o={...s,...e};return(0,n.default)({...o,modules:null==(i=o.loadableGenerated)?void 0:i.modules})}("function"==typeof e.default||"object"==typeof e.default&&null!==e.default)&&void 0===e.default.__esModule&&(Object.defineProperty(e.default,"__esModule",{value:!0}),Object.assign(e.default,e),t.exports=e.default)},6145:(t,e,i)=>{i.d(e,{default:()=>s.a});var n=i(5290),s=i.n(n)},6269:(t,e,i)=>{Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"workAsyncStorageInstance",{enumerable:!0,get:function(){return n}});let n=(0,i(843).createAsyncLocalStorage)()},6409:(t,e,i)=>{function n(t){let{reason:e,children:i}=t;return i}Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"BailoutToCSR",{enumerable:!0,get:function(){return n}}),i(1181)},6840:(t,e,i)=>{i.d(e,{n:()=>a});var n=i(4193);let s=new n.NRn,o=new n.Pq0;class a extends n.CmU{constructor(){super(),this.isLineSegmentsGeometry=!0,this.type="LineSegmentsGeometry",this.setIndex([0,2,1,2,3,1,2,4,3,4,5,3,4,6,5,6,7,5]),this.setAttribute("position",new n.qtW([-1,2,0,1,2,0,-1,1,0,1,1,0,-1,0,0,1,0,0,-1,-1,0,1,-1,0],3)),this.setAttribute("uv",new n.qtW([-1,2,1,2,-1,1,1,1,-1,-1,1,-1,-1,-2,1,-2],2))}applyMatrix4(t){let e=this.attributes.instanceStart,i=this.attributes.instanceEnd;return void 0!==e&&(e.applyMatrix4(t),i.applyMatrix4(t),e.needsUpdate=!0),null!==this.boundingBox&&this.computeBoundingBox(),null!==this.boundingSphere&&this.computeBoundingSphere(),this}setPositions(t){let e;t instanceof Float32Array?e=t:Array.isArray(t)&&(e=new Float32Array(t));let i=new n.LuO(e,6,1);return this.setAttribute("instanceStart",new n.eHs(i,3,0)),this.setAttribute("instanceEnd",new n.eHs(i,3,3)),this.instanceCount=this.attributes.instanceStart.count,this.computeBoundingBox(),this.computeBoundingSphere(),this}setColors(t){let e;t instanceof Float32Array?e=t:Array.isArray(t)&&(e=new Float32Array(t));let i=new n.LuO(e,6,1);return this.setAttribute("instanceColorStart",new n.eHs(i,3,0)),this.setAttribute("instanceColorEnd",new n.eHs(i,3,3)),this}fromWireframeGeometry(t){return this.setPositions(t.attributes.position.array),this}fromEdgesGeometry(t){return this.setPositions(t.attributes.position.array),this}fromMesh(t){return this.fromWireframeGeometry(new n.XJ7(t.geometry)),this}fromLineSegments(t){let e=t.geometry;return this.setPositions(e.attributes.position.array),this}computeBoundingBox(){null===this.boundingBox&&(this.boundingBox=new n.NRn);let t=this.attributes.instanceStart,e=this.attributes.instanceEnd;void 0!==t&&void 0!==e&&(this.boundingBox.setFromBufferAttribute(t),s.setFromBufferAttribute(e),this.boundingBox.union(s))}computeBoundingSphere(){null===this.boundingSphere&&(this.boundingSphere=new n.iyt),null===this.boundingBox&&this.computeBoundingBox();let t=this.attributes.instanceStart,e=this.attributes.instanceEnd;if(void 0!==t&&void 0!==e){let i=this.boundingSphere.center;this.boundingBox.getCenter(i);let n=0;for(let s=0,a=t.count;s<a;s++)o.fromBufferAttribute(t,s),n=Math.max(n,i.distanceToSquared(o)),o.fromBufferAttribute(e,s),n=Math.max(n,i.distanceToSquared(o));this.boundingSphere.radius=Math.sqrt(n),isNaN(this.boundingSphere.radius)&&console.error("THREE.LineSegmentsGeometry.computeBoundingSphere(): Computed radius is NaN. The instanced position data is likely to have NaN values.",this)}}toJSON(){}}},7343:(t,e,i)=>{i.d(e,{G:()=>o});var n=i(9578),s=i(4193);n.fCn.line={worldUnits:{value:1},linewidth:{value:1},resolution:{value:new s.I9Y(1,1)},dashOffset:{value:0},dashScale:{value:1},dashSize:{value:1},gapSize:{value:1}},n.zkh.line={uniforms:s.LlO.merge([n.fCn.common,n.fCn.fog,n.fCn.line]),vertexShader:`
		#include <common>
		#include <color_pars_vertex>
		#include <fog_pars_vertex>
		#include <logdepthbuf_pars_vertex>
		#include <clipping_planes_pars_vertex>

		uniform float linewidth;
		uniform vec2 resolution;

		attribute vec3 instanceStart;
		attribute vec3 instanceEnd;

		attribute vec3 instanceColorStart;
		attribute vec3 instanceColorEnd;

		#ifdef WORLD_UNITS

			varying vec4 worldPos;
			varying vec3 worldStart;
			varying vec3 worldEnd;

			#ifdef USE_DASH

				varying vec2 vUv;

			#endif

		#else

			varying vec2 vUv;

		#endif

		#ifdef USE_DASH

			uniform float dashScale;
			attribute float instanceDistanceStart;
			attribute float instanceDistanceEnd;
			varying float vLineDistance;

		#endif

		void trimSegment( const in vec4 start, inout vec4 end ) {

			// trim end segment so it terminates between the camera plane and the near plane

			// conservative estimate of the near plane
			float a = projectionMatrix[ 2 ][ 2 ]; // 3nd entry in 3th column
			float b = projectionMatrix[ 3 ][ 2 ]; // 3nd entry in 4th column
			float nearEstimate = - 0.5 * b / a;

			float alpha = ( nearEstimate - start.z ) / ( end.z - start.z );

			end.xyz = mix( start.xyz, end.xyz, alpha );

		}

		void main() {

			#ifdef USE_COLOR

				vColor.xyz = ( position.y < 0.5 ) ? instanceColorStart : instanceColorEnd;

			#endif

			#ifdef USE_DASH

				vLineDistance = ( position.y < 0.5 ) ? dashScale * instanceDistanceStart : dashScale * instanceDistanceEnd;
				vUv = uv;

			#endif

			float aspect = resolution.x / resolution.y;

			// camera space
			vec4 start = modelViewMatrix * vec4( instanceStart, 1.0 );
			vec4 end = modelViewMatrix * vec4( instanceEnd, 1.0 );

			#ifdef WORLD_UNITS

				worldStart = start.xyz;
				worldEnd = end.xyz;

			#else

				vUv = uv;

			#endif

			// special case for perspective projection, and segments that terminate either in, or behind, the camera plane
			// clearly the gpu firmware has a way of addressing this issue when projecting into ndc space
			// but we need to perform ndc-space calculations in the shader, so we must address this issue directly
			// perhaps there is a more elegant solution -- WestLangley

			bool perspective = ( projectionMatrix[ 2 ][ 3 ] == - 1.0 ); // 4th entry in the 3rd column

			if ( perspective ) {

				if ( start.z < 0.0 && end.z >= 0.0 ) {

					trimSegment( start, end );

				} else if ( end.z < 0.0 && start.z >= 0.0 ) {

					trimSegment( end, start );

				}

			}

			// clip space
			vec4 clipStart = projectionMatrix * start;
			vec4 clipEnd = projectionMatrix * end;

			// ndc space
			vec3 ndcStart = clipStart.xyz / clipStart.w;
			vec3 ndcEnd = clipEnd.xyz / clipEnd.w;

			// direction
			vec2 dir = ndcEnd.xy - ndcStart.xy;

			// account for clip-space aspect ratio
			dir.x *= aspect;
			dir = normalize( dir );

			#ifdef WORLD_UNITS

				vec3 worldDir = normalize( end.xyz - start.xyz );
				vec3 tmpFwd = normalize( mix( start.xyz, end.xyz, 0.5 ) );
				vec3 worldUp = normalize( cross( worldDir, tmpFwd ) );
				vec3 worldFwd = cross( worldDir, worldUp );
				worldPos = position.y < 0.5 ? start: end;

				// height offset
				float hw = linewidth * 0.5;
				worldPos.xyz += position.x < 0.0 ? hw * worldUp : - hw * worldUp;

				// don't extend the line if we're rendering dashes because we
				// won't be rendering the endcaps
				#ifndef USE_DASH

					// cap extension
					worldPos.xyz += position.y < 0.5 ? - hw * worldDir : hw * worldDir;

					// add width to the box
					worldPos.xyz += worldFwd * hw;

					// endcaps
					if ( position.y > 1.0 || position.y < 0.0 ) {

						worldPos.xyz -= worldFwd * 2.0 * hw;

					}

				#endif

				// project the worldpos
				vec4 clip = projectionMatrix * worldPos;

				// shift the depth of the projected points so the line
				// segments overlap neatly
				vec3 clipPose = ( position.y < 0.5 ) ? ndcStart : ndcEnd;
				clip.z = clipPose.z * clip.w;

			#else

				vec2 offset = vec2( dir.y, - dir.x );
				// undo aspect ratio adjustment
				dir.x /= aspect;
				offset.x /= aspect;

				// sign flip
				if ( position.x < 0.0 ) offset *= - 1.0;

				// endcaps
				if ( position.y < 0.0 ) {

					offset += - dir;

				} else if ( position.y > 1.0 ) {

					offset += dir;

				}

				// adjust for linewidth
				offset *= linewidth;

				// adjust for clip-space to screen-space conversion // maybe resolution should be based on viewport ...
				offset /= resolution.y;

				// select end
				vec4 clip = ( position.y < 0.5 ) ? clipStart : clipEnd;

				// back to clip space
				offset *= clip.w;

				clip.xy += offset;

			#endif

			gl_Position = clip;

			vec4 mvPosition = ( position.y < 0.5 ) ? start : end; // this is an approximation

			#include <logdepthbuf_vertex>
			#include <clipping_planes_vertex>
			#include <fog_vertex>

		}
		`,fragmentShader:`
		uniform vec3 diffuse;
		uniform float opacity;
		uniform float linewidth;

		#ifdef USE_DASH

			uniform float dashOffset;
			uniform float dashSize;
			uniform float gapSize;

		#endif

		varying float vLineDistance;

		#ifdef WORLD_UNITS

			varying vec4 worldPos;
			varying vec3 worldStart;
			varying vec3 worldEnd;

			#ifdef USE_DASH

				varying vec2 vUv;

			#endif

		#else

			varying vec2 vUv;

		#endif

		#include <common>
		#include <color_pars_fragment>
		#include <fog_pars_fragment>
		#include <logdepthbuf_pars_fragment>
		#include <clipping_planes_pars_fragment>

		vec2 closestLineToLine(vec3 p1, vec3 p2, vec3 p3, vec3 p4) {

			float mua;
			float mub;

			vec3 p13 = p1 - p3;
			vec3 p43 = p4 - p3;

			vec3 p21 = p2 - p1;

			float d1343 = dot( p13, p43 );
			float d4321 = dot( p43, p21 );
			float d1321 = dot( p13, p21 );
			float d4343 = dot( p43, p43 );
			float d2121 = dot( p21, p21 );

			float denom = d2121 * d4343 - d4321 * d4321;

			float numer = d1343 * d4321 - d1321 * d4343;

			mua = numer / denom;
			mua = clamp( mua, 0.0, 1.0 );
			mub = ( d1343 + d4321 * ( mua ) ) / d4343;
			mub = clamp( mub, 0.0, 1.0 );

			return vec2( mua, mub );

		}

		void main() {

			float alpha = opacity;
			vec4 diffuseColor = vec4( diffuse, alpha );

			#include <clipping_planes_fragment>

			#ifdef USE_DASH

				if ( vUv.y < - 1.0 || vUv.y > 1.0 ) discard; // discard endcaps

				if ( mod( vLineDistance + dashOffset, dashSize + gapSize ) > dashSize ) discard; // todo - FIX

			#endif

			#ifdef WORLD_UNITS

				// Find the closest points on the view ray and the line segment
				vec3 rayEnd = normalize( worldPos.xyz ) * 1e5;
				vec3 lineDir = worldEnd - worldStart;
				vec2 params = closestLineToLine( worldStart, worldEnd, vec3( 0.0, 0.0, 0.0 ), rayEnd );

				vec3 p1 = worldStart + lineDir * params.x;
				vec3 p2 = rayEnd * params.y;
				vec3 delta = p1 - p2;
				float len = length( delta );
				float norm = len / linewidth;

				#ifndef USE_DASH

					#ifdef USE_ALPHA_TO_COVERAGE

						float dnorm = fwidth( norm );
						alpha = 1.0 - smoothstep( 0.5 - dnorm, 0.5 + dnorm, norm );

					#else

						if ( norm > 0.5 ) {

							discard;

						}

					#endif

				#endif

			#else

				#ifdef USE_ALPHA_TO_COVERAGE

					// artifacts appear on some hardware if a derivative is taken within a conditional
					float a = vUv.x;
					float b = ( vUv.y > 0.0 ) ? vUv.y - 1.0 : vUv.y + 1.0;
					float len2 = a * a + b * b;
					float dlen = fwidth( len2 );

					if ( abs( vUv.y ) > 1.0 ) {

						alpha = 1.0 - smoothstep( 1.0 - dlen, 1.0 + dlen, len2 );

					}

				#else

					if ( abs( vUv.y ) > 1.0 ) {

						float a = vUv.x;
						float b = ( vUv.y > 0.0 ) ? vUv.y - 1.0 : vUv.y + 1.0;
						float len2 = a * a + b * b;

						if ( len2 > 1.0 ) discard;

					}

				#endif

			#endif

			#include <logdepthbuf_fragment>
			#include <color_fragment>

			gl_FragColor = vec4( diffuseColor.rgb, alpha );

			#include <tonemapping_fragment>
			#include <colorspace_fragment>
			#include <fog_fragment>
			#include <premultiplied_alpha_fragment>

		}
		`};class o extends s.BKk{constructor(t){super({type:"LineMaterial",uniforms:s.LlO.clone(n.zkh.line.uniforms),vertexShader:n.zkh.line.vertexShader,fragmentShader:n.zkh.line.fragmentShader,clipping:!0}),this.isLineMaterial=!0,this.setValues(t)}get color(){return this.uniforms.diffuse.value}set color(t){this.uniforms.diffuse.value=t}get worldUnits(){return"WORLD_UNITS"in this.defines}set worldUnits(t){!0===t?this.defines.WORLD_UNITS="":delete this.defines.WORLD_UNITS}get linewidth(){return this.uniforms.linewidth.value}set linewidth(t){this.uniforms.linewidth&&(this.uniforms.linewidth.value=t)}get dashed(){return"USE_DASH"in this.defines}set dashed(t){!0===t!==this.dashed&&(this.needsUpdate=!0),!0===t?this.defines.USE_DASH="":delete this.defines.USE_DASH}get dashScale(){return this.uniforms.dashScale.value}set dashScale(t){this.uniforms.dashScale.value=t}get dashSize(){return this.uniforms.dashSize.value}set dashSize(t){this.uniforms.dashSize.value=t}get dashOffset(){return this.uniforms.dashOffset.value}set dashOffset(t){this.uniforms.dashOffset.value=t}get gapSize(){return this.uniforms.gapSize.value}set gapSize(t){this.uniforms.gapSize.value=t}get opacity(){return this.uniforms.opacity.value}set opacity(t){this.uniforms&&(this.uniforms.opacity.value=t)}get resolution(){return this.uniforms.resolution.value}set resolution(t){this.uniforms.resolution.value.copy(t)}get alphaToCoverage(){return"USE_ALPHA_TO_COVERAGE"in this.defines}set alphaToCoverage(t){this.defines&&(!0===t!==this.alphaToCoverage&&(this.needsUpdate=!0),!0===t?this.defines.USE_ALPHA_TO_COVERAGE="":delete this.defines.USE_ALPHA_TO_COVERAGE)}}}}]);