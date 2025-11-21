import dynamic from "next/dynamic"
import { cn } from "@/lib/utils"

const MathJax = dynamic(() => import('better-react-mathjax').then((mod) => mod.MathJax), { ssr: false })

export default function MathBlock(
  { children, inline = true, className = '' }:
    { children: string | string[], inline?: boolean, className?: string }
) {

  if (!(children instanceof Array)) {
    children = [children]
  }

  const lines = children.map((statement, i) =>
    inline
      ? <span key={i}>{"\\(" + statement + "\\)"}</span>
      : <span key={i}>{ "\\[" + statement + "\\]" }</span>
  )

  return (
    <MathJax className={cn("mt-4 mb-6", className)} inline={false}>
      <div className={'flex flex-col items-center'}>
        {lines}
      </div>
    </MathJax>
  )
}
