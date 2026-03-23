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
              In recent explorations of Unity's "Data-Oriented Technology Stack" (DOTS), I implemented a set of modular and performant systems using several core ECS architectural patterns. To test these systems, I built a demo in which the user can push around 10,000 animated, colored dots that are otherwise attracted toward the center of the screen.
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
              The performance advantages of the ECS architecture come from caching and parallelization benefits. The idea is to reduce cache misses (by accessing contiguous regions of memory) and to take as much work off the main thread as possible (by leveraging the job system and the Burst compiler). Even in this simple case of controlling 10,000 animations, the nature of the architectural benefits are apparent in the profiler.
            </p>
            <p>
              These slides depict a 4-step sequence:
              <ul className="mt-2 ml-8 list-disc">
                <li>A naive implementation (1.5ms)</li>
                <li>A naive implementation using the Burst compiler (0.3ms)</li>
                <li>A parallelized job (0.01ms main thread, 0.1ms worker threads)</li>
                <li>A parallelized job with Burst (0.01ms main thread, 0.02ms worker threads)</li>
              </ul>
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