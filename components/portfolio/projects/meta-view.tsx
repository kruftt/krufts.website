import ArticleHeader from "@/components/portfolio/article-header"
import { ArticleCarousel, CarouselItem } from "@/components/portfolio/article-carousel"

const data: ArticleData = {
  title: 'MetaView',
  tags: ['edu', 'webdev'],
  links: [['Github', 'https://github.com/kruftt/obsidian-metaview']],
  Component: MetaView
}

function MetaView({state}: {state:PortfolioState}) {
  return (
    <article>
      <ArticleHeader article={data}>
        MetaView
      </ArticleHeader>
      <section>
        <p>
          I am developing a plugin for the markdown-based note-taking app <a href="https://obsidian.md/">Obsidian</a> using the recently released <a href="https://svelte.dev">Svelte 5</a> frontend framework. Obsidian supports YAML metadata on notes. The Metaview plugin adds the ability to create metadata templates with predefined property names and types that can be added to notes in a composable manner. It also supports arbitrarily nested data, allowing more flexibility in how you store your metadata, among many other features.
        </p>
      </section>
      <ArticleCarousel >
        <CarouselItem>
          <img className="m-auto" src="img/metaview1.jpg" alt="Template configuration." />
        </CarouselItem>
        <CarouselItem>
          <img className="m-auto" src="img/metaview2.jpg" alt="Note editing" />
        </CarouselItem>
        <CarouselItem>
          <img className="m-auto" src="img/metaview3.jpg" alt="Nested Object Support" />
        </CarouselItem>
      </ArticleCarousel>
    </article>
  )
}

export default data