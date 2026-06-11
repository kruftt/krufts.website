import JsdImage from "@/components/general/jsdelivr-image";
import Zoom from "@/components/general/zoom";
import { ArticleCarousel, CarouselItem } from "../_components/article-carousel";
import { ArticleHeader } from "../_components/article-header";
import { SectionTabs, SectionTabsContent } from "../_components/article-tabs";
import YoutubeWrapper from "../_components/youtube-wrapper";
import { data } from "./data";

export default function DotsArticle() {
	return (
		<article>
			<ArticleHeader article={data}>Unity DOTS Demo</ArticleHeader>
			<SectionTabs tabs={["Particle Demo", "Profiler"]}>
				<SectionTabsContent value="Particle Demo">
					<section>
						<p>
							In recent explorations of{" "}
							<b>Unity's "Data-Oriented Technology Stack"</b>
							(DOTS), I implemented a set of modular and performant systems
							using several core ECS architectural patterns. To test these
							systems, I built a demo in which the user can use the cursor to
							push 10,000 animated, colored dots which are otherwise attracted
							toward the center of the screen.
						</p>
						<p>
							<b>
								I combined Unity's DOTS framework with the new Low-Level 2D
								Physics API
							</b>{" "}
							(Box2D) to build high-performance animation and physics systems.
							This included shader-driven animations, prefab instantiation,
							entity lifecycle management, and Physics API integration. Key
							systems aggregate forces from multiple sources and batch their
							application across all bodies in a single API call, with force and
							transform state synchronized between the Entity and Physics worlds
							using vectorizable, contiguous memory operations.
						</p>
						<br />
						<div>
							<YoutubeWrapper url="https://www.youtube.com/embed/a__qk5VGZd4?si=3oJh4CMqQaniafnd" />
						</div>
					</section>
				</SectionTabsContent>
				<SectionTabsContent value="Profiler">
					<section>
						<p>
							<b>
								The performance advantages of the ECS architecture come from the
								caching and parallelization benefits.
							</b>{" "}
							The goal is to reduce cache misses (by accessing contiguous
							regions of memory) and to take as much work off the main thread as
							possible (by leveraging the job system and the Burst compiler).
							Even in this simple case of controlling 10,000 animations, the
							nature of the architectural benefits are apparent in the profiler:
						</p>
						{/* <div>
							These slides depict a 4-step sequence:
							<ul className="mt-2 ml-8 list-disc">
								<li>A naive implementation (1.5ms)</li>
								<li>A naive implementation using the Burst compiler (0.3ms)</li>
								<li>
									A parallelized job (0.01ms main thread, 0.1ms worker threads)
								</li>
								<li>
									A parallelized job with Burst (0.01ms main thread, 0.02ms
									worker threads)
								</li>
							</ul>
						</div> */}
						{/* <br /> */}
						<ArticleCarousel>
							<CarouselItem>
								<Zoom>
									<p className="text-center">
										The unoptimized implementation takes 1.5ms:
									</p>
									<JsdImage
										className="m-auto"
										width={1468}
										height={350}
										src="profile_1.png"
										alt="Mod Effect Graphs"
									/>
								</Zoom>
							</CarouselItem>
							<CarouselItem>
								<Zoom>
									<p className="text-center">
										Burst compiling lowers this to 0.3ms:
									</p>
									<JsdImage
										width={683}
										height={299}
										className="m-auto max-h-200"
										src="profile_2.png"
										alt="Mod Effect Graphs"
									/>
								</Zoom>
							</CarouselItem>
							<CarouselItem>
								<Zoom>
									<p className="text-center">
										Switching to a job leaves only 0.012ms of work on the main
										thread, and does 0.1ms of work on the worker threads:
									</p>
									<JsdImage
										width={626}
										height={320}
										className="m-auto max-h-200"
										src="profile_3.png"
										alt="Mod Effect Graphs"
									/>
								</Zoom>
							</CarouselItem>
							<CarouselItem>
								<Zoom>
									<p className="text-center">
										Finally, Burst compiling the job lowers the worker thread
										runtime to under 0.02ms:
									</p>
									<JsdImage
										width={667}
										height={287}
										className="m-auto max-h-200"
										src="profile_4.png"
										alt="Mod Effect Graphs"
									/>
								</Zoom>
							</CarouselItem>
						</ArticleCarousel>
					</section>
				</SectionTabsContent>
			</SectionTabs>
		</article>
	);
}
