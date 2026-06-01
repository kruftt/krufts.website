"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function BmcButton() {
	return (
		<Button
			className={cn(
				// 'bg-gray-200 hover:bg-white active:bg-gray-800',
				// 'drop-shadow-sm hover:drop-shadow-lg',
				// 'active:text-gray-100',
				// 'pl-4 pr-4 rounded-2xl text-sm border-1 border-gray-500 ',
				"border hover:border-gray-300 active:border-gray-400",
				"bg-accent hover:bg-white active:bg-white",
				process.env.NODE_ENV === "development"
					? "bg-[url(/img/bmc-button.svg)]"
					: "bg-[url(https://cdn.jsdelivr.net/gh/kruftt/krufts.website@images/bmc-button.svg)]",
				"bg-cover",
				"w-42 h-12 mt-12 cursor-pointer",
			)}
			variant={"default"}
		>
			<Link href="https://buymeacoffee.com/kruft" className="w-full h-full" />
		</Button>
	);
}
