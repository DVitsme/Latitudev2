import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import "../app/globals.css";

import { BotMessageSquareIcon, ChartPieIcon, LayersIcon } from "lucide-react";

import SlidingCards, {
  type SlidingCardsFeatures,
} from "../components/sections/sliding-cards/slidingCards";

const featuresList = [
  {
    icon: <ChartPieIcon />,
    title: "Precision Profiling",
    description:
      "We move beyond standard job descriptions, outlining the key qualifications and essential soft skills required.",
    media: {
      type: "video",
      src: "/videos/3205619-sd_960_540_25fps.mp4",
    },
  },
  {
    icon: <BotMessageSquareIcon />,
    title: "Proactive Sourcing",
    description:
      "We engage passive candidates, validating skills before they ever reach your desk.",
    media: {
      type: "image",
      src: "https://cdn.shadcnstudio.com/ss-assets/template/landing-page/Flow/image-02.png",
    },
  },
  {
    icon: <LayersIcon />,
    title: "Employer Branding Alignment",
    description:
      "We accurately represent your culture and benefits so you attract the highest caliber of talent.",
    media: {
      type: "image",
      src: "https://cdn.shadcnstudio.com/ss-assets/template/landing-page/Flow/image-03.png",
    },
  },
] satisfies SlidingCardsFeatures;

const meta = {
  title: "Sections/SlidingCards",
  component: SlidingCards,
  parameters: {
    layout: "fullscreen",
  },
  decorators: [
    (Story) => (
      <div className="bg-background text-foreground min-h-screen">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof SlidingCards>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    featuresList,
  },
  render: (args) => <SlidingCards {...args} />,
};

