import { LayersIcon, BotMessageSquareIcon, ChartPieIcon } from "lucide-react";

import Hero from "@/components/sections/hero/hero";
import SlidingCards from "@/components/sections/sliding-cards/slidingCards";
import type { SlidingCardsFeatures } from "@/components/sections/sliding-cards/slidingCards";
import AboutUs from "@/components/sections/about/aboutUs";
import { Typewriter } from "@/components/sections/typewriter/typewriter";
import BlogPreview from "@/components/sections/blog/blogPreview";
import OpenPosition from "@/components/sections/jobs/openPosition";
import SectionTitle from "@/components/ui/sectionTitle";
import Testimonials from "@/components/sections/testimonials/testimonials";

export default function Home() {

  // Sliding Cards Section
const features = [
  {
    icon: <ChartPieIcon />,
    title: "Precision Profiling",
    description:
      "We move beyond standard job descriptions. Whether you need a high-level strategic leader or an agile tactical specialist, we outline the key qualifications, experience levels, and essential soft skills required. We prioritize cultural fit to ensure the candidate aligns seamlessly with your company values.",
    media: {
      type: "video",
      src: "/videos/3205619-sd_960_540_25fps.mp4",
    },
  },
  {
    icon: <BotMessageSquareIcon />,
    title: "Proactive Sourcing",
    description:
      "Top talent is not always looking at job boards. We utilize a sourcing-first approach, leveraging multiple channels to seek out passive candidates who are thriving in their fields. We personally engage these professionals, validating their skills before they ever reach your desk.",
    media: {
      type: "video",
      src: "/videos/pitching.mp4",
    },
  },
  {
    icon: <LayersIcon />,
    title: "Employer Branding Alignment",
    description:
      "Quality candidates research companies before applying. We help strengthen your position in the market by accurately representing your company culture, competitive benefits, and opportunities for professional growth, ensuring your organization attracts the highest caliber of talent.",
    media: {
      type: "video",
      src: "/videos/team-editing.mp4",
    },
  },
] satisfies SlidingCardsFeatures;


  return (
    <>
      <Hero />
      <div className="container mx-auto text-center max-w-7xl px-4 sm:px-6 lg:px-8 lg:py-24 ">
        <SectionTitle text="Our Mission Statement" />
        <Typewriter
          text="To empower businesses by curating teams that drive growth, fostering long-term partnerships between exceptional talent and forward-thinking companies. At Latitude, we don't just fill positions; we secure the future of your organization."
          speed={300}
          cursor="_"
          className="py-8 text-2xl font-semibold md:text-3xl lg:text-4xl "
        />
        <SectionTitle text="" />
      </div>
      <AboutUs />
      <SlidingCards featuresList={features} />
      <OpenPosition />
      <Testimonials />
      <BlogPreview />
    </>
  );
}

