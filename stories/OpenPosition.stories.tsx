import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import "../app/globals.css";

import OpenPosition from "../components/sections/jobs/openPosition";

const meta = {
  title: "Sections/OpenPosition",
  component: OpenPosition,
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
} satisfies Meta<typeof OpenPosition>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <OpenPosition />,
};

