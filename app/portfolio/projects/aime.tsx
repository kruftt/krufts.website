import ArticleHeader from "@/components/portfolio/article-header"
import { ArticleCarousel, CarouselItem } from "@/components/portfolio/article-carousel"
import YoutubeWrapper from "@/components/portfolio/youtube-wrapper";

const data: ArticleData = {
  title: 'AIME',
  tags: ['gamedev', 'music'],
  links: [
    ['Project Page', 'https://ccrma.stanford.edu/~doucette/220c/#final']
  ],
  Component
};

function Component() {
  return (
    <article>
      <ArticleHeader article={data}>
        AIME: An Interactive Music Environment
      </ArticleHeader>
      <div>
        <p>
          For a <a href="https://ccrma.stanford.edu/courses/220c/">seminar in Computer Music</a> I created a Unity scene in which game entities controlled realtime audio synthesizers written in a signal processing language called <a href="https://chuck.cs.princeton.edu">ChucK</a>. My favorite base concept was the "Granular Torch", a particle emitter in which the height of the particles corresponded to playback positions in an audio signal, such that as the flame particles moved in space the audio signal was traversed/played.
        </p>
      </div>
      <ArticleCarousel>
        <CarouselItem>
          <YoutubeWrapper url="https://www.youtube.com/embed/95djFai0g3M" />
        </CarouselItem>
        <CarouselItem>
          <YoutubeWrapper url="https://www.youtube.com/embed/Clmu6Blo_E8" />
        </CarouselItem>
        <CarouselItem>
          <YoutubeWrapper url="https://www.youtube.com/embed/vOAQdsntKhM" />
        </CarouselItem>
      </ArticleCarousel>
    </article>
  )
}

export default data