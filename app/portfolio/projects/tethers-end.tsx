import ArticleHeader from "@/components/portfolio/article-header"
import YoutubeWrapper from "@/components/portfolio/youtube-wrapper";
import { SectionTabs, SectionTabsContent } from "@/components/portfolio/article-tabs"
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
      <SectionTabs tabs={['Intro', 'Ship Design', 'Component Crafting']}>
        <SectionTabsContent value='Intro'>
          <section>

            <p>
              Circa 2023 I began experimenting with the Godot game engine by prototyping an action-RPG entitled <i>Tether's End</i>, in which the player pilots remote controlled drone ships from a space station tethered above an abandoned mining planet. Crafting and base management occur on the station, while action gameplay occurs on the surface. At the time, I implemented some core systems such as the ability to save / load games, a hex-based resource scanning system for the surface, the ability to fly around, and basic ship statistics. For the planet's surface, I implemented a rudimentary <a href="https://ccrma.stanford.edu/~doucette/gaming/code/terrain_generator.gd">terrain generator</a> using noise to create texture and normal maps. At the time, the project served as a good introduction to Godot and GDScript.
            </p>
            
            <p>
              I've now decided to move on from Godot and have picked this game idea back up using Bevy. However, I still have a clip from the original Godot Demo:
            </p>
            
            <br />
            <YoutubeWrapper className="mb-6" url="https://www.youtube.com/embed/nSPZclUT2zY?si=1ZKm2bV1gNr526K7" />

          </section>
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
              <p className="text-center">
                (Click image to open an editable version)
              </p>
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
