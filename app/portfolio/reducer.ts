import { createContext, useReducer, ActionDispatch } from "react"
import projects from "@/app/portfolio/projects"


function generate(): PortfolioState {
  const indicators: Record<string, Record<string, string>> = {};
  // const selectedTags: Record<string, boolean> = {
  //   'webdev': true,
  //   'gamedev': true,
  //   'edu': true,
  //   'music': true,
  // }
  const selectedTag = ''

  for (const title of projects.articleList) {
    const colors: Record<string, string> = {}
    const article = projects.articles[title]
    let tagName
    for (tagName of Object.keys(projects.tags)) {
      // colors[tagName] = projects.tags[tagName].color
      colors[tagName] = 'transparent'
    }
    for (tagName of article.tags) {
      // colors[tagName] = 'bg-gray-200'
      colors[tagName] = projects.tags[tagName].color
    }
    indicators[title] = colors
  }

  return {
    ...projects,
    indicators,
    selectedTag,
  }
}

function reducer(state: PortfolioState, action: PortfolioAction): PortfolioState {
  switch (action.type) {
    case 'tag_toggle': {
      const _name = action.tag
      // const tag = state.tags[_name]
      
      const indicators: Record<string, Record<string, string>> = {
        // ...state.indicators
      };
      
      if (_name === state.selectedTag) {
        // toggle off // turn all on
        for (const article of Object.values(state.articles)) {
          indicators[article.title] = article.tags.reduce((prev, cur) => {
            prev[cur] = state.tags[cur].color
            return prev
          }, {
            'webdev': 'bg-gray-100',
            'gamedev': 'bg-gray-100',
            'edu': 'bg-gray-100',
            'music': 'bg-gray-100',
          } as Record<string, string>)
        }

        return {
          ...state,
          indicators,
          selectedTag: ''
        }

      } else {
        // toggling on
        // all off except this tag
        for (const article of Object.values(state.articles)) {
          indicators[article.title] = article.tags.reduce((prev, cur) => {
            prev[cur] = _name === cur ? state.tags[cur].color : 'bg-gray-200'
            return prev
          }, {
            'webdev': 'bg-gray-100',
            'gamedev': 'bg-gray-100',
            'edu': 'bg-gray-100',
            'music': 'bg-gray-100',
          } as Record<string, string>)
        }

        return {
          ...state,
          indicators,
          selectedTag: _name
        }
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
