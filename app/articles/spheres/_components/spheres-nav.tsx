import ArticleNav, { type ArticlePage } from "../../_components/article-nav";

const pages: readonly ArticlePage[] = [
	["Intro", "/articles/spheres/"],
	["Circumference", "/articles/spheres/circumference/"],
	["Area", "/articles/spheres/area/"],
	["Surface", "/articles/spheres/surface/"],
	["Volume", "/articles/spheres/volume/"],
];

export default function SpheresNav({
	className = "",
	header = false,
}: {
	className?: string;
	header?: boolean;
}) {
	return (
		<ArticleNav
			pages={pages}
			title={header ? "Spheres from Scratch" : undefined}
			className={className}
		/>
	);
}
