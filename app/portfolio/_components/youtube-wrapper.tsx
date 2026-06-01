export default function YoutubeWrapper(
  { className, url }: { className?: string, url: string }
) {
  return (
    <div className={`w-1/1 ${className}`}>
      <div className="relative h-0" style={{ paddingBottom: '56.25%' }}>
        <iframe
          className="absolute top-0 left-0 w-1/1 h-1/1"
          src={url} title="YouTube video player" frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin" allowFullScreen>
        </iframe>
      </div>
    </div>
  )
}
