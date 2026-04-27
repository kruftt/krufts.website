import {
	ArticleCarousel,
	CarouselItem,
} from "@/components/portfolio/article-carousel";
import ArticleHeader from "@/components/portfolio/article-header";

const data: ArticleData = {
	title: "MetaView",
	tags: ["edu", "webdev"],
	links: [["Github", "https://github.com/kruftt/obsidian-metaview"]],
	Component: MetaView,
};

function MetaView() {
	return (
		<article>
			<ArticleHeader article={data}>MetaView</ArticleHeader>
			<section>
				<p>
					I am developing a plugin for the markdown-based note-taking app{" "}
					<a href="https://obsidian.md/">Obsidian</a> using{" "}
					<a href="https://svelte.dev">Svelte 5</a>. Obsidian supports YAML
					metadata on notes and the Metaview plugin adds the ability to create
					metadata templates with predefined property names and types which can
					be added to notes in a composable manner. Think of them as defining
					metadata components. It also supports arbitrarily nested data,
					allowing more flexibility in how you store your metadata, among many
					other features.
				</p>
			</section>
			<ArticleCarousel className="text-center">
				<CarouselItem>
					<img
						className="m-auto mb-4"
						src="/img/metaview1.jpg"
						alt="Template configuration."
					/>
					<div>On the left: Raw frontmatter defining a Metaview schema.</div>
					<div>On the right: UI for editing the schema.</div>
				</CarouselItem>
				<CarouselItem>
					<img
						className="m-auto mb-4"
						src="/img/metaview2.jpg"
						alt="Note editing"
					/>
          <div>
            On the left: Raw frontmatter metadata for a note, generated and managed by
            Metaview.
          </div>
          <div>On the right: UI for editing the metadata.</div>
				</CarouselItem>
				<CarouselItem>
					<img
						className="m-auto mb-4"
						src="/img/metaview3.jpg"
						alt="Nested Object Support"
					/>
          <div>Demonstration of nested metadata objects, an unsupported feature in vanilla Obsidian.</div>
				</CarouselItem>
			</ArticleCarousel>
		</article>
	);
}

export default data;
