import ArticleHeader from "@/components/portfolio/article-header"
import { SectionTabs, SectionTabsContent } from "@/components/portfolio/article-tabs"
// import JsdImage from "@/components/general/jsdelivr-image";
import { ArticleCarousel, CarouselItem } from "@/components/portfolio/article-carousel"
// import { QuatsCycle } from "@/components/quats/quats-cycle";
import YoutubeWrapper from "@/components/portfolio/youtube-wrapper";

const data: ArticleData = {
  title: 'Unity DOTS',
  tags: ['gamedev'],
  links: [],
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
              In recent explorations of Unity's "Data-Oriented Technology Stack", also known as DOTS, I've been building a small Entity-Component-System library for future projects. Here I've built a demo in which the user can push around 10,000 animated, colored dots that are attracted toward the center of the screen.
            </p>
            <p>
              In order to achieve this effect, I combined Unity's ECS framework with the freshly released Low-Level 2D Physics API, built on the Box2D v3 physics library. I authored several generic, modular ECS systems from scratch, including systems for shader-powered animations, prefab instantiation and initialization, entity lifetime management, and integration with the 2D Physics API, including batch copying of forces and transforms between the Entity and Physics worlds.
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
              The main performance advantages of using an ECS architecture are the caching and parallelization benefits. The general idea is to reduce cache misses and to take as much work off the main thread as possible. Even in the rather simple case of controlling 10,000 animations by writing to a shader parameter, the nature of the architectural benefits is apparent in the profiler.
            </p>
            <p>
              This sequence depicts shifting from a naive "flipbook" animation implementation, to being Burst compiled, and then to being rewritten as a parallelized job without Burst, and finally as a parallelized job with Burst. The runtime in the main thread drops from 1.5ms to 0.3ms with Burst, and then down to under 0.01ms when scheduling jobs. The parallelized job without burst ran in approximately 0.1ms, while with Burst it collapsed down to under 0.02ms.
            </p>
            <p>
              Since this system does not need to make any structural changes to entities, it benefits from jobs especially well. I.e. there is no need to write to an Entity Command Buffer from the worker threads and then to replay the buffer back on the main thread, so in this case the performance benefits are genuine and transparent:
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