"use client"
import { Carousel, CarouselContent, CarouselItem } from "@/app/context/CarouselContext "
import * as React from "react"
import CardFilm from "./film-card"
import { useEffect } from "react"
import { getListFilm } from "@/app/api/film/film"
import { useRouter } from "next/navigation"


export function CarouselMain() {
  const [films, setFilms] = React.useState([]);
  useEffect(() => {
    const fetchFilms = async () => {
      try {
        const res = await getListFilm();
        setFilms(res?.videos || []);
      } catch (error) {
        console.error("Failed to fetch videos", error);
      }
    };
    fetchFilms();
  }, [])

  
  return (
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
  )
}
