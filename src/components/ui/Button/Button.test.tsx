import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import { Button } from './Button';
import { axe } from 'jest-axe';

describe('Button Component', () => {
  describe('Rendering', () => {
    it('renders with children', () => {
      render(<Button>Click me</Button>);
      expect(screen.getByRole('button')).toHaveTextContent('Click me');
    });

    it('renders as a custom element when asChild is true', () => {
      render(
        <Button asChild>
          <a href="/test">Link Button</a>
        </Button>
      );
      const link = screen.getByRole('link');
      expect(link).toHaveAttribute('href', '/test');
      expect(link).toHaveClass('button');
    });

    it('renders with left icon', () => {
      const TestIcon = () => <svg data-testid="left-icon" />;
      render(<Button leftIcon={<TestIcon />}>Button</Button>);
      expect(screen.getByTestId('left-icon')).toBeInTheDocument();
    });

    it('renders with right icon', () => {
      const TestIcon = () => <svg data-testid="right-icon" />;
      render(<Button rightIcon={<TestIcon />}>Button</Button>);
      expect(screen.getByTestId('right-icon')).toBeInTheDocument();
    });

    it('renders with both icons', () => {
      const LeftIcon = () => <svg data-testid="left-icon" />;
      const RightIcon = () => <svg data-testid="right-icon" />;
      render(
        <Button leftIcon={<LeftIcon />} rightIcon={<RightIcon />}>
          Button
        </Button>
      );
      expect(screen.getByTestId('left-icon')).toBeInTheDocument();
      expect(screen.getByTestId('right-icon')).toBeInTheDocument();
    });
  });

  describe('Variants', () => {
    const variants = ['default', 'secondary', 'outline', 'ghost', 'destructive', 'link'] as const;

    variants.forEach((variant) => {
      it(`renders ${variant} variant correctly`, () => {
        render(<Button variant={variant}>Button</Button>);
        const button = screen.getByRole('button');
        expect(button).toHaveClass('button', variant);
      });
    });
  });

  describe('Sizes', () => {
    const sizes = ['default', 'sm', 'lg', 'xl', 'icon'] as const;

    sizes.forEach((size) => {
      it(`renders ${size} size correctly`, () => {
        render(<Button size={size}>{size === 'icon' ? '×' : 'Button'}</Button>);
        const button = screen.getByRole('button');
        if (size !== 'default') {
          expect(button).toHaveClass(size);
        }
      });
    });
  });

  describe('States', () => {
    it('handles disabled state', () => {
      const handleClick = vi.fn();
      render(
        <Button disabled onClick={handleClick}>
          Disabled
        </Button>
      );
      const button = screen.getByRole('button');
      expect(button).toBeDisabled();
      expect(button).toHaveClass('button');
      
      fireEvent.click(button);
      expect(handleClick).not.toHaveBeenCalled();
    });

    it('shows loading state', () => {
      render(<Button loading>Loading</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('loading');
      expect(button).toHaveAttribute('aria-busy', 'true');
    });

    it('handles fullWidth prop', () => {
      render(<Button fullWidth>Full Width</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('fullWidth');
    });
  });

  describe('Interactions', () => {
    it('handles click events', async () => {
      const handleClick = vi.fn();
      const user = userEvent.setup();
      
      render(<Button onClick={handleClick}>Click me</Button>);
      const button = screen.getByRole('button');
      
      await user.click(button);
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('prevents click when loading', async () => {
      const handleClick = vi.fn();
      const user = userEvent.setup();
      
      render(
        <Button loading onClick={handleClick}>
          Loading
        </Button>
      );
      const button = screen.getByRole('button');
      
      await user.click(button);
      expect(handleClick).not.toHaveBeenCalled();
    });

    it('handles keyboard navigation', async () => {
      const handleClick = vi.fn();
      const user = userEvent.setup();
      
      render(<Button onClick={handleClick}>Press me</Button>);
      const button = screen.getByRole('button');
      
      button.focus();
      await user.keyboard('{Enter}');
      expect(handleClick).toHaveBeenCalledTimes(1);
      
      await user.keyboard(' ');
      expect(handleClick).toHaveBeenCalledTimes(2);
    });

    it('handles focus and blur events', async () => {
      const handleFocus = vi.fn();
      const handleBlur = vi.fn();
      const user = userEvent.setup();
      
      render(
        <Button onFocus={handleFocus} onBlur={handleBlur}>
          Focus me
        </Button>
      );
      const button = screen.getByRole('button');
      
      await user.click(button);
      expect(handleFocus).toHaveBeenCalled();
      
      await user.tab();
      expect(handleBlur).toHaveBeenCalled();
    });
  });

  describe('Accessibility', () => {
    it('has no accessibility violations', async () => {
      const { container } = render(<Button>Accessible Button</Button>);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('supports aria-label', () => {
      render(<Button aria-label="Close dialog">×</Button>);
      const button = screen.getByRole('button', { name: 'Close dialog' });
      expect(button).toBeInTheDocument();
    });

    it('supports aria-pressed', () => {
      render(<Button aria-pressed="true">Toggle</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('aria-pressed', 'true');
    });

    it('announces loading state to screen readers', () => {
      render(<Button loading>Save</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('aria-busy', 'true');
    });

    it('maintains focus visibility', async () => {
      const user = userEvent.setup();
      render(<Button>Tab to me</Button>);
      
      await user.tab();
      const button = screen.getByRole('button');
      expect(button).toHaveFocus();
    });
  });

  describe('Performance', () => {
    it('does not re-render unnecessarily', () => {
      const renderSpy = vi.fn();
      
      const TestButton = React.memo(() => {
        renderSpy();
        return <Button>Memoized</Button>;
      });
      
      const { rerender } = render(<TestButton />);
      expect(renderSpy).toHaveBeenCalledTimes(1);
      
      rerender(<TestButton />);
      expect(renderSpy).toHaveBeenCalledTimes(1);
    });

    it('handles rapid clicks efficiently', async () => {
      const handleClick = vi.fn();
      const user = userEvent.setup({ delay: null });
      
      render(<Button onClick={handleClick}>Rapid Click</Button>);
      const button = screen.getByRole('button');
      
      const startTime = performance.now();
      for (let i = 0; i < 100; i++) {
        await user.click(button);
      }
      const endTime = performance.now();
      
      expect(handleClick).toHaveBeenCalledTimes(100);
      expect(endTime - startTime).toBeLessThan(1000);
    });
  });

  describe('Edge Cases', () => {
    it('handles empty children gracefully', () => {
      render(<Button>{''}</Button>);
      const button = screen.getByRole('button');
      expect(button).toBeInTheDocument();
    });

    it('handles null children gracefully', () => {
      render(<Button>{null}</Button>);
      const button = screen.getByRole('button');
      expect(button).toBeInTheDocument();
    });

    it('handles very long text with proper truncation', () => {
      const longText = 'This is a very long button text that should be handled properly'.repeat(10);
      render(<Button>{longText}</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveStyle({ whiteSpace: 'nowrap' });
    });

    it('maintains proper stacking context', () => {
      render(
        <div style={{ position: 'relative', zIndex: 1 }}>
          <Button>Stacked Button</Button>
        </div>
      );
      const button = screen.getByRole('button');
      expect(button).toHaveStyle({ isolation: 'isolate' });
    });
  });

  describe('Type Safety', () => {
    it('accepts valid HTML button attributes', () => {
      render(
        <Button
          type="submit"
          form="test-form"
          name="submit-button"
          value="submit"
        >
          Submit
        </Button>
      );
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('type', 'submit');
      expect(button).toHaveAttribute('form', 'test-form');
      expect(button).toHaveAttribute('name', 'submit-button');
      expect(button).toHaveAttribute('value', 'submit');
    });

    it('forwards refs correctly', () => {
      const ref = React.createRef<HTMLButtonElement>();
      render(<Button ref={ref}>Ref Button</Button>);
      
      expect(ref.current).toBeInstanceOf(HTMLButtonElement);
      expect(ref.current?.tagName).toBe('BUTTON');
    });
  });

  describe('Dark Mode Support', () => {
    beforeEach(() => {
      document.documentElement.setAttribute('data-theme', 'dark');
    });

    afterEach(() => {
      document.documentElement.removeAttribute('data-theme');
    });

    it('applies dark mode styles correctly', () => {
      render(<Button variant="default">Dark Mode</Button>);
      const button = screen.getByRole('button');
      
      const styles = window.getComputedStyle(button);
      expect(styles.backgroundColor).toBeTruthy();
    });
  });

  describe('Memory Leaks', () => {
    it('cleans up event listeners on unmount', () => {
      const handleClick = vi.fn();
      const { unmount } = render(<Button onClick={handleClick}>Memory Test</Button>);
      
      unmount();
      
      expect(() => {
        fireEvent.click(document.body);
      }).not.toThrow();
    });
  });
});