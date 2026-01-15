import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardTitle,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";

import { MotionPreset } from "@/components/ui/motion-preset";
import Image from "next/image";

type BlogCard = {
  img: string;
  alt: string;
  title: string;
  description: string;
  blogLink: string;
};

const truncateWords = (text: string, maxWords: number) => {
  const words = text.trim().split(/\s+/);
  if (words.length <= maxWords) return text;
  return `${words.slice(0, maxWords).join(" ")}...`;
};

const BlogPreview = () => {
  const blogCards: BlogCard[] = [
    {
      img: "/images/Blog/finding-the-right-fit/basketball.jpg",
      alt: "Landing Page Design",
      title: "Finding the Right Fit for Your All-Star Team",
      description:
        "We have all watched NBA or NFL drafts, professional sports teams spend seasons pouring over eligible athletes, comparing their statistics, and watching their form",
      blogLink: "/blog/find-right-team",
    },
    {
      img: "/images/Blog/talent-pool/talent-pool.jpg",
      alt: "Mobile App Interface",
      title:
        "The Hidden Talent Pool: Why Passive Candidates Are Your Best Hires",
      description:
        "In a competitive job market, most companies make the mistake of relying solely on inbound applications.",
      blogLink: "/blog/hidden-talent",
    },
    {
      img: "/images/Blog/beyond-the-resume/resume.jpg",
      alt: "Digital Identity Design",
      title: "Beyond the Resume: Decoding Organizational DNA",
      description:
        "A resume can tell you what a candidate has done, but it cannot tell you how they will behave when deadlines are tight or how they will collaborate with your existing team.",
      blogLink: "/blog/beyond-the-resume",
    },
  ];


  return (
    <section className="py-8 sm:py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12 space-y-4 text-center sm:mb-16 lg:mb-24">
          <MotionPreset
            fade
            slide={{ direction: "down", offset: 50 }}
            blur
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl font-semibold md:text-3xl lg:text-4xl">
              Industry{" "}
              <span className="relative z-10">
                Insights
                <span
                  className="bg-primary absolute bottom-0 left-0 -z-10 h-px w-full"
                  aria-hidden="true"
                />
              </span>
            </h2>
          </MotionPreset>

          <MotionPreset
            fade
            slide={{ direction: "down", offset: 50 }}
            blur
            delay={0.3}
            transition={{ duration: 0.5 }}
          >
            <p className="text-muted-foreground mx-auto max-w-2xl text-base lg:text-xl">
              Dive into stories, strategies, and lessons from our team curated
              to teach you how to implement onboarding systems and mindsets
              necessary for long-term success and growth.
            </p>
          </MotionPreset>

          <MotionPreset
            fade
            slide={{ direction: "down", offset: 50 }}
            blur
            delay={0.6}
            transition={{ duration: 0.5 }}
          >
            <Button
              className="group rounded-full text-base has-[>svg]:px-6"
              size="lg"
              asChild
            >
              <Link href="/blog">
                View All Blogs
                <ArrowRightIcon className="transition-transform duration-200 group-hover:translate-x-0.5" />
              </Link>
            </Button>
          </MotionPreset>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {blogCards.map((item, index) => (
            <MotionPreset
              key={index}
              fade
              blur
              slide={{ direction: "up", offset: 50 }}
              delay={0.8 + index * 0.1}
              transition={{ duration: 0.5 }}
            >
              <Link href={item.blogLink}>
                <Card className="group gap-4 overflow-hidden border-0 bg-transparent py-0 shadow-none transition-transform duration-300 hover:-translate-y-1">
                  <CardContent className="px-0">
                    <div className="relative">
                      <div className="relative h-[242px] w-[389px] overflow-hidden">
                        <Image
                          src={item.img}
                          alt={item.alt}
                          fill
                          sizes="389px"
                          className="object-cover object-center"
                        />
                      </div>
                      <Button
                        size="icon"
                        variant="secondary"
                        className="hover:bg-primary hover:text-primary-foreground group-hover:bg-primary group-hover:text-primary-foreground absolute right-1 bottom-1 size-10 rotate-316 rounded-full transition-colors duration-300 sm:right-6 sm:bottom-6 md:right-2 md:bottom-2 lg:right-1 lg:bottom-1 xl:right-3 xl:bottom-3"
                      >
                        <ArrowRightIcon />
                      </Button>
                    </div>
                  </CardContent>
                  <CardHeader className="px-0">
                    <CardTitle className="group-hover:text-primary text-2xl font-semibold transition-colors duration-200">
                      {item.title}
                    </CardTitle>
                    <CardDescription className="text-muted-foreground text-base">
                      {truncateWords(item.description, 100)}
                    </CardDescription>
                  </CardHeader>
                </Card>
              </Link>
            </MotionPreset>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogPreview;
