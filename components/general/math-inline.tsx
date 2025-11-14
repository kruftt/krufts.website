const escapes = /(\\|\(|\))/g 

export default function MathInline(
  { children }:
    { children: string }
) {
  return (
    <span>{ "\\(" + children + "\\)" }</span>
  )
}
