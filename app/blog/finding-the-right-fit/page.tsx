"use client";
import { Linkedin, LucideIcon, Twitter } from "lucide-react";
import { Fragment, useEffect, useState } from "react";

import { cn } from "@/lib/utils";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";

interface BreadcrumbItem {
  label: string;
  link: string;
}

interface BreadcrumbBlogProps {
  breadcrumb: Array<BreadcrumbItem>;
}

interface AuthorType {
  image?: string;
  name: string;
  job: string;
  description: string;
  socials: {
    icon: LucideIcon;
    url: string;
  }[];
}

const AUTHOR: AuthorType = {
  image:
    "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-1.webp",
  name: "Jane Doe",
  job: "CEO & Cofounder",
  description:
    "An avid storyteller with a passion for crafting compelling narratives, love to explore the human experience through vivid characters and thought-provoking themes. ",
  socials: [
    {
      icon: Twitter,
      url: "#",
    },
    {
      icon: Linkedin,
      url: "#",
    },
  ],
};

const BREADCRUMB: Array<BreadcrumbItem> = [
  {
    label: "Resources",
    link: "#",
  },
  {
    label: "Blogs",
    link: "#",
  },
];

const SHARE_LINKS = [
  {
    icon: Twitter,
    url: "#",
  },
  {
    icon: Linkedin,
    url: "#",
  },
];

const ARTICLE_DATE = "May 18, 2025";
const ARTICLE_DURATION = "6 min read";

interface Blogpost6Props {
  className?: string;
}

const Blogpost6 = ({ className }: Blogpost6Props) => {
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    // Query all h2 elements with IDs that match the chapter anchors
    const chapterIds = ["heading-1", "heading-2", "heading-3"];
    const headingElements = chapterIds
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    const observer = new window.IntersectionObserver(
      (entries) => {
        const visible = entries.find((entry) => entry.isIntersecting);
        if (visible) {
          setActiveId(visible.target.id);
        }
      },
      {
        rootMargin: "0px 0px -30% 0px",
        threshold: 0.1,
      }
    );

    headingElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section className={cn("pb-32", className)}>
      <div className="bg-muted bg-[url('/images/Blog/finding-the-right-fit/basketball.jpg')] bg-[length:3.125rem_3.125rem] bg-repeat py-20">
        <div className="container flex flex-col items-start justify-start gap-16 py-20 lg:flex-row lg:items-end lg:justify-between">
          <div className="flex w-full flex-col items-center justify-center gap-12">
            <div className="flex w-full max-w-[36rem] flex-col items-center justify-center gap-8">
              <BreadcrumbBlog breadcrumb={BREADCRUMB} />
              <div className="flex w-full flex-col gap-5">
                <div className="flex items-center justify-center gap-2.5 text-sm font-medium text-foreground/60">
                  <div>{ARTICLE_DURATION}</div>
                  <div>|</div>
                  <div>{ARTICLE_DATE}</div>
                </div>
                <h1 className="text-center text-[2.5rem] leading-[1.2] font-semibold md:text-5xl lg:text-6xl">
                  Finding the Right Fit for Your All-Star Team
                </h1>
                <p className="text-center text-xl leading-[1.4] font-semibold text-foreground">
                  We have all watched draft day: teams study athletes, compare
                  stats, and look for the right fit. Hiring for your business is
                  no different.
                </p>
                <div className="flex items-center justify-center gap-2.5">
                  {SHARE_LINKS.map((link, index) => (
                    <Button asChild key={`share-link-${index}`} size="icon">
                      <a href={link.url}>
                        <link.icon />
                      </a>
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container pt-20">
        <div className="relative mx-auto w-full max-w-5xl items-start justify-between gap-20 lg:flex">
          {/* Chapters */}
          <div className="top-20 flex-1 bg-background pb-10 lg:sticky lg:pb-0">
            <div className="text-xl leading-snug font-medium">Chapters</div>
            <div className="flex flex-col gap-2 pt-2 pl-2">
              <a
                href="#heading-1"
                className={`block text-sm leading-normal font-medium text-muted-foreground transition duration-300 ${
                  activeId === "heading-1"
                    ? "lg:rounded-md lg:bg-muted lg:p-2 lg:font-bold lg:!text-primary"
                    : "text-muted-foreground"
                }`}
              >
                Identify the Position
              </a>
              <a
                href="#heading-2"
                className={`block text-sm leading-normal font-medium text-muted-foreground transition duration-300 ${
                  activeId === "heading-2"
                    ? "lg:rounded-md lg:bg-muted lg:p-2 lg:font-bold lg:!text-primary"
                    : "text-muted-foreground"
                }`}
              >
                Scout Them Out
              </a>
              <a
                href="#heading-3"
                className={`block text-sm leading-normal font-medium text-muted-foreground transition duration-300 ${
                  activeId === "heading-3"
                    ? "lg:rounded-md lg:bg-muted lg:p-2 lg:font-bold lg:!text-primary"
                    : "text-muted-foreground"
                }`}
              >
                Show Off Your Team Colors
              </a>
            </div>
          </div>

          {/* Content */}
          <div className="flex w-full max-w-[40rem] flex-col gap-10">
            <Author author={AUTHOR} />
            <div className="prose dark:prose-invert">
              <h2>Key Takeaways</h2>
              <p>• Define the role clearly before you post the job.</p>
              <p>• Source proactively across multiple channels.</p>
              <p>• Showcase your culture, people, and growth opportunities.</p>

              <p>
                Hiring the right employees is critical to long-term success.
                Great candidates bring skills, reliability, and cultural fit,
                but finding them can be challenging in a competitive market.
                These steps will help you attract and identify the best talent
                for your team.
              </p>
              <h2 id="heading-1" className="scroll-mt-24">
                Identify the Position
              </h2>
              <p>
                Before posting a job, define the role your business truly needs.
                Outline the experience level, qualifications, and personality
                traits of an ideal candidate so you can evaluate talent
                consistently.
              </p>
              <ul>
                <li>Hard skills (technical abilities, certifications)</li>
                <li>Soft skills (communication, teamwork, adaptability)</li>
                <li>Cultural fit (alignment with company values)</li>
              </ul>
              <h2 id="heading-2" className="scroll-mt-24">
                Scout Them Out
              </h2>
              <p>
                In recruiting, we call it sourcing. Use multiple channels to
                seek out strong candidates and encourage them to apply. Do not
                rely on a single job board to find quality talent.
              </p>
              <h2 id="heading-3" className="scroll-mt-24">
                Show Off Your Team Colors
              </h2>
              <p>
                Quality candidates research companies before applying.
                Strengthen your brand and show why your team is worth joining
                by:
              </p>
              <ul>
                <li>Sharing your culture on your website and social media</li>
                <li>Highlighting employees and their stories</li>
                <li>
                  Offering competitive pay, benefits, and growth opportunities
                </li>
              </ul>
            </div>

            {/* Conclusion */}
            <div className="prose rounded-lg bg-muted p-5 dark:prose-invert [&>h2]:mt-0">
              <h2>Final Thoughts</h2>
              <p>
                Finding quality employees requires a strategic approach and can
                take real bandwidth. Latitude Recruiting and Placement Agency
                provides full service—from crafting precise job descriptions to
                leveraging multiple recruitment channels and recommending top
                candidates.
              </p>
              <p>
                Need help hiring? Reach us at{" "}
                <a href="mailto:Inquiries@latituderpa.com">
                  Inquiries@latituderpa.com
                </a>{" "}
                or follow us on LinkedIn, Instagram, Threads, and Facebook.
              </p>
            </div>

            {/* Author */}
            <div className="flex flex-col gap-4 rounded-lg bg-muted p-5">
              <Author author={AUTHOR} />
              <p>{AUTHOR.description}</p>
              <div className="flex items-center gap-2.5">
                {AUTHOR.socials.map((link, index) => (
                  <Button asChild key={`author-socials-${index}`} size="icon">
                    <a href={link.url}>
                      <link.icon />
                    </a>
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Author = ({ author }: { author: AuthorType }) => {
  return (
    <div className="flex items-center gap-2.5">
      <Avatar className="size-12 border">
        <AvatarImage src={author.image} alt={author.name} />
        <AvatarFallback>{author.name}</AvatarFallback>
      </Avatar>
      <div>
        <div className="text-sm leading-normal font-normal">{author.name}</div>
        <div className="text-sm leading-normal font-normal text-muted-foreground">
          {author.job}
        </div>
      </div>
    </div>
  );
};

const BreadcrumbBlog = ({ breadcrumb }: BreadcrumbBlogProps) => {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        {breadcrumb.map((item, i) => {
          return (
            <Fragment key={`${item.label}`}>
              <BreadcrumbItem>
                <BreadcrumbLink href={item.link}>{item.label}</BreadcrumbLink>
              </BreadcrumbItem>
              {i < breadcrumb.length - 1 ? (
                <BreadcrumbSeparator>/</BreadcrumbSeparator>
              ) : null}
            </Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default Blogpost6;
