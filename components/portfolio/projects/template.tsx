import ArticleHeader from "@/components/portfolio/article-header"
import { ArticleCarousel, CarouselItem } from "@/components/portfolio/article-carousel"
import { SectionTabs, SectionTabsContent } from "@/components/portfolio/article-tabs"

const data: ArticleData = {
  title: 'MyProject',
  tags: ['tags'],
  links: [['Github', 'https://github.com/kruftt/']],
  Component
};

function Component() {
  return (
    <article>
      <ArticleHeader article={data}>
        MyProject
      </ArticleHeader>
      <SectionTabs tabs={['One', 'Two']}>
        <SectionTabsContent value='One'>
        </SectionTabsContent>
        <SectionTabsContent value='Two'>
          <ArticleCarousel>
            <CarouselItem>
              one
            </CarouselItem>
          </ArticleCarousel>
        </SectionTabsContent>
      </SectionTabs>
    </article>
  )
}

export default data