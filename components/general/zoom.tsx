"use client";

import type { ReactNode } from "react";
import {
	Dialog,
	DialogContent,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

export default function Zoom({
	trigger,
	children,
	label = "Zoomed view",
	className,
}: {
	trigger?: ReactNode;
	children: ReactNode;
	label?: string;
	className?: string;
}) {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<button
					type="button"
					aria-label="Zoom in"
					className={cn("block w-full text-left cursor-zoom-in! bg-transparent p-0 border-0", className)}
				>
					{trigger ?? children}
				</button>
			</DialogTrigger>
			<DialogContent
				className="max-w-[90vw] w-auto sm:max-w-[90vw] max-h-[90vh] p-0 border-0 rounded-sm shadow-none overflow-auto flex flex-col justify-safe-center items-safe-center bg-card [&_img]:max-w-none! [&_img]:max-h-none! [&_img]:w-auto! [&_img]:h-auto!"
				showCloseButton={false}
			>
				<DialogTitle className="sr-only">{label}</DialogTitle>
				<div className="w-max max-w-none">{children}</div>
			</DialogContent>
		</Dialog>
	);
}
