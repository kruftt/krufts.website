'use client'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/portfolio/portfolio-tabs"
import { usePortfolio, PortfolioDispatch, PortfolioState } from "./reducer"
import TagButton from "@/components/portfolio/tag-button"
import { useEffect, useState } from "react"


export default function Portfolio () {
  const [state, dispatch] = usePortfolio()
  const [tab, changeTab] = useState(state.articleList[0])
  const [updating, changeUpdating] = useState(false)
  
  useEffect(() => {
    // addEventListener("hashchange", updateSelection)
    addEventListener("popstate", updateSelection)
    updateSelection();
  }, [])

  function updateSelection() {
    const articleName = window.location.hash.slice(1).replaceAll('-', ' ')
    const index = state.articleList.indexOf(articleName)
    if (index === -1) {
      // changeTab(state.articleList[0])
      // updateHash(state.articleList[0])
    } else {
      changeTab(articleName)
      changeUpdating(true) // updateHash gives wrong value
    }
  }

  function updateHash(articleName: string) {
    if (updating) {
      changeUpdating(false)
      return
    }
    
    // window.history.pushState({}, '', '#' + articleName.replaceAll(' ', '-'))
    window.location.hash = '#' + articleName.replaceAll(' ', '-')
    changeTab(articleName)
  }
  
  return (
    <PortfolioState value={state}>
      <PortfolioDispatch value={dispatch}>
        <section className="mt-8">
          <div className="text-center">
            <h3 className="text-4xl">Marc Doucette</h3>
            <h4 className="text-xl">Educator and Software Developer</h4>
            {/* <h4 className="text-xl">Game and Web Developer</h4> */}
            <h4 className="text-base">
              <a href="mailto:marc.t.doucette@gmail.com">marc.t.doucette@gmail.com</a>
            </h4>
          </div>
          <div className="text-center flex gap-1 justify-center mt-10 mb-8">
            {
              Object.values(state.tags).map((tag) =>
                <TagButton
                  key={tag.name}
                  tag={tag}
                  selected={state.selectedTags[tag.name]}
                  toggle={() => dispatch({ type: 'tag_toggle', tag: tag.name })}
                /> 
              )
            }
          </div>
        </section>
        <Tabs
          // defaultValue={defaultValue}
          value={tab}
          className="min-h-200 mb-20"
          onValueChange={updateHash}
        >
          <TabsList>
            {
              state.articleList.map((title) =>
                <TabsTrigger
                  key={title}
                  value={title}
                  indicators={state.indicators[title]}
                />
              )
            }
          </TabsList>
          { 
            state.articleList.map((title) => {
              const Component = state.articles[title].Component
              return (
                <TabsContent key={title} value={title}>
                  <Component />
                </TabsContent>
              )
            })
          }
        </Tabs>
      </PortfolioDispatch>
    </PortfolioState>
  )
}
