import { useEffect, useMemo, useState } from 'react';
import locations from '@/data/locations.json';
import { LocationTooltip } from './LocationTooltip';
import { LocationDetailSheet } from './LocationDetailSheet';
import macedoniaMap from '@/assets/macedonia-map-modern.jpg';
import { LOCATION_TYPES, DEFAULT_VISIBLE_TYPES, LOCATION_TYPE_ORDER } from '@/constants/locationTypes';
import { useMapInteractions } from '@/hooks/useMapInteractions';
import { useLanguage } from '@/i18n/LanguageContext';
import { useSearch } from '@/contexts/SearchContext';
import MapHeader from './map/MapHeader';
import MapFilters, { MobileFilters } from './map/MapFilters';
import MapPins from './map/MapPins';
import { SearchX } from 'lucide-react';
import type { Location } from '@/types/location';

const CustomMap = () => {
  const { t } = useLanguage();
  const [visibleTypes, setVisibleTypes] = useState<Set<string>>(DEFAULT_VISIBLE_TYPES);
  const { query: search } = useSearch();
  const [selected, setSelected] = useState<Location | null>(null);
  const [sheetOpen, setSheetOpen] = useState(false);

  const {
    hoveredLocation,
    tooltipPosition,
    handlePinHover,
    handlePinLeave,
    handlePinMove,
    handleNavigation,
    handleTooltipMouseEnter,
    handleTooltipMouseLeave,
  } = useMapInteractions();

  const availableTypes = useMemo(
    () =>
      Array.from(new Set(locations.map(l => l.type)))
        .filter(type => LOCATION_TYPES[type])
        .sort((a, b) => {
          const ai = LOCATION_TYPE_ORDER.indexOf(a);
          const bi = LOCATION_TYPE_ORDER.indexOf(b);
          const aRank = ai === -1 ? Number.POSITIVE_INFINITY : ai;
          const bRank = bi === -1 ? Number.POSITIVE_INFINITY : bi;
          if (aRank !== bRank) return aRank - bRank;
          return (LOCATION_TYPES[a]?.label || a).localeCompare(LOCATION_TYPES[b]?.label || b);
        }),
    []
  );

  const selectAllTypes = () => setVisibleTypes(new Set(availableTypes));
  const deselectAllTypes = () => setVisibleTypes(new Set());
  const applyPreset = (types: string[]) => {
    setVisibleTypes(new Set(types.filter(t => availableTypes.includes(t))));
  };
  const toggleLocationType = (type: string) => {
    setVisibleTypes(prev => {
      const next = new Set(prev);
      if (next.has(type)) next.delete(type);
      else next.add(type);
      return next;
    });
  };

  const filteredLocations = useMemo(() => {
    const q = search.trim().toLowerCase();
    return (locations as Location[]).filter(l => {
      if (!visibleTypes.has(l.type)) return false;
      if (!q) return true;
      return (
        l.name?.toLowerCase().includes(q) ||
        l.nameMk?.toLowerCase().includes(q) ||
        l.description?.toLowerCase().includes(q) ||
        l.descriptionMk?.toLowerCase().includes(q) ||
        l.type?.toLowerCase().includes(q)
      );
    });
  }, [visibleTypes, search]);

  const openLocation = (location: Location) => {
    setSelected(location);
    setSheetOpen(true);
    const url = new URL(window.location.href);
    url.searchParams.set('location', location.id);
    window.history.replaceState({}, '', url.toString());
  };

  const handleSheetOpenChange = (open: boolean) => {
    setSheetOpen(open);
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
    const found = (locations as Location[]).find(l => l.id === id);
    if (found) {
      setSelected(found);
      setSheetOpen(true);
      // ensure its type is visible
      setVisibleTypes(prev => (prev.has(found.type) ? prev : new Set(prev).add(found.type)));
    }
  }, []);

  const noVisible = filteredLocations.length === 0;

  return (
    <div className="w-full min-h-[calc(100vh-3.5rem)] bg-background">
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
            onToggle={toggleLocationType}
            onSelectAll={selectAllTypes}
            onDeselectAll={deselectAllTypes}
          />

          <div className="flex-1 min-w-0">
            <div className="glass-panel overflow-hidden">
              <div className="relative">
                <img
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

            <MobileFilters
              availableTypes={availableTypes}
              visibleTypes={visibleTypes}
              onToggle={toggleLocationType}
              onSelectAll={selectAllTypes}
              onDeselectAll={deselectAllTypes}
            />
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
        location={selected}
        open={sheetOpen}
        onOpenChange={handleSheetOpenChange}
      />
    </div>
  );
};

export default CustomMap;
