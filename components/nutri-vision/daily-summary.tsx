"use client"

import { Flame, Beef, Wheat, Droplets, Target } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import type { TotalNutrition } from "@/lib/types"
import { DAILY_GOALS, getPercentageOfGoal } from "@/lib/nutrition-utils"

interface DailySummaryProps {
  totals: TotalNutrition
  mealCount: number
}

function CircularProgress({
  value,
  max,
  label,
  unit,
  color,
}: {
  value: number
  max: number
  label: string
  unit: string
  color: string
}) {
  const percentage = Math.min(100, Math.round((value / max) * 100))
  const circumference = 2 * Math.PI * 40

  return (
    <div className="flex flex-col items-center">
      <div className="relative h-24 w-24">
        <svg className="h-full w-full -rotate-90" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r="40"
            fill="none"
            stroke="currentColor"
            strokeWidth="8"
            className="text-secondary"
          />
          <circle
            cx="50"
            cy="50"
            r="40"
            fill="none"
            stroke={color}
            strokeWidth="8"
            strokeDasharray={circumference}
            strokeDashoffset={circumference - (percentage / 100) * circumference}
            strokeLinecap="round"
            className="transition-all duration-500"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-lg font-bold">{percentage}%</span>
        </div>
      </div>
      <div className="mt-2 text-center">
        <p className="font-medium">{label}</p>
        <p className="text-sm text-muted-foreground">
          {value}
          {unit} / {max}
          {unit}
        </p>
      </div>
    </div>
  )
}

export function DailySummary({ totals, mealCount }: DailySummaryProps) {
  const caloriePercentage = getPercentageOfGoal(totals.calories, "calories")

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5 text-primary" />
            Today&apos;s Summary
          </CardTitle>
          <span className="text-sm text-muted-foreground">
            {mealCount} meal{mealCount !== 1 ? "s" : ""} logged
          </span>
        </div>
      </CardHeader>
      <CardContent>
        {/* Calorie Ring */}
        <div className="mb-8 flex flex-col items-center">
          <div className="relative h-40 w-40">
            <svg className="h-full w-full -rotate-90" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="currentColor"
                strokeWidth="10"
                className="text-secondary"
              />
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="hsl(var(--primary))"
                strokeWidth="10"
                strokeDasharray={2 * Math.PI * 45}
                strokeDashoffset={
                  2 * Math.PI * 45 - (caloriePercentage / 100) * 2 * Math.PI * 45
                }
                strokeLinecap="round"
                className="transition-all duration-500"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <Flame className="mb-1 h-6 w-6 text-accent" />
              <span className="text-3xl font-bold">{totals.calories}</span>
              <span className="text-sm text-muted-foreground">
                / {DAILY_GOALS.calories} kcal
              </span>
            </div>
          </div>
        </div>

        {/* Macro Rings */}
        <div className="grid grid-cols-3 gap-4">
          <CircularProgress
            value={totals.protein}
            max={DAILY_GOALS.protein}
            label="Protein"
            unit="g"
            color="hsl(160, 70%, 45%)"
          />
          <CircularProgress
            value={totals.carbs}
            max={DAILY_GOALS.carbs}
            label="Carbs"
            unit="g"
            color="hsl(200, 80%, 55%)"
          />
          <CircularProgress
            value={totals.fat}
            max={DAILY_GOALS.fat}
            label="Fat"
            unit="g"
            color="hsl(45, 90%, 55%)"
          />
        </div>

        {/* Other Nutrients */}
        <div className="mt-8 space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span>Fiber</span>
              <span>
                {totals.fiber}g / {DAILY_GOALS.fiber}g
              </span>
            </div>
            <Progress
              value={getPercentageOfGoal(totals.fiber, "fiber")}
              className="h-2"
            />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span>Sugar</span>
              <span>
                {totals.sugar}g / {DAILY_GOALS.sugar}g
              </span>
            </div>
            <Progress
              value={getPercentageOfGoal(totals.sugar, "sugar")}
              className="h-2"
            />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span>Sodium</span>
              <span>
                {totals.sodium}mg / {DAILY_GOALS.sodium}mg
              </span>
            </div>
            <Progress
              value={getPercentageOfGoal(totals.sodium, "sodium")}
              className="h-2"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
