import ArticleHeader from "@/components/portfolio/article-header"
import { ArticleCarousel, CarouselItem } from "@/components/portfolio/article-carousel"
import { SectionTabs, SectionTabsContent } from "@/components/portfolio/article-tabs"
import YoutubeWrapper from "@/components/portfolio/youtube-wrapper";

const data: ArticleData = {
  title: 'Valheim',
  tags: ['gamedev'],
  links: [
    ['Resource Cost Scaling', 'https://github.com/kruftt/ResourceCostScaling/blob/master/ResourceCostScaling.cs'],
    ['Smooth Armor Scaling', 'https://github.com/kruftt/SmoothArmorScaling/blob/master/SmoothArmorScaling.cs'],
    ['Thunderstore', 'https://thunderstore.io/c/valheim/p/kruft/']
  ],
  Component
};

function Component() {
  return (
    <article>
      <ArticleHeader article={data}>
        Valheim
      </ArticleHeader>
      <p className="text-center">
        I wrote a few small mods for <a href="https://www.valheimgame.com">Valheim</a> using BepInEx's out-of-the-box Unity modding utilities.
      </p>
      <SectionTabs tabs={['Explosive Bomb', 'Smooth Armor Scaling', 'Resource Cost Scaling']}>
        <SectionTabsContent value='Explosive Bomb'>
          <p>
            I recently heard a Valheim player complaining that there was no good way to speed up mining during certain key progression choke points, such as in the swamps. <a href="https://thunderstore.io/c/valheim/p/kruft/Explosive_Bomb/">Explosive Bomb</a> was designed, in part, to remedy this gap. Although it becomes available early in the second progression tier, it requires a Surtling Core, which are hard to come by at that stage of the game. I've balanced the item to be especially effective for mining, good for chopping trees, and to have decent utility in early combat, all making up for its moderately expensive price.
          </p>
          <p>
            Authoring this mod involved creating my own model, materials, and sounds, exporting them as an asset package made to be compatible with Valheim, and some amount of code to get it loaded and registered into the game.
          </p>
          <br/>
          <div>
            <YoutubeWrapper url="https://www.youtube.com/embed/zBb7N049dmk?si=ygsRyu8hkamc-UXP" />
          </div>
        </SectionTabsContent>
        <SectionTabsContent value='Smooth Armor Scaling'>
          <p>
            <a href="https://thunderstore.io/c/valheim/p/kruft/SmoothArmorScaling/">Smooth Armor Scaling</a> addresses inbalanced damage reduction scaling that occurs, especially at higher difficulty levels. In the vanilla game, "starred" monsters could often inflict up to 3x the damage per hit compared to normal monsters, effectively making armor irrelevant against large hits. This is due to the piecewise damage reduction function that is used by default. I replaced this with a single, smooth function and added configurable armor values for all gear pieces, giving players more control over game balance.
          </p>
          <br />
          <div>
            <img className="m-auto max-h-175" src="/img/reduction.jpg" alt="Smooth Armor Scaling." />
          </div>
          
        </SectionTabsContent>
        <SectionTabsContent value='Resource Cost Scaling'>
          <p>
            <a href="https://thunderstore.io/c/valheim/p/kruft/ResourceCostScaling/">Resource Cost Scaling</a> helps cut down on the amount of grinding required in the game. I felt existing solutions, such as increased drop amounts, interacted poorly with other mechanics. E.g. increased drops put too much strain on inventory space and weight. Downscaling crafting costs across the board avoids theses issues. Special consideration was needed for the 5x Bronze Bars recipe in order to properly handle the rounding with respect to the cost of the single Bronze Bar recipe. I used a sentinel value in order to special case the logic.
          </p>
          <br/>
          <ArticleCarousel>
            <CarouselItem>
              <img className="m-auto max-h-200" src="/img/resource_scaling.jpg" alt="Mod Effect Graphs" />
            </CarouselItem>
            <CarouselItem>
              <img className="m-auto max-h-150" src="/img/valheim_configs.jpg" alt="Configuration Settings." />
            </CarouselItem>
          </ArticleCarousel>
        </SectionTabsContent>
      </SectionTabs>
      {/* <ArticleCarousel>
        <CarouselItem>
          
        </CarouselItem>
        <CarouselItem>
          <img className="m-auto" src="/img/reduction.jpg" alt="Mod Effect Graphs" />
        </CarouselItem>
        <CarouselItem>
          <img className="m-auto" src="/img/valheim_configs.jpg" alt="Configuration Settings for my mods." />
        </CarouselItem>
      </ArticleCarousel> */}
    </article>
  )
}

export default data