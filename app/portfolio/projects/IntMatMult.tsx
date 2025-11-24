import ArticleHeader from "@/components/portfolio/article-header"
import { ArticleCarousel, CarouselItem } from "@/components/portfolio/article-carousel"

const data: ArticleData = {
  title: 'Matrix Mult',
  tags: ['webdev', 'edu'],
  links: [['Github', 'https://github.com/kruftt/IntMatMult'],
          ['Demo', 'https://kruftt.github.io/IntMatMult']],
  Component
};

function Component() {
  return (
    <article>
      <ArticleHeader article={data}>
        Interactive Matrix Multiplication
      </ArticleHeader>
      <div>
        In order to help students visualize matrix multiplication I implemented an interactive web widget with Vue. Users can drag the vector arrowheads and see the result in real-time. A key feature for demonstration purposes is that making the matrix linearly dependent shows the null space solutions as a red line.
      </div>
      <ArticleCarousel>
        <CarouselItem>
          <img className="m-auto" src="/img/matrix_mult2.jpg" alt="Interactive Matrix Multiplication" />
        </CarouselItem>
        <CarouselItem>
          <img className="m-auto" src="/img/matrix_mult.jpg" alt="Null space solutions" />
        </CarouselItem>
      </ArticleCarousel>
    </article>
  )
}

export default data