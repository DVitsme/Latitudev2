---
name: Markdown blog rendering
overview: ""
todos: []
---

# Markdown-driven blog rendering plan

## Files to update/add

- [`lib/posts.ts`](lib/posts.ts) — file system reader + frontmatter parser
- [`app/blog/[slug]/page.tsx`](app/blog/[slug]/page.tsx) — dynamic post rendering
- [`app/blog/page.tsx`](app/blog/page.tsx) — blog index from markdown posts
- [`content/blog/*.md`](content/blog) — markdown sources
- [`app/globals.css`](app/globals.css) — ensure typography styles (if needed)

## Approach

1. **Content + frontmatter schema**

- Use extended frontmatter: `title`, `date`, `excerpt`, `author`, `category`, `image`, `tags`, `readingTime`, `updatedDate`.
- Keep markdown files in `content/blog`.

2. **Data utility (`lib/posts.ts`)**

- Read markdown files with `gray-matter` and return a normalized `BlogPost` shape.
- Provide `getAllPosts()` (sorted by date desc) and `getPostBySlug(slug)`.

3. **Dynamic post page (`app/blog/[slug]/page.tsx`)**

- Use `generateStaticParams` to prebuild slugs.
- Use `generateMetadata` for SEO (title/description from frontmatter).
- Render markdown with `react-markdown` inside a `prose` container.
- Surface extended fields (category badge, tags, dates, readingTime, updatedDate).

4. **Blog index (`app/blog/page.tsx`)**

- List posts from `getAllPosts()` with title, excerpt, category, image, and date.
- Link to `/blog/[slug]`.

5. **Styling**

- Ensure `prose` styles exist (Tailwind Typography or custom CSS). Use `prose dark:prose-invert` and consistent heading sizes.

## Verification

- Build should succeed without TypeScript errors.
- Visiting `/blog/[slug]` renders markdown content with metadata.
- `/blog` index lists all markdown posts.

## Implementation todos

- **posts-util**: Implement `lib/posts.ts` using gray-matter + extended frontmatter.
- **dynamic-post**: Update `app/blog/[slug]/page.tsx` to render markdown via react-markdown.
- **blog-index**: Update `app/blog/page.tsx` to list posts from markdown.
- **content-sync**: Ensure `content/blog/*.md` matches the extended frontmatter schema.