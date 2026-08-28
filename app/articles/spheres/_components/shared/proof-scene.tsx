"use client";

import { Canvas } from "@react-three/fiber";
import { type ReactNode, useState } from "react";
import { cn } from "@/lib/utils";
import { FADE_MS } from "./constants";

// What a scene needs from the step machine: which step is live, whether that
// step has committed and is fading out, and how to move on.
export type StepState = {
	currentStep: number;
	committing: boolean;
	onAdvance: () => void;
};

// The shell every proof scene in this article shares: the canvas, the step-dot
// row, the caption, and the reset button, plus the step state machine driving
// them. `children` is a render prop so the scene contents live inside <Canvas>.
export default function ProofScene({
	captions,
	doneCaption,
	camera,
	className,
	children,
}: {
	captions: readonly string[];
	doneCaption: string;
	camera: { position: [number, number, number]; fov: number };
	className?: string;
	children: (state: StepState) => ReactNode;
}) {
	const [currentStep, setCurrentStep] = useState(0);
	const [committing, setCommitting] = useState(false);
	const [nonce, setNonce] = useState(0);

	const stepCount = captions.length;

	// On commit, hold the step for one fade so the outgoing handle fades out
	// before the next step's handle / copies fade in.
	const advance = () => {
		setCommitting(true);
		window.setTimeout(() => {
			setCurrentStep((s) => Math.min(stepCount, s + 1));
			setCommitting(false);
		}, FADE_MS);
	};
	const reset = () => {
		setCurrentStep(0);
		setCommitting(false);
		setNonce((n) => n + 1);
	};

	const done = currentStep >= stepCount;
	const caption = done ? doneCaption : captions[currentStep];

	return (
		<div className={cn("select-none", className)}>
			<div className="m-auto w-full max-w-160 aspect-4/3 rounded-xl bg-white text-[#111] overflow-hidden">
				<Canvas
					key={nonce}
					// Default affordance: drag anywhere to orbit. `cursor` inherits, so
					// useGrabCursor's inline canvas style overrides this over a handle
					// and falls back to it elsewhere.
					className="cursor-all-scroll"
					gl={{ antialias: true }}
					camera={camera}
				>
					{children({ currentStep, committing, onAdvance: advance })}
				</Canvas>
			</div>

			<div className="mt-6 flex items-center justify-center gap-3">
				{captions.map((cap, i) => (
					<div
						key={cap}
						className={cn(
							"w-3 h-3 rounded-md outline-2 outline-black transition-colors",
							i < currentStep ? "bg-black" : "bg-transparent",
							i === currentStep ? "outline-dashed" : "",
						)}
					/>
				))}
			</div>

			<p className="mt-4 text-center min-h-[3em]">{caption}</p>

			<div className="flex justify-center">
				<button
					type="button"
					onClick={reset}
					className={cn(
						"border border-gray-400 pt-1 pb-1 pl-3 pr-3 rounded-lg",
						"bg-primary-foreground hover:bg-accent active:bg-muted cursor-pointer",
					)}
				>
					Reset
				</button>
			</div>
		</div>
	);
}
