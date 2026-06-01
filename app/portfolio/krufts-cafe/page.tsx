import YoutubeWrapper from "@/app/portfolio/_components/youtube-wrapper";
import { ArticleHeader } from "../_components/article-header";
import { data } from "./data";

export default function KruftsCafeArticle() {
	return (
		<article>
			<ArticleHeader article={data}>Kruft's Cafe</ArticleHeader>
			<p>
				I've recently built a full-stack cooking recipe website designed to make the process of actually using a recipe in the kitchen as seamless as possible, using cutting-edge tools and libraries.
			</p>
			<div className="my-6">
				<YoutubeWrapper url="https://youtube.com/embed/76LqlabKbEY?si=ZDGrLnxvTclzXa4V" />
			</div>
			<div className="my-6 flex justify-center">
				<div>
					<div className="font-bold mt-10">Features include:</div>
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
					<div className="font-bold mt-6">The project is built with:</div>
					<ul className="list-disc pl-6">
						<li>React Router v7 (framework)</li>
						<li>Postgres + kysely + Prisma (database)</li>
						<li>tRPC + zod (data endpoints and validation)</li>
						<li>React + tailwindcss + shadcn/ui (client ui)</li>
						<li>Tanstack query + Jotai (client state)</li>
						<li>Bun (js environment)</li>
					</ul>
				</div>
			</div>
		</article>
	);
}
