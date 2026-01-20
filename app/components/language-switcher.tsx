'use client';

import { useLocale } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/navigation';
import { locales, type Locale } from '@/i18n/config';

const localeLabels: Record<Locale, { flag: string; label: string }> = {
  fr: { flag: '🇫🇷', label: 'Français' },
  en: { flag: '🇬🇧', label: 'English' },
};

interface LanguageSwitcherProps {
  /** Additional CSS classes */
  className?: string;
}

export function LanguageSwitcher({ className = '' }: LanguageSwitcherProps) {
  const currentLocale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();

  const handleLocaleChange = (newLocale: Locale) => {
    if (newLocale !== currentLocale) {
      router.replace(pathname, { locale: newLocale });
    }
  };

  return (
    <div
      className={`inline-flex items-center gap-0.5 rounded-md bg-slate-100 p-0.5 ${className}`}
      role="group"
      aria-label="Language selection"
    >
      {locales.map((locale) => {
        const isActive = locale === currentLocale;
        const { flag, label } = localeLabels[locale];

        return (
          <button
            key={locale}
            type="button"
            onClick={() => handleLocaleChange(locale)}
            className={`
              px-2 py-1
              rounded
              text-base
              transition-all duration-200
              cursor-pointer
              ${isActive
                ? 'bg-white shadow-sm'
                : 'opacity-50 hover:opacity-80 hover:bg-slate-50'
              }
            `}
            aria-label={label}
            aria-pressed={isActive}
            title={label}
          >
            <span role="img" aria-hidden="true">
              {flag}
            </span>
          </button>
        );
      })}
    </div>
  );
}
