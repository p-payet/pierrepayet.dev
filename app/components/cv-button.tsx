import { getTranslations, setRequestLocale } from 'next-intl/server';

export async function CVButton({ locale }: { locale: string }) {
    setRequestLocale(locale);
    const t = await getTranslations('info');

    const cvFileName = locale === 'fr' ? 'CV-Pierre-Payet-dev-fullstack-typescript-nodejs-FR.pdf' : 'CV-Pierre-Payet-dev-fullstack-typescript-nodejs-EN.pdf';

    return (
        <a
            href={`/info/${cvFileName}`}
            target="_blank"
            rel="noopener noreferrer"
            className="group bg-slate-950 hover:bg-slate-800 transition-colors inline-block font-mono text-xs font-semibold rounded-full px-8 py-3 text-white"
        >
            {t('viewCV')}{' '}
            <span className="inline-block group-hover:translate-x-2 transition-transform">
                →
            </span>
        </a>
    )
}