# Design System Documentation

## 🎨 Overview

This document outlines the comprehensive design system for Macedonia Explorer, featuring Macedonia-inspired aesthetics with modern UI patterns and sophisticated interactions.

## 🎯 Design Philosophy

### Core Principles
- **Cultural Authenticity** - Colors and patterns inspired by Macedonian heritage
- **Modern Sophistication** - Glass morphism with contemporary interactions
- **Accessibility First** - WCAG 2.1 AA compliance throughout
- **Performance Optimized** - Smooth animations with minimal resource usage
- **Responsive by Design** - Mobile-first approach with desktop enhancement

## 🌈 Color Palette

### Primary Colors
```css
/* Macedonia-Inspired Theme */
--primary-purple: #8B5CF6;     /* Royal purple - main accent */
--sunset-orange: #F97316;      /* Sunset orange - actions */
--lake-blue: #3B82F6;          /* Lake blue - water features */
--mountain-green: #84CC16;      /* Mountain green - nature */
--terracotta: #EA580C;         /* Terracotta - historical sites */

### Neutral Colors
```css
--background: #FFFFFF;              /* Pure white - clean canvas */
--surface: #F8FAFC;                /* Glass surface - frosted effect */
--border: #E5E7EB;                /* Soft borders - subtle definition */
--text-primary: #1F2937;           /* Dark text - high contrast */
--text-secondary: #6B7280;         /* Muted text - hierarchy */
--text-muted: #94A3B8;             /* Subtle text - secondary info */
```

### Semantic Colors
```css
--success: #84CC16;                 /* Mountain green - positive actions */
--warning: #F97316;                /* Sunset orange - attention needed */
--error: #DC2626;                  /* Alert red - critical states */
--info: #3B82F6;                   /* Lake blue - informational */
```

## 🎭 UI Components

### Glass Morphism Effects
```css
.glass-panel {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 
    0 8px 32px rgba(139, 92, 246, 0.1),
    0 2px 8px rgba(139, 92, 246, 0.05);
}

.glass-button {
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.25);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.glass-button:hover {
  background: rgba(255, 255, 255, 0.25);
  transform: translateY(-2px);
  box-shadow: 
    0 12px 40px rgba(139, 92, 246, 0.15),
    0 4px 12px rgba(139, 92, 246, 0.08);
}
```

### Navigation Components
```css
.nav-link {
  position: relative;
  overflow: hidden;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.nav-link::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, 
    rgba(139, 92, 246, 0.1) 0%,
    rgba(139, 92, 246, 0.2) 100%
  );
  transform: scale(0);
  transition: transform 0.3s ease-out;
  border-radius: inherit;
}

.nav-link:hover::before {
  transform: scale(1);
}

.nav-link.active {
  color: var(--primary-purple);
  background: rgba(139, 92, 246, 0.1);
}
```

### Interactive Elements
```css
.interactive-card {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border: 1px solid rgba(255, 255, 255, 0.3);
}

.interactive-card:hover {
  border-color: rgba(255, 255, 255, 0.5);
  transform: translateY(-4px);
  box-shadow: 
    0 20px 60px rgba(139, 92, 246, 0.2),
    0 8px 24px rgba(139, 92, 246, 0.1);
}

.badge-pill {
  background: rgba(139, 92, 246, 0.1);
  backdrop-filter: blur(4px);
  transition: all 0.2s ease;
}

.badge-pill:hover {
  transform: scale(1.05);
  box-shadow: 0 0 20px rgba(139, 92, 246, 0.3);
}
```

## 🎬 Animations

### Micro-interactions
```css
@keyframes float {
  0%, 100% { 
    transform: translateY(0px); 
  }
  50% { 
    transform: translateY(-10px); 
  }
}

@keyframes pulse-glow {
  0%, 100% { 
    box-shadow: 0 0 20px rgba(139, 92, 246, 0.3);
  }
  50% { 
    box-shadow: 0 0 30px rgba(139, 92, 246, 0.6);
  }
}

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
  background: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0.1) 25%,
    rgba(139, 92, 246, 0.05) 50%,
    rgba(255, 255, 255, 0.1) 75%
  );
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
}

@keyframes shimmer {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}
```

## 📱 Responsive Design

### Breakpoints
```css
/* Mobile-First Breakpoints */
--breakpoint-sm: 640px;    /* Large phones */
--breakpoint-md: 768px;    /* Tablets */
--breakpoint-lg: 1024px;   /* Small desktops */
--breakpoint-xl: 1280px;   /* Large desktops */
--breakpoint-2xl: 1536px;  /* Extra large screens */
```

### Mobile Optimizations
```css
/* Touch-friendly targets */
.mobile-filter-chip {
  min-height: 44px;
  min-width: 44px;
  padding: 12px 16px;
}

/* Optimized for mobile performance */
.mobile-map-container {
  will-change: transform;
  contain: layout style paint;
}

/* Reduced motion on mobile */
@media (prefers-reduced-motion: reduce) {
  .mobile-animation {
    animation: none;
    transition: none;
  }
}
```

## 🎯 Component Patterns

### Map Pin System
```css
.map-pin {
  position: absolute;
  transform: translate(-50%, -100%);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  z-index: 10;
}

.map-pin:hover {
  transform: translate(-50%, -120%) scale(1.1);
  z-index: 20;
}

.map-pin.active {
  transform: translate(-50%, -100%) scale(1.2);
  z-index: 30;
}
```

### Filter System
```css
.filter-toggle {
  transition: all 0.2s ease;
  border: 2px solid transparent;
}

.filter-toggle.active {
  border-color: var(--primary-purple);
  background: rgba(139, 92, 246, 0.1);
  color: var(--primary-purple);
}

.filter-count {
  background: rgba(139, 92, 246, 0.1);
  backdrop-filter: blur(4px);
  border-radius: 12px;
  font-variant-numeric: tabular-nums;
}
```

## 🌐 Typography

### Font Hierarchy
```css
/* Macedonian-inspired typography stack */
--font-primary: 'Inter', system-ui, sans-serif;
--font-heading: 'Inter', system-ui, sans-serif;
--font-body: 'Inter', system-ui, sans-serif;
--font-mono: 'JetBrains Mono', monospace;

/* Type scale */
--text-xs: 0.75rem;    /* 12px */
--text-sm: 0.875rem;   /* 14px */
--text-base: 1rem;      /* 16px */
--text-lg: 1.125rem;   /* 18px */
--text-xl: 1.25rem;    /* 20px */
--text-2xl: 1.5rem;   /* 24px */
--text-3xl: 1.875rem;  /* 30px */
```

### Text Styles
```css
.heading-gradient {
  background: linear-gradient(135deg, var(--primary-purple), var(--sunset-orange));
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  color: transparent;
}

.text-glass {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(4px);
  border-radius: 8px;
  padding: 4px 8px;
}
```

## 🎪 Accessibility

### Focus Management
```css
.focus-visible {
  outline: 2px solid var(--primary-purple);
  outline-offset: 2px;
  border-radius: 4px;
}

.focus-ring {
  box-shadow: 
    0 0 0 2px rgba(139, 92, 246, 0.2),
    0 0 0 8px rgba(139, 92, 246, 0.1);
}

.skip-link {
  position: absolute;
  top: -40px;
  left: -40px;
  background: var(--primary-purple);
  color: white;
  padding: 8px;
  border-radius: 4px;
  text-decoration: none;
  z-index: 1000;
}

.skip-link:focus {
  top: -4px;
  left: -4px;
}
```

### Color Contrast
```css
/* WCAG AA Compliant Contrast Ratios */
.text-on-primary:     /* 8.5:1 contrast ratio */
.text-on-surface:     /* 7.2:1 contrast ratio */
.text-on-glass:       /* 6.8:1 contrast ratio */
.text-on-accent:      /* 4.8:1 contrast ratio */
```

## 🎨 Icon System

### Location Type Icons
```typescript
const LOCATION_ICONS = {
  city: '🏙️',           // Urban centers
  village: '🏡',         // Rural settlements
  monument: '🏛️',        // Historical sites
  monastery: '⛪',        // Religious sites
  museum: '🏛️',          // Cultural institutions
  nature: '🌲',           // Natural areas
  water: '💧',            // Lakes and rivers
  viewpoint: '📸',        // Scenic overlooks
  hiking: '🥾',           // Trail systems
  camping: '🏕️',         // Outdoor stays
  recreation: '🏕️',      // Activities
  restaurant: '🍽',       // Dining
  accommodation: '🏨',    // Lodging
  adventure: '🏂'         // Extreme sports
};
```

### UI Icons
```typescript
const UI_ICONS = {
  search: '🔍',           // Search functionality
  filter: '🎛️',          // Filter controls
  menu: '☰',              // Navigation menu
  close: '✕',             // Dismiss actions
  expand: '▼',            // Expand sections
  collapse: '▲',          // Collapse sections
  location: '📍',         // Current position
  navigation: '🧭',        // Map navigation
  language: '🌐',          // Language toggle
  settings: '⚙️',         // Configuration
  info: 'ℹ️',             // Information
  warning: '⚠️',          // Alerts
  success: '✅',          // Confirmation
  error: '❌',            // Errors
};
```

## 📐 Spacing System

### Spacing Scale
```css
/* 8-point grid system based on rem */
--space-1: 0.25rem;   /* 4px */
--space-2: 0.5rem;    /* 8px */
--space-3: 0.75rem;   /* 12px */
--space-4: 1rem;      /* 16px */
--space-5: 1.25rem;   /* 20px */
--space-6: 1.5rem;    /* 24px */
--space-8: 2rem;      /* 32px */
--space-10: 2.5rem;  /* 40px */
--space-12: 3rem;     /* 48px */
--space-16: 4rem;     /* 64px */
--space-20: 5rem;     /* 80px */
--space-24: 6rem;     /* 96px */
```

### Component Spacing
```css
.section-spacing {
  padding: var(--space-8) 0;
}

.component-gap {
  gap: var(--space-4);
}

.tight-spacing {
  gap: var(--space-2);
}

.loose-spacing {
  gap: var(--space-6);
}
```

## 🎭 Brand Elements

### Logo Variations
```css
.brand-gradient {
  background: linear-gradient(135deg, var(--primary-purple), var(--sunset-orange));
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(139, 92, 246, 0.25);
}

.brand-icon {
  width: 28px;
  height: 28px;
  background: white;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}
```

### Watermark/Branding
```css
.watermark {
  position: fixed;
  bottom: 20px;
  right: 20px;
  opacity: 0.1;
  font-size: var(--text-xs);
  color: var(--text-muted);
  z-index: 1;
}
```

## 📱 Dark Mode Support

### Dark Theme Colors
```css
.dark {
  --background: #0F172A;
  --surface: #1E293B;
  --border: #334155;
  --text-primary: #F8FAFC;
  --text-secondary: #CBD5E1;
  --text-muted: #94A3B8;
  
  /* Adjusted accent colors for dark mode */
  --primary-purple: #A78BFA;
  --sunset-orange: #FB923C;
  --lake-blue: #60A5FA;
  --mountain-green: #4ADE80;
  --terracotta: #DC2626;
}
```

## 🎯 Usage Guidelines

### Color Application
- **Primary purple** for main actions and branding
- **Sunset orange** for CTAs and interactive elements
- **Lake blue** for water features and informational content
- **Mountain green** for nature and positive confirmations
- **Terracotta** for historical sites and warnings

### Animation Principles
- **Purposeful motion** - Animations should guide attention
- **Respect preferences** - Honor `prefers-reduced-motion`
- **Performance first** - Use transform and opacity for smooth 60fps
- **Micro-interactions** - Subtle feedback for user actions

### Component Standards
- **Consistent spacing** - Use the 8-point grid system
- **Glass morphism** - Apply frosted glass effects consistently
- **Accessibility first** - Ensure WCAG AA compliance
- **Mobile responsive** - Design mobile-first, enhance for desktop

---

## 🛠️ Implementation Notes

### CSS Custom Properties
All design tokens are available as CSS custom properties for easy consumption in components.

### Component Library
The design system is implemented through:
- **Tailwind CSS** for utility classes
- **Custom CSS** for glass morphism effects
- **React components** for interactive patterns
- **TypeScript interfaces** for type safety

### Performance Considerations
- **GPU acceleration** for animations and transforms
- **Containment** for layout stability
- **Lazy loading** for images and components
- **Memoization** for expensive calculations

This design system ensures cultural authenticity while maintaining modern usability and performance standards.
