"use client";

import { getFilm } from "@/app/api/film/film";
import { useParams } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import ReactPlayer from "react-player";
import Link from "next/link";

export default function WatchPage() {
    const [filmData, setFilmData] = useState<{ title?: string; hlsUrl?: string; episode?: string; season?: string } | null>(null);
    const [bitrateLevels, setBitrateLevels] = useState<{ bitrate: number }[]>([]);
    const { id } = useParams();
    const playerRef = useRef<ReactPlayer | null>(null);

    const handlePlayerReady = () => {
        const hls = playerRef.current?.getInternalPlayer('hls');
        if (hls && hls.levels && hls.levels.length > 0) {
            setBitrateLevels(hls.levels);
        }
    };

    const onChangeBitrate = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const internalPlayer = playerRef.current?.getInternalPlayer('hls');
        if (internalPlayer) {
            internalPlayer.currentLevel = parseInt(event.target.value, 10);
            console.log("Changed bitrate to:", internalPlayer.levels[internalPlayer.currentLevel].bitrate);
        }
    };

    useEffect(() => {
        const fetchFilmData = async () => {
            const res = await getFilm(id);
            if (res.found && res.video) {
                setFilmData(res.video);
            }
        };
        fetchFilmData();
    }, [id]);

    if (!filmData?.hlsUrl) {
        return <div className="min-h-screen bg-black text-white flex items-center justify-center">Loading...</div>;
    }

    return (
        <div className="min-h-screen bg-black text-white relative">
            <div className="absolute top-4 left-4 z-10">
                <Link href="/" className="text-white hover:text-gray-300">
                    {/* <ArrowLeftIcon className="h-6 w-6" /> */}
                </Link>
            </div>
            

            <div className="w-full h-screen flex items-center justify-center">
                <div className="w-full max-w-screen-xl aspect-video">
                    <ReactPlayer
                        ref={playerRef}
                        url={filmData.hlsUrl}
                        width="100%"
                        height="100%"
                        controls // Sử dụng controls mặc định để đơn giản
                        style={{ backgroundColor: 'black' }} // Đảm bảo nền của player là đen
                        onReady={handlePlayerReady}
                    />
                    {(filmData.title || filmData.episode) && (
                        <div className="absolute bottom-8 left-8 z-10 p-4 bg-black bg-opacity-50 rounded-md">
                            {filmData.title && <h2 className="text-lg font-semibold">{filmData.title}</h2>}
                            {(filmData.season && filmData.episode) && (
                                <p className="text-gray-300 text-sm">
                                    Season {filmData.season}, Episode {filmData.episode}
                                </p>
                            )}
                        </div>
                    )}
                </div>
            </div>
            <div className="absolute top-4 right-4 z-10 flex items-center">
                {bitrateLevels.length > 0 && (
                    <div className="mr-4">
                        <label htmlFor="quality-select" className="mr-2 text-sm text-gray-300">
                            Chất lượng:
                        </label>
                        <select
                            id="quality-select"
                            onChange={onChangeBitrate}
                            className="px-2 py-1 rounded bg-gray-700 text-white text-sm"
                        >
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
                <button className="text-white hover:text-gray-300">
                    {/* <FlagIcon className="h-6 w-6" /> */}
                </button>
            </div>
        </div>
    );
}