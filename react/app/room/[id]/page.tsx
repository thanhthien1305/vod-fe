"use client";

import { getFilm } from "@/app/api/film/film";
import { useParams } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import ReactPlayer from "react-player";
import Link from "next/link";
import { ArrowLeftIcon, FastForward, FlagIcon, Rewind, Settings } from "lucide-react";
import { getRoomState } from "@/app/api/room/room";
import { Button } from "@heroui/button";
import { useAppContext } from "@/app/context/AppContext";

export default function WatchRoomPage() {
    const { user } = useAppContext();
    const [filmData, setFilmData] = useState<{ title?: string; hlsUrl?: string; episode?: string; season?: string } | null>(null);
    const [bitrateLevels, setBitrateLevels] = useState<{ bitrate: number }[]>([]);
    const { id } = useParams();
    const playerRef = useRef<ReactPlayer | null>(null);
    const [isSettingBitrate, setIsSettingBitrate] = useState(false);
    const [onHoverVideo, setOnHoverVideo] = useState(false);
    const [filmState, setFilmState] = useState<any>(null);
    const [seekByOther, setSeekByOther] = useState(false);
    const [newChatMessage, setNewChatMessage] = useState<string>("");
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [chatBubbles, setChatBubbles] = useState<{ id: number; message: string }[]>([]);

    const handlePlayerReady = () => {
        const hls = playerRef.current?.getInternalPlayer('hls');
        if (hls && hls.levels && hls.levels.length > 0) {
            setBitrateLevels(hls.levels);
        }
        if (filmState) {
            const timeToSeek = (Date.now() - new Date(filmState.lastStartTime).getTime()) / 1000 + filmState.lastVideoTime;
            console.log(timeToSeek);
            if (timeToSeek > 0) {
                playerRef.current?.seekTo(timeToSeek, "seconds");
            }
        }
    };

    const onChangeBitrate = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const internalPlayer = playerRef.current?.getInternalPlayer('hls');
        if (internalPlayer) {
            internalPlayer.currentLevel = parseInt(event.target.value, 10);
            console.log("Changed bitrate to:", internalPlayer.levels[internalPlayer.currentLevel].bitrate);
        }
    };

    const seekToTime = (seconds: number) => {
        if (playerRef.current) {
            playerRef.current.seekTo(seconds, "seconds");
        }
    };

    useEffect(() => {
        const fetchRoomState = async () => {
            const res = await getRoomState(id);
            setFilmState(res);
            console.log(res);
            const filmRes = await getFilm(res.videoId);
            if (filmRes.found && filmRes.video) {
                setFilmData(filmRes.video);
            }
        };
        fetchRoomState();
    }, [id]);

    const [socket, setSocket] = useState<WebSocket | null>(null);
    useEffect(() => {
        const roomId = id;
        const authToken = localStorage.getItem('video-on-demand');
        const url = `wss://jf2uscwso1.execute-api.ap-southeast-1.amazonaws.com/dev?roomID=${roomId}&token=${authToken}`;

        const ws = new WebSocket(url);

        ws.onopen = () => {
            console.log('Đã kết nối WebSocket');
            setSocket(ws);
        };

        ws.onmessage = (event) => {
            const rawData = event.data;
            if (typeof rawData !== "string" || !rawData.trim().startsWith("{")) return;

            try {
                const data = JSON.parse(rawData);
                const { action, videoTime, userName, message: chatMessage } = data;

                // 🔹 Hiển thị bong bóng khi nhận chat
                if (chatMessage && userName) {
                    const id = Date.now();
                    setChatBubbles(prev => [...prev, { id, message: `${userName}: ${chatMessage}` }]);
                    setTimeout(() => {
                        setChatBubbles(prev => prev.filter(b => b.id !== id));
                    }, 4000);
                }

                // 🔹 Các hành động video
                if (!playerRef.current) return;
                const internalPlayer = playerRef.current.getInternalPlayer();

                switch (action) {
                    case "seek": setSeekByOther(true); playerRef.current.seekTo(videoTime, "seconds"); break;
                    case "play": internalPlayer?.play?.(); break;
                    case "pause": internalPlayer?.pause?.(); break;
                }
            } catch (error) {
                console.error("Lỗi parse JSON:", error);
            }
        };

        ws.onclose = () => {
            console.log('Đã ngắt kết nối WebSocket');
            setSocket(null);
        };

        ws.onerror = (error) => {
            console.error('Lỗi WebSocket:', error);
            setSocket(null);
        };

        return () => {
            if (socket) {
                socket.close();
            }
        };
    }, []);
    const sendRoomAction = (action: "play" | "pause" | "seek") => {
        if (!socket || socket.readyState !== WebSocket.OPEN || !playerRef.current) return;
        if (seekByOther) {
            setSeekByOther(false);
            return;
        }
        const currentTime = playerRef.current.getCurrentTime();
        const message = {
            action,
            roomId: id,
            videoTime: currentTime,
            timestamp: Date.now()
        };
        socket.send(JSON.stringify(message));
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
                    controls
                    style={{ backgroundColor: 'black' }}
                    onReady={handlePlayerReady}
                    onMouseOver={() => setOnHoverVideo(true)}
                    onMouseLeave={() => setOnHoverVideo(false)}
                    onPlay={() => sendRoomAction("play")}
                    onPause={() => sendRoomAction("pause")}
                    onSeek={() => sendRoomAction("seek")}
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

            {/* Chat button ở góc phải dưới */}
            <div className="fixed bottom-6 right-6 z-50">
                <button
                    onClick={() => setIsChatOpen(!isChatOpen)}
                    className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg"
                >
                    💬
                </button>
            </div>

            {/* Hộp chat hiển thị khi mở */}
            {isChatOpen && (
                <div className="fixed bottom-20 right-6 w-80 bg-white rounded-lg shadow-lg p-4 z-50">
                    <div className="flex justify-between items-center mb-2">
                        <h3 className="text-black font-semibold">Chat</h3>
                        <Button onPress={() => setIsChatOpen(false)} className="bg-red-600 hover:bg-red-700 text-white">✖</Button>
                    </div>
                    <div className="h-40 overflow-y-auto bg-gray-100 p-2 mb-2 rounded text-sm text-black">
                        {/* Tin nhắn có thể được hiển thị ở đây */}
                        <p className="text-gray-600">Chào bạn! Hãy để lại câu hỏi.</p>
                    </div>
                    <input
                        type="text"
                        placeholder="Nhập tin nhắn..."
                        className="w-full p-2 border rounded text-black"
                        value={newChatMessage}
                        onChange={(e) => setNewChatMessage(e.target.value)}
                    />
                    <Button onPress={() => {
                        socket?.send(JSON.stringify({ userName: user?.username, message: newChatMessage }));
                    }} className="bg-blue-600 hover:bg-blue-700 text-white mt-2">Send</Button>
                </div>
            )}
            {chatBubbles.map((bubble) => (
                <div
                    key={bubble.id}
                    className="chat-bubble fixed bottom-12 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white px-4 py-2 rounded-full shadow-md text-sm z-50"
                >
                    {bubble.message}
                </div>
            ))}

        </div>
    );
}