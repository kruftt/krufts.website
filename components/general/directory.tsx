"use client";
import { StarIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { createContext, useContext, useState } from "react";
import { cn } from "@/lib/utils";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "../ui/accordion";

type DirectoryConfig = Record<string, string>;

export interface DirectoryItem {
	name: string;
	favorite?: boolean;
	path: string;
	tags: string[];
}

export interface DirectoryFolder {
	name: string;
	items: DirectoryItem[];
	folders: DirectoryFolder[];
}

type DirectoryContext = {
	config: DirectoryConfig;
	selected: Set<string>;
	toggle: (t: string) => void;
};

const DirectoryContext = createContext<DirectoryContext | null>(null);
function useDirectoryContext() {
	const context = useContext(DirectoryContext);
	if (!context) throw new Error("DirectoryContext used outside of Directory.");
	return context;
}

export function DirectoryView({
	config,
	data,
	defaultValue,
	...rest
}: {
	config: Record<string, string>;
	data: DirectoryFolder;
	defaultValue?: string;
} & React.ComponentProps<"div">) {
	const [selected, setSelected] = useState<Set<string>>(
		Object.keys(config).reduce((selected, tag) => {
			// selected.add(tag);
			return selected;
		}, new Set<string>()),
	);

	function toggle(tag: string) {
		// const out = new Set<string>(selected);
		const out = new Set<string>();
		// if (selected.has(tag) && selected.size === 1) {
		if (selected.has(tag)) {
      // out.delete(tag);
			// for (const key of Object.keys(config)) out.add(key);
		} else {
			out.add(tag);
		}
		setSelected(out);
	}

	return (
		<DirectoryContext value={{ config, selected, toggle }}>
			<div className="flex flex-col" {...rest}>
				<DirectoryLabel name={data.name} />
        <div className="mt-1" />
				<Accordion type="multiple">
					<div className="mt-1" />
					{data.items.map((entry) => (
						<DirectoryItem key={entry.name} item={entry} />
					))}
					<div className="mt-1" />
					{data.folders.map((entry) => (
						<DirectoryFolder key={entry.name} folder={entry} />
					))}
				</Accordion>
			</div>
		</DirectoryContext>
	);
}

export function DirectoryLabel({ name }: { name: string }) {
	const { config, selected, toggle } = useDirectoryContext();
	return (
		<div className="flex mt-12">
			<div className="flex gap-1 ml-0 mr-4">
				{Object.keys(config).map((key) => (
					<button
						key={key}
						type="button"
						className="relative w-4 h-4 rounded-lg!"
						onClick={() => toggle(key)}
					>
						<div className="absolute right-0.5 -top-2.5 origin-top-right rotate-45 p-0 border-b border-gray-600 pr-1.5 h-5 w-17 text-right font-mono font-light">
							{key}
						</div>
						<div
							className={cn(
								"w-4 h-4 rounded-lg! relative border border-gray-800",
								// (selected.size === 1 && selected.has(key)) ? config[key] : "bg-white",
								selected.has(key) ? config[key] : "bg-gray-50 hover:bg-gray-200",
							)}
						/>
					</button>
				))}
			</div>
			<div className="-ml-1.5">
				{/* <h1>{name}</h1> */}
				<Link
					href="/portfolio/about-me"
					className={cn(
						"-ml-0.5 flex gap-1.5 items-center h-6 hover:bg-accent hover:underline",
					)}
				>
					<StarIcon size={15} fill="yellow" />
					About Me
				</Link>
			</div>
			<div className="grow" />
		</div>
	);
}

export function DirectoryFolder({ folder }: { folder: DirectoryFolder }) {
	return (
		<AccordionItem value={folder.name} className="">
			<AccordionTrigger className="p-0">
				<div
					// type="button"
					className={cn(
						"w-1/1 flex gap-1 justify-start text-base font-semibold items-center",
						"hover:bg-accent hover:text-accent-foreground",
					)}
				>
					{/* <FolderIcon size={17} className="ml-22" color="#333" /> */}
					<div className="ml-22">{folder.name}</div>
				</div>
			</AccordionTrigger>
			<AccordionContent className="ml-0.5 pb-0">
				<Accordion type="single" className="flex flex-col">
					{folder.items.map((entry) => (
						<DirectoryItem key={entry.name} item={entry} />
					))}
					{folder.folders.map((entry) => (
						<DirectoryFolder key={entry.name} folder={entry} />
					))}
				</Accordion>
			</AccordionContent>
		</AccordionItem>
	);
}

export function DirectoryItem({ item }: { item: DirectoryItem }) {
	const { config, selected } = useDirectoryContext();
	const onRoute = usePathname().includes(item.path);

	return (
		<Link
			href={`/portfolio/${item.path}`}
			inert={onRoute}
			className={cn(
				"flex gap-1 items-center h-6 border-t hover:bg-accent hover:underline",
				onRoute ? "bg-muted text-black" : "",
			)}
		>
			{Object.keys(config).map((key) => (
				<div
					key={key}
					className={cn(
						"w-4 h-4 rounded-lg! border border-gray-400",
						item.tags.includes(key)
							? selected.has(key)
								? `${config[key]} border-gray-800`
								: "bg-gray-100"
							: "bg-transparent",
					)}
				/>
			))}
      <div className="mr-0.5" />
			{/* {item.favorite ? (
				<StarIcon size={17} fill="yellow" />
			) : (
				<FileIcon size={17} />
			)} */}
			<div className="grow text-sm">{item.name}</div>
		</Link>
	);
}
