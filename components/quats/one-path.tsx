"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import MathInline from "../general/math-inline"


export default function OnePath({ className }: { className?: string }) {
  const svg = useRef<SVGSVGElement>(null)
  
  const [state, setState] = useState({
    plus: true,
    width: 100,
    half_width: 50,
    arrow_width: 20,
    spacer: 5
  })
  
  const update = useCallback((swap: boolean = false) => {
    const plus = swap ? !state.plus : state.plus
    const width = svg.current!.clientWidth
    const half_width = width * 0.5
    const arrow_width = half_width * 0.4
    const spacer = half_width * 0.1
    setState({ plus, width, half_width, arrow_width, spacer })
    // svg.current!.setAttribute('viewBox', `-${half_width} 0 ${half_width} 1`)
  }, [state.plus])

  const _update = useCallback(() => update(), [update])

  useEffect(() => {
    update()
    window.addEventListener("resize", _update)
    return () => {
      window.removeEventListener("resize", _update)
    }
  }, [update, _update])
  
  return (
    <div className={className}>
      <svg
        ref={svg}
        viewBox={`-${state.half_width} 0 ${state.width} 48`}
        className="w-full h-12"
      >
        <defs>
          <marker
            id="triangle"
            viewBox="0 0 2 2"
            refX="2"
            refY="2"
            markerUnits="userSpaceOnUse"
            markerWidth="4"
            markerHeight="4"
            orient="auto">
            <path d="M 0 0 L 2 1 L 0 2 z" fill="black" />
          </marker>
        </defs>
        <path
          d={`M ${state.spacer - state.half_width} 16 h ${state.arrow_width}`}
          stroke='black'
          strokeWidth="4"
          markerEnd="url(#triangle)"
        ></path>
        <path
          d={`M ${state.spacer - state.half_width + state.arrow_width} 32 h ${state.arrow_width * (state.plus ? -1 : 1)}`}
          stroke='black'
          strokeWidth="4"
          markerEnd="url(#triangle)"
        ></path>
        <path
          d={`M ${state.spacer} 16 h ${state.arrow_width}`}
          stroke='black'
          strokeWidth="4"
          markerEnd="url(#triangle)"
        ></path>
        <path
          d={`M ${state.spacer + state.arrow_width} 32 h ${state.arrow_width * (state.plus ? 1: -1)}`}
          stroke='black'
          strokeWidth="4"
          markerEnd="url(#triangle)"
        ></path>
      </svg>
      <div className="flex flex-col items-center">
        <div className="w-full flex justify-center">
          <div className="grow text-center">
            <MathInline dynamic={true}>{"r" + (state.plus ? "+" : "-") + "(-r)"}</MathInline>
          </div>
          <div className="grow text-center">
            <MathInline dynamic={true}>{"|r|" + (state.plus ? "+" : "-") + "|-r|"}</MathInline>
          </div>
        </div>
        <div className="flex justify-center items-center gap-6">
          <span className="font-semibold">Part 1</span>
          <button
            className="border border-gray-500 hover:border-black rounded-full bg-gray-100 pb-1 pl-2 pr-2 w-10 h-10 cursor-pointer"
            onClick={() => update(true)}
          >
            <b className="text-2xl">{state.plus ? '+' : '-'}</b>
          </button>
          <span className="font-semibold">Part 2</span>
        </div>
      </div>
    </div>
  )
}