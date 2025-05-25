# Button Component

A versatile, accessible button component with multiple variants, sizes, and states. Built with performance and flexibility in mind.

## Architecture

### Component Structure

The Button component is implemented using a polymorphic design pattern with the `asChild` prop, allowing it to render as different HTML elements while maintaining consistent styling and behavior.

```typescript
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'secondary' | 'outline' | 'ghost' | 'destructive' | 'link';
  size?: 'default' | 'sm' | 'lg' | 'xl' | 'icon';
  asChild?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  rounded?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}
```

### Styling Implementation

The component uses CSS Modules with CSS custom properties for theming:

- **Base styles**: Consistent padding, typography, and transitions
- **Variant styles**: Color schemes for different button purposes
- **Size modifiers**: Predefined sizes from small to extra-large
- **State styles**: Hover, active, focus, disabled, and loading states
- **Dark mode**: Automatic theme adaptation using CSS custom properties

### Performance Optimizations

1. **CSS-based animations**: Loading spinner implemented purely in CSS
2. **Minimal re-renders**: Component wrapped with `React.forwardRef` for ref forwarding
3. **Efficient event handling**: Native button behavior preserved
4. **Isolation context**: Prevents z-index issues with `isolation: isolate`

## Features

### Variants

- **Default**: Primary action buttons with brand colors
- **Secondary**: Secondary actions with neutral styling
- **Outline**: Ghost buttons with border
- **Ghost**: Minimal buttons for tertiary actions
- **Destructive**: Dangerous actions (delete, remove)
- **Link**: Styled as inline links

### Sizes

- **Small (sm)**: Compact buttons for tight spaces
- **Default**: Standard size for most use cases
- **Large (lg)**: Prominent call-to-action buttons
- **Extra Large (xl)**: Hero section buttons
- **Icon**: Square buttons for icon-only content

### States

- **Loading**: Shows spinner and prevents interaction
- **Disabled**: Reduces opacity and prevents interaction
- **Full Width**: Expands to container width
- **Rounded**: Fully rounded corners

### Accessibility

- Full keyboard navigation support
- ARIA attributes for loading states
- Focus indicators meeting WCAG standards
- Screen reader announcements
- Proper button semantics

### Dark Mode

The component automatically adapts to dark mode using CSS custom properties:

- Primary buttons use lighter shades in dark mode
- Secondary buttons invert their color scheme
- Ghost buttons maintain readability
- Focus indicators remain visible

## Usage Examples

### Basic Usage

```jsx
<Button>Click me</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="outline">Outline</Button>
```

### With Icons

```jsx
<Button leftIcon={<SaveIcon />}>Save</Button>
<Button rightIcon={<ArrowRightIcon />}>Continue</Button>
<Button size="icon" aria-label="Close">
  <CloseIcon />
</Button>
```

### Loading State

```jsx
<Button loading>Saving...</Button>
<Button loading variant="outline">Processing</Button>
```

### As Link

```jsx
<Button asChild>
  <a href="/dashboard">Go to Dashboard</a>
</Button>
```

### Complex Example

```jsx
<Button
  variant="destructive"
  size="lg"
  fullWidth
  leftIcon={<TrashIcon />}
  onClick={handleDelete}
  disabled={!canDelete}
>
  Delete Account
</Button>
```

## Technical Details

### CSS Architecture

The component uses a modular CSS approach:

1. **Base styles**: Applied to all buttons via `.button` class
2. **Variant styles**: Applied conditionally (e.g., `.default`, `.outline`)
3. **Modifier styles**: Size and state classes (e.g., `.lg`, `.loading`)
4. **Composition**: Multiple classes combined for final appearance

### Event Handling

- Click events are prevented when `loading` is true
- Native form submission works correctly
- Focus management preserves accessibility

### Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- CSS custom properties for theming
- CSS Grid and Flexbox for layout
- CSS animations for loading states

## Testing

The component includes comprehensive tests covering:

- **Rendering**: All variants, sizes, and states
- **Interactions**: Click, keyboard, focus events
- **Accessibility**: ARIA compliance, keyboard navigation
- **Performance**: Render efficiency, memory leaks
- **Edge cases**: Empty content, long text, rapid clicks

## Best Practices

1. **Use semantic variants**: Choose variants based on action importance
2. **Provide accessible labels**: Use aria-label for icon-only buttons
3. **Handle loading states**: Show loading state during async operations
4. **Consider button hierarchy**: Use one primary action per view
5. **Test keyboard navigation**: Ensure all buttons are keyboard accessible