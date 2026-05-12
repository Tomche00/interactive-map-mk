import { useEffect, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { LOCATION_TYPES, DEFAULT_VISIBLE_TYPES, LOCATION_TYPE_ORDER } from '@/constants/locationTypes';
import { useMapInteractions } from '@/hooks/useMapInteractions';
import { useLanguage } from '@/i18n/LanguageContext';
import { useGetLocationsQuery } from '@/store/api/locationsApi';
import {
  getFilteredLocations,
  getAvailableTypes,
  getLocationCountsByType,
} from '@/store/selectors/locationSelectors';
import {
  toggleLocationType,
  selectAllTypes,
  deselectAllTypes,
  setVisibleTypes,
  setSearchQuery,
} from '@/store/slices/filtersSlice';
import {
  setSelectedLocation,
  setSheetOpen,
} from '@/store/slices/uiSlice';
import MapHeader from './map/MapHeader';
import MapFilters, { MobileFilters } from './map/MapFilters';
import MapPins from './map/MapPins';
import { LocationTooltip } from './LocationTooltip';
import { LocationDetailSheet } from './LocationDetailSheet';
import macedoniaMap from '@/assets/macedonia-map-modern.jpg';
import { SearchX } from 'lucide-react';
import LazyImage from './ui/lazy-image';
import type { Location } from '@/types/location';

const CustomMapRedux = () => {
  const dispatch = useAppDispatch();
  const { t } = useLanguage();
  
  // Optimized Redux selectors
  const { visibleTypes, searchQuery } = useAppSelector(state => state.filters);
  const { selectedLocation, hoveredLocation, tooltipPosition, sheetOpen } = useAppSelector(state => state.ui);
  
  // RTK Query hook
  const { data: locations = [], isLoading, error } = useGetLocationsQuery();
  
  // Memoized computed values using utility functions
  const filteredLocations = useMemo(() => {
    return getFilteredLocations(locations, visibleTypes, searchQuery);
  }, [locations, visibleTypes, searchQuery]);

  const filteredLocationCounts = useMemo(() => {
    return getLocationCountsByType(filteredLocations);
  }, [filteredLocations]);
  
  const availableTypes = useMemo(() => {
    return getAvailableTypes(locations);
  }, [locations]);
  
  const locationCounts = useMemo(() => {
    return getLocationCountsByType(locations);
  }, [locations]);

  const {
    handlePinHover,
    handlePinLeave,
    handlePinMove,
    handleNavigation,
    handleTooltipMouseEnter,
    handleTooltipMouseLeave,
  } = useMapInteractions();

  const selectAllTypesHandler = () => dispatch(selectAllTypes(availableTypes as string[]));
  const deselectAllTypesHandler = () => dispatch(deselectAllTypes());
  const applyPreset = (types: string[]) => {
    dispatch(setVisibleTypes(types.filter(t => (availableTypes as string[]).includes(t))));
  };
  const toggleLocationTypeHandler = (type: string) => {
    dispatch(toggleLocationType(type));
  };

  const openLocation = (location: Location) => {
    dispatch(setSelectedLocation(location));
    dispatch(setSheetOpen(true));
    const url = new URL(window.location.href);
    url.searchParams.set('location', location.id);
    window.history.replaceState({}, '', url.toString());
  };

  const handleSheetOpenChange = (open: boolean) => {
    dispatch(setSheetOpen(open));
    if (!open) {
      const url = new URL(window.location.href);
      url.searchParams.delete('location');
      window.history.replaceState({}, '', url.toString());
    }
  };

  // Auto-open from ?location=id on first load
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('location');
    if (!id) return;
    const found = locations.find(l => l.id === id);
    if (found) {
      dispatch(setSelectedLocation(found));
      dispatch(setSheetOpen(true));
      // ensure its type is visible
      if (!visibleTypes.includes(found.type)) {
        const newVisibleTypes = [...visibleTypes, found.type];
        dispatch(setVisibleTypes(newVisibleTypes));
      }
    }
  }, [locations, dispatch, visibleTypes]);

  if (isLoading) {
    return (
      <div className="w-full min-h-[calc(100vh-3.5rem)] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading locations...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full min-h-[calc(100vh-3.5rem)] flex items-center justify-center">
        <div className="text-center">
          <p className="text-destructive mb-2">Error loading locations</p>
          <p className="text-muted-foreground text-sm">Please try again later</p>
        </div>
      </div>
    );
  }

  const noVisible = filteredLocations.length === 0;

  return (
    <div className="w-full min-h-[calc(100vh-3.5rem)]">
      <MapHeader
        filteredLocations={filteredLocations}
        visibleTypes={visibleTypes}
        availableTypes={availableTypes}
        onApplyPreset={applyPreset}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 pb-8">
        <div className="flex gap-5">
          <MapFilters
            availableTypes={availableTypes}
            visibleTypes={visibleTypes}
            onToggle={toggleLocationTypeHandler}
            onSelectAll={selectAllTypesHandler}
            onDeselectAll={deselectAllTypesHandler}
          />

          <div className="flex-1 min-w-0">
            <div className="glass-panel overflow-hidden">
              <div className="relative">
                <LazyImage
                  src={macedoniaMap}
                  alt="North Macedonia Map"
                  className="w-full h-auto object-contain"
                />
                <MapPins
                  locations={filteredLocations}
                  onHover={handlePinHover}
                  onLeave={handlePinLeave}
                  onMove={handlePinMove}
                  onClick={openLocation}
                />

                {noVisible && (
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="bg-card/90 backdrop-blur-sm border border-border rounded-xl px-5 py-4 max-w-xs text-center shadow-lg pointer-events-auto">
                      <SearchX className="w-6 h-6 mx-auto text-muted-foreground mb-2" />
                      <p className="text-sm font-medium text-foreground">
                        {t.map.noResults}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {t.map.noResultsHint}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {hoveredLocation && !sheetOpen && (
        <LocationTooltip
          location={hoveredLocation}
          position={tooltipPosition}
          onNavigate={handleNavigation}
          onMouseEnter={handleTooltipMouseEnter}
          onMouseLeave={handleTooltipMouseLeave}
        />
      )}

      <LocationDetailSheet
        location={selectedLocation}
        open={sheetOpen}
        onOpenChange={handleSheetOpenChange}
      />
    </div>
  );
};

export default CustomMapRedux;
