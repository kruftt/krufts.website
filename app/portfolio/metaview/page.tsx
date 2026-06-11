import {
	ArticleCarousel,
	CarouselItem,
} from "@/app/portfolio/_components/article-carousel";
import JsdImage from "@/components/general/jsdelivr-image";
import Zoom from "@/components/general/zoom";
import { ArticleHeader } from "../_components/article-header";
import { data } from "./data";

export default function MetaviewArticle() {
	return (
		<article>
			<ArticleHeader article={data}>MetaView</ArticleHeader>
			<section>
				<p>
					<b>
						I am developing a plugin for the markdown-based note-taking app{" "}
						<a href="https://obsidian.md/">Obsidian</a> using{" "}
						<a href="https://svelte.dev">Svelte 5</a>
					</b>
					. Obsidian supports YAML metadata on notes and the Metaview plugin
					adds the ability to create metadata templates with predefined property
					names and types which can be added to notes in a composable manner.
					Think of them as defining metadata components. It also supports
					arbitrarily nested data, allowing more flexibility in how you store
					your metadata, among many other features.
				</p>
			</section>
			<ArticleCarousel className="text-center">
				<CarouselItem>
					<Zoom>
						<JsdImage
							width={831}
							height={660}
							className="m-auto mb-4"
							src="metaview1.jpg"
							alt="Template configuration."
						/>
						<div>On the left: Raw frontmatter defining a Metaview schema.</div>
						<div>On the right: UI for editing the schema.</div>
					</Zoom>
				</CarouselItem>
				<CarouselItem>
					<Zoom>
						<JsdImage
							width={931}
							height={578}
							className="m-auto mb-4"
							src="metaview2.jpg"
							alt="Note editing"
						/>
						<div>
							On the left: Raw frontmatter metadata for a note, generated and
							managed by Metaview.
						</div>
						<div>On the right: UI for editing the metadata.</div>
					</Zoom>
				</CarouselItem>
				<CarouselItem>
					<Zoom>
						<JsdImage
							width={831}
							height={660}
							className="m-auto mb-4"
							src="metaview3.jpg"
							alt="Nested Object Support"
						/>
						<div>
							Demonstration of nested metadata objects, an unsupported feature
							in vanilla Obsidian.
						</div>
					</Zoom>
				</CarouselItem>
			</ArticleCarousel>
		</article>
	);
}
