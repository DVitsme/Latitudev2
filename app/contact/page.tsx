"use client";

import ContactForm from "@/components/contact/contact-form";

import { Card, CardContent, CardTitle } from "@/components/ui/card";

import { BorderBeam } from "@/components/ui/border-beam";
import { MotionPreset } from "@/components/ui/motion-preset";
import Image from "next/image";

const ContactUs = () => {
  return (
    <div className="pt-16 relative h-full lg:pt-24">
      {/* Background image container with overlay */}
        <Image
        width={1000}
        height={1000}
        alt="Contact us background"
        className="absolute inset-0 h-150 w-full bg-cover bg-center bg-no-repeat"
        src="https://cdn.shadcnstudio.com/ss-assets/blocks/marketing/contact-us/image-2.png"
      />

      {/* Content container */}
      <div className="relative mx-auto h-full px-4 py-6 sm:px-6 md:py-12 lg:px-8">
        <div className="mx-auto max-w-7xl py-12">
          {/* Header */}
          <div className="mb-12 text-center text-white sm:mb-16 lg:mb-24">
            <MotionPreset
              component="h2"
              className="mb-4 text-2xl font-semibold text-white md:text-3xl lg:text-4xl"
              fade
              slide={{ direction: "down", offset: 50 }}
              blur
              transition={{ duration: 0.5 }}
            >
              Get in touch with us for more information
            </MotionPreset>

            <MotionPreset
              component="p"
              className="text-xl"
              fade
              blur
              slide={{ direction: "down", offset: 50 }}
              delay={0.3}
              transition={{ duration: 0.5 }}
            >
              If you need help or have a question, we&apos;re here for you
            </MotionPreset>
          </div>

          <MotionPreset
            fade
            slide={{ direction: "down", offset: 30 }}
            blur
            transition={{ duration: 0.5 }}
            delay={0.6}
          >
            <Card className="relative max-w-6xl mx-auto overflow-hidden border-0 shadow-md">
              <CardContent className="grid gap-10 lg:grid-cols-7">
                {/* Form Section */}
                <div className="lg:col-span-4">
                  <CardTitle className="mb-6 text-3xl">Say hello!</CardTitle>
                  <ContactForm />
                </div>

                {/* Contact Information */}
                <div className="space-y-6 lg:col-span-3">
                  <div className="flex gap-6 max-sm:flex-col lg:flex-col">
                    <div className="w-full rounded-xl border p-6 text-center">
                      <h3 className="mb-4 text-xl font-semibold">
                        Company Email/Phone
                      </h3>
                      <p className="text-muted-foreground mb-2 text-lg">
                        johndoe@gmail.com
                      </p>
                      <p className="text-muted-foreground text-lg">
                        +148 589 2001 2466
                      </p>
                    </div>
                    <div className="w-full rounded-xl border p-6 text-center">
                      <h3 className="mb-4 text-xl font-semibold">
                        Visit Our HQ
                      </h3>
                      <p className="text-muted-foreground text-lg">
                        Office 149,
                      </p>
                      <p className="text-muted-foreground text-lg">
                        450 South Brand Brooklyn
                      </p>
                      <p className="text-muted-foreground text-lg">
                        San Diego County,
                      </p>
                      <p className="text-muted-foreground text-lg">
                        CA 91905, USA
                      </p>
                    </div>
                  </div>

                  <p className="text-center">
                    Opening Hours{" "}
                    <span className="text-primary">8AM - 5PM</span> Everyday
                  </p>
                </div>
              </CardContent>
              <BorderBeam
                borderWidth={2}
                duration={9}
                size={200}
                className="via-primary from-transparent to-transparent"
              />
              <BorderBeam
                duration={9}
                delay={13}
                size={200}
                borderWidth={2}
                className="via-destructive from-transparent to-transparent"
              />
            </Card>
          </MotionPreset>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
