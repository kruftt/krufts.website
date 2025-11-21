"use client"

import { useEffect, useRef, useState } from "react"
import { Switch } from '@/components/quats/switch';
import JsdImage from "../general/jsdelivr-image";


export default function OneDee({ className }: { className?: string }) {
  const modulus = useRef<HTMLInputElement>(null)
  const svg = useRef<SVGSVGElement>(null)
  // const plusMinus = useRef<SwitchProps>(null)
  const [p, setP] = useState(0.01)
  const pm = useRef(true)
  
  function update() {
    const slider_value = parseFloat(modulus.current!.value)
    const total_width = svg.current!.clientWidth
    const max_width = total_width * 0.5
    const arrow_width = Math.round(slider_value * max_width * 0.95)
    svg.current!.setAttribute('viewBox', `-${max_width} 0 ${total_width} 1`)
    setP(pm.current ? arrow_width : -arrow_width)
  }

  function check(c: boolean) {
    pm.current = c
    update()
  }

  useEffect(() => {
    update()
    window.addEventListener("resize", update)
    return () => {
      window.removeEventListener("resize", update)
    }
  })
  
  return (
    <div className={className}>
      <svg ref={svg} className="w-full h-10">
        <defs>
          <marker
            id="triangle"
            viewBox="0 0 2 2"
            refX="1"
            refY="1"
            markerUnits="strokeWidth"
            markerWidth="4"
            markerHeight="4"
            orient="auto">
            <path d="M 0 0 L 2 1 L 0 2 z" fill="black" />
          </marker>
        </defs>
        <path d={`M 0 0.5 H ${p}`} stroke='black' strokeWidth={6} markerEnd="url(#triangle)"></path>
        <circle cx="0" cy="0" r="8" stroke="black"></circle>
      </svg>
      <JsdImage src="quats/scalar_action.png" className="max-w-7/8 max-h-11 m-auto mt-6! mb-6!" alt="A ray from the origin." />
      <div className="flex justify-center gap-3">
        <Switch className="cursor-pointer" defaultChecked={true} onCheckedChange={check}></Switch>
        <input
          ref={modulus}
          type="range"
          min={0.01}
          max={1}
          step={0.01}
          onChange={update}
          defaultValue={0.5}
          className="accent-black cursor-pointer"
        ></input>
      </div>
    </div>
  )
}