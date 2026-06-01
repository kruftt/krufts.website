import { ArticleHeader } from "../_components/article-header";
import LightBox from "../_components/light-box";
import { data } from "./data";

export default function LightboxArticle() {
	return (
		<article>
			<ArticleHeader article={data}>The Lightbox</ArticleHeader>
			<section>
				<div className="mb-8">
					<p>
						While studying visual perception I created a small webpage using
						javascript and SVG to help demonstrate how our visual systems take
						into account lighting information during color perception.
					</p>
				</div>
				<LightBox />
			</section>
		</article>
	);
}
