"use client";

import { getFilm } from "@/app/api/film/film";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player";

export default function WatchPage() {
  const videoData = {
    title: "This Video Is 1 Second",
    description: "A short video for testing purposes.",
    url: "https://d3uzffi3m1uc9u.cloudfront.net/57fb0fc5-6cc8-475b-aea9-03b567a9bae4/hls/This Video Is 1 Second.m3u8",
  };
  const [filmData, setFilmData] = useState(videoData);
  const { id } = useParams();
  useEffect(() => {
    const fetchFilmData = async () => {
      const res = await getFilm(id);
      if(res.found) {
        setFilmData(res.video);
      }
    };
    fetchFilmData();
  }, [id]);

  return filmData && (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center p-6 w-full">
      <h1 className="text-3xl font-bold mb-4">{filmData.title}</h1>

        <ReactPlayer
          url={filmData.hlsUrl}
          allowFullScreen
          width="70%"
          height="100%"
          className="rounded-lg overflow-hidden w-[100vw]"
          controls
        />

      <p className="text-center text-gray-300 max-w-2xl">{filmData.description}</p>
    </div>
  );
}