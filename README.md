# VulnWatch Frontend

Next.js 16 + React 19 + Tailwind v4 UI for the VulnWatch product. Includes the marketing site, auth flows, and contact/FAQ pages.

## Stack

- **Next.js 16** App Router
- **React 19**, **TypeScript** (strict)
- **Tailwind v4**
- **Radix UI** (accordion/slot) + **shadcn-style** components
- **React Hook Form** + **Zod**
- **Sonner** for toasts
- **NextAuth** + **Google OAuth** provider wrapper

## Getting started

```bash
pnpm install
pnpm dev
```

Open <http://localhost:3000>.

## Scripts

| Command          | What it does             |
| ---------------- | ------------------------ |
| `pnpm dev`       | Dev server               |
| `pnpm build`     | Production build         |
| `pnpm start`     | Run the production build |
| `pnpm lint`      | ESLint                   |
| `pnpm typecheck` | `tsc --noEmit`           |
| `pnpm exec prettier --check .` | Prettier check |
| `pnpm exec prettier --write .` | Prettier write |

## Environment variables

Create a `.env.local` with values similar to:

```bash
NEXT_PUBLIC_API_URL=https://api.staging.vuln-watch.hng14.com
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your_google_client_id
BASE_URL=https://base_url/api
AUTH_SECRET=your_auth_secret
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_nextauth_secret
```

Notes:

- `NEXT_PUBLIC_GOOGLE_CLIENT_ID` is required for the Google OAuth button.
- `NEXTAUTH_URL` and `NEXTAUTH_SECRET` are required if you enable NextAuth session handling.

## Routes

| Route | Purpose |
| --- | --- |
| `/` | Landing page |
| `/about-us` | About page |
| `/contact` | Contact page |
| `/faqs` | FAQs page |
| `/login` | Login page |
| `/register` | Register page |
| `/forgot-password` | Forgot password page |
| `/api/health` | Health check |

## Project layout

```
src/
├── app/                # App Router routes & file conventions
├── components/ui/      # Shared UI components
├── features/           # Feature-level components and pages
├── lib/                # Utilities
├── actions/            # Client actions
├── schemas/            # Shared Zod schemas
└── types/              # Shared TypeScript types
```
