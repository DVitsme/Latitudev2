"use client";

import { useEffect, useRef, type ReactNode } from "react";

import {
  motion,
  useScroll,
  useMotionValue,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react";

import { ArrowUpRightIcon } from "lucide-react";

import { MotionPreset } from "@/components/ui/motion-preset";
import { cn } from "@/lib/utils";
import {
  PrimaryFlowButton,
  SecondaryFlowButton,
} from "@/components/ui/flow-button";
import Image from "next/image";

export interface FeatureMediaImage {
  type: "image";
  src: string;
}

export interface FeatureMediaVideo {
  type: "video";
  src: string;
}

export type FeatureMedia = FeatureMediaImage | FeatureMediaVideo;

export interface SlidingCardsFeature {
  icon: ReactNode;
  title: string;
  description: string;
  media: FeatureMedia;
}

export type SlidingCardsFeatures = SlidingCardsFeature[];

const FeatureItem = ({
  feature,
  index,
  totalFeatures,
  scrollYProgress,
}: {
  feature: SlidingCardsFeatures[number];
  index: number;
  totalFeatures: number;
  scrollYProgress: MotionValue<number>;
}) => {
  const start = index / totalFeatures;
  const middle = (index + 0.5) / totalFeatures;
  const end = (index + 1) / totalFeatures;
  const isFirst = index === 0;
  const isLast = index === totalFeatures - 1;

  const opacity = useTransform(
    scrollYProgress,
    isFirst
      ? [0, middle - 0.05, middle + 0.05, end]
      : isLast
      ? [start, middle - 0.05, middle + 0.05, 1]
      : [start, middle - 0.05, middle + 0.05, end],
    isFirst ? [1, 1, 1, 0.3] : isLast ? [0.3, 1, 1, 1] : [0.3, 1, 1, 0.3]
  );

  const y = useTransform(
    scrollYProgress,
    isFirst
      ? [0, middle, end]
      : isLast
      ? [start, middle, 1]
      : [start, middle, end],
    isFirst ? [0, 0, -30] : isLast ? [30, 0, 0] : [30, 0, -30]
  );

  return (
    <motion.div
      style={{ opacity, y }}
      className={cn("flex h-125 items-center justify-center")}
    >
      <div className="space-y-4">
        <div className="flex items-center gap-4">
          {feature.icon}
          <div className="font-medium md:text-2xl xl:text-3xl">
            {feature.title}
          </div>
        </div>
        <div className="text-muted-foreground">{feature.description}</div>
      </div>
    </motion.div>
  );
};

const MediaItem = ({
  feature,
  index,
  totalFeatures,
  scrollYProgress,
}: {
  feature: SlidingCardsFeatures[number];
  index: number;
  totalFeatures: number;
  scrollYProgress: MotionValue<number>;
}) => {
  const start = index / totalFeatures;
  const middle = (index + 0.5) / totalFeatures;
  const end = (index + 1) / totalFeatures;
  const isFirst = index === 0;
  const isLast = index === totalFeatures - 1;

  // Fixed: middle items now use 0.3 instead of 0 to match text opacity
  const opacity = useTransform(
    scrollYProgress,
    isFirst
      ? [0, middle - 0.05, middle + 0.05, end]
      : isLast
      ? [start, middle - 0.05, middle + 0.05, 1]
      : [start, middle - 0.05, middle + 0.05, end],
    isFirst ? [1, 1, 1, 0] : isLast ? [0, 1, 1, 1] : [0, 1, 1, 0]
  );

  return (
    <motion.div
      style={{ opacity }}
      className={cn(
        "absolute inset-0",
        feature.media.type === "image"
          ? "flex items-center justify-center px-3"
          : "flex"
      )}
      transition={{ duration: 0.3 }}
    >
      {feature.media.type === "image" ? (
        <Image
          width={1000}
          height={1000}
          src={feature.media.src}
          alt={feature.title}
          className="max-h-full w-full max-w-110 object-contain"
        />
      ) : (
        <video
          className="h-full w-full object-cover"
          src={feature.media.src}
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
        />
      )}
    </motion.div>
  );
};

const SlidingCards = ({ featuresList }: { featuresList: SlidingCardsFeatures }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageColRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  const cardY = useMotionValue(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Create rotation for diamonds - rotates 360deg once for each image change
  const diamondRotationRaw = useTransform(scrollYProgress, (progress) => {
    const currentIndex = Math.min(
      Math.floor(progress * featuresList.length),
      featuresList.length - 1
    );

    return currentIndex * 360;
  });

  // Apply spring to smooth the rotation transition
  const diamondRotation = useSpring(diamondRotationRaw, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    const imageColEl = imageColRef.current;
    const cardEl = cardRef.current;
    if (!imageColEl || !cardEl) return;

    let rafId: number | null = null;

    const clamp = (min: number, value: number, max: number) =>
      Math.max(min, Math.min(value, max));

    const update = () => {
      const colRect = imageColEl.getBoundingClientRect();
      const cardRect = cardEl.getBoundingClientRect();

      const colTop = colRect.top + window.scrollY;
      const colHeight = colRect.height;
      const cardHeight = cardRect.height;

      if (colHeight <= 0 || cardHeight <= 0) return;

      const viewportCenterY = window.scrollY + window.innerHeight / 2;
      const desiredTop = viewportCenterY - cardHeight / 2;
      const desiredY = desiredTop - colTop;

      const maxY = Math.max(0, colHeight - cardHeight);
      cardY.set(clamp(0, desiredY, maxY));
    };

    const schedule = () => {
      if (rafId != null) return;
      rafId = window.requestAnimationFrame(() => {
        rafId = null;
        update();
      });
    };

    schedule();

    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);

    const ro = new ResizeObserver(() => schedule());
    ro.observe(imageColEl);
    ro.observe(cardEl);

    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      ro.disconnect();
      if (rafId != null) window.cancelAnimationFrame(rafId);
    };
  }, [cardY]);

  return (
    <section className="bg-[image:repeating-linear-gradient(45deg,color-mix(in_oklab,var(--border)40%,transparent)0,color-mix(in_oklab,var(--border)40%,transparent)1px,transparent_0,transparent_50%)] bg-[size:12px_12px] bg-fixed px-4 sm:px-6 lg:px-8">
      <div className="bg-background mx-auto max-w-7xl border-x py-8 sm:py-16 lg:py-24">
        {/* Header */}
        <div className="mb-12 space-y-4 text-center max-md:px-4 sm:mb-16 lg:mb-24">
          <MotionPreset
            className="text-primary text-sm font-medium uppercase"
            fade
            slide={{ direction: "down" }}
            transition={{ duration: 0.5 }}
          >
            How we work
          </MotionPreset>

          <MotionPreset
            component="h2"
            className="text-2xl font-semibold md:text-3xl lg:text-4xl"
            fade
            slide={{ direction: "down" }}
            transition={{ duration: 0.5 }}
            delay={0.2}
          >
            Our Methodology
          </MotionPreset>

          <MotionPreset
            component="p"
            className="text-muted-foreground mx-auto max-w-5xl text-xl"
            fade
            slide={{ direction: "down" }}
            transition={{ duration: 0.5 }}
            delay={0.4}
          >
            In today&apos;s competitive landscape, relying solely on inbound
            applications often limits your pool to active seekers who may not
            fully match your specific needs. Our comprehensive strategy is
            designed to uncover the very best talent, not just the currently
            available talent. We look deeper than standard job boards, utilizing
            advanced sourcing techniques to identify high-performing
            professionals who are thriving in their fields.
            requires.
          </MotionPreset>
        </div>

        {/* Features Grid */}
        <MotionPreset
          delay={0.8}
          fade
          slide={{ direction: "down" }}
          transition={{ duration: 0.5 }}
        >
          <div ref={containerRef} className="grid gap-6 md:grid-cols-2">
            {/* Desktop: Sticky scroll features */}
            <div className="relative hidden w-full space-y-20 px-6 py-20 md:block">
              {featuresList.map((feature, index) => (
                <FeatureItem
                  key={index}
                  feature={feature}
                  index={index}
                  totalFeatures={featuresList.length}
                  scrollYProgress={scrollYProgress}
                />
              ))}
            </div>

            {/* Desktop: Sticky scroll images */}
            <div
              ref={imageColRef}
              className="bg-muted relative hidden w-full items-center justify-center space-y-20 px-6 py-20 md:block"
            >
              <motion.div
                ref={cardRef}
                className="bg-card absolute inset-x-0 flex h-125 items-center justify-center overflow-hidden rounded-xl border"
                style={{ y: cardY }}
              >
                {featuresList.map((feature, index) => (
                  <MediaItem
                    key={index}
                    feature={feature}
                    index={index}
                    totalFeatures={featuresList.length}
                    scrollYProgress={scrollYProgress}
                  />
                ))}

                {[
                  "top-4.5 left-4.5",
                  "top-4.5 right-4.5",
                  "bottom-4.5 left-4.5",
                  "bottom-4.5 right-4.5",
                ].map((position, idx) => (
                  <motion.svg
                    key={idx}
                    xmlns="http://www.w3.org/2000/svg"
                    width="10"
                    height="12"
                    viewBox="0 0 10 12"
                    fill="none"
                    className={cn("absolute", position)}
                    style={{ rotate: diamondRotation }}
                  >
                    <path d="M5 0L10 6L5 12L0 6L5 0Z" fill="var(--primary)" />
                  </motion.svg>
                ))}
              </motion.div>
            </div>

            {/* Mobile: Simple stacked layout */}
            <div className="flex flex-col gap-16 md:hidden">
              {featuresList.map((feature, index) => (
                <div key={index} className="space-y-16">
                  <div className="bg-muted relative px-6 py-20">
                    <div className="bg-card sticky top-20 flex h-87.5 items-center justify-center overflow-hidden rounded-xl border">
                      <div className="absolute inset-0">
                        {feature.media.type === "image" ? (
                          <div className="flex h-full w-full items-center justify-center">
                            <Image
                              width={1000}
                              height={1000}
                              src={feature.media.src}
                              alt={feature.title}
                              className="size-full max-h-70 max-w-96 object-contain max-sm:max-w-70"
                            />
                          </div>
                        ) : (
                          <video
                            className="h-full w-full object-cover"
                            src={feature.media.src}
                            autoPlay
                            loop
                            muted
                            playsInline
                            preload="metadata"
                          />
                        )}
                      </div>
                      {[
                        "top-4.5 left-4.5",
                        "top-4.5 right-4.5",
                        "bottom-4.5 left-4.5",
                        "bottom-4.5 right-4.5",
                      ].map((position, idx) => (
                        <svg
                          key={idx}
                          xmlns="http://www.w3.org/2000/svg"
                          width="10"
                          height="12"
                          viewBox="0 0 10 12"
                          fill="none"
                          className={cn("absolute", position)}
                        >
                          <path
                            d="M5 0L10 6L5 12L0 6L5 0Z"
                            fill="var(--primary)"
                          />
                        </svg>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-4 max-md:px-4">
                    <div className="flex items-center gap-4">
                      {feature.icon}
                      <div className="text-xl font-medium">{feature.title}</div>
                    </div>
                    <div className="text-muted-foreground">
                      {feature.description}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </MotionPreset>
      </div>
    </section>
  );
};

export default SlidingCards;
