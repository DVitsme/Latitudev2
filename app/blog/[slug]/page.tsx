import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";

import { getAllPosts, getPostBySlug } from "@/lib/posts";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return { title: "Post Not Found" };
  }

  return {
    title: `${post.title} | Latitude Recruiting`,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const hasUpdatedDate =
    post.updatedDate && post.updatedDate !== post.date ? post.updatedDate : null;

  return (
    <article className="container mx-auto max-w-4xl py-12 md:py-24">
      <div className="mb-8">
        <Link href="/blog">
          <Button variant="ghost" className="gap-2 pl-0 hover:bg-transparent">
            <ArrowLeft className="size-4" />
            Back to Insights
          </Button>
        </Link>
      </div>

      <header className="space-y-6">
        <h1 className="text-4xl font-semibold leading-tight md:text-5xl">
          {post.title}
        </h1>
        <div className="flex flex-wrap gap-2">
          <Badge variant="secondary">{post.category}</Badge>
          {post.tags?.map((tag) => (
            <Badge key={tag} variant="outline">
              {tag}
            </Badge>
          ))}
        </div>
        <p className="text-lg text-muted-foreground">{post.excerpt}</p>
        <div className="flex flex-wrap items-center gap-x-3 text-sm text-muted-foreground">
          <span>{post.author}</span>
          <span>•</span>
          <span>{post.date}</span>
          {post.readingTime && (
            <>
              <span>•</span>
              <span>{post.readingTime}</span>
            </>
          )}
          {hasUpdatedDate && (
            <>
              <span>•</span>
              <span>Updated {hasUpdatedDate}</span>
            </>
          )}
        </div>
      </header>

      {post.image && (
        <div className="relative mt-10 overflow-hidden rounded-2xl border">
          <Image
            src={post.image}
            alt={post.title}
            width={1200}
            height={700}
            className="h-auto w-full object-cover"
          />
        </div>
      )}

      <div className="prose prose-article dark:prose-invert mt-12 max-w-none prose-img:rounded-xl prose-img:shadow-lg">
        <ReactMarkdown>{post.content}</ReactMarkdown>
      </div>
    </article>
  );
}
