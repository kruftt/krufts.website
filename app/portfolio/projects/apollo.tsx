import ArticleHeader from "@/components/portfolio/article-header"

const data: ArticleData = {
  title: 'Apollo',
  tags: ['gamedev', 'webdev'],
  links: [
    ['Github', 'https://github.com/kruftt/Apollo/tree/master/src'],
    ['Apollo Demo', 'https://kruftt.github.io/Apollo/#5152a23c325y314p124r103h32052943k314t102f2k3j11'],
  ],
  Component
};

function Component() {
  return (
    <article>
      <ArticleHeader article={data}>
        Apollo
      </ArticleHeader>
      <section>
        <p>
          As a hobby project I made tools and mods for the game <a href="https://store.steampowered.com/app/1145360/Hades/">Hades</a>. This included Apollo, a web-based trait calculator allowing players to explore and link character builds, implemented in Vue. To enable a live connection to the game I authored a networking tool entitled <a href="https://github.com/kruftt/ApolloLive">Apollo Live</a>, which I used to update the calculator with the current game state and preview potential changes in real-time. Since Hades did not ship with network support I built my own <a href="https://github.com/kruftt/HadesLive/blob/master/HadesLive/Connection.lua">websocket</a> layer in Lua to connect to the browser. In this way I was able to create a twitch integration plugin that included a live overlay.
        </p>
        <div className="mt-8 text-center">
          Apollo
          <img src="/img/apollo.jpg" alt="The Apollo boon calculator." />
        </div>
      </section>
    </article>
  )
}

export default data