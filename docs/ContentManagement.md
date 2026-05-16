# Content Architecture & Localization Guide

## 📋 Overview

This document defines the content structure, localization workflow, and validation standards used in Macedonia Explorer.

The system is designed to support:
- Structured geospatial content
- Multi-language location metadata
- Scalable content ingestion workflows
- Automated validation and consistency checks

## 🗺️ Location Management

### Content Workflow

Locations are managed through a unified content pipeline with built-in localization support.

### Single Location Import

```bash
npm run add:location --id="new_location" --name="New Location" --type="city"
```

### Bulk Import

```bash
npm run bulk:import --file="locations.csv"
```

## 📝 Location Schema

Each location supports localized metadata and structured geospatial attributes.

```json
{
  "id": "skopje_new",
  "name": "New Skopje District",
  "nameMk": "Нов Скопски Дистрикт",
  "lat": 41.9981,
  "lng": 21.4254,
  "type": "city",
  "description": "Modern district with cultural amenities",
  "descriptionMk": "Модерен дистрикт со културни содржини"
}
```

## 🌍 Localization Strategy

### Translation Fields

| Field | Purpose |
|---|---|
| `name` | English location name |
| `nameMk` | Macedonian location name |
| `description` | English description |
| `descriptionMk` | Macedonian description |

### Translation Architecture

Translations are managed through `src/i18n/translations.ts`.

```typescript
export const translations = {
  en: {
    map: {
      filters: "Filters"
    }
  },

  mk: {
    map: {
      filters: "Филтри"
    }
  }
};
```

### Translation Standards

- Maintain consistent translation keys
- Preserve contextual meaning between languages
- Keep terminology aligned across UI and location metadata
- Validate translations during content review

## ⚙️ Content Tooling

### Content Scripts

```json
{
  "scripts": {
    "add:location": "node scripts/addLocation.js",
    "bulk:import": "node scripts/bulkImportLocations.js",
    "validate:locations": "node scripts/validateLocations.js"
  }
}
```

### Validation Commands

```bash
npm run validate:locations
npm run check:location-fields
npm run validate:coordinates
```

## 🧩 Schema Requirements

### Required Fields

| Field | Type |
|---|---|
| `id` | string |
| `name` | string |
| `lat` | number |
| `lng` | number |
| `type` | string |

### Optional Fields

| Field | Type |
|---|---|
| `nameMk` | string |
| `description` | string |
| `descriptionMk` | string |
| `website` | string |
| `phone` | string |
| `photos` | array |
| `features` | array |
| `tags` | array |

## 🔄 Validation Pipeline

### Coordinate Validation

```javascript
const MACEDONIA_BOUNDS = {
  minLat: 40.8,
  maxLat: 42.4,
  minLng: 20.4,
  maxLng: 23.0
};

function validateCoordinates(lat, lng) {
  return (
    lat >= MACEDONIA_BOUNDS.minLat &&
    lat <= MACEDONIA_BOUNDS.maxLat &&
    lng >= MACEDONIA_BOUNDS.minLng &&
    lng <= MACEDONIA_BOUNDS.maxLng
  );
}
```

### Validation Rules

- Unique identifiers required
- Coordinates validated against regional bounds
- Location types must match supported categories
- Invalid schema entries rejected during import
- Translation structure validated during ingestion

## 📦 Bulk Content Operations

### Supported Sources

- CSV imports
- Google Sheets integration
- Structured JSON imports
- External API ingestion pipelines

### Import Considerations

- Coordinate normalization
- Duplicate detection
- Translation mapping
- Schema validation
- Type consistency enforcement

## 🛠️ Content Quality Standards

### Content Guidelines

- Use stable, descriptive identifiers
- Maintain consistent location categorization
- Validate coordinate accuracy
- Avoid duplicate entries
- Ensure localization completeness where applicable

### Review Checklist

- Required fields validated
- Coordinate ranges verified
- Translation structure confirmed
- Type definitions aligned
- JSON structure validated

## 🖼️ Media Management

### Asset Handling

- Optimized image delivery
- Responsive asset sizing
- Accessibility-focused metadata
- CDN-ready media structure

## 🚀 Operational Roadmap

### Current Focus Areas

- Bulk import optimization
- Validation pipeline improvements
- Localization tooling enhancements
- Structured media workflows

### Future Enhancements

- Automated translation workflows
- Headless CMS integration
- Geospatial enrichment pipelines
- Content moderation tooling

---

## 🎯 Quick Start

### Add a Location

```bash
npm run add:location --id="new_location" --name="New Location" --type="city"
```

### Import Content

```bash
npm run bulk:import --file="locations.csv"
```

### Run Validation

```bash
npm run validate:locations
```
