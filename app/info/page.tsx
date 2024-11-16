import Link from 'next/link';
import experiences from '@/app/data/experiences';
import { PageHeader } from '@/app/components/page-header';
import { Title } from '@/app/components/title';
import { Experience } from '@/app/components/experience';

export default async function InfoPage() {
  return (
    <main className="px-4 md:px-0">
      <PageHeader title="Information" />
      <section className="pb-8 prose prose-lg">
        <p>
          Je travaille actuellement en tant que développeur web freelance pour
          la Métropole de Lyon. Intégré au sein d&apos;une équipe dynamique, je
          contribue à l&apos;ajout de nouvelles fonctionnalités et à
          l&apos;amélioration continue d&apos;une plateforme utilisée par
          plusieurs centaines de milliers d&apos;utilisateurs.
        </p>

        <p>
          Auparavant, j&apos;ai travaillé chez Euronews en tant que développeur
          back-end. J&apos;ai participé à la migration de l&apos;architecture
          d&apos;Euronews vers AWS et j&apos;ai contribué à l&apos;ajout de
          nouvelles fonctionnalités ainsi qu&apos;à l&apos;amélioration continue
          des outils internes, notamment le CMS utilisé par les journalistes
          pour rédiger et publier leurs articles sur le site web
          d&apos;Euronews.
        </p>

        <p>
          À côté de cela, j&apos;ai effectué plusieurs petites missions
          freelance de développement web. J&apos;aime également développer mes
          propres projets.
        </p>
      </section>

      <section className="pb-16">
        <Title as="h2" variant="secondary" className="mb-4 mt-8">
          Expériences
        </Title>

        <div className="divide-y divide-slate-200">
          {experiences.map((experience) => (
            <Experience
              key={experience.company}
              company={experience.company}
              role={experience.role}
              startDate={experience.startDate}
              endDate={experience.endDate}
              logo={experience.logo}
            />
          ))}
        </div>

        <Link
          href="/info/CV_Pierre_Payet_dev_fullstack.pdf"
          target="_blank"
          className="group bg-slate-950 hover:bg-slate-800 transition-colors inline-block mt-8 font-mono text-xs font-semibold rounded-full px-8 py-3 text-white"
        >
          Voir mon CV détaillé{' '}
          <span className="inline-block group-hover:translate-x-2 transition-transform">
            →
          </span>
        </Link>
      </section>
    </main>
  );
}
