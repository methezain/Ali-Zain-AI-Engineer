import { defineCollection, z } from 'astro:content';

// Single "blog" collection powers both the blog and the work/case-study pages.
// - `work: true`  → also surfaced on /work (featured rows or the archive grid).
// - `work: false` → a standalone article, shown only on /blog.
// When this moves to a CMS, keep these fields as the content contract.
const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    // Concise title shown on cards (falls back to `title`). Keeps cards to 2 lines.
    cardTitle: z.string().optional(),
    // Short teaser for cards (home selected work, work archive, blog grid).
    excerpt: z.string(),
    // Longer summary used for SEO meta + the work featured-row paragraph.
    description: z.string(),
    category: z.string(),
    pubDate: z.coerce.date(),
    image: z.string(),
    imageAlt: z.string(),
    work: z.boolean().default(false),
    featured: z.boolean().default(false),
    order: z.number().default(99),
    client: z.string().optional(),
    metric: z.string().optional(),
    // Public URL of the shipped product. When set, the project is treated as
    // "live" and gets a pulsing badge that opens this link in a new tab.
    liveUrl: z.string().url().optional(),
    // For projects with more than one shipped surface (e.g. B2B + B2C), each
    // entry renders its own labelled live badge. Takes precedence over liveUrl.
    liveLinks: z
      .array(z.object({ label: z.string(), url: z.string().url() }))
      .optional(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});

export const collections = { blog };
