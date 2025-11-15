import { cn } from "@/lib/utils"
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
    <div className="flex flex-col items-center mt-12">
      { header && <h1 className={'pl-3 pr-3 rounded-md text-3xl'}>Quaternions From Scratch</h1> }
      <div className="flex gap-6 justify-center mt-6 mb-6">
        <LinkButton href="/articles/quats-from-scratch/" selected={selected == ''}>Intro</LinkButton>
        <LinkButton href="/articles/quats-from-scratch/0" selected={selected == '0'}>0</LinkButton>
        <LinkButton href="/articles/quats-from-scratch/1" selected={selected == '1'}>1</LinkButton>
        <LinkButton href="/articles/quats-from-scratch/2" selected={selected == '2'}>2</LinkButton>
        <LinkButton href="/articles/quats-from-scratch/3" selected={selected == '3'}>3</LinkButton>
        <LinkButton href="/articles/quats-from-scratch/4" selected={selected == '4'}>4</LinkButton>
      </div>
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
    <div className="mt-10">
      <h2 className="text-center m-auto text-3xl">
        {title}
      </h2>
      <h3 className="text-center m-auto text-l mb-4">
        <i>{subtitle}</i>
      </h3>
    </div>
  )
}