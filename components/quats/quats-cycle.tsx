'use client'

import { useCallback, useRef, useState } from "react"

export function QuatsCycle({ children }: {
  children: React.ReactElement<HTMLImageElement> | React.ReactElement<HTMLImageElement>[]
}) {
  const item_container = useRef<HTMLDivElement>(null)
  const pause_button = useRef<HTMLButtonElement>(null)
  const [paused, setPause] = useState(false)
  // const _children = children instanceof Array ? children : [children]

  const pause = useCallback(() => {
    let child: HTMLImageElement
    const _children = item_container.current!.children as unknown as HTMLImageElement[]
    const button = pause_button.current!
    const span = pause_button.current!.children[0]! as HTMLSpanElement
    if (paused) {
      // button.classList.remove('bg-white')
      // button.classList.add('bg-gray-100')
      // span.classList.remove('top-[-0.1em]', 'left-[0.1em]')
      // span.classList.add('bottom-[0.18em]', 'left-[0.03em]')
      // span.innerText = "⏸"
      for (child of _children) {
        child.style.animationPlayState = 'running'
      }
    } else {
      // button.classList.remove('bg-gray-100')
      // button.classList.add('bg-white')
      // span.classList.remove('bottom-[0.18em]', 'left-[0.03em]')
      // span.classList.add('top-[-0.1em]', 'left-[0.1em]')

      for (child of _children) {
        child.style.animationPlayState = 'paused'
      }
    }
    setPause(!paused)
  }, [item_container, pause_button, paused])

  return (
    <div className="flex flex-col items-center">
      <div className='flex justify-center'>
        <div className="relative" ref={item_container}>
          {children}
        </div>
      </div>
      <button
        className={[
          'w-10 h-10 p-2',
          'text-2xl rounded-full border-2 border-gray-500 text-gray-800',
          'mb-[1em] bg-gray-100',
          'hover:border-black cursor-pointer'
        ].join(' ')}
        onClick={pause}
        ref={pause_button}
      >
        <PlayPause paused={paused}></PlayPause>
      </button>
    </div>
  )
}


function PlayPause({ paused }: { paused: boolean }) {
  return (
    <svg viewBox="0 0 10 10">
      <path d="M 3 1 L 3 9 M 7 1 L 7 9" stroke="#202020" strokeWidth="2" visibility={paused ? 'hidden' : 'visible'}></path>
      <path d="M 3 1 L 3 9 L 9 5 L 3 1" stroke="#202020" fill="#202020" strokeWidth="0" visibility={paused ? 'visible' : 'hidden'}></path>
    </svg>
  )
}