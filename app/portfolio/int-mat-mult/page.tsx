import {
	ArticleCarousel,
	CarouselItem,
} from "@/app/portfolio/_components/article-carousel";
import JsdImage from "@/components/general/jsdelivr-image";
import Zoom from "@/components/general/zoom";
import { ArticleHeader } from "../_components/article-header";
import { data } from "./data";

export default function IntMatMultArticle() {
	return (
		<article>
			<ArticleHeader article={data} />
			<div>
				In order to help students visualize matrix multiplication I implemented
				an interactive web widget with Vue. Users can drag the vector arrowheads
				and see the result in real-time. A key feature for demonstration
				purposes is that making the matrix linearly dependent shows the null
				space solutions as a red line.
			</div>
			<ArticleCarousel>
				<CarouselItem>
					<Zoom label="Interactive Matrix Multiplication">
						<JsdImage
							width={1051}
							height={616}
							className="m-auto"
							src="matrix_mult2.jpg"
							alt="Interactive Matrix Multiplication"
						/>
					</Zoom>
				</CarouselItem>
				<CarouselItem>
					<Zoom label="Null space solutions">
						<JsdImage
							width={1031}
							height={612}
							className="m-auto"
							src="matrix_mult.jpg"
							alt="Null space solutions"
						/>
					</Zoom>
				</CarouselItem>
			</ArticleCarousel>
		</article>
	);
}
