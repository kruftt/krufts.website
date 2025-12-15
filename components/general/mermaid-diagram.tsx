"use client"

import { useCallback, useEffect, useRef, useState } from "react";
import mermaid, { type MermaidConfig } from "mermaid";
import { cn } from "@/lib/utils";

export default function MermaidDiagram({ diagram, className, config, name }: { diagram: string, className?: string, config?: MermaidConfig, name: string }) {
  const ref = useRef<HTMLDivElement | null>(null);
  // const [svgData, setSvgData] = useState("");
  const [error, setError] = useState<string | null>(null);

  // const saveSVG = useCallback(() => {
  //   if (svgData) { 
  //     const blob = new Blob([svgData], { type: "image/svg+xml" });
  //     const url = URL.createObjectURL(blob);
  //     const a = document.createElement("a");
  //     a.href = url;
  //     a.download = `mermaid-${name}.svg`;
  //     a.click();
  //   }
  // }, [svgData, name])

  // const saveDiagram = useCallback(() => {
  //   const blob = new Blob([diagram], { type: "text/vnd.mermaid" })
  //   const url = URL.createObjectURL(blob)
  //   const a = document.createElement("a")
  //   a.href = url
  //   a.download = `mermaid-${name}.mmd`
  //   a.click();
  // }, [diagram, name])

  const renderDiagram = useCallback(async () => {
    try {
      mermaid.initialize({
        startOnLoad: false,
        theme: "neutral",
        securityLevel: "loose",
        suppressErrorRendering: true,
        ...config,
      });

      const { svg } = await mermaid.render(`mermaid-${name}`, diagram);
      // setSvgData(svg);
      setError(null);
      if (ref.current) {
        ref.current.innerHTML = svg;
      }
    } catch (err: unknown) {
      setError((err as Error).message);
      // setSvgData("");
    }
  }, [config, name, diagram]);
  
  useEffect(() => {
    // @ts-expect-error: toJSON is not on type
    HTMLElement.prototype.toJSON = () => "";
    renderDiagram();
  }, [renderDiagram]);
  
  
  return (
    <div className={cn('mt-6', className)}>
      <div className="flex justify-center" ref={ref}>{ error }</div>
      {/* <div className="flex gap-2 mt-12 mb-6 justify-center">
        <SimpleButton className="p-2 h-8 bg-gray-50 font-normal text-gray-800 border-none" onClick={saveSVG}>Save as SVG</SimpleButton>
        <SimpleButton className="p-2 h-8 bg-gray-50 font-normal text-gray-800 border-none" onClick={saveDiagram}>Save as Mermaid file</SimpleButton>
      </div> */}
    </div>
  )
}

