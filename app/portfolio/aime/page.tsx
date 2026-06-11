import {
	ArticleCarousel,
	CarouselItem,
} from "@/app/portfolio/_components/article-carousel";
import YoutubeWrapper from "@/app/portfolio/_components/youtube-wrapper";
import { ArticleHeader } from "../_components/article-header";
import { data } from "./data";

export default function AimeArticle() {
	return (
		<article>
			<ArticleHeader article={data}>
				AIME: An Interactive Music Environment
			</ArticleHeader>
			<div>
				<p>
					<b>
						As part of a
						<a className="ml-1" href="https://ccrma.stanford.edu/courses/220c/">
							seminar in Computer Music
						</a>
						, I created a Unity scene in which game entities controlled realtime
						audio synthesizers that were written in a signal processing language
						called <a href="https://chuck.cs.princeton.edu">ChucK</a>.
					</b>{" "}
					My favorite to play with was the "Granular Torch", a particle emitter
					in which the height of the particles corresponded to playback
					positions in an audio signal, such that as the flame particles moved
					in space the audio signal was traversed/played. I thought it would be
					fun to extend it in the future to play different audio signals at
					different horizontal locations.
				</p>
			</div>
			<ArticleCarousel>
				<CarouselItem>
					<YoutubeWrapper url="https://www.youtube.com/embed/95djFai0g3M" />
				</CarouselItem>
				<CarouselItem>
					<YoutubeWrapper url="https://www.youtube.com/embed/Clmu6Blo_E8" />
				</CarouselItem>
				<CarouselItem>
					<YoutubeWrapper url="https://www.youtube.com/embed/vOAQdsntKhM" />
				</CarouselItem>
			</ArticleCarousel>
		</article>
	);
}
