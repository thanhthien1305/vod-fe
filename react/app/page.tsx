"use client";

import CardFilm from "@/components/film-card";
import { Button, Input } from "@heroui/react";
import { Carousel } from "./context/CarouselContext ";
import { CarouselMain } from "@/components/carousel";

export default function Home() {
  return (
    <div className="w-screen">
      <div className="relative h-screen w-screen">
        <div
          className="inset-0 bg-no-repeat bg-cover w-full h-full flex justify-center items-center"
          style={{ backgroundImage: "url('./bg-main.png')" }}
        />
      </div>

      <div className="flex flex-col items-center justify-center gap-4 py-8 md:py-10 relative">


        <div className="w-[80%] space-y-4">
          <h1 className="text-white text-3xl font-semibold">Match to you</h1>

            <CarouselMain/>
        </div>

      </div>
    </div>

  );
}