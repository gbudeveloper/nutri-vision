import { Header } from "@/components/nutri-vision/header"
import { HeroSection } from "@/components/nutri-vision/hero-section"
import { FeaturesSection } from "@/components/nutri-vision/features-section"
import { HowItWorksSection } from "@/components/nutri-vision/how-it-works"
import { Footer } from "@/components/nutri-vision/footer"

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <FeaturesSection />
        <HowItWorksSection />
      </main>
      <Footer />
    </div>
  )
}
