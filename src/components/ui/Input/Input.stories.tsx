import type { Meta, StoryObj } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { Input } from "./Input";
import { Search, Mail, Lock, User, DollarSign } from "lucide-react";

const inputSizes = ["sm", "default", "lg", "xl"] as const;
const inputTypes = ["text", "email", "password", "number", "tel", "url", "search"] as const;

const meta = {
  title: "Primitives/Input",
  component: Input,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    inputSize: {
      control: "radio",
      options: inputSizes,
      description: "The size of the input field",
    },
    type: {
      control: "select",
      options: inputTypes,
      description: "The HTML input type",
    },
    placeholder: {
      control: "text",
      description: "Placeholder text for the input",
    },
    label: {
      control: "text",
      description: "Label text for the input",
    },
    helperText: {
      control: "text",
      description: "Helper text displayed below the input",
    },
    disabled: {
      control: "boolean",
      description: "Disables the input",
    },
    error: {
      control: "boolean",
      description: "Shows error state",
    },
    success: {
      control: "boolean",
      description: "Shows success state",
    },
    required: {
      control: "boolean",
      description: "Makes the field required",
    },
    leftIcon: {
      control: false,
      description: "Icon element to display on the left",
    },
    rightIcon: {
      control: false,
      description: "Icon element to display on the right",
    },
    leftAddon: {
      control: false,
      description: "Addon element to display on the left",
    },
    rightAddon: {
      control: false,
      description: "Addon element to display on the right",
    },
    onChange: {
      action: "changed",
    },
    onFocus: {
      action: "focused",
    },
    onBlur: {
      action: "blurred",
    },
    onKeyDown: {
      action: "key pressed",
    },
    onKeyUp: {
      action: "key released",
    },
  },
  args: {
    placeholder: "Enter text...",
    type: "text",
    inputSize: "default",
    disabled: false,
    error: false,
    success: false,
    required: false,
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: "Enter your text here",
    label: "Input Label",
    helperText: "This is a helper text",
  },
};

export const WithLabel: Story = {
  args: {
    label: "Email Address",
    placeholder: "john@example.com",
    type: "email",
    required: true,
  },
};

export const Sizes: Story = {
  render: (args) => (
    <div style={{ width: '100%', maxWidth: '28rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {inputSizes.map((size) => (
        <Input
          key={size}
          {...args}
          inputSize={size}
          placeholder={`${size.charAt(0).toUpperCase() + size.slice(1)} input`}
          onChange={action(`${size} changed`)}
        />
      ))}
    </div>
  ),
  parameters: {
    controls: { include: ['type', 'label', 'helperText', 'disabled', 'error', 'success', 'required'] },
  },
};

export const WithIcons: Story = {
  render: (args) => (
    <div style={{ width: '100%', maxWidth: '28rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <Input {...args} leftIcon={<Search />} placeholder="Search..." onChange={action("search changed")} />
      <Input {...args} rightIcon={<Mail />} placeholder="Email address" type="email" onChange={action("email changed")} />
      <Input
        {...args}
        leftIcon={<Lock />}
        rightIcon={<User />}
        placeholder="Password"
        type="password"
        onChange={action("password changed")}
      />
    </div>
  ),
  parameters: {
    controls: { include: ['inputSize', 'label', 'helperText', 'disabled', 'error', 'success', 'required'] },
  },
};

export const WithAddons: Story = {
  render: (args) => (
    <div style={{ width: '100%', maxWidth: '28rem', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <Input {...args} leftAddon="https://" placeholder="example.com" onChange={action("url changed")} />
      <Input {...args} rightAddon=".com" placeholder="website" onChange={action("domain changed")} />
      <Input
        {...args}
        leftAddon={<DollarSign />}
        rightAddon="USD"
        placeholder="0.00"
        type="number"
        onChange={action("amount changed")}
      />
    </div>
  ),
  parameters: {
    controls: { include: ['inputSize', 'label', 'helperText', 'disabled', 'error', 'success', 'required'] },
  },
};

export const States: Story = {
  render: (args) => (
    <div style={{ width: '100%', maxWidth: '28rem', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <Input
        {...args}
        placeholder="Default state"
        helperText="This is a helper text"
        onChange={action("default state changed")}
      />
      <Input
        {...args}
        placeholder="Error state"
        error
        helperText="This field is required"
        onChange={action("error state changed")}
      />
      <Input
        {...args}
        placeholder="Success state"
        success
        helperText="Looking good!"
        onChange={action("success state changed")}
      />
      <Input
        {...args}
        placeholder="Disabled state"
        disabled
        helperText="This field is disabled"
        onChange={action("disabled state changed")}
      />
    </div>
  ),
  parameters: {
    controls: { include: ['inputSize', 'type', 'label', 'required'] },
  },
};

export const CompleteForm: Story = {
  render: (args) => (
    <div style={{ width: '100%', maxWidth: '28rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <Input
        {...args}
        label="Full Name"
        placeholder="John Doe"
        leftIcon={<User />}
        required
        onChange={action("name changed")}
      />
      <Input
        {...args}
        label="Email"
        type="email"
        placeholder="john@example.com"
        leftIcon={<Mail />}
        required
        helperText="We'll never share your email"
        onChange={action("email changed")}
      />
      <Input
        {...args}
        label="Password"
        type="password"
        placeholder="••••••••"
        leftIcon={<Lock />}
        required
        error
        helperText="Password must be at least 8 characters"
        onChange={action("password changed")}
      />
    </div>
  ),
  parameters: {
    controls: { include: ['inputSize', 'disabled'] },
  },
};

export const Playground: Story = {
  args: {
    placeholder: "Type something...",
    label: "Playground Input",
    helperText: "Experiment with different settings",
  },
  argTypes: {
    inputSize: {
      control: "radio",
      options: inputSizes,
    },
    type: {
      control: "select",
      options: inputTypes,
    },
  },
};