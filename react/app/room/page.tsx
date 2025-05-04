"use client";

import { Button, Input } from "@heroui/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Film } from "lucide-react";
import SVG from "react-inlinesvg";
import CreateRoomModal from "@/public/room/components/create-room-modal";
export default function RoomPage() {
    const [roomCode, setRoomCode] = useState("");
    const router = useRouter();
    const [isOpenCreateRoomModal, setIsOpenCreateRoomModal] = useState(false);
    const handleJoinRoom = () => {
        const trimmedRoomCode = roomCode.trim();
        if (trimmedRoomCode) {
            router.push(`/room/${trimmedRoomCode}`);
        }
    };

    return (
        <section className="flex flex-col items-center justify-center w-screen h-[80vh] gap-6"
            style={{ background: "url('./room/bg-room.png')", backgroundSize: "cover", backgroundRepeat: "no-repeat" }}>
            <h1 className="text-bold-title1 font-bold text-center text-gray-100">
                Tính năng tạo và xem chung phòng phim
            </h1>
            <p className="text-lg text-gray-300 text-center">
                Kết nối, thưởng thức và trò chuyện ở mọi nơi với
                <span>
                    <SVG src="./room/emoji.svg" width={32} height={32} />
                </span>
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mt-6">
                <Button
                    className="bg-blue-600 text-white px-6 py-2 rounded-md text-base"
                onPress={() => setIsOpenCreateRoomModal(true)}>
                    <Film />
                    Phòng phim mới
                </Button>

                <div className="flex gap-2 items-center">
                    <Input
                        placeholder="Nhập id của phòng"
                        value={roomCode}
                        onChange={(e) => setRoomCode(e.target.value)}
                        className="w-64"
                    />
                    <Button onPress={handleJoinRoom} className="px-4 bg-green-400 hover:bg-green-600">
                        Tham gia
                    </Button>
                </div>
            </div>
            <CreateRoomModal isOpen={isOpenCreateRoomModal} setIsOpen={setIsOpenCreateRoomModal} />
        </section>
    );
}