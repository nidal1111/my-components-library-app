import React from 'react';
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';
import { Button } from '@/components/ui/Button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/layout/Card';
import { Input } from '@/components/ui/Input';

describe('Accessibility Tests', () => {
  describe('Color Contrast - Light Mode', () => {
    it('Button variants have sufficient contrast', async () => {
      const { container } = render(
        <div>
          <Button variant="default">Default</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="destructive">Destructive</Button>
          <Button disabled>Disabled</Button>
        </div>
      );
      
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('Input states have sufficient contrast', async () => {
      const { container } = render(
        <div>
          <Input label="Normal" placeholder="Enter text" />
          <Input label="Error" error helperText="Error message" />
          <Input label="Success" success helperText="Success message" />
          <Input label="Disabled" disabled value="Disabled input" />
        </div>
      );
      
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('Card variants have sufficient contrast', async () => {
      const { container } = render(
        <div>
          <Card variant="default">
            <CardHeader>
              <CardTitle>Default Card</CardTitle>
            </CardHeader>
            <CardContent>Content with sufficient contrast</CardContent>
          </Card>
          <Card variant="outlined">
            <CardContent>Outlined card content</CardContent>
          </Card>
        </div>
      );
      
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  describe('Color Contrast - Dark Mode', () => {
    beforeEach(() => {
      document.documentElement.setAttribute('data-theme', 'dark');
    });

    afterEach(() => {
      document.documentElement.removeAttribute('data-theme');
    });

    it('Button variants have sufficient contrast in dark mode', async () => {
      const { container } = render(
        <div>
          <Button variant="default">Default</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="destructive">Destructive</Button>
          <Button disabled>Disabled</Button>
        </div>
      );
      
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('Input states have sufficient contrast in dark mode', async () => {
      const { container } = render(
        <div>
          <Input label="Normal" placeholder="Enter text" />
          <Input label="Error" error helperText="Error message" />
          <Input label="Success" success helperText="Success message" />
          <Input label="Disabled" disabled value="Disabled input" />
        </div>
      );
      
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  describe('Loading State Accessibility', () => {
    it('Button loading state is accessible', async () => {
      const { container, getByRole } = render(
        <Button loading>Save</Button>
      );
      
      const button = getByRole('button');
      expect(button).toHaveAttribute('aria-busy', 'true');
      expect(button).toHaveAttribute('aria-label', 'Save - Loading');
      
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('Button with custom aria-label preserves it during loading', async () => {
      const { getByRole } = render(
        <Button loading aria-label="Submit form">Submit</Button>
      );
      
      const button = getByRole('button');
      expect(button).toHaveAttribute('aria-label', 'Submit form - Loading');
    });

    it('Icon button loading state is accessible', async () => {
      const { container, getByRole } = render(
        <Button loading size="icon" aria-label="Refresh">
          <svg />
        </Button>
      );
      
      const button = getByRole('button');
      expect(button).toHaveAttribute('aria-busy', 'true');
      expect(button).toHaveAttribute('aria-label', 'Refresh - Loading');
      
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  describe('Form Accessibility', () => {
    it('Input with label association is accessible', async () => {
      const { container } = render(
        <Input 
          label="Email Address" 
          type="email" 
          required 
          helperText="We'll never share your email"
        />
      );
      
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('Required fields are properly marked', async () => {
      const { getByLabelText } = render(
        <Input label="Username" required />
      );
      
      const input = getByLabelText(/Username/);
      expect(input).toHaveAttribute('required');
      expect(input).toHaveAttribute('aria-required', 'true');
    });
  });

  describe('Interactive Elements', () => {
    it('Interactive card maintains accessibility', async () => {
      const { container } = render(
        <Card interactive tabIndex={0} role="button" aria-label="Click to expand">
          <CardContent>Interactive content</CardContent>
        </Card>
      );
      
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('Disabled states are properly announced', async () => {
      const { container } = render(
        <div>
          <Button disabled>Disabled Button</Button>
          <Input disabled value="Disabled Input" label="Field" />
        </div>
      );
      
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
});