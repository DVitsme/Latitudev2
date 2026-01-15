import { cn } from "@/lib/utils";
import { getAllJobs } from "@/lib/jobs";

import { Badge } from "@/components/ui/badge";
import JobsList from "@/app/jobs/jobs-list";

interface JobsProps {
  className?: string;
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

const Jobs = ({ className }: JobsProps) => {
  const jobs = getAllJobs().map((job) => ({
    id: job.slug,
    title: job.title,
    description: job.excerpt,
    company: job.company,
    location: job.location,
    date: formatDate(job.date),
    category: job.location || "Location",
    link: `/jobs/${job.slug}`,
  }));

  return (
    <section className={cn("py-16 md:py-32", className)}>
      <div className="mx-auto container">
        <div className="flex flex-col items-center gap-6 text-center">
          <Badge variant="secondary">Jobs</Badge>
          <h1 className="text-4xl font-bold lg:text-7xl">
            Latest Job Positions
          </h1>
          <p className="text-balance max-w-2xl text-muted-foreground">
            Explore current openings and find a role that matches your goals.
          </p>
        </div>
        <JobsList items={jobs} />
      </div>
    </section>
  );
};

export default Jobs;
