'use client'

import { cn } from "@/lib/utils"
import BmcButton from "@/components/general/bmc-button"
import { useEffect, useState } from "react"

export default function QuatsNav({
  className = '',
  header = false,
}: {
  className?: string
  header?: boolean
}) {
  const [name, setName] = useState<string>('server')
  const [prev, setPrev] = useState<null | string>(null)
  const [next, setNext] = useState<null | string>(null)
  
  useEffect(() => {
    const path_regex = /\/articles\/quats-from-scratch\/([^\/]*)\/?/g
    const match = path_regex.exec(window.location.pathname)
    const _name = match && match[1]
    if (_name === null) return
    
    setName(_name)
    const _num = parseInt(_name)
    
    if (isNaN(_num)) {
      setNext('/articles/quats-from-scratch/0/')
    } else if (_num === 0) {
      setPrev('/articles/quats-from-scratch/')
      setNext('/articles/quats-from-scratch/1/')
    } else if (_num === 4) {
      setPrev('/articles/quats-from-scratch/3/')
    } else {
      setPrev(`/articles/quats-from-scratch/${_num - 1}/`)
      setNext(`/articles/quats-from-scratch/${_num + 1}/`)
    }
  }, [name])

  return (
    <div className={cn("flex flex-col items-center", className)}>
      {header && <h1 className={'pl-3 pr-3 rounded-md text-3xl mb-8'}>Quaternions From Scratch</h1>}
      <div className="flex gap-2 justify-center text-lg">
        { prev !== null &&
          <StepButton href={prev}>
            <svg className="w-5 h-5" viewBox="0 0 1 1">
              <path d='M 0.15 0.5 L 0.85 1.0 L 0.85 0 L 0.15 0.5'></path>
            </svg>
          </StepButton>
        }
        <LinkButton href="/articles/quats-from-scratch/" selected={name === ''}>Intro</LinkButton>
        <LinkButton href="/articles/quats-from-scratch/0" selected={name === '0'}>0</LinkButton>
        <LinkButton href="/articles/quats-from-scratch/1" selected={name === '1'}>1</LinkButton>
        <LinkButton href="/articles/quats-from-scratch/2" selected={name === '2'}>2</LinkButton>
        <LinkButton href="/articles/quats-from-scratch/3" selected={name === '3'}>3</LinkButton>
        <LinkButton href="/articles/quats-from-scratch/4" selected={name === '4'}>4</LinkButton>
        { next !== null &&
          <StepButton href={next}>
            <svg className="w-5 h-5 scale-x-[-1]" viewBox="0 0 1 1">
              <path d='M 0.15 0.5 L 0.85 1.0 L 0.85 0 L 0.15 0.5'></path>
            </svg>
          </StepButton>
        }
      </div>
      {(!header) && <BmcButton></BmcButton>}
    </div>
  )
}

function LinkButton({ children, href, selected }
  : {
    children: React.ReactNode
    href: string
    selected: boolean
  }) {
  return (
    <div
      className={cn(
        'rounded-md select-none',
        selected
          ? 'outline outline-gray-300 bg-gray-100'
          : 'hover:outline hover:outline-gray-300 hover:bg-white cursor-pointer'
      )}
    >
      {
        (selected)
        && <span className="h-full block pl-3 pr-3">{children}</span>
        || <a className="h-full block pl-3 pr-3" href={href}>{children}</a>
      }
    </div>
  )
}

function StepButton({ children, href }: {
  children: React.ReactNode
  href: string
}) {
  return (
    <div className="rounded-md flex items-center select-none opacity-[0.9] hover:opacity-[1] hover:outline hover:outline-gray-300 hover:bg-white">
      <a className="block pl-2 pr-2" href={href}>{children}</a>
    </div>
  )
}