"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import { cn } from "@/lib/utils";
import MathInline from "../general/math-inline";

const INNER_OFFSET = 12
const OUTER_OFFSET = 30
const FLATTEN = 0.5
const OUTER_FLATTEN = 0.9
const INNER_WIDEN = 1.2
const OUTER_WIDEN = 1.8
const DASH_OFFSET = 7

enum MULT_TYPE {
  L_i,
  L_i_i,
  R_i,
  R_i_i,
}

const DASH_COLOR = "#00000020"

const inner_translations = [
  `translate(${-INNER_OFFSET * INNER_WIDEN} ${INNER_OFFSET * FLATTEN})`,
  `translate(${INNER_OFFSET * INNER_WIDEN} ${INNER_OFFSET * FLATTEN})`,
  `translate(${INNER_OFFSET * INNER_WIDEN} ${-INNER_OFFSET * FLATTEN})`,
  `translate(${-INNER_OFFSET * INNER_WIDEN} ${-INNER_OFFSET * FLATTEN})`,
]
const outer_translations = [
  `translate(0 ${-OUTER_OFFSET * INNER_WIDEN})`,
  `translate(${-OUTER_OFFSET * OUTER_WIDEN} 0)`,
  `translate(0 ${OUTER_OFFSET * INNER_WIDEN})`,
  `translate(${OUTER_OFFSET * OUTER_WIDEN} 0)`,
]
const inner_circles = [
  `translate(${-INNER_OFFSET * INNER_WIDEN * 1.5} ${INNER_OFFSET * FLATTEN * 1.5})`,
  `translate(${INNER_OFFSET * INNER_WIDEN * 1.5} ${INNER_OFFSET * FLATTEN * 1.5})`,
  `translate(${INNER_OFFSET * INNER_WIDEN * 1.5} ${-INNER_OFFSET * FLATTEN * 1.5})`,
  `translate(${-INNER_OFFSET * INNER_WIDEN * 1.5} ${-INNER_OFFSET * FLATTEN * 1.5})`,
]


export default function ThreeSwapper({ className }: { className?: string }) {
  const svg = useRef<SVGSVGElement>(null)
  const p1 = useRef<SVGCircleElement>(null)
  const p2 = useRef<SVGCircleElement>(null)
  const [state, setState] = useState({
    p1: 0,
    p2: 0,
  })
  
  const update = useCallback(() => {
    p1.current!.style.transform = outer_translations[state.p1]
    p2.current!.style.transform = inner_circles[state.p2]
  }, [state.p1, state.p2])

  const cycle = useCallback((t: MULT_TYPE) => {
    switch (t) {
      case MULT_TYPE.L_i:
        setState({ p1: (state.p1 + 5) % 4, p2: (state.p2 + 5) % 4 })
        break
      case MULT_TYPE.L_i_i:
        setState({ p1: (state.p1 + 3) % 4, p2: (state.p2 + 3) % 4 })
        break
      case MULT_TYPE.R_i:
        setState({ p1: (state.p1 + 5) % 4, p2: (state.p2 + 3) % 4 })
        break
      case MULT_TYPE.R_i_i:
        setState({ p1: (state.p1 + 3) % 4, p2: (state.p2 + 5) % 4 })
        break
    }
    update()
  }, [state.p1, state.p2, update])

  useEffect(() => {
    update()
  }, [update])

  return (
    <div className={className}>
      
        <svg ref={svg} className="m-auto w-full max-w-110 aspect-4/3" viewBox="-60 -45 120 90">
          <defs>
            <marker
              id="arrow_head"
              viewBox="0 0 2 2"
              refX="1"
              refY="1"
              markerUnits="userSpaceOnUse"
              markerWidth="4"
              markerHeight="4"
              orient="auto-start-reverse"
            >
              <path d="M 0 0 L 2 1 L 0 2 z" fill="black" />
            </marker>
          </defs>


          <path 
            d={`M ${-OUTER_OFFSET * OUTER_WIDEN} ${DASH_OFFSET} A ${OUTER_OFFSET * OUTER_WIDEN} ${OUTER_OFFSET * OUTER_FLATTEN + 10} 0 0 0 ${-DASH_OFFSET} ${(OUTER_OFFSET * OUTER_FLATTEN) + DASH_OFFSET}`}
            stroke={DASH_COLOR}
            strokeDasharray="3,3"
            fill="none"
          ></path>
          <path 
            d={`M ${OUTER_OFFSET * OUTER_WIDEN} ${DASH_OFFSET} A ${OUTER_OFFSET * OUTER_WIDEN} ${OUTER_OFFSET * OUTER_FLATTEN + 10} 0 0 1 ${DASH_OFFSET} ${(OUTER_OFFSET * OUTER_FLATTEN) + DASH_OFFSET}`}
            stroke={DASH_COLOR}
            strokeDasharray="3,3"
            fill="none"
          ></path>
          <path 
          d={`M ${-OUTER_OFFSET * OUTER_WIDEN} ${-DASH_OFFSET} A ${OUTER_OFFSET * OUTER_WIDEN} ${OUTER_OFFSET * OUTER_FLATTEN + 10} 0 0 1 ${-DASH_OFFSET} ${-(OUTER_OFFSET * OUTER_FLATTEN) - DASH_OFFSET}`}
            stroke={DASH_COLOR}
            strokeDasharray="3,3"
            fill="none"
          ></path>
          <path 
            d={`M ${OUTER_OFFSET * OUTER_WIDEN} ${-DASH_OFFSET} A ${OUTER_OFFSET * OUTER_WIDEN} ${OUTER_OFFSET * OUTER_FLATTEN + 10} 0 0 0 ${DASH_OFFSET} ${- (OUTER_OFFSET * OUTER_FLATTEN) - DASH_OFFSET}`}
            stroke={DASH_COLOR}
            strokeDasharray="3,3"
            fill="none"
          ></path>
          

          <path 
          d={`M ${-INNER_OFFSET * INNER_WIDEN} ${-INNER_OFFSET * FLATTEN} L ${INNER_OFFSET * INNER_WIDEN} ${INNER_OFFSET * FLATTEN}`}
            stroke="black"
            markerStart="url(#arrow_head)"
            markerEnd="url(#arrow_head)"
          ></path>
          <path 
          d={`M ${-INNER_OFFSET * INNER_WIDEN} ${INNER_OFFSET * FLATTEN} L ${INNER_OFFSET * INNER_WIDEN} ${-INNER_OFFSET * FLATTEN}`}
            stroke="black"
            markerStart="url(#arrow_head)"
            markerEnd="url(#arrow_head)"
          ></path>
          <path 
          d={`M 0 ${-OUTER_OFFSET * OUTER_FLATTEN} L 0 ${OUTER_OFFSET * OUTER_FLATTEN} `}
            stroke="black"
            markerStart="url(#arrow_head)"
            markerEnd="url(#arrow_head)"
          ></path>

          <circle ref={p1} className="transition-transform duration-200 opacity-[0.6]" r="6" fill="#008080" transform={outer_translations[state.p1]}></circle>
          <circle ref={p2} className="transition-transform duration-200 opacity-[0.6]" r="6" fill="#808000" transform={inner_circles[state.p2]}></circle>

          <text y="3" textAnchor="middle" fontSize="7" fontStyle="bold" transform={outer_translations[0]}>i</text>
          <text x="3" y="2" textAnchor="end" fontSize="7" fontStyle="bold" transform={outer_translations[1]}>-1</text>
          <text x="-1" y="2" textAnchor="middle" fontSize="7" fontStyle="bold" transform={outer_translations[2]}>-i</text>
          <text x="-2" y="2" textAnchor="start" fontSize="7" fontStyle="bold" transform={outer_translations[3]}>1</text>
          <text x="-6" y="5" textAnchor="end" fontSize="7" fontStyle="bold" transform={inner_translations[0]}>j</text>
          <text x="5" y="5" textAnchor="start" fontSize="7" fontStyle="bold" transform={inner_translations[1]}>k</text>
          <text x="4" y="-1" textAnchor="start" fontSize="7" fontStyle="bold" transform={inner_translations[2]}>-j</text>
          <text x="-4" y="-1" textAnchor="end" fontSize="7" fontStyle="bold" transform={inner_translations[3]}>-k</text>
        </svg>


      <div className="flex justify-center gap-3 mt-8">
        
        <button
          className={cn(
            "border border-gray-400 pt-1 pb-1 pl-3 pr-3 rounded-lg bg-gray-100 hover:bg-white active:bg-gray-200",
            ""
          )}
          onClick={() => cycle(MULT_TYPE.L_i)}
        >
          <MathInline>i</MathInline>
        </button>
        <button
          className={cn(
            "border border-gray-400 pt-1 pb-1 pl-3 pr-3 rounded-lg bg-gray-100 hover:bg-white active:bg-gray-200",
            ""
          )}
          onClick={() => cycle(MULT_TYPE.L_i_i)}
        >
          <MathInline>{"i^{*}"}</MathInline>
        </button>
        
        
        <MathInline className="pl-2 pr-2">p</MathInline>
        
        <button
          className={cn(
            "border border-gray-400 pt-1 pb-1 pl-3 pr-3 rounded-lg bg-gray-100 hover:bg-white active:bg-gray-200",
            ""
          )}
          onClick={() => cycle(MULT_TYPE.R_i)}
        >
          <MathInline>i</MathInline>
        </button>
        <button
          className={cn(
            "border border-gray-400 pt-1 pb-1 pl-3 pr-3 rounded-lg bg-gray-100 hover:bg-white active:bg-gray-200",
            ""
          )}
        onClick={() => cycle(MULT_TYPE.R_i_i)}
        >
          <MathInline>{"i^{*}"}</MathInline>
        </button>

      </div>
    </div>
  )
}