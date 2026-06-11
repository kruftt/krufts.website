"use client";
import "./portfolio.css";
import { MathJaxContext } from "better-react-mathjax";
import { ChevronDownIcon, ChevronUpIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
// import {
// 	type DirectoryFolder,
// 	DirectoryView,
// } from "@/components/general/directory";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
} from "@/components/ui/card";
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { cn } from "@/lib/utils";
import type { ArticleData } from "./_types";
import { data as aimeData } from "./aime/data";
import { data as apolloData } from "./apollo/data";
import { data as dotsData } from "./dots/data";
import { data as intmatmultData } from "./int-mat-mult/data";
import { data as iQueueData } from "./iQueue/data";
import { data as kruftsCafeData } from "./krufts-cafe/data";
import { data as lightboxData } from "./lightbox/data";
import { data as lostSkiesData } from "./lost-skies/data";
import { data as metaviewData } from "./metaview/data";
import { data as quatsData } from "./quats/data";
import { data as ribbitData } from "./ribbit/data";
import { data as tetherData } from "./tether/data";
import { data as tutorData } from "./tutor/data";
import { data as ussFilterData } from "./uss-filter/data";
import { data as valheimData } from "./valheim/data";

const data = {
	about: {
		name: "About Me",
		path: "about-me",
		tags: ["web", "games", "edu"],
		links: [],
	},

	colors: {
		web: "bg-red-500",
		games: "bg-emerald-600",
		edu: "bg-blue-500",
		// ui: "bg-emerald-600",
		// games: "bg-blue-500",
		// edu: "bg-yellow-600",
		// music: "bg-red-500",
	},

	items: [
		kruftsCafeData,
		quatsData,
		dotsData,
		apolloData,
		ussFilterData,
		valheimData,
		tutorData,
		intmatmultData,
	],
	more: [
		lostSkiesData,
		tetherData,
		metaviewData,
		iQueueData,
		aimeData,
		ribbitData,
		lightboxData,
	],
};
function PortfolioLink({
	item,
	active,
	pathname,
	visited,
}: {
	item: ArticleData;
	active: string;
	pathname: string;
	visited: Set<string>;
}) {
	const href = `/portfolio/${item.path}/`;
	const onPage = pathname === href;
	const isVisited = visited.has(href);
	return (
		<Link
			href={href}
			className={cn(
				"flex items-center px-1.5 py-1 inset-shadow-gray-200",
				"transition-shadow duration-75 hover:shadow-[inset_-1px_1px_6px_rgba(0,0,0,.12)]",
				onPage &&
					"shadow-[inset_-1px_1px_6px_rgba(0,0,0,.12)] bg-primary-foreground",
			)}
		>
			<div className="flex items-center gap-1 p-1 bg-accent">
				{Object.keys(data.colors).map((key) => (
					<div
						key={key}
						className={cn(
							"w-2 h-2 transition-colors",
							item.tags.includes(key)
								// ? active.includes(key)
								? !active.length || active.includes(key)
								// ? active.includes(key)
								// ? !active || active.includes(key)
									?	data.colors[key as keyof typeof data.colors]
									: "bg-muted"
								: "bg-accent",
						)}
					/>
				))}
			</div>
			<div
				className={cn(
					"text-sm font-semibold overflow-hidden whitespace-nowrap ml-2",
					// isVisited && "line-through", //text-muted-foreground && !onPage
					isVisited && !onPage && "text-muted-foreground",
					isVisited && "line-through",
				)}
			>
				{item.name}
			</div>
		</Link>
	);
}

export default function PortfolioLayout({ children }: React.PropsWithChildren) {
	// const [active, setActive] = useState<string[]>([]);
	const [active, setActive] = useState<string>("");
	const [open, setOpen] = useState(false);
	const [visited, setVisited] = useState<Set<string>>(new Set());
	const pathname = usePathname();

	useEffect(() => {
		setVisited((prev) =>
			prev.has(pathname) ? prev : new Set(prev).add(pathname),
		);
	}, [pathname]);


	return (
		<main className=" mx-auto">
			<MathJaxContext>
				<section className="mt-5 mb-4">
					<div className="text-center">
						<h3 className="text-4xl">Marc Doucette</h3>
						<h4 className="text-xl">
							Designer, Educator, and Software Developer
						</h4>
						<div className="flex gap-2 justify-center">
							<a href="https://github.com/kruftt/">Github</a>•
							<a href="https://www.linkedin.com/in/marc-doucette-47b17ba/">
								LinkedIn
							</a>
							•<a href="mailto:marc.t.doucette@gmail.com">Email</a>
						</div>
					</div>
				</section>
				<div className={cn(
					"mb-2 text-center font-semibold hover:underline",
					// pathname !== '/portfolio/about-me/' && "hover:underline"
				)}>
					<Link
						href="/portfolio/about-me/"
						// inert={pathname === '/portfolio/about-me/'}
					>
						About Me
					</Link>
				</div>
				<div className="flex flex-col items-center gap-6 p-2">
					{/* <div className="bg-card border p-1 rounded">{portfolioLink(data.about, active)}</div> */}

					<ToggleGroup
						type="single"
						value={active}
						variant="outline"
						onValueChange={(_active) => setActive(_active)}
					>
						{Object.keys(data.colors).map((tag) => (
							<ToggleGroupItem
								key={tag}
								value={tag}
								className={cn(
									"bg-card drop-shadow-sm",
									"hover:inset-shadow-sm hover:bg-card",
									"data-[state=on]:inset-shadow-sm",
								)}
							>
								<div
									className={cn(
										"w-2 h-2 transition-colors",
										// data.colors[tag as keyof typeof data.colors],
										!active || active.includes(tag)
											? data.colors[tag as keyof typeof data.colors]
											: "bg-muted",
									)}
								/>
								<div>{tag}</div>
							</ToggleGroupItem>
						))}
					</ToggleGroup>
					<Card className="max-w-2xl w-full drop-shadow-md rounded-sm pt-2 pb-0 gap-0">
						{/* <div className="flex justify-center pb-1 mb-3 border-b">{portfolioLink(data.about, active)}</div> */}
						<CardContent className="columns-[9rem] w-1/1 gap-1 px-2 space-y-1">
							{data.items.map((item) => (
								<PortfolioLink
									key={item.name}
									item={item}
									active={active}
									pathname={pathname}
									visited={visited}
								/>
							))}
						</CardContent>
						<Collapsible open={open} onOpenChange={setOpen}>
							<CollapsibleContent className="overflow-hidden data-[state=open]:animate-collapsible-down data-[state=closed]:animate-collapsible-up">
								<CardContent
									className={cn(
										"columns-[9rem] w-1/1 gap-1 border-t mt-2 pt-2 px-2",
									)}
								>
									{data.more.map((item) => (
										<PortfolioLink
											key={item.name}
											item={item}
											active={active}
											pathname={pathname}
											visited={visited}
										/>
									))}
								</CardContent>
							</CollapsibleContent>
							<CollapsibleTrigger className="w-1/1 mt-3  py-0.5 hover:bg-accent flex justify-center border-t">
								{open ? (
									<ChevronUpIcon size={20} />
								) : (
									<ChevronDownIcon size={20} />
								)}
							</CollapsibleTrigger>
						</Collapsible>
					</Card>
					<Card className="max-w-220 w-full drop-shadow-md rounded-b-none">
						<CardContent>{children}</CardContent>
					</Card>
				</div>
				<div className="mt-12 mb-4 text-center">
					<Button
						variant="link"
						onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
					>
						Back to Top
					</Button>
				</div>
			</MathJaxContext>
		</main>
	);
}
