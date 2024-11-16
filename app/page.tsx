import Link from 'next/link';
import Image from 'next/image';

import { ArticleLink } from './components/article-link';
import clsx from 'clsx';
import { getAllPosts } from '@/lib/articles';
import { Title } from '@/app/components/title';
import { Avatar } from './components/avatar';

const projects: Array<{
  href?: string;
  title: string;
  description: string;
  image: string;
  technos: Array<string>;
}> = [
  {
    title: 'Document Corrector',
    href: 'https://www.document-corrector.com/',
    description:
      "Corrige l'orthographe et la grammaire de documents en utilisant l'AI.",
    image: '/document-corrector.png',
    technos: ['NestJS', 'Next.js', 'PostgreSQL'],
  },
];

const linkedinPosts: Array<{
  href: string;
  title: string;
}> = [
  {
    href: 'https://www.linkedin.com/posts/pierre-payet-457476136_document-corrector-correcteur-de-documents-activity-7216358008556060672--1ip',
    title: 'Présentation de Document Corrector.',
  },
];

export default async function Home() {
  const posts = await getAllPosts({
    includeDrafts: process.env.NODE_ENV === 'development',
  });

  return (
    <main className="grid gap-14 pb-14 px-4 md:px-0">
      <section className="pb-14 border-b border-slate-300">
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

      <section>
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

      <section>
        <Title as="h2" variant="secondary" className="mb-8">
          Derniers posts LinkedIn
        </Title>
        <ul className="list-disc pl-4">
          {linkedinPosts.slice(0, 3).map((linkedinPost) => {
            return (
              <li key={linkedinPost.title}>
                <Link
                  href={linkedinPost.href}
                  target="_blank"
                  className="underline"
                >
                  {linkedinPost.title}
                </Link>
              </li>
            );
          })}
        </ul>
      </section>
    </main>
  );
}
