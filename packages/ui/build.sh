#!/bin/bash

# Build script for @tech-portfolio/ui package

set -e

echo "Building @tech-portfolio/ui..."

# Clean previous build
echo "Cleaning previous build..."
rm -rf dist

# Type check
echo "Type checking..."
npm run type-check

# Build
echo "Building..."
npm run build

# Verify build output
if [ ! -d "dist" ]; then
  echo "Error: Build failed - dist directory not found"
  exit 1
fi

echo "Build completed successfully!"
echo "Output: dist/"
