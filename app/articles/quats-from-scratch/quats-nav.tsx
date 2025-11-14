
export default function QuatsNav({

}) {
  return (
    <div className="flex gap-6 justify-center">
      <a className="text-black" href="/articles/quats-from-scratch/">Intro</a>
      <a className="text-black" href="/articles/quats-from-scratch/0">0</a>
      <a className="text-black" href="/articles/quats-from-scratch/1">1</a>
      <a className="text-black" href="/articles/quats-from-scratch/2">2</a>
      <a className="text-black" href="/articles/quats-from-scratch/3">3</a>
      <a className="text-black" href="/articles/quats-from-scratch/4">4</a>
      <a
        className="target:text-blue-500"
        id="index.html"
        href="/articles/quats-from-scratch/4"
      >
        test
      </a>
    </div>
  )
}