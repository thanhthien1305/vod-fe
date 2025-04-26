"use client";

import { CarouselMain } from "@/components/carousel";
import { useEffect, useState } from "react";
import { getListFilm } from "./api/film/film";
import { useRouter } from "next/navigation";

export default function Home() {
  interface Film {
    pk: string;
    // Add other properties of the Film object if needed
  }

  const [films, setFilms] = useState<Film[]>([]);
  const router = useRouter();
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
  }, []);
  return (
    <div className="w-screen">
      <div className="relative h-screen w-screen">
        <div
          className="inset-0 bg-no-repeat bg-cover w-full h-full flex justify-center items-center"
          style={{ backgroundImage: "url('./bg-main.png')" }}
        >
          <img src="./title-preview.png" alt="Title Preview" className="cursor-pointer"
          onClick={() => router.push(`/watch/` + films[0]?.pk.replace("VIDEO#", ""))}/>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center gap-4 py-8 md:py-10 relative">


        <div className="w-[80%] space-y-4">
          <h1 className="text-white text-3xl font-semibold">Match to you</h1>

          <CarouselMain films={films} />
        </div>

      </div>
    </div>

  );
}