import { Zap, PieChart, Scale, Heart } from "lucide-react"

const features = [
  {
    icon: Zap,
    title: "Instant Recognition",
    description:
      "Our AI identifies multiple food items in your photo within seconds, powered by advanced computer vision technology.",
  },
  {
    icon: PieChart,
    title: "Comprehensive Breakdown",
    description:
      "Get detailed nutritional data including calories, macros, vitamins, minerals, and more for every detected item.",
  },
  {
    icon: Scale,
    title: "Portion Estimation",
    description:
      "AI-powered portion size estimation helps you understand exactly how much you&apos;re consuming without manual measuring.",
  },
  {
    icon: Heart,
    title: "Health Insights",
    description:
      "Receive personalized recommendations and insights to help you make informed decisions about your diet.",
  },
]

export function FeaturesSection() {
  return (
    <section className="border-t border-border/40 bg-card py-20 md:py-28">
      <div className="container mx-auto px-4">
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">
            Everything you need for
            <span className="text-primary"> smarter nutrition</span>
          </h2>
          <p className="text-pretty text-lg text-muted-foreground">
            Our AI-powered platform combines cutting-edge technology with
            nutritional science to give you accurate, actionable insights.
          </p>
        </div>

        <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-2">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative rounded-2xl border border-border/50 bg-background p-8 transition-all hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5"
            >
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                <feature.icon className="h-6 w-6" />
              </div>
              <h3 className="mb-3 text-xl font-semibold">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
