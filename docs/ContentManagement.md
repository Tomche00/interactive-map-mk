# Content Management Guide

## 📋 Overview

This guide provides streamlined workflows for adding new locations and managing translations in the Macedonia Explorer application.

## 🗺️ Adding New Locations

### Quick Method
Add entries directly to `src/data/locations.json`:

```json
{
  "id": "skopje_new",
  "name": "New Skopje District", 
  "nameMk": "Нов Скопски Дистрикт",
  "lat": 41.9981,
  "lng": 21.4254,
  "type": "city",
  "description": "Modern district with cultural amenities and green spaces",
  "descriptionMk": "Модерен дистрикт со културни удобства и зелени површини"
}
```

### Batch Method
For multiple locations, use array format:

```json
[
  {
    "id": "location_1",
    "name": "First Location",
    "nameMk": "Прва Локација",
    "lat": 41.1234,
    "lng": 20.8567,
    "type": "village",
    "description": "Scenic village in the mountains",
    "descriptionMk": "Селско во планините"
  },
  {
    "id": "location_2", 
    "name": "Second Location",
    "nameMk": "Втора Локација",
    "lat": 41.5678,
    "lng": 21.2345,
    "type": "monument",
    "description": "Historical monument with ancient architecture",
    "descriptionMk": "Историски споменик со античка архитектура"
  }
]
```

## 🌐 Translation Management

### Auto-Translation Support
The application automatically detects and uses translations based on these fields:

- **`name`** - English name of location
- **`nameMk`** - Macedonian name of location  
- **`description`** - English description
- **`descriptionMk`** - Macedonian description

### Translation File Structure
Translations are stored in `src/i18n/translations.ts`:

```typescript
export const translations = {
  en: {
    map: {
      filters: "Filters",
      search: "Search locations...",
      clearSearch: "Clear search",
      // ... more translations
    },
    types: {
      city: "Cities",
      monument: "Monuments", 
      // ... more type translations
    }
  },
  mk: {
    map: {
      filters: "Филтри",
      search: "Пребарај локации...",
      clearSearch: "Исчисти пребарување",
      // ... more translations
    },
    types: {
      city: "Градови",
      monument: "Споменици",
      // ... more type translations
    }
  }
};
```

### Adding New Translations
When adding new location types, update the translations:

```typescript
// Add new type to both languages
types: {
  city: "Cities",
  monument: "Monuments",
  newType: "New Location Type",  // Add to both en and mk
}
```

## 📝 Location Data Structure

### Required Fields
Each location object must include:

| Field | Type | Required | Description |
|--------|------|----------|-------------|
| id | string | ✅ | Unique identifier |
| name | string | ✅ | English name |
| nameMk | string | ❌ | Macedonian name (optional) |
| lat | number | ✅ | Latitude coordinate |
| lng | number | ✅ | Longitude coordinate |
| type | string | ✅ | Location type (must exist in LOCATION_TYPES) |
| description | string | ❌ | English description (optional) |
| descriptionMk | string | ❌ | Macedonian description (optional) |
| coordinates | array | ❌ | Alternative to lat/lng (optional) |

### Optional Fields
| Field | Type | Description |
|--------|------|-------------|
| website | string | Official website URL |
| phone | string | Contact phone number |
| email | string | Contact email |
| openingHours | string | Business hours |
| entranceFee | number | Entry fee amount |
| features | array | List of amenities/features |
| photos | array | Photo URLs with captions |
| tags | array | Search-friendly keywords |

## 🔄 Workflow Automation

### Pre-commit Validation
```bash
# Validate location data format
npm run validate:locations

# Check for missing required fields
npm run check:location-fields

# Validate coordinate ranges for Macedonia
npm run validate:coordinates
```

### Content Scripts
Add to `package.json`:

```json
{
  "scripts": {
    "validate:locations": "node scripts/validateLocations.js",
    "check:location-fields": "node scripts/checkLocationFields.js", 
    "validate:coordinates": "node scripts/validateCoordinates.js",
    "add:location": "node scripts/addLocation.js",
    "bulk:import": "node scripts/bulkImportLocations.js"
  }
}
```

## 🎯 Best Practices

### Location Guidelines
- **Unique IDs**: Use descriptive, URL-friendly identifiers
- **Accurate Coordinates**: Verify lat/lng within Macedonia bounds
- **Complete Information**: Provide useful descriptions and contact details
- **Type Consistency**: Use predefined types from LOCATION_TYPES
- **Translation Ready**: Include nameMk for Macedonian support

### Translation Guidelines
- **Consistent Keys**: Use existing translation keys
- **Cultural Sensitivity**: Ensure accurate Macedonian translations
- **Contextual Translations**: Consider location context in descriptions
- **Review Process**: Have translations reviewed by native speakers

## 🛠️ Quality Assurance

### Validation Rules
```javascript
// Coordinate validation for Macedonia
const MACEDONIA_BOUNDS = {
  minLat: 40.8,
  maxLat: 42.4,
  minLng: 20.4,
  maxLng: 23.0
};

function validateCoordinates(lat, lng) {
  if (lat < MACEDONIA_BOUNDS.minLat || lat > MACEDONIA_BOUNDS.maxLat ||
      lng < MACEDONIA_BOUNDS.minLng || lng > MACEDONIA_BOUNDS.maxLng) {
    throw new Error(`Coordinates ${lat}, ${lng} are outside Macedonia bounds`);
  }
  return true;
}
```

### Content Review Checklist
- [ ] All required fields present
- [ ] Coordinates within valid ranges
- [ ] Location type exists in system
- [ ] English name provided
- [ ] Macedonian translation reviewed (if applicable)
- [ ] No duplicate IDs
- [ ] Valid JSON format

## 📊 Analytics Integration

### Location Metrics
Track these metrics for new locations:
- **Addition frequency**: How often new locations are added
- **Type distribution**: Most popular location types
- **Geographic coverage**: Areas with high/low density
- **Translation usage**: Which languages need more support

## 🚀 Advanced Features

### Bulk Import
Support for importing location data from:
- **CSV files** with column mapping
- **Google Sheets** integration
- **External APIs** for location data
- **Excel files** with coordinate conversion

### Image Management
- **Bulk upload** with automatic optimization
- **CDN integration** for location photos
- **Automatic resizing** and compression
- **Alt text generation** for accessibility

---

## 🎯 Getting Started

### 1. Add Single Location
```bash
npm run add:location --id="new_location" --name="New Location" --type="city"
```

### 2. Add Multiple Locations
```bash
npm run bulk:import --file="locations.csv" --type="village"
```

### 3. Validate Data
```bash
npm run validate:locations
npm run check:location-fields
```

This streamlined approach reduces friction in adding and translating content while maintaining data quality and consistency.
