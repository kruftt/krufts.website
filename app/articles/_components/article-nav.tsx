"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import BmcButton from "@/components/general/bmc-button";
import { cn } from "@/lib/utils";

/** An entry in an article's table of contents: `[displayName, address]`. */
export type ArticlePage = readonly [name: string, href: string];

const trim = (path: string) => path.replace(/\/+$/, "");

export default function ArticleNav({
	pages,
	title,
	className = "",
}: {
	pages: readonly ArticlePage[];
	/** Renders the article heading instead of the buy-me-a-coffee button. */
	title?: string;
	className?: string;
}) {
	const pathname = trim(usePathname());
	const index = pages.findIndex(([, href]) => trim(href) === pathname);
	const prev = index > 0 ? pages[index - 1][1] : null;
	const next =
		index !== -1 && index < pages.length - 1 ? pages[index + 1][1] : null;

	return (
		<div className={cn("flex flex-col items-center", className)}>
			{title && <h1 className={"pl-3 pr-3 rounded-md text-3xl mb-8"}>{title}</h1>}
			{pages.length > 1 && (
				<div className="flex flex-wrap gap-2 justify-center text-lg">
					{prev !== null && <StepButton href={prev} label="Previous" />}
					<div className="hidden sm:contents">
						{pages.map(([name, href], i) => (
							<LinkButton key={href} href={href} selected={i === index}>
								{name}
							</LinkButton>
						))}
					</div>
					{index !== -1 && (
						<LinkButton
							className="sm:hidden"
							href={pages[index][1]}
							selected={true}
						>
							{pages[index][0]}
						</LinkButton>
					)}
					{next !== null && <StepButton href={next} label="Next" flip />}
				</div>
			)}
			{!title && <BmcButton></BmcButton>}
		</div>
	);
}

function LinkButton({
	children,
	href,
	selected,
	className = "",
}: {
	children: React.ReactNode;
	href: string;
	selected: boolean;
	className?: string;
}) {
	return (
		<div
			className={cn(
				"rounded-md select-none",
				selected
					? "outline outline-muted bg-card/80 shadow-sm"
					: "hover:outline hover:outline-muted hover:bg/80-card cursor-pointer",
				className,
			)}
		>
			{(selected && (
				<span className="h-full block pl-3 pr-3">{children}</span>
			)) || (
				<Link className="h-full block pl-3 pr-3" href={href}>
					{children}
				</Link>
			)}
		</div>
	);
}

function StepButton({
	href,
	label,
	flip = false,
}: {
	href: string;
	label: string;
	flip?: boolean;
}) {
	return (
		<div className="rounded-md flex items-center select-none opacity-[0.9] hover:opacity-[1] hover:outline hover:outline-gray-300 hover:bg-white">
			<Link className="block pl-2 pr-2" href={href}>
				<svg
					className={cn("w-5 h-5", flip && "scale-x-[-1]")}
					viewBox="0 0 1 1"
				>
					<title>{label}</title>
					<path d="M 0.15 0.5 L 0.85 1.0 L 0.85 0 L 0.15 0.5"></path>
				</svg>
			</Link>
		</div>
	);
}
