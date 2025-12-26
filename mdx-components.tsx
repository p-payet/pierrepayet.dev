import type { MDXRemoteProps } from 'next-mdx-remote/rsc';

type MDXComponents = MDXRemoteProps['components'];

// Custom img component with lazy loading to prevent preload warnings
function MDXImage({ src, alt, ...props }: { src?: string; alt?: string;[key: string]: unknown }) {
  // eslint-disable-next-line @next/next/no-img-element
  return <img loading="lazy" src={src} alt={alt ?? ''} {...props} />;
}

// This file allows you to provide custom React components
// to be used in MDX files. You can import and use any
// React component you want, including components from
// other libraries.

// This file is required to use MDX in `app` directory.
export function useMDXComponents(
  components: MDXComponents
): MDXComponents {
  return {
    img: MDXImage,
    ...components,
  };
}
