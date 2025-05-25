# Input Component

A comprehensive form input component with support for various types, sizes, states, icons, and addons. Built with accessibility and performance as core priorities.

## Architecture

### Component Structure

The Input component is built with a flexible architecture supporting multiple configurations:

```typescript
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  helperText?: string;
  error?: boolean;
  success?: boolean;
  inputSize?: 'sm' | 'default' | 'lg' | 'xl';
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  leftAddon?: React.ReactNode;
  rightAddon?: React.ReactNode;
}
```

### Layout System

The component uses a wrapper-based architecture:

1. **InputWrapper**: Main container for label and input group
2. **InputContainer**: Handles icon positioning
3. **AddonContainer**: Manages addon layout
4. **Input Element**: Core input with proper styling

### Styling Implementation

CSS Modules with CSS custom properties enable:

- **Responsive sizing**: Four predefined sizes with consistent scaling
- **State management**: Visual feedback for error, success, and disabled states
- **Icon integration**: Absolute positioning for icons within input
- **Addon styling**: Seamless visual integration of prefixes/suffixes
- **Dark mode**: Automatic theme adaptation

### Performance Optimizations

1. **Efficient re-renders**: Proper use of React.forwardRef
2. **Native validation**: Leverages HTML5 input validation
3. **Minimal DOM manipulation**: CSS-based state changes
4. **Event delegation**: Efficient event handling

## Features

### Input Types

Supports all standard HTML5 input types:
- Text, Email, Password
- Number (with increment/decrement controls)
- Tel, URL, Search
- Date, Time, and more

### Sizes

- **Small (sm)**: Compact inputs for dense interfaces
- **Default**: Standard size for most forms
- **Large (lg)**: Increased touch targets
- **Extra Large (xl)**: Hero sections and prominent forms

### Visual States

- **Default**: Standard input appearance
- **Error**: Red border with error message support
- **Success**: Green border with success message
- **Disabled**: Reduced opacity with cursor indication
- **Readonly**: Non-editable but selectable

### Enhancements

- **Icons**: Left/right icon support for visual context
- **Addons**: Prefix/suffix elements (text or components)
- **Labels**: Accessible label association
- **Helper Text**: Contextual guidance or validation messages
- **Required Indicator**: Visual asterisk for required fields

### Accessibility

- Proper label-input association
- ARIA attributes for state announcement
- Keyboard navigation support
- Screen reader friendly error messages
- Focus management and indicators

### Dark Mode

Automatic adaptation includes:
- Background color adjustments
- Border contrast optimization
- Placeholder text visibility
- Addon background adaptation
- Maintained readability in all states

## Usage Examples

### Basic Input

```jsx
<Input
  label="Username"
  placeholder="Enter your username"
  helperText="Choose a unique username"
/>
```

### With Validation States

```jsx
<Input
  label="Email"
  type="email"
  error
  helperText="Please enter a valid email"
  required
/>

<Input
  label="Password"
  type="password"
  success
  helperText="Strong password!"
/>
```

### With Icons

```jsx
<Input
  leftIcon={<SearchIcon />}
  placeholder="Search..."
/>

<Input
  label="Email"
  type="email"
  leftIcon={<MailIcon />}
  rightIcon={isValid ? <CheckIcon /> : null}
/>
```

### With Addons

```jsx
<Input
  leftAddon="https://"
  placeholder="yoursite.com"
/>

<Input
  leftAddon={<DollarIcon />}
  rightAddon="USD"
  type="number"
  placeholder="0.00"
/>
```

### Complex Form Example

```jsx
<form>
  <Input
    label="Full Name"
    required
    autoComplete="name"
    leftIcon={<UserIcon />}
  />
  
  <Input
    label="Email Address"
    type="email"
    required
    error={emailError}
    helperText={emailError ? "Email already exists" : "We'll never share your email"}
    leftIcon={<MailIcon />}
  />
  
  <Input
    label="Website"
    type="url"
    leftAddon="https://"
    rightAddon=".com"
    placeholder="example"
  />
  
  <Input
    label="Bio"
    as="textarea"
    rows={4}
    maxLength={200}
    helperText={`${bio.length}/200 characters`}
  />
</form>
```

## Technical Details

### CSS Architecture

The component uses modular styles:

1. **Base input styles**: Core appearance and transitions
2. **Size modifiers**: Height and padding adjustments
3. **State classes**: Visual feedback for different states
4. **Icon adjustments**: Padding compensation for icons
5. **Addon styles**: Integrated prefix/suffix styling

### Event Handling

- Native input events preserved
- Proper event bubbling
- Controlled and uncontrolled support
- Debouncing handled by consumer

### Validation

- HTML5 validation attributes supported
- Custom validation via error prop
- Real-time validation feedback
- Accessible error announcements

### Browser Support

- All modern browsers
- CSS custom properties for theming
- Flexbox for layout
- Native form validation
- Proper input type support

## Testing

Comprehensive test coverage includes:

- **Rendering**: All props and combinations
- **Interactions**: User input, focus, blur
- **Validation**: HTML5 and custom validation
- **Accessibility**: ARIA, keyboard, screen readers
- **Performance**: Render efficiency, rapid input
- **Edge cases**: Special characters, long text

## Best Practices

1. **Always use labels**: For accessibility and usability
2. **Provide helper text**: Guide users on expected input
3. **Use appropriate types**: Leverage native input features
4. **Handle validation gracefully**: Clear error messages
5. **Consider mobile**: Touch-friendly sizes and targets
6. **Test with assistive technology**: Ensure full accessibility

## Implementation Notes

### Controlled vs Uncontrolled

The component supports both patterns:

```jsx
// Controlled
const [value, setValue] = useState('');
<Input value={value} onChange={(e) => setValue(e.target.value)} />

// Uncontrolled
const inputRef = useRef();
<Input ref={inputRef} defaultValue="initial" />
```

### Focus Management

Proper focus handling:

```jsx
const inputRef = useRef();

// Focus programmatically
inputRef.current?.focus();

// Focus with selection
inputRef.current?.select();
```

### Custom Validation

Integrate with form libraries:

```jsx
<Input
  {...register('email', {
    required: 'Email is required',
    pattern: {
      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
      message: 'Invalid email address'
    }
  })}
  error={!!errors.email}
  helperText={errors.email?.message}
/>
```

### Performance Tips

1. Use controlled inputs sparingly for large forms
2. Debounce onChange for search inputs
3. Memoize icon components if complex
4. Avoid inline function creation in render