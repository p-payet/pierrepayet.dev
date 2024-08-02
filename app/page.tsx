import Link from 'next/link';
import Image from 'next/image';

import { ArticleLink } from './components/article-link';
import clsx from 'clsx';
import { getAllPosts } from '@/lib/articles';
import { Title } from '@/app/components/title';
import { Avatar } from './components/avatar';

const projects: {
  href?: string;
  title: string;
  description: string;
  image: string;
  technos: Array<string>;
}[] = [
  {
    title: 'Document Corrector',
    href: 'https://www.document-corrector.com/',
    description:
      "Corrige l'orthographe et la grammaire de documents en utilisant l'AI.",
    image: '/document-corrector.png',
    technos: ['NestJS', 'Next.js', 'PostgreSQL'],
  },
];

export default async function Home() {
  const posts = await getAllPosts({
    includeDrafts: process.env.NODE_ENV === 'development',
  });

  return (
    <main className="px-4 md:px-0">
      <section className="pb-14 border-b border-slate-300 mb-14">
        <Avatar status="busy" />
        <h1 className="font-semibold text-4xl mb-5 text-slate-950">
          Salut, je suis Pierre. 👋
          <span className="block text-slate-500 font-normal text-2xl mt-2">
            Développeur TypeScript - Node.js, basé à Lyon.
          </span>
        </h1>
        <p className="text-slate-700 text-lg md:text-xl leading-normal">
          Je suis fasciné par les possibilités qu&apos;offre le développement
          web et j&apos;aime concevoir, réaliser et mettre en place des
          solutions innovantes, pérennes et personnalisées. Je travaille
          actuellement avec la Métropole de Lyon.
        </p>
        <Link
          href="/info"
          className="group bg-slate-950 hover:bg-slate-800 transition-colors inline-block mt-8 font-mono text-xs font-semibold rounded-full px-8 py-3 text-white"
        >
          Plus d&apos;information{' '}
          <span className="inline-block group-hover:translate-x-2 transition-transform">
            →
          </span>
        </Link>
      </section>

      <section className="pb-16">
        <Title as="h2" variant="secondary" className="mb-4">
          Projets personnels
        </Title>

        <p className="text-slate-700 text-lg">
          Vous trouverez ci-dessous une sélection de projets récents que
          j&apos;ai réalisés.
        </p>
        <div className="lg:w-full grid grid-cols-1 grid-flow-dense gap-8 mt-16">
          {projects.map((project) => {
            const isLink = !!project.href;
            const WrappingComponent = isLink ? Link : 'div';
            const technos = project.technos;

            return (
              <WrappingComponent
                href={project.href ?? '/'}
                target="_blank"
                key={project.title}
                className={clsx(
                  'flex flex-col justify-center bg-slate-100 hover:bg-slate-200/70 transition-colors rounded-xl p-8'
                )}
              >
                <div className="relative rounded-xl mb-4 shadow-project">
                  <Image
                    width={520}
                    height={240}
                    quality={90}
                    src={project.image}
                    alt=""
                    className="rounded-xl bg-cover"
                  />
                </div>
                <h3 className="text-slate-700 font-semibold tracking-tight text-xl">
                  {project.title}
                </h3>
                <h3 className="text-slate-500 text-base">
                  {project.description}
                </h3>
                {technos.length && (
                  <div className="flex gap-2 mt-2">
                    {technos.map((techno) => {
                      return (
                        <span
                          key={techno}
                          className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-sm font-medium text-green-700 ring-1 ring-inset ring-green-600/20"
                        >
                          {techno}
                        </span>
                      );
                    })}
                  </div>
                )}
              </WrappingComponent>
            );
          })}
        </div>
      </section>

      <section className="pt-10 pb-16">
        <Title as="h2" variant="secondary" className="mb-8">
          Derniers articles
        </Title>
        <div className="divide-y">
          {posts.slice(0, 3).map((post) => {
            return (
              <ArticleLink
                key={post?.meta.title}
                href={post.href}
                title={post.meta.title}
                date={post?.date}
                summary={post.meta.summary}
              />
            );
          })}
        </div>
        <Link
          href="/blog"
          className="group bg-slate-950 hover:bg-slate-800 transition-colors inline-block mt-8 font-mono text-xs font-semibold rounded-full px-8 py-3 text-white"
        >
          Voir plus d&apos;articles{' '}
          <span className="inline-block group-hover:translate-x-2 transition-transform">
            →
          </span>
        </Link>
      </section>
    </main>
  );
}
