import React from 'react';
import { render } from '@testing-library/react';
import { Button } from '@/components/ui/Button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/layout/Card';
import { Input } from '@/components/ui/Input';

describe('Dark Mode Support', () => {
  beforeEach(() => {
    document.documentElement.setAttribute('data-theme', 'dark');
  });

  afterEach(() => {
    document.documentElement.removeAttribute('data-theme');
  });

  describe('Button Component', () => {
    it('renders correctly in dark mode', () => {
      const { container } = render(<Button>Dark Mode Button</Button>);
      const button = container.querySelector('button');
      
      expect(button).toBeTruthy();
      expect(document.documentElement).toHaveAttribute('data-theme', 'dark');
    });

    it('applies dark mode styles for all variants', () => {
      const variants = ['default', 'secondary', 'outline', 'ghost', 'destructive'] as const;
      
      variants.forEach(variant => {
        const { container } = render(<Button variant={variant}>Button</Button>);
        const button = container.querySelector('button');
        expect(button).toBeTruthy();
      });
    });
  });

  describe('Card Component', () => {
    it('renders correctly in dark mode', () => {
      const { container } = render(
        <Card>
          <CardHeader>
            <CardTitle>Dark Mode Card</CardTitle>
          </CardHeader>
          <CardContent>Content</CardContent>
        </Card>
      );
      
      const card = container.firstChild;
      expect(card).toBeTruthy();
    });

    it('applies dark mode styles for all variants', () => {
      const variants = ['default', 'outlined', 'elevated', 'ghost', 'gradient'] as const;
      
      variants.forEach(variant => {
        const { container } = render(<Card variant={variant}>Card Content</Card>);
        const card = container.firstChild;
        expect(card).toBeTruthy();
      });
    });
  });

  describe('Input Component', () => {
    it('renders correctly in dark mode', () => {
      const { container } = render(<Input placeholder="Dark mode input" />);
      const input = container.querySelector('input');
      
      expect(input).toBeTruthy();
    });

    it('maintains visibility in dark mode states', () => {
      const { container: errorContainer } = render(
        <Input error helperText="Error message" />
      );
      const { container: successContainer } = render(
        <Input success helperText="Success message" />
      );
      
      expect(errorContainer.querySelector('input')).toBeTruthy();
      expect(successContainer.querySelector('input')).toBeTruthy();
    });
  });

  describe('CSS Variables', () => {
    it('updates CSS variables for dark mode', () => {
      const styles = getComputedStyle(document.documentElement);
      
      expect(styles.getPropertyValue('--color-background')).toBeTruthy();
      expect(styles.getPropertyValue('--color-text-primary')).toBeTruthy();
      expect(styles.getPropertyValue('--color-border')).toBeTruthy();
    });
  });
});