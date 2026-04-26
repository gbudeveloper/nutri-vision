import { Leaf } from "lucide-react"
import Link from "next/link"

export function Footer() {
  return (
    <footer className="border-t border-border/40 bg-card py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <Leaf className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="text-lg font-bold">
              Nutri<span className="text-primary">Vision</span>
            </span>
          </div>

          <nav className="flex items-center gap-6 text-sm text-muted-foreground">
            <Link href="/" className="transition-colors hover:text-foreground">
              Home
            </Link>
            <Link
              href="/analyze"
              className="transition-colors hover:text-foreground"
            >
              Analyze
            </Link>
            <Link
              href="/history"
              className="transition-colors hover:text-foreground"
            >
              History
            </Link>
          </nav>

          <p className="text-sm text-muted-foreground">
            Powered by AI. Built for health.
          </p>
        </div>
      </div>
    </footer>
  )
}
