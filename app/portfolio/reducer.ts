import { createContext, useReducer, ActionDispatch } from "react"
import projects from "@/app/portfolio/projects"


function generate(): PortfolioState {
  const indicators: Record<string, Record<string, string>> = {};
  const selected: Record<string, boolean> = {
    'webdev': false,
    'gamedev': false,
    'edu': false,
    'music': false,
  }
  
  for (const title of projects.articleList) {
    const colors: Record<string, string> = {}
    // const article = projects.articles[title]
    let tagName
    for (tagName of Object.keys(projects.tags)) {
      colors[tagName] = 'transparent'
    }
    // for (tagName of article.tags) {
      // colors[tagName] = projects.tags[tagName].color
    //   colors[tagName] = 'bg-gray-200'
    // }
    indicators[title] = colors
  }

  return setIndicators({
    ...projects,
    indicators,
    selected,
  })
}

function setIndicators(state: PortfolioState) {
  const { articles, tags, selected } = state
  const indicators: Record<string, Record<string, string>> = {}
  
  for (const article of Object.values(articles)) {
    indicators[article.title] =
      Object.values(selected).reduce((anySelected, thisSelected) => anySelected || thisSelected, false)
        ?
          article.tags.reduce((indicators, tag) => {
            indicators[tag] = selected[tag] ? tags[tag].color : 'bg-gray-200'
            return indicators
          }, { ...(state.indicators[article.title]) } as Record<string, string>)
        :
          article.tags.reduce((indicators, tag) => {
            indicators[tag] = tags[tag].color
            return indicators
          }, { ...(state.indicators[article.title]) } as Record<string,string>)
      }

  state.indicators = indicators
  return state
}

function reducer(state: PortfolioState, action: PortfolioAction): PortfolioState {
  switch (action.type) {
    case 'tag_toggle':
      return setIndicators({
        ...state,
        selected: {
          'webdev': false,
          'gamedev': false,
          'edu': false,
          'music': false,
          [action.tag]: state.selected[action.tag] ? false : true
        }
        // selected: {
        //   ...state.selected,
        //   [action.tag]: !state.selected[action.tag]
        // }
      })

    default:
      return state;
  }
}

export function usePortfolio() {
  return useReducer(reducer, generate())
}

export const PortfolioState = createContext<null|PortfolioState>(null);
export const PortfolioDispatch = createContext<null|ActionDispatch<[action:PortfolioAction]>>(null);
