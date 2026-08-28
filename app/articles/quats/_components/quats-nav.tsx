import ArticleNav, { type ArticlePage } from "../../_components/article-nav";

const pages: readonly ArticlePage[] = [
	["Intro", "/articles/quats/"],
	["0", "/articles/quats/0/"],
	["1", "/articles/quats/1/"],
	["2", "/articles/quats/2/"],
	["3", "/articles/quats/3/"],
	["4", "/articles/quats/4/"],
];

export default function QuatsNav({
	className = "",
	header = false,
}: {
	className?: string;
	header?: boolean;
}) {
	return (
		<ArticleNav
			pages={pages}
			title={header ? "Quaternions From Scratch" : undefined}
			className={className}
		/>
	);
}
