'use client'

import { Button } from '@/components/ui/button'
import { cn } from "@/lib/utils"

export default function BmcButton() {
  return (
    <Button
      onClick={() => window.open('https://buymeacoffee.com/kruft')}
      className={cn(
        // 'bg-gray-200 hover:bg-white active:bg-gray-800',
        // 'drop-shadow-sm hover:drop-shadow-lg',
        // 'active:text-gray-100',
        // 'pl-4 pr-4 rounded-2xl text-sm border-1 border-gray-500 ',
        'border hover:border-gray-300 active:border-gray-400',
        'hover:bg-white active:bg-white',
        'bg-[url(/img/bmc-button.svg)] bg-cover',
        'w-42 h-12 mt-12'
      )}
      variant={'default'}
    >
    </Button>
  )
}
