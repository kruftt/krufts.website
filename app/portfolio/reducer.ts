import { createContext, useReducer, ActionDispatch } from "react"
import projects from "@/components/portfolio/projects"


function generate(): PortfolioState {
  const indicators: Record<string, Record<string, string>> = {};
  for (const title of projects.articleList) {
    const colors: Record<string, string> = {}
    const article = projects.articles[title]
    let tagName
    for (tagName of Object.keys(projects.tags)) {
      colors[tagName] = 'transparent'
    }
    for (tagName of article.tags) {
      colors[tagName] = 'bg-gray-200'
    }
    indicators[title] = colors
  }

  return {
    ...projects,
    indicators,
    selectedTags: {}
  }
}

function reducer(state: PortfolioState, action: PortfolioAction): PortfolioState {
  switch (action.type) {
    case 'tag_toggle': {
      const name = action.tag
      const tag = state.tags[name]
      
      const selectedTags = {
        ...state.selectedTags,
        [name]: !state.selectedTags[name]
      }

      const indicators: Record<string, Record<string, string>> = {
        ...state.indicators
      };
      
      for (const title of tag.articles) {
        const colors: Record<string, string> = {
          ...indicators[title],
          [name]: selectedTags[name]
            ? tag.color || 'bg-gray-600'
            : 'bg-gray-200'
        }
        indicators[title] = colors
      }

      return {
        ...state,
        indicators,
        selectedTags
      }
    }

    default:
      return state;
  }
}

export function usePortfolio() {
  return useReducer(reducer, generate())
}

export const PortfolioState = createContext<null|PortfolioState>(null);
export const PortfolioDispatch = createContext<null|ActionDispatch<[action:PortfolioAction]>>(null);
