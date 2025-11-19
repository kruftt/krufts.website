'use client'

export default function JsdImage({ src, className, alt, id } : {
  alt: string,
  src: string,
  className?: string,
  id?: string
}) {
  return (
    <img
      src={process.env.NODE_ENV === "development" ? "/img/" + src : 'https://cdn.jsdelivr.net/gh/kruftt/krufts.website@images/' + src }
      className={className}
      alt={alt}
      id={id}
    />
  )
}
