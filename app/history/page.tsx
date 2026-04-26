"use client"

import { useState, useEffect, useCallback } from "react"
import Link from "next/link"
import { Camera, Calendar } from "lucide-react"
import { Header } from "@/components/nutri-vision/header"
import { Footer } from "@/components/nutri-vision/footer"
import { MealHistory } from "@/components/nutri-vision/meal-history"
import { DailySummary } from "@/components/nutri-vision/daily-summary"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  getMealHistory,
  getDailyNutrition,
} from "@/lib/nutrition-utils"
import type { MealEntry, DailyNutrition } from "@/lib/types"

export default function HistoryPage() {
  const [meals, setMeals] = useState<MealEntry[]>([])
  const [todayNutrition, setTodayNutrition] = useState<DailyNutrition | null>(
    null
  )
  const [isLoading, setIsLoading] = useState(true)

  const loadData = useCallback(() => {
    const history = getMealHistory()
    setMeals(history)

    const today = new Date().toISOString().split("T")[0]
    const todayData = getDailyNutrition(today)
    setTodayNutrition(todayData)

    setIsLoading(false)
  }, [])

  useEffect(() => {
    loadData()
  }, [loadData])

  const handleMealDeleted = () => {
    loadData()
  }

  if (isLoading) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex flex-1 items-center justify-center">
          <div className="text-center">
            <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
            <p className="text-muted-foreground">Loading your history...</p>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 py-8 md:py-12">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-6xl">
            {/* Page Header */}
            <div className="mb-8 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
              <div>
                <h1 className="mb-1 text-3xl font-bold tracking-tight md:text-4xl">
                  Your Nutrition History
                </h1>
                <p className="text-muted-foreground">
                  Track your meals and monitor your daily nutrition goals
                </p>
              </div>
              <Button asChild>
                <Link href="/analyze">
                  <Camera className="mr-2 h-4 w-4" />
                  Log New Meal
                </Link>
              </Button>
            </div>

            {/* Tabs for Desktop/Mobile */}
            <Tabs defaultValue="today" className="space-y-6">
              <TabsList className="grid w-full max-w-md grid-cols-2">
                <TabsTrigger value="today" className="gap-2">
                  <Calendar className="h-4 w-4" />
                  Today
                </TabsTrigger>
                <TabsTrigger value="history" className="gap-2">
                  <Calendar className="h-4 w-4" />
                  All History
                </TabsTrigger>
              </TabsList>

              <TabsContent value="today" className="space-y-6">
                <div className="grid gap-6 lg:grid-cols-2">
                  {/* Today's Summary */}
                  <div>
                    {todayNutrition && (
                      <DailySummary
                        totals={todayNutrition.totals}
                        mealCount={todayNutrition.meals.length}
                      />
                    )}
                  </div>

                  {/* Today's Meals */}
                  <div>
                    <h2 className="mb-4 text-lg font-semibold">
                      Today&apos;s Meals
                    </h2>
                    {todayNutrition && todayNutrition.meals.length > 0 ? (
                      <MealHistory
                        meals={todayNutrition.meals}
                        onMealDeleted={handleMealDeleted}
                      />
                    ) : (
                      <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-secondary/20 py-12 text-center">
                        <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                          <Camera className="h-7 w-7 text-primary" />
                        </div>
                        <h3 className="mb-2 font-semibold">
                          No Meals Logged Today
                        </h3>
                        <p className="mb-4 max-w-sm text-sm text-muted-foreground">
                          Start your day by analyzing your first meal
                        </p>
                        <Button asChild size="sm">
                          <Link href="/analyze">Analyze Food</Link>
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="history">
                <MealHistory meals={meals} onMealDeleted={handleMealDeleted} />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
