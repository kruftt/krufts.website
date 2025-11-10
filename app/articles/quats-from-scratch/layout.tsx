import { MathJax, MathJaxContext } from "better-react-mathjax";
import QuatsNav from "./quats-nav";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <QuatsNav></QuatsNav>
      <MathJaxContext>
        <MathJax>
          {children}
        </MathJax>
      </MathJaxContext>
      <QuatsNav></QuatsNav>
    </div>
  );
}
