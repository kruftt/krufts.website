import dynamic from 'next/dynamic'

const MathJax = dynamic(() => import('better-react-mathjax').then((mod) => mod.MathJax), { ssr: false })

export default function MathInline(
  { children }:
    { children: string }
) {
  return (
    <MathJax inline={true}>
      { "\\(" + children + "\\)" }
    </MathJax>
  )
}
