"use client"
import { Carousel, CarouselContent, CarouselItem } from "@/app/context/CarouselContext "
import * as React from "react"
import CardFilm from "./film-card"
import FilmDrawer from "./film-drawer"
import { Film } from "@/app/interface.tsx/film"
import { useState } from "react"

export function CarouselMain({ films }: { films: any[] }) {
  const [filmDrawer, setFilmDrawer] = useState<Film>();
  const [isOpen, setIsOpen] = useState(false);
  
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
            <CarouselItem key={index} className="md:basis-1/4 lg:basis-1/5"
            onClick={() => {
              console.log("film", film);
              setFilmDrawer(film);
              setIsOpen(true);
            }}>
              <CardFilm key={index} film={film}/>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
      {filmDrawer && <FilmDrawer film={filmDrawer} isOpen={isOpen} onOpenChange={() => setIsOpen(!isOpen)} />}
    </>
  )
}
