import ArticleHeader from "@/components/portfolio/article-header"

const data: ArticleData = {
  title: 'Lightbox',
  tags: ['webdev', 'edu'],
  links: [['Demo', 'https://ccrma.stanford.edu/~doucette/lights/']],
  Component
};

function Component() {
  return (
    <article>
      <ArticleHeader article={data}>
        The Lightbox
      </ArticleHeader>
      <section>
        <div>
          <p>
            While studying visual perception I created a small webpage using javascript and SVG to help demonstrate how our visual
            systems take into account lighting information during color perception.
          </p>
        </div>
        <div>
          <img src="img/lights.jpg" alt="The Lightbox" />
        </div>
      </section>
    </article>
  )
}

export default data