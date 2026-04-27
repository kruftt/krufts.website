import { SectionTabs, SectionTabsContent } from "@/components/portfolio/article-tabs"
import Apollo from './apollo'
import Riftbreaker from "./riftbreaker";

const data: ArticleData = {
  title: 'Game Mods',
  tags: ['gamedev', 'webdev'],
  links: [

  ],
  Component
};

function Component() {
  return (
    <article>
      <h1 className="text-center text-3xl">
        Game Mods
      </h1>
      <SectionTabs tabs={['Hades', 'The Riftbreaker']}>
        <SectionTabsContent value="Hades">
          <Apollo.Component></Apollo.Component>
        </SectionTabsContent>

        <SectionTabsContent value="The Riftbreaker">
          <Riftbreaker.Component></Riftbreaker.Component>
        </SectionTabsContent>
      </SectionTabs>
    </article>
  );
}

export default data