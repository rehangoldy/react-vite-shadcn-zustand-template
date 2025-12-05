## Template Frontend React + Vite + Tailwind CSS + shadcn/ui + Zustand

Template ini adalah kerangka kerja frontend yang sudah dikonfigurasi untuk membangun aplikasi React modern dengan:

- **Vite** sebagai bundler (cepat, HMR, siap produksi)
- **React + TypeScript**
- **Tailwind CSS v4** sebagai utility-first CSS
- **shadcn/ui + Radix UI** sebagai library komponen yang bisa dikustom
- **Zustand** untuk global state management
- **React Router DOM** untuk routing

Template ini didesain supaya bisa langsung dipakai sebagai base project atau di-clone untuk berbagai aplikasi web lain dengan struktur dan pola yang konsisten.

---

## Fitur Utama

- **Konfigurasi Vite siap multi-environment** (`VITE_APP_MODE`, `VITE_APP_URL`, proxy `/api`)
- **Alias path terstruktur** (`@`, `@shared-component`, `@shared-hooks`, `@shared-stores`, dll)
- **Integrasi Tailwind v4 + shadcn/ui** (token seperti `bg-primary`, `text-muted-foreground`, `container`, dll)
- **Struktur folder `shared`** untuk komponen, hooks, stores, dan utilitas yang bisa direuse
- **Contoh landing page** dengan efek parallax dan komponen `NavigationMenu` dari shadcn/ui
- **Siap ditambahkan Zustand store** untuk state global (theme, auth, UI state, dsb)

---

## Stack Teknologi

- **Core**
  - React `^19`
  - TypeScript `~5.9`
  - Vite `^7` (plugin `@vitejs/plugin-react-swc`)

- **Styling & UI**
  - Tailwind CSS `^4` + `@tailwindcss/vite`
  - shadcn/ui (berbasis Radix UI)
  - `clsx` + `tailwind-merge` (helper `cn` di `src/lib/utils.ts`)
  - `lucide-react` untuk ikon

- **State Management & Form**
  - Zustand `^5`
  - React Hook Form + Zod untuk form & validasi

- **Routing & Lain-lain**
  - React Router DOM `^7`
  - Axios untuk HTTP client
  - `react-day-picker`, `recharts`, `sonner`, `cmdk`, dll sebagai utilitas UI tambahan

---

## Struktur Proyek (Ringkas)

Struktur di bawah hanya menampilkan folder yang paling relevan untuk pengembangan sehari-hari.

```txt
src/
  App.tsx              # Entry utama aplikasi (layout/landing)
  main.tsx             # Entry Vite, render <App /> ke DOM
  index.css            # Global styles + Tailwind layer
  theme.css            # Tema (warna, font, dsb) untuk shadcn/tailwind

  assets/              # Static assets (gambar, ikon, dll)
  lib/
    utils.ts           # Helper umum, termasuk fungsi cn() untuk className

  hooks/               # Hooks umum (di luar shared/*)
  modules/             # Modul/fitur tingkat tinggi (jika ada)
  routes/              # Definisi routes/pages (bisa diisi React Router)

  shared/
    components/        # Komponen UI reusable
      navbar/
        onboarding-navbar.tsx  # Contoh navbar berbasis shadcn NavigationMenu

    hooks/             # Hooks bersama, misalnya useIsMobile
    stores/            # Global state dengan Zustand (theme, auth, UI, dsb)
    constant/          # Konstanta yang bisa di-reuse
    types/             # TypeScript shared types
    utils/             # Helper khusus domain
    service/           # Abstraksi API/service (axios, dsb)
```

> Catatan: isi folder bisa berubah mengikuti kebutuhan project, tapi pola besar **`shared/*` untuk hal yang reusable** sebaiknya dipertahankan.

---

## Alias Path (vite.config.ts)

Vite sudah dikonfigurasi dengan beberapa alias untuk memudahkan import:

- `@` → `./src`
- `@shared-component` → `./src/shared/components`
- `@shared-constants` → `./src/shared/constant`
- `@shared-types` → `./src/shared/types`
- `@shared-utils` → `./src/shared/utils`
- `@shared-stores` → `./src/shared/stores`
- `@shared-hooks` → `./src/shared/hooks`
- `@shared-service` → `./src/shared/service`

**Contoh pemakaian:**

- Import asset: `import cp1 from "@/assets/img/cp1.png";`
- Import komponen: `import OnboardingNavbar from "@shared-component/navbar/onboarding-navbar";`
- Import hooks: `import { useIsMobile } from "@shared-hooks/use-mobile";`

---

## Environment & Mode

Konfigurasi environment diatur lewat beberapa variable yang dibaca di `vite.config.ts`:

- `VITE_APP_MODE`
  - `PRODUCTION`
  - `DEVELOPMENT`
  - `DEVDOCKER`
  - `STAGING`

- `VITE_APP_URL` → base URL aplikasi (dipakai sebagai `base` Vite)
- `VITE_API_URL_ETERNNABLIS` → target proxy API untuk beberapa mode
- `VITE_API_URL_EPKS` → target proxy API untuk mode lain (DEVDOCKER/STAGING)

### Proxy `/api`

Untuk pengembangan, request ke `/api` akan di-proxy ke backend sesuai mode:

- Mode **DEVELOPMENT / default**
  - `/api` → `VITE_API_URL_ETERNNABLIS`

- Mode **DEVDOCKER / STAGING**
  - `/api` → `VITE_API_URL_EPKS`

Contoh pemanggilan API di frontend:

- Panggil `GET /api/users` di React → otomatis diteruskan ke URL backend sesuai environment.

---

## Menjalankan Proyek

Di root project:

- **Install dependencies**

  ```bash
  pnpm install
  # atau
  npm install
  # atau
  yarn
  ```

- **Development server**

  ```bash
  pnpm dev
  # atau npm run dev / yarn dev
  ```

- **Build untuk produksi**

  ```bash
  pnpm build
  # menjalankan tsc -b + vite build
  ```

- **Preview hasil build**

  ```bash
  pnpm preview
  ```

> Pastikan variable `VITE_APP_MODE` dan `VITE_APP_URL` sudah diset (misalnya di `.env.development.local`, `.env.production`, dll) sebelum build/preview untuk hasil yang sesuai environment.

---

## Pola Penggunaan Tailwind & shadcn/ui

- Tailwind sudah aktif lewat `@tailwindcss/vite` dan konfigurasi Tailwind v4.
- Style global dan tema warna didefinisikan di `src/index.css` dan `src/theme.css`.
- Token yang umum:
  - Warna: `bg-primary`, `bg-muted`, `text-muted-foreground`, dll
  - Layout: `container`, `min-h-screen`, `mx-auto`, dsb

### Helper `cn`

- Terdapat helper `cn` di `src/lib/utils.ts`:
  - Menggunakan `clsx` + `tailwind-merge`
  - Dipakai untuk menggabungkan className secara aman dan rapi.

```ts
import { cn } from "@/lib/utils";

<div className={cn("flex", isActive && "bg-primary")}>...</div>
```

### Contoh Komponen shadcn/ui

- `shared/components/navbar/onboarding-navbar.tsx` menunjukkan contoh penggunaan `NavigationMenu`:
  - Import dari `@shared-component/ui/navigation-menu` (wrapper shadcn)
  - Menggunakan `NavigationMenu`, `NavigationMenuList`, `NavigationMenuItem`, `NavigationMenuTrigger`, `NavigationMenuContent`, `NavigationMenuLink`, `navigationMenuTriggerStyle`
  - Menggabungkan Tailwind utility + token shadcn (`bg-muted`, `text-muted-foreground`, dsb)

Untuk menambahkan komponen shadcn/ui lain:

- Generate komponen via CLI shadcn (di project ini atau project lain lalu copy)
- Taruh di `src/shared/components/ui/...`
- Reuse di manapun dengan alias `@shared-component/ui/xxx`.

---

## Pola Penggunaan Zustand (Global State)

Package `zustand` sudah terinstall dan siap dipakai di folder `src/shared/stores`.

Pola rekomendasi:

- Buat store per domain, misalnya:
  - `src/shared/stores/theme-store.ts` → state theme (light/dark/system)
  - `src/shared/stores/auth-store.ts` → user login, token, dsb
  - `src/shared/stores/ui-store.ts` → sidebar open, dialog, dsb

Contoh (sketsa singkat pola, penamaan bebas):

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

Penggunaan di komponen:

```tsx
import { useThemeStore } from "@shared-stores/theme-store";

const Example = () => {
  const theme = useThemeStore((state) => state.theme);
  const setTheme = useThemeStore((state) => state.setTheme);

  // ... pakai theme di UI
};
```

> Rekomendasi: simpan semua store Zustand di `shared/stores` dan selalu gunakan alias `@shared-stores/...` agar rapi dan mudah dipindah project.

---

## Menambah Halaman / Route

Karena sudah memakai React Router DOM, struktur yang disarankan:

- Definisikan konfigurasi route di `src/routes/*` (misalnya `routes/app-routes.tsx`).
- Gunakan layout utama di `App.tsx` atau buat `Layout` terpisah di `shared/components/layout`.
- Pisahkan halaman berdasarkan fitur di dalam `modules/` atau `features/`.

Contoh pola (konsep):

- `src/routes/app-routes.tsx`
- `src/modules/onboarding/pages/OnboardingPage.tsx`
- `src/modules/dashboard/pages/DashboardPage.tsx`

Kemudian di `App.tsx`, gunakan `<BrowserRouter>` dan `<Routes>` untuk merender halaman-halaman tersebut.

---

## Kontribusi / Penyesuaian

- Anda bebas menambah atau memodifikasi struktur folder sesuai kebutuhan project.
- Usahakan tetap menggunakan:
  - Alias path yang sudah ada
  - Folder `shared/*` untuk hal yang reusable
  - Folder `modules/` / `features/` untuk domain bisnis
- Saat menambah dependency baru, periksa kompatibilitas dengan React 19 dan Vite 7.

---

## Lisensi

Template ini dapat digunakan dan dimodifikasi bebas untuk kebutuhan pribadi maupun komersial, mengikuti lisensi bawaan dependency yang digunakan (React, Vite, Tailwind, shadcn/ui, dst).

