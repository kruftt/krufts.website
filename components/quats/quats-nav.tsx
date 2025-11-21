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
  const path_regex = /\/articles\/quats-from-scratch\/([^\/]*)\/?/g

  useEffect(() => {
    const match = path_regex.exec(window.location.pathname)
    const _name = match && match[1]
    if (_name !== null) {
      setName(_name)
    }
  }, [name])

  return (
    <div className={cn("flex flex-col items-center", className)}>
      {header && <h1 className={'pl-3 pr-3 rounded-md text-3xl mb-8'}>Quaternions From Scratch</h1>}
      <div className="flex gap-6 justify-center text-lg">
        <LinkButton href="/articles/quats-from-scratch/" selected={name == ''}>Intro</LinkButton>
        <LinkButton href="/articles/quats-from-scratch/0" selected={name == '0'}>0</LinkButton>
        <LinkButton href="/articles/quats-from-scratch/1" selected={name == '1'}>1</LinkButton>
        <LinkButton href="/articles/quats-from-scratch/2" selected={name == '2'}>2</LinkButton>
        <LinkButton href="/articles/quats-from-scratch/3" selected={name == '3'}>3</LinkButton>
        <LinkButton href="/articles/quats-from-scratch/4" selected={name == '4'}>4</LinkButton>
        {/* <LinkButton href="/articles/quats-from-scratch/outro" selected={selected == 'outro'}>Outro</LinkButton> */}
      </div>
      {(!header) && <BmcButton></BmcButton>}
    </div>
  )
}

function LinkButton({ children, href, selected }
  : {
    children: string
    href: string
    selected: boolean
  }) {
  return (
    <button
      className={cn(
        'pl-3 pr-3 rounded-md',
        selected ? 'border border-gray-300 bg-white' : '',
        'cursor-pointer'
      )}
      onClick={() => window.location.href = href}
    >
      {children}
    </button>
  )
}
