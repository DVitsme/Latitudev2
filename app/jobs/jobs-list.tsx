"use client";

import * as React from "react";
import Link from "next/link";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

interface JobListItem {
  id: string;
  title: string;
  description: string;
  company: string;
  location: string;
  date: string;
  category: string;
  link: string;
}

interface JobsListProps {
  items: JobListItem[];
}

const JobsList = ({ items }: JobsListProps) => {
  const [selectedCategory, setSelectedCategory] =
    React.useState("All Positions");

  const categories = [
    "All Positions",
    ...Array.from(new Set(items.map((item) => item.category).filter(Boolean))),
  ];

  const filteredItems =
    selectedCategory === "All Positions"
      ? items
      : items.filter((item) => item.category === selectedCategory);

  return (
    <div className="mx-auto mt-20 grid max-w-7xl grid-cols-1 gap-20 lg:grid-cols-4">
      <div className="hidden flex-col gap-2 lg:flex">
        {categories.map((category) => (
          <Button
            variant="ghost"
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={cn(
              "justify-start text-left",
              selectedCategory === category &&
                "bg-secondary text-secondary-foreground hover:bg-secondary/80"
            )}
          >
            {category}
          </Button>
        ))}
      </div>
      <div className="lg:col-span-3">
        {filteredItems.map((item, index) => (
          <React.Fragment key={item.id}>
            <Link href={item.link} className="flex flex-col gap-3">
              <p className="text-sm font-semibold text-muted-foreground">
                {item.location || item.category}
              </p>
              <h3 className="text-2xl font-semibold text-balance lg:text-3xl">
                {item.title}
              </h3>
              <p className="text-muted-foreground">{item.description}</p>
              <div className="mt-3 flex items-center gap-2 text-sm">
                <span className="font-medium">{item.company}</span>
                {item.date && (
                  <span className="text-muted-foreground">on {item.date}</span>
                )}
              </div>
            </Link>
            {index < filteredItems.length - 1 && (
              <Separator className="my-8" />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default JobsList;
