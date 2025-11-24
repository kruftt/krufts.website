declare module "*.md"

interface TagData {
  name: string
  articles: string[]
  color: string
}

interface ArticleData {
  title: string
  tags: string[]
  links: [string, string][]
  Component: JSX.Element
}

interface PortfolioState {
  articles: Record<string, ArticleData>
  tags: Record<string, TagData>

  articleList: string[]

  selectedTags: Record<string, boolean>
  indicators: Record<string, Record<string, string>>
}

type PortfolioAction = {
  type: 'tag_toggle'
  tag: string
} 
