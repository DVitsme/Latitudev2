import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";

import { getAllJobs, getJobBySlug } from "@/lib/jobs";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

interface PageProps {
  params: Promise<{ slug: string }>;
}

const formatDate = (value?: string) => {
  if (!value) return "";
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return value;
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(parsed);
};

export async function generateStaticParams() {
  return getAllJobs().map((job) => ({ slug: job.slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const job = getJobBySlug(slug);

  if (!job) {
    return {};
  }

  return {
    title: `${job.title} | ${job.company}`,
    description: job.excerpt || `${job.title} role at ${job.company}.`,
  };
}

export default async function JobPage({ params }: PageProps) {
  const { slug } = await params;
  const job = getJobBySlug(slug);

  if (!job) {
    notFound();
  }

  const formattedDate = formatDate(job.date);

  return (
    <section className="py-16 md:py-32">
      <div className="container mx-auto">
        <div className="mb-10 space-y-4">
          <Link
            href="/jobs"
            className="text-sm font-medium text-muted-foreground hover:text-foreground"
          >
            ← Back to jobs
          </Link>
          <h1 className="text-3xl font-semibold tracking-tight md:text-5xl">
            {job.title}
          </h1>
          <div className="flex flex-wrap gap-2 text-sm text-muted-foreground">
            {job.company && <span>{job.company}</span>}
            {job.location && (
              <>
                <span>•</span>
                <span>{job.location}</span>
              </>
            )}
            {formattedDate && (
              <>
                <span>•</span>
                <span>{formattedDate}</span>
              </>
            )}
            {job.salary && (
              <>
                <span>•</span>
                <span>{job.salary}</span>
              </>
            )}
          </div>
          <Separator />
        </div>

        <div className="grid gap-10 lg:grid-cols-[2fr_1fr]">
          <div className="prose prose-article max-w-none dark:prose-invert">
            <ReactMarkdown>{job.content}</ReactMarkdown>
          </div>

          <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-xl border bg-card p-6 shadow-sm">
              <h2 className="text-lg font-semibold">Highlights</h2>
              <dl className="mt-4 space-y-4 text-sm">
                {job.company && (
                  <div>
                    <dt className="text-muted-foreground">Company</dt>
                    <dd className="font-medium text-foreground">
                      {job.company}
                    </dd>
                  </div>
                )}
                {job.location && (
                  <div>
                    <dt className="text-muted-foreground">Location</dt>
                    <dd className="font-medium text-foreground">
                      {job.location}
                    </dd>
                  </div>
                )}
                {job.salary && (
                  <div>
                    <dt className="text-muted-foreground">Salary</dt>
                    <dd className="font-medium text-foreground">
                      {job.salary}
                    </dd>
                  </div>
                )}
                {formattedDate && (
                  <div>
                    <dt className="text-muted-foreground">Posted</dt>
                    <dd className="font-medium text-foreground">
                      {formattedDate}
                    </dd>
                  </div>
                )}
                {job.highlights?.map((highlight, index) => (
                  <div key={`${highlight.label}-${index}`}>
                    <dt className="text-muted-foreground">
                      {highlight.label}
                    </dt>
                    <dd className="font-medium text-foreground">
                      {highlight.value}
                    </dd>
                  </div>
                ))}
              </dl>
              <div className="mt-6">
                <Button className="w-full" asChild>
                  <a
                    href={job.applyLink ?? "#"}
                    target={job.applyLink ? "_blank" : undefined}
                    rel={job.applyLink ? "noreferrer" : undefined}
                  >
                    Apply now
                  </a>
                </Button>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
