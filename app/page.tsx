export default function Home() {
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <div className="max-w-4xl m-auto text-center">
          <p>
            Welcome to Kruft's personal Website.
          </p>

          <p>
            This site is under construction and currently contains the following pages:
          </p>

          <ul className="mt-8 mb-8 text-sky-700">
            <li><a href="/articles/quats-from-scratch/">Quaternions From Scratch</a></li>
          </ul>

          <p>
            Check back later for more!
          </p>
        </div>
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
      </footer>
    </div>
  );
}
