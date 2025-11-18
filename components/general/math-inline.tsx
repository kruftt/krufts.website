import dynamic from 'next/dynamic'

const MathJax = dynamic(() => import('better-react-mathjax').then((mod) => mod.MathJax), { ssr: false })

export default function MathInline(
  { children, dynamic }:
    { children: string, dynamic?: boolean }
) {
  return (
    <MathJax inline={true} dynamic={dynamic}>
      { "\\(" + children + "\\)" }
    </MathJax>
  )
}
