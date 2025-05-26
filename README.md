# UI Components Library 🎨

A modern, performant, and accessible React component library showcased with Storybook.

> **🚀 [LIVE DEMO](https://my-components-library-app.vercel.app/)** 

[![Deploy Status](https://img.shields.io/github/deployments/nidal1111/my-components-library-app/production?label=vercel&logo=vercel)](https://my-components-library-app.vercel.app/)

🚧 **Current Status:** Early development with 3 core components

## 🚀 Features

- ✨ **Modern Components**: A collection of refined, production-ready UI components
- 🏃‍♂️ **Performance First**: Optimized for minimal bundle size and fast loading
- 🎨 **Fully Customizable**: Advanced theming system with Sass variables
- ♿ **Accessible**: WCAG 2.1 compliant with full keyboard and screen reader support
- 📱 **Responsive**: Components that work perfectly on all devices
- 🔧 **Developer Friendly**: TypeScript, Storybook, and comprehensive documentation
- 📋 **Copy & Paste**: Integrated system for copying component code

## 🛠️ Tech Stack

- **Documentation**: Storybook 8
- **UI**: React 19
- **Styling**: SCSS Modules + Tailwind CSS
- **Type Safety**: TypeScript 5.6+
- **Components**: Radix UI Primitives
- **Animations**: Framer Motion
- **Testing**: Vitest + Testing Library
- **Code Quality**: ESLint + Prettier

## 📦 Installation

```bash
git clone https://github.com/nidal1111/my-components-library-app.git
cd ui-components-library
npm install
```

## 🚀 Quick Start

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to explore components in Storybook.

### Build for Production

```bash
npm run build
```

This creates a static Storybook build in the `storybook-static` directory.

### Preview Production Build

```bash
npm run start
```

Serves the production build locally on port 3000.

## 📚 Available Components

### Primitives
- ✅ **Button** - Buttons with multiple variants and states
- ✅ **Input** - Input fields with validation and addons
- 🚧  **Select** - Accessible select dropdown
- 🚧  **Checkbox** - Single checkboxes and groups
- 🚧  **Radio** - Radio button groups

### Layout (In Development)
- 🚧 Container
- 🚧 Grid
- 🚧 Stack
- ✅ **Card** - Content container with variants

### Navigation (In Development)
- 🚧 Tabs
- 🚧 Breadcrumb
- 🚧 Pagination

### Feedback (In Development)
- 🚧 Toast
- 🚧 Alert
- 🚧 Modal
- 🚧 Loading

### Data Display (In Development)
- 🚧 Table
- 🚧 Badge
- 🚧 Avatar
- 🚧 Tooltip

## 🎨 Design System

The project uses a design token system based on Sass variables to ensure consistency and ease of customization:

```scss
$color-primary-600: #2563eb;
$color-neutral-100: #f5f5f5;
$spacing-2: 0.5rem;
$radius-md: 0.5rem;
```

## 🧪 Testing

```bash
# Run tests
npm test

# Run tests with coverage
npm run test:coverage

# Run tests in UI mode
npm run test:ui
```

## 📝 Available Scripts

- `npm run dev` - Start Storybook development server on port 3000
- `npm run build` - Build static Storybook for production
- `npm run start` - Serve production build on port 3000
- `npm run preview` - Build and serve in one command
- `npm run storybook` - Start Storybook on port 6006 (alternative)
- `npm run type-check` - Check TypeScript types
- `npm run format` - Format code with Prettier
- `npm run lint` - Lint with ESLint
- `npm test` - Run tests
- `npm run test:coverage` - Run tests with coverage
- `npm run test:ui` - Run tests in UI mode

## 🤝 Contributing

Contributions are welcome! Please:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 🙏 Acknowledgments

- [Radix UI](https://www.radix-ui.com/) for accessible primitive components
- [Next.js](https://nextjs.org/) for the React framework
- [Storybook](https://storybook.js.org/) for component documentation

## 🚀 Deployment

This project is optimized for deployment as a static Storybook site:

### Vercel
The project includes a `vercel.json` configuration. Simply connect your repository to Vercel.

### Netlify 🚧 
The project includes a `netlify.toml` configuration. Connect your repository to Netlify.

### Other Platforms
Run `npm run build` to generate the `storybook-static` directory, deployable to any static hosting.

