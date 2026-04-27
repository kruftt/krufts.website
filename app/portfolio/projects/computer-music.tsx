import ArticleHeader from "@/components/portfolio/article-header"
import { ArticleCarousel, CarouselItem } from "@/components/portfolio/article-carousel"
import { SectionTabs, SectionTabsContent } from "@/components/portfolio/article-tabs"
import YoutubeWrapper from "@/components/portfolio/youtube-wrapper";


const data: ArticleData = {
  title: 'RT Audio',
  tags: ['gamedev', 'music', 'webdev'],
  links: [
    ['AIME', 'https://ccrma.stanford.edu/~doucette/220c/#final'],
    ['The Ribbit Hole', 'https://ccrma.stanford.edu/~doucette/220b/final/final.html'],
  ],
  Component
};

function Component() {
  return (
    <article>
      <ArticleHeader article={data}>
        Computer Music
      </ArticleHeader>
      <SectionTabs tabs={[
        'An Interactive Music Environment',
        'The Ribbit Hole',
      ]}>
        <SectionTabsContent value='An Interactive Music Environment'>
          <div>
            <p>
              For a <a href="https://ccrma.stanford.edu/courses/220c/">seminar in Computer Music</a>, I created a Unity scene in which game entities controlled realtime audio synthesizers that were written in a signal processing language called <a href="https://chuck.cs.princeton.edu">ChucK</a>. My favorite to play with was the "Granular Torch", a particle emitter in which the height of the particles corresponded to playback positions in an audio signal, such that as the flame particles moved in space the audio signal was traversed/played. I thought it would be fun to extend it in the future to play different audio signals at different horizontal locations.
            </p>
          </div>
          <div>
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
          </div>
        </SectionTabsContent>


        <SectionTabsContent value='The Ribbit Hole'>
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
        </SectionTabsContent>
      </SectionTabs>
    </article>
  )
}

export default data