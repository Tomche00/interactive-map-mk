# 🎨 Design System

## 🎯 Overview

This document defines the visual language, interaction patterns, and UI architecture used throughout Macedonia Explorer.

The system is designed around:
- Consistent visual hierarchy
- Scalable component patterns
- Accessibility compliance
- Responsive interaction models
- Performance-aware rendering

## 🌈 Color System

### Core Palette

```css
--primary-purple: #8B5CF6;
--sunset-orange: #F97316;
--lake-blue: #3B82F6;
--mountain-green: #84CC16;
--terracotta: #EA580C;
```

### Neutral Palette

```css
--background: #FFFFFF;
--surface: #F8FAFC;
--border: #E5E7EB;
--text-primary: #1F2937;
--text-secondary: #6B7280;
--text-muted: #94A3B8;
```

### Semantic Tokens

```css
--success: #84CC16;
--warning: #F97316;
--error: #DC2626;
--info: #3B82F6;
```

## 🧩 Design Principles

### Visual Consistency
- Shared design tokens across all UI layers
- Consistent spacing and typography scales
- Predictable interaction behavior

### Accessibility
- WCAG 2.1 AA contrast compliance
- Keyboard navigation support
- Reduced motion support
- Semantic interaction patterns

### Responsive Design
- Mobile-first layout strategy
- Adaptive spacing and navigation
- Touch-friendly interaction targets

### Performance Awareness
- GPU-accelerated transforms
- Minimal layout reflows
- Optimized animation usage
- Controlled rendering complexity

## 🎭 Surface System

### Glass Surface Pattern

```css
.glass-panel {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}
```

### Interactive Surface

```css
.interactive-card {
  transition: transform 0.3s ease;
}

.interactive-card:hover {
  transform: translateY(-4px);
}
```

## 🎬 Motion System

### Motion Principles

- Motion should support usability
- Animations should remain subtle and purposeful
- Interaction feedback should be immediate
- Reduced motion preferences are respected

### Animation Patterns

```css
@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

### Loading States

```css
.loading-skeleton {
  animation: shimmer 1.5s infinite;
}
```

## 📱 Responsive Architecture

### Breakpoints

```css
--breakpoint-sm: 640px;
--breakpoint-md: 768px;
--breakpoint-lg: 1024px;
--breakpoint-xl: 1280px;
--breakpoint-2xl: 1536px;
```

### Mobile Considerations

```css
.mobile-filter-chip {
  min-height: 44px;
  min-width: 44px;
}
```

## 🗺️ Interaction Patterns

### Map Pins

```css
.map-pin {
  position: absolute;
  transform: translate(-50%, -100%);
  transition: transform 0.3s ease;
}

.map-pin:hover {
  transform: translate(-50%, -120%) scale(1.1);
}
```

### Filter Controls

```css
.filter-toggle.active {
  border-color: var(--primary-purple);
  background: rgba(139, 92, 246, 0.1);
}
```

## 🌐 Typography

### Font Stack

```css
--font-primary: 'Inter', system-ui, sans-serif;
--font-mono: 'JetBrains Mono', monospace;
```

### Type Scale

```css
--text-xs: 0.75rem;
--text-sm: 0.875rem;
--text-base: 1rem;
--text-lg: 1.125rem;
--text-xl: 1.25rem;
--text-2xl: 1.5rem;
--text-3xl: 1.875rem;
```

## ♿ Accessibility

### Focus States

```css
.focus-visible {
  outline: 2px solid var(--primary-purple);
  outline-offset: 2px;
}
```

### Reduced Motion

```css
@media (prefers-reduced-motion: reduce) {
  .animated-element {
    animation: none;
    transition: none;
  }
}
```

## 🎨 Icon Strategy

### Location Categories

```typescript
const LOCATION_ICONS = {
  city: '🏙️',
  village: '🏡',
  monument: '🏛️',
  monastery: '⛪',
  nature: '🌲',
  water: '💧',
  hiking: '🥾',
  camping: '🏕️'
};
```

### Interface Icons

```typescript
const UI_ICONS = {
  search: '🔍',
  filter: '🎛️',
  menu: '☰',
  close: '✕',
  navigation: '🧭',
  settings: '⚙️'
};
```

## 📐 Spacing System

### Scale

```css
--space-1: 0.25rem;
--space-2: 0.5rem;
--space-4: 1rem;
--space-6: 1.5rem;
--space-8: 2rem;
--space-12: 3rem;
--space-16: 4rem;
```

### Layout Usage

```css
.section-spacing {
  padding: var(--space-8) 0;
}

.component-gap {
  gap: var(--space-4);
}
```

## 🌙 Dark Mode

### Dark Theme Tokens

```css
.dark {
  --background: #0F172A;
  --surface: #1E293B;
  --border: #334155;
  --text-primary: #F8FAFC;
  --text-secondary: #CBD5E1;
}
```

## 🛠️ Implementation

### Architecture

The design system is implemented using:
- Tailwind CSS utility layers
- CSS custom properties
- Shared component primitives
- Type-safe component interfaces

### Rendering Considerations

- GPU-accelerated transforms
- Controlled animation complexity
- Layout containment where applicable
- Responsive asset handling

## 🎯 Usage Guidelines

### Color Usage

- Purple for primary actions and active states
- Orange for emphasis and interactive highlights
- Blue for informational contexts
- Green for success and nature-related contexts

### Component Standards

- Maintain consistent spacing
- Reuse shared tokens
- Prefer semantic structure
- Avoid inline style duplication
- Respect accessibility constraints

---

## 📋 Maintenance Notes

Design tokens and component primitives should evolve incrementally to maintain visual consistency and minimize UI fragmentation across the application.
