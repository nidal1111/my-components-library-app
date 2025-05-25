import type { Meta, StoryObj } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { Button } from "./Button";
import { ArrowRight, Download, Heart } from "lucide-react";

const variants = ["default", "destructive", "outline", "secondary", "ghost", "link"] as const;
const sizes = ["default", "sm", "lg", "xl", "icon"] as const;

const meta = {
  title: "Primitives/Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: variants,
      description: "The visual style variant of the button",
    },
    size: {
      control: "select",
      options: sizes,
      description: "The size of the button",
    },
    fullWidth: {
      control: "boolean",
      description: "Whether the button should take full width of its container",
    },
    loading: {
      control: "boolean",
      description: "Shows loading state with spinner",
    },
    disabled: {
      control: "boolean",
      description: "Disables the button",
    },
    asChild: {
      control: "boolean",
      description: "Renders as a child component",
    },
    children: {
      control: "text",
      description: "Button content",
    },
    leftIcon: {
      control: false,
      description: "Icon element to display on the left",
    },
    rightIcon: {
      control: false,
      description: "Icon element to display on the right",
    },
    onClick: {
      action: "clicked",
    },
    onFocus: {
      action: "focused",
    },
    onBlur: {
      action: "blurred",
    },
    onMouseEnter: {
      action: "mouse entered",
    },
    onMouseLeave: {
      action: "mouse left",
    },
  },
  args: {
    children: "Button",
    variant: "default",
    size: "default",
    fullWidth: false,
    loading: false,
    disabled: false,
    asChild: false,
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "Button",
    onClick: action("clicked"),
    onFocus: action("focused"),
    onBlur: action("blurred"),
  },
};

export const Variants: Story = {
  render: (args) => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
      {variants.map((variant) => (
        <Button
          key={variant}
          {...args}
          variant={variant}
          onClick={action(`${variant} clicked`)}
        >
          {variant.charAt(0).toUpperCase() + variant.slice(1)}
        </Button>
      ))}
    </div>
  ),
  parameters: {
    controls: { include: ['size', 'fullWidth', 'loading', 'disabled', 'children'] },
  },
};

export const Sizes: Story = {
  render: (args) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
      {sizes.filter(size => size !== "icon").map((size) => (
        <Button
          key={size}
          {...args}
          size={size}
          onClick={action(`${size} clicked`)}
        >
          {size === "default" ? "Default" : size === "sm" ? "Small" : size === "lg" ? "Large" : "Extra Large"}
        </Button>
      ))}
    </div>
  ),
  parameters: {
    controls: { include: ['variant', 'fullWidth', 'loading', 'disabled', 'children'] },
  },
};

export const WithIcons: Story = {
  render: (args) => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
      <Button {...args} leftIcon={<Download />} onClick={action("download clicked")}>Download</Button>
      <Button {...args} rightIcon={<ArrowRight />} onClick={action("continue clicked")}>Continue</Button>
      <Button {...args} leftIcon={<Heart />} rightIcon={<span>42</span>} onClick={action("like clicked")}>
        Like
      </Button>
      <Button {...args} size="icon" aria-label="Favorite" onClick={action("favorite clicked")}>
        <Heart />
      </Button>
    </div>
  ),
  parameters: {
    controls: { include: ['variant', 'size', 'loading', 'disabled'] },
  },
};

export const Loading: Story = {
  render: (args) => (
    <div style={{ display: 'flex', gap: '1rem' }}>
      {["default", "secondary", "outline"].map((variant) => (
        <Button
          key={variant}
          {...args}
          loading
          variant={variant as any}
          onClick={action(`loading ${variant} clicked`)}
        >
          Loading
        </Button>
      ))}
    </div>
  ),
  args: {
    loading: true,
  },
  parameters: {
    controls: { include: ['size', 'fullWidth', 'children'] },
  },
};

export const Disabled: Story = {
  render: (args) => (
    <div style={{ display: 'flex', gap: '1rem' }}>
      {["default", "secondary", "outline"].map((variant) => (
        <Button
          key={variant}
          {...args}
          disabled
          variant={variant as any}
          onClick={action(`disabled ${variant} clicked`)}
        >
          Disabled
        </Button>
      ))}
    </div>
  ),
  args: {
    disabled: true,
  },
  parameters: {
    controls: { include: ['size', 'fullWidth', 'children'] },
  },
};

export const FullWidth: Story = {
  render: (args) => (
    <div style={{ width: '100%', maxWidth: '28rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <Button {...args} fullWidth onClick={action("full width clicked")}>Full Width Button</Button>
      <Button {...args} fullWidth variant="outline" onClick={action("full width outline clicked")}>
        Full Width Outline
      </Button>
    </div>
  ),
  args: {
    fullWidth: true,
  },
  parameters: {
    controls: { include: ['variant', 'size', 'loading', 'disabled', 'children'] },
  },
};

export const AsChild: Story = {
  render: (args) => (
    <Button {...args} asChild>
      <a href="https://example.com" target="_blank" rel="noopener noreferrer">
        Link as Button
      </a>
    </Button>
  ),
  args: {
    asChild: true,
  },
  parameters: {
    controls: { include: ['variant', 'size', 'fullWidth', 'loading', 'disabled'] },
  },
};

export const Playground: Story = {
  args: {
    children: "Click me!",
    variant: "default",
    size: "default",
  },
  argTypes: {
    variant: {
      control: "radio",
      options: variants,
    },
    size: {
      control: "radio", 
      options: sizes,
    },
    fullWidth: {
      control: "boolean",
    },
    loading: {
      control: "boolean",
    },
    disabled: {
      control: "boolean",
    },
  },
};