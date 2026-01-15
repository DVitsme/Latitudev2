import {
  Building2Icon,
  RocketIcon,
  ArrowRightIcon,
} from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardContent,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";

const GetStarted = () => {
  return (
    <section className="py-8 sm:py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12 space-y-4 sm:mb-16 lg:mb-24">
          <Badge className="text-sm font-normal" variant="outline">
            Get Started
          </Badge>
          <h2 className="text-2xl font-semibold md:text-3xl lg:text-4xl">
            Let&apos;s Build Something Great Together
          </h2>
          <p className="text-muted-foreground text-xl">
            Welcome! You are just a few clicks away from finding exactly what—or
            who—you need. At Latitude, we believe the best partnerships start
            with a simple conversation. Select your path below, tell us a little
            about your goals, and let&apos;s get to work.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="flex gap-6 max-lg:flex-col">
          {/* Card 1 */}
          <Card className="group hover:border-primary hover:bg-muted flex-1 transition-all duration-500 hover:flex-2">
            <CardContent className="flex">
              <div className="space-y-6">
                <Avatar className="size-10 shadow-sm">
                  <AvatarFallback className="bg-card text-primary">
                    <Building2Icon className="size-5" />
                  </AvatarFallback>
                </Avatar>
                <div className="space-y-2">
                  <CardTitle className="text-primary line-clamp-2 text-lg font-semibold">
                    I Am Hiring Talent
                  </CardTitle>
                  <CardDescription className="line-clamp-2">
                    Grow your team stress-free with vetted, culture-fit talent.
                  </CardDescription>
                </div>
                <Button
                  className="group text-primary group-hover:bg-primary group-hover:text-primary-foreground rounded-full bg-transparent text-base transition-all duration-300 has-[>svg]:px-6"
                  size="lg"
                >
                  Find Your Next Hire
                  <ArrowRightIcon className="transition-transform duration-200 group-hover:translate-x-0.5" />
                </Button>
              </div>
              <div>
                <Image
                  src="/images/vectors/happy-notes.webp"
                  alt="I Am Hiring Talent"
                  className="mx-auto hidden w-40 shrink-0 object-contain group-hover:inline sm:size-56 dark:invert"
                  width={1000}
                  height={1000}
                />
              </div>
            </CardContent>
          </Card>

          {/* Card 2 */}
          <Card className="group flex-1 border-amber-600/30 transition-all duration-500 hover:flex-2 hover:border-amber-600 hover:bg-amber-600/10 dark:border-amber-400/30 dark:hover:border-amber-400 dark:hover:bg-amber-400/10">
            <CardContent className="flex">
              <div className="space-y-6">
                <Avatar className="size-10 shadow-sm">
                  <AvatarFallback className="bg-card text-amber-600 dark:text-amber-400">
                    <RocketIcon className="size-5" />
                  </AvatarFallback>
                </Avatar>
                <div className="space-y-2">
                  <CardTitle className="line-clamp-2 text-lg font-semibold text-amber-600 dark:text-amber-400">
                    I Am Looking for a Role
                  </CardTitle>
                  <CardDescription className="line-clamp-2">
                    Connect with forward-thinking companies that value your
                    unique skills.
                  </CardDescription>
                </div>
                <Button
                  className="group rounded-full bg-transparent text-base text-amber-600 transition-all duration-300 group-hover:bg-amber-600 group-hover:text-white has-[>svg]:px-6 dark:text-amber-400 dark:group-hover:bg-amber-400 dark:group-hover:text-white"
                  size="lg"
                >
                  Join Our Talent Network
                  <ArrowRightIcon className="transition-transform duration-200 group-hover:translate-x-0.5" />
                </Button>
              </div>
              <div className="dark:hidden">
                <Image
                  src="/images/vectors/house-of-cards-light.webp"
                  alt="Automate repetitive tasks with precision."
                  className="mx-auto hidden w-40 shrink-0 object-contain group-hover:inline sm:size-56"
                  width={1000}
                  height={1000}
                />
              </div>
              <div className="hidden dark:inline-block">
                <Image
                  src="/images/vectors/house-of-cards-dark.webp"
                  alt="Automate repetitive tasks with precision."
                  className="mx-auto hidden w-40 shrink-0 object-contain group-hover:inline sm:size-56"
                  width={1000}
                  height={1000}
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default GetStarted;
