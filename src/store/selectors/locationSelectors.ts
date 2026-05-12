import { LOCATION_TYPES, LOCATION_TYPE_ORDER } from '@/constants/locationTypes';

// Utility functions for processing location data
export const getAvailableTypes = (locations: any[]) => {
  return Array.from(new Set(locations.map(location => location.type)))
    .filter((type): type is keyof typeof LOCATION_TYPES => !!LOCATION_TYPES[type])
    .sort((a, b) => {
      const ai = LOCATION_TYPE_ORDER.indexOf(a);
      const bi = LOCATION_TYPE_ORDER.indexOf(b);
      const aRank = ai === -1 ? Number.POSITIVE_INFINITY : ai;
      const bRank = bi === -1 ? Number.POSITIVE_INFINITY : bi;
      if (aRank !== bRank) return aRank - bRank;
      return (LOCATION_TYPES[a]?.label || a).localeCompare(LOCATION_TYPES[b]?.label || b);
    });
};

export const getFilteredLocations = (locations: any[], visibleTypes: string[], searchQuery: string) => {
  return locations.filter(location => {
    const matchesType = visibleTypes.includes(location.type);
    const matchesSearch = searchQuery === '' || 
      location.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      location.nameMk?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      location.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      location.descriptionMk?.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesType && matchesSearch;
  });
};

export const getLocationCountsByType = (locations: any[]) => {
  return locations.reduce((counts, location) => {
    counts[location.type] = (counts[location.type] || 0) + 1;
    return counts;
  }, {} as Record<string, number>);
};
