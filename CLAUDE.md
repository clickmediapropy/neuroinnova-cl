# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

### Development
```bash
npm run dev          # Start development server with hot reload (port 8080)
npm run build        # Create production build
npm run build:dev    # Create development build
npm run preview      # Preview production build locally
npm run lint         # Run ESLint on all files
```

### Auto-sync
```bash
npm run auto-sync    # Run the auto-sync script (./auto-sync.sh)
```

**Note**: There are no test commands configured. Consider adding tests if implementing new features.

## Architecture Overview

This is a React + TypeScript medical website (NeuroInnova) built with Vite and deployed on Vercel. The project uses:

- **UI Framework**: shadcn/ui components built on Radix UI primitives
- **Styling**: Tailwind CSS with custom theme extensions
- **State**: React Query for server state, local state with hooks
- **Forms**: React Hook Form + Zod validation
- **Routing**: React Router DOM with lazy loading

### Key Directories

```
src/
├── components/      # Reusable UI components
│   ├── ui/         # shadcn/ui base components
│   └── forms/      # Form components with validation
├── pages/          # Route pages (lazy loaded)
│   ├── admin/      # Admin panel with AI-powered change management
│   └── servicios/  # Service-specific evaluation pages
├── services/       # Business logic and external integrations
│   ├── aiProcessor.ts      # Moonshot AI integration for code changes
│   └── githubService.ts    # GitHub API for file manipulation
├── hooks/          # Custom React hooks
└── lib/            # Utilities (cn() for className merging)
```

### Path Aliases
- `@/*` resolves to `./src/*` (configured in tsconfig.json and vite.config.ts)

## Admin Panel

The admin panel (`/admin`) provides two interfaces:
1. **Traditional form-based**: For structured change requests
2. **Chat-based**: Natural language interface with AI processing

Authentication uses `VITE_ADMIN_PASSWORD` environment variable (fallback: 'neuroinnova2024').

### AI Integration
- Uses Moonshot AI API for processing natural language requests
- Automatically generates and validates code changes
- Commits directly to GitHub repository
- Includes diagnostic capabilities for troubleshooting

## Form Validation Pattern

```typescript
// 1. Define Zod schema
const schema = z.object({
  field: z.string().min(2, "Error message")
});

// 2. Setup form with resolver
const form = useForm({
  resolver: zodResolver(schema)
});
```

## Important Services

- **aiProcessor.ts**: Handles AI-powered code generation and validation
- **githubService.ts**: Direct GitHub file manipulation via API
- **siteMapService.ts**: Maintains site structure for AI context

## Development Tips

1. Use `cn()` utility for merging Tailwind classes (from `@/lib/utils`)
2. Follow existing form patterns with React Hook Form + Zod validation
3. Use shadcn/ui components from `@/components/ui`
4. All routes use lazy loading for performance - follow the pattern in App.tsx
5. Add proper TypeScript types for all components
6. Dev server runs on port 8080 (configured in vite.config.ts)

## Deployment

The project auto-deploys to Vercel on push to main branch. The `vercel.json` configures SPA routing.

## Security Notes

- API keys for Moonshot AI and GitHub are currently hardcoded in service files
- Consider moving these to environment variables for production
- Admin password should be changed from default