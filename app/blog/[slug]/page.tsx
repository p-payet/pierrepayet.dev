import { Metadata, ResolvingMetadata } from 'next';
import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { Pluggable } from 'unified';
import '@/app/assets/github-dark.css';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import { getAllPostPaths, getPostBySlug } from '@/lib/articles';
import { ScrollAnimationDemoOne } from '@/app/components/posts/2024-05-20-future-css-scroll-animations';
import {
  TextWrapHero,
  TextWrapPrettyVsBalance,
} from '@/app/components/posts/2024-05-21-future-css-text-wrap-pretty';
import {
  DebouncedSearchInput,
  SearchInput,
} from '@/app/components/posts/2024-06-27-debouncing-an-input-in-react';

export async function generateStaticParams() {
  const paths = getAllPostPaths();

  return paths;
}

export async function generateMetadata(
  { params }: { params: { slug: string } },
  parent: ResolvingMetadata
): Promise<Metadata> {
  const post = getPostBySlug(params.slug);

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
      url: `https://pierrepayet.dev/blog/${params.slug}`,
    },
  };
}

type Params = {
  slug: string;
};

export default async function Post({ params }: { params: Params }) {
  const post = getPostBySlug(params.slug);

  if (!post) return notFound();

  if (post.meta.draft && process.env.NODE_ENV !== 'development') {
    return notFound();
  }

  const { meta, content } = post;

  return (
    <main className="px-4 md:px-0">
      <section>
        <h1 className="font-semibold tracking-tight text-4xl text-slate-900">
          {meta.title}
        </h1>
        <span className="text-slate-500 text-sm tracking-tight font-mono block mt-4">
          Publié le{' '}
          <time dateTime={post.date}>
            {new Intl.DateTimeFormat('fr-FR', {
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
              ScrollAnimationDemoOne,
              TextWrapHero,
              TextWrapPrettyVsBalance,
              SearchInput,
              DebouncedSearchInput,
            }}
            options={{
              mdxOptions: {
                remarkPlugins: [remarkGfm],
                rehypePlugins: [[rehypeHighlight]] as unknown as Pluggable[],
              },
            }}
          />
        </article>
      </section>
    </main>
  );
}
