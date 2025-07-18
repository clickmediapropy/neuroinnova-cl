# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Build and Development
```bash
npm run dev      # Start development server with hot reload (Vite)
npm run build    # Production build
npm run preview  # Preview production build locally
npm run lint     # Run ESLint
```

### Installation
```bash
npm install      # Install dependencies
```

## Architecture Overview

This is a React + TypeScript medical website for NeuroInnova, built with Vite and using Shadcn/ui components.

### Key Architectural Patterns

1. **Component Structure**:
   - `src/components/ui/` - Shadcn/ui base components
   - `src/components/layout/` - Layout components (Header, Footer, Layout wrapper)
   - `src/components/sections/` - Homepage section components
   - `src/components/forms/` - Form components with React Hook Form + Zod validation
   - `src/pages/` - Route page components

2. **Routing Pattern**:
   - React Router DOM with route definitions in `App.tsx`
   - Service pages: `/servicios/[service-name]`
   - Condition pages: `/condiciones/[condition-name]`
   - Assessment pages: `/autoevaluacion/[assessment-type]`
   - Two header variants: `HomeHeader` for homepage, `Header` for other pages

3. **Form Architecture**:
   - Contact forms use React Hook Form with Zod schemas
   - Forms have variants (default, inline, compact)
   - Designed for webhook integration with hidden tracking fields
   - Phone formatting for multiple countries (CL, AR, US, ES, MX)

4. **Assessment System**:
   - 11 different assessment types based on standard questionnaires (PHQ-9, GAD-7, etc.)
   - Progress tracking and score calculation
   - Results component with severity levels and recommendations

5. **State Management**:
   - Local state with React hooks
   - React Query (TanStack Query) for data fetching
   - Custom toast system for notifications

6. **Styling Approach**:
   - Tailwind CSS with custom configuration
   - CSS variables for theme colors (HSL format)
   - Mobile-first responsive design
   - Custom background patterns and animations

### Important Implementation Details

- **TypeScript**: Strict typing throughout the codebase
- **Component Variants**: Many components support multiple visual variants via props
- **SEO**: Each page should have appropriate meta tags and titles
- **Accessibility**: Using semantic HTML and ARIA labels where appropriate
- **Performance**: Route-based code splitting with React Router

### Common Development Tasks

When adding new pages:
1. Create page component in `src/pages/`
2. Add route in `App.tsx`
3. Use `Layout` wrapper for consistent header/footer
4. Follow existing page patterns for services/conditions

When modifying forms:
1. Update Zod schema for validation
2. Maintain webhook field structure
3. Test all form variants
4. Ensure proper error handling and toast notifications