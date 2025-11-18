"use client"

import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils";
import MathInline from "../general/math-inline";


export default function Swapper({ className }: { className?: string }) {
  const svg = useRef<SVGSVGElement>(null)
  // const red = useRef<SVGCircleElement>(null)
  // const blue = useRef<SVGCircleElement>(null)
  // const yellow = useRef<SVGCircleElement>(null)
  // const green = useRef<SVGCircleElement>(null)
  
  const translations = ['translate(39.0, 0.0)', 'translate(0.0, -39.0)', 'translate(-39.0, 0)', 'translate(0.0, 39.0)']
  const bottom_translations = ['translate(-39.0, 0.0)', 'translate(-13.0, 0.0)', 'translate(13.0, 0)', 'translate(39.0, 0.0)']
  
  const indices = useRef<[number, number, number, number]>([0, 1, 2, 3])
  const [positions, setPositions] = useState<[string, string, string, string]>([ translations[0], translations[1], translations[2], translations[3]])
  const [bottomPositions, setbottomPositions] = useState<[string, string, string, string]>([ bottom_translations[0], bottom_translations[1], bottom_translations[2], bottom_translations[3]])

  function negA() {
    indices.current = [indices.current[2], indices.current[1], indices.current[0], indices.current[3]]
    updateTranslations()
  }
  function negB() {
    indices.current = [indices.current[0], indices.current[3], indices.current[2], indices.current[1]]
    updateTranslations()
  }
  function swap() {
    indices.current = [indices.current[1], indices.current[0], indices.current[3], indices.current[2]]
    updateTranslations()
  }

  function updateTranslations() {
    const newPositions: [string, string, string, string] = ['','','','']
    const newBottomPositions: [string, string, string, string] = ['','','','']
    for (let i = 0; i < 4; i++) {
      newPositions[indices.current[i]] = translations[i]
      newBottomPositions[indices.current[i]] = bottom_translations[i]
    }
    setPositions(newPositions) 
    setbottomPositions(newBottomPositions)
  }

  return (
    <div className="">
      
        <svg ref={svg} className="m-auto w-full max-w-90 aspect-13/10" viewBox="-55 -55 110 143">
          <defs>
            <marker
              id="arrow_head"
              viewBox="0 0 2 2"
              refX="1"
              refY="1"
              markerUnits="userSpaceOnUse"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M 0 0 L 2 1 L 0 2 z" fill="black" />
            </marker>
          </defs>
          <circle className="transition-transform duration-200" cx="0" cy="0" r="9" stroke="none" fill="#a01752" opacity={0.7} transform={positions[0]}></circle>
        <circle className="transition-transform duration-200" cx="0" cy="0" r="9" stroke="none" fill="#2468a7" opacity={0.7} transform={positions[1]}></circle>
          <circle className="transition-transform duration-200" cx="0" cy="0" r="9" stroke="none" fill="#b3b100" opacity={0.7} transform={positions[2]}></circle>
        <circle className="transition-transform duration-200" cx="0" cy="0" r="9" stroke="none" fill="#0c8773" opacity={0.7} transform={positions[3]}></circle>

          <path d={'M -40 0 L 40 0'} stroke='black' strokeWidth='2' markerStart="url(#arrow_head)" markerEnd="url(#arrow_head)"></path>
          <path d={'M 0 -40 L 0 40'} stroke='black' strokeWidth='2' markerStart="url(#arrow_head)" markerEnd="url(#arrow_head)"></path>
          
          <circle className="transition-transform duration-200" cx="0" cy="78" r="9" stroke="none" fill="#a01752" opacity={0.7} transform={bottomPositions[0]}>
          </circle>
          <circle className="transition-transform duration-200" cx="0" cy="78" r="9" stroke="none" fill="#2468a7" opacity={0.7} transform={bottomPositions[1]}></circle>
          <circle className="transition-transform duration-200" cx="0" cy="78" r="9" stroke="none" fill="#b3b100" opacity={0.7} transform={bottomPositions[2]}></circle>
          <circle className="transition-transform duration-200" cx="0" cy="78" r="9" stroke="none" fill="#0c8773" opacity={0.7} transform={bottomPositions[3]}></circle>

          <text fontSize={11} y={82} x={-3} className="transition-transform duration-200" transform={bottomPositions[0]}>1</text> 
          <text fontSize={11} y={82} x={-3} className="transition-transform duration-200" transform={bottomPositions[1]}>2</text> 
          <text fontSize={11} y={82} x={-3} className="transition-transform duration-200" transform={bottomPositions[2]}>3</text> 
          <text fontSize={11} y={82} x={-3} className="transition-transform duration-200" transform={bottomPositions[3]}>4</text> 
        </svg>


      <div className="flex justify-center gap-3 mt-8">
        <button
          className="border border-gray-400 pt-1 pb-1 pl-2 pr-2 rounded-lg bg-gray-100 hover:bg-white active:bg-gray-200"
          onClick={swap}
        >
          <MathInline>(b, a)</MathInline>
        </button>

        <button
          className="border border-gray-400 pt-1 pb-1 pl-2 pr-2 rounded-lg bg-gray-100 hover:bg-white active:bg-gray-200"
          onClick={negA}
        >
          <MathInline>(-a, b)</MathInline>
        </button>

        {/*         
        <button
          className="border border-gray-400 pt-1 pb-1 pl-2 pr-2 rounded-lg bg-gray-100 hover:bg-white active:bg-gray-200"
          onClick={negB}
        >
          <MathInline>(a, -b)</MathInline>
        </button>
         */}

      </div>
    </div>
  )
}