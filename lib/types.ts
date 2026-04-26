export interface FoodItem {
  name: string
  portion: string
  confidence: number
  calories: number
  protein: number
  carbs: number
  fat: number
  fiber: number
  sugar: number
  sodium: number
}

export interface TotalNutrition {
  calories: number
  protein: number
  carbs: number
  fat: number
  fiber: number
  sugar: number
  sodium: number
}

export interface NutritionAnalysis {
  foods: FoodItem[]
  totalNutrition: TotalNutrition
  healthInsights: string[]
  mealType: "breakfast" | "lunch" | "dinner" | "snack"
}

export interface MealEntry {
  id: string
  timestamp: string
  imageUrl: string
  analysis: NutritionAnalysis
}

export interface DailyNutrition {
  date: string
  meals: MealEntry[]
  totals: TotalNutrition
}
