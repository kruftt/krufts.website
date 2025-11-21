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
    <div className="mt-10 mb-6">
      <h2 className="text-center m-auto text-3xl">
        {title}
      </h2>
      <h3 className="text-center m-auto text-l mt-1">
        <i>{subtitle}</i>
      </h3>
    </div>
  )
}
