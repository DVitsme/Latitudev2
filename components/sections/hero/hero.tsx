"use client";

import AutoScroll from "embla-carousel-auto-scroll";
import Autoplay from "embla-carousel-autoplay";
import { ArrowRight } from "lucide-react";
import React from "react";

import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface HeroProps {
  className?: string;
}

const Hero = ({ className }: HeroProps) => {
  const images = [
    "/images/Staffing/job-interview3.jpg",
    "/images/Staffing/job-interviewv2.jpg",
    "/images/Staffing/hired-woman.jpg",
    "/images/Staffing/man-on-laptop-smile.jpg",
    "/images/Staffing/friends.jpg",
    "/images/Staffing/interviewer.jpg",
    "/images/Staffing/studying-off-the-top.jpg",
    "/images/Staffing/happy-man.jpg",
    "/images/Staffing/man-at-workv2.jpg",
    "/images/Staffing/woman-on-phone-square.jpg",
    "/images/Staffing/man-interviewing.jpg",
    "/images/Staffing/happy-woman.jpg",
    "/images/Staffing/woman-handshake-square.jpg",
    "/images/Staffing/woman-talking.jpg",
    "/images/Staffing/man-at-desk.jpg",
    "/images/Staffing/two-men-handshake.jpg",
    "/images/Staffing/woman-sitting-listening.jpg",
    "/images/Staffing/woman-drinking-coffee-at-desk.jpg",
    "/images/Staffing/happy-team.jpg",
    "/images/Staffing/woman-getting-interviewed-square.jpg",
    "/images/Staffing/man-looking-off-screen.jpg",
  ];
  const logos = [
    {
      id: "logo-1",
      description: "Logo 1",
      image:
        "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/astro-wordmark.svg",
      className: "h-7 w-auto",
    },
    {
      id: "logo-2",
      description: "Logo 2",
      image:
        "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/company/fictional-company-logo-1.svg",
      className: "h-7 w-auto",
    },
    {
      id: "logo-3",
      description: "Logo 3",
      image:
        "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/company/fictional-company-logo-2.svg",
      className: "h-7 w-auto",
    },
    {
      id: "logo-4",
      description: "Logo 4",
      image:
        "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/company/fictional-company-logo-3.svg",
      className: "h-7 w-auto",
    },
    {
      id: "logo-5",
      description: "Logo 5",
      image:
        "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/company/fictional-company-logo-4.svg",
      className: "h-7 w-auto",
    },
    {
      id: "logo-6",
      description: "Logo 6",
      image:
        "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/company/fictional-company-logo-5.svg",
      className: "h-5 w-auto",
    },
    {
      id: "logo-7",
      description: "Logo 7",
      image:
        "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/company/fictional-company-logo-6.svg",
      className: "h-7 w-auto",
    },
    {
      id: "logo-8",
      description: "Logo 8",
      image:
        "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/company/fictional-company-logo-7.svg",
      className: "h-7 w-auto",
    },
    {
      id: "logo-1",
      description: "Logo 1",
      image:
        "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/astro-wordmark.svg",
      className: "h-7 w-auto",
    },
    {
      id: "logo-2",
      description: "Logo 2",
      image:
        "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/company/fictional-company-logo-1.svg",
      className: "h-7 w-auto",
    },
    {
      id: "logo-3",
      description: "Logo 3",
      image:
        "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/company/fictional-company-logo-2.svg",
      className: "h-7 w-auto",
    },
    {
      id: "logo-4",
      description: "Logo 4",
      image:
        "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/company/fictional-company-logo-3.svg",
      className: "h-7 w-auto",
    },
    {
      id: "logo-5",
      description: "Logo 5",
      image:
        "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/company/fictional-company-logo-4.svg",
      className: "h-7 w-auto",
    },
    {
      id: "logo-6",
      description: "Logo 6",
      image:
        "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/company/fictional-company-logo-5.svg",
      className: "h-5 w-auto",
    },
    {
      id: "logo-7",
      description: "Logo 7",
      image:
        "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/company/fictional-company-logo-6.svg",
      className: "h-7 w-auto",
    },
    {
      id: "logo-8",
      description: "Logo 8",
      image:
        "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/company/fictional-company-logo-7.svg",
      className: "h-7 w-auto",
    },
  ];
  return (
    <section id="home" className={cn("my-20", className)}>
      <div className="mx-auto flex flex-col items-center justify-center gap-4 text-center">
        <Button
          variant="secondary"
          className="group flex w-fit items-center justify-center gap-3 rounded-full bg-muted/70 px-5 py-1"
        >
          <span className="size-2.5 rounded-full bg-foreground" />
          Find what you are looking for
        </Button>
        <h1 className="max-w-3xl font-calSans text-5xl font-medium tracking-tight text-foreground md:text-7xl">
          Building World-Class Teams Through Strategic Talent Acquisition
        </h1>
        <p className="mt-3 max-w-xl text-muted-foreground/80">
          Latitude Recruiting connects premier organizations with high-impact
          professionals. We go beyond the resume to ensure the perfect alignment
          of skills, character, and cultural fit.
        </p>
        <div className="mt-8 mb-12 flex gap-4">
          <Button
            variant="secondary"
            className="group flex w-fit items-center justify-center gap-2 rounded-full px-4 py-1 tracking-tight"
          >
            <span>Looking To Hire</span>
            <ArrowRight className="size-4 -rotate-45 transition-all ease-out group-hover:ml-3 group-hover:rotate-0" />
          </Button>
          <Button
            variant="default"
            className="group flex w-fit items-center justify-center gap-2 rounded-full px-4 py-1 tracking-tight"
          >
            <span>For Job Seekers</span>
            <ArrowRight className="size-4 -rotate-45 transition-all ease-out group-hover:ml-3 group-hover:rotate-0" />
          </Button>
        </div>

        <div className="relative mx-auto flex items-center justify-center">
          <Carousel
            plugins={[AutoScroll({ playOnInit: true })]}
            opts={{ loop: true, align: "start" }}
          >
            <CarouselContent className="ml-0">
              {logos.map((logo, index) => (
                <CarouselItem
                  key={index}
                  className="relative mr-6 flex h-15 basis-1/2 justify-center pl-0 opacity-30 sm:basis-1/4 md:basis-1/3 lg:basis-1/9"
                >
                  <div className="flex flex-col items-center justify-center">
                    <Image
                      src={logo.image}
                      width={100}
                      height={100}
                      alt={logo.description}
                      className={logo.className}
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
          <div className="bg-gradient-t o-r absolute inset-y-0 left-0 w-32 from-background to-transparent"></div>
          <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-background to-transparent"></div>
        </div>
        <div className="relative mx-auto -mt-12 flex items-center justify-center">
          <Carousel
            plugins={[Autoplay({ delay: 1500 })]}
            opts={{ loop: true, align: "start" }}
          >
            <CarouselContent>
              {images.map((image, index) => (
                <CarouselItem
                  key={index}
                  className="relative flex basis-1/2 translate-y-18 cursor-grab justify-center active:cursor-grabbing sm:basis-1/4 md:basis-1/3 lg:basis-1/5"
                >
                  <div className="easeOut mt-auto w-full overflow-hidden rounded-t-3xl border transition-all hover:-translate-y-18">
                    <Image
                      src={image}
                      width={500}
                      height={500}
                      alt={`Image ${index}`}
                      className="h-full w-full object-cover"
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default Hero;
