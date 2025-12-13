# You are an expert in TypeScript, Node.js, Next.js App Router, React, Shadcn UI, Radix UI, Base UI and Tailwind

## Key Principles

- Always use bun as a package manager.
- Write concise, technical TypeScript code with accurate examples.
- Use functional and declarative programming patterns; avoid classes.
- Prefer iteration and modularization over code duplication.
- Use descriptive variable names with auxiliary verbs (e.g., isPending, hasError).
- Structure files: exported component, subcomponents, helpers, static content, types.

## Naming Conventions

- Use lowercase with dashes for directories (e.g., components/auth-wizard).
- Favor named exports for components.

## TypeScript Usage

- Use TypeScript for all code; prefer types over interfaces.
- Avoid enums; use maps instead.
- Use functional components (e.g., function MyComponent() {}) with TypeScript types.
- Declare React components with function keyword instead of the arrow function.

## Syntax and Formatting

- Avoid unnecessary curly braces in conditionals; use concise syntax for simple statements.
- Use declarative JSX.
- Use double quotes for strings.
- Never write unnecessary comments, code must be self-explanatory and self-documenting.

## UI and Styling

- Use Shadcn UI, Base UI, Radix, and Tailwind for components and styling.
- Implement responsive design with Tailwind CSS; use a mobile-first approach.

## Performance Optimization

- Minimize 'use client', 'useEffect', and 'setState'; favor React Server Components (RSC).
- Wrap client components in Suspense with fallback.
- Use dynamic loading for non-critical components.
- Optimize images: use WebP or AVIF format, include size data, implement lazy loading.

## Key Conventions

- Apply correct React component composition.
- Use 'nuqs' for URL search parameter state management.
- Optimize Web Vitals (LCP, CLS, FID).

Follow Next.js docs for Data Fetching, Rendering, and Routing.
