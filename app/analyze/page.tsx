"use client"

import { useState, useCallback } from "react"
import { Header } from "@/components/nutri-vision/header"
import { Footer } from "@/components/nutri-vision/footer"
import { FoodUpload } from "@/components/nutri-vision/food-upload"
import { AnalysisResults } from "@/components/nutri-vision/analysis-results"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { AlertCircle, Sparkles, Info } from "lucide-react"
import type { NutritionAnalysis } from "@/lib/types"
import { saveMealToHistory, generateId } from "@/lib/nutrition-utils"

export default function AnalyzePage() {
  const [imageBase64, setImageBase64] = useState<string | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysis, setAnalysis] = useState<NutritionAnalysis | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isSaved, setIsSaved] = useState(false)
  const [isDemoMode, setIsDemoMode] = useState(false)
  const [requiresVerification, setRequiresVerification] = useState(false)

  const handleImageSelected = useCallback(async (base64: string) => {
    setImageBase64(base64)
    setError(null)
    setAnalysis(null)
    setIsSaved(false)
    setRequiresVerification(false)
    setIsAnalyzing(true)

    try {
      const endpoint = isDemoMode ? "/api/analyze-food/demo" : "/api/analyze-food"
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ image: base64 }),
      })

      const data = await response.json()

      if (!response.ok) {
        if (data.requiresVerification) {
          setRequiresVerification(true)
        }
        throw new Error(data.error || "Failed to analyze image")
      }

      setAnalysis(data.analysis)
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unexpected error occurred"
      )
    } finally {
      setIsAnalyzing(false)
    }
  }, [isDemoMode])

  const handleSave = useCallback(() => {
    if (!analysis || !imageBase64) return

    const mealEntry = {
      id: generateId(),
      timestamp: new Date().toISOString(),
      imageUrl: imageBase64,
      analysis,
    }

    saveMealToHistory(mealEntry)
    setIsSaved(true)
  }, [analysis, imageBase64])

  const handleAnalyzeAnother = useCallback(() => {
    setImageBase64(null)
    setAnalysis(null)
    setError(null)
    setIsSaved(false)
  }, [])

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 py-8 md:py-12">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            {/* Page Header */}
            <div className="mb-8 text-center">
              <h1 className="mb-2 text-3xl font-bold tracking-tight md:text-4xl">
                Analyze Your Food
              </h1>
              <p className="text-muted-foreground">
                Upload a photo of your meal and get instant nutritional insights
              </p>
            </div>

            {/* Demo Mode Toggle */}
            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-3">
                <Button
                  variant={isDemoMode ? "default" : "outline"}
                  size="sm"
                  onClick={() => setIsDemoMode(!isDemoMode)}
                  className="gap-2"
                >
                  <Sparkles className="h-4 w-4" />
                  {isDemoMode ? "Demo Mode On" : "Try Demo Mode"}
                </Button>
                {isDemoMode && (
                  <span className="text-sm text-muted-foreground">
                    Using sample data for preview
                  </span>
                )}
              </div>
            </div>

            {/* Demo Mode Info */}
            {isDemoMode && (
              <Alert className="mb-6 border-primary/30 bg-primary/5">
                <Info className="h-4 w-4 text-primary" />
                <AlertTitle className="text-primary">Demo Mode Active</AlertTitle>
                <AlertDescription className="text-muted-foreground">
                  Upload any image to see sample nutritional analysis. This preview uses pre-generated data to demonstrate the app&apos;s features.
                </AlertDescription>
              </Alert>
            )}

            {/* Error Alert */}
            {error && (
              <Alert variant="destructive" className="mb-6">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Analysis Failed</AlertTitle>
                <AlertDescription>
                  {error}
                  {requiresVerification && (
                    <div className="mt-3">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setIsDemoMode(true)
                          setError(null)
                        }}
                        className="gap-2"
                      >
                        <Sparkles className="h-4 w-4" />
                        Switch to Demo Mode
                      </Button>
                    </div>
                  )}
                </AlertDescription>
              </Alert>
            )}

            {/* Main Content */}
            <div className="grid gap-8 lg:grid-cols-2">
              {/* Upload Section */}
              <div>
                <FoodUpload
                  onImageSelected={handleImageSelected}
                  isAnalyzing={isAnalyzing}
                />
              </div>

              {/* Results Section */}
              <div>
                {analysis && imageBase64 ? (
                  <AnalysisResults
                    analysis={analysis}
                    imageUrl={imageBase64}
                    onSave={handleSave}
                    onAnalyzeAnother={handleAnalyzeAnother}
                    isSaved={isSaved}
                  />
                ) : !isAnalyzing ? (
                  <div className="flex h-full min-h-[400px] flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-secondary/20 p-8 text-center">
                    <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                      <svg
                        className="h-8 w-8 text-primary"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                      </svg>
                    </div>
                    <h3 className="mb-2 text-lg font-semibold">
                      No Analysis Yet
                    </h3>
                    <p className="max-w-sm text-sm text-muted-foreground">
                      Upload a photo of your food to see a detailed nutritional
                      breakdown appear here
                    </p>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
