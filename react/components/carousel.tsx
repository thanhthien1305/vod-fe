"use client"
import { Carousel, CarouselContent, CarouselItem } from "@/app/context/CarouselContext "
import * as React from "react"
import CardFilm from "./film-card"

export function CarouselMain({ films }: { films: any[] }) {
  return (
    <>
      <Carousel
      opts={{
        align: "start",
      }}
      className="w-[100%]"
    >
      <CarouselContent>
        {films.map((film, index) => (
          <CarouselItem key={index} className="md:basis-1/4 lg:basis-1/5">
            <CardFilm key={index} film={film}/>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
    </>
  )
}
