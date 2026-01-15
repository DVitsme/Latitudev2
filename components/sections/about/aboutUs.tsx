import { Badge } from "@/components/ui/badge";

import { MotionPreset } from "@/components/ui/motion-preset";

import Image from "next/image";


const AboutUs = () => {
  return (
    <section id="about" className="bg-background py-8 sm:py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-9 lg:grid-cols-2">
          <div className="flex flex-col gap-9">
            <div className="flex items-center gap-6 overflow-hidden">
              <div className="to-primary h-52 w-4 bg-linear-to-t from-transparent" />
              <MotionPreset
                slide={{ direction: "left" }}
                fade
                blur
                transition={{ duration: 0.8 }}
              >
                <div className="space-y-4">
                  <h2 className="text-2xl font-semibold md:text-3xl lg:text-4xl">
                    Our story
                  </h2>
                  <p className="text-muted-foreground text-xl font-semibold md:text-3xl">
                    Latitude was founded on the belief that connecting talented
                    people with talented teams{" "}
                    <span className="text-primary inline-block">
                      Changes the World
                    </span>
                  </p>
                </div>
              </MotionPreset>
            </div>

            <MotionPreset
              fade
              blur
              slide={{ direction: "up" }}
              delay={0.3}
              transition={{ duration: 0.8 }}
            >
              <Image
                width={1000}
                height={1000}
                src="/images/team/team6.jpg"
                alt="Team meeting office"
                className="max-h-91 w-full rounded-lg object-cover"
              />
            </MotionPreset>
          </div>

          {/* Cards */}
          <div className="flex flex-col gap-6">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <MotionPreset
                fade
                blur
                slide={{ direction: "up" }}
                delay={0.6}
                transition={{ duration: 0.8 }}
              >
                <div className="relative overflow-hidden rounded-md">
                  <Image
                    width={1000}
                    height={1000}
                    src="/images/team/team9.jpg"
                    alt="Team collaboration"
                    className="h-52 w-full rounded-md object-cover"
                  />
                  <div className="absolute top-6 right-6 flex gap-4">
                    <Badge>Loyalty</Badge>
                  </div>
                </div>
              </MotionPreset>
              <MotionPreset
                fade
                blur
                slide={{ direction: "up" }}
                delay={0.6}
                transition={{ duration: 0.8 }}
              >
                <div className="relative overflow-hidden rounded-md">
                  <Image
                    width={1000}
                    height={1000}
                    src="/images/team/team11.jpg"
                    alt="Team collaboration"
                    className="h-52 w-full rounded-md object-cover"
                  />
                  <div className="absolute top-6 right-6 flex gap-4">
                    <Badge>Data Driven</Badge>
                  </div>
                </div>
              </MotionPreset>
            </div>

            <div className="flex flex-1 flex-col justify-center gap-9">
              <MotionPreset
                fade
                blur
                slide={{ direction: "up" }}
                delay={0.8}
                transition={{ duration: 0.5 }}
              >
                <p className="text-muted-foreground text-xl lg:mt-8">
                  Latitude Recruiting and Placement Agency was founded on the
                  belief that recruitment is a specialized craft. We understand
                  that a resume only tells part of the story. By acting as an
                  extension of your internal team, we delve deep into your
                  organizational DNA to find candidates who offer not just
                  technical reliability, but the work ethic and personality that
                  contribute to long-term retention.
                </p>
              </MotionPreset>

              {/* Stats */}
              <MotionPreset
                fade
                blur
                slide={{ direction: "up" }}
                delay={0.9}
                transition={{ duration: 0.5 }}
              >
                <div className="">
                  <p className="text-muted-foreground text-xl">
                    From crafting precise job descriptions to leveraging
                    multi-channel sourcing, we provide a full-service experience
                    that allows you to focus on your business while we build
                    your team.
                  </p>
                </div>
              </MotionPreset>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
