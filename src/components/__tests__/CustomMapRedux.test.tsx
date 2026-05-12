import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import { LanguageProvider } from '@/i18n/LanguageContext';
import { SearchProvider } from '@/contexts/SearchContext';
import CustomMapRedux from '../CustomMapRedux';
import filtersReducer from '@/store/slices/filtersSlice';
import uiReducer from '@/store/slices/uiSlice';


// Mock the API
jest.mock('@/store/api/locationsApi', () => ({
  locationsApi: {
    reducerPath: 'locationsApi',
    reducer: (state = {}) => state,
    middleware: () => (next: any) => (action: any) => next(action),
    useGetLocationsQuery: jest.fn(() => ({
      data: [
        {
          id: 'test-location',
          name: 'Test Location',
          description: 'Test description',
          type: 'monument',
          latitude: 41.0,
          longitude: 21.0,
          coordinates: [21.0, 41.0],
        },
      ],
      isLoading: false,
      error: null,
    })),
  },
  useGetLocationsQuery: jest.fn(() => ({
    data: [
      {
        id: 'test-location',
        name: 'Test Location',
        description: 'Test description',
        type: 'monument',
        latitude: 41.0,
        longitude: 21.0,
        coordinates: [21.0, 41.0],
      },
    ],
    isLoading: false,
    error: null,
  })),
}));

// Get reference to the mocked API for use in tests
const mockLocationsApi = require('@/store/api/locationsApi');

// Mock the hooks
jest.mock('@/hooks/useMapInteractions', () => ({
  useMapInteractions: () => ({
    handlePinHover: jest.fn(),
    handlePinLeave: jest.fn(),
    handlePinMove: jest.fn(),
    handleNavigation: jest.fn(),
    handleTooltipMouseEnter: jest.fn(),
    handleTooltipMouseLeave: jest.fn(),
  }),
}));

// Mock the specific image import
jest.mock('@/assets/macedonia-map-modern.jpg', () => 'test-map.jpg');

// Mock the JSON file
jest.mock('@/data/locations.json', () => [
  {
    id: 'test-location-1',
    name: 'Test Location 1',
    description: 'Test description 1',
    type: 'monument',
    latitude: 41.0,
    longitude: 21.0,
    coordinates: [21.0, 41.0],
  },
  {
    id: 'test-location-2',
    name: 'Test Location 2',
    description: 'Test description 2',
    type: 'restaurant',
    latitude: 42.0,
    longitude: 22.0,
    coordinates: [22.0, 42.0],
  },
]);

// Mock LOCATION_TYPES constant
jest.mock('@/constants/locationTypes', () => ({
  LOCATION_TYPES: {
    monument: {
      label: 'Monument',
      color: '#3b82f6',
      icon: '🏛️',
    },
    restaurant: {
      label: 'Restaurant',
      color: '#10b981',
      icon: '🍽️',
    },
  },
  DEFAULT_VISIBLE_TYPES: ['monument', 'restaurant'],
  LOCATION_TYPE_ORDER: ['monument', 'restaurant'],
  LOCATION_TYPE_PRESETS: {
    all: {
      label: 'All',
      types: ['monument', 'restaurant'],
    },
    monuments: {
      label: 'Monuments',
      types: ['monument'],
    },
    restaurants: {
      label: 'Restaurants',
      types: ['restaurant'],
    },
  },
}));

// Mock translations
jest.mock('@/i18n/LanguageContext', () => ({
  LanguageProvider: ({ children }: { children: React.ReactNode }) => children,
  useLanguage: () => ({
    t: {
      map: {
        noResults: 'No results found',
        noResultsHint: 'Try adjusting your filters',
        loading: 'Loading locations...',
        error: 'Failed to load locations',
        subtitle: 'Interactive Map',
      },
      types: {
        monument: 'Monument',
        restaurant: 'Restaurant',
      },
    },
    language: 'en',
    toggleLanguage: jest.fn(),
  }),
}));

// Mock SearchContext
jest.mock('@/contexts/SearchContext', () => ({
  SearchProvider: ({ children }: { children: React.ReactNode }) => children,
  useSearch: () => ({
    query: '',
    setQuery: jest.fn(),
  }),
}));

const renderWithProviders = (component: React.ReactElement) => {
  const testStore = configureStore({
    reducer: {
      filters: filtersReducer,
      ui: uiReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
          ignoredPaths: ['filters.visibleTypes'],
        },
      }),
  });

  return render(
    <Provider store={testStore}>
      <BrowserRouter future={{ 
        v7_startTransition: true,
        v7_relativeSplatPath: true 
      }}>
        <LanguageProvider>
          <SearchProvider>
            {component}
          </SearchProvider>
        </LanguageProvider>
      </BrowserRouter>
    </Provider>
  );
};

describe('CustomMapRedux', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders without crashing', () => {
    renderWithProviders(<CustomMapRedux />);
    // Component should render successfully
    expect(document.body).toBeInTheDocument();
  });

  it('displays loading state initially', () => {
    const { useGetLocationsQuery } = mockLocationsApi;
    useGetLocationsQuery.mockReturnValue({
      data: undefined,
      isLoading: true,
      error: null,
    });

    renderWithProviders(<CustomMapRedux />);
    expect(screen.getByText('Loading locations...')).toBeInTheDocument();
  });

  it('displays error state when API fails', () => {
    const { useGetLocationsQuery } = mockLocationsApi;
    useGetLocationsQuery.mockReturnValue({
      data: undefined,
      isLoading: false,
      error: new Error('API Error'),
    });

    renderWithProviders(<CustomMapRedux />);
    expect(screen.getByText('Error loading locations')).toBeInTheDocument();
  });
});
