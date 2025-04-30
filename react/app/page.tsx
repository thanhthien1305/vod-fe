"use client";

import { CarouselMain } from "@/components/carousel";
import { useEffect, useState } from "react";
import { getListFilm } from "./api/film/film";
import { useRouter } from "next/navigation";
import { Film } from "./interface.tsx/film";

export default function Home() {
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
        {films.length > 0 && (
          <div
            className="h-full w-full bg-contain bg-center items-center justify-start flex px-[10%]"
            style={{ backgroundImage: `url(${films[0].thumbNailsUrls[0]})` }}
          >
            <img
              src="./title-preview.png"
              alt="Title Preview"
              className="cursor-pointer"
              onClick={() =>
                router.push(`/watch/${films[0].PK.replace("VIDEO#", "")}`)
              }
            />
            <div className="">{films[]?.title}</div>
          </div>
        )}
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
