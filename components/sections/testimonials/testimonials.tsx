"use client";

import * as React from "react";
import { useState, useEffect } from "react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  type CarouselApi,
} from "@/components/ui/carousel";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface Testimonial {
  quote: string;
  author: {
    name: string;
    title: string;
    image: string;
  };
}

const testimonials: Testimonial[] = [
  {
    quote:
      "Using Hiring completely transformed our recruitment process. What used to take weeks now takes days — from sourcing to scheduling to onboarding",
    author: {
      name: "Olivia Bennett",
      title: "Head of Marketing, Vertical Brand",
      image:
        "https://cdn.prod.website-files.com/68871bf814f825a71842d07f/68887e428f7843d435b22c35_Recruiters.jpg",
    },
  },
  {
    quote:
      "Thanks to Hiring, our entire hiring pipeline is faster and more efficient. We've cut down our recruitment time drastically — what used to take weeks is now wrapped up in days",
    author: {
      name: "Olivia Bennett",
      title: "Head of Marketing, Vertical Brand",
      image:
        "https://cdn.prod.website-files.com/68871bf814f825a71842d07f/68887e428f7843d435b22c35_Recruiters.jpg",
    },
  },
  {
    quote:
      "Using Hiring has streamlined every step of our recruitment process. From sourcing talent to onboarding new hires, everything is faster and smoother — we're talking days instead of weeks",
    author: {
      name: "Olivia Bennett",
      title: "Head of Marketing, Vertical Brand",
      image:
        "https://cdn.prod.website-files.com/68871bf814f825a71842d07f/68887e428f7843d435b22c35_Recruiters.jpg",
    },
  },
];

export default function Testimonials() {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) return;

    const onSelect = () => {
      setCurrent(api.selectedScrollSnap());
    };

    // Set initial value
    onSelect();

    // Subscribe to changes
    api.on("select", onSelect);

    return () => {
      api.off("select", onSelect);
    };
  }, [api]);

  const scrollTo = (index: number) => {
    api?.scrollTo(index);
  };

  return (
    <section className="bg-muted py-16 sm:py-24 lg:py-32">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Carousel
          setApi={setApi}
          opts={{
            align: "center",
            loop: true,
          }}
          className="relative mx-auto w-full max-w-5xl"
        >
          <CarouselContent>
            {testimonials.map((testimonial, index) => (
              <CarouselItem key={index}>
                <div className="flex flex-col items-center space-y-8 px-4 py-8 text-center sm:px-12 md:px-16 lg:px-20">
                  <blockquote className="space-y-8">
                    <p className="text-2xl font-normal leading-tight text-foreground">
                      &ldquo;{testimonial.quote}&rdquo;
                    </p>
                  </blockquote>

                  <div className="flex flex-row items-center space-y-4">
                    <Avatar className="size-16">
                      <AvatarImage
                        src={testimonial.author.image}
                        alt={testimonial.author.name}
                      />
                      <AvatarFallback>
                        {testimonial.author.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="ml-4 text-left">
                      <p className="text-base font-semibold text-foreground sm:text-lg">
                        {testimonial.author.name}
                      </p>
                      <p className="text-sm text-muted-foreground sm:text-base">
                        {testimonial.author.title}
                      </p>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>

          <CarouselPrevious className="hidden sm:flex" />
          <CarouselNext className="hidden sm:flex" />

          {/* Dot indicators */}
          <div className="mt-8 flex justify-center gap-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => scrollTo(index)}
                className={cn(
                  "size-2 rounded-full transition-all duration-300",
                  current === index
                    ? "bg-foreground w-8"
                    : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                )}
                aria-label={`Go to testimonial ${index + 1}`}
                aria-current={current === index ? "true" : "false"}
              />
            ))}
          </div>
        </Carousel>
      </div>
    </section>
  );
}
