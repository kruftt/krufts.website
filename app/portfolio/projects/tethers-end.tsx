import ArticleHeader from "@/components/portfolio/article-header"
import YoutubeWrapper from "@/components/portfolio/youtube-wrapper";
import { SectionTabs, SectionTabsContent } from "@/components/portfolio/article-tabs"
import { ArticleCarousel, CarouselItem } from "@/components/portfolio/article-carousel";
import MermaidDiagram from "@/components/general/mermaid-diagram";

const data: ArticleData = {
  title: "Tether's End",
  tags: ['gamedev'],
  links: [],
  Component
};

function Component() {
  return (
    <article>
      <ArticleHeader article={data}>
        Tether's End
      </ArticleHeader>

      <SectionTabs tabs={['Intro', 'Modular Weapon Spec', 'Firing Chain', 'Assorted Diagrams']}>
        <SectionTabsContent value='Intro'>
          <section>
            <p>
              Circa 2023 I used Godot to begin prototyping an ARPG inspired game entitled <i>Tether's End</i>. In Tether's End, players pilot remote controlled drones across the surface of an abandoned mining planet from the safety of a space station tethered to its equator. I implemented some core systems such as the ability to save / load games, fly around, a hex-based resource scanning system, and basic ship statistics. For the planet's surface, I wrote a rudimentary <a href="https://ccrma.stanford.edu/~doucette/gaming/code/terrain_generator.gd">terrain generator</a>, using noise to create texture and normal maps. At the time, the project served as a good introduction to Godot and GDScript, but I've now moved on and picked this game idea back up in Bevy.
            </p>

            <p>
              Gameplay in Tether's End has two basic phases: being at the station or on a mission. At the station, players can access crafting facilities and a strategic map of the planet's surface. The strategic map is where mission selection occurs. Players remain on a mission until it is completed, failed, or abandoned.
            </p>

            <MermaidDiagram name="base_loop" className="mt-10 mb-12" diagram={`
              flowchart LR
                SS@{ label: "Main Station" }
                C@{ label: "Crafting Facility" }
                SM@{ label: "Strategic Map" }
                M@{ label: "Mission" }
                subgraph Station
                SS --> C
                C --> SS
                SS --> SM
                end
                M -- win or die --> SS
                SM -- select --> M
            `} />

            <p>
              Tether's End draws inspiration from many titles in its design, such as:
            </p>

            <div className="flex flex-col items-center mt-8 mb-14">
              <ul>
                <li><b><a href="https://www.pathofexile.com/">Path of Exile:</a></b> Combat + damage mechanics, crafting, balance.</li>
                <li><b><a href="https://xcom.com">XCOM2:</a></b> Station/base management, strategic map layer.</li>
                <li><b><a href="https://store.steampowered.com/app/2842710/Raiden_NOVA__NOVA/">Raiden:</a></b> Twin-stick shooter inspired movement and weapons.</li>
                <li><b><a href="https://store.steampowered.com/app/881100/Noita/">Noita:</a></b> Modular and generative weapon + item crafting.</li>
              </ul>
            </div>

            <p className="text-center">A clip from the original Godot experiment:</p>
            <br />
            <YoutubeWrapper className="mb-6" url="https://www.youtube.com/embed/nSPZclUT2zY?si=1ZKm2bV1gNr526K7" />

            {/* <MermaidDiagram name="be_loop" diagram={``} /> */}
          </section>
        </SectionTabsContent>

        <SectionTabsContent value='Modular Weapon Spec'>
          <section>
            
            <p>
              The wand crafting system of <a href="https://store.steampowered.com/app/881100/Noita/">Noita</a> is a particularly compelling inspiration for this project. It allows players to arrange a series of linked "spells" that affect each other, somewhat similarly to how skill and support gems work in Path of Exile. In PoE there is a main skill gem whose effects are modified by linked support gems. In Noita, projectile spells can be modified by damage and utility spells that come before them in the wand. However, by defining a definite cast order of spells, Noita allows for mechanics like multicasts, logical branching, and recursion, going far beyond what is possible in Path of Exile.
            </p>

            <div className="flex justify-center mt-10">
              <a href="https://tinker-with-wands-online.vercel.app/?d=0&m=900&c=700&q=-2&n=&p=Wand_0821.png&v=1&a=1&x=0&r=0&l=24&s=BURST_8%2CDIVIDE_10%2CDIVIDE_10%2CDIVIDE_3%2CADD_TRIGGER%2CDIVIDE_3%2CDIVIDE_10%2CDIVIDE_3%2CADD_TRIGGER%2CIF_HP%2CPHASING_ARC%2CSPEED%2CLINE_ARC%2CDECELERATING_SHOT%2CBLOOD_MAGIC%2CENERGY_SHIELD_SHOT%2CTELEPORT_PROJECTILE_CLOSER%2CLASER_LUMINOUS_DRILL%2CADD_DEATH_TRIGGER%2CDEATH_CROSS%2CVACUUM_ENTITIES%2CSPITTER_TIMER%2CI_SHAPE%2CRESET&w=%2C%2C%2C">
                <img alt="An Occult Wand" title="An Occult Wand" className="object-contain" src='/img/te/noita_wand.png'></img>
              </a>
            </div>

            <p className="text-center pl-6 pr-6 pt-2 pb-6">
              This impenetrably complex Noita wand uses multicasting, recursion, and several non-trivial, interdependent effects to teleport the player precise distances between parallel worlds.
            </p>

            <p>
              One problem with integrating such extreme generativity into an ARPG is that it becomes exceedingly hard to balance. In the simulation sandbox that is Noita, the player being able to break the game is part of the design, but in an ARPG, it spoils the fun! So, my first design specification was to <b>capture some of the generative power of Noita's wand crafting system while still maintaining balanced player power levels.</b>
            </p>
          </section>
        </SectionTabsContent>
        <SectionTabsContent value="Firing Chain">
          <section>
            <h3 className="text-center text-2xl mt-12 mb-4">The Firing Chain</h3>

            <ArticleCarousel>
              <CarouselItem>
                <p>
                  A weapon systems in Tether's End consists of a row of components in component slots. When the player fires a weapon, the effect of each component is activated in the order it is slotted, from left to right, forming a "firing chain". In order to make use of the effects of each component, the chain should end with a projectile that can make use of all the effects:
                </p>

                <div className="flex justify-center mt-8 mb-12">
                  <img alt="A simple firing chain." title="A simple firing chain." className="max-h-40 object-contain" src='/img/te/firing_chain.svg'></img>
                </div>

                <p>
                  Now we need component mechanics that depend on, or even affect, the behavior of the firing chain.
                </p>
              </CarouselItem>
              
              <CarouselItem>
                <p>
                  One such mechanic is the ability to have a projectile that "triggers" another projectile when it expires. Think of a firework as being one projectile that triggers another: first, the firework shell is fired into the air, second, it detonates and triggers the explosives inside. Lets consider how this might look in Tether's End:
                </p>

                <div className="flex justify-center mt-8 mb-12">
                  <img alt="A simple firework." title="A simple firework." className="max-h-80 object-contain" src='/img/te/explosive_firework.svg'></img>
                </div>

                <p>
                  The firework shell modifies the explosives, causing them to be triggered by the shell, instead of by the weapon system itself.
                </p>
              </CarouselItem>
              
              <CarouselItem>
                <p>
                  Both the Firework Shell and the Explosives are projectiles and can therefore be modified by preceding components in the chain. Let's say we wanted our fireworks to be green:
                </p>

                <div className="flex justify-center mt-8 mb-12">
                  <img alt="A green firework." title="A green firework." className="max-h-90 object-contain" src='/img/te/green_explosive_firework.svg'></img>
                </div>
                
                <p>
                  Notice that, since we want the green pigment to affect the explosives, it is placed in the firing chain after the firework shell, but before the explosives. In this way, the pigment and explosives make a group.
                </p>
              </CarouselItem>

              <CarouselItem>
                <p>
                  We can also add effects to the firework shell. Suppose we want the shell to travel further, we could use a component that increases the fuse duration, placing it before the shell in the firing chain:
                </p>

                <div className="flex justify-center mt-8 mb-12">
                  <img alt="A green firework." title="A green firework." className="max-h-100 object-contain" src='/img/te/explosives_group.svg'></img>
                </div>

                <p>
                  We could even imagine having three of more trigger groups in a row, such as a shell holding explosive bundles that are themselves holding fragments, each potentially having their own modifiers.
                </p>
              </CarouselItem>
              <CarouselItem>
                <h3 className="text-center text-xl mt-12 mb-4">Balance</h3>

                <p>
                  Triggered effects, like these fireworks, exist in Noita and allow for a lot of player creativity. Noita goes further, however, and adds spells that completely alter the behavior of the "firing chain" and while also lowering or removing the costs of other spells! This blows up the space of possible lategame wand builds.
                </p>
                <p>
                  Recall the complex wand shown earlier. It makes use of a special spell called Add Trigger, which can turn any projectile into a trigger spell. This is powerful in and of itself, but one of its side effects is that makes modifiers that appear alongside it FREE! This is partly what allows such complex wands as this one shown earlier to function:
                </p>

                <div className="flex justify-center mt-5 mb-5">
                  <a href="https://tinker-with-wands-online.vercel.app/?d=0&m=900&c=700&q=-2&n=&p=Wand_0821.png&v=1&a=1&x=0&r=0&l=24&s=BURST_8%2CDIVIDE_10%2CDIVIDE_10%2CDIVIDE_3%2CADD_TRIGGER%2CDIVIDE_3%2CDIVIDE_10%2CDIVIDE_3%2CADD_TRIGGER%2CIF_HP%2CPHASING_ARC%2CSPEED%2CLINE_ARC%2CDECELERATING_SHOT%2CBLOOD_MAGIC%2CENERGY_SHIELD_SHOT%2CTELEPORT_PROJECTILE_CLOSER%2CLASER_LUMINOUS_DRILL%2CADD_DEATH_TRIGGER%2CDEATH_CROSS%2CVACUUM_ENTITIES%2CSPITTER_TIMER%2CI_SHAPE%2CRESET&w=%2C%2C%2C">
                    <img alt="An Occult Wand" title="An Occult Wand" className="object-contain" src='/img/te/noita_wand.png'></img>
                  </a>
                </div>

                <p>
                   However, this supreme level of player power is undesirable in Tether's End. In fact, rather than adding a mechanic that causes triggered effects to be cheaper, triggered effects have a cost penalty! This is just one example of how I am adopting mechanics that allow players to go beyond the gem linking system of PoE, giving more room for creativity in shaping one's abilities, but not opening up the space to the absurd extents of Noita, which would break the ARPG-style gameplay.
                </p>
              </CarouselItem>
            </ArticleCarousel>

          </section>
        </SectionTabsContent>

        <SectionTabsContent value='Assorted Diagrams'>
          <ArticleCarousel>
            <CarouselItem>
              <div className="max-w-138 m-auto mt-8 mb-12">
                <img alt="Ship (Excalidraw)" title="Ship (Excalidraw)" className="object-contain" src='/img/te/ship.svg'></img>
              </div>
            </CarouselItem>
            <CarouselItem>
              <MermaidDiagram name="ship_components" diagram={`
              erDiagram
              direction LR
              SHIP["Ship (Frame)"] {
                Mod[2] builtins
                Component[] armor
                int internalSlots
                int externalSlots
                System[] internalSystems
                System[] externalSystems
              }
              System {
                Mod[2] builtins
                int componentSlots
                SystemComponent[] components
              }
              Component {
                Mod[2] prefixes
                Mod[2] suffixes
              }
              Mod {
                string key
                float value
              }
              SHIP ||--o{ System: internalSystems
              SHIP ||--o{ System: externalSystems
              SHIP ||--o{ Component: armor
              System || --o{ Component: components
            `}
              />
            </CarouselItem>
          </ArticleCarousel>   

          <ArticleCarousel>
            <CarouselItem>
              <div className="mt-8 mb-6">
                <img alt="Blueprint Crafting" title="Blueprint Crafting" className="object-contain" src='/img/te/bp_craft.svg'></img>
              </div>
            </CarouselItem>
            <CarouselItem>
              <div className="mt-8 mb-6">
                <img alt="Rolling a craft" title="Rolling a craft" className="object-contain" src='/img/te/roll_craft.svg'></img>
              </div>
            </CarouselItem>
          </ArticleCarousel>

          <ArticleCarousel>
            <CarouselItem>
              <MermaidDiagram name="crafting_broad" diagram={`
              flowchart LR
                mission(["Missions"])
                meta(["Meta Progression"])
                mats["Materials"]
                bps["Blueprints"]
                mission --> mats
                meta --> bps
                mission --> bps
                station["Crafting Station"]
                mats --> station
                bps --> station
                cmpt{{"Component"}}
                station --> cmpt
            `} />
            </CarouselItem>
            <CarouselItem>
              <MermaidDiagram name="crafting_workflow" diagram={`
              flowchart LR
                start(["Open Crafting Station"])
                
                subgraph configure [Configure craft]
                a{{"Select BP"}}
                b{{"Select materials"}}
                c{{"Set craft type"}}
                d{{"Set craft params"}}
                e{{"Add to crafting Queue"}}
                c --> d
                a --> b
                b --> e
                d --> e
                end
                
                result["Result"]
                start --> configure
                e -- roll --> result
                
            `} />
            </CarouselItem>
            <CarouselItem>
              <MermaidDiagram name="crafting_entities" diagram={`
              erDiagram
              direction LR
              Blueprint {
                enum bpType
                enum bpSubtype
                float quality
                Part[] parts
              }
              Part {
                enum matType
                int matAmount
                float[] tagWeights
              }
              Material {
                enum matType
                enum matSubtype
                float quality
                float[] tagWeights
              }
              Blueprint ||--o{ Part : specifies
              Part ||--|| Material : requires
              `} />
            </CarouselItem>
          </ArticleCarousel>
        </SectionTabsContent>

        <SectionTabsContent value='Ship Design'>
          <section>

            <p>
              Ships in <i>Tether's End</i> have three primary resources: HP, Power, and CPU. These are supplemented by a wide variety of secondary properties, such as <i>Movement Speed</i> or <i>Kinetic Resistance</i>. Ships come with a small amount of primary statistics, that provide some minimal HP, Power, and CPU, built-in, but most come from its <i>Systems</i> and <i>Components</i>.
            </p>

            <p>
              Each ship frame (a craftable item) can hold a certain amount of internal and external systems.  Each system, like the frame, comes with some built-in statistics, but can also hold a certain number of components that match its component slot types. Armor (aka Hull) Components are a special case and are fitted directly into the ship frame, rather than into an intermediate system:
            </p>

            <div className="max-w-138 m-auto mt-8 mb-12">
              <img alt="Ship (Excalidraw)" title="Ship (Excalidraw)" className="object-contain" src='/img/te/ship.svg'></img>
            </div>

            <MermaidDiagram name="test_name" diagram={`
              erDiagram
              direction LR
              SHIP["Ship (Frame)"] {
                Mod[2] builtins
                Component[] armor
                int internalSlots
                int externalSlots
                System[] internalSystems
                System[] externalSystems
              }
              System {
                Mod[2] builtins
                int componentSlots
                SystemComponent[] components
              }
              Component {
                Mod[2] prefixes
                Mod[2] suffixes
              }
              Mod {
                string key
                float value
              }
              SHIP ||--o{ System: internalSystems
              SHIP ||--o{ System: externalSystems
              SHIP ||--o{ Component: armor
              System || --o{ Component: components
            `}
            />
            <MermaidDiagram name="crafting_broad" diagram={`
              flowchart LR
                mission(["Missions"])
                meta(["Meta Progression"])
                mats["Materials"]
                bps["Blueprints"]
                mission --> mats
                meta --> bps
                mission --> bps
                station["Crafting Station"]
                mats --> station
                bps --> station
                cmpt{{"Component"}}
                station --> cmpt
            `} />

            <MermaidDiagram name="crafting_entities" diagram={`
              erDiagram
              direction LR
              Blueprint {
                enum bpType
                enum bpSubtype
                float quality
                Part[] parts
              }
              Part {
                enum matType
                int matAmount
                float[] tagWeights
              }
              Material {
                enum matType
                enum matSubtype
                float quality
                float[] tagWeights
              }
              Blueprint ||--o{ Part : specifies
              Part ||--|| Material : requires
              `} />

            <div className="mt-8 mb-6">
              <img alt="Blueprint Crafting" title="Blueprint Crafting" className="object-contain" src='/img/te/bp_craft.svg'></img>
            </div>

          </section>
        </SectionTabsContent>

        <SectionTabsContent value='Component Crafting'>
          <section>

            <p>
              Components are crafted according to blueprints, which specify the base statistics and an array of parts that are the component's crafting ingredients. Each part requires a particular type and amount of material to be used. Blueprints are acquired from special "production facility raid" missions and/or from meta progression, while materials are gained from various mission types and rewards.
            </p>

            <MermaidDiagram name="crafting_broad" diagram={`
              flowchart LR
                mission(["Missions"])
                meta(["Meta Progression"])
                mats["Materials"]
                bps["Blueprints"]
                mission --> mats
                meta --> bps
                mission --> bps
                station["Crafting Station"]
                mats --> station
                bps --> station
                cmpt{{"Component"}}
                station --> cmpt
            `} />

            <p>
              Each blueprint has a base type, determining its base mod pool, and a subtype, determining the starting weights of the mod pool. E.g. a blueprint could be of type "engine", subtype "efficient", which is biased toward stats providing low amounts of energy efficient thrust. Blueprints also have a quality, which enables higher tier modifiers and acts as a general multiplier.
            </p>

            <MermaidDiagram name="crafting_entities" diagram={`
              erDiagram
              direction LR
              Blueprint {
                enum bpType
                enum bpSubtype
                float quality
                Part[] parts
              }
              Part {
                enum matType
                int matAmount
                float[] tagWeights
              }
              Material {
                enum matType
                enum matSubtype
                float quality
                float[] tagWeights
              }
              Blueprint ||--o{ Part : specifies
              Part ||--|| Material : requires
              `} />

            <p>
              In order to be crafted, blueprints require materials of the appropriate types to be placed into each of their part slots. Each particular material has its own preferred types of mods (aka "tags"), e.g. Steel is a subtype of metal that benefits mods with the <i>kinetic</i> tag. When a material is placed into a part slot, the tag weights of the material are multiplied component-wise by the tag weights of the part slot.
            </p>

            <p>
              Furthermore, a particular stack of given material has a quality value. The quality can be refined at increasing losses. Quality starts at 0 and increases. When a material is placed into a part slot, the quality of the material is multiplied by the quality multiplier of the blueprint and added to the overall quality multiplier of the craft.
            </p>

            <div className="mt-8 mb-6">
              <img alt="Blueprint Crafting" title="Blueprint Crafting" className="object-contain" src='/img/te/bp_craft.svg'></img>
            </div>
           
            <p>
              In addition to selecting a blueprint and filling in the material requirements of its parts, players can select a "craft type". Additional crafting types and options are unlocked through meta progression and provide the player with the ability to further alter the potential outcomes of their craft, at the cost of additional resources.
            </p>

            <p className="pt-8 pb-2">Therefore the basic component crafting flow is as follows:</p>

            <MermaidDiagram name="crafting_workflow" diagram={`
              flowchart LR
                start(["Open Crafting Station"])
                
                subgraph configure [Configure craft]
                a{{"Select BP"}}
                b{{"Select materials"}}
                c{{"Set craft type"}}
                d{{"Set craft params"}}
                e{{"Add to crafting Queue"}}
                c --> d
                a --> b
                b --> e
                d --> e
                end
                
                result["Result"]
                start --> configure
                e -- roll --> result
                
            `} />
            
            <p>
              Let's look in detail how a roll occurs. First, the blueprint type and quality determines the mod pool. Secondly, the subtype determines the base tag weights. Next, the parts are taken into account. The tag weights of the materials placed into each part are multiplied, component-wise, by the tag weights of that part's slot. The results of these are summed together along with the base tag weights of the component.
            </p>

            <p>
              Modifiers have a base selection weight and these weights are multiplied by the tag weights of their matching tags. Random modifiers can be prefixes or suffixes and a single component can have 2 of each at most. The number of prefixes and suffixes are rolled and the mods are independently selected based on the modified weights.
            </p>

            <p>
              The values of the modifiers are then rolled, taking into account base values, corresponding tag multipliers, craft settings, blueprint and material quality, and a random roll.
            </p>

            <div className="mt-8 mb-6">
              <img alt="Rolling a craft" title="Rolling a craft" className="object-contain" src='/img/te/roll_craft.svg'></img>
            </div>

          </section>
        </SectionTabsContent>
      </SectionTabs>
    </article>
  )
}

export default data
