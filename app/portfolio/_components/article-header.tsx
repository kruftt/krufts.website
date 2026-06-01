import type { ArticleData } from "../_types";

export function ArticleHeader(
  { article, children }:
  { article: ArticleData }
  & React.ComponentProps<'div'>
) {
  return (
    <div className="text-center">
      <div className="m-auto max-w-2/5 text-3xl mt-4 flex justify-center mb-4">
        { children }
      </div>
      <nav>
        <ul className="link_list mb-4">
          { article.links.map(([text, target]) =>
            <li key={text}><a href={target} className="text-teal-800 text-lg font-semibold">{text}</a></li>
          )}
        </ul>
      </nav>
    </div>
  )
}