import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { ArrowRight, BookOpen, Github as GithubIcon, Palette, Zap } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted">
      <div className="container mx-auto px-4 py-16">
        <header className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            Modern UI Library
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            A modern, performant, and accessible React component library built with Next.js 15, TypeScript, and Tailwind CSS
          </p>
        </header>

        <div className="flex flex-wrap gap-4 justify-center mb-16">
          <Button size="lg" className="gap-2" asChild>
            <Link href="/components">
              <Palette className="w-5 h-5" />
              Browse Components
            </Link>
          </Button>
          <Button size="lg" variant="outline" className="gap-2" asChild>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer">
              <GithubIcon className="w-5 h-5" />
              View on GitHub
            </a>
          </Button>
          <Button size="lg" variant="secondary" className="gap-2" asChild>
            <Link href="/playground">
              <Zap className="w-5 h-5" />
              Playground
            </Link>
          </Button>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <FeatureCard
            icon={<Zap className="w-8 h-8" />}
            title="Performance First"
            description="Built with performance in mind. Optimized bundle sizes and lazy loading for faster load times."
          />
          <FeatureCard
            icon={<Palette className="w-8 h-8" />}
            title="Fully Customizable"
            description="Extensive theming options with CSS variables and Tailwind CSS. Make it truly yours."
          />
          <FeatureCard
            icon={<BookOpen className="w-8 h-8" />}
            title="Developer Friendly"
            description="Comprehensive documentation, TypeScript support, and Storybook integration."
          />
        </div>

        <section className="text-center bg-card rounded-lg p-12 shadow-lg">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Explore our component library, copy the code you need, and build amazing user interfaces in minutes.
          </p>
          <div className="flex gap-4 justify-center">
            <Button size="lg" rightIcon={<ArrowRight className="w-4 h-4" />} asChild>
              <Link href="/components">
                Start Building
              </Link>
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="bg-card rounded-lg p-8 shadow-md hover:shadow-lg transition-shadow">
      <div className="text-primary mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
}