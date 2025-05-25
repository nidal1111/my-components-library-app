"use client";

import { useState } from "react";
import { Container } from "@/components/layout/Container";
import { Grid } from "@/components/layout/Grid";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/layout/Card";
import { VStack, HStack } from "@/components/layout/Stack";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/Select";
import { Checkbox } from "@/components/ui/Checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/Radio";
import { useClipboard } from "@/hooks/useClipboard";
import { Copy, Check, Mail, Lock, Search } from "lucide-react";

export default function PlaygroundPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [framework, setFramework] = useState("");
  const [notifications, setNotifications] = useState(false);
  const [theme, setTheme] = useState("light");
  const { copied, copyToClipboard } = useClipboard();

  const sampleCode = `<Button 
  variant="default" 
  size="lg"
  onClick={() => console.log("Hello!")}
>
  Click me
</Button>`;

  return (
    <div className="min-h-screen bg-background">
      <Container className="py-16">
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-4">Component Playground</h1>
          <p className="text-xl text-muted-foreground max-w-3xl">
            Experiment with our components in real-time. Try different props, variants, and combinations
            to see how they work together.
          </p>
        </div>

        <Grid cols={2} gap="lg">
          <VStack gap="lg">
            <Card variant="elevated">
              <CardHeader>
                <CardTitle>Form Components</CardTitle>
                <CardDescription>Interactive form elements</CardDescription>
              </CardHeader>
              <CardContent>
                <VStack gap="default">
                  <Input
                    label="Email"
                    type="email"
                    placeholder="john@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    leftIcon={<Mail />}
                    required
                  />
                  
                  <Input
                    label="Password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    leftIcon={<Lock />}
                    required
                    helperText="Must be at least 8 characters"
                  />

                  <div className="w-full">
                    <label className="text-sm font-medium mb-1.5 block">Framework</label>
                    <Select value={framework} onValueChange={setFramework}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a framework" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="next">Next.js</SelectItem>
                        <SelectItem value="remix">Remix</SelectItem>
                        <SelectItem value="astro">Astro</SelectItem>
                        <SelectItem value="gatsby">Gatsby</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Checkbox
                    label="Send me notifications"
                    checked={notifications}
                    onCheckedChange={(checked) => setNotifications(checked as boolean)}
                  />

                  <RadioGroup value={theme} onValueChange={setTheme} label="Theme preference">
                    <RadioGroupItem value="light" label="Light" />
                    <RadioGroupItem value="dark" label="Dark" />
                    <RadioGroupItem value="system" label="System" />
                  </RadioGroup>

                  <Button className="w-full">Submit Form</Button>
                </VStack>
              </CardContent>
            </Card>

            <Card variant="elevated">
              <CardHeader>
                <CardTitle>Button Variants</CardTitle>
                <CardDescription>Different button styles and states</CardDescription>
              </CardHeader>
              <CardContent>
                <VStack gap="default">
                  <HStack gap="default" wrap={true}>
                    <Button variant="default">Default</Button>
                    <Button variant="secondary">Secondary</Button>
                    <Button variant="outline">Outline</Button>
                    <Button variant="ghost">Ghost</Button>
                    <Button variant="destructive">Destructive</Button>
                  </HStack>

                  <HStack gap="default" wrap={true}>
                    <Button size="sm">Small</Button>
                    <Button size="default">Default</Button>
                    <Button size="lg">Large</Button>
                    <Button size="xl">Extra Large</Button>
                  </HStack>

                  <HStack gap="default">
                    <Button loading>Loading</Button>
                    <Button disabled>Disabled</Button>
                  </HStack>

                  <Button fullWidth leftIcon={<Search />}>
                    Full Width with Icon
                  </Button>
                </VStack>
              </CardContent>
            </Card>
          </VStack>

          <VStack gap="lg">
            <Card variant="elevated">
              <CardHeader>
                <CardTitle>Code Example</CardTitle>
                <CardDescription>Copy component code</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="relative">
                  <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
                    <code className="text-sm">{sampleCode}</code>
                  </pre>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="absolute top-2 right-2"
                    onClick={() => copyToClipboard(sampleCode)}
                  >
                    {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card variant="elevated">
              <CardHeader>
                <CardTitle>Layout Components</CardTitle>
                <CardDescription>Stack and Grid examples</CardDescription>
              </CardHeader>
              <CardContent>
                <VStack gap="default">
                  <div>
                    <p className="text-sm font-medium mb-2">HStack Example</p>
                    <HStack gap="sm" className="p-4 bg-muted rounded-lg">
                      <div className="w-16 h-16 bg-primary rounded" />
                      <div className="w-16 h-16 bg-primary rounded" />
                      <div className="w-16 h-16 bg-primary rounded" />
                    </HStack>
                  </div>

                  <div>
                    <p className="text-sm font-medium mb-2">Grid Example</p>
                    <Grid cols={3} gap="sm" className="p-4 bg-muted rounded-lg">
                      <div className="h-16 bg-primary rounded" />
                      <div className="h-16 bg-primary rounded" />
                      <div className="h-16 bg-primary rounded" />
                      <div className="h-16 bg-primary rounded" />
                      <div className="h-16 bg-primary rounded" />
                      <div className="h-16 bg-primary rounded" />
                    </Grid>
                  </div>
                </VStack>
              </CardContent>
            </Card>

            <Card variant="gradient">
              <CardHeader>
                <CardTitle>Card Variants</CardTitle>
                <CardDescription>This is a gradient card</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm">
                  Cards can have different variants: default, outlined, elevated, ghost, and gradient.
                  They can also be interactive!
                </p>
              </CardContent>
            </Card>
          </VStack>
        </Grid>
      </Container>
    </div>
  );
}