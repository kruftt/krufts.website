"use client"

import * as React from "react"
import * as TabsPrimitive from "@radix-ui/react-tabs"
import { cn } from "@/lib/utils"

function Tabs({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Root>) {
  return (
    <TabsPrimitive.Root
      data-slot="tabs"
      className={cn("flex flex-col gap-2", className)}
      {...props}
    />
  )
}

function TabsList({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.List>) {
  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      className={cn(
        "bg-muted text-muted-foreground inline-flex flex-wrap p-1",
        "bg-white gap-x-2 m-auto max-w-168 mb-6 justify-center",
        className,
        "shadow rounded"
      )}
      {...props}
    />
  )
}

function TabsTrigger({
  value,
  className,
  indicators,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Trigger>
& {  indicators: Record<string, string>}) {return (
    <TabsPrimitive.Trigger
      data-slot="tabs-trigger"
      value={value}
      className={cn(
        "data-[state=active]:bg-gray-50 dark:data-[state=active]:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:outline-ring dark:data-[state=active]:border-input dark:data-[state=active]:bg-input/30 text-foreground dark:text-muted-foreground inline-flex items-center justify-left gap-1.5 border border-transparent px-2 py-1 text-sm font-medium whitespace-nowrap transition-[color,box-shadow] focus-visible:ring-[3px] focus-visible:outline-1 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:inset-shadow-sm inset-shadow-gray-200 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        "flex-grow-0 hover:bg-gray-50 w-40",
        className,
      )}
      {...props}
    >
      <div className="p-1 h-4 bg-gray-100 text-center flex justify-center gap-1">
        {Object.values(indicators).map((color, i) =>
          <div key={i} className={"h-2 w-2 transition-[background-color] duration-300 ease-in-out " + color} />
        )}
      </div>
      {value}
    </TabsPrimitive.Trigger>
  )
}

function TabsContent({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Content>) {
  return (
    <TabsPrimitive.Content
      data-slot="tabs-content"
      className={cn(
        "flex-1 outline-none",
        className,
        "bg-white rounded-lg shadow-lg p-4 min-h-220"
      )}
      {...props}
    />
  )
}

export { Tabs, TabsList, TabsTrigger, TabsContent }
