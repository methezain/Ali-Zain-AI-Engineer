import { getCollection, type CollectionEntry } from 'astro:content';

export type Post = CollectionEntry<'blog'>;

// How many posts show per page in the blog + category listings.
export const PAGE_SIZE = 12;

// How many posts appear in the featured strip on the blog landing page.
export const FEATURED_COUNT = 4;

/** URL-safe slug for a category name, e.g. "Retrieval (RAG)" -> "retrieval-rag". */
export function categorySlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/** All published posts, newest first. Single source of truth for ordering. */
export async function getSortedPosts(): Promise<Post[]> {
  const posts = await getCollection('blog', ({ data }) => !data.draft);
  return posts.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
}

/** Unique categories with slug + count, ordered by post count (desc). */
export function getCategories(posts: Post[]) {
  const counts = new Map<string, number>();
  for (const p of posts) counts.set(p.data.category, (counts.get(p.data.category) ?? 0) + 1);
  return [...counts.entries()]
    .sort((a, b) => b[1] - a[1])
    .map(([name, count]) => ({ name, slug: categorySlug(name), count }));
}

/** Build a listing URL for a given page number (page 1 has no suffix). */
export function pageHref(base: string, n: number): string {
  return n <= 1 ? base : `${base}/${n}`;
}
