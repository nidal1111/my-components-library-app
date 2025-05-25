import React, { useEffect, useState } from "react";
import type { Preview, Decorator } from "@storybook/react";
import "../src/styles/globals.scss";

const ThemeDecorator: Decorator = (Story, context) => {
  const [mounted, setMounted] = useState(false);
  const theme = context.globals.theme || 'light';
  const isWelcomePage = context.title === 'Welcome';

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      document.documentElement.setAttribute('data-theme', theme);
    }
  }, [theme, mounted]);

  return (
    <div style={{ 
      padding: isWelcomePage ? "0" : "2rem",
      backgroundColor: mounted ? "var(--color-background)" : "#ffffff",
      color: mounted ? "var(--color-text-primary)" : "#000000",
      transition: "all 0.3s ease"
    }}>
      {mounted && <Story />}
    </div>
  );
};

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    backgrounds: {
      disable: true,
    },
    layout: "centered",
    a11y: {
      config: {
        rules: [
          {
            id: 'color-contrast',
            enabled: true,
          },
        ],
      },
    },
    docs: {
      source: {
        type: 'dynamic',
        excludeDecorators: true,
      },
      canvas: {
        sourceState: 'hidden',
      },
    },
    options: {
      storySort: {
        order: ['Welcome', 'UI', 'Layout', 'Feedback', '*'],
      },
    },
  },
  globalTypes: {
    theme: {
      name: 'Theme',
      description: 'Global theme for components',
      defaultValue: 'light',
      toolbar: {
        icon: 'circlehollow',
        items: [
          { value: 'light', title: 'Light', icon: 'sun' },
          { value: 'dark', title: 'Dark', icon: 'moon' }
        ],
        showName: true,
        dynamicTitle: true,
      },
    },
  },
  decorators: [ThemeDecorator],
};

export default preview;