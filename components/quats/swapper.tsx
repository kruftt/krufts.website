"use client"

import { useCallback, useMemo, useRef, useState } from "react"
import MathInline from "../general/math-inline";
import { ObjectiveListManager, ObjectiveList } from "./objective-list";

enum ActionType {
  SWAP,
  NEGATE
}

enum SwapperState {
  NORMAL,
  FLIPPED,
  SWAPPED,
}

enum MarchState {
  ZERO,
  LEFT,
  RIGHT,
  RIGHT_TWO
}


export default function Swapper({ className }: { className?: string }) {
  const svg = useRef<SVGSVGElement>(null)
  // const red = useRef<SVGCircleElement>(null)
  // const blue = useRef<SVGCircleElement>(null)
  // const yellow = useRef<SVGCircleElement>(null)
  // const green = useRef<SVGCircleElement>(null)
  // const state = useRef({
  //   swapper: SwapperState.NORMAL,
  //   left: 0,
  //   right: 0,
  //   marcher: MarchState.ZERO,
  //   march: 0,
  // })
  const manager = useRef(new ObjectiveListManager(
    { name: 'Rotate Left 2x', indicators: 2 },
    { name: 'Rotate Right 2x', indicators: 2 },
    { name: 'Left, Right, Right, Left', indicators: 4 },
  ))
  const [listData, setListData] = useState(manager.current.getData())
  const swapState = useRef<TwoSwapperState>(new RotateLeft(new TwoSwapper()))
  
  const translations = useMemo(() => ['translate(40.0, 0.0)', 'translate(0.0, -40.0)', 'translate(-40.0, 0)', 'translate(0.0, 40.0)'], [])
  const bottom_translations = useMemo(() => ['translate(-39.0, 0.0)', 'translate(-13.0, 0.0)', 'translate(13.0, 0)', 'translate(39.0, 0.0)'], [])
  
  const indices = useRef<[number, number, number, number]>([0, 1, 2, 3])
  const [positions, setPositions] = useState<[string, string, string, string]>([ translations[0], translations[1], translations[2], translations[3]])
  const [bottomPositions, setbottomPositions] = useState<[string, string, string, string]>([ bottom_translations[0], bottom_translations[1], bottom_translations[2], bottom_translations[3]])

  const updateTranslations = useCallback(() => {
    const newPositions: [string, string, string, string] = ['', '', '', '']
    const newBottomPositions: [string, string, string, string] = ['', '', '', '']
    for (let i = 0; i < 4; i++) {
      newPositions[indices.current[i]] = translations[i]
      newBottomPositions[indices.current[i]] = bottom_translations[i]
    }
    setPositions(newPositions)
    setbottomPositions(newBottomPositions)
  }, [bottom_translations, translations])

  const updateState = useCallback((action: ActionType) => {
    const progress = swapState.current.move(action)
    manager.current.setProgress(swapState.current.index, progress)
    setListData(manager.current.getData())
    if (progress === 2 && swapState.current.index < 2) {
      swapState.current = swapState.current.next()
    }

  }, [])

  const negA = useCallback(() => {
    indices.current = [indices.current[2], indices.current[1], indices.current[0], indices.current[3]]
    updateTranslations()
    updateState(ActionType.NEGATE)
    // console.log('negated')
  }, [updateState, updateTranslations])
  
  // const negB = useCallback(() => {
  //   indices.current = [indices.current[0], indices.current[3], indices.current[2], indices.current[1]]
  //   updateTranslations()
  // }, [updateState, updateTranslations])

  const swap = useCallback(() => {
    indices.current = [indices.current[1], indices.current[0], indices.current[3], indices.current[2]]
    updateTranslations()
    updateState(ActionType.SWAP)
    // console.log('swapped')
  }, [updateState, updateTranslations])


  return (
    <div className={className}>
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


          <path d={'M -28 0 L 28 0'} stroke='black' strokeWidth='2' markerStart="url(#arrow_head)" markerEnd="url(#arrow_head)" opacity={0.9}></path>
          <path d={'M 0 -28 L 0 28'} stroke='black' strokeWidth='2' markerStart="url(#arrow_head)" markerEnd="url(#arrow_head)" opacity={0.9}></path>
          
          <circle className="transition-transform duration-200" cx="0" cy="0" r="9" stroke="none" fill="#a01752" opacity={0.7} transform={positions[0]}></circle>
          <circle className="transition-transform duration-200" cx="0" cy="0" r="9" stroke="none" fill="#2468a7" opacity={0.7} transform={positions[1]}></circle>
            <circle className="transition-transform duration-200" cx="0" cy="0" r="9" stroke="none" fill="#b3b100" opacity={0.7} transform={positions[2]}></circle>
          <circle className="transition-transform duration-200" cx="0" cy="0" r="9" stroke="none" fill="#0c8773" opacity={0.7} transform={positions[3]}></circle>

          {/* <path d={'M -40 0 L 40 0'} stroke='black' strokeWidth='2' markerStart="url(#arrow_head)" markerEnd="url(#arrow_head)"></path>
          <path d={'M 0 -40 L 0 40'} stroke='black' strokeWidth='2' markerStart="url(#arrow_head)" markerEnd="url(#arrow_head)"></path> */}
          
          <circle className="transition-transform duration-200" cx="0" cy="78" r="9" stroke="none" fill="#a01752" opacity={0.7} transform={bottomPositions[0]}>
          </circle>
          <circle className="transition-transform duration-200" cx="0" cy="78" r="9" stroke="none" fill="#2468a7" opacity={0.7} transform={bottomPositions[1]}></circle>
          <circle className="transition-transform duration-200" cx="0" cy="78" r="9" stroke="none" fill="#b3b100" opacity={0.7} transform={bottomPositions[2]}></circle>
          <circle className="transition-transform duration-200" cx="0" cy="78" r="9" stroke="none" fill="#0c8773" opacity={0.7} transform={bottomPositions[3]}></circle>

          <text fontSize={11} y={82} x={-3} className="transition-transform duration-200" transform={bottomPositions[0]}>1</text> 
          <text fontSize={11} y={82} x={-3} className="transition-transform duration-200" transform={bottomPositions[1]}>2</text> 
          <text fontSize={11} y={82} x={-3} className="transition-transform duration-200" transform={bottomPositions[2]}>3</text> 
          <text fontSize={11} y={82} x={-3} className="transition-transform duration-200" transform={bottomPositions[3]}>4</text> 
          
          <text fontSize={11} y={3} x={-3} className="transition-transform duration-200" transform={positions[0]}>1</text> 
          <text fontSize={11} y={3} x={-3} className="transition-transform duration-200" transform={positions[1]}>2</text> 
          <text fontSize={11} y={3} x={-3} className="transition-transform duration-200" transform={positions[2]}>3</text> 
          <text fontSize={11} y={3} x={-3} className="transition-transform duration-200" transform={positions[3]}>4</text>
        </svg>


      <div className="flex justify-center gap-3 mt-8">
        <button
          className="border border-gray-400 pt-1 pb-1 pl-2 pr-2 rounded-lg bg-gray-100 hover:bg-white active:bg-gray-200 cursor-pointer"
          onClick={swap}
        >
          <MathInline>(b, a)</MathInline>
        </button>

        <button
          className="border border-gray-400 pt-1 pb-1 pl-2 pr-2 rounded-lg bg-gray-100 hover:bg-white active:bg-gray-200 cursor-pointer"
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
      <ObjectiveList className="mt-6 mb-6" objectives={listData} />
    </div>
  )
}


interface TwoSwapperState {
  index: number
  state: number
  move(action: ActionType): number
  next(): TwoSwapperState
}

class TwoSwapper implements TwoSwapperState{
  index = 0
  state: SwapperState = 0

  move(action: ActionType) {
    switch (action) {
      case ActionType.SWAP:
        switch (this.state) {
          case SwapperState.NORMAL:
            this.state = SwapperState.SWAPPED
            break
          case SwapperState.SWAPPED:
            this.state = SwapperState.NORMAL
            break
          case SwapperState.FLIPPED:
            this.state = SwapperState.NORMAL
            break
        }
        break
      case ActionType.NEGATE:
        switch (this.state) {
          case SwapperState.NORMAL:
            this.state = SwapperState.FLIPPED
            break
          case SwapperState.SWAPPED:
            this.state = SwapperState.NORMAL
            break
          case SwapperState.FLIPPED:
            this.state = SwapperState.NORMAL
            break
        }
        break
    }
    return this.state
  }

  next() {
    return new TwoSwapper()
  }
}

class RotateLeft implements TwoSwapperState {
  public index = 0
  public state = 0

  constructor(private swapper: TwoSwapper) {}

  move(action: ActionType) {
    switch (action) {
      case ActionType.SWAP:
        switch (this.swapper.state) {
          case SwapperState.NORMAL:
            this.state += 0.5
            break
          case SwapperState.FLIPPED:
            this.state = Math.max(this.state - 0.5, 0)
            break
          case SwapperState.SWAPPED:
            this.state = Math.max(this.state - 0.5, 0)
            break
        }
        break
      case ActionType.NEGATE:
        switch (this.swapper.state) {
          case SwapperState.NORMAL:
            this.state -= 0.5
            break
          case SwapperState.FLIPPED:
            this.state += 0.5
            break
          case SwapperState.SWAPPED:
            this.state += 0.5
            break
        }
        break
    }
    this.swapper.move(action)
    return this.state
  }

  next() {
    return new RotateRight(this.swapper)
  }
}


class RotateRight implements TwoSwapperState {
  public index = 1
  public state = 0

  constructor(private swapper: TwoSwapper) {}

  move(action: ActionType) {
    switch (action) {
      case ActionType.NEGATE:
        switch (this.swapper.state) {
          case SwapperState.NORMAL:
            this.state += 0.5
            break
          case SwapperState.FLIPPED:
            this.state = Math.max(this.state - 0.5, 0)
            break
          case SwapperState.SWAPPED:
            this.state = Math.max(this.state - 0.5, 0)
            break
        }
        break
      case ActionType.SWAP:
        switch (this.swapper.state) {
          case SwapperState.NORMAL:
            this.state -= 0.5
            break
          case SwapperState.FLIPPED:
            this.state += 0.5
            break
          case SwapperState.SWAPPED:
            this.state += 0.5
            break
        }
        break
    }
    this.swapper.move(action)
    return this.state
  }

  next() {
    return new SwapperMarch(this.swapper)
  }
}


class SwapperMarch implements TwoSwapperState {
  public index = 2
  public state: MarchState = 0
  public progress = 0

  constructor(private swapper: TwoSwapper) {}

  move(action: ActionType) {
    switch (action) {
      case ActionType.NEGATE: // USER FLIPPED B
        switch (this.swapper.state) {
          case SwapperState.NORMAL: // FLIP B
            switch (this.state) {
              case MarchState.LEFT:
              case MarchState.RIGHT:
                this.progress += 0.5
                break
              case MarchState.ZERO:
              case MarchState.RIGHT_TWO:
                this.progress = 0
                this.state = MarchState.ZERO
                break
            }
            break
          case SwapperState.FLIPPED: // UNFLIP
            switch (this.state) {
              case MarchState.LEFT:
              case MarchState.RIGHT:
                this.progress -= 0.5
                break
              case MarchState.ZERO:
              case MarchState.RIGHT_TWO:
                console.warn('RIGHT_TWO FLIPPED!')
                break
            }
            break
          case SwapperState.SWAPPED: // ROTATE LEFT
            switch (this.state) {
              case MarchState.ZERO:
                this.progress += 0.5
                this.state = MarchState.LEFT
                break
              case MarchState.LEFT:
              case MarchState.RIGHT:
                this.progress = 0
                this.state = MarchState.ZERO
                break
              case MarchState.RIGHT_TWO:
                this.progress += 0.5
                break
            }
            break
        }
        break
      case ActionType.SWAP: // USER SWAPPED A<->B
        switch (this.swapper.state) {
          case SwapperState.NORMAL: // SWAP
            switch (this.state) {
              case MarchState.ZERO:
                this.progress += 0.5
                break
              case MarchState.LEFT:
              case MarchState.RIGHT:
                this.progress = 0.5
                this.state = MarchState.ZERO
                break
              case MarchState.RIGHT_TWO:
                this.progress += 0.5
                break
            }
            break
          case SwapperState.FLIPPED: // ROTATE RIGHT
            switch (this.state) {
              case MarchState.ZERO:
                this.progress = 0
                this.state = MarchState.ZERO
                break
              case MarchState.LEFT:
                this.progress += 0.5
                this.state = MarchState.RIGHT
                break
              case MarchState.RIGHT:
                this.progress += 0.5
                this.state = MarchState.RIGHT_TWO
                break
              case MarchState.RIGHT_TWO:
                this.progress = 0
                this.state = MarchState.ZERO
                break
            }
            break
          case SwapperState.SWAPPED: // UNSWAP
            switch (this.state) {
              case MarchState.ZERO:
                this.progress -= 0.5
                break
              case MarchState.LEFT:
              case MarchState.RIGHT:
                console.warn('invalid march swap')
                break
              case MarchState.RIGHT_TWO:
                this.progress -= 0.5
                break
            }
            break
        }
        break
    }
    this.swapper.move(action)
    return this.progress
  }

  next() {
    return new RotateLeft(this.swapper)
  }
}
