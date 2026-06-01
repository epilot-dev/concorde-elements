# AGENTS.md

## Project Overview

Component library providing reusable UI components for Journeys. This is a published package that includes Storybook for component documentation and visual testing.

## Project Structure

- **Components**: `src/components/` - Components definition
- **Stories**: `src/stories/` - Storybook stories for components
- **Utils**: `src/utils/` - Shared utilities

## Tech Stack

- **Framework**: React 18+ with TypeScript as peer dependency
- **Build and tests**: Vite, Vitest and Storybook with a11y addon for accessibility tests
- **Styling**: SCSS modules with typescript definitions
- **Component primitives**: Radix UI for accessible primitives
- **Animation**: Motion (Framer Motion) for animations
- **Form management**: React Hook Form support

## Commands

```bash
pnpm install           # Install dependencies
pnpm check             # Run lint, tests and storybook build to verify changes
pnpm storybook         # Run storybook (http://localhost:6006)
pnpm build:package     # Production build
pnpm build:storybook   # Builds storybook
pnpm lint              # Check formatting with ESLint and Prettier
pnpm lint:fix          # Automatically resolve lint errors
pnpm test              # Run unit tests
pnpm changelog         # Generate changelog
pnpm release           # Release new package version
```

## Code Style Guidelines

- Use TypeScript strict mode
- Use modern and idiomatic syntax
- Component interfaces need to be accessible and meet [WCAG standards](https://www.w3.org/WAI/standards-guidelines/wcag/)
- Prefer Radix UI primitives as a base for new components
- Use `import type { ... }` for type-only imports
- Use specific imports to improve tree shaking

### Development Workflow

1. **Start Storybook**: `pnpm storybook` to develop components interactively
2. **Write components**: In `src/components/ComponentName/`
3. **Declare types**: Declare component types in co-colated `types.ts` file
4. **Style**: Style components in co-colated SCSS modules, generate TypeScript definitions
5. **Document**: Create stories in `src/stories/` or co-located
6. **Test**: Write Vitest tests for component logic and accessibility requirements
7. **Build**: Test package build with `pnpm build:package`

## Publishing Workflow

1. **Make changes**: Update components, add tests, update stories, commit
2. **Verify changes**: `pnpm check` to verify changes
3. **Publish**: Ask for confirmation, then `pnpm release` (publishes to npm)

## Important Notes

- **Published**: This package is published to npm (MIT license)
- **Versioning**: Uses semantic versioning (patch version auto-bumped on publish)
- **Changelog**: Are auto-generated from commits
- **Storybook**: Primary development and documentation tool

## Other

- See root `AGENTS.md` for monorepo-wide context