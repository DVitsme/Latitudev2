import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { getAllPosts } from "@/lib/posts";
import { cn } from "@/lib/utils";

import { Card } from "@/components/ui/card";

interface BlogProps {
  heading?: string;
  description?: string;
  className?: string;
}

const Blog = ({
  heading = "Blog Posts",
  description = "Discover the latest insights and tutorials about modern web development, UI design, and component-driven architecture.",
  className,
}: BlogProps) => {
  const posts = getAllPosts();
  return (
    <section className={cn("py-32", className)}>
      <div className="mx-auto container flex flex-col items-center gap-16">
        <div className="text-center">
          <h2 className="mx-auto mb-6 text-3xl font-semibold text-pretty md:text-4xl lg:max-w-3xl">
            {heading}
          </h2>
          <p className="mx-auto max-w-2xl text-muted-foreground md:text-lg">
            {description}
          </p>
        </div>

        <div className="grid gap-y-10 sm:grid-cols-12 sm:gap-y-12 md:gap-y-16 lg:gap-y-20">
          {posts.map((post) => (
            <Card
              key={post.slug}
              className="order-last border-0 bg-transparent shadow-none sm:order-first sm:col-span-12 lg:col-span-10 lg:col-start-2"
            >
              <div className="grid gap-y-6 sm:grid-cols-10 sm:gap-x-5 sm:gap-y-0 md:items-center md:gap-x-8 lg:gap-x-12">
                <div className="sm:col-span-5">
                  <div className="mb-4 md:mb-6">
                    <div className="flex flex-wrap gap-3 text-xs tracking-wider text-muted-foreground uppercase md:gap-5 lg:gap-6">
                      {post.tags?.map((tag) => (
                        <span key={tag}>{tag}</span>
                      ))}
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold md:text-2xl lg:text-3xl">
                    <Link href={`/blog/${post.slug}`} className="hover:underline">
                      {post.title}
                    </Link>
                  </h3>
                  <p className="mt-4 text-muted-foreground md:mt-5">
                    {post.excerpt}
                  </p>
                  <div className="mt-6 flex items-center space-x-4 text-sm md:mt-8">
                    <span className="text-muted-foreground">{post.author}</span>
                    <span className="text-muted-foreground">•</span>
                    <span className="text-muted-foreground">
                      {post.date}
                    </span>
                  </div>
                  <div className="mt-6 flex items-center space-x-2 md:mt-8">
                    <Link
                      href={`/blog/${post.slug}`}
                      className="inline-flex items-center font-semibold hover:underline md:text-base"
                    >
                      <span>Read more</span>
                      <ArrowRight className="ml-2 size-4 transition-transform" />
                    </Link>
                  </div>
                </div>
                <div className="order-first sm:order-last sm:col-span-5">
                  <Link href={`/blog/${post.slug}`} className="block">
                    <div className="aspect-video overflow-clip rounded-lg border border-border bg-muted">
                      {post.image && (
                        <Image
                          src={post.image}
                          alt={post.title}
                          className="h-full w-full object-cover transition-opacity duration-200 fade-in hover:opacity-70"
                          width={1000}
                          height={1000}
                        />
                      )}
                    </div>
                  </Link>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Blog;
