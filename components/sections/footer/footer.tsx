import { ArrowUpRight, Facebook, Instagram, Twitter } from "lucide-react";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import SectionTitle from "@/components/ui/sectionTitle";

const Footer = () => {
    const socialLinks = {
    link1: {
      url: "#",
      label: "Twitter",
    },
    link2: {
      url: "#",
      label: "Instagram",
    },
    link3: {
      url: "#",
      label: "Facebook",
    },
  }
  return (
    <footer className={cn("relative py-32")}>
      <div className="mx-auto relative z-10 container">
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-2 text-center">
          {/* Pre-heading with decorative lines */}
          <SectionTitle text="Connecting Talent with Opportunity" />

          {/* Main heading */}
          <h2 className="md:text-65xl py-6 text-6xl">
            Latitude Recruiting and Placement Agency
          </h2>

          {/* Description */}
          <p className="max-w-2xl text-base text-muted-foreground md:text-lg">
            Latitude is a recruiting and placement agency that specializes in
            finding the right talent for your business. We are a team of
            experienced recruiters and placement specialists who are dedicated
            to helping you find the best talent for your business.
          </p>

          <Button asChild variant="outline">
            <Link
              href="mailto:hello@latitude.com"
              className="group relative mt-4 block rounded-lg border bg-white px-8 py-6 text-base transition-all"
            >
              <span className="text-secondary-foreground">Get in touch</span>
              <ArrowUpRight className="h-4 w-4 text-foreground transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </Link>
          </Button>

          {/* Social Media Links */}
          <div className="flex items-center gap-6 pt-8">
            <Link
              href={socialLinks.link1.url}
              className="text-muted-foreground transition-colors hover:text-foreground"
              aria-label={socialLinks.link1.label}
            >
              <Twitter className="h-5 w-5" />
            </Link>
            <div className="h-4 w-px bg-border" />
            <Link
              href={socialLinks.link2.url}
              className="text-muted-foreground transition-colors hover:text-foreground"
              aria-label={socialLinks.link2.label}
            >
              <Instagram className="h-5 w-5" />
            </Link>
            <div className="h-4 w-px bg-border" />
            <Link
              href={socialLinks.link3.url}
              className="text-muted-foreground transition-colors hover:text-foreground"
              aria-label={socialLinks.link3.label}
            >
              <Facebook className="h-5 w-5" />
            </Link>
          </div>

          {/* Support Email */}
          <p className="pt-2 text-sm text-muted-foreground md:text-base">
            <Link
              href="mailto:hello@latitude.com"
              className="transition-colors hover:text-foreground"
            >
              placement@latituderpa.com
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
