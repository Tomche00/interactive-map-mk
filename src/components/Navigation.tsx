import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { MapPin, Menu, X, Search } from 'lucide-react';
import { useState } from 'react';
import { useLanguage } from '@/i18n/LanguageContext';
import { useSearch } from '@/contexts/SearchContext';
import { Input } from '@/components/ui/input';
import flagEn from '@/assets/flag-en.png';
import flagMk from '@/assets/flag-mk.png';

const Navigation = () => {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const { language, t, toggleLanguage } = useLanguage();
  const { query, setQuery } = useSearch();
  const isMapRoute = location.pathname === '/';

  const navItems = [
    { href: '/', label: t.nav.map },
    { href: '/rent', label: t.nav.rent },
    { href: '/about', label: t.nav.about },
  ];

  const SearchField = ({ compact = false }: { compact?: boolean }) => (
    <div className={cn('relative', compact ? 'w-full' : 'w-full max-w-xs')}>
      <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground pointer-events-none" />
      <Input
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={t.map.search}
        aria-label={t.map.search}
        className="pl-8 pr-8 h-8 text-sm bg-background/60"
      />
      {query && (
        <button
          type="button"
          onClick={() => setQuery('')}
          aria-label={t.map.clearSearch}
          className="absolute right-1.5 top-1/2 -translate-y-1/2 p-1 rounded-md text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
        >
          <X className="w-3 h-3" />
        </button>
      )}
    </div>
  );

  return (
    <nav className="w-full sticky top-0 z-50 backdrop-blur-xl border-b border-accent/10 shadow-sm" style={{ background: 'linear-gradient(135deg, hsl(220 25% 95%), hsl(172 20% 94%))' }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center h-14 gap-3">
          <Link to="/" className="flex items-center gap-2 group shrink-0">
            <div className="w-7 h-7 rounded-lg bg-accent flex items-center justify-center transition-transform group-hover:scale-105">
              <MapPin className="w-4 h-4 text-accent-foreground" />
            </div>
            <span className="font-semibold text-sm text-foreground tracking-tight hidden sm:inline">
              {t.nav.brandName}
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-2 flex-1 justify-end">
            {isMapRoute && <SearchField />}
            <div className="flex items-center gap-0.5">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  className={cn(
                    'px-3 py-1.5 rounded-md text-sm transition-colors',
                    location.pathname === item.href
                      ? 'text-foreground font-medium bg-secondary'
                      : 'text-muted-foreground hover:text-foreground'
                  )}
                >
                  {item.label}
                </Link>
              ))}
              <button
                onClick={toggleLanguage}
                className="ml-2 w-8 h-8 rounded-md flex items-center justify-center border border-border hover:bg-secondary transition-colors overflow-hidden"
                aria-label={language === 'en' ? 'Switch to Macedonian' : 'Префрли на Англиски'}
                title={language === 'en' ? 'Switch to Macedonian' : 'Префрли на Англиски'}
              >
                <img src={language === 'en' ? flagEn : flagMk} alt={language === 'en' ? 'EN' : 'MK'} className="w-5 h-5 object-contain" />
              </button>
            </div>
          </div>

          <div className="flex items-center gap-1 md:hidden">
            <button
              onClick={toggleLanguage}
              className="w-8 h-8 flex items-center justify-center overflow-hidden"
              aria-label={language === 'en' ? 'Switch to Macedonian' : 'Префрли на Англиски'}
              title={language === 'en' ? 'Switch to Macedonian' : 'Префрли на Англиски'}
            >
              <img src={language === 'en' ? flagEn : flagMk} alt={language === 'en' ? 'EN' : 'MK'} className="w-5 h-5 object-contain" />
            </button>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="p-2 text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>

        {isMapRoute && (
          <div className="md:hidden pb-2">
            <SearchField compact />
          </div>
        )}
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t border-border bg-background">
          <div className="px-4 py-2 space-y-0.5">
            {navItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  'block px-3 py-2 rounded-md text-sm transition-colors',
                  location.pathname === item.href
                    ? 'text-foreground font-medium bg-secondary'
                    : 'text-muted-foreground hover:text-foreground'
                )}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
