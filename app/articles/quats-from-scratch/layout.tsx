'use client'

import { useEffect, useState } from "react";
import { MathJaxContext } from "better-react-mathjax";
import { QuatsNav } from "./components";
import EmailLink from "@/components/general/email-link";
import './quats.css'

const path_regex = /\/articles\/quats-from-scratch\/([^\/]*)\/?/g

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // const [isClient, setIsClient] = useState(false)
  // useEffect(()=>{
  //   setIsClient(true)
  // })

  const [name, setName] = useState<string>('loading')
  
  useEffect(() => {
    const match = path_regex.exec(window.location.pathname)
    const _name = match && match[1]
    if (_name !== null) setName(_name)
  }, [])

  return (
    <div>
      <QuatsNav selected={name} header={true} className="mt-4 mb-14"></QuatsNav>
      <MathJaxContext>
        {children}
      </MathJaxContext>
      <QuatsNav selected={name} className="mt-18"></QuatsNav>
      <EmailLink className="mt-2"></EmailLink>
    </div>
  );
}
