"use client"
import { useEffect, useRef, useState, useCallback } from "react"
import { cn } from "@/lib/utils";
import MathInline from "../general/math-inline";
import { ObjectiveList, ObjectiveListManager } from "./objective-list";

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

  const manager = useRef(new ObjectiveListManager(
    { name: 'Isolate the inner cycle - counter-clockwise', indicators: 2 },
    { name: 'Isolate the inner cycle - clockwise', indicators: 2 },
    { name: 'Isolate the outer cycle - counter-clockwise', indicators: 2 },
    { name: 'Isolate the outer cycle - clockwise', indicators: 2 },
  ))
  const [objectives, setObjectives] = useState(manager.current.getData())
  const rotationState = useRef<ThreeSwapperState>(new RotateAroundI())
  
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

    const rs = rotationState.current
    const man = manager.current
    const progress = rs.move(t)
    man.setProgress(rs.number, progress)
    setObjectives(man.getData())

    if (progress === 2) {
      rotationState.current = rotationState.current.next()
    }
    
  }, [state.p1, state.p2, update])

  useEffect(() => {
    update()
  }, [update])

  return (
    <div className={"select-none " + className}>
      <svg ref={svg} className="m-auto w-full max-w-110 aspect-4/3" viewBox="-61 -45 122 90">
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
        
        <circle ref={p1} className="transition-transform duration-200 opacity-[0.8]" r="6" stroke="#555" strokeWidth={0.3} fill="#e3df04" transform={outer_translations[state.p1]}></circle>
        <circle ref={p2} className="transition-transform duration-200 opacity-[0.8]" r="6" stroke="#555" strokeWidth={0.3} fill="#d67405" transform={inner_circles[state.p2]}></circle>

        <text y="2.5" textAnchor="middle" fontSize="7" fontWeight={400} transform={outer_translations[0]}>i</text>
        <text x="2.2" y="2.2" textAnchor="end" fontSize="7" fontWeight={400} transform={outer_translations[1]}>-1</text>
        <text x="-1" y="2.5" textAnchor="middle" fontSize="7" fontWeight={400} transform={outer_translations[2]}>-i</text>
        <text x="-1.8" y="2.2" textAnchor="start" fontSize="7" fontWeight={400} transform={outer_translations[3]}>1</text>
        <text x="-6" y="5" textAnchor="end" fontSize="7" fontWeight={400} transform={inner_translations[0]}>j</text>
        <text x="5" y="5" textAnchor="start" fontSize="7" fontWeight={400} transform={inner_translations[1]}>k</text>
        <text x="4" y="-1" textAnchor="start" fontSize="7" fontWeight={400} transform={inner_translations[2]}>-j</text>
        <text x="-4" y="-1" textAnchor="end" fontSize="7" fontWeight={400} transform={inner_translations[3]}>-k</text>
      </svg>
      <div className="flex justify-center gap-3 mt-8">
        <button
          className={cn(
            "border border-gray-400 pt-1 pb-1 pl-3 pr-3 rounded-lg bg-gray-100 hover:bg-white active:bg-gray-200 cursor-pointer")}
          onClick={() => cycle(MULT_TYPE.L_i)}
        >
          <MathInline>i</MathInline>
        </button>
        <button
          className={cn(
            "border border-gray-400 pt-1 pb-1 pl-3 pr-3 rounded-lg bg-gray-100 hover:bg-white active:bg-gray-200 cursor-pointer")}
          onClick={() => cycle(MULT_TYPE.L_i_i)}
        >
          <MathInline>{"i^{*}"}</MathInline>
        </button>
        
        <MathInline className="pl-2 pr-2">p</MathInline>
        
        <button
          className={cn(
            "border border-gray-400 pt-1 pb-1 pl-3 pr-3 rounded-lg bg-gray-100 hover:bg-white active:bg-gray-200 cursor-pointer")}
          onClick={() => cycle(MULT_TYPE.R_i)}
        >
          <MathInline>i</MathInline>
        </button>
        <button
          className={cn(
            "border border-gray-400 pt-1 pb-1 pl-3 pr-3 rounded-lg bg-gray-100 hover:bg-white active:bg-gray-200 cursor-pointer")}
        onClick={() => cycle(MULT_TYPE.R_i_i)}
        >
          <MathInline>{"i^{*}"}</MathInline>
        </button>
      </div>
      <ObjectiveList className="mt-6 mb-8" objectives={objectives} />
    </div>
  )
}


enum RotationState {
  ZERO,
  ONE,
  TWO,
  THREE
}

interface ThreeSwapperState {
  number: number
  move(action: MULT_TYPE): number
  next(): ThreeSwapperState
}


class RotateAroundI implements ThreeSwapperState {
  public number = 0
  private state: RotationState = 0

  move(action: MULT_TYPE) {
    switch (action) {
      case MULT_TYPE.L_i:
        if (this.state === 2) {
          this.state += 1
        } else {
          this.state = 1
        }
        break
      case MULT_TYPE.R_i_i:
        if (this.state === 1 || this.state === 3) {
          this.state += 1
        } else {
          this.state = 0
        }
        break
      case MULT_TYPE.R_i:
      case MULT_TYPE.L_i_i:
        this.state = 0
        break
    }
    return this.state * 0.5
  }

  next() {
    return new ReverseAroundI()
  }
}


class ReverseAroundI implements ThreeSwapperState {
  public number = 1
  private state: RotationState = 0

  move(action: MULT_TYPE) {
    switch (action) {
      case MULT_TYPE.L_i_i:
        if (this.state === 2) {
          this.state += 1
        } else {
          this.state = 1
        }
        break
      case MULT_TYPE.R_i:
        if (this.state === 1 || this.state === 3) {
          this.state += 1
        } else {
          this.state = 0
        }
        break
      case MULT_TYPE.R_i_i:
      case MULT_TYPE.L_i:
        this.state = 0
        break
    }
    return this.state * 0.5
  }

  next() {
    return new RotateOuter()
  }
}


class RotateOuter implements ThreeSwapperState {
  public number = 2
  private state: RotationState = 0

  move(action: MULT_TYPE) {
    switch (action) {
      case MULT_TYPE.L_i:
        if (this.state === 2) {
          this.state += 1
        } else {
          this.state = 1
        }
        break
      case MULT_TYPE.R_i:
        if (this.state === 1 || this.state === 3) {
          this.state += 1
        } else {
          this.state = 0
        }
        break
      case MULT_TYPE.R_i_i:
      case MULT_TYPE.L_i_i:
        this.state = 0
        break
    }
    return this.state * 0.5
  }

  next() {
    return new ReverseOuter()
  }
}


class ReverseOuter implements ThreeSwapperState {
  public number = 3
  private state: RotationState = 0

  move(action: MULT_TYPE) {
    switch (action) {
      case MULT_TYPE.L_i_i:
        if (this.state === 2) {
          this.state += 1
        } else {
          this.state = 1
        }
        break
      case MULT_TYPE.R_i_i:
        if (this.state === 1 || this.state === 3) {
          this.state += 1
        } else {
          this.state = 0
        }
        break
      case MULT_TYPE.R_i:
      case MULT_TYPE.L_i:
        this.state = 0
        break
    }
    return this.state * 0.5
  }

  next() {
    return new RotateAroundI()
  }
}