import { MathJaxContext } from "better-react-mathjax";
import type { Metadata } from "next";
import EmailLink from "@/components/general/email-link";
import "../article.css";

import SpheresNav from "./_components/spheres-nav";

export const metadata: Metadata = {
	title: "Volume of Sphere",
	description: "Find the volume of a sphere using Cavalieri's Principle",

	openGraph: {
		title: "Volume of Sphere",
		description: "Find the volume of a sphere using Cavalieri's Principle",
		url: "https://kruft.xyz/articles/spheres/",
		// images: [
		// 	{
		// 		url: "https://cdn.jsdelivr.net/gh/kruftt/krufts.website@images/quats/axis_actions_background.png",
		// 	},
		// ],
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<div>
			<SpheresNav header={true} className="mt-4 mb-14"></SpheresNav>
			<MathJaxContext>
				{children}
			</MathJaxContext>
			<SpheresNav className="mt-18"></SpheresNav>
			<EmailLink className="mt-2"></EmailLink>
		</div>
	);
}
