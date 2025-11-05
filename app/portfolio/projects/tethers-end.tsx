import ArticleHeader from "@/components/portfolio/article-header"
import YoutubeWrapper from "@/components/portfolio/youtube-wrapper";

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
      <section>
        <div>
          <p>
            Circa 2023 I experimented with the Godot engine by prototyping a game concept entitled "Tether's End". I envisioned a top-down, crafting-heavy action game in which the player operates remote-controlled drones on the surface of an abandoned mining planet. I implemented some core systems such as the ability to save / load games, drone movement, and a hex-based resource scanning system. For the planet's surface, I implemented a basic <a href="https://ccrma.stanford.edu/~doucette/gaming/code/terrain_generator.gd">terrain generator</a> using noise to create texture and normal maps. This project was a good introduction to Godot and GDScript and I look forward to returning to it in the future.
          </p>
        </div>
        <br />
        <YoutubeWrapper url="https://www.youtube.com/embed/nSPZclUT2zY?si=1ZKm2bV1gNr526K7" />
      </section>
    </article>
  )
}

export default data