import type { Metadata } from "next";
import { MathJaxContext } from "better-react-mathjax";
import EmailLink from "@/components/general/email-link";
import './quats.css'

import QuatsNav from "@/components/quats/quats-nav";

export const metadata: Metadata = {
  title: "Quaternions from Scratch",
  description: "A Journey from p to p'",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <QuatsNav header={true} className="mt-4 mb-14"></QuatsNav>
      <MathJaxContext>
        {children}
      </MathJaxContext>
      <QuatsNav className="mt-18"></QuatsNav>
      <EmailLink className="mt-2"></EmailLink>
    </div>
  );
}
