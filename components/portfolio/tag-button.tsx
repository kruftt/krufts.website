import { Button } from '@/components/ui/button'
import { cn } from "@/lib/utils"
import { ComponentProps } from 'react'

export default function TagButton(
  { selected, tag, toggle, ...props }:
  { selected: boolean, tag: TagData, toggle: () => void } & ComponentProps<'button'>
) {
  const color = selected
    ? tag.color + ' text-white' // || 'bg-purple-600 hover:bg-purple-500'
    : 'bg-gray-500 hover:bg-gray-400 text-gray-100'
  
  return (
    <Button
      className={cn(
        color,
        'h-6 p-2 pt-3 pb-3 rounded-full text-sm border-1 border-gray-800 hover:text-white',
      )}
      onClick={toggle}
      variant={'default'}
      {...props}
    >#{tag.name}</Button>
  )
}
