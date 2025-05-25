#!/bin/bash

echo "Building UI Components Library..."

# Install dependencies if not present
if [ ! -d "node_modules" ]; then
  echo "Installing dependencies..."
  npm install
fi

# Build Storybook
echo "Building Storybook..."
npm run build

echo "Build complete! The static files are in the 'storybook-static' directory."
echo "To preview locally, run: npm run start"