import type { MealEntry, TotalNutrition, DailyNutrition } from "./types"

const STORAGE_KEY = "nutri-vision-history"

export function saveMealToHistory(meal: MealEntry): void {
  if (typeof window === "undefined") return

  const history = getMealHistory()
  history.unshift(meal)

  // Keep only last 100 meals
  const trimmedHistory = history.slice(0, 100)
  localStorage.setItem(STORAGE_KEY, JSON.stringify(trimmedHistory))
}

export function getMealHistory(): MealEntry[] {
  if (typeof window === "undefined") return []

  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored ? JSON.parse(stored) : []
  } catch {
    return []
  }
}

export function deleteMealFromHistory(mealId: string): void {
  if (typeof window === "undefined") return

  const history = getMealHistory()
  const filtered = history.filter((meal) => meal.id !== mealId)
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered))
}

export function getDailyNutrition(date: string): DailyNutrition {
  const history = getMealHistory()
  const dayMeals = history.filter((meal) => {
    const mealDate = new Date(meal.timestamp).toISOString().split("T")[0]
    return mealDate === date
  })

  const totals: TotalNutrition = dayMeals.reduce(
    (acc, meal) => ({
      calories: acc.calories + meal.analysis.totalNutrition.calories,
      protein: acc.protein + meal.analysis.totalNutrition.protein,
      carbs: acc.carbs + meal.analysis.totalNutrition.carbs,
      fat: acc.fat + meal.analysis.totalNutrition.fat,
      fiber: acc.fiber + meal.analysis.totalNutrition.fiber,
      sugar: acc.sugar + meal.analysis.totalNutrition.sugar,
      sodium: acc.sodium + meal.analysis.totalNutrition.sodium,
    }),
    {
      calories: 0,
      protein: 0,
      carbs: 0,
      fat: 0,
      fiber: 0,
      sugar: 0,
      sodium: 0,
    }
  )

  return {
    date,
    meals: dayMeals,
    totals,
  }
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  })
}

export function formatTime(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  })
}

export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
}

// Recommended daily values for reference
export const DAILY_GOALS = {
  calories: 2000,
  protein: 50, // grams
  carbs: 300, // grams
  fat: 65, // grams
  fiber: 25, // grams
  sugar: 50, // grams
  sodium: 2300, // mg
}

export function getPercentageOfGoal(
  value: number,
  nutrient: keyof typeof DAILY_GOALS
): number {
  return Math.min(100, Math.round((value / DAILY_GOALS[nutrient]) * 100))
}
