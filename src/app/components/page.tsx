import { Container } from "@/components/layout/Container";
import { Grid } from "@/components/layout/Grid";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/layout/Card";
import { Button } from "@/components/ui/Button";
import Link from "next/link";

const componentCategories = [
  {
    title: "Primitives",
    description: "Basic building blocks for your UI",
    components: [
      { name: "Button", status: "stable", href: "/components/button" },
      { name: "Input", status: "stable", href: "/components/input" },
      { name: "Select", status: "stable", href: "/components/select" },
      { name: "Checkbox", status: "stable", href: "/components/checkbox" },
      { name: "Radio", status: "stable", href: "/components/radio" },
    ],
  },
  {
    title: "Layout",
    description: "Components for structuring your pages",
    components: [
      { name: "Container", status: "stable", href: "/components/container" },
      { name: "Grid", status: "stable", href: "/components/grid" },
      { name: "Stack", status: "stable", href: "/components/stack" },
      { name: "Card", status: "stable", href: "/components/card" },
    ],
  },
  {
    title: "Navigation",
    description: "Components for app navigation",
    components: [
      { name: "Tabs", status: "coming-soon", href: "#" },
      { name: "Breadcrumb", status: "coming-soon", href: "#" },
      { name: "Pagination", status: "coming-soon", href: "#" },
    ],
  },
  {
    title: "Feedback",
    description: "Alert and notify your users",
    components: [
      { name: "Toast", status: "coming-soon", href: "#" },
      { name: "Alert", status: "coming-soon", href: "#" },
      { name: "Modal", status: "coming-soon", href: "#" },
      { name: "Loading", status: "coming-soon", href: "#" },
    ],
  },
  {
    title: "Data Display",
    description: "Present data and content",
    components: [
      { name: "Table", status: "coming-soon", href: "#" },
      { name: "Badge", status: "coming-soon", href: "#" },
      { name: "Avatar", status: "coming-soon", href: "#" },
      { name: "Tooltip", status: "coming-soon", href: "#" },
    ],
  },
];

export default function ComponentsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Container className="py-16">
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-4">Components</h1>
          <p className="text-xl text-muted-foreground max-w-3xl">
            Explore our collection of beautifully designed, accessible, and customizable components.
            Built with Radix UI and styled with Tailwind CSS.
          </p>
        </div>

        <div className="space-y-12">
          {componentCategories.map((category) => (
            <section key={category.title}>
              <div className="mb-6">
                <h2 className="text-2xl font-semibold mb-2">{category.title}</h2>
                <p className="text-muted-foreground">{category.description}</p>
              </div>
              
              <Grid cols={4} gap="default">
                {category.components.map((component) => (
                  <Card
                    key={component.name}
                    variant={component.status === "coming-soon" ? "outlined" : "elevated"}
                    interactive={component.status !== "coming-soon"}
                    className={component.status === "coming-soon" ? "opacity-60" : ""}
                  >
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">{component.name}</CardTitle>
                        {component.status === "coming-soon" && (
                          <span className="text-xs text-muted-foreground">Coming Soon</span>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent>
                      {component.status === "coming-soon" ? (
                        <p className="text-sm text-muted-foreground">In development</p>
                      ) : (
                        <Button size="sm" variant="outline" className="w-full" asChild>
                          <Link href={component.href}>View Component</Link>
                        </Button>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </Grid>
            </section>
          ))}
        </div>
      </Container>
    </div>
  );
}