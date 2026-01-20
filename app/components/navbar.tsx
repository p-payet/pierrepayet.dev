'use client';

import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import { LanguageSwitcher } from './language-switcher';

export function Navbar() {
  const t = useTranslations('navigation');
  const locale = useLocale();

  const menuItems = [
    { title: t('home'), href: `/${locale}` },
    { title: t('info'), href: `/${locale}/info` },
    { title: t('blog'), href: `/${locale}/blog` },
    { title: t('contact'), href: `/${locale}/contact` },
  ];

  return (
    <header className="pt-8 md:pt-16 pb-16 px-4 md:px-0 justify-between hidden sm:flex">
      <Link href={menuItems[0].href}>
        <h1 className="text-base font-mono font-semibold text-slate-950">
          {menuItems[0].title}
        </h1>
      </Link>
      <nav className="flex items-center gap-6">
        {menuItems.slice(1).map((menuItem) => {
          return (
            <Link
              key={menuItem.title}
              href={menuItem.href}
              className="text-950 text-sm tracking-tighter font-mono font-semibold"
            >
              {menuItem.title}
            </Link>
          );
        })}
        <LanguageSwitcher />
      </nav>
    </header>
  );
}
