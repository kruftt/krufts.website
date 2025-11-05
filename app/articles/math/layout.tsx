import { MathJaxContext } from "better-react-mathjax";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <MathJaxContext>
      {children}
    </MathJaxContext>
  );
}
