import { useContext } from "react"
import TagButton from "./tag-button"
import { PortfolioDispatch, PortfolioState } from '@/app/portfolio/reducer'

export default function ArticleHeader(
  { article, children }:
  { article: ArticleData }
  & React.ComponentProps<'div'>
) {
  const dispatch = useContext(PortfolioDispatch)!
  const state = useContext(PortfolioState)!

  return (
    <div className="text-center">
      <div className="m-auto max-w-2/5 text-3xl mt-4 flex justify-center">
        { children }
      </div>
      <ul className="flex gap-2 justify-center mt-6 mb-4">
        { article.tags.map((tagName) =>
          <li key={tagName}>
            <TagButton
              tag={state.tags[tagName]}
              selected={state.selectedTag === tagName}
              toggle={() => dispatch({ type: 'tag_toggle', tag: tagName })}
            />
          </li>
        )}
      </ul>
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