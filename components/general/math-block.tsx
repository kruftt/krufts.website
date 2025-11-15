import dynamic from "next/dynamic"

const MathJax = dynamic(() => import('better-react-mathjax').then((mod) => mod.MathJax), { ssr: false })

export default function MathBlock(
  { children, inline = true }:
  { children: string | string[], inline?: boolean }
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
    <MathJax className="mt-4 mb-6" inline={false}>
      <div className={'flex flex-col items-center'}>
        {lines}
      </div>
    </MathJax>
  )
}
