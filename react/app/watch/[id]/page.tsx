"use client";

import { getFilm } from "@/app/api/film/film";
import { Card } from "@heroui/react";
import { useParams } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import ReactPlayer from "react-player";

export default function WatchPage() {
  const videoData = {
    title: "This Video Is 1 Second",
    description: "A short video for testing purposes.",
    url: "https://d3uzffi3m1uc9u.cloudfront.net/57fb0fc5-6cc8-475b-aea9-03b567a9bae4/hls/This Video Is 1 Second.m3u8",
    hlsUrl: "https://d3uzffi3m1uc9u.cloudfront.net/57fb0fc5-6cc8-475b-aea9-03b567a9bae4/hls/This Video Is 1 Second.m3u8",
  };
  const [filmData, setFilmData] = useState(videoData);
  const [bitrateLevels, setBitrateLevels] = useState<{ bitrate: number }[]>([]);
  const { id } = useParams();
  const player = useRef<ReactPlayer | null>(null);

  const handlePlayerReady = () => {
    const hls = player.current?.getInternalPlayer('hls');
    if (hls && hls.levels && hls.levels.length > 0) {
      setBitrateLevels(hls.levels);
    }
  };

  const onChangeBitrate = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const internalPlayer = player.current?.getInternalPlayer('hls');
    if (internalPlayer) {
      internalPlayer.currentLevel = parseInt(event.target.value, 10);
      console.log("Changed bitrate to:", internalPlayer.levels[internalPlayer.currentLevel].bitrate);
    }
  };

  useEffect(() => {
    const fetchFilmData = async () => {
      const res = await getFilm(id);
      if (res.found) {
        setFilmData(res.video);
      }
    };
    fetchFilmData();
  }, [id]);

  return filmData && (
    <div className="min-h-screen text-white flex flex-col items-center p-6 w-full">
      <ReactPlayer
        url={filmData.hlsUrl}
        ref={player}
        onReady={handlePlayerReady}
        controls
        width="70%"
        height="100%"
        className="rounded-lg overflow-hidden w-[100vw] border-2 border-gray-600"
      />

      {/* Show Quality Selector only if levels available */}
      {bitrateLevels.length > 0 && (
        <div className="mt-4">
          <label className="mr-2">Quality:</label>
          <select onChange={onChangeBitrate} className="px-2 py-1 rounded">
            {bitrateLevels.map((level, index) => {
              const bitrateKbps = level.bitrate / 1000;
              let label = `${Math.round(bitrateKbps)} kbps`;

              if (bitrateKbps < 600) label = "360p";
              else if (bitrateKbps < 1500) label = "480p";
              else if (bitrateKbps < 3000) label = "720p";
              else if (bitrateKbps < 6000) label = "1080p";
              else label = "1440p+";

              return (
                <option key={index} value={index}>
                  {label}
                </option>
              );
            })}

          </select>
        </div>
      )}

      <Card className="bg-gray-800 p-4 rounded-lg shadow-lg mt-4 w-[100vw]">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-3xl font-bold mb-4">{filmData.title}</h1>
          <p className="text-center text-gray-300 max-w-2xl">{filmData.description}</p>
        </div>
      </Card>
    </div>
  );
}
