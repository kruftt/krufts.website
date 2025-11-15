'use client'

import { useEffect, useState } from "react";
import { MathJaxContext } from "better-react-mathjax";
import BmcButton from "@/components/general/bmc-button";
import { QuatsNav } from "./components";
import './quats.css'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // const [isClient, setIsClient] = useState(false)
  // useEffect(()=>{
  //   setIsClient(true)
  // })

  const path_regex = /\/articles\/quats-from-scratch\/([^\/]*)\/?/g
  const [name, setName] = useState<string>('loading')
  
  useEffect(() => {
    const match = path_regex.exec(window.location.pathname)
    const _name = match && match[1]
    if (_name !== null) setName(_name)
  })

  return (
    <div className="mb-16">
      <QuatsNav selected={name} header={true}></QuatsNav>
      <MathJaxContext>
        {children}
      </MathJaxContext>
      <QuatsNav selected={name}></QuatsNav>
      <div className="flex justify-center">
        <BmcButton></BmcButton>
      </div>
    </div>
  );
}
