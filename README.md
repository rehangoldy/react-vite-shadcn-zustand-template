## React + Vite + Tailwind CSS + shadcn/ui + Zustand Frontend Template

This repository is a preconfigured frontend template for building modern React applications with:

- **Vite** as the bundler (fast, HMR, production-ready)
- **React + TypeScript**
- **Tailwind CSS v4** as a utility-first CSS framework
- **shadcn/ui + Radix UI** as a customizable component library
- **Zustand** for global state management
- **React Router DOM** for routing

The template is designed to be used directly as a base project or cloned and adapted for other web applications with a consistent structure and patterns.

---

## Key Features

- **Vite configuration ready for multiple environments** (`VITE_APP_MODE`, `VITE_APP_URL`, `/api` proxy)
- **Structured path aliases** (`@`, `@shared-component`, `@shared-hooks`, `@shared-stores`, etc.)
- **Tailwind v4 + shadcn/ui integration** (tokens like `bg-primary`, `text-muted-foreground`, `container`, etc.)
- **`shared` folder structure** for reusable components, hooks, stores, and utilities
- **Sample landing page** with parallax effect and `NavigationMenu` component from shadcn/ui
- **Ready for Zustand stores** to manage global state (theme, auth, UI state, etc.)

---

## Tech Stack

- **Core**
  - React `^19`
  - TypeScript `~5.9`
  - Vite `^7` (with `@vitejs/plugin-react-swc`)

- **Styling & UI**
  - Tailwind CSS `^4` + `@tailwindcss/vite`
  - shadcn/ui (built on top of Radix UI)
  - `clsx` + `tailwind-merge` (the `cn` helper in `src/lib/utils.ts`)
  - `lucide-react` for icons

- **State Management & Forms**
  - Zustand `^5`
  - React Hook Form + Zod for forms and validation

- **Routing & Utilities**
  - React Router DOM `^7`
  - Axios for HTTP client
  - `react-day-picker`, `recharts`, `sonner`, `cmdk`, etc. as extra UI utilities

---

## Project Structure (Overview)

The structure below shows only the most relevant folders for daily development.

```txt
src/
  App.tsx              # Main application entry (layout/landing)
  main.tsx             # Vite entry, renders <App /> into the DOM
  index.css            # Global styles + Tailwind layers
  theme.css            # Theme (colors, fonts, etc.) for shadcn/Tailwind

  assets/              # Static assets (images, icons, etc.)
  lib/
    utils.ts           # Shared helpers, including cn() for className

  hooks/               # General-purpose hooks (outside shared/*)
  modules/             # High-level modules/features (if used)
  routes/              # Route/page definitions (for React Router)

  shared/
    components/        # Reusable UI components
      navbar/
        onboarding-navbar.tsx  # Example navbar using shadcn NavigationMenu

    hooks/             # Shared hooks, e.g. useIsMobile
    stores/            # Global state with Zustand (theme, auth, UI state, etc.)
    constant/          # Reusable constants
    types/             # TypeScript shared types
    utils/             # Domain-specific helpers
    service/           # API/service abstractions (axios, etc.)
```

> Note: you can adjust folders as needed, but keeping **`shared/*` for reusable pieces** is highly recommended.

---

## Path Aliases (vite.config.ts)

Vite is configured with several path aliases to simplify imports:

- `@` → `./src`
- `@shared-component` → `./src/shared/components`
- `@shared-ui` → `./src/shared/ui`
- `@shared-constants` → `./src/shared/constant`
- `@shared-types` → `./src/shared/types`
- `@shared-utils` → `./src/shared/utils`
- `@shared-stores` → `./src/shared/stores`
- `@shared-hooks` → `./src/shared/hooks`
- `@shared-service` → `./src/shared/service`

**Examples:**

- Import asset: `import cp1 from "@/assets/img/cp1.png";`
- Import component: `import OnboardingNavbar from "@shared-component/navbar/onboarding-navbar";`
- Import hook: `import { useIsMobile } from "@shared-hooks/use-mobile";`

---

## Environment & Modes

Environment configuration is handled through variables read in `vite.config.ts`:

- `VITE_APP_MODE`
  - `PRODUCTION`
  - `DEVELOPMENT`
  - `DEVDOCKER`
  - `STAGING`

- `VITE_APP_URL` → app base URL (used as Vite `base`)
- `VITE_API_URL_ETERNNABLIS` → API proxy target for some modes
- `VITE_API_URL_EPKS` → API proxy target for other modes (DEVDOCKER/STAGING)

### `/api` Proxy

During development, requests to `/api` are proxied to the backend depending on the mode:

- **DEVELOPMENT / default** mode
  - `/api` → `VITE_API_URL_ETERNNABLIS`

- **DEVDOCKER / STAGING** modes
  - `/api` → `VITE_API_URL_EPKS`

Example API call from the frontend:

- Calling `GET /api/users` in React will automatically be forwarded to the backend URL configured for the current environment.

---

## Running the Project

From the project root:

- **Install dependencies**

  ```bash
  pnpm install
  # or
  npm install
  # or
  yarn
  ```

- **Start development server**

  ```bash
  pnpm dev
  # or npm run dev / yarn dev
  ```

- **Build for production**

  ```bash
  pnpm build
  # runs tsc -b and vite build
  ```

- **Preview production build**

  ```bash
  pnpm preview
  ```

> Make sure `VITE_APP_MODE` and `VITE_APP_URL` are set (e.g. in `.env.development.local`, `.env.production`, etc.) before building/previewing so the environment behaves as expected.

---

## Tailwind & shadcn/ui Usage Patterns

- Tailwind is enabled through `@tailwindcss/vite` and Tailwind v4 configuration.
- Global styles and theme colors are defined in `src/index.css` and `src/theme.css`.
- Common tokens:
  - Colors: `bg-primary`, `bg-muted`, `text-muted-foreground`, etc.
  - Layout: `container`, `min-h-screen`, `mx-auto`, etc.

### `cn` Helper

- The `cn` helper in `src/lib/utils.ts`:
  - Combines `clsx` and `tailwind-merge`
  - Used to safely and cleanly merge `className` values.

```ts
import { cn } from "@/lib/utils";

<div className={cn("flex", isActive && "bg-primary")}>...</div>
```

### Example shadcn/ui Component

- `shared/components/navbar/onboarding-navbar.tsx` demonstrates how to use `NavigationMenu`:
  - Imported from `@shared-ui/navigation-menu` (shadcn wrapper)
  - Uses `NavigationMenu`, `NavigationMenuList`, `NavigationMenuItem`, `NavigationMenuTrigger`, `NavigationMenuContent`, `NavigationMenuLink`, `navigationMenuTriggerStyle`
  - Combines Tailwind utilities with shadcn tokens (`bg-muted`, `text-muted-foreground`, etc.)

To add more shadcn/ui components:

- Generate components via the shadcn CLI (in this project or another) and copy them in
- Place them under `src/shared/ui/...`
- Reuse them anywhere via the alias `@shared-ui/xxx`.

---

## Zustand Usage Pattern (Global State)

The `zustand` package is installed and ready to be used under `src/shared/stores`.

Recommended pattern:

- Create one store per domain, for example:
  - `src/shared/stores/theme-store.ts` → theme state (light/dark/system)
  - `src/shared/stores/auth-store.ts` → user login, token, etc.
  - `src/shared/stores/ui-store.ts` → sidebar open, dialogs, etc.

Example (rough sketch, naming is up to you):

```ts
import { create } from "zustand";

type ThemeState = {
  theme: "light" | "dark" | "system";
  setTheme: (theme: ThemeState["theme"]) => void;
};

export const useThemeStore = create<ThemeState>((set) => ({
  theme: "system",
  setTheme: (theme) => set({ theme }),
}));
```

Usage in components:

```tsx
import { useThemeStore } from "@shared-stores/theme-store";

const Example = () => {
  const theme = useThemeStore((state) => state.theme);
  const setTheme = useThemeStore((state) => state.setTheme);

  // ... pakai theme di UI
};
```

> Recommendation: keep all Zustand stores in `shared/stores` and always use the `@shared-stores/...` alias so code stays organized and easy to move between projects.

---

## Adding Pages / Routes

Since this project uses React Router DOM, the recommended structure is:

- Define route configuration under `src/routes/*` (for example `routes/app-routes.tsx`).
- Use a main layout in `App.tsx` or create a separate `Layout` under `shared/components/layout`.
- Group pages by feature/domain inside `modules/` or `features/`.

Conceptual example pattern:

- `src/routes/app-routes.tsx`
- `src/modules/onboarding/pages/OnboardingPage.tsx`
- `src/modules/dashboard/pages/DashboardPage.tsx`

Then in `App.tsx`, use `<BrowserRouter>` and `<Routes>` to render those pages.

---

## Contributing / Customizing

- Feel free to add or modify folders and structure based on your project needs.
- Try to keep:
  - The existing path aliases
  - The `shared/*` folder for reusable code
  - `modules/` / `features/` folders for domain/business modules
- When adding new dependencies, check compatibility with React 19 and Vite 7.

---

## License

You can freely use and modify this template for personal or commercial projects, subject to the licenses of the underlying dependencies (React, Vite, Tailwind, shadcn/ui, etc.).

