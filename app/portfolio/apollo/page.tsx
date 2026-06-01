import JsdImage from "@/components/general/jsdelivr-image";
import Zoom from "@/components/general/zoom";
import { ArticleHeader } from "../_components/article-header";
import { data } from "./data";

export default function ApolloArticle() {
	return (
		<article>
			<ArticleHeader article={data}>Apollo</ArticleHeader>
			<section>
				<p>
					I made several tools and mods for the game{" "}
					<a href="https://store.steampowered.com/app/1145360/Hades/">Hades</a>.
					These included Apollo, a web-based trait calculator that allows
					players to explore and link character builds, implemented in{" "}
					<b>vue.js</b>. To enable a live connection to the game I authored a
					networking tool entitled{" "}
					<a href="https://github.com/kruftt/ApolloLive">Apollo Live</a>, which
					I used to update the calculator with the current game state and
					preview potential changes in real-time. Since Hades did not ship with
					network support I built my own{" "}
					<a href="https://github.com/kruftt/HadesLive/blob/master/HadesLive/Connection.lua">
						websocket
					</a>{" "}
					layer in Lua to connect to the browser. In this way I was able to
					create a twitch integration plugin that included a live overlay.
				</p>
				<div className="mt-8 text-center">
					Apollo
					<Zoom>
						<JsdImage
							src="apollo.jpg"
							width={1000}
							height={751}
							alt="The Apollo boon calculator."
						/>
					</Zoom>
				</div>
			</section>
		</article>
	);
}
