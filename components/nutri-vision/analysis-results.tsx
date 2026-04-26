"use client"

import {
  Flame,
  Beef,
  Wheat,
  Droplets,
  Leaf,
  Cookie,
  Sparkles,
  Save,
  RefreshCw,
  ChevronDown,
  ChevronUp,
} from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { MacroChart } from "./macro-chart"
import type { NutritionAnalysis, FoodItem } from "@/lib/types"
import { DAILY_GOALS, getPercentageOfGoal } from "@/lib/nutrition-utils"
import { cn } from "@/lib/utils"

interface AnalysisResultsProps {
  analysis: NutritionAnalysis
  imageUrl: string
  onSave: () => void
  onAnalyzeAnother: () => void
  isSaved: boolean
}

function NutrientBar({
  label,
  value,
  unit,
  goal,
  icon: Icon,
  color,
}: {
  label: string
  value: number
  unit: string
  goal: number
  icon: React.ElementType
  color: string
}) {
  const percentage = Math.min(100, Math.round((value / goal) * 100))

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center gap-2">
          <Icon className={cn("h-4 w-4", color)} />
          <span>{label}</span>
        </div>
        <span className="font-medium">
          {value}
          {unit}{" "}
          <span className="text-muted-foreground">/ {goal}{unit}</span>
        </span>
      </div>
      <Progress value={percentage} className="h-2" />
    </div>
  )
}

function FoodItemCard({ food, index }: { food: FoodItem; index: number }) {
  const [expanded, setExpanded] = useState(false)

  return (
    <div className="rounded-lg border border-border bg-card p-4">
      <div
        className="flex cursor-pointer items-center justify-between"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-sm font-medium text-primary">
            {index + 1}
          </div>
          <div>
            <h4 className="font-medium">{food.name}</h4>
            <p className="text-sm text-muted-foreground">{food.portion}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-right">
            <p className="font-semibold">{food.calories} kcal</p>
            <p className="text-xs text-muted-foreground">
              {food.confidence}% confidence
            </p>
          </div>
          {expanded ? (
            <ChevronUp className="h-4 w-4 text-muted-foreground" />
          ) : (
            <ChevronDown className="h-4 w-4 text-muted-foreground" />
          )}
        </div>
      </div>

      {expanded && (
        <div className="mt-4 grid grid-cols-3 gap-3 border-t border-border pt-4">
          <div className="text-center">
            <p className="text-lg font-semibold text-[hsl(160,70%,45%)]">
              {food.protein}g
            </p>
            <p className="text-xs text-muted-foreground">Protein</p>
          </div>
          <div className="text-center">
            <p className="text-lg font-semibold text-[hsl(200,80%,55%)]">
              {food.carbs}g
            </p>
            <p className="text-xs text-muted-foreground">Carbs</p>
          </div>
          <div className="text-center">
            <p className="text-lg font-semibold text-[hsl(45,90%,55%)]">
              {food.fat}g
            </p>
            <p className="text-xs text-muted-foreground">Fat</p>
          </div>
          <div className="text-center">
            <p className="text-sm font-medium">{food.fiber}g</p>
            <p className="text-xs text-muted-foreground">Fiber</p>
          </div>
          <div className="text-center">
            <p className="text-sm font-medium">{food.sugar}g</p>
            <p className="text-xs text-muted-foreground">Sugar</p>
          </div>
          <div className="text-center">
            <p className="text-sm font-medium">{food.sodium}mg</p>
            <p className="text-xs text-muted-foreground">Sodium</p>
          </div>
        </div>
      )}
    </div>
  )
}

export function AnalysisResults({
  analysis,
  onSave,
  onAnalyzeAnother,
  isSaved,
}: AnalysisResultsProps) {
  const { foods, totalNutrition, healthInsights, mealType } = analysis

  const mealTypeLabels = {
    breakfast: "Breakfast",
    lunch: "Lunch",
    dinner: "Dinner",
    snack: "Snack",
  }

  return (
    <div className="space-y-6">
      {/* Summary Card */}
      <Card>
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Flame className="h-5 w-5 text-accent" />
              Meal Summary
            </CardTitle>
            <span className="rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
              {mealTypeLabels[mealType]}
            </span>
          </div>
        </CardHeader>
        <CardContent>
          <div className="mb-6 flex flex-col items-center justify-center rounded-xl bg-secondary/30 py-6">
            <p className="text-5xl font-bold">{totalNutrition.calories}</p>
            <p className="text-muted-foreground">Total Calories</p>
          </div>

          <MacroChart
            protein={totalNutrition.protein}
            carbs={totalNutrition.carbs}
            fat={totalNutrition.fat}
          />
        </CardContent>
      </Card>

      {/* Detected Foods */}
      <Card>
        <CardHeader>
          <CardTitle>Detected Foods ({foods.length})</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {foods.map((food, index) => (
            <FoodItemCard key={index} food={food} index={index} />
          ))}
        </CardContent>
      </Card>

      {/* Detailed Nutrition */}
      <Card>
        <CardHeader>
          <CardTitle>Daily Progress</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <NutrientBar
            label="Calories"
            value={totalNutrition.calories}
            unit=" kcal"
            goal={DAILY_GOALS.calories}
            icon={Flame}
            color="text-orange-500"
          />
          <NutrientBar
            label="Protein"
            value={totalNutrition.protein}
            unit="g"
            goal={DAILY_GOALS.protein}
            icon={Beef}
            color="text-[hsl(160,70%,45%)]"
          />
          <NutrientBar
            label="Carbohydrates"
            value={totalNutrition.carbs}
            unit="g"
            goal={DAILY_GOALS.carbs}
            icon={Wheat}
            color="text-[hsl(200,80%,55%)]"
          />
          <NutrientBar
            label="Fat"
            value={totalNutrition.fat}
            unit="g"
            goal={DAILY_GOALS.fat}
            icon={Droplets}
            color="text-[hsl(45,90%,55%)]"
          />
          <NutrientBar
            label="Fiber"
            value={totalNutrition.fiber}
            unit="g"
            goal={DAILY_GOALS.fiber}
            icon={Leaf}
            color="text-green-600"
          />
          <NutrientBar
            label="Sugar"
            value={totalNutrition.sugar}
            unit="g"
            goal={DAILY_GOALS.sugar}
            icon={Cookie}
            color="text-pink-500"
          />
        </CardContent>
      </Card>

      {/* Health Insights */}
      {healthInsights.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              Health Insights
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {healthInsights.map((insight, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-primary" />
                  <p className="text-sm text-muted-foreground">{insight}</p>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}

      {/* Actions */}
      <div className="flex flex-col gap-3 sm:flex-row">
        <Button
          onClick={onSave}
          disabled={isSaved}
          className="flex-1"
          variant={isSaved ? "secondary" : "default"}
        >
          <Save className="mr-2 h-4 w-4" />
          {isSaved ? "Saved to History" : "Save to History"}
        </Button>
        <Button onClick={onAnalyzeAnother} variant="outline" className="flex-1">
          <RefreshCw className="mr-2 h-4 w-4" />
          Analyze Another
        </Button>
      </div>
    </div>
  )
}
