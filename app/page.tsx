import Link from 'next/link';
import linkedinPosts from '@/app/data/linkedin-posts';
import { getAllPosts } from '@/lib/articles';
import { ArticleLink } from '@/app/components/article-link';
import { Title } from '@/app/components/title';
import { Avatar } from '@/app/components/avatar';

export default async function Home() {
  const posts = await getAllPosts({
    includeDrafts: process.env.NODE_ENV === 'development',
  });

  return (
    <main className="grid gap-14 pb-14 px-4 md:px-0">
      <section className="pb-14 border-b border-slate-300">
        <Avatar />
        <h1 className="font-semibold text-4xl mb-5 text-slate-950">
          Salut, je suis Pierre 👋
          <span className="block text-slate-500 font-normal text-2xl mt-2">
            Développeur Fullstack TypeScript / Node.js, basé à Lyon.
          </span>
        </h1>
        <p className="text-slate-700 text-lg md:text-xl leading-normal">
          Je suis fasciné par les possibilités qu&apos;offre le développement
          web et j&apos;aime concevoir, réaliser et mettre en place des
          solutions innovantes, pérennes et personnalisées. Actuellement,
          j&apos;occupe le poste de développeur fullstack chez Inicio.
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
