import { MathJaxContext } from "better-react-mathjax";
import type { Metadata } from "next";
import EmailLink from "@/components/general/email-link";
import "../article.css";

export const metadata: Metadata = {
	title: "Volume of Sphere",
	description: "Find the volume of a sphere using Cavalieri's Principle",

	openGraph: {
		title: "Volume of Sphere",
		description: "Find the volume of a sphere using Cavalieri's Principle",
		url: "https://kruft.xyz/articles/volume-of-sphere/",
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
			<MathJaxContext>
				{children}
			</MathJaxContext>
			<EmailLink className="mt-2"></EmailLink>
		</div>
	);
}
