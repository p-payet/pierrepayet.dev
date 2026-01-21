import { getTranslations, setRequestLocale } from 'next-intl/server';
import { getAllPosts } from '@/lib/articles';
import { PageHeader } from '@/app/components/page-header';
import { ArticleLink } from '@/app/components/article-link';
import { type Locale } from '@/i18n/config';

type Props = {
  params: Promise<{ locale: Locale }>;
};

export default async function Page({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations('blog');
  const posts = await getAllPosts({
    includeDrafts: process.env.NODE_ENV === 'development',
    locale,
  });

  return (
    <main className="px-4 md:px-0">
      <PageHeader title={t('title')} />
      <p className="mb-6 text-sm text-zinc-500 dark:text-zinc-400 italic">
        {t('languageNotice')}
      </p>
      <section className="divide-y">
        {posts.map((post) => {
          return (
            <ArticleLink
              key={post.meta.title}
              href={`/${locale}${post.href}`}
              title={post.meta.title}
              summary={post.meta.summary}
              date={post.date}
              locale={locale}
            />
          );
        })}
      </section>
    </main>
  );
}
