"use client";

import * as React from "react";
import { useEffect, useRef, useState } from "react";
import { useInView } from "motion/react";

export interface TypewriterProps {
  text: string | string[];
  speed?: number;
  cursor?: string;
  loop?: boolean;
  deleteSpeed?: number;
  delay?: number;
  className?: string;
}

export function Typewriter({
  text,
  speed = 100,
  cursor = "|",
  className,
}: TypewriterProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "0px" });
  const [hasStarted, setHasStarted] = useState(false);

  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  // Validate and process input text
  const textArray = Array.isArray(text) ? text : [text];
  const currentText = textArray[0] || "";

  // Start animation when in view (only once)
  useEffect(() => {
    if (!isInView) return;
    if (hasStarted) return;

    const rafId = window.requestAnimationFrame(() => {
      setHasStarted(true);
    });

    return () => window.cancelAnimationFrame(rafId);
  }, [hasStarted, isInView]);

  useEffect(() => {
    if (!currentText) return;
    if (!hasStarted) return;
    if (isComplete) return;

    const timeout = setTimeout(
      () => {
        if (currentIndex < currentText.length) {
          setDisplayText((prev) => prev + currentText[currentIndex]);
          setCurrentIndex((prev) => prev + 1);
        } else {
          // Text is complete - stop here
          setIsComplete(true);
        }
      },
      speed
    );

    return () => clearTimeout(timeout);
  }, [currentIndex, currentText, speed, isComplete, hasStarted]);

  return (
    <div ref={ref} className={className}>
      <h2 className="text-2xl font-normal md:text-3xl lg:text-4xl">
        {displayText}
        {!isComplete && <span className="animate-pulse">{cursor}</span>}
      </h2>
    </div>
  );
}
