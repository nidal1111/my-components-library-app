import type { Meta, StoryObj } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./Card";
import { Button } from "@/components/ui/Button";

const cardVariants = ["default", "outlined", "elevated", "ghost", "gradient"] as const;
const paddingSizes = ["none", "sm", "default", "lg", "xl"] as const;

const meta = {
  title: "Layout/Card",
  component: Card,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "radio",
      options: cardVariants,
      description: "The visual style variant of the card",
    },
    padding: {
      control: "radio",
      options: paddingSizes,
      description: "The padding size of the card",
    },
    interactive: {
      control: "boolean",
      description: "Makes the card interactive with hover effects",
    },
    children: {
      control: false,
      description: "Card content",
    },
    onClick: {
      action: "clicked",
    },
    onMouseEnter: {
      action: "mouse entered",
    },
    onMouseLeave: {
      action: "mouse left",
    },
  },
  args: {
    variant: "default",
    padding: "default",
    interactive: false,
  },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: (
      <>
        <CardHeader>
          <CardTitle>Card Title</CardTitle>
          <CardDescription>Card description goes here</CardDescription>
        </CardHeader>
        <CardContent>
          <p>This is the card content. You can put any content here.</p>
        </CardContent>
        <CardFooter>
          <Button onClick={action("button clicked")}>Action</Button>
        </CardFooter>
      </>
    ),
  },
};

export const Variants: Story = {
  render: (args) => (
    <div style={{
      display: 'grid',
      gap: '2rem',
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))'
    }}>
      {cardVariants.map((variant) => (
        <Card
          key={variant}
          {...args}
          variant={variant}
          onClick={action(`${variant} card clicked`)}
        >
          <CardHeader>
            <CardTitle>{variant.charAt(0).toUpperCase() + variant.slice(1)}</CardTitle>
            <CardDescription>
              {variant === "default" && "Standard card appearance"}
              {variant === "outlined" && "Border without background"}
              {variant === "elevated" && "With shadow effect"}
              {variant === "ghost" && "Subtle backdrop blur"}
              {variant === "gradient" && "Gradient background"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p style={{ fontSize: '0.875rem', color: '#6b7280' }}>
              This is the {variant} card variant.
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  ),
  parameters: {
    controls: { include: ['padding', 'interactive'] },
  },
};

export const Interactive: Story = {
  render: (args) => (
    <div style={{ display: 'grid', gap: '2rem', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
      <Card 
        {...args}
        interactive 
        variant="elevated"
        onClick={action("interactive card clicked")}
      >
        <CardHeader>
          <CardTitle>Interactive Card</CardTitle>
          <CardDescription>Click me!</CardDescription>
        </CardHeader>
        <CardContent>
          <p style={{ fontSize: '0.875rem', color: '#6b7280' }}>
            This card responds to hover and click interactions.
          </p>
        </CardContent>
      </Card>

      <Card 
        {...args}
        interactive 
        variant="outlined"
        onClick={action("another interactive clicked")}
      >
        <CardHeader>
          <CardTitle>Another Interactive</CardTitle>
          <CardDescription>Hover to see effect</CardDescription>
        </CardHeader>
        <CardContent>
          <p style={{ fontSize: '0.875rem', color: '#6b7280' }}>
            Interactive cards are great for clickable content.
          </p>
        </CardContent>
      </Card>
    </div>
  ),
  args: {
    interactive: true,
  },
  parameters: {
    controls: { include: ['variant', 'padding'] },
  },
};

export const ComplexExample: Story = {
  render: (args) => (
    <Card {...args} style={{ width: '100%', maxWidth: '28rem' }} variant="elevated">
      <CardHeader>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <CardTitle>Monthly Report</CardTitle>
            <CardDescription>January 2024 Performance</CardDescription>
          </div>
          <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#3b82f6' }}>+12.5%</div>
        </div>
      </CardHeader>
      <CardContent style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem' }}>
            <span style={{ color: '#6b7280' }}>Revenue</span>
            <span style={{ fontWeight: '500' }}>$45,231</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem' }}>
            <span style={{ color: '#6b7280' }}>Expenses</span>
            <span style={{ fontWeight: '500' }}>$12,421</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem' }}>
            <span style={{ color: '#6b7280' }}>Profit</span>
            <span style={{ fontWeight: '500', color: '#10b981' }}>$32,810</span>
          </div>
        </div>
        <div style={{ height: '0.5rem', width: '100%', borderRadius: '9999px', backgroundColor: '#e5e7eb' }}>
          <div style={{ height: '0.5rem', width: '75%', borderRadius: '9999px', backgroundColor: '#3b82f6' }} />
        </div>
      </CardContent>
      <CardFooter style={{ display: 'flex', gap: '0.5rem' }}>
        <Button variant="outline" size="sm" onClick={action("view details clicked")}>
          View Details
        </Button>
        <Button size="sm" onClick={action("download report clicked")}>Download Report</Button>
      </CardFooter>
    </Card>
  ),
  args: {
    variant: "elevated",
  },
  parameters: {
    controls: { include: ['padding', 'interactive'] },
  },
};

export const Playground: Story = {
  args: {
    children: (
      <>
        <CardHeader>
          <CardTitle>Playground Card</CardTitle>
          <CardDescription>Experiment with different settings</CardDescription>
        </CardHeader>
        <CardContent>
          <p>This is a playground card where you can test different variants, padding sizes, and interaction states.</p>
        </CardContent>
        <CardFooter>
          <Button size="sm">Action</Button>
        </CardFooter>
      </>
    ),
  },
  argTypes: {
    variant: {
      control: "radio",
      options: cardVariants,
    },
    padding: {
      control: "radio",
      options: paddingSizes,
    },
  },
};
