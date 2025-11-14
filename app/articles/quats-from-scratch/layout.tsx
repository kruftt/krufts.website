import { MathJax, MathJaxContext } from "better-react-mathjax";
import QuatsNav from "./quats-nav";
import BmacButton from "@/components/general/bmac-button";

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
      <div className="flex justify-center">
        <BmacButton></BmacButton>
      </div>
    </div>
  );
}
