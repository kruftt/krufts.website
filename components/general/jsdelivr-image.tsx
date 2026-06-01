"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";

export default function JsdImage({
	alt = "",
	src,
	className,
	...rest
}: {
	alt: string;
	src: string;
	className?: string;
} & React.ComponentProps<typeof Image>) {
	return (
		<Image
			alt={alt}
			src={
				process.env.NODE_ENV === "development"
					? `/img/${src}`
					: `https://cdn.jsdelivr.net/gh/kruftt/krufts.website@images/${src}`
			}
			className={cn("w-auto h-auto", className)}
			{...rest}
		/>
	);
}
