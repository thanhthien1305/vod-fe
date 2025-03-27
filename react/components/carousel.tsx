import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/app/context/CarouselContext "
import * as React from "react"
import CardFilm from "./film-card"


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
          <CarouselItem key={index} className="md:basis-1/4 lg:basis-1/6">
            <CardFilm key={index} />
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  )
}
