import fs from "fs";
import path from "path";
import matter from "gray-matter";

const postsDirectory = path.join(process.cwd(), "content/blog");

export interface BlogPost {
  slug: string;
  title: string;
  category: string;
  author: string;
  date: string;
  excerpt: string;
  image?: string;
  tags?: string[];
  readingTime?: string;
  updatedDate?: string;
  content: string;
}

const parseDate = (value: string) => {
  const parsed = Date.parse(value);
  return Number.isNaN(parsed) ? 0 : parsed;
};

export const getAllPosts = (): BlogPost[] => {
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
      const { data, content } = matter(fileContents);

      return {
        slug,
        content,
        ...(data as Omit<BlogPost, "slug" | "content">),
      };
    });

  return allPosts.sort((a, b) => parseDate(b.date) - parseDate(a.date));
};

export const getPostBySlug = (slug: string): BlogPost | null => {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.md`);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);

    return {
      slug,
      content,
      ...(data as Omit<BlogPost, "slug" | "content">),
    };
  } catch {
    return null;
  }
};
