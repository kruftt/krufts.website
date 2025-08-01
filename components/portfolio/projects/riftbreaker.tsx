import ArticleHeader from "@/components/portfolio/article-header"
import { SectionTabs, SectionTabsContent } from "@/components/portfolio/article-tabs"

const data: ArticleData = {
  title: 'Riftbreaker',
  tags: ['gamedev', 'webdev'],
  links: [
    ['Github', 'https://github.com/kruftt/rb-reference'],
    ['RB-Reference', 'https://kruftt.github.io/rb-reference/'],
    ['Nexus Mods', 'https://www.nexusmods.com/theriftbreaker/users/102065808?tab=user+files']
  ],
  Component
};

function Component() {
  return (
    <article>
      <ArticleHeader article={data}>
        <img className="h-20" src="img/riftbreaker.png" alt="The Riftbreaker" />
      </ArticleHeader>
      <SectionTabs tabs={['Mods', 'RB-Reference']}>
        <SectionTabsContent value='Mods'>
          <div>
            In 2021 I developed <a href="https://www.nexusmods.com/theriftbreaker/users/102065808?tab=user+files">mods</a> for <a href="https://www.riftbreaker.com">The RiftBreaker</a> by Exor Studios, which uses their own C++/Lua game engine. I helped the modding community reverse-engineer the game's entity and event systems and shared several <a href="https://ccrma.stanford.edu/~doucette/gaming/code/entity_parser.py">utility scripts</a>, written in Python, to help mod authors. My final project was a parameterized script that could generate difficulty configurations (and the corresponding enemy spawn logic files) capable of completely rebalancing the entire game in one fell swoop.
          </div>
          <div className="mt-4">
            <img
              className="m-auto"
              src="img/riftbreaker.jpg"
              alt="One of my mods allowed storage units to criss-cross pipes, a commonly requested feature."
            />
          </div>
        </SectionTabsContent>
        <SectionTabsContent value='RB-Reference'>
          <div>
            I also created the <a href="https://kruftt.github.io/rb-reference/">RiftBreaker Reference</a>, a web-based tool for browsing extracted game data. It included a user-requested economy feature which allowed users to view resource and energy statistics associated with custom builds, going far beyond what was possible by using the wiki!
          </div>
          <div className="mt-4">
            <img className="m-auto" src="img/rb-reference.jpg" alt="The Riftbreaker Reference" />
          </div>
        </SectionTabsContent>
      </SectionTabs>
    </article>
  )
}

export default data