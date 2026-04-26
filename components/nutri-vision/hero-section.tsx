import Link from "next/link"
import { ArrowRight, Sparkles, Camera } from "lucide-react"
import { Button } from "@/components/ui/button"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden py-20 md:py-32">
      {/* Background gradient */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(16,185,129,0.15),rgba(255,255,255,0))]" />

      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-2 text-sm font-medium text-primary">
            <Sparkles className="h-4 w-4" />
            AI-Powered Nutrition Analysis
          </div>

          <h1 className="mb-6 text-balance text-4xl font-bold tracking-tight md:text-6xl lg:text-7xl">
            See Your Food.
            <br />
            <span className="text-primary">Know Your Nutrition.</span>
          </h1>

          <p className="mx-auto mb-10 max-w-2xl text-pretty text-lg text-muted-foreground md:text-xl">
            Instantly identify food items and get comprehensive nutritional
            breakdowns using cutting-edge AI and computer vision. Make healthier
            choices with professional-grade dietary analysis.
          </p>

          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button asChild size="lg" className="h-12 px-8 text-base">
              <Link href="/analyze">
                <Camera className="mr-2 h-5 w-5" />
                Analyze Your Meal
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="h-12 px-8 text-base"
            >
              <Link href="#how-it-works">
                Learn How It Works
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>

        {/* Hero Visual */}
        <div className="relative mx-auto mt-16 max-w-5xl">
          <div className="relative overflow-hidden rounded-2xl border border-border/50 bg-card shadow-2xl shadow-primary/10">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
            <div className="relative p-6 md:p-10">
              <div className="grid gap-6 md:grid-cols-2">
                {/* Food Image Preview */}
                <div className="relative aspect-square overflow-hidden rounded-xl bg-gradient-to-br from-secondary to-muted">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                        <Camera className="h-8 w-8 text-primary" />
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Upload or capture food image
                      </p>
                    </div>
                  </div>
                </div>

                {/* Analysis Preview */}
                <div className="flex flex-col gap-4">
                  <div className="rounded-lg bg-secondary/50 p-4">
                    <div className="mb-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                      Detected Foods
                    </div>
                    <div className="space-y-2">
                      {["Grilled Chicken Breast", "Brown Rice", "Broccoli"].map(
                        (food) => (
                          <div
                            key={food}
                            className="flex items-center justify-between rounded-md bg-background/50 px-3 py-2 text-sm"
                          >
                            <span>{food}</span>
                            <span className="text-primary">95%</span>
                          </div>
                        )
                      )}
                    </div>
                  </div>

                  <div className="rounded-lg bg-secondary/50 p-4">
                    <div className="mb-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                      Nutrition Summary
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        { label: "Calories", value: "485", unit: "kcal" },
                        { label: "Protein", value: "42g", unit: "" },
                        { label: "Carbs", value: "38g", unit: "" },
                        { label: "Fat", value: "12g", unit: "" },
                      ].map((stat) => (
                        <div
                          key={stat.label}
                          className="rounded-md bg-background/50 p-3 text-center"
                        >
                          <div className="text-lg font-bold text-foreground">
                            {stat.value}
                            <span className="text-xs text-muted-foreground">
                              {stat.unit}
                            </span>
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {stat.label}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
