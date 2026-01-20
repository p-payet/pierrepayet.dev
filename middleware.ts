import createMiddleware from 'next-intl/middleware';
import { locales, defaultLocale } from './i18n/config';

export default createMiddleware({
  // List of all supported locales
  locales,

  // Default locale when no locale is detected
  defaultLocale,

  // Enable automatic locale detection based on Accept-Language header
  localeDetection: true,

  // Prefix the default locale in the URL (e.g., /fr/... for French)
  localePrefix: 'always',
});

export const config = {
  // Match all pathnames except:
  // - API routes (/api/...)
  // - Next.js internals (/_next/...)
  // - Static files (files with extensions like .png, .jpg, .ico, etc.)
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
};
