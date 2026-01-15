import { ArrowUpRightIcon } from "lucide-react";
import React from "react";

import { cn } from "@/lib/utils";
import { getAllJobs } from "@/lib/jobs";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

interface OpenPositionProps {
  className?: string;
}

const OpenPosition = ({ className }: OpenPositionProps) => {
  const openPositionData = getAllJobs().map((job) => {
    const metaParts = [job.location, job.salary].filter(Boolean);
    const perks =
      job.highlights?.map((highlight) => highlight.value).filter(Boolean) ?? [];
    return {
      href: `/jobs/${job.slug}`,
      meta: metaParts.join(" • "),
      title: job.title,
      description: job.excerpt,
      perks,
    };
  });

  return (
    <section id="positions" className={cn("bg-background py-16", className)}>
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="mb-6 text-left text-4xl tracking-tighter text-foreground sm:text-6xl">
          Open Positions
        </h2>
        <p className="mb-10 max-w-3xl text-xl text-muted-foreground">
          Browse current opportunities and quickly compare what matters most:
          location, work style, and the benefits that make each role a great fit.
        </p>
        <section className="mt-10 space-y-6 md:mt-18">
          {openPositionData.map((post, index) => (
            <React.Fragment key={index}>
              <Card className="border border-border bg-card shadow-soft">
              <Link href={post.href}>
                <CardContent className="">
                  <div className="relative w-full">
                    <p className="text-sm font-medium tracking-tight text-muted-foreground">
                      {post.meta}
                    </p>

                    <h2 className="mt-2 text-lg font-medium tracking-tight text-foreground md:text-2xl">
                      {post.title}
                    </h2>

                    <p className="md:text-md mt-4 text-sm text-muted-foreground md:pr-24 xl:pr-32">
                      {post.description}
                    </p>

                    <div className="mt-4 flex w-9/10 flex-wrap items-center gap-2">
                      {post.perks.map((perk, perkIndex) => (
                        <Badge
                          key={perkIndex}
                          variant="secondary"
                          className="h-7 rounded-full px-3 py-1"
                        >
                          <span className="text-sm font-semibold text-muted-foreground">
                            {perk}
                          </span>
                        </Badge>
                      ))}
                    </div>

                      <Button
                        variant="secondary"
                        className="absolute -right-3 -bottom-1 flex h-10 w-10 items-center justify-center rounded-full transition-all ease-in-out hover:rotate-45 md:bottom-14"
                      >
                        <ArrowUpRightIcon />
                      </Button>
                  </div>
                </CardContent>
              </Link>
              </Card>

              {index < openPositionData.length - 1 && (
                <Separator className="h-px w-full" />
              )}
            </React.Fragment>
          ))}
        </section>
      </div>
    </section>
  );
};

export default OpenPosition;
