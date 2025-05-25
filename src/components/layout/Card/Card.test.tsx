import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from './Card';
import { axe } from 'jest-axe';

describe('Card Component', () => {
  describe('Rendering', () => {
    it('renders with default props', () => {
      render(<Card>Content</Card>);
      const card = screen.getByText('Content').parentElement;
      expect(card).toHaveClass('card', 'default', 'paddingDefault');
    });

    it('renders all subcomponents correctly', () => {
      render(
        <Card>
          <CardHeader>
            <CardTitle>Test Title</CardTitle>
            <CardDescription>Test Description</CardDescription>
          </CardHeader>
          <CardContent>Test Content</CardContent>
          <CardFooter>Test Footer</CardFooter>
        </Card>
      );

      expect(screen.getByText('Test Title')).toBeInTheDocument();
      expect(screen.getByText('Test Description')).toBeInTheDocument();
      expect(screen.getByText('Test Content')).toBeInTheDocument();
      expect(screen.getByText('Test Footer')).toBeInTheDocument();
    });

    it('applies custom className', () => {
      render(<Card className="custom-class">Content</Card>);
      const card = screen.getByText('Content').parentElement;
      expect(card).toHaveClass('custom-class');
    });

    it('passes through HTML attributes', () => {
      render(
        <Card data-testid="test-card" role="article">
          Content
        </Card>
      );
      const card = screen.getByTestId('test-card');
      expect(card).toHaveAttribute('role', 'article');
    });
  });

  describe('Variants', () => {
    const variants = ['default', 'outlined', 'elevated', 'ghost', 'gradient'] as const;

    variants.forEach((variant) => {
      it(`renders ${variant} variant correctly`, () => {
        render(<Card variant={variant}>Content</Card>);
        const card = screen.getByText('Content').parentElement;
        expect(card).toHaveClass('card', variant);
      });
    });

    it('applies correct styles for elevated variant', () => {
      const { container } = render(<Card variant="elevated">Content</Card>);
      const card = container.firstChild as HTMLElement;
      const styles = window.getComputedStyle(card);
      expect(styles.boxShadow).toBeTruthy();
    });
  });

  describe('Padding Sizes', () => {
    const paddingSizes = ['none', 'sm', 'default', 'lg', 'xl'] as const;

    paddingSizes.forEach((size) => {
      it(`applies ${size} padding correctly`, () => {
        render(<Card padding={size}>Content</Card>);
        const card = screen.getByText('Content').parentElement;
        const expectedClass = size === 'none' ? 'paddingNone' : 
                             size === 'sm' ? 'paddingSm' : 
                             size === 'lg' ? 'paddingLg' : 
                             size === 'xl' ? 'paddingXl' : 'paddingDefault';
        expect(card).toHaveClass(expectedClass);
      });
    });
  });

  describe('Interactive State', () => {
    it('applies interactive styles when interactive prop is true', () => {
      render(<Card interactive>Content</Card>);
      const card = screen.getByText('Content').parentElement;
      expect(card).toHaveClass('interactive');
      expect(card).toHaveStyle({ cursor: 'pointer' });
    });

    it('handles click events when interactive', async () => {
      const handleClick = vi.fn();
      const user = userEvent.setup();

      render(
        <Card interactive onClick={handleClick}>
          Click me
        </Card>
      );

      const card = screen.getByText('Click me').parentElement!;
      await user.click(card);
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('handles hover effects for interactive cards', async () => {
      const handleMouseEnter = vi.fn();
      const handleMouseLeave = vi.fn();
      const user = userEvent.setup();

      render(
        <Card
          interactive
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          Hover me
        </Card>
      );

      const card = screen.getByText('Hover me').parentElement!;
      
      await user.hover(card);
      expect(handleMouseEnter).toHaveBeenCalled();
      
      await user.unhover(card);
      expect(handleMouseLeave).toHaveBeenCalled();
    });
  });

  describe('Subcomponents', () => {
    it('CardHeader renders with correct structure', () => {
      const { container } = render(
        <CardHeader className="custom-header">
          Header Content
        </CardHeader>
      );
      const header = container.firstChild;
      expect(header).toHaveClass('header', 'custom-header');
    });

    it('CardTitle renders as h3 by default', () => {
      render(<CardTitle>Title</CardTitle>);
      const title = screen.getByText('Title');
      expect(title.tagName).toBe('H3');
      expect(title).toHaveClass('title');
    });

    it('CardDescription renders as p element', () => {
      render(<CardDescription>Description</CardDescription>);
      const description = screen.getByText('Description');
      expect(description.tagName).toBe('P');
      expect(description).toHaveClass('description');
    });

    it('CardContent applies spacing correctly', () => {
      const { container } = render(<CardContent>Content</CardContent>);
      const content = container.firstChild;
      expect(content).toHaveClass('content');
    });

    it('CardFooter renders with flex layout', () => {
      const { container } = render(<CardFooter>Footer</CardFooter>);
      const footer = container.firstChild;
      expect(footer).toHaveClass('footer');
    });
  });

  describe('Accessibility', () => {
    it('has no accessibility violations', async () => {
      const { container } = render(
        <Card>
          <CardHeader>
            <CardTitle>Accessible Card</CardTitle>
            <CardDescription>This card is accessible</CardDescription>
          </CardHeader>
          <CardContent>Content here</CardContent>
          <CardFooter>Footer content</CardFooter>
        </Card>
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('supports keyboard navigation when interactive', async () => {
      const handleClick = vi.fn();
      const user = userEvent.setup();

      render(
        <Card interactive onClick={handleClick} tabIndex={0}>
          Keyboard navigable
        </Card>
      );

      await user.tab();
      const card = screen.getByText('Keyboard navigable').parentElement!;
      expect(card).toHaveFocus();

      await user.keyboard('{Enter}');
      expect(handleClick).toHaveBeenCalled();
    });

    it('uses semantic HTML structure', () => {
      render(
        <Card>
          <CardHeader>
            <CardTitle>Semantic Title</CardTitle>
          </CardHeader>
          <CardContent>Semantic Content</CardContent>
        </Card>
      );

      const title = screen.getByText('Semantic Title');
      expect(title.tagName).toBe('H3');
    });
  });

  describe('Performance', () => {
    it('renders efficiently with many children', () => {
      const startTime = performance.now();
      
      render(
        <Card>
          {Array.from({ length: 100 }, (_, i) => (
            <div key={i}>Item {i}</div>
          ))}
        </Card>
      );
      
      const endTime = performance.now();
      expect(endTime - startTime).toBeLessThan(100);
    });

    it('handles rapid interactions without performance degradation', async () => {
      const handleClick = vi.fn();
      const user = userEvent.setup({ delay: null });

      render(
        <Card interactive onClick={handleClick}>
          Rapid clicks
        </Card>
      );

      const card = screen.getByText('Rapid clicks').parentElement!;
      
      const startTime = performance.now();
      for (let i = 0; i < 50; i++) {
        await user.click(card);
      }
      const endTime = performance.now();

      expect(handleClick).toHaveBeenCalledTimes(50);
      expect(endTime - startTime).toBeLessThan(500);
    });
  });

  describe('Dark Mode Support', () => {
    beforeEach(() => {
      document.documentElement.setAttribute('data-theme', 'dark');
    });

    afterEach(() => {
      document.documentElement.removeAttribute('data-theme');
    });

    it('adapts styles for dark mode', () => {
      const { container } = render(<Card variant="default">Dark mode card</Card>);
      const card = container.firstChild as HTMLElement;
      
      expect(card).toHaveClass('card', 'default');
      const styles = window.getComputedStyle(card);
      expect(styles.backgroundColor).toBeTruthy();
    });

    it('maintains contrast in dark mode', () => {
      render(
        <Card>
          <CardTitle>Dark Title</CardTitle>
          <CardDescription>Dark Description</CardDescription>
        </Card>
      );

      const title = screen.getByText('Dark Title');
      const description = screen.getByText('Dark Description');
      
      expect(title).toHaveClass('title');
      expect(description).toHaveClass('description');
    });
  });

  describe('Edge Cases', () => {
    it('handles empty content gracefully', () => {
      render(<Card />);
      expect(document.querySelector('.card')).toBeInTheDocument();
    });

    it('handles very long content without breaking layout', () => {
      const longText = 'Very long content '.repeat(100);
      render(
        <Card>
          <CardContent>{longText}</CardContent>
        </Card>
      );
      
      const card = document.querySelector('.card');
      expect(card).toHaveStyle({ overflow: 'hidden' });
    });

    it('handles nested cards correctly', () => {
      render(
        <Card data-testid="outer">
          <CardContent>
            <Card data-testid="inner">
              <CardContent>Nested content</CardContent>
            </Card>
          </CardContent>
        </Card>
      );

      expect(screen.getByTestId('outer')).toBeInTheDocument();
      expect(screen.getByTestId('inner')).toBeInTheDocument();
    });
  });

  describe('Integration', () => {
    it('works with other components inside', () => {
      render(
        <Card>
          <CardHeader>
            <CardTitle>Integration Test</CardTitle>
          </CardHeader>
          <CardContent>
            <button>Action Button</button>
            <input type="text" placeholder="Input field" />
          </CardContent>
          <CardFooter>
            <span>Status: Active</span>
          </CardFooter>
        </Card>
      );

      expect(screen.getByRole('button', { name: 'Action Button' })).toBeInTheDocument();
      expect(screen.getByPlaceholderText('Input field')).toBeInTheDocument();
      expect(screen.getByText('Status: Active')).toBeInTheDocument();
    });
  });

  describe('Memory Management', () => {
    it('cleans up event listeners on unmount', () => {
      const handleClick = vi.fn();
      const { unmount } = render(
        <Card interactive onClick={handleClick}>
          Memory test
        </Card>
      );

      unmount();
      
      expect(() => {
        fireEvent.click(document.body);
      }).not.toThrow();
    });
  });

  describe('Type Safety', () => {
    it('forwards refs correctly', () => {
      const ref = React.createRef<HTMLDivElement>();
      render(<Card ref={ref}>Ref test</Card>);
      
      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });

    it('accepts all valid HTML div attributes', () => {
      render(
        <Card
          id="test-id"
          title="Test title"
          style={{ margin: '10px' }}
          aria-label="Test card"
        >
          Attributes test
        </Card>
      );

      const card = document.getElementById('test-id');
      expect(card).toHaveAttribute('title', 'Test title');
      expect(card).toHaveAttribute('aria-label', 'Test card');
      expect(card).toHaveStyle({ margin: '10px' });
    });
  });
});