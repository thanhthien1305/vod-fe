"use client";

import { getFilm } from "@/app/api/film/film";
import { useParams } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import ReactPlayer from "react-player";
import Link from "next/link";
import { ArrowLeftIcon, FastForward, FlagIcon, Rewind, Settings } from "lucide-react";

export default function WatchPage() {
    const [filmData, setFilmData] = useState<{ title?: string; hlsUrl?: string; episode?: string; season?: string } | null>(null);
    const [bitrateLevels, setBitrateLevels] = useState<{ bitrate: number }[]>([]);
    const { id } = useParams();
    const playerRef = useRef<ReactPlayer | null>(null);
    const [isSettingBitrate, setIsSettingBitrate] = useState(false);
    const [onHoverVideo, setOnHoverVideo] = useState(false);
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
            if(!id) return;
            const res = await getFilm(id.toString());
            if (res.data.found && res.data.video) {
                setFilmData(res.data.video);
            }
        };
        fetchFilmData();
    }, [id]);

    const seekToTime = (seconds: number) => {
        if (playerRef.current) {
            playerRef.current.seekTo(seconds, "seconds");
        }
    };

    return filmData?.hlsUrl && (
        <div className="bg-black text-white relative">
            <div className="absolute top-4 left-4 z-10">
                <Link href="/" className="text-white hover:text-gray-300">
                    <ArrowLeftIcon className="h-10 w-10" />
                </Link>
            </div>


            <div className="w-full">
                <ReactPlayer
                    ref={playerRef}
                    url={filmData.hlsUrl}
                    width="100vw"
                    height="100vh"
                    controls // Sử dụng controls mặc định để đơn giản
                    style={{ backgroundColor: 'black' }} // Đảm bảo nền của player là đen
                    onReady={handlePlayerReady}
                    onMouseOver={() => setOnHoverVideo(true)}
                    onMouseLeave={() => setOnHoverVideo(false)}
                />
                <div
                    className="absolute w-[100%] bottom-1/2  from-black to-transparent p-4 transition-opacity duration-300 flex justify-between"
                    style={{ opacity: onHoverVideo ? 1 : 0 }}
                    onMouseOver={() => setOnHoverVideo(true)}
                    onMouseLeave={() => setOnHoverVideo(false)}
                >
                    <button
                        onClick={() => playerRef.current && seekToTime(playerRef.current.getCurrentTime() - 10)}
                        className="text-white hover:text-gray-300 transition duration-200"
                    >
                        <Rewind size={32} />
                    </button>
                    <button
                        onClick={() => playerRef.current && seekToTime(playerRef.current.getCurrentTime() + 10)}
                        className="text-white hover:text-gray-300 transition duration-200"
                    >
                        <FastForward size={32} />
                    </button>
                </div>
            </div>

            <div className="absolute top-4 right-4 z-10 flex items-center gap-8">
                {bitrateLevels.length > 0 && (
                    <div>
                        <label htmlFor="quality-select">
                            <Settings className="h-10 w-10 cursor-pointer" onClick={() => setIsSettingBitrate(!isSettingBitrate)} />
                        </label>
                        {
                            isSettingBitrate &&
                            <select
                                id="quality-select"
                                onChange={onChangeBitrate}
                                className="px-2 py-1 rounded bg-gray-700 text-white text-sm absolute top-10 -left-1/2"
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
                        }

                    </div>
                )}
                <button className="text-white hover:text-gray-300">
                    <FlagIcon className="h-10 w-10" />
                </button>
            </div>
        </div>
    );
}