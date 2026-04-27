import { SectionTabs, SectionTabsContent } from "@/components/portfolio/article-tabs"
import LostSkies from "./lost-skies";
import Valheim from './valheim'

const data: ArticleData = {
  title: 'Unity Mods',
  tags: ['gamedev'],
  links: [
    
  ],
  Component
};

function Component() {
  return (
    <article>
      <h1 className="text-center text-3xl">
        Unity Mods
      </h1>
      
      <SectionTabs tabs={['Lost Skies', 'Valheim']}>
        <br />
        <SectionTabsContent value="Lost Skies">
          {/* <ArticleHeader article={LostSkies}>Lost Skies</ArticleHeader> */}
          <LostSkies.Component></LostSkies.Component>
        </SectionTabsContent>

        <SectionTabsContent value="Valheim">
          {/* <ArticleHeader article={Valheim}>Valheim</ArticleHeader> */}
          <Valheim.Component></Valheim.Component>
        </SectionTabsContent>
      </SectionTabs>
    </article>
  );
}

export default data