import { cn } from "@/lib/utils"
import BmcButton from "@/components/general/bmc-button"
import { useState, useRef } from "react"

function LinkButton({ children, href, selected }  
: {
  children: string
  href: string
  selected: boolean
}) {
  return (
    <div className={cn('pl-3 pr-3 rounded-md', selected ? 'border border-gray-300 bg-white' : '')}>
      <a href={href}>{children}</a>
    </div>
  )
}

export function QuatsNav({
  header = false,
  selected = 'none'
}: {
  header?: boolean
  selected?: string
}) {
  return (
    <div className="flex flex-col items-center mt-12 mb-8">
      { header && <h1 className={'pl-3 pr-3 rounded-md text-3xl mb-6'}>Quaternions From Scratch</h1> }
      <div className="flex gap-6 justify-center mb-8">
        <LinkButton href="/articles/quats-from-scratch/" selected={selected == ''}>Intro</LinkButton>
        <LinkButton href="/articles/quats-from-scratch/0" selected={selected == '0'}>0</LinkButton>
        <LinkButton href="/articles/quats-from-scratch/1" selected={selected == '1'}>1</LinkButton>
        <LinkButton href="/articles/quats-from-scratch/2" selected={selected == '2'}>2</LinkButton>
        <LinkButton href="/articles/quats-from-scratch/3" selected={selected == '3'}>3</LinkButton>
        <LinkButton href="/articles/quats-from-scratch/4" selected={selected == '4'}>4</LinkButton>
        <LinkButton href="/articles/quats-from-scratch/outro" selected={selected == 'outro'}>Outro</LinkButton>
      </div>
      { (!header) && <BmcButton></BmcButton> }
    </div>
  )
}

export function QuatsHeader({
  children
}: {
  children: string | [string, string]
}) {
  let title, subtitle
  if (typeof children === 'string') {
    title = children
    subtitle = false
  } else {
    [title, subtitle] = children
  }
  return (
    <div className="mt-10 mb-6">
      <h2 className="text-center m-auto text-3xl">
        {title}
      </h2>
      <h3 className="text-center m-auto text-l mt-1">
        <i>{subtitle}</i>
      </h3>
    </div>
  )
}


export function QuatsCycle({ children }: { 
    children: React.ReactElement<HTMLImageElement> | React.ReactElement<HTMLImageElement>[]
  }) {
  const item_container = useRef<HTMLDivElement>(null)
  const pause_button = useRef<HTMLButtonElement>(null)
  const paused = useRef(false)
  // const _children = children instanceof Array ? children : [children]
  
  function pause() {
    let child: HTMLImageElement
    const _children = item_container.current!.children as unknown as HTMLImageElement[]
    const button = pause_button.current!
    const span = pause_button.current!.children[0]! as HTMLSpanElement
    if (paused.current) {
      button.classList.remove('bg-white')
      button.classList.add('bg-gray-100')
      span.classList.remove('top-[-0.1em]', 'left-[0.1em]')
      span.classList.add('bottom-[0.18em]', 'left-[0.03em]')
      span.innerText = "⏸︎"
      for (child of _children) {
        child.style.animationPlayState = 'running'
      }
    } else {
      button.classList.remove('bg-gray-100')
      button.classList.add('bg-white')
      span.classList.remove('bottom-[0.18em]', 'left-[0.03em]')
      span.classList.add('top-[-0.1em]', 'left-[0.1em]')
      span.innerText = "▶︎"
      for (child of _children) {
        child.style.animationPlayState = 'paused'
      }
    }
    paused.current = !paused.current
  }

  return (
    <div className="flex flex-col items-center">
      <div className='flex justify-center'>
        <div className="relative" ref={item_container}>
          { children }
        </div>
      </div>
      <button
        className={[
          'w-10 h-10 text-2xl rounded-full border-2 border-gray-400 text-gray-800',
          'p-1 pb-0 mb-[1em] bg-gray-100',
          'hover:border-gray-600'
        ].join(' ')}
        onClick={pause}
        ref={pause_button}
      >
        <span className="relative bottom-[0.18em] left-[0.03em]">
          ⏸︎
        </span>
      </button>
    </div>
  )
}
