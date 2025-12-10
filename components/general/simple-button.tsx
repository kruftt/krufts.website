import { Button } from '@/components/ui/button'
import { cn } from "@/lib/utils"

export default function SimpleButton(
  { children, className, onClick }:
  React.HTMLProps<HTMLButtonElement>
) {
  return (
    <Button
      className={cn(
        'bg-gray-200 hover:bg-white active:bg-gray-800',
        'drop-shadow-sm hover:drop-shadow-lg',
        'active:text-gray-100',
        'pl-4 pr-4 rounded-2xl text-sm border-1 border-gray-500 ',
        className
      )}
      variant={'default'}
      onClick={onClick}
    >{ children }</Button>
  )
}
