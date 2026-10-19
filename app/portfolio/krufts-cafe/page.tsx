import YoutubeWrapper from "@/app/portfolio/_components/youtube-wrapper";
import { ArticleHeader } from "../_components/article-header";
import { data } from "./data";
import { ArticleCarousel, CarouselItem } from "../_components/article-carousel";
import JsdImage from "@/components/general/jsdelivr-image";

export default function KruftsCafeArticle() {
	return (
		<article>
			<ArticleHeader article={data}>Kruft's Cafe</ArticleHeader>
			<p>
				I recently designed and built a full-stack cooking recipe website
				designed to make the process of actually using a recipe in the kitchen
				as seamless as possible, using cutting-edge tools and libraries.
      </p>
      <p>
				I used <b>Figma</b> to create the initial design, and with the support
				of <b>Claude Code</b> I sketched out a <b>React Router v7</b> project
				template to begin iterating on.
      </p>

			<div className="text-center">
        <div className="mt-6">Built with:</div>
				<div className="">
  				<ul className="list-inside">
  					<li><b>React Router v7</b> (framework)</li>
  					<li><b>Postgres + kysely + Prisma</b> (database)</li>
  					<li><b>tRPC + zod</b> (data endpoints and validation)</li>
  					<li><b>React + tailwindcss + shadcn/ui</b> (client ui)</li>
  					<li><b>Tanstack query + Jotai</b> (client state)</li>
  					<li><b>Bun</b> (js environment)</li>
          </ul>
				</div>
			</div>

      <ArticleCarousel>
        <CarouselItem>
          <JsdImage src="cafe/cafe-recipe.png" width={1056} height={1182} alt="Recipe view for cooking." />
        </CarouselItem>
        <CarouselItem>
          <JsdImage src="cafe/cafe-list.png" width={989} height={761} alt="Searchable recipe lists" />
        </CarouselItem>
        <CarouselItem>
          <JsdImage src="cafe/cafe-edit.png" width={962} height={901} alt="Editing a recipe" />
        </CarouselItem>
        <CarouselItem>
          <JsdImage src="cafe/cafe-plan.png" width={941} height={879} alt="Meal Planning" />
        </CarouselItem>
        <CarouselItem>
          <JsdImage src="cafe/cafe-shopping.png" width={873} height={923} alt="Ingredient shopping list based on meal plans" />
        </CarouselItem>
      </ArticleCarousel>

 			<div className="flex justify-center text-md mb-6">
				<div>
					<div className="font-bold mt-4">Features include:</div>
					<ul className="list-disc pl-6">
						<li>Mobile-first design</li>
						<li>
							Structured recipes with ingredient groups and step-by-step
							instructions.
						</li>
						<li>Bookmarks (a personal library)</li>
						<li>Pins (switch between recipes on the fly)</li>
						<li>
							Filtering and sorting based on: name, tags, ingredients, and
							author.
						</li>
						<li>Scaled ingredient amounts.</li>
						<li>One-touch navigation.</li>
						<li>A clean authoring and publishing experience.</li>
             </ul>
				</div>
			</div>

      <YoutubeWrapper url="https://youtube.com/embed/76LqlabKbEY?si=ZDGrLnxvTclzXa4V" />
		</article>
	);
}
