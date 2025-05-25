# Card Component

A flexible container component for grouping related content with multiple visual variants and interactive capabilities. Designed for creating consistent, accessible content sections.

## Architecture

### Component Structure

The Card component uses a compound component pattern, providing semantic subcomponents for structured content organization:

```typescript
interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'outlined' | 'elevated' | 'ghost' | 'gradient';
  padding?: 'none' | 'sm' | 'default' | 'lg' | 'xl';
  interactive?: boolean;
}
```

### Subcomponents

- **Card**: Main container component
- **CardHeader**: Section for title and metadata
- **CardTitle**: H3 element for main heading
- **CardDescription**: Descriptive text below title
- **CardContent**: Main content area with appropriate spacing
- **CardFooter**: Bottom section for actions or metadata

### Styling Implementation

The component uses CSS Modules with CSS custom properties:

- **Layout**: Flexible structure with consistent spacing
- **Variants**: Five distinct visual styles for different contexts
- **Padding scales**: Consistent spacing system from none to xl
- **Interactive states**: Smooth transitions for hover and active states
- **Dark mode**: Automatic adaptation using CSS custom properties

### Performance Optimizations

1. **CSS-based animations**: Transform transitions for hover effects
2. **Efficient rendering**: Minimal DOM manipulation
3. **Overflow handling**: Built-in overflow protection
4. **Isolation context**: Proper stacking context management

## Features

### Variants

- **Default**: Standard card with subtle background and border
- **Outlined**: Border-only style for minimal visual weight
- **Elevated**: Shadow effect for visual hierarchy
- **Ghost**: Semi-transparent with backdrop blur
- **Gradient**: Gradient background for emphasis

### Padding Options

- **None**: No padding for custom content layouts
- **Small (sm)**: Compact spacing for dense layouts
- **Default**: Standard spacing for most use cases
- **Large (lg)**: Generous spacing for emphasis
- **Extra Large (xl)**: Maximum spacing for hero sections

### Interactive Features

- **Hover effects**: Subtle lift animation on hover
- **Click handling**: Full card clickable area
- **Keyboard support**: Tab navigation and Enter/Space activation
- **Focus indicators**: Visible focus states for accessibility

### Dark Mode

The component seamlessly adapts to dark mode:

- Background colors invert appropriately
- Borders adjust for visibility
- Shadows include subtle light borders
- Gradient variants use darker color ranges
- Ghost variant maintains translucency

## Usage Examples

### Basic Card

```jsx
<Card>
  <CardHeader>
    <CardTitle>Welcome</CardTitle>
    <CardDescription>Get started with our platform</CardDescription>
  </CardHeader>
  <CardContent>
    <p>Your content goes here</p>
  </CardContent>
</Card>
```

### Interactive Card

```jsx
<Card interactive variant="elevated" onClick={handleClick}>
  <CardHeader>
    <CardTitle>Click Me</CardTitle>
    <CardDescription>This entire card is clickable</CardDescription>
  </CardHeader>
  <CardContent>
    Interactive cards are great for navigation
  </CardContent>
</Card>
```

### Card with Actions

```jsx
<Card variant="outlined">
  <CardHeader>
    <CardTitle>Product Name</CardTitle>
    <CardDescription>$99.99</CardDescription>
  </CardHeader>
  <CardContent>
    <img src="product.jpg" alt="Product" />
    <p>Product description...</p>
  </CardContent>
  <CardFooter>
    <Button>Add to Cart</Button>
    <Button variant="ghost">Learn More</Button>
  </CardFooter>
</Card>
```

### Nested Layout

```jsx
<Card padding="lg">
  <CardHeader>
    <CardTitle>Dashboard</CardTitle>
  </CardHeader>
  <CardContent>
    <div className="grid">
      <Card variant="ghost" padding="sm">
        <CardContent>Metric 1</CardContent>
      </Card>
      <Card variant="ghost" padding="sm">
        <CardContent>Metric 2</CardContent>
      </Card>
    </div>
  </CardContent>
</Card>
```

## Technical Details

### CSS Architecture

The component uses modular CSS with:

1. **Base styles**: Container setup and transitions
2. **Variant styles**: Visual appearance modifications
3. **Padding modifiers**: Spacing scale classes
4. **State styles**: Interactive and hover effects

### Layout System

- Uses CSS custom properties for consistent spacing
- Flexbox for header and footer alignment
- Proper content flow with semantic HTML
- Overflow protection with `overflow: hidden`

### Accessibility Features

- Semantic HTML structure (header, main, footer patterns)
- Proper heading hierarchy with H3 for titles
- Keyboard navigation support for interactive cards
- Focus indicators meeting WCAG standards
- Screen reader friendly content structure

### Browser Support

- Modern browsers with CSS custom property support
- CSS Grid and Flexbox for layouts
- Backdrop filter for ghost variant (with fallbacks)
- Transform animations for interactions

## Testing

Comprehensive test coverage includes:

- **Rendering**: All variants, padding options, and subcomponents
- **Interactions**: Click, hover, and keyboard navigation
- **Accessibility**: ARIA compliance and semantic structure
- **Performance**: Efficient rendering with many children
- **Dark mode**: Style adaptation verification
- **Edge cases**: Empty content, nested cards, long content

## Best Practices

1. **Use semantic structure**: Always include CardHeader with CardTitle
2. **Choose appropriate variants**: Match visual hierarchy needs
3. **Interactive cards**: Ensure entire card has consistent clickable behavior
4. **Accessibility**: Provide clear headings and logical content flow
5. **Performance**: Avoid deeply nested card structures
6. **Dark mode**: Test appearance in both light and dark themes

## Implementation Notes

### Compound Component Pattern

The Card uses compound components for flexibility:

```jsx
const CardContext = React.createContext<CardContextValue>({});

export const Card = React.forwardRef<HTMLDivElement, CardProps>((props, ref) => {
  // Main container logic
});

export const CardHeader = ({ className, ...props }: CardSectionProps) => {
  // Header section with proper spacing
};
```

### Style Composition

Styles are composed using the `cn` utility:

```jsx
className={cn(
  styles.card,
  styles[variant],
  styles[`padding${capitalize(padding)}`],
  interactive && styles.interactive,
  className
)}
```

### Performance Considerations

- Minimal re-renders through proper prop handling
- CSS-based animations avoid JavaScript overhead
- Efficient event delegation for interactive cards
- Proper cleanup of event listeners