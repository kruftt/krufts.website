import MathInline from "./math-inline"

export default function MathBlock(
  { children }:
    { children: string[] }
) {

  const lines = children.map((statement) => <MathInline>statement</MathInline>)

  return (
    <div className={'flex flex-col'}
    >
      {lines}
    </div>
  )
}
