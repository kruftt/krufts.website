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
				<b>
					I wrote several mods for{" "}
					<a href="https://www.valheimgame.com">Valheim</a>
				</b>{" "}
				using BepInEx's out-of-the-box Unity modding utilities.
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
						In order to speed up key progression choke points,{" "}
						<b>
							I came up with an idea for an
							<a
								className="ml-1"
								href="https://thunderstore.io/c/valheim/p/kruft/Explosive_Bomb/"
							>
								Explosive Bomb
							</a>{" "}
							modded item that aids in combat and mining.
						</b>{" "}
						Although quite powerful at the point it becomes available, it
						requires a rare Surtling Core, which are scarce during early stages
						of the game. I balanced the item to be great for mining and decent
						in early combat, such that its versatility and effectiveness makes
						up for the hefty price.
					</p>
					<p>
						<b>I created my own model, materials, and sounds</b>, exporting them
						as an asset package made to be compatible with Valheim,{" "}
						<b>and wrote a small amount of code</b> to get it loaded and
						registered into the game.
					</p>
					<br />
					<div>
						<YoutubeWrapper url="https://www.youtube.com/embed/zBb7N049dmk?si=ygsRyu8hkamc-UXP" />
					</div>
				</SectionTabsContent>
				<SectionTabsContent value="Smooth Armor Scaling">
					<p>
						<b>
							<a href="https://thunderstore.io/c/valheim/p/kruft/SmoothArmorScaling/">
								Smooth Armor Scaling
							</a>{" "}
							addresses inbalanced damage reduction scaling that occurs,
							especially at higher difficulty levels.
						</b>{" "}
						In the vanilla game, "starred" monsters can inflict up to 3x the
						damage per hit compared to normal monsters! This, in combination
						with the default piecewise armor damage reduction function, can
						effectively render armor irrelevant. I transpiled the damage
						calculation function to replace the reduction curve with a single,
						smooth relationship. I also added configurable reduction parameters
						and armor values for players and gear pieces gear pieces, giving
						users more control over game balance.
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
						<b>
							<a href="https://thunderstore.io/c/valheim/p/kruft/ResourceCostScaling/">
								Resource Cost Scaling
							</a>{" "}
							helps cut down on the amount of grinding required in the game.
						</b>{" "}
						I felt increased drop amounts put too much extra strain on inventory
						space and weight, whereas downscaling crafting costs doesn't, and so
						doesn't disturb the normal game flow.
					</p>
					<p>
						The 5x Bronze Bars recipe required special casing in order to
						properly handle the rounding with respect to the cost of the single
						Bronze Bar recipe. I used a sentinel value to special case the
						logic.
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
