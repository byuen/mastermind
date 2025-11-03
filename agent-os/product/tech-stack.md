# Product Tech Stack

## Framework & Runtime
- **Application Framework:** Next.js (React framework for full-stack web applications)
- **Language/Runtime:** Node.js / TypeScript
- **Package Manager:** npm or yarn

## Frontend
- **JavaScript Framework:** React (with TypeScript)
- **CSS Framework:** Tailwind CSS (utility-first CSS framework for rapid UI development)
- **UI Components:** Custom components with shadcn/ui or similar component library for consistent, accessible UI elements

## Database & Storage
- **Database:** PostgreSQL (for game statistics and user progress tracking)
- **ORM/Query Builder:** Prisma (type-safe database access)
- **Caching:** (Optional) Redis for session management if multi-user features are added

## Testing & Quality
- **Test Framework:** Jest with React Testing Library (for component and unit testing)
- **Linting/Formatting:** ESLint, Prettier (code quality and formatting)

## Deployment & Infrastructure
- **Hosting:** Vercel (optimal for Next.js applications) or Railway
- **CI/CD:** GitHub Actions (automated testing and deployment)

## Third-Party Services
- **Authentication:** (Optional) NextAuth.js if user accounts and progress tracking are needed
- **Email:** (Optional) For notifications if user accounts are implemented
- **Monitoring:** (Optional) Vercel Analytics or similar for usage analytics

## Game-Specific Architecture Notes
- **Client-Side State Management:** React Context API or Zustand for game state management
- **Game Logic:** Pure JavaScript/TypeScript functions for code generation, guess validation, and feedback calculation
- **Local Storage:** Browser localStorage for game statistics and preferences (if no backend is initially needed)
- **Responsive Design:** Mobile-first approach with Tailwind CSS breakpoints

