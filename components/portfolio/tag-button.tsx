import { Button } from '@/components/ui/button'
import { cn } from "@/lib/utils"

export default function TagButton(
  { selected, tag, toggle }:
  { selected: boolean, tag: TagData, toggle: () => void }
) {
  const color = selected
    ? tag.color || 'bg-purple-600 hover:bg-purple-500'
    : 'bg-gray-600 hover:bg-gray-500'
  
  return (
    <Button
      className={cn(
        color,
        'text-white',
        'h-6 p-1 rounded-full text-sm border-1 border-gray-500',
      )}
      onClick={toggle}
      variant={'default'}
    >#{tag.name}</Button>
  )
}
