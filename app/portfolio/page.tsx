"use client";
import { useCallback, useEffect, useState } from "react";
import {
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger,
} from "@/components/portfolio/portfolio-tabs";
import TagButton from "@/components/portfolio/tag-button";
import { PortfolioDispatch, PortfolioState, usePortfolio } from "./reducer";

export default function Portfolio() {
	const [state, dispatch] = usePortfolio();
	const [tab, changeTab] = useState(state.articleList[0]);
	const [updating, changeUpdating] = useState(false);

	const updateSelection = useCallback(() => {
		const articleName = window.location.hash.slice(1).replaceAll("-", " ");
		const index = state.articleList.indexOf(articleName);
		if (index === -1) {
			// changeTab(state.articleList[0])
			// updateHash(state.articleList[0])
		} else {
			changeTab(articleName);
			changeUpdating(true); // updateHash gives wrong value
		}
	}, [state]);

	useEffect(() => {
		addEventListener("popstate", updateSelection);
		updateSelection();
	}, [updateSelection]);

	const updateHash = useCallback(
		(articleName: string) => {
			if (updating) {
				changeUpdating(false);
				return;
			}

			window.location.hash = "#" + articleName.replaceAll(" ", "-");
			changeTab(articleName);
		},
		[updating],
	);

	return (
		<PortfolioState value={state}>
			<PortfolioDispatch value={dispatch}>
				<section className="mt-8">
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
							•
							<a href="mailto:marc.t.doucette@gmail.com">
								Email
							</a>
						</div>
					</div>
					<div className="text-center flex gap-1 justify-center mt-10 mb-8">
						{Object.values(state.tags).map((tag) => (
							<TagButton
								key={tag.name}
								tag={tag}
								selected={state.anySelected ? state.selected[tag.name] : true}
								toggle={() => dispatch({ type: "tag_toggle", tag: tag.name })}
							/>
						))}
					</div>
				</section>
				<Tabs
					// defaultValue={defaultValue}
					value={tab}
					className="min-h-200 mb-20"
					onValueChange={updateHash}
				>
					<TabsList>
						{state.articleList.map((title) => (
							<TabsTrigger
								key={title}
								value={title}
								indicators={state.indicators[title]}
							/>
						))}
					</TabsList>
					{state.articleList.map((title) => {
						const Component = state.articles[title].Component;
						return (
							<TabsContent key={title} value={title}>
								<Component />
							</TabsContent>
						);
					})}
				</Tabs>
			</PortfolioDispatch>
		</PortfolioState>
	);
}
