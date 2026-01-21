import { Metadata, ResolvingMetadata } from 'next';
import dynamic from 'next/dynamic';
import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import '@/app/assets/github-dark.css';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import { getAllPostPaths, getPostBySlug } from '@/lib/articles';
import { ScrollAnimationDemoOne } from '@/app/components/posts/scroll-animation-wrapper';
import { routing } from '@/i18n/routing';
import { type Locale } from '@/i18n/config';

const TextWrapHero = dynamic(
  () =>
    import('@/app/components/posts/2024-05-21-future-css-text-wrap-pretty').then(
      (mod) => mod.TextWrapHero
    )
);
const TextWrapPrettyVsBalance = dynamic(
  () =>
    import('@/app/components/posts/2024-05-21-future-css-text-wrap-pretty').then(
      (mod) => mod.TextWrapPrettyVsBalance
    )
);
const DebouncedSearchInput = dynamic(
  () =>
    import(
      '@/app/components/posts/2024-06-27-debouncing-an-input-in-react'
    ).then((mod) => mod.DebouncedSearchInput)
);
const SearchInput = dynamic(
  () =>
    import(
      '@/app/components/posts/2024-06-27-debouncing-an-input-in-react'
    ).then((mod) => mod.SearchInput)
);

// Custom img component with lazy loading to prevent preload warnings
function MDXImage({
  src,
  alt,
  ...props
}: {
  src?: string;
  alt?: string;
  [key: string]: unknown;
}) {
  // eslint-disable-next-line @next/next/no-img-element
  return <img loading="lazy" src={src} alt={alt ?? ''} {...props} />;
}

export async function generateStaticParams() {
  // Generate params for all locales and all posts in each locale
  const allParams = await Promise.all(
    routing.locales.map(async (locale) => {
      const paths = await getAllPostPaths(locale as Locale);
      return paths.map((path) => ({
        locale,
        slug: path.slug,
      }));
    })
  );

  return allParams.flat();
}

export async function generateMetadata(
  props: { params: Promise<{ locale: Locale; slug: string }> },
  parent: ResolvingMetadata
): Promise<Metadata> {
  const params = await props.params;
  const post = getPostBySlug(params.slug, params.locale);

  const parentMeta = await parent;

  return {
    title: post?.meta.title,
    description: post?.meta.summary,
    publisher: 'Pierre Payet',
    creator: 'Pierre Payet',
    openGraph: {
      ...parentMeta?.openGraph,
      title: post?.meta?.title || parentMeta?.openGraph?.title,
      description: post?.meta?.summary || parentMeta?.openGraph?.description,
      url: `https://pierrepayet.dev/${params.locale}/blog/${params.slug}`,
    },
  };
}

type Params = {
  locale: Locale;
  slug: string;
};

export default async function Post(props: { params: Promise<Params> }) {
  const params = await props.params;
  const { locale, slug } = params;

  setRequestLocale(locale);

  const t = await getTranslations('dates');
  const post = getPostBySlug(slug, locale);

  if (!post) return notFound();

  if (post.meta.draft && process.env.NODE_ENV !== 'development') {
    return notFound();
  }

  const { meta, content } = post;

  // Format date based on locale
  const dateLocale = locale === 'fr' ? 'fr-FR' : 'en-US';

  return (
    <main className="px-4 md:px-0">
      <section>
        <h1 className="font-semibold tracking-tight text-4xl text-slate-900">
          {meta.title}
        </h1>
        <span className="text-slate-500 text-sm tracking-tight font-mono block mt-4">
          {t('publishedOn')}{' '}
          <time dateTime={post.date}>
            {new Intl.DateTimeFormat(dateLocale, {
              dateStyle: 'medium',
            }).format(new Date(post.date))}
          </time>
        </span>
      </section>

      <section className="py-5">
        <article className="prose prose-lg">
          <MDXRemote
            source={content}
            components={{
              img: MDXImage,
              ScrollAnimationDemoOne,
              TextWrapHero,
              TextWrapPrettyVsBalance,
              SearchInput,
              DebouncedSearchInput,
            }}
            options={{
              mdxOptions: {
                remarkPlugins: [remarkGfm],
                rehypePlugins: [rehypeHighlight],
              },
            }}
          />
        </article>
      </section>
    </main>
  );
}
