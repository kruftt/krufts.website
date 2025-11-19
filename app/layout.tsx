import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Krufts Website",
  description: "Personal website for portfolio and projects",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" >
      <head>
        <link rel="shortcut icon" type="image/x-icon" href="/favicon.ico" />
        {/* <script type="importmap">
          {`{
            "imports": {
              "three": "https://cdn.jsdelivr.net/npm/three@0.181.1/build/three.module.js",
              "three/addons/": "https://cdn.jsdelivr.net/npm/three@0.181.1/examples/jsm/"
            }
          }`}
        </script> */}
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-50`}
      >
        {children}
      </body>
    </html>
  );
}
