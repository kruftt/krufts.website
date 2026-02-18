import ArticleHeader from "@/components/portfolio/article-header"
import { SectionTabs, SectionTabsContent } from "@/components/portfolio/article-tabs"
// import JsdImage from "@/components/general/jsdelivr-image";
import { ArticleCarousel, CarouselItem } from "@/components/portfolio/article-carousel"
// import { QuatsCycle } from "@/components/quats/quats-cycle";
import YoutubeWrapper from "@/components/portfolio/youtube-wrapper";

const data: ArticleData = {
  title: 'Unity DOTS',
  tags: ['gamedev'],
  links: [['Github', 'https://github.com/kruftt/DOTS/']],
  Component
};

function Component() {
  return (
    <article>
      <ArticleHeader article={data}>
        Unity DOTS Demo
      </ArticleHeader>
      <SectionTabs tabs={['Particle Demo', 'Profiler']}>
        <SectionTabsContent value='Particle Demo'>
          <section>
            <p>
              In recent explorations of Unity's "Data-Oriented Technology Stack", also known as DOTS, I implemented a set of modular and performant systems using several core ECS architectural patterns. To test these systems, I built a demo in which the user can push around 10,000 animated, colored dots that are otherwise attracted toward the center of the screen.
            </p>
            <p>
              In order to achieve this result, I combined Unity's DOTS framework with the Low-Level 2D Physics API (Box2D) to build high-performance animation and physics systems. This included shader-driven animations, prefab instantiation, entity lifecycle management, and Physics API integration. Key systems aggregate forces from multiple sources and batch their application across all bodies in a single API call, with force and transform state synchronized between the Entity and Physics worlds using vectorizable, contiguous memory operations.
            </p>
            <br />
            <div>
              <YoutubeWrapper url="https://www.youtube.com/embed/a__qk5VGZd4?si=3oJh4CMqQaniafnd" />
            </div>
          </section>
        </SectionTabsContent>
        <SectionTabsContent value='Profiler'>
          <section>
            <p>
              The primary performance advantages of an ECS architecture come from the caching and parallelization benefits. The general idea is to reduce cache misses (by accessing contiguous regions of memory) and to take as much work off the main thread as possible (by leveraging the job system and the Burst compiler). Even in the fairly simple case of controlling 10,000 animations by writing to shader parameters, the nature of the architectural benefits are apparent in the profiler.
            </p>
            <p>
              These slides depict a 4-step sequence: first, showing a naive implementation of a "Flipbook Animation", second, the same implementation but Burst compiled, third, as a parallelized job without Burst, and finally, as a parallelized job with Burst. The runtime in the single threaded version drops from 1.5ms to 0.3ms with Burst, and then down to under 0.01ms when the main thread is only scheduling jobs. The parallelized job without burst ran in approximately 0.1ms, while with Burst it collapsed down to under 0.02ms.
            </p>
            <p>
              Since this system does not need to make any structural changes to entities, the benefits of the Burst compiler and parallelization are relatively transparent. I.e. there is no need to write to an Entity Command Buffer from the worker threads and then to replay the buffer back on the main thread, so we're not paying a hidden cost later during the replay a command buffer system.
            </p>
            <br />
            <ArticleCarousel>
              <CarouselItem>
                <p className="text-center">The unoptimized implementation takes 1.5ms:</p>
                <img className="m-auto max-h-200" src="/img/profile_1.png" alt="Mod Effect Graphs" />
                <br />
                <img className="m-auto max-h-200" src="/img/code_1.png" alt="Mod Effect Graphs" />
              </CarouselItem>
              <CarouselItem>
                <p className="text-center">Enabling the Burst compiler lowers this to 0.3ms:</p>
                <img className="m-auto max-h-200" src="/img/profile_2.png" alt="Mod Effect Graphs" />
                <br />
                <img className="m-auto max-h-200" src="/img/code_2.png" alt="Mod Effect Graphs" />
              </CarouselItem>
              <CarouselItem>
                <p className="text-center">Switching to a job leaves only 0.012ms of work on the main thread, and 0.1ms of work is done on worker threads:</p>
                <img className="m-auto max-h-200" src="/img/profile_3.png" alt="Mod Effect Graphs" />
                <br />
                <img className="m-auto max-h-200" src="/img/code_3.png" alt="Mod Effect Graphs" />
              </CarouselItem>
              <CarouselItem>
                <p className="text-center">Changing the job to be Burst compiled lowers the worker thread runtime to under 0.02ms:</p>
                <img className="m-auto max-h-200" src="/img/profile_4.png" alt="Mod Effect Graphs" />
                <br />
                <img className="m-auto max-h-200" src="/img/code_4.png" alt="Mod Effect Graphs" />
              </CarouselItem>
            </ArticleCarousel>
          </section>
        </SectionTabsContent>
      </SectionTabs>
    </article>
  )
}

export default data