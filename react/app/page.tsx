"use client";

import { CarouselMain } from "@/components/carousel";
import ReactPlayer from "react-player";

export default function Home() {
  return (
    <div className="w-screen">
      <div className="relative h-screen w-screen">
        <div
          className="inset-0 bg-no-repeat bg-cover w-full h-full flex justify-center items-center"
          style={{ backgroundImage: "url('./bg-main.png')" }}
        >
          <img src="./title-preview.png" alt="Title Preview" />
        </div>
      </div>

      <div className="flex flex-col items-center justify-center gap-4 py-8 md:py-10 relative">

        <ReactPlayer
          url={"https://d3uzffi3m1uc9u.cloudfront.net/57fb0fc5-6cc8-475b-aea9-03b567a9bae4/hls/This Video Is 1 Second.m3u8"}
          allowFullScreen
          width="100%"
          height={"100%"}
          className="mx-auto p-[16] relative"
          controls
        />
        <video id="video_1" className="video-js vjs-default-skin" controls data-setup='{}' >
          <source src="https://vjs.zencdn.net/v/oceans.mp4?sd" ></source>
          <source src="https://vjs.zencdn.net/v/oceans.mp4?hd"  />
          <source src="https://vjs.zencdn.net/v/oceans.mp4?phone"  />
          <source src="https://vjs.zencdn.net/v/oceans.mp4?4k"  />
        </video>
        <div className="w-[80%] space-y-4">
          <h1 className="text-white text-3xl font-semibold">Match to you</h1>

          <CarouselMain />
        </div>

      </div>
    </div>

  );
}