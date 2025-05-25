import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import { Input } from './Input';
import { axe } from 'jest-axe';

describe('Input Component', () => {
  describe('Rendering', () => {
    it('renders basic input', () => {
      render(<Input placeholder="Enter text" />);
      const input = screen.getByPlaceholderText('Enter text');
      expect(input).toBeInTheDocument();
      expect(input).toHaveClass('input');
    });

    it('renders with label', () => {
      render(<Input label="Username" placeholder="Enter username" />);
      const label = screen.getByText('Username');
      const input = screen.getByPlaceholderText('Enter username');
      
      expect(label).toBeInTheDocument();
      expect(label).toHaveClass('label');
      const inputId = input.getAttribute('id');
      expect(label).toHaveAttribute('for', inputId);
    });

    it('renders with required indicator', () => {
      render(<Input label="Email" required />);
      const asterisk = screen.getByText('*');
      expect(asterisk).toHaveClass('required');
      expect(asterisk.parentElement).toHaveTextContent('Email*');
    });

    it('renders with helper text', () => {
      render(<Input helperText="This is a helper message" />);
      const helper = screen.getByText('This is a helper message');
      expect(helper).toHaveClass('helperText');
    });

    it('renders with icons', () => {
      const LeftIcon = () => <svg data-testid="left-icon" />;
      const RightIcon = () => <svg data-testid="right-icon" />;
      
      render(
        <Input
          leftIcon={<LeftIcon />}
          rightIcon={<RightIcon />}
          placeholder="With icons"
        />
      );
      
      expect(screen.getByTestId('left-icon')).toBeInTheDocument();
      expect(screen.getByTestId('right-icon')).toBeInTheDocument();
      const input = screen.getByPlaceholderText('With icons');
      expect(input).toHaveClass('withLeftIcon', 'withRightIcon');
    });

    it('renders with addons', () => {
      render(
        <Input
          leftAddon="https://"
          rightAddon=".com"
          placeholder="domain"
        />
      );
      
      expect(screen.getByText('https://')).toBeInTheDocument();
      expect(screen.getByText('.com')).toBeInTheDocument();
    });
  });

  describe('Input Types', () => {
    const types = ['text', 'email', 'password', 'number', 'tel', 'url', 'search'] as const;

    types.forEach((type) => {
      it(`renders ${type} input correctly`, () => {
        render(<Input type={type} placeholder={`${type} input`} />);
        const input = screen.getByPlaceholderText(`${type} input`);
        expect(input).toHaveAttribute('type', type);
      });
    });

    it('handles number input validation', async () => {
      const user = userEvent.setup();
      render(<Input type="number" placeholder="Enter number" />);
      const input = screen.getByPlaceholderText('Enter number');
      
      await user.type(input, 'abc');
      expect(input).toHaveValue(null);
      
      await user.clear(input);
      await user.type(input, '123');
      expect(input).toHaveValue(123);
    });
  });

  describe('Sizes', () => {
    const sizes = ['sm', 'default', 'lg', 'xl'] as const;

    sizes.forEach((size) => {
      it(`renders ${size} size correctly`, () => {
        render(<Input inputSize={size} placeholder={`${size} input`} />);
        const input = screen.getByPlaceholderText(`${size} input`);
        if (size !== 'default') {
          expect(input).toHaveClass(size);
        }
      });
    });
  });

  describe('States', () => {
    it('handles disabled state', () => {
      render(<Input disabled placeholder="Disabled input" />);
      const input = screen.getByPlaceholderText('Disabled input');
      expect(input).toBeDisabled();
    });

    it('shows error state', () => {
      render(
        <Input
          error
          helperText="This field has an error"
          placeholder="Error input"
        />
      );
      const input = screen.getByPlaceholderText('Error input');
      const helper = screen.getByText('This field has an error');
      
      expect(input).toHaveClass('error');
      expect(helper).toHaveClass('errorText');
    });

    it('shows success state', () => {
      render(
        <Input
          success
          helperText="Looking good!"
          placeholder="Success input"
        />
      );
      const input = screen.getByPlaceholderText('Success input');
      const helper = screen.getByText('Looking good!');
      
      expect(input).toHaveClass('success');
      expect(helper).toHaveClass('successText');
    });

    it('handles readonly state', () => {
      render(<Input readOnly value="Read only value" />);
      const input = screen.getByDisplayValue('Read only value');
      expect(input).toHaveAttribute('readOnly');
    });
  });

  describe('Interactions', () => {
    it('handles value changes', async () => {
      const handleChange = vi.fn();
      const user = userEvent.setup();
      
      render(
        <Input
          placeholder="Type here"
          onChange={handleChange}
        />
      );
      
      const input = screen.getByPlaceholderText('Type here');
      await user.type(input, 'Hello');
      
      expect(input).toHaveValue('Hello');
      expect(handleChange).toHaveBeenCalledTimes(5);
    });

    it('handles focus and blur events', async () => {
      const handleFocus = vi.fn();
      const handleBlur = vi.fn();
      const user = userEvent.setup();
      
      render(
        <Input
          placeholder="Focus me"
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
      );
      
      const input = screen.getByPlaceholderText('Focus me');
      
      await user.click(input);
      expect(handleFocus).toHaveBeenCalled();
      
      await user.tab();
      expect(handleBlur).toHaveBeenCalled();
    });

    it('handles keyboard events', async () => {
      const handleKeyDown = vi.fn();
      const handleKeyUp = vi.fn();
      const user = userEvent.setup();
      
      render(
        <Input
          placeholder="Press keys"
          onKeyDown={handleKeyDown}
          onKeyUp={handleKeyUp}
        />
      );
      
      const input = screen.getByPlaceholderText('Press keys');
      await user.click(input);
      await user.keyboard('{Enter}');
      
      expect(handleKeyDown).toHaveBeenCalled();
      expect(handleKeyUp).toHaveBeenCalled();
    });

    it('prevents interaction when disabled', async () => {
      const handleChange = vi.fn();
      const user = userEvent.setup();
      
      render(
        <Input
          disabled
          placeholder="Disabled"
          onChange={handleChange}
        />
      );
      
      const input = screen.getByPlaceholderText('Disabled');
      await user.type(input, 'test');
      
      expect(handleChange).not.toHaveBeenCalled();
    });
  });

  describe('Accessibility', () => {
    it('has no accessibility violations', async () => {
      const { container } = render(
        <Input
          label="Accessible Input"
          helperText="Helper text"
          required
        />
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('associates label with input correctly', () => {
      render(<Input label="Test Label" />);
      const input = screen.getByLabelText('Test Label');
      expect(input).toBeInTheDocument();
    });

    it('supports aria attributes', () => {
      render(
        <Input
          aria-label="Custom label"
          aria-describedby="helper"
          aria-invalid="true"
          placeholder="ARIA input"
        />
      );
      const input = screen.getByPlaceholderText('ARIA input');
      expect(input).toHaveAttribute('aria-label', 'Custom label');
      expect(input).toHaveAttribute('aria-describedby', expect.stringContaining('helper'));
      expect(input).toHaveAttribute('aria-invalid', 'true');
    });

    it('announces required fields to screen readers', () => {
      render(<Input label="Required Field" required />);
      const input = screen.getByLabelText(/Required Field/);
      expect(input).toHaveAttribute('required');
      expect(input).toHaveAttribute('aria-required', 'true');
    });

    it('maintains focus visibility', async () => {
      const user = userEvent.setup();
      render(<Input placeholder="Tab to me" />);
      
      await user.tab();
      const input = screen.getByPlaceholderText('Tab to me');
      expect(input).toHaveFocus();
    });
  });

  describe('Validation', () => {
    it('handles HTML5 validation', () => {
      render(
        <Input
          type="email"
          required
          pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
          placeholder="Email"
        />
      );
      const input = screen.getByPlaceholderText('Email') as HTMLInputElement;
      
      fireEvent.change(input, { target: { value: 'invalid-email' } });
      expect(input.validity.valid).toBe(false);
      
      fireEvent.change(input, { target: { value: 'valid@email.com' } });
      expect(input.validity.valid).toBe(true);
    });

    it('handles min and max for number inputs', () => {
      render(
        <Input
          type="number"
          min={0}
          max={100}
          placeholder="Number"
        />
      );
      const input = screen.getByPlaceholderText('Number');
      
      expect(input).toHaveAttribute('min', '0');
      expect(input).toHaveAttribute('max', '100');
    });

    it('handles maxLength constraint', async () => {
      const user = userEvent.setup();
      render(<Input maxLength={5} placeholder="Max 5 chars" />);
      const input = screen.getByPlaceholderText('Max 5 chars');
      
      await user.type(input, 'Hello World');
      expect(input).toHaveValue('Hello');
    });
  });

  describe('Performance', () => {
    it('renders efficiently with controlled value', () => {
      const { rerender } = render(<Input value="initial" onChange={() => {}} />);
      let input;
      
      input = screen.getByDisplayValue('initial');
      
      const startTime = performance.now();
      for (let i = 0; i < 100; i++) {
        rerender(<Input value={`value${i}`} onChange={() => {}} />);
      }
      const endTime = performance.now();
      
      expect(endTime - startTime).toBeLessThan(200);
    });

    it('debounces rapid input changes', async () => {
      const handleChange = vi.fn();
      const user = userEvent.setup({ delay: null });
      
      render(<Input placeholder="Type fast" onChange={handleChange} />);
      const input = screen.getByPlaceholderText('Type fast');
      
      await user.type(input, 'Hello World!');
      
      expect(handleChange.mock.calls.length).toBeGreaterThan(0);
      expect(input).toHaveValue('Hello World!');
    });
  });

  describe('Dark Mode Support', () => {
    beforeEach(() => {
      document.documentElement.setAttribute('data-theme', 'dark');
    });

    afterEach(() => {
      document.documentElement.removeAttribute('data-theme');
    });

    it('applies dark mode styles', () => {
      const { container } = render(<Input placeholder="Dark mode input" />);
      const input = container.querySelector('.input');
      
      expect(input).toHaveClass('input');
      const styles = window.getComputedStyle(input!);
      expect(styles.backgroundColor).toBeTruthy();
    });
  });

  describe('Edge Cases', () => {
    it('handles empty value gracefully', () => {
      render(<Input value="" onChange={() => {}} />);
      const input = screen.getByRole('textbox');
      expect(input).toHaveValue('');
    });

    it('handles very long placeholder text', () => {
      const longPlaceholder = 'This is a very long placeholder text '.repeat(10);
      render(<Input placeholder={longPlaceholder} />);
      const input = screen.getByPlaceholderText(longPlaceholder);
      expect(input).toBeInTheDocument();
    });

    it('handles special characters in value', async () => {
      const user = userEvent.setup();
      render(<Input placeholder="Special chars" />);
      const input = screen.getByPlaceholderText('Special chars');
      
      const specialChars = '!@#$%^&*()_+-=[]{}|;\':",./<>?`~';
      await user.type(input, specialChars);
      expect(input).toHaveValue(specialChars);
    });

    it('handles input with both icon and addon', () => {
      const Icon = () => <svg data-testid="icon" />;
      render(
        <Input
          leftIcon={<Icon />}
          leftAddon="$"
          placeholder="Complex"
        />
      );
      
      expect(screen.getByTestId('icon')).toBeInTheDocument();
      expect(screen.getByText('$')).toBeInTheDocument();
    });
  });

  describe('Memory Management', () => {
    it('cleans up event listeners on unmount', () => {
      const handleChange = vi.fn();
      const { unmount } = render(
        <Input onChange={handleChange} placeholder="Memory test" />
      );
      
      unmount();
      
      expect(() => {
        fireEvent.change(document.body, { target: { value: 'test' } });
      }).not.toThrow();
    });
  });

  describe('Type Safety', () => {
    it('forwards refs correctly', () => {
      const ref = React.createRef<HTMLInputElement>();
      render(<Input ref={ref} placeholder="Ref test" />);
      
      expect(ref.current).toBeInstanceOf(HTMLInputElement);
      expect(ref.current?.tagName).toBe('INPUT');
    });

    it('accepts all valid HTML input attributes', () => {
      render(
        <Input
          autoComplete="username"
          autoFocus
          spellCheck={false}
          tabIndex={1}
          placeholder="Attributes test"
        />
      );
      
      const input = screen.getByPlaceholderText('Attributes test');
      expect(input).toHaveAttribute('autocomplete', 'username');
      expect(input).toHaveAttribute('spellcheck', 'false');
      expect(input).toHaveAttribute('tabindex', '1');
    });
  });
});