import fs from 'fs';
import path from 'path';
import { cache } from 'react';
import matter from 'gray-matter';
import { type Locale, defaultLocale } from '@/i18n/config';

interface Post {
  meta: {
    [key: string]: string;
  };
  slug: string;
  date: string;
  href: string;
  content: string;
}

export const getRegexForSlug = (slug: string): RegExp => {
  return new RegExp(`^\\d{4}-\\d{2}-\\d{2}-${slug}.mdx$`);
};

const POSTS_PATH = 'posts';

interface DateAndSlug {
  date: string;
  slug: string;
}

/**
 * Gets the base path for posts based on locale.
 * @param locale - The locale to get the path for.
 * @returns The path to the posts directory for the given locale.
 */
const getPostsPath = (locale: Locale = defaultLocale): string => {
  return path.join(POSTS_PATH, locale);
};

/**
 * Extracts date and slug from filename.
 * @param filename - The filename to extract data from.
 * @returns An object containing the date and slug, or null if the filename does not match the expected format.
 */
export const getDateAndSlugFromFilename = (
  filename: string
): DateAndSlug | null => {
  const match = filename.match(/^(\d{4}-\d{2}-\d{2})-(.*).mdx$/);
  if (match) {
    return {
      date: match[1],
      slug: match[2],
    };
  }
  return null;
};

/**
 * Reads a file and returns its front matter and date and slug.
 * @param filename - The name of the file to read.
 * @param locale - The locale of the post.
 * @returns An object containing the front matter, date, slug, and href, or null if the filename does not match the expected format.
 */
const getPostFromFile = (filename: string, locale: Locale = defaultLocale): Post | null => {
  const postsPath = getPostsPath(locale);
  const fileContent = fs.readFileSync(
    path.join(postsPath, filename),
    'utf-8'
  );

  const { data: frontMatter, content } = matter(fileContent);

  const dateAndSlug = getDateAndSlugFromFilename(filename);

  if (!dateAndSlug) {
    return null;
  }

  const { date, slug } = dateAndSlug;

  return {
    meta: frontMatter,
    content,
    slug,
    date,
    href: `/blog/${slug}`,
  };
};

/**
 * Gets a post by its slug.
 * @param slug - The slug of the post to get.
 * @param locale - The locale of the post.
 * @returns The post with the given slug, or null if no such post exists.
 */
export const getPostBySlug = cache((slug: string, locale: Locale = defaultLocale): Post | null => {
  const postsPath = getPostsPath(locale);

  try {
    const files = fs.readdirSync(postsPath);

    for (const filename of files) {
      if (getRegexForSlug(slug).test(filename)) {
        const post = getPostFromFile(filename, locale);
        if (post) {
          return post;
        }
      }
    }
  } catch {
    // Directory doesn't exist for this locale
    return null;
  }

  return null;
});

/**
 * Gets all posts.
 * @param options - Options for fetching posts.
 * @param options.includeDrafts - Whether to include draft posts.
 * @param options.locale - The locale to fetch posts for.
 * @returns An array of all posts, sorted by date in descending order.
 */
export const getAllPosts = cache(async ({
  includeDrafts = false,
  locale = defaultLocale,
}: {
  includeDrafts?: boolean;
  locale?: Locale;
}): Promise<Post[]> => {
  const postsPath = getPostsPath(locale);

  try {
    const files = fs.readdirSync(postsPath);

    return files
      .map(item => getPostFromFile(item, locale))
      .filter((post): post is Post => {
        if (!post) return false;
        if (!includeDrafts && post.meta?.draft) return false;
        return true;
      })
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  } catch {
    // Directory doesn't exist for this locale
    return [];
  }
});

/**
 * Generates an array of all the paths for the posts.
 * @param locale - The locale to get paths for.
 * @returns An array of all the paths for the posts.
 */
export async function getAllPostPaths(locale: Locale = defaultLocale) {
  const posts = await getAllPosts({ locale });

  const paths = posts.map((post) => ({ slug: post.slug }));

  return paths;
}
