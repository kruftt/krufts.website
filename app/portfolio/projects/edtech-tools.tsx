import { SectionTabs, SectionTabsContent } from "@/components/portfolio/article-tabs"
import MetaView from "./meta-view";
import iQueue from './iQueue'

const data: ArticleData = {
  title: 'Edtech Tools',
  tags: ['edu', 'webdev'],
  links: [

  ],
  Component
};

function Component() {
  return (
    <article>
      <SectionTabs tabs={['MetaView', 'iQueue']}>
        <SectionTabsContent value="MetaView">
          {/* <ArticleHeader article={MetaView}>MetaView</ArticleHeader> */}
          <MetaView.Component></MetaView.Component>
        </SectionTabsContent>

        <SectionTabsContent value="iQueue">
          {/* <ArticleHeader article={iQueue}>iQueue</ArticleHeader> */}
          <iQueue.Component></iQueue.Component>
        </SectionTabsContent>
      </SectionTabs>
    </article>
  );
}

export default data