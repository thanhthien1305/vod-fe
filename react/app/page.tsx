"use client";

import { Button, Input } from "@heroui/react";

export default function Home() {
  return (
    <div className="relative h-screen w-screen">
      <div
        className="inset-0 bg-no-repeat bg-cover w-full h-full flex justify-center items-center"
        style={{ backgroundImage: "url('./landing-page/bg-landing-page.png')" }}
      >
        <div className="absolute inset-0 layer-landing from-transparent to-black/50 z-10" />

        <div className="text-center z-20 space-y-8">
          <div>
            <div className="font-bold text-bold-title1 text-white">
              Unlimited movies, TV shows, and more
            </div>
            <div className="text-regular-title2 text-white">Starts at 70,000 ₫. Cancel anytime.</div>
          </div>

          <div className="space-y-4 w-[80%] mx-auto">
            <div className="text-regular-title4 text-white">Ready to watch? Enter your email to create or restart your membership.</div>
            <div className="flex gap-3 h-[60px]">
              <Input
                isDisabled
                className="w-3/4 rounded-xl"
                label="Email"
                type="email"
              />
              <Button href="/auth" variant="flat" className="rounded-xl bg-red-primary font-medium text-medium-title3 w-1/4">
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}