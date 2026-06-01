import {
	ArticleCarousel,
	CarouselItem,
} from "@/app/portfolio/_components/article-carousel";
import {
	SectionTabs,
	SectionTabsContent,
} from "@/app/portfolio/_components/article-tabs";
import JsdImage from "@/components/general/jsdelivr-image";
import Zoom from "@/components/general/zoom";
import { ArticleHeader } from "../_components/article-header";
import { data } from "./data";

export default function LostSkiesArticle() {
	return (
		<article>
			<ArticleHeader article={data}>
				<a href="https://lostskiesgame.com">
					<JsdImage
						width={1024}
						height={180}
						src="lostskies.png"
						alt="Lost Skies"
					/>
				</a>
			</ArticleHeader>
			<SectionTabs tabs={["Overview", "Point to Interact", "Infested Bunker"]}>
				<SectionTabsContent value="Overview">
					<section>
						<p>
							During its Early Access period, I made several mods for a
							survival-crafting game called{" "}
							<a href="https://lostskiesgame.com">Lost Skies</a>. I helped
							initiate the modding community by documenting my code, workflow,
							and project configuration for others. This included setting up a
							C# build environment and writing a custom{" "}
							<a href="https://github.com/kruftt/ThunderstoreAdapter">
								msbuild task library
							</a>{" "}
							for compiling mods and packaging them for distribution on{" "}
							<a href="https://thunderstore.io">thunderstore.io</a>.
						</p>
						<p>
							In early development, the game was built on a Mono C# backend, but
							later switched to an IL2CPP (Internal Language to C++) backend on
							the Early Access launch in order to enhance security. While this
							made reverse-engineering and modding significantly more difficult
							(by preventing decompilation and/or transpilation of the IL
							assemblies), it gave me an opportunity to learn about the IL2CPP
							compiler and to explore methods of reverse-engineering native
							assemblies, such as using tools like Ghidra or IDA pro.
						</p>
					</section>
					<ArticleCarousel>
						<CarouselItem>
							<div className="flex justify-center items-center gap-4">
								<a
									className="max-w-[calc(33%-8px)]"
									href="https://thunderstore.io/c/lost-skies/p/kruft/Herald_Tracker/"
								>
									<JsdImage
										width={269}
										height={434}
										src="ls_herald_tracker.png"
										alt="Herald Tracker."
									/>
								</a>
								<a
									className="max-w-[calc(33%-8px)]"
									href="https://thunderstore.io/c/lost-skies/p/kruft/ShipCam_Pro/"
								>
									<JsdImage
										width={269}
										height={434}
										src="ls_shipcam_pro.png"
										alt="Shipcam Pro."
									/>
								</a>
								<a
									className="max-w-[calc(33%-8px)]"
									href="https://thunderstore.io/c/lost-skies/p/kruft/Point_To_Interact/"
								>
									<JsdImage
										width={270}
										height={434}
										src="ls_point_to_interact.png"
										alt="Point To Interact."
									/>
								</a>
							</div>
						</CarouselItem>
						<CarouselItem>
							<JsdImage
								width={885}
								height={383}
								src="il2cpp_light.jpg"
								alt="Unity IL2CPP"
								className="m-auto"
							/>
						</CarouselItem>
					</ArticleCarousel>
				</SectionTabsContent>
				<SectionTabsContent value="Point to Interact">
					<section>
						<p>
							One such mod,{" "}
							<a href="https://github.com/kruftt/LostSkiesMods/blob/main/PointToInteract/src/Patch.cs">
								Point To Interact
							</a>
							, focused on user experience and improved 3d object
							selection/interaction. By default, every frame used a spherical
							collider to detect interactables around the player. These
							interactables were then displayed in a scrollable list, navigable
							with the mousewheel or a controller's d-pad. However, this system
							felt unintuitive when using a mouse, since pointing at an object
							didn't guarantee it would be selected.
						</p>
						<p>
							To address this I used a raycast from the camera to the cursor to
							filter the results of the proximity check. If no interactable is
							under the cursor, it falls back to the default behavior. This
							significantly improves the functionality in common cluttered
							scenarios such as selecting between adjacent storage cabinets, as
							shown in the mod's cover image below, where the user would like to
							select the middle storage box of three vertically aligned boxes:
						</p>
					</section>
					<div className="text-center mt-8">
						<a href="https://thunderstore.io/c/lost-skies/p/kruft/Point_To_Interact/">
							<JsdImage
								width={384}
								height={384}
								className="m-auto"
								src="point_to_interact.jpg"
								alt="Point To Interact"
							/>
						</a>
					</div>
				</SectionTabsContent>
				<SectionTabsContent value="Infested Bunker">
					<section>
						<p>
							In addition to mods, I also created an "Island" for Lost Skies
							called <i>Infested Bunker</i>. Lost Skies is set in the remains of
							a shattered world consisting of floating islands and supports
							user-made islands via an island authoring tool, similar to level
							editors from other games. <i>Infested Bunker</i> features a series
							of simple puzzles that unlock a fortified bunker in the middle of
							a patchy, spherical land mass. Building it involved the creative
							use of volumetric terrain generation, a limited set of assets, and
							game logic scripts.
						</p>
					</section>
					<div className="text-center mt-4">
						<a href="https://steamcommunity.com/sharedfiles/filedetails/?id=3439823150">
							Steam Workshop: Infested Bunker
						</a>
						<Zoom>
							<JsdImage
								width={2560}
								height={1440}
								src="infested_bunker.jpg"
								alt="Steam Workshop: Infested Bunker"
							/>
						</Zoom>
					</div>
				</SectionTabsContent>
			</SectionTabs>
		</article>
	);
}
