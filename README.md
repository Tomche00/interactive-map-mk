# Macedonia Explorer

Interactive map application for exploring North Macedonia — browse monuments, cities, nature spots, camping locations, and more.

![Macedonia Explorer](docs/product-shot.png)

## Features

- **Interactive map** with 262+ curated locations on a custom map
- **Multi-language** — English / Macedonian toggle with translated UI, filters, and location names
- **Category filters** — Monuments, Cities, Nature, Camping, Recreation, Restaurants, Hotels, Lakes & Rivers
- **Auto-detection** — new location types from data appear automatically in the legend
- **Location details** — hover any pin for name, description, coordinates, and Google Maps navigation
- **Responsive** — desktop sidebar filters, mobile-optimized chip filters
- **Modern UI** — frosted-glass navigation, cool-toned palette with teal accents, clean typography

## Tech Stack

- React 18 + TypeScript
- Vite
- Tailwind CSS + shadcn/ui
- React Router
- Redux Toolkit + RTK Query
- React Testing Library + Jest
- Custom i18n (context-based, zero dependencies)

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Run tests
npm test

# Run tests with coverage
npm run test:coverage

# Watch tests during development
npm run test:watch
```

## Project Structure

```
src/
├── store/
│   ├── index.ts               # Redux store configuration
│   ├── api/
│   │   └── locationsApi.ts    # RTK Query API for location data
│   ├── slices/
│   │   ├── filtersSlice.ts     # Filter state management
│   │   └── uiSlice.ts         # UI state (selected/hovered locations)
│   └── selectors/
│       └── locationSelectors.ts  # Performance-optimized data processing utilities
├── i18n/
│   ├── translations.ts         # EN + MK translation strings
│   └── LanguageContext.tsx    # React context provider + useLanguage hook
├── components/
│   ├── ui/
│   │   └── lazy-image.tsx     # Intersection Observer lazy loading component
│   ├── map/
│   │   ├── MapHeader.tsx      # Page title, stats, and badge pills
│   │   ├── MapFilters.tsx     # Desktop sidebar + mobile chip filters (React.memo optimized)
│   │   └── MapPins.tsx      # Pin rendering and coordinate mapping (React.memo optimized)
│   ├── CustomMapRedux.tsx     # Redux-powered main map orchestrator (useMemo optimized)
│   ├── CustomMap.tsx          # Legacy component (deprecated)
│   ├── LocationTooltip.tsx    # Hover tooltip with navigation
│   ├── LocationDetailSheet.tsx # Mobile sheet for location details
│   └── Navigation.tsx         # Top nav bar with language toggle
├── hooks/
│   ├── index.ts              # Hook exports
│   ├── useAppDispatch.ts     # Typed Redux dispatch hook
│   ├── useAppSelector.ts     # Typed Redux selector hook
│   └── useMapInteractions.ts # Tooltip state and navigation logic
├── contexts/
│   └── SearchContext.tsx     # Search state management context
├── components/__tests__/
│   └── CustomMapRedux.test.tsx # Component tests
├── types/
│   └── location.ts           # Shared Location interface (name + nameMk)
├── constants/
│   └── locationTypes.ts      # Category config (color, icon, label, order, presets)
├── data/
│   └── locations.json       # Location data (262+ entries)
├── pages/
│   ├── Index.tsx             # Lazy-loaded main map page
│   ├── About.tsx             # Lazy-loaded about page
│   └── Rent.tsx              # Lazy-loaded rent page
├── docs/
│   └── TESTING.md            # Comprehensive testing documentation
├── setupTests.ts            # Jest configuration and mocks
└── index.css               # Design tokens
```

## Adding Locations

Add entries to `src/data/locations.json`:

```json
{
  "name": "Location Name",
  "nameMk": "Име на Локација",
  "lat": 41.9981,
  "lng": 21.4254,
  "type": "monument",
  "description": "Brief description"
}
```

Register new types in `src/constants/locationTypes.ts` — they appear in the UI automatically.

## Multi-Language (i18n)

The app uses a lightweight context-based i18n system with zero external dependencies.

### How It Works

1. **LanguageContext** (`src/i18n/LanguageContext.tsx`) wraps the app and provides:
   - `language` — current language (`'en'` or `'mk'`)
   - `t` — translation object for the active language
   - `toggleLanguage()` — switches between EN ↔ MK and persists to `localStorage`

2. **Translation strings** live in `src/i18n/translations.ts` — a single file with `en` and `mk` objects sharing the same key structure.

3. **Flag toggle** (🇬🇧 / 🇲🇰) in the navbar shows the current language and switches on click.

### Using Translations in Components

```tsx
import { useLanguage } from '@/i18n/LanguageContext';

const MyComponent = () => {
  const { t, language } = useLanguage();
  return <h1>{t.map.title}</h1>;
};
```

### Adding New UI Translations

1. Open `src/i18n/translations.ts`
2. Add your key to both `en` and `mk` objects:

```ts
en: {
  mySection: {
    greeting: 'Welcome',
  }
},
mk: {
  mySection: {
    greeting: 'Добредојдовте',
  }
}
```

3. Use in component: `t.mySection.greeting`

### Translating Location Pin Names

Each location in `src/data/locations.json` supports optional `nameMk` and `descriptionMk` fields for Macedonian translations:

```json
{
  "id": "ohrid",
  "name": "Ohrid",
  "nameMk": "Охрид",
  "description": "A lakeside city with UNESCO heritage...",
  "descriptionMk": "Град покрај езеро со UNESCO наследство...",
  "type": "city",
  "latitude": 41.1231,
  "longitude": 20.8016,
  "coordinates": [20.8016, 41.1231]
}
```

**Rules:**
- `name` (required) — always the English name, used as default
- `nameMk` (optional) — Macedonian name shown in tooltips when language is MK
- `description` (required) — English description shown in tooltips
- `descriptionMk` (optional) — Macedonian description shown in tooltips when language is MK
- If `nameMk` or `descriptionMk` is missing, the English version is shown in both languages

### Adding a New Language

1. Add the locale code to the `Language` type in `translations.ts`: `type Language = 'en' | 'mk' | 'sq';`
2. Add a full translation object matching the `en` structure
3. Update `toggleLanguage()` in `LanguageContext.tsx` to cycle through languages
4. Add the corresponding flag emoji to the navbar toggle
5. Optionally add `nameSq` (or similar) to `Location` interface and `locations.json`

## Design

- **Palette:** Cool blue-gray background with teal accent (`hsl(172, 50%, 40%)`)
- **Navigation:** Frosted glass with subtle gradient tint
- **Components:** Glass panels, badge pills, section cards
- **Tokens:** All colors defined as HSL CSS variables in `index.css`

## Testing

📋 **[View Comprehensive Testing Documentation](docs/TESTING.md)**

The project includes a complete testing setup with Jest and React Testing Library, covering unit tests, integration tests, and performance testing scenarios.

## Redux Architecture

The application uses Redux Toolkit for state management with the following structure:

### Store Slices
- **filtersSlice**: Manages location type filters and search queries
- **uiSlice**: Handles UI state (selected locations, tooltips, modals)
- **locationsApi**: RTK Query for location data fetching and caching

### Benefits
- **Type safety**: Full TypeScript integration
- **Performance**: Automatic caching and memoization
- **DevTools**: Redux DevTools integration
- **Scalability**: Easy to add new features and state

## Performance Optimizations

### Core Optimizations
- **Route-based code splitting** with `React.lazy()` and `Suspense`
- **Image lazy loading** using Intersection Observer API
- **Component memoization** with `React.memo()` for expensive renders
- **Redux optimization** with utility functions and `useMemo()`

### Implementation Patterns

**Code Splitting**
```typescript
// App.tsx
const Index = lazy(() => import("./pages/Index"));

<Routes>
  <Route path="/" element={
    <Suspense fallback={<LoadingFallback />}>
      <Index />
    </Suspense>
  } />
</Routes>
```

**Lazy Image Component**
```typescript
// components/ui/lazy-image.tsx
const LazyImage = ({ src, alt }) => {
  const [isInView, setIsInView] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setIsInView(true);
    }, { threshold: 0.1, rootMargin: '50px' });

    if (imgRef.current) observer.observe(imgRef.current);
    return () => observer.disconnect();
  }, []);

  return <img ref={imgRef} src={isInView ? src : placeholder} alt={alt} />;
};
```

**Component Memoization**
```typescript
// components/map/MapPins.tsx
const MapPins = React.memo(({ locations, onHover, onClick }) => {
  // Expensive rendering logic
});

// components/map/MapFilters.tsx  
const MapFilters = React.memo(({ availableTypes, onToggle }) => {
  // Filter component logic
});
```

**Redux Utilities**
```typescript
// store/selectors/locationSelectors.ts
export const getAvailableTypes = (locations) => 
  Array.from(new Set(locations.map(l => l.type)))
    .filter(type => LOCATION_TYPES[type])
    .sort(LOCATION_TYPE_ORDER);

export const getFilteredLocations = (locations, visibleTypes, searchQuery) =>
  locations.filter(location => 
    visibleTypes.includes(location.type) && 
    matchesSearch(location, searchQuery)
  );
```

### Optimized Files
- `App.tsx` - Route splitting
- `components/ui/lazy-image.tsx` - Intersection Observer
- `components/map/MapPins.tsx` - React.memo() optimized
- `components/map/MapFilters.tsx` - React.memo() optimized
- `components/CustomMapRedux.tsx` - useMemo() optimized
- `store/selectors/locationSelectors.ts` - Data processing utilities

## Future Roadmap

### Phase 2: Performance & Data Optimization
- Virtual scrolling for large location lists
- Map clustering for zoom levels
- IndexedDB for offline storage
- Web Workers for heavy computations

### Phase 3: Advanced Features
- PWA capabilities
- Real-time updates
- Advanced analytics
- A/B testing framework

## License

All rights reserved.
