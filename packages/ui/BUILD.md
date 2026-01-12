# Building @tech-portfolio/ui

This package can be built independently and published as an npm package.

## Prerequisites

```bash
npm install
```

## Build

```bash
npm run build
```

Or use the build script:

```bash
chmod +x build.sh
./build.sh
```

## Development

Watch mode:

```bash
npm run dev
```

## Type Check

```bash
npm run type-check
```

## Output Structure

After building, the `dist/` directory will contain:

```
dist/
 ├─ index.js          # CJS entry
 ├─ index.esm.js      # ESM entry
 ├─ index.d.ts        # TypeScript declarations
 ├─ primitives/
 │   ├─ index.js
 │   ├─ index.esm.js
 │   └─ index.d.ts
 ├─ blocks/
 │   ├─ index.js
 │   ├─ index.esm.js
 │   └─ index.d.ts
 └─ domain/
     ├─ index.js
     ├─ index.esm.js
     └─ index.d.ts
```

## Publishing

1. Update version in `package.json`
2. Build the package: `npm run build`
3. Publish to npm: `npm publish`

## No Router Dependency

This package does **not** include `react-router` as a dependency. All components are router-agnostic and can be used with any routing solution or without routing.

## Peer Dependencies

The following packages must be installed in the consuming project:

- `react` (^18.0.0)
- `react-dom` (^18.0.0)
- `@mui/material` (^5.0.0)
- `@mui/icons-material` (^5.0.0)
