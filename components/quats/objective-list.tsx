"use client"

// import { useEffect, useRef, useState } from "react"
// import JsdImage from "../general/jsdelivr-image";
import { cn } from "@/lib/utils"


interface ObjectiveDef {
  name: string
  indicators?: number
}

interface ObjectiveItemData {
  name: string
  indicators: number[]
  complete: boolean
}

export interface ObjectiveListData {
  objectives: ObjectiveItemData[]
  active: number
}

export class ObjectiveListManager {
  public objectives: ObjectiveItemData[]
  public activeObjective: number = 0
  
  constructor(...objectives: ObjectiveDef[]) {
    const _objectives: ObjectiveItemData[] = []
    for (const objective of objectives) {
      const indicators: number[] = []
      for (let i = 0; i < (objective.indicators || 1); i++) {
        indicators.push(0)
      }
      _objectives.push({
        complete: false,
        indicators,
        name: objective.name,
      })
    }
    this.objectives = _objectives
  }

  getData(): ObjectiveListData {
    return {
      objectives: this.objectives,
      active: this.activeObjective,
    }
  }

  setProgress(objective: number, progress: number) {
    if (objective !== this.activeObjective) return this
    const _objective = this.objectives[objective]
    const indicators = _objective.indicators

    if (progress >= _objective.indicators.length) {
      _objective.complete = true
      this.activeObjective += 1
    }

    let i;
    for (i = 0; i < Math.min(progress - 0.9999, indicators.length); i++) {
      indicators[i] = 100
    }

    const remainder = (i === 0) ? progress : progress % i
    if (remainder > 0.01 && i < indicators.length) {
      indicators[i] = Math.round(100.0 * remainder)
      i += 1
    }

    for (i; i < indicators.length; i++) {
      indicators[i] = 0
    }

  }
}


export function ObjectiveList({ className, objectives }: {
  className?: string
  objectives: ObjectiveListData
}) {
  return (
    <div className={cn(
      "flex justify-center gap-3",
      'transition-opacity duration-1600',
      objectives.active < objectives.objectives.length
        ? ''
        : 'opacity-0',
      className
    )}>
      <div className="flex flex-col"> {
        objectives.objectives.map((objective, i) => {
          return (
            <div
              key={i}
              className={cn(
                "flex gap-2 items-center justify-end h-[1.5em]",
                "transition-opacity duration-1200",
                objectives.active >= i ? 'opacity-100' : 'opacity-0',
            )}>
              {
                objective.indicators.map((progress, i) =>
                  <ObjectiveIndicator key={i} progress={progress}></ObjectiveIndicator>)
              }
            </div>
        )})}
      </div>
      <div className={cn(
        "flex flex-col justify-left",
      )}>
        {
          objectives.objectives.map((objective, i) => {
            return (
              <ObjectiveText
                key={i}
                className={cn(
                  "transition-opacity duration-1000",
                  objectives.active >= i ? 'opacity-100' : 'opacity-0',
                )}
                objective={objective}>
              </ObjectiveText>
        )})}
      </div>
    </div>
  )
}


function ObjectiveIndicator({ progress }: { progress: number }) {
  return (
    <div className={cn("w-3 h-3 outline-2 rounded-md outline-black")}>
      <div className={cn(
        "w-4 h-4 relative right-0.5 bottom-0.5",
        'bg-black rounded-md',
      )}
        style={{ opacity: `${Math.pow(progress / 100, 2)}` }}
      ></div>
    </div>
  )
}

function ObjectiveText({ className, objective }: {
  className?: string
  objective: ObjectiveItemData
}) {
  return (
    <div className={cn(
      (objective.complete ? "line-through" : ""),
      className
    )}>
      {objective.name }
    </div>
  )
}