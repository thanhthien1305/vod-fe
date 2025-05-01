"use client";

import { CarouselMain } from "@/components/carousel";
import { useEffect, useState } from "react";
import { getListFilm } from "./api/film/film";
import { useRouter } from "next/navigation";
import { Film } from "./interface.tsx/film";
import { Button, useDisclosure } from "@heroui/react";
import { Info, Play } from "lucide-react";
import FilmDrawer from "@/components/film-drawer";

export default function Home() {
  const [films, setFilms] = useState<Film[]>([]);
  const [randomFilm, setRandomFilm] = useState<Film | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  useEffect(() => {
    const fetchFilms = async () => {
      try {
        const res = await getListFilm();
        const videoList = res?.videos || [];
        setFilms(videoList);

        // Lấy một phim ngẫu nhiên nếu danh sách không rỗng
        if (videoList.length > 0) {
          const randomIndex = Math.floor(Math.random() * videoList.length);
          setRandomFilm(videoList[randomIndex]);
        }
      } catch (error) {
        console.error("Failed to fetch videos", error);
      }
    };
    fetchFilms();
  }, []);

  return (
    <div className="w-screen">
      <div className="relative h-screen w-screen">
        {randomFilm && (
          <div
            className="h-full w-full bg-cover bg-center items-center justify-start flex px-[10%]"
            style={{ backgroundImage: `url("${randomFilm?.thumbNailsUrls[0]}")` }}
          >
            <div className="w-[30%]">
              <div className="flex text-stone-400 gap-3 text-regular-headline1 tracking-wider font-semibold
              items-center justify-start">
                <img src="./main/N.png" className="w-6 h-8 " />
                S E R I E S
              </div>
              <div className="text-white text-bold-large-title font-black ms-2">{randomFilm.title}</div>
              <div className="text-white text-regular-body font-normal text-stone-400">{randomFilm.description}</div>

              <div className="flex gap-4 mt-4 text-regular-title2 font-semibold text-stone-400">
                <Button className="bg-white text-black hover:bg-gray-200 rounded-sm px-4 py-2"
                onPress={() => {
                  router.push(`/watch/${randomFilm.PK.replace("VIDEO#", "")}`);
                }}>
                  <Play className="w-4 h-4 mr-2" />
                  Play
                </Button>
                <Button className="rounded-sm px-4 py-2" color="primary" variant="flat"
                  onPress={() => setIsOpen(true)}>
                  <Info className="w-4 h-4 mr-2" />
                  More Info</Button>
                <FilmDrawer film={randomFilm} isOpen={isOpen} onOpenChange={() => setIsOpen(!isOpen)}></FilmDrawer>
              </div>
            </div>
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
