import '@/app/assets/globals.css';
import { Metadata } from 'next';
import Link from 'next/link';
import localFont from 'next/font/local';
import { JetBrains_Mono } from 'next/font/google';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from "@vercel/speed-insights/next"
import clsx from 'clsx';
import { Navbar } from '@/app/components/navbar';
import { MobileNavbar } from '@/app/components/mobile-navbar';

const SaansFont = localFont({
  src: './saans-font.woff2',
  display: 'swap',
});

const JetBrainsMonoFont = JetBrains_Mono({
  display: 'swap',
  variable: '--font-monospace',
  subsets: ['latin'],
});

const title = 'Pierre Payet - Développeur Fullstack TypeScript / Node.js';
const websiteUrl = 'https://pierrepayet.dev';

export const metadata: Metadata = {
  title,
  description:
    "Pierre Payet - développeur Fullstack TypeScript / Node.js. J'aime concevoir des applications web, avec un fort engagement envers la qualité du code. J'apprécie le développement front-end autant que le back-end.",
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

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Pierre Payet',
  image: `${websiteUrl}/pierre-payet.jpg`,
  url: websiteUrl,
  jobTitle: 'Développeur Fullstack TypeScript / Node.js',
  sameAs: [
    'https://github.com/p-payet',
    'https://www.linkedin.com/in/pierre-payet-457476136',
  ],
};

const menuItems: Array<{
  title: string;
  href: string;
}> = [
    {
      title: 'Accueil',
      href: '/',
    },
    {
      title: 'Information',
      href: '/info',
    },
    {
      title: 'Blog',
      href: '/blog',
    },
    {
      title: 'Contact',
      href: '/contact',
    },
  ];

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const creationYear = 2024;
  const currentYear = new Date().getFullYear();

  return (
    <html lang="fr">
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
        <div className="max-w-2xl lg:max-w-xl mx-auto">
          <Navbar menuItems={menuItems} />
          <MobileNavbar menuItems={menuItems} />

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
                Voir le code source
              </Link>
            </p>
            <p>
              <Link href="https://github.com/alexpate/www" target="_blank">
                S/O Alex Pate
              </Link>
            </p>
          </footer>
        </div>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
