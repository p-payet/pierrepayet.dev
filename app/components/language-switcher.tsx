'use client';

import { useLocale } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/navigation';
import { locales, type Locale } from '@/i18n/config';

const localeLabels: Record<Locale, { flag: string; label: string }> = {
  fr: { flag: '🇫🇷', label: 'Français' },
  en: { flag: '🇬🇧', label: 'English' },
};

interface LanguageSwitcherProps {
  /** Display mode: 'compact' shows only flag, 'full' shows flag + label */
  mode?: 'compact' | 'full';
  /** Additional CSS classes */
  className?: string;
}

export function LanguageSwitcher({
  mode = 'compact',
  className = '',
}: LanguageSwitcherProps) {
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();

  const handleLocaleChange = (newLocale: Locale) => {
    if (newLocale !== locale) {
      router.replace(pathname, { locale: newLocale });
    }
  };

  // Get the other locale to switch to
  const otherLocale = locales.find((l) => l !== locale) as Locale;
  const otherLocaleInfo = localeLabels[otherLocale];

  return (
    <button
      type="button"
      onClick={() => handleLocaleChange(otherLocale)}
      className={`
        inline-flex items-center gap-1.5
        px-2 py-1
        rounded-md
        text-sm font-mono font-semibold
        text-slate-700
        hover:bg-slate-100
        transition-colors duration-200
        cursor-pointer
        ${className}
      `}
      aria-label={`Switch to ${otherLocaleInfo.label}`}
      title={`Switch to ${otherLocaleInfo.label}`}
    >
      <span className="text-base" role="img" aria-hidden="true">
        {otherLocaleInfo.flag}
      </span>
      {mode === 'full' && (
        <span className="text-slate-950">{otherLocaleInfo.label}</span>
      )}
    </button>
  );
}
