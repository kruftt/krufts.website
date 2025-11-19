import { cn } from "@/lib/utils"

export default function EmailLink({ className }: { className?: string }) {
  return (
    <div className={cn("flex justify-center", className)}>
      <a className='text-sky-950' href="mailto:kruft.webmaster@gmail.com">kruft.webmaster@gmail.com</a>
    </div>
  )
}
