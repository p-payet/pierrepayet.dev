import '@/app/assets/globals.css';
import { Metadata } from 'next';
import Link from 'next/link';
import localFont from 'next/font/local';
import { JetBrains_Mono } from 'next/font/google';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import clsx from 'clsx';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { Navbar } from '@/app/components/navbar';
import { MobileNavbar } from '@/app/components/mobile-navbar';
import { routing } from '@/i18n/routing';
import { Locale } from '@/i18n/config';

const SaansFont = localFont({
  src: '../saans-font.woff2',
  display: 'swap',
});

const JetBrainsMonoFont = JetBrains_Mono({
  display: 'swap',
  variable: '--font-monospace',
  subsets: ['latin'],
  preload: false,
});

const websiteUrl = 'https://pierrepayet.dev';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const validLocale = routing.locales.includes(locale as Locale)
    ? (locale as Locale)
    : routing.defaultLocale;
  const messages = await getMessages({ locale: validLocale });
  const metadata = messages.metadata as {
    title: string;
    description: string;
    jobTitle: string;
  };

  const title = metadata.title;
  const description = metadata.description;

  return {
    title,
    description,
    twitter: {
      card: 'summary_large_image',
      images: ['/og.png'],
      title,
    },
    openGraph: {
      title,
      images: [
        {
          url: '/og.png',
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      siteName: title,
    },
    metadataBase: new URL(websiteUrl),
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;

  // Validate that the incoming locale is valid
  if (!routing.locales.includes(rawLocale as Locale)) {
    notFound();
  }

  const locale = rawLocale as Locale;

  // Enable static rendering
  setRequestLocale(locale);

  // Get messages for the current locale
  const messages = await getMessages();

  const metadata = messages.metadata as {
    title: string;
    description: string;
    jobTitle: string;
  };

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Pierre Payet',
    image: `${websiteUrl}/pierre-payet.jpg`,
    url: websiteUrl,
    jobTitle: metadata.jobTitle,
    sameAs: [
      'https://github.com/p-payet',
      'https://www.linkedin.com/in/pierre-payet-457476136',
    ],
  };

  const creationYear = 2024;
  const currentYear = new Date().getFullYear();

  const footer = messages.footer as {
    viewSource: string;
    shoutout: string;
  };

  return (
    <html lang={locale}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={clsx(
          SaansFont.className,
          JetBrainsMonoFont.variable,
          'bg-slate-50'
        )}
      >
        <NextIntlClientProvider messages={messages}>
          <div className="max-w-2xl lg:max-w-xl mx-auto">
            <Navbar />
            <MobileNavbar />

            {children}
            <footer className="px-4 md:px-0 border-t border-slate-200 py-8 text-slate-700 font-mono text-xs tracking-tight flex justify-between">
              <p>
                © {currentYear !== creationYear ? `${creationYear} - ` : ''}{' '}
                {`${currentYear} /`} Pierre Payet
              </p>
              <p>
                <Link
                  href="https://github.com/p-payet/pierrepayet.dev"
                  target="_blank"
                >
                  {footer.viewSource}
                </Link>
              </p>
              <p>
                <Link href="https://github.com/alexpate/www" target="_blank">
                  {footer.shoutout}
                </Link>
              </p>
            </footer>
          </div>
        </NextIntlClientProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
