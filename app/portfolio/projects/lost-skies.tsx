import ArticleHeader from "@/components/portfolio/article-header"
import { SectionTabs, SectionTabsContent } from "@/components/portfolio/article-tabs"

const data: ArticleData = {
  title: 'Lost Skies',
  tags: ['gamedev'],
  links: [['Github', 'https://github.com/kruftt/LostSkiesMods/'],
   ['Thunderstore', 'https://thunderstore.io/c/lost-skies/p/kruft/']],
  Component
};

function Component() {
  return (
    <article>
      <ArticleHeader article={data}>
        <a href="https://lostskiesgame.com">
          <img src="/img/lostskies.png" alt="Lost Skies" />
        </a>
      </ArticleHeader>
      <SectionTabs tabs={['Overview', 'Point to Interact', 'Infested Bunker']}>
        <SectionTabsContent value='Overview'>
          <section>
            <p>
              A friend of mine is working on a forthcoming survival-craft game called <a href="https://lostskiesgame.com">Lost Skies</a>. I helped initiate a modding community by authoring several mods while documenting my code, workflow, and project configuration for others. This included setting up a C# build environment and writing a custom <a href="https://github.com/kruftt/ThunderstoreAdapter">msbuild task library</a> for compiling mods and packaging them for distribution on <a href="https://thunderstore.io">thunderstore.io</a>.
            </p>
            <p>
              In early development the game was built on a Mono C# backend, but switched to an IL2CPP (Internal Language to C++) backend on the Early Access launch in order to enhance security. While this made reverse-engineering and modding significantly more difficult (by preventing decompilation and/or transpilation of the IL assemblies), it gave me an opportunity to learn about the IL2CPP compiler and to explore methods of reverse-engineering native assemblies, such as using tools like Ghidra or IDA pro.
            </p>
          </section>
          <div className="text-center mt-8">
            <img src="/img/il2cpp_light.jpg" alt="Unity IL2CPP" className="m-auto" />
          </div>
        </SectionTabsContent>
        <SectionTabsContent value='Point to Interact'>
          <section>
            <p>
              One mod I authored, entitled <a href="https://github.com/kruftt/LostSkiesMods/blob/main/PointToInteract/src/Patch.cs">Point To Interact</a>, improves 3d object selection. By default, every in-game frame uses a spherical collider to detect interactables around the player and displays them in a scrollable list that is navigable with a mousewheel or a controller's d-pad. However, this system feels unintuitive when using a mouse since pointing at an object doesn't guarantee it will be selected.
            </p>
            <p>
              To address this I used a raycast from the camera to the cursor, filtering  out the results of the proximity check. If no interactable is under the cursor it falls back to the default behavior. This significantly improves the functionality, especially in common cluttered scenarios such as selecting between adjacent storage cabinets.
            </p>
          </section>
          <div className="text-center mt-8">
            <a href="https://thunderstore.io/c/lost-skies/p/kruft/Point_To_Interact/">
              <img className="m-auto" src="/img/point_to_interact.jpg" alt="Point To Interact" />
            </a>
          </div>
        </SectionTabsContent>
        <SectionTabsContent value='Infested Bunker'>
          <section>
            <p>
              In addition to mods, I also created an "Island" for Lost Skies called <i>Infested Bunker</i>. Lost Skies is set in the remains of a shattered world consisting of floating islands and supports user-made islands via an island authoring tool, similar to level editors from other games. <i>Infested Bunker</i> features a series of simple puzzles that unlock a fortified bunker in the middle of a patchy, spherical land mass. Building it involved the creative use of volumetric terrain generation, a limited set of assets, and game logic scripts.
            </p>
          </section>
          <div className="text-center mt-4">
            <a href="https://steamcommunity.com/sharedfiles/filedetails/?id=3439823150">
              Steam Workshop: Infested Bunker
            </a>
            <a href="https://steamcommunity.com/sharedfiles/filedetails/?id=3439823150">
              <img src="/img/infested_bunker.jpg" alt="Steam Workshop: Infested Bunker" />
            </a>
          </div>
        </SectionTabsContent>
      </SectionTabs>
    </article>
  )
}

export default data