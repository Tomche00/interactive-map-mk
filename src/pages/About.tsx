import { Mail, Phone, Globe } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';

const About = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-[calc(100vh-3.5rem)]">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 pt-12 pb-16">
        <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-foreground mb-8">
          {t.about.title}
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <div className="space-y-6">
            <div className="section-card">
              <h2 className="text-base font-medium text-foreground mb-2">{t.about.missionTitle}</h2>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {t.about.missionText}
              </p>
            </div>

            <div className="section-card">
              <h2 className="text-base font-medium text-foreground mb-2">{t.about.offerTitle}</h2>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {t.about.offerText}
              </p>
            </div>
          </div>

          <div className="section-card">
            <h2 className="text-base font-medium text-foreground mb-4">{t.about.contactTitle}</h2>
            <div className="space-y-3">
              <a href="mailto:info@macedoniaexplorer.com" className="flex items-center gap-3 text-sm text-muted-foreground hover:text-foreground transition-colors">
                <Mail className="w-4 h-4" />
                <span>info@macedoniaexplorer.com</span>
              </a>
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <Phone className="w-4 h-4" />
                <span>+389 2 XXX XXX</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <Globe className="w-4 h-4" />
                <span>Скопје, Северна Македонија</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
