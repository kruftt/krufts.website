import type { Metadata } from "next";
// import LinkBar from '@/components/general/link-bar'
import "./portfolio.css";

export const metadata: Metadata = {
  title: "Marc Doucette - Portfolio",
  description: "Marc Doucette's portfolio.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="max-w-4xl min-h-200 m-auto">
      {/* <LinkBar></LinkBar> */}
      {children}
    </div>
  );
}
