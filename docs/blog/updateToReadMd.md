Here is a complete, step-by-step plan to build a **Markdown-based Blog System** for your Next.js 16 application. This approach is "CMS-ready," meaning when you are ready for a database or headless CMS later, you will only need to swap out the `lib/posts.ts` file, and the rest of your UI will remain untouched.

### **The Plan Overview**

1. **Content Storage:** Store your `.md` files in a local `content/blog` folder.
2. **Data Utility:** Create a server-side helper to read files and parse metadata (Frontmatter) using `gray-matter`.
3. **Dynamic Routing:** Use Next.js Dynamic Routes (`[slug]`) to render individual posts.
4. **Static Generation:** Use `generateStaticParams` to build these pages at build time for maximum speed.

---

### **Step 1: Install Dependencies** DONE

You need a way to parse the YAML header (Frontmatter) and a way to render the Markdown body into React.

```bash
npm install gray-matter react-markdown
npm install -D @types/react-css-modules 
# Note: You likely also want the Tailwind Typography plugin for easy styling
npm install -D @tailwindcss/typography

```

*Update your `globals.css` (Tailwind v4) to include the typography plugin if you haven't already, or just use standard utility classes.*

---

### **Step 2: Create the Content Directory**

Create a folder structure in your root: `content/blog`.
Inside, create a file named `hidden-talent.md` and paste the blog post content I generated for you earlier.

**File:** `content/blog/hidden-talent.md`

```markdown
---
title: "The Hidden Talent Pool: Why Passive Candidates Are Your Best Hires"
category: "Hiring Strategy"
author: "Latitude Recruiting Team"
date: "2024-03-20"
excerpt: "In a competitive job market, most companies make the mistake of relying solely on inbound applications..."
image: "/images/blog/passive-candidates.jpg"
---

In today’s hyper-competitive job market, many organizations fall into the trap...
(Paste the rest of the blog content here)

```

---

### **Step 3: Create the Data Utility (The "Fake Database")**

This file acts as the bridge between your file system and your frontend.

**File:** `lib/posts.ts`

```typescript
import fs from "fs";
import path from "path";
import matter from "gray-matter";

const postsDirectory = path.join(process.cwd(), "content/blog");

export interface BlogPost {
  slug: string;
  title: string;
  category: string;
  date: string;
  author: string;
  excerpt: string;
  image?: string;
  content: string;
}

// 1. Get all posts for the Blog Index page
export function getAllPosts(): BlogPost[] {
  // Create folder if it doesn't exist
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(postsDirectory);
  
  const allPosts = fileNames
    .filter((fileName) => fileName.endsWith(".md"))
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, "");
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");

      // Parse metadata section
      const { data, content } = matter(fileContents);

      return {
        slug,
        content,
        ...(data as any),
      };
    });

  // Sort posts by date (newest first)
  return allPosts.sort((a, b) => (a.date > b.date ? -1 : 1));
}

// 2. Get a single post by slug for the Dynamic Page
export function getPostBySlug(slug: string): BlogPost | null {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.md`);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);

    return {
      slug,
      content,
      ...(data as any),
    };
  } catch (error) {
    return null;
  }
}

```

---

### **Step 4: Create the Dynamic Blog Post Page**

Update  page to handle any URL that looks like `/blog/hidden-talent`.

**File:** `app/blog/[slug]/page.tsx`

```tsx
import { notFound } from "next/navigation";
import { getAllPosts, getPostBySlug } from "@/lib/posts";
import ReactMarkdown from "react-markdown";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

interface Props {
  params: Promise<{ slug: string }>;
}

// 1. Generate Static Paths (SSG) - This tells Next.js which pages to build
export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

// 2. Generate SEO Metadata
export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  
  if (!post) return { title: "Post Not Found" };

  return {
    title: `${post.title} | Latitude Recruiting`,
    description: post.excerpt,
  };
}

// 3. The Page Component
export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="container py-12 md:py-24 max-w-4xl mx-auto">
      {/* Back Button */}
      <div className="mb-8">
        <Link href="/blog">
          <Button variant="ghost" className="gap-2 pl-0 hover:pl-0 hover:bg-transparent">
            <ArrowLeft className="w-4 h-4" />
            Back to Insights
          </Button>
        </Link>
      </div>

      {/* Header */}
      <div className="space-y-6 mb-12">
        <Badge variant="secondary" className="rounded-md">
          {post.category}
        </Badge>
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tighter text-foreground">
          {post.title}
        </h1>
        <div className="flex items-center gap-4 text-muted-foreground">
          <p>{post.date}</p>
          <span>•</span>
          <p>{post.author}</p>
        </div>
      </div>

      {/* Markdown Content */}
      {/* "prose" comes from Tailwind Typography plugin.  */}
      <div className="prose prose-lg prose-blue dark:prose-invert max-w-none">
        <ReactMarkdown>{post.content}</ReactMarkdown>
      </div>
    </article>
  );
}

```

---

### **Step 5: Create the Blog Index Page**

This page lists all your markdown files.

**File:** `app/blog/page.tsx`

```tsx
import { getAllPosts } from "@/lib/posts";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata = {
  title: "Industry Insights | Latitude Recruiting",
  description: "Expert advice on hiring strategies and workforce trends.",
};

export default function BlogIndexPage() {
  const posts = getAllPosts();

  return (
    <section className="py-24 bg-[#f9f9f9]">
      <div className="container">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-extrabold tracking-tighter text-[#051e3a] sm:text-5xl">
            Industry Insights
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Expert advice on hiring trends, retention strategies, and workforce planning.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="group">
              <Card className="h-full border-none shadow-sm transition-all hover:shadow-md">
                <CardHeader>
                  <div className="mb-2">
                    <Badge variant="secondary" className="rounded-md">
                      {post.category}
                    </Badge>
                  </div>
                  <CardTitle className="text-xl font-bold leading-tight text-[#051e3a] group-hover:text-[#3374ff] transition-colors">
                    {post.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground line-clamp-3">
                    {post.excerpt}
                  </p>
                  <p className="mt-4 text-sm font-medium text-[#3374ff]">
                    Read Article →
                  </p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

```

### **Summary of Workflow**

1. **Add Post:** To add a new blog, you simply drop a new `.md` file into `content/blog`.
2. **Build:** Next.js detects the file, `getAllPosts` reads it, and `generateStaticParams` ensures it is turned into a static HTML page instantly.
3. **Future Proofing:** When you eventually switch to a database (like Supabase or Contentful), you only need to rewrite the functions inside `lib/posts.ts` to fetch from the DB instead of the file system. The `page.tsx` files won't even know the difference.