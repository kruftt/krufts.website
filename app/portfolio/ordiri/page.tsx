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

export default function OrdiriArticle() {
	return (
		<article>
			<ArticleHeader article={data}>Ordiri</ArticleHeader>
			<p className="pb-4">
			  I am working on a tool to author 3D digital memory palaces. The application aims to bring research into memory palaces to a user-friendly product. This prototype was built on Tauri, a lightweight alternative to Electron, using the Babylon.js 3D engine. Users can create an edit 3D worlds in which they can associate items in the world with notes, flashcards, files, links, and more!
      </p>
			<SectionTabs
				tabs={[
					"Screenshots",
					"Demo",
				]}
			>
				<SectionTabsContent value="Screenshots">
  				<ArticleCarousel>
  					<CarouselItem>
  						<JsdImage
  							width={2560}
  							height={1440}
  							className="m-auto max-h-220"
  							src="ordiri/office_1.jpg"
  							alt="Office memory palace"
  						/>
  					</CarouselItem>
  					<CarouselItem>
  						<JsdImage
  							width={2560}
  							height={1440}
  							className="m-auto max-h-220"
  							src="ordiri/office_2.jpg"
  							alt="Opening a flashcard"
  						/>
  					</CarouselItem>
  					<CarouselItem>
  						<JsdImage
  							width={2560}
  							height={1440}
  							className="m-auto max-h-220"
  							src="ordiri/ship_1.jpg"
  							alt="Editing a DevOps memory palace on a boat."
  						/>
  					</CarouselItem>
  					<CarouselItem>
  						<JsdImage
  							width={2560}
  							height={1440}
  							className="m-auto max-h-220"
  							src="ordiri/warmed_6.jpg"
  							alt="Memory Palace for the WARMED acronym."
  						/>
  					</CarouselItem>
  					<CarouselItem>
  						<JsdImage
  							width={2560}
  							height={1440}
  							className="m-auto max-h-220"
  							src="ordiri/rocks_1.jpg"
  							alt="Memory Palace for the SOLID acronym."
  						/>
  					</CarouselItem>
  				</ArticleCarousel>
				</SectionTabsContent>
        <SectionTabsContent value="Demo">
          <div>
						<YoutubeWrapper url="https://www.youtube.com/embed/CLYUCqENEAI?si=QEmBlpg24FBjKDz5" />
					</div>
				</SectionTabsContent>
			</SectionTabs>
		</article>
	);
}
