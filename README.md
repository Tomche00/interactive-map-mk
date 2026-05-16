# Macedonia Explorer

Interactive geospatial application for exploring locations across North Macedonia, including monuments, cities, nature areas, camping destinations, and recreational points of interest.

![Macedonia Explorer](docs/product-shot.png)

## ✨ Features

- **Multi-language Support** — English/Macedonian localization for UI and location data
- **Category Filtering** — Monuments, Cities, Nature, Camping, Recreation, Restaurants, Hotels, Lakes & Rivers
- **Dynamic Type Mapping** — Automatic handling of new location categories
- **Location Details** — Metadata, coordinates, and Google Maps integration
- **Responsive Interface** — Optimized layouts for desktop and mobile devices
- **Performance Optimizations** — Code splitting, lazy loading, memoization
- **Testing Infrastructure** — Jest and React Testing Library integration

## 🎨 Design System

- **Regional Color Palette** — Inspired by Macedonian landscapes and architecture
- **Glass-Based UI System** — Frosted navigation and layered interface components
- **Motion System** — Subtle interaction animations and transitions
- **Component Consistency** — Shared design tokens and reusable UI patterns
- **Responsive Layout System** — Adaptive spacing and navigation behavior
- **CSS Token Architecture** — HSL-based theme variables defined in `index.css`

## ⚙️ Technical Architecture

### Core Stack

- **React 18 + TypeScript**
- **Vite**
- **Tailwind CSS + shadcn/ui**
- **React Router**
- **Redux Toolkit + RTK Query**
- **Jest + React Testing Library**
- **Custom Context-Based i18n**

### 🔄 State Management

Redux Toolkit and RTK Query are used for predictable client-side state management and server data synchronization.

#### Store Structure

- **filtersSlice** — Location filters and search state
- **uiSlice** — UI interactions and modal state
- **locationsApi** — RTK Query caching and data fetching

#### Architectural Focus

- Type-safe state management
- Memoized selectors
- Predictable async workflows
- Scalable feature organization

### 🗂️ Code Organization

```
src/
├── store/                    # Redux store configuration
│   ├── index.ts            # Store setup and middleware
│   ├── api/                # RTK Query API definitions
│   │   └── locationsApi.ts # Location data fetching
│   ├── slices/             # Redux state slices
│   │   ├── filtersSlice.ts  # Filter state management
│   │   └── uiSlice.ts      # UI state (selected/hovered)
│   └── selectors/          # Memoized data selectors
│       └── locationSelectors.ts
├── i18n/                   # Internationalization
│   ├── translations.ts      # EN + MK translations
│   └── LanguageContext.tsx # Language provider
├── components/               # React components
│   ├── ui/                # Reusable UI components
│   │   └── lazy-image.tsx     # Intersection Observer lazy loading
│   ├── map/                # Map-specific components
│   │   ├── MapHeader.tsx      # Page title, stats, and badge pills
│   │   ├── MapFilters.tsx     # Desktop + mobile filters (React.memo)
│   │   └── MapPins.tsx      # Pin rendering and coordinate mapping
│   ├── CustomMapRedux.tsx     # Redux-powered main map orchestrator
│   ├── LocationTooltip.tsx    # Hover tooltip with navigation
│   ├── LocationDetailSheet.tsx # Mobile sheet for location details
│   └── Navigation.tsx         # Top nav bar with language toggle
├── hooks/                   # Custom React hooks
│   ├── index.ts            # Hook exports
│   ├── useMapInteractions.ts # Map interaction handlers
│   └── use-mobile.tsx       # Mobile detection hook
├── constants/               # Application constants
│   └── locationTypes.ts
├── types/                   # TypeScript type definitions
│   └── location.ts
└── assets/                  # Static assets
    ├── macedonia-map-modern.jpg
    ├── flag-en.png
    └── flag-mk.png
```

### 🚀 Delivery Pipeline

CI/CD pipeline with automated quality validation and deployment workflows.

#### Pipeline Capabilities

- ESLint and TypeScript validation
- Security and dependency auditing
- Lighthouse performance analysis
- Deployment health checks
- Automated rollback support

### ⚡ Performance Engineering

#### Core Optimizations
- **Route-based Code Splitting** — `React.lazy()` with `Suspense` boundaries
- **Progressive Image Loading** — Intersection Observer API for lazy loading
- **Component Memoization** — `React.memo()` for expensive renders
- **Redux Optimization** — Utility functions and `useMemo()` patterns

#### Performance Metrics

- ~45KB gzipped main bundle
- <1.2s First Contentful Paint
- <2s Time to Interactive
- Optimized rendering for large location datasets


### 🌍 Internationalization

Lightweight context-based localization architecture supporting English and Macedonian translations with persistent language preferences.

#### Architecture Overview
1. **LanguageContext** — Wraps app providing language state and translation object
2. **Translation Layer** — Single `translations.ts` file with EN/MK objects
3. **UI Integration** — Flag toggle (🇬🇧 / 🇲🇰) with localStorage persistence


## 🗺️ Roadmap

### ✅ Foundation

- Redux Toolkit migration
- RTK Query integration
- Type-safe architecture
- Testing infrastructure

### ✅ Performance

- Route-based code splitting
- Progressive image loading
- Memoized rendering patterns
- Redux performance optimization

### 🎯 Current Focus Areas

- PWA support and offline caching
- Real-time location updates
- Marker clustering
- IndexedDB persistence
- Web Worker processing
- Virtualized rendering


## 📋 Documentation

- **[docs/TESTING.md](./docs/TESTING.md)** — Comprehensive testing documentation
- **[docs/ContentManagement.md](./docs/ContentManagement.md)** — Location and translation workflows
- **[docs/Design System](./docs/DesignSystem.md)** — Complete UI/UX guidelines and components
- **[docs/Future Roadmap](./docs/FutureRoadmap.md)** — Detailed development phases

## 📜 License

All rights reserved.
