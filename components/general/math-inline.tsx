import dynamic from 'next/dynamic'

const MathJax = dynamic(() => import('better-react-mathjax').then((mod) => mod.MathJax), { ssr: false })

export default function MathInline(
  { className, children, dynamic }:
    { className?: string, children: string, dynamic?: boolean }
) {
  return (
    <MathJax inline={true} dynamic={dynamic} className={className}>
      { "\\(" + children + "\\)" }
    </MathJax>
  )
}
