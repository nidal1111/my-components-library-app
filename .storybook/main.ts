import type { StorybookConfig } from "@storybook/nextjs";
import path from "path";

const config: StorybookConfig = {
  stories: ["../src/**/*.stories.@(js|jsx|ts|tsx|mdx)"],
  addons: [
    "@storybook/addon-essentials",
    "@storybook/addon-links",
    "@storybook/addon-themes",
    "@storybook/addon-a11y",
  ],
  framework: {
    name: "@storybook/nextjs",
    options: {},
  },
  staticDirs: ["../public"],
  webpackFinal: async (config) => {
    if (config.resolve) {
      config.resolve.alias = {
        ...config.resolve.alias,
        "@": path.resolve(__dirname, "../src"),
      };
    }

    const scssRule = config.module?.rules?.find((rule) => {
      if (typeof rule !== 'object' || !rule) return false;
      if (rule.test instanceof RegExp) {
        return rule.test.test('.scss');
      }
      return false;
    });

    if (scssRule && typeof scssRule === 'object' && 'use' in scssRule && Array.isArray(scssRule.use)) {
      scssRule.use = scssRule.use.map((loader: any) => {
        if (typeof loader === 'object' && loader?.loader?.includes('css-loader')) {
          return {
            ...loader,
            options: {
              ...loader.options,
              modules: {
                auto: true,
                localIdentName: "[name]__[local]--[hash:base64:5]",
              },
            },
          };
        }
        return loader;
      });
    }
    
    return config;
  },
};

export default config;