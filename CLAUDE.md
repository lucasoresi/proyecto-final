# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

```bash
# Install dependencies
npm i

# Start development server (port 8080)
npm run dev

# Build for production
npm run build

# Build for development mode
npm run build:dev

# Run linter
npm run lint

# Preview production build
npm run preview
```

## Project Architecture

This is a React + TypeScript + Vite project for a psychology practice website in Bahía Blanca, Argentina.

### Tech Stack
- **Frontend**: React 18.3.1 with TypeScript
- **Build Tool**: Vite with SWC plugin
- **Routing**: React Router DOM v6
- **UI Framework**: shadcn/ui components (based on Radix UI primitives)
- **Styling**: Tailwind CSS with custom design tokens
- **State**: TanStack Query for server state, React Hook Form for forms
- **Validation**: Zod schemas

### Key Architecture Patterns
- **Single Page Application**: Main content in `src/pages/Index.tsx`
- **Component-based**: Modular components in `src/components/`
- **Atomic Design**: UI primitives in `src/components/ui/`
- **Absolute Imports**: Use `@/` alias for src directory imports
- **TypeScript**: Configured with relaxed rules (noImplicitAny: false)

### Component Structure
The main page (`src/pages/Index.tsx`) renders components in this order:
1. `Header` - Navigation with smooth scroll to sections
2. `Hero` - Main banner with CTA
3. `Services` - Psychology services grid
4. `About` - Team information
5. `Testimonials` - Animated marquee with client feedback
6. `Contact` - Contact form with date picker for appointments
7. `Footer` - Contact info and links

### Design System
- **Colors**: Custom CSS variables for therapeutic color palette (primary, trust, warmth, secondary)
- **Typography**: Inter font with custom text scales (display, heading, subheading, large)
- **Layout**: Max-width of 67% for optimal readability
- **Responsive**: Mobile-first approach with Tailwind breakpoints

### Key Features
- **Contact Form**: React Hook Form + Zod validation, integrates with WhatsApp
- **Date Picker**: Spanish locale, restricts past dates and Sundays
- **Testimonials**: Magic UI marquee with dual-direction animation
- **SEO Optimized**: Meta tags, semantic HTML, accessibility features

### Development Notes
- Components use shadcn/ui patterns with Radix UI primitives
- Form handling follows React Hook Form + Zod pattern
- Styling uses Tailwind with custom design tokens in CSS variables
- Images stored in `src/assets/` with descriptive alt text
- TypeScript configuration is permissive for rapid development
- Vite dev server runs on port 8080 with host "::"

### File Organization
```
src/
├── components/           # Main page sections
│   ├── ui/              # shadcn/ui base components
│   └── magicui/         # Custom animated components
├── pages/               # Route components
├── hooks/               # Custom React hooks
├── lib/                 # Utilities (cn function, etc.)
└── assets/             # Images and static files
```

### Styling Conventions
- Use Tailwind utility classes
- Custom colors via CSS variables (--primary, --trust, --warmth, etc.)
- Responsive design with mobile-first breakpoints
- Use `cn()` utility from `@/lib/utils` for conditional classes
- Component variants handled with class-variance-authority (CVA)

### Form Patterns
- React Hook Form for form state management
- Zod for schema validation
- shadcn/ui form components with proper error handling
- WhatsApp integration for contact forms

This codebase is production-ready and follows modern React development practices with a focus on maintainability and user experience.