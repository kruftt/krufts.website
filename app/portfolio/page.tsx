'use client'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/portfolio/portfolio-tabs"
import { usePortfolio, PortfolioDispatch, PortfolioState } from "./reducer"
import TagButton from "@/components/portfolio/tag-button"
import { useEffect, useState } from "react"


export default function Portfolio () {
  const [state, dispatch] = usePortfolio()
  const [tab, changeTab] = useState(state.articleList[0])
  
  useEffect(() => {
    const hash = window.location.hash.slice(1).replaceAll('-', ' ')
    const index = state.articleList.indexOf(hash)
    if (index !== -1) changeTab(hash)
  }, [state.articleList])

  function updateHash(articleName: string) {
    window.location.hash = articleName.replaceAll(' ', '-')
    changeTab(articleName)
  }
  
  return (
    <PortfolioState value={state}>
      <PortfolioDispatch value={dispatch}>
        <section>
          <div className="text-center mt-12">
            <h3 className="text-4xl">Marc Doucette</h3>
            <h4 className="text-xl">Software Developer and Educator</h4>
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
