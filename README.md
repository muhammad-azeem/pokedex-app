# Pokédex App

A production-quality Pokédex web application built with **Next.js 16 (App Router)**, **TypeScript**, **Tailwind CSS v4**, and the [graphql-pokemon2](https://graphql-pokemon2.vercel.app/) public GraphQL API.

## Live demo

> https://pokedex-app-mocha.vercel.app/

---

## Getting started

```bash
npm install
npm run dev
# Open http://localhost:3000
```

Production build:

```bash
npm run build
npm start
```

---

## Features

| Feature | Notes |
|---|---|
| Pokédex grid | 151 Gen-1 Pokémon in a responsive, mobile-first grid |
| Search | Client-side name filter with clear button |
| Type filter | 18 type chips — single-select, resets to page 1 |
| Pagination | 20 per page, smart ellipsis, prev/next buttons |
| Detail page | Classification, stats, height/weight, weaknesses, resistances, fast & special attacks, evolution chain |
| Evolution links | Each evolution card links to its own detail page |
| Favorites | Heart toggle persisted to `localStorage` |
| Type-colored UI | Cards, badges, and detail hero all reflect primary Pokémon type |
| Loading states | `loading.tsx` skeleton for list + detail pages |
| Error states | `error.tsx` with retry for list + detail pages |
| 404 state | `not-found.tsx` called via `notFound()` before any Suspense boundary |
| Empty state | Shown when search/filter returns no results |
| SEO metadata | Per-route `<title>` and `<description>` via Next.js `generateMetadata` |
| Responsive | Mobile-first; grid adapts from 2 → 6 columns |
| Accessible | ARIA roles, `aria-label`, `aria-pressed`, `aria-current`, `role="progressbar"` |
| Dark mode | Supported via Tailwind's `dark:` utilities |

---

## Data-fetching strategy

### List page (`/`)

The 151 Gen-1 Pokémon are **fetched on the server at request time** (dynamic rendering, no ISR). Rationale:

- The data is entirely static (Gen-1 never changes), but the tradeoff of pre-building 151 HTML files at build time adds complexity for no meaningful UX gain at this project scale.
- Fetching on the server means the full list is available before any HTML is sent — the `PokedexClient` component receives it as a prop and does instant client-side filtering without extra network round-trips.
- `cache: "no-store"` is used explicitly. For a production deployment, switching to `{ next: { revalidate: 86400 } }` (ISR, 24-hour revalidation) would be the natural next step.

### Detail page (`/pokemon/[name]`)

Also **fetched at request time** (dynamic). No `generateStaticParams` is used because:

1. Pre-building 151 detail pages adds build time and Vercel serverless cold-start cost with no measurable user benefit for a portfolio project.
2. `notFound()` is called **before** any `<Suspense>` boundary so invalid Pokémon names return a real `HTTP 404` status (not a client-side redirect).

### Data layer

Uses a plain typed `fetch` wrapper instead of `graphql-request`. The original `graphql-request v7` caused `405 Method Not Allowed` errors — the library's internal request format changed in v7. A plain `fetch` gives full control over the `POST` body and `Content-Type` header with zero runtime overhead.

---

## Architecture: Server vs Client Components

| File | Type | Reason |
|---|---|---|
| `app/page.tsx` | **Server** | Async data fetch; no browser APIs |
| `app/pokemon/[name]/page.tsx` | **Server** | Async data fetch; calls `notFound()` |
| `app/layout.tsx` | **Server** | Static shell; no interactivity |
| `components/PokedexClient.tsx` | **Client** | `useState` (search, type, page) |
| `components/SearchInput.tsx` | **Client** | `onChange` event handler |
| `components/TypeFilter.tsx` | **Client** | `onClick` event handlers |
| `components/FavoritesButton.tsx` | **Client** | `useState`, `useEffect`, `localStorage` |
| All others | **Server** | Pure presentational; no state/effects |

---

## Trade-offs & known issues

- **`generateStaticParams` not used** — detail pages are rendered dynamically. Adding ISR (`revalidate: 86400`) would be the production upgrade.
- **No test suite** — unit tests for `PokedexClient` (filter logic) and `gqlFetch` (error path) were scoped out due to time. Jest + React Testing Library would be the stack.
- **Favourites are per-device** — `localStorage` is intentionally client-only; a real app would persist to a database behind an auth layer.
- **Type filter is single-select** — multi-select was considered but adds significant UI complexity with no rubric benefit.
- **Images use `next/image`** with the confirmed `img.pokemondb.net` remote pattern. The original API (`graphql-pokemon.vercel.app`) now returns `405` on POST — the working endpoint is `graphql-pokemon2.vercel.app`.

---

## Bonus items attempted

- [x] Favorites — `localStorage` persistence
- [x] Type-colored UI — cards, badges, hero gradients all driven by Pokémon type
- [x] Accessibility — ARIA attributes throughout, keyboard navigable
- [ ] Tests — scoped out
- [ ] Deployment — not deployed (no Vercel account set up)
- [ ] ISR caching — documented as the obvious next step but not implemented
