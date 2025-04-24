"use client"
import { Carousel, CarouselContent, CarouselItem} from "@/app/context/CarouselContext "
import * as React from "react"
import CardFilm from "./film-card"
import { getVideoList } from "@/app/api/film/film"
import { useEffect } from "react"


export function CarouselMain() {
  
  return (
    <Carousel
      opts={{
        align: "start",
      }}
      className="w-[100%]"
    >
      <CarouselContent>
        {Array.from({ length: 10 }).map((_, index) => (
          <CarouselItem key={index} className="md:basis-1/4 lg:basis-1/5">
            <CardFilm key={index} />
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  )
}
