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
import Zoom from "@/components/general/zoom";

export default function OrdiriArticle() {
	return (
		<article>
			<ArticleHeader article={data}>Ordiri</ArticleHeader>
			<p className="pb-4">
			  I am working on a tool to author 3D digital memory palaces. The application aims to bring research into memory palaces to a user-friendly product. This prototype was built on <b>Tauri</b>, a lightweight alternative to Electron, using the <b>Babylon.js</b> 3D engine. Users can create and edit 3D worlds in which they can associate items in the world with notes, flashcards, files, links, and more!
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
              <Zoom>
    						<JsdImage
   							width={2560}
   							height={1440}
   							className="m-auto max-h-220"
   							src="ordiri/office_1.jpg"
   							alt="Office memory palace"
    						/>
                <p>
                  A memory palace in an office location. Items around the office are linked to various information and resources.
                </p>
              </Zoom>
  					</CarouselItem>
  					<CarouselItem>
              <Zoom>
    						<JsdImage
   							width={2560}
   							height={1440}
   							className="m-auto max-h-220"
   							src="ordiri/office_2.jpg"
   							alt="Opening a flashcard"
    						/>
                <p>
                  In this palace, a stack of papers has been associated with a deck of flashcards.
                </p>
              </Zoom>
  					</CarouselItem>
  					<CarouselItem>
              <Zoom>
    						<JsdImage
   							width={2560}
   							height={1440}
   							className="m-auto max-h-220"
   							src="ordiri/ship_1.jpg"
   							alt="Editing a DevOps memory palace on a boat."
    						/>
                <p>
                  Editor view of a memory palace representing the stages of DevOps, set on a boat.
                </p>
              </Zoom>
  					</CarouselItem>
  					<CarouselItem>
              <Zoom>
    						<JsdImage
   							width={2560}
   							height={1440}
   							className="m-auto max-h-220"
   							src="ordiri/warmed_6.jpg"
   							alt="Memory Palace for the WARMED acronym."
    						/>
                <p>
                  A memory palace in a mountain castle.
                </p>
              </Zoom>
  					</CarouselItem>
            <CarouselItem>
              <Zoom>
    						<JsdImage
   							width={2560}
   							height={1440}
   							className="m-auto max-h-220"
   							src="ordiri/rocks_1.jpg"
   							alt="Memory Palace for the SOLID acronym."
                />
                <p>
                  A memory palace in a rocky canyon.
                </p>
              </Zoom>
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
