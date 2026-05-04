import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { LOCATION_TYPES } from '@/constants/locationTypes';
import { useLanguage } from '@/i18n/LanguageContext';
import { Navigation2, MapPin, Copy, Apple, Link2 } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import type { Location } from '@/types/location';

interface LocationDetailSheetProps {
  location: Location | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const LocationDetailSheet = ({ location, open, onOpenChange }: LocationDetailSheetProps) => {
  const { language, t } = useLanguage();

  if (!location) return null;

  const config = LOCATION_TYPES[location.type];
  const icon = config?.icon || '📍';
  const color = config?.color || '#60a5fa';
  const typeLabels = t.types as Record<string, string>;
  const label = typeLabels[location.type] || config?.label || location.type;

  const displayName = language === 'mk' && location.nameMk ? location.nameMk : location.name;
  const displayDescription = language === 'mk' && location.descriptionMk ? location.descriptionMk : location.description;
  const coords = `${location.latitude.toFixed(6)}, ${location.longitude.toFixed(6)}`;

  const copy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast({ description: t.map.copied });
    } catch {
      toast({ description: t.map.copied });
    }
  };

  const shareUrl = `${window.location.origin}${window.location.pathname}?location=${encodeURIComponent(location.id)}`;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full sm:max-w-md overflow-y-auto">
        <SheetHeader className="text-left">
          <div
            className="w-full h-32 rounded-lg flex items-center justify-center text-5xl mb-2"
            style={{
              background: `linear-gradient(135deg, ${color}30, ${color}10)`,
              border: `1px solid ${color}40`,
            }}
          >
            <span aria-hidden="true">{icon}</span>
          </div>
          <span
            className="inline-block text-[10px] font-semibold uppercase tracking-widest"
            style={{ color }}
          >
            {label}
          </span>
          <SheetTitle className="text-xl">{displayName}</SheetTitle>
          <SheetDescription className="text-sm leading-relaxed text-muted-foreground">
            {displayDescription}
          </SheetDescription>
        </SheetHeader>

        <div className="mt-6 space-y-4">
          <div className="rounded-lg border border-border p-3">
            <p className="text-[11px] uppercase tracking-widest text-muted-foreground mb-1">
              {t.map.coordinates}
            </p>
            <div className="flex items-center justify-between gap-2">
              <code className="text-xs tabular-nums text-foreground">{coords}</code>
              <Button
                variant="ghost"
                size="sm"
                className="h-7 px-2"
                onClick={() => copy(coords)}
                aria-label={t.map.copyCoords}
              >
                <Copy className="w-3.5 h-3.5" />
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-2">
            <Button
              className="w-full justify-start"
              onClick={() =>
                window.open(
                  `https://maps.google.com/maps?q=${location.latitude},${location.longitude}&z=15`,
                  '_blank'
                )
              }
            >
              <Navigation2 className="w-4 h-4 mr-2" />
              {t.map.openGoogle}
            </Button>
            <Button
              variant="secondary"
              className="w-full justify-start"
              onClick={() =>
                window.open(
                  `https://maps.apple.com/?q=${encodeURIComponent(displayName)}&ll=${location.latitude},${location.longitude}`,
                  '_blank'
                )
              }
            >
              <Apple className="w-4 h-4 mr-2" />
              {t.map.openApple}
            </Button>
            <Button
              variant="outline"
              className="w-full justify-start"
              onClick={() => copy(shareUrl)}
            >
              <Link2 className="w-4 h-4 mr-2" />
              {t.map.copyLink}
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start"
              onClick={() => copy(coords)}
            >
              <MapPin className="w-4 h-4 mr-2" />
              {t.map.copyCoords}
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};
