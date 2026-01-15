import fs from "fs";
import path from "path";
import matter from "gray-matter";

const jobsDirectory = path.join(process.cwd(), "content/jobs");

interface JobHighlight {
  label: string;
  value: string;
}

export interface JobPost {
  slug: string;
  title: string;
  location: string;
  company: string;
  date: string;
  salary?: string;
  applyLink?: string;
  highlights?: JobHighlight[];
  content: string;
  excerpt: string;
}

const getExcerpt = (content: string) => {
  const blocks = content
    .split(/\n{2,}/)
    .map((block) => block.replace(/\n/g, " ").trim())
    .filter(Boolean);

  const firstBlock = blocks.find((block) => /[a-zA-Z]/.test(block));
  if (!firstBlock) return "";

  return firstBlock.replace(/^#+\s*/, "").trim();
};

const parseJobFile = (filePath: string, slug: string): JobPost | null => {
  const fileContents = fs.readFileSync(filePath, "utf8");
  if (!fileContents.trim()) return null;

  const { data, content } = matter(fileContents);
  const excerpt = getExcerpt(content);

  return {
    slug,
    title: data.title ?? slug,
    location: data.location ?? "",
    company: data.company ?? "",
    date: data.date ?? "",
    salary: data.salary ?? undefined,
    applyLink: data.apply_link ?? undefined,
    highlights: Array.isArray(data.highlights) ? data.highlights : undefined,
    content,
    excerpt,
  };
};

export const getAllJobs = (): JobPost[] => {
  if (!fs.existsSync(jobsDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(jobsDirectory);
  const jobs = fileNames
    .filter((fileName) => fileName.endsWith(".md"))
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, "");
      const fullPath = path.join(jobsDirectory, fileName);
      return parseJobFile(fullPath, slug);
    })
    .filter((job): job is JobPost => Boolean(job));

  return jobs.sort((a, b) => (a.date > b.date ? -1 : 1));
};

export const getJobBySlug = (slug: string): JobPost | null => {
  try {
    const fullPath = path.join(jobsDirectory, `${slug}.md`);
    if (!fs.existsSync(fullPath)) return null;
    return parseJobFile(fullPath, slug);
  } catch (error) {
    return null;
  }
};
