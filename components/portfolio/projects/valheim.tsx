import ArticleHeader from "@/components/portfolio/article-header"
import { ArticleCarousel, CarouselItem } from "@/components/portfolio/article-carousel"
import { SectionTabs, SectionTabsContent } from "@/components/portfolio/article-tabs"

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
      <p>
        I wrote two small mods for <a href="https://www.valheimgame.com">Valheim</a> using <a href="https://github.com/BepInEx/HarmonyX">HarmonyX's</a> runtime patching of Valheim's C# Unity assemblies.
      </p>
      <SectionTabs tabs={['Resource Cost Scaling', 'Smooth Armor Scaling']}>
        <SectionTabsContent value='Resource Cost Scaling'>
          <p>
            <a href="https://thunderstore.io/c/valheim/p/kruft/ResourceCostScaling/">Resource Cost Scaling</a> helps cut down on the amount of grinding required in the game. I felt existing solutions, such as increased drop amounts, interacted poorly with other mechanics. E.g. increased drops put too much strain on inventory space and weight. Downscaling crafting costs across the board avoids theses issues. Special consideration was needed for the 5x Bronze Bars recipe in order to properly handle the rounding with respect to the cost of the single Bronze Bar recipe. I used a sentinel value in order to special case the logic.
          </p>
        </SectionTabsContent>
        <SectionTabsContent value='Smooth Armor Scaling'>
          <p>
            <a href="https://thunderstore.io/c/valheim/p/kruft/SmoothArmorScaling/">Smooth Armor Scaling</a> addresses inbalanced damage reduction scaling that occurs, especially at higher difficulty levels. In the vanilla game, "starred" monsters could often inflict up to 3x the damage per hit compared to normal monsters, effectively making armor irrelevant against large hits. This is due to the piecewise damage reduction function that is used by default. I replaced this with a single, smooth function and added configurable armor values for all gear pieces, giving players more control over game balance.
          </p>
        </SectionTabsContent>
      </SectionTabs>
      <ArticleCarousel>
        <CarouselItem>
          <img className="m-auto" src="/img/reduction.jpg" alt="Mod Effect Graphs" />
        </CarouselItem>
        <CarouselItem>
          <img className="m-auto" src="/img/valheim_configs.jpg" alt="Configuration Settings for my mods." />
        </CarouselItem>
      </ArticleCarousel>
    </article>
  )
}

export default data