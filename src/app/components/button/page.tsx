"use client";

import { Container } from "@/components/layout/Container";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/layout/Card";
import { Button } from "@/components/ui/Button";
import { VStack, HStack } from "@/components/layout/Stack";
import { useClipboard } from "@/hooks/useClipboard";
import { Copy, Check, ArrowRight, Download, Heart } from "lucide-react";

const buttonExamples = [
  {
    title: "Basic Usage",
    code: `import { Button } from "@/components/ui/Button";

export function BasicButton() {
  return (
    <Button>Click me</Button>
  );
}`,
    preview: <Button>Click me</Button>,
  },
  {
    title: "Variants",
    code: `<Button variant="default">Default</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="destructive">Destructive</Button>
<Button variant="link">Link</Button>`,
    preview: (
      <HStack gap="default" wrap={true}>
        <Button variant="default">Default</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="destructive">Destructive</Button>
        <Button variant="link">Link</Button>
      </HStack>
    ),
  },
  {
    title: "Sizes",
    code: `<Button size="sm">Small</Button>
<Button size="default">Default</Button>
<Button size="lg">Large</Button>
<Button size="xl">Extra Large</Button>`,
    preview: (
      <HStack gap="default" align="center">
        <Button size="sm">Small</Button>
        <Button size="default">Default</Button>
        <Button size="lg">Large</Button>
        <Button size="xl">Extra Large</Button>
      </HStack>
    ),
  },
  {
    title: "With Icons",
    code: `<Button leftIcon={<Download />}>
  Download
</Button>
<Button rightIcon={<ArrowRight />}>
  Continue
</Button>
<Button size="icon" aria-label="Favorite">
  <Heart />
</Button>`,
    preview: (
      <HStack gap="default">
        <Button leftIcon={<Download />}>Download</Button>
        <Button rightIcon={<ArrowRight />}>Continue</Button>
        <Button size="icon" aria-label="Favorite">
          <Heart />
        </Button>
      </HStack>
    ),
  },
  {
    title: "States",
    code: `<Button loading>Loading</Button>
<Button disabled>Disabled</Button>`,
    preview: (
      <HStack gap="default">
        <Button loading>Loading</Button>
        <Button disabled>Disabled</Button>
      </HStack>
    ),
  },
  {
    title: "Full Width",
    code: `<Button fullWidth>
  Full Width Button
</Button>`,
    preview: <Button fullWidth>Full Width Button</Button>,
  },
];

function CodeBlock({ code, onCopy }: { code: string; onCopy: () => void }) {
  const { copied, copyToClipboard } = useClipboard();

  return (
    <div className="relative">
      <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
        <code className="text-sm font-mono">{code}</code>
      </pre>
      <Button
        size="sm"
        variant="ghost"
        className="absolute top-2 right-2"
        onClick={() => {
          copyToClipboard(code);
          onCopy();
        }}
      >
        {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
      </Button>
    </div>
  );
}

export default function ButtonPage() {

  return (
    <div className="min-h-screen bg-background">
      <Container className="py-16">
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-4">Button</h1>
          <p className="text-xl text-muted-foreground max-w-3xl">
            Buttons trigger actions. They&apos;re used throughout the interface for primary actions, 
            secondary actions, and more.
          </p>
        </div>

        <div className="mb-12">
          <Card variant="elevated">
            <CardHeader>
              <CardTitle>Installation</CardTitle>
              <CardDescription>Copy and paste the following code into your project</CardDescription>
            </CardHeader>
            <CardContent>
              <CodeBlock
                code={`npm install @radix-ui/react-slot class-variance-authority lucide-react`}
                onCopy={() => {}}
              />
            </CardContent>
          </Card>
        </div>

        <VStack gap="lg">
          {buttonExamples.map((example) => (
            <Card key={example.title} variant="elevated">
              <CardHeader>
                <CardTitle>{example.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <VStack gap="lg">
                  <div className="p-6 bg-background rounded-lg border">
                    {example.preview}
                  </div>
                  <CodeBlock
                    code={example.code}
                    onCopy={() => {}}
                  />
                </VStack>
              </CardContent>
            </Card>
          ))}
        </VStack>

        <Card variant="elevated" className="mt-12">
          <CardHeader>
            <CardTitle>API Reference</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2 pr-4">Prop</th>
                    <th className="text-left py-2 pr-4">Type</th>
                    <th className="text-left py-2 pr-4">Default</th>
                    <th className="text-left py-2">Description</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  <tr>
                    <td className="py-2 pr-4 font-mono text-xs">variant</td>
                    <td className="py-2 pr-4 font-mono text-xs">string</td>
                    <td className="py-2 pr-4 font-mono text-xs">&quot;default&quot;</td>
                    <td className="py-2 text-muted-foreground">The visual style of the button</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4 font-mono text-xs">size</td>
                    <td className="py-2 pr-4 font-mono text-xs">string</td>
                    <td className="py-2 pr-4 font-mono text-xs">&quot;default&quot;</td>
                    <td className="py-2 text-muted-foreground">The size of the button</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4 font-mono text-xs">fullWidth</td>
                    <td className="py-2 pr-4 font-mono text-xs">boolean</td>
                    <td className="py-2 pr-4 font-mono text-xs">false</td>
                    <td className="py-2 text-muted-foreground">Whether the button should fill its container</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4 font-mono text-xs">loading</td>
                    <td className="py-2 pr-4 font-mono text-xs">boolean</td>
                    <td className="py-2 pr-4 font-mono text-xs">false</td>
                    <td className="py-2 text-muted-foreground">Shows loading state</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4 font-mono text-xs">disabled</td>
                    <td className="py-2 pr-4 font-mono text-xs">boolean</td>
                    <td className="py-2 pr-4 font-mono text-xs">false</td>
                    <td className="py-2 text-muted-foreground">Disables the button</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4 font-mono text-xs">asChild</td>
                    <td className="py-2 pr-4 font-mono text-xs">boolean</td>
                    <td className="py-2 pr-4 font-mono text-xs">false</td>
                    <td className="py-2 text-muted-foreground">Renders as child component</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4 font-mono text-xs">leftIcon</td>
                    <td className="py-2 pr-4 font-mono text-xs">ReactNode</td>
                    <td className="py-2 pr-4 font-mono text-xs">undefined</td>
                    <td className="py-2 text-muted-foreground">Icon to display on the left</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4 font-mono text-xs">rightIcon</td>
                    <td className="py-2 pr-4 font-mono text-xs">ReactNode</td>
                    <td className="py-2 pr-4 font-mono text-xs">undefined</td>
                    <td className="py-2 text-muted-foreground">Icon to display on the right</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </Container>
    </div>
  );
}