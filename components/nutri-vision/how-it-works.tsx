import { Upload, Cpu, BarChart3, TrendingUp } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

const steps = [
  {
    icon: Upload,
    step: "01",
    title: "Upload Your Food Photo",
    description:
      "Take a picture of your meal or upload an existing photo. Our system accepts images in any common format.",
  },
  {
    icon: Cpu,
    step: "02",
    title: "AI Analyzes Your Meal",
    description:
      "Our advanced AI model identifies each food item, estimates portions, and calculates nutritional content.",
  },
  {
    icon: BarChart3,
    step: "03",
    title: "Get Detailed Breakdown",
    description:
      "View comprehensive nutritional data including calories, macros, vitamins, and health recommendations.",
  },
  {
    icon: TrendingUp,
    step: "04",
    title: "Track Your Progress",
    description:
      "Save your meals to build a nutrition history and monitor your dietary patterns over time.",
  },
]

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-20 md:py-28">
      <div className="container mx-auto px-4">
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">
            How It <span className="text-primary">Works</span>
          </h2>
          <p className="text-pretty text-lg text-muted-foreground">
            Getting accurate nutritional information has never been easier. Just
            four simple steps to better nutrition awareness.
          </p>
        </div>

        <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <div key={index} className="relative text-center">
              {/* Connector line */}
              {index < steps.length - 1 && (
                <div className="absolute left-1/2 top-12 hidden h-0.5 w-full bg-gradient-to-r from-primary/20 to-primary/5 lg:block" />
              )}

              <div className="relative mx-auto mb-6 flex h-24 w-24 items-center justify-center">
                <div className="absolute inset-0 rounded-full bg-primary/10" />
                <div className="absolute inset-2 rounded-full bg-primary/5" />
                <step.icon className="relative h-10 w-10 text-primary" />
                <div className="absolute -right-2 -top-2 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                  {step.step}
                </div>
              </div>

              <h3 className="mb-3 text-lg font-semibold">{step.title}</h3>
              <p className="text-sm text-muted-foreground">
                {step.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Button asChild size="lg" className="h-12 px-8">
            <Link href="/analyze">Try It Now - It&apos;s Free</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
