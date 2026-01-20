import { getTranslations, setRequestLocale } from 'next-intl/server';
import experiences from '@/app/data/experiences';
import { PageHeader } from '@/app/components/page-header';
import { Title } from '@/app/components/title';
import { Experience } from '@/app/components/experience';

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function InfoPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations('info');

  const cvFileName = locale === 'fr' ? 'CV-Pierre-Payet-dev-fullstack-typescript-nodejs-FR.pdf' : 'CV-Pierre-Payet-dev-fullstack-typescript-nodejs-EN.pdf';

  return (
    <main className="px-4 md:px-0">
      <PageHeader title={t('title')} />
      <section className="pb-8 prose prose-lg">
        <p>{t('paragraph1')}</p>
        <p>{t('paragraph2')}</p>
        <p>{t('paragraph3')}</p>
        <p>{t('paragraph4')}</p>
      </section>

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

      <section className="pt-5 pb-16">
        <Title as="h2" variant="secondary" className="mb-4 mt-8">
          {t('experiences')}
        </Title>

        <div className="divide-y divide-slate-200">
          {experiences.map((experience) => (
            <Experience
              key={experience.company}
              company={experience.company}
              roleKey={experience.roleKey}
              startDate={experience.startDate}
              endDate={experience.endDate}
              logo={experience.logo}
              locale={locale}
            />
          ))}
        </div>
      </section>
    </main>
  );
}
