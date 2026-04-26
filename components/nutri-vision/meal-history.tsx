"use client"

import { useState } from "react"
import { Trash2, ChevronDown, ChevronUp, Flame, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import type { MealEntry } from "@/lib/types"
import { formatDate, formatTime, deleteMealFromHistory } from "@/lib/nutrition-utils"
import { cn } from "@/lib/utils"

interface MealHistoryProps {
  meals: MealEntry[]
  onMealDeleted: () => void
}

function MealCard({
  meal,
  onDelete,
}: {
  meal: MealEntry
  onDelete: () => void
}) {
  const [expanded, setExpanded] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)

  const mealTypeLabels = {
    breakfast: "Breakfast",
    lunch: "Lunch",
    dinner: "Dinner",
    snack: "Snack",
  }

  const handleDelete = () => {
    deleteMealFromHistory(meal.id)
    onDelete()
  }

  return (
    <Card className="overflow-hidden">
      <div
        className="flex cursor-pointer items-center gap-4 p-4"
        onClick={() => setExpanded(!expanded)}
      >
        {/* Thumbnail */}
        <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg bg-secondary">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={meal.imageUrl}
            alt="Meal"
            className="h-full w-full object-cover"
          />
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
              {mealTypeLabels[meal.analysis.mealType]}
            </span>
            <span className="flex items-center gap-1 text-xs text-muted-foreground">
              <Clock className="h-3 w-3" />
              {formatTime(meal.timestamp)}
            </span>
          </div>
          <p className="mt-1 truncate text-sm text-muted-foreground">
            {meal.analysis.foods.map((f) => f.name).join(", ")}
          </p>
        </div>

        {/* Calories & Expand */}
        <div className="flex items-center gap-3">
          <div className="text-right">
            <div className="flex items-center gap-1 font-semibold">
              <Flame className="h-4 w-4 text-accent" />
              {meal.analysis.totalNutrition.calories}
            </div>
            <p className="text-xs text-muted-foreground">kcal</p>
          </div>
          {expanded ? (
            <ChevronUp className="h-5 w-5 text-muted-foreground" />
          ) : (
            <ChevronDown className="h-5 w-5 text-muted-foreground" />
          )}
        </div>
      </div>

      {/* Expanded Content */}
      {expanded && (
        <CardContent className="border-t border-border pt-4">
          <div className="grid grid-cols-4 gap-4 text-center">
            <div>
              <p className="text-lg font-semibold text-[hsl(160,70%,45%)]">
                {meal.analysis.totalNutrition.protein}g
              </p>
              <p className="text-xs text-muted-foreground">Protein</p>
            </div>
            <div>
              <p className="text-lg font-semibold text-[hsl(200,80%,55%)]">
                {meal.analysis.totalNutrition.carbs}g
              </p>
              <p className="text-xs text-muted-foreground">Carbs</p>
            </div>
            <div>
              <p className="text-lg font-semibold text-[hsl(45,90%,55%)]">
                {meal.analysis.totalNutrition.fat}g
              </p>
              <p className="text-xs text-muted-foreground">Fat</p>
            </div>
            <div>
              <p className="text-lg font-semibold">
                {meal.analysis.totalNutrition.fiber}g
              </p>
              <p className="text-xs text-muted-foreground">Fiber</p>
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between border-t border-border pt-4">
            <p className="text-sm text-muted-foreground">
              {meal.analysis.foods.length} food item
              {meal.analysis.foods.length !== 1 ? "s" : ""} detected
            </p>

            {!showDeleteConfirm ? (
              <Button
                variant="ghost"
                size="sm"
                className="text-destructive hover:bg-destructive/10 hover:text-destructive"
                onClick={(e) => {
                  e.stopPropagation()
                  setShowDeleteConfirm(true)
                }}
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </Button>
            ) : (
              <div className="flex items-center gap-2">
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation()
                    handleDelete()
                  }}
                >
                  Confirm Delete
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation()
                    setShowDeleteConfirm(false)
                  }}
                >
                  Cancel
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      )}
    </Card>
  )
}

export function MealHistory({ meals, onMealDeleted }: MealHistoryProps) {
  // Group meals by date
  const groupedMeals = meals.reduce(
    (groups, meal) => {
      const date = new Date(meal.timestamp).toISOString().split("T")[0]
      if (!groups[date]) {
        groups[date] = []
      }
      groups[date].push(meal)
      return groups
    },
    {} as Record<string, MealEntry[]>
  )

  const sortedDates = Object.keys(groupedMeals).sort(
    (a, b) => new Date(b).getTime() - new Date(a).getTime()
  )

  if (meals.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-secondary/20 py-16 text-center">
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
          <Clock className="h-8 w-8 text-primary" />
        </div>
        <h3 className="mb-2 text-lg font-semibold">No Meals Recorded</h3>
        <p className="max-w-sm text-sm text-muted-foreground">
          Start analyzing your food to build your nutrition history and track
          your dietary patterns over time.
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {sortedDates.map((date) => (
        <div key={date}>
          <h3 className="mb-4 flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            <span className="h-px flex-1 bg-border" />
            {formatDate(date)}
            <span className="h-px flex-1 bg-border" />
          </h3>
          <div className="space-y-3">
            {groupedMeals[date].map((meal) => (
              <MealCard key={meal.id} meal={meal} onDelete={onMealDeleted} />
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
