import {
	ArticleCarousel,
	CarouselItem,
} from "@/app/portfolio/_components/article-carousel";
import {
	SectionTabs,
	SectionTabsContent,
} from "@/app/portfolio/_components/article-tabs";
import YoutubeWrapper from "@/app/portfolio/_components/youtube-wrapper";
import JsdImage from "@/components/general/jsdelivr-image";
import { ArticleHeader } from "../_components/article-header";
import { data } from "./data";

export default function ValheimArticle() {
	return (
		<article>
			<ArticleHeader article={data}>Valheim</ArticleHeader>
			<p className="text-center">
				I wrote a few small mods for{" "}
				<a href="https://www.valheimgame.com">Valheim</a> using BepInEx's
				out-of-the-box Unity modding utilities.
			</p>
			<SectionTabs
				tabs={[
					"Explosive Bomb",
					"Smooth Armor Scaling",
					"Resource Cost Scaling",
				]}
			>
				<SectionTabsContent value="Explosive Bomb">
					<p>
						I overheard some Valheim players complain that there was no good way
						to speed up mining during key progression choke points, such as in
						the swamps.{" "}
						<a href="https://thunderstore.io/c/valheim/p/kruft/Explosive_Bomb/">
							Explosive Bomb
						</a>{" "}
						was designed, in part, to remedy this gap. Although quite powerful
						at the point it becomes available, it requires a rare Surtling Core,
						which are scarce during early stages of the game. I balanced the
						item to be great for mining, good for chopping trees, and decent in
						early combat, such that its versatility and effectiveness makes up
						for its expensive price.
					</p>
					<p>
						I created my own model, materials, and sounds, exporting them as an
						asset package made to be compatible with Valheim, and wrote a small
						amount of code to get it loaded and registered into the game.
					</p>
					<br />
					<div>
						<YoutubeWrapper url="https://www.youtube.com/embed/zBb7N049dmk?si=ygsRyu8hkamc-UXP" />
					</div>
				</SectionTabsContent>
				<SectionTabsContent value="Smooth Armor Scaling">
					<p>
						<a href="https://thunderstore.io/c/valheim/p/kruft/SmoothArmorScaling/">
							Smooth Armor Scaling
						</a>{" "}
						addresses inbalanced damage reduction scaling that occurs,
						especially at higher difficulty levels. In the vanilla game,
						"starred" monsters can inflict up to 3x the damage per hit compared
						to normal monsters, effectively making armor irrelevant. This effect
						is amplified due to the piecewise damage reduction function that is
						used by default. I replaced this with a single, smooth function and
						added configurable armor values for all gear pieces, giving players
						more control over game balance, especially on harder difficulties.
					</p>
					<br />
					<div>
						<JsdImage
							width={914}
							height={1075}
							className="m-auto max-h-175"
							src="reduction.jpg"
							alt="Smooth Armor Scaling."
						/>
					</div>
				</SectionTabsContent>
				<SectionTabsContent value="Resource Cost Scaling">
					<p>
						<a href="https://thunderstore.io/c/valheim/p/kruft/ResourceCostScaling/">
							Resource Cost Scaling
						</a>{" "}
						helps cut down on the amount of grinding required in the game. I
						felt existing solutions, such as increased drop amounts, interacted
						poorly with other mechanics. E.g. increased drops put too much
						strain on inventory space and weight. Downscaling crafting costs
						across the board avoids theses issues. Special consideration was
						needed for the 5x Bronze Bars recipe in order to properly handle the
						rounding with respect to the cost of the single Bronze Bar recipe. I
						used a sentinel value in order to special case the logic.
					</p>
					<ArticleCarousel>
						<CarouselItem>
							<JsdImage
								width={592}
								height={1075}
								className="m-auto max-h-200"
								src="resource_scaling.jpg"
								alt="Mod Effect Graphs"
							/>
						</CarouselItem>
						<CarouselItem>
							<JsdImage
								width={605}
								height={609}
								className="m-auto max-h-150"
								src="valheim_configs.jpg"
								alt="Configuration Settings."
							/>
						</CarouselItem>
					</ArticleCarousel>
				</SectionTabsContent>
			</SectionTabs>
		</article>
	);
}
