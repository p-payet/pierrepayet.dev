import type { MetadataRoute } from 'next';
import { locales } from '@/i18n/config';
import { getAllPosts } from '@/lib/articles';

const BASE_URL = 'https://pierrepayet.dev';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages = ['', '/blog', '/contact', '/info'];

  const staticEntries: MetadataRoute.Sitemap = locales.flatMap((locale) =>
    staticPages.map((page) => ({
      url: `${BASE_URL}/${locale}${page}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: page === '' ? 1 : 0.8,
    }))
  );

  const posts = await getAllPosts({ includeDrafts: false });

  const blogEntries: MetadataRoute.Sitemap = locales.flatMap((locale) =>
    posts.map((post) => ({
      url: `${BASE_URL}/${locale}/blog/${post.slug}`,
      lastModified: new Date(post.date),
      changeFrequency: 'yearly' as const,
      priority: 0.6,
    }))
  );

  return [...staticEntries, ...blogEntries];
}
