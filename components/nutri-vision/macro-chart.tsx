"use client"

import { useMemo } from "react"

interface MacroChartProps {
  protein: number
  carbs: number
  fat: number
}

export function MacroChart({ protein, carbs, fat }: MacroChartProps) {
  const data = useMemo(() => {
    const total = protein + carbs + fat
    if (total === 0) return { protein: 33, carbs: 34, fat: 33 }

    return {
      protein: Math.round((protein / total) * 100),
      carbs: Math.round((carbs / total) * 100),
      fat: Math.round((fat / total) * 100),
    }
  }, [protein, carbs, fat])

  // Calculate stroke-dasharray for each segment
  const circumference = 2 * Math.PI * 45 // radius = 45
  const proteinDash = (data.protein / 100) * circumference
  const carbsDash = (data.carbs / 100) * circumference
  const fatDash = (data.fat / 100) * circumference

  const proteinOffset = 0
  const carbsOffset = -proteinDash
  const fatOffset = -(proteinDash + carbsDash)

  return (
    <div className="flex items-center gap-6">
      <div className="relative h-32 w-32">
        <svg className="h-full w-full -rotate-90" viewBox="0 0 100 100">
          {/* Background circle */}
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="currentColor"
            strokeWidth="10"
            className="text-secondary"
          />
          {/* Fat segment */}
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="hsl(45, 90%, 55%)"
            strokeWidth="10"
            strokeDasharray={`${fatDash} ${circumference}`}
            strokeDashoffset={fatOffset}
            className="transition-all duration-500"
          />
          {/* Carbs segment */}
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="hsl(200, 80%, 55%)"
            strokeWidth="10"
            strokeDasharray={`${carbsDash} ${circumference}`}
            strokeDashoffset={carbsOffset}
            className="transition-all duration-500"
          />
          {/* Protein segment */}
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="hsl(160, 70%, 45%)"
            strokeWidth="10"
            strokeDasharray={`${proteinDash} ${circumference}`}
            strokeDashoffset={proteinOffset}
            className="transition-all duration-500"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-2xl font-bold">{protein + carbs + fat}g</span>
          <span className="text-xs text-muted-foreground">Total</span>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-[hsl(160,70%,45%)]" />
          <span className="text-sm">
            Protein: <span className="font-medium">{protein}g</span>
            <span className="ml-1 text-muted-foreground">({data.protein}%)</span>
          </span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-[hsl(200,80%,55%)]" />
          <span className="text-sm">
            Carbs: <span className="font-medium">{carbs}g</span>
            <span className="ml-1 text-muted-foreground">({data.carbs}%)</span>
          </span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-[hsl(45,90%,55%)]" />
          <span className="text-sm">
            Fat: <span className="font-medium">{fat}g</span>
            <span className="ml-1 text-muted-foreground">({data.fat}%)</span>
          </span>
        </div>
      </div>
    </div>
  )
}
