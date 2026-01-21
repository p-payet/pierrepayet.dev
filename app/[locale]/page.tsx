import Link from 'next/link';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import linkedinPosts from '@/app/data/linkedin-posts';
import { getAllPosts } from '@/lib/articles';
import { ArticleLink } from '@/app/components/article-link';
import { Title } from '@/app/components/title';
import { Avatar } from '@/app/components/avatar';
import { type Locale } from '@/i18n/config';

type Props = {
  params: Promise<{ locale: Locale }>;
};

export default async function Home({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations('home');
  const tLinkedin = await getTranslations('linkedinPosts');
  const posts = await getAllPosts({
    includeDrafts: process.env.NODE_ENV === 'development',
    locale,
  });

  return (
    <main className="grid gap-14 pb-14 px-4 md:px-0">
      <section className="pb-14 border-b border-slate-300">
        <Avatar />
        <h1 className="font-semibold text-4xl mb-5 text-slate-950">
          {t('greeting')}
          <span className="block text-slate-500 font-normal text-2xl mt-2">
            {t('subtitle')}
          </span>
        </h1>
        <p className="text-slate-700 text-lg md:text-xl leading-normal">
          {t('intro')}
        </p>
        <Link
          href={`/${locale}/info`}
          className="group bg-slate-950 hover:bg-slate-800 transition-colors inline-block mt-8 font-mono text-xs font-semibold rounded-full px-8 py-3 text-white"
        >
          {t('moreInfo')}{' '}
          <span className="inline-block group-hover:translate-x-2 transition-transform">
            →
          </span>
        </Link>
      </section>

      <section>
        <Title as="h2" variant="secondary" className="mb-8">
          {t('latestArticles')}
        </Title>
        <div className="divide-y">
          {posts.slice(0, 3).map((post) => {
            return (
              <ArticleLink
                key={post?.meta.title}
                href={`/${locale}${post.href}`}
                title={post.meta.title}
                date={post?.date}
                summary={post.meta.summary}
                locale={locale}
              />
            );
          })}
        </div>
        <Link
          href={`/${locale}/blog`}
          className="group bg-slate-950 hover:bg-slate-800 transition-colors inline-block mt-8 font-mono text-xs font-semibold rounded-full px-8 py-3 text-white"
        >
          {t('viewMoreArticles')}{' '}
          <span className="inline-block group-hover:translate-x-2 transition-transform">
            →
          </span>
        </Link>
      </section>

      <section>
        <Title as="h2" variant="secondary" className="mb-8">
          {t('latestLinkedIn')}
        </Title>
        <ul className="list-disc pl-4">
          {linkedinPosts.slice(0, 3).map((linkedinPost) => {
            return (
              <li key={linkedinPost.titleKey}>
                <Link
                  href={linkedinPost.href}
                  target="_blank"
                  className="underline"
                >
                  {tLinkedin(linkedinPost.titleKey)}
                </Link>
              </li>
            );
          })}
        </ul>
      </section>
    </main>
  );
}
