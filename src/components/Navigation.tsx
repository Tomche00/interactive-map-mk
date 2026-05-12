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
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-purple-600 pointer-events-none z-10" />
      <Input
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={t.map.search}
        aria-label={t.map.search}
        className="bg-white/90 backdrop-blur-sm border border-purple-200 rounded-lg pl-10 pr-10 h-9 text-sm text-foreground placeholder:text-muted-foreground focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 focus:outline-none transition-all duration-200"
      />
      {query && (
        <button
          type="button"
          onClick={() => setQuery('')}
          aria-label={t.map.clearSearch}
          className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded-md text-muted-foreground hover:text-purple-600 hover:bg-purple-50 transition-all duration-200 z-10"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      )}
    </div>
  );

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/10 backdrop-blur-xl border-b border-white/20 shadow-lg">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center h-14 gap-3">
          <Link to="/" className="flex items-center gap-2 group shrink-0">
            <div className="w-7 h-7 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-purple-500/25">
              <MapPin className="w-4 h-4 text-white" />
            </div>
            <span className="font-semibold text-sm text-foreground tracking-tight hidden sm:inline group-hover:text-purple-600 transition-colors duration-300">
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
                    'relative px-4 py-2 text-sm font-medium transition-all duration-300 rounded-lg overflow-hidden group',
                    location.pathname === item.href
                      ? 'text-purple-600 bg-purple-500/10'
                      : 'text-muted-foreground hover:text-purple-600'
                  )}
                >
                  <span className="relative z-10">{item.label}</span>
                  <div className="absolute inset-0 bg-purple-500/10 transform scale-0 group-hover:scale-100 transition-transform duration-300 ease-out origin-center"></div>
                </Link>
              ))}
              <button
                onClick={toggleLanguage}
                className="ml-2 w-8 h-8 rounded-xl flex items-center justify-center border border-white/30 bg-white/20 backdrop-blur-md hover:bg-white/30 hover:shadow-lg hover:shadow-purple-500/15 transition-all duration-300 overflow-hidden group relative"
                aria-label={language === 'en' ? 'Switch to Macedonian' : 'Префрли на Англиски'}
                title={language === 'en' ? 'Switch to Macedonian' : 'Префрли на Англиски'}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-purple-600/20 transform scale-0 group-hover:scale-100 transition-transform duration-300 ease-out origin-center rounded-xl"></div>
                <img src={language === 'en' ? flagEn : flagMk} alt={language === 'en' ? 'EN' : 'MK'} className="w-5 h-5 object-contain relative z-10" />
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
              className="p-2 rounded-lg text-muted-foreground hover:text-purple-600 transition-all duration-300 overflow-hidden group relative"
              aria-label="Toggle menu"
            >
              <div className="absolute inset-0 bg-purple-500/10 transform scale-0 group-hover:scale-100 transition-transform duration-300 ease-out rounded-lg"></div>
              <span className="relative z-10">
                {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
              </span>
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
