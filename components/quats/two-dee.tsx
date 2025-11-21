"use client"

import { useRef, useState } from "react"
import MathInline from "../general/math-inline";
import { cn } from "@/lib/utils";


export default function TwoDee({ className }: { className?: string }) {
  const arg = useRef<HTMLInputElement>(null)
  const svg = useRef<SVGSVGElement>(null)
  const [p, setP] = useState<[number, number, number]>([50.0, 0.0, 0.0])

  function update() {
    const v = parseFloat(arg.current!.value)
    const cos_v = 50.0 * Math.cos(v)
    const sin_v = 50.0 * Math.sin(v)
    setP([cos_v, sin_v, v])
  }

  return (
    <div className="">
      <div className={cn('w-full flex justify-center', className)}>
        <svg ref={svg} className="w-full max-w-70 aspect-1/1" viewBox="-55 -55 110 110">
          <defs>
            <marker
              id="triangle"
              viewBox="0 0 2 2"
              refX="1"
              refY="1"
              markerUnits="strokeWidth"
              markerWidth="5"
              markerHeight="5"
              orient="auto-start-reverse">
              <path d="M 0 0 L 2 1 L 0 2 z" fill="black" />
            </marker>
          </defs>
          <path
            d={`M 0 0 L 50 0 A 50 50 0 ${Math.abs(p[2]) > Math.PI ? 1 : 0} ${p[2] > 0 ? 0 : 1} ${p[0]} ${-p[1]}`}
            stroke='black'
            strokeWidth={1}
            fill={p[2] >= 0 ? '#0c8773d0' : '#a01752d0'}
            // opacity={0.7}
          ></path>
          <path
            d={`M 0 0 L ${p[0]} 0 L ${p[0]} ${-p[1]} L 0 0`}
            stroke='black'
            strokeWidth={1}
            fill="#b3b100d0"
          ></path>

          <path
            d={`M -50 0 L 50 0`}
            stroke='#000000d0'
            strokeWidth="1"
            // markerStart="url(#triangle)"
            // markerEnd="url(#triangle)"
          ></path>
          <path
            d={`M 0 -50 L 0 50`}
            stroke='#000000d0'
            strokeWidth="1"
            // markerStart="url(#triangle)"
            // markerEnd="url(#triangle)"
          ></path>

          <path
            d={`M 0 0 L ${p[0]} ${-p[1]}`}
            stroke='black'
            strokeWidth={2}
            markerEnd="url(#triangle)"
          ></path>
         
          <circle cx="0" cy="0" r="2" stroke="black"></circle>
        </svg>
      </div>
        <div className="flex justify-center gap-3 mt-8">
          <MathInline dynamic={false}>{"-2\\pi"}</MathInline>
          <input
            ref={arg}
            type="range"
            min={-1.996 * Math.PI}
            max={1.996 * Math.PI}
            step={Math.PI * 0.005}
            onChange={update}
            defaultValue={0}
          className="accent-black w-full max-w-80 cursor-pointer"
          ></input>
        <MathInline dynamic={false}>{"2\\pi"}</MathInline>
        </div>
    </div>
  )
}