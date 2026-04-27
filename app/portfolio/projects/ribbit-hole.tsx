import ArticleHeader from "@/components/portfolio/article-header"
import { ArticleCarousel, CarouselItem } from "@/components/portfolio/article-carousel"

const data: ArticleData = {
  title: 'Ribbit Hole',
  tags: ['music', 'webdev'],
  links: [
    ['Project Page', 'https://ccrma.stanford.edu/~doucette/220b/final/final.html'],
  ],
  Component
};

function Component() {
  return (
    <article>
      <ArticleHeader article={data}>
        The Ribbit Hole
      </ArticleHeader>
      <div>
        <p>
          I created a social, interactive art installation that combined web and mobile technologies. Participants used their phones to control an immersive soundscape and an accompanying visualization. The interface was implemented with SVG and provided low latency, collective control of the sounds and visuals, which were implemented in ChucK and Processing respectively. Set at nighttime around a local lake, users could toggle arpeggiators by tapping the street lamps, or trigger 3D spatialized frog ribbits by clicking locations within the lake. I wrote both the synthesizers and shaders in order to bring the experience to life.
        </p>
        <br />
        <audio className="m-auto" controls>
          <source src="https://ccrma.stanford.edu/~doucette/220b/final/output16.wav" type="audio/wav" />
            Your browser does not support the audio tag.
        </audio>
      </div>
      <ArticleCarousel>
        <CarouselItem>
          <div className="text-center">Snapshot of <i>The Ribbit Hole</i></div>
          <img src="/img/snapshot1.jpg" alt="The Ribbit Hole" />
        </CarouselItem>
        <CarouselItem>
          <div className="text-center">SVG Interface (inactive)</div>
          <svg display="none" viewBox="0 0 150 100">
            <circle cx="16" cy="26" r="6" fill="#333333" stroke="#000000" style={{ strokeWidth: 1 }}></circle>
            <circle cx="32" cy="22" r="6" fill="#333333" stroke="#000000" style={{ strokeWidth: 1 }}></circle>
            <circle cx="48" cy="20" r="6" fill="#333333" stroke="#000000" style={{ strokeWidth: 1 }}></circle>
            <circle cx="64" cy="19" r="6" fill="#333333" stroke="#000000" style={{ strokeWidth: 1 }}></circle>
            <circle cx="80" cy="19" r="6" fill="#333333" stroke="#000000" style={{ strokeWidth: 1 }}></circle>
            <circle cx="96" cy="20" r="6" fill="#333333" stroke="#000000" style={{ strokeWidth: 1 }}></circle>
            <circle cx="112" cy="22" r="6" fill="#333333" stroke="#000000" style={{ strokeWidth: 1 }}></circle>
            <circle cx="128" cy="26" r="6" fill="#333333" stroke="#000000" style={{ strokeWidth: 1 }}></circle>
            <ellipse cx="73" cy="55" rx="60" ry="24" fill="#333333" stroke="#000000" style={{ strokeWidth: 1 }}></ellipse>
          </svg> 
        </CarouselItem>
      </ArticleCarousel>
    </article>
  )
}

export default data