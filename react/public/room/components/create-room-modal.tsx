"use client";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  Select,
  SelectItem,
  addToast,
} from "@heroui/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createRoom } from "@/app/api/room/room";
import { getListFilm } from "@/app/api/film/film"; // <-- chỉnh đường dẫn tùy dự án
import { Film } from "@/app/interface.tsx/film";

interface CreateRoomModalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export default function CreateRoomModal({ isOpen, setIsOpen }: CreateRoomModalProps) {
  const router = useRouter();

  const [roomName, setRoomName] = useState("");
  const [selectedFilm, setSelectedFilm] = useState<Film | null>(null);
  const [maxParticipants, setMaxParticipants] = useState(10);
  const [films, setFilms] = useState<Film[]>([]);

  useEffect(() => {
    const fetchFilms = async () => {
      try {
        const res = await getListFilm();
        const videoList = res?.data.videos || [];
        setFilms(videoList);
        if (videoList.length > 0) setSelectedFilm(videoList[0]);
      } catch (error) {
        console.error("Failed to fetch videos", error);
      }
    };
    fetchFilms();
  }, []);

  const handleSubmit = async (onClose: () => void) => {
    if (!selectedFilm) return;
  
    try {
      const payload = {
        roomName,
        videoId: selectedFilm.PK.replace("VIDEO#", ""), 
        maxParticipants,
      };
      const res = await createRoom(payload);
      const roomId = res?.roomId;
  
      if (roomId) {
        addToast({
          title: "Tạo phòng thành công",
          description: "Đang chuyển đến phòng xem phim...",
          timeout: 3000,
          shouldShowTimeoutProgress: true,
        });
        router.push(`/room/${roomId}`);
        onClose();
      } else {
        addToast({
          title: "Lỗi",
          description: "Không thể lấy mã phòng. Vui lòng thử lại.",
          timeout: 4000,
        });
      }
    } catch (error) {
      console.error("Tạo phòng thất bại", error);
      addToast({
        title: "Tạo phòng thất bại",
        description: "Có lỗi xảy ra. Vui lòng thử lại sau.",
        timeout: 4000,
      });
    }
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={() => setIsOpen(!isOpen)}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="text-xl font-bold">Tạo phòng phim mới</ModalHeader>
            <ModalBody className="flex flex-col gap-4">
              <Input
                label="Tên phòng"
                value={roomName}
                onChange={(e) => setRoomName(e.target.value)}
              />

              <Select
                label="Chọn phim"
                selectedKeys={selectedFilm ? [selectedFilm.PK] : []}
                onChange={(key) => {
                  const selected = films.find((f) => f.PK === key.target.value);
                  if (selected) setSelectedFilm(selected);
                }}
              >
                {films.map((film) => (
                  <SelectItem key={film.PK} textValue={film.title}>
                    <div className="flex items-center gap-3">
                      <img
                        src={film.thumbNailsUrls?.[0] || "/placeholder.png"}
                        alt={film.title}
                        className="w-10 h-14 object-cover rounded"
                      />
                      <span>{film.title}</span>
                    </div>
                  </SelectItem>
                ))}
              </Select>

              <Input
                label="Số người tối đa"
                type="number"
                value={maxParticipants.toString()}
                onChange={(e) => setMaxParticipants(Number(e.target.value))}
              />
            </ModalBody>
            <ModalFooter>
              <Button variant="light" onPress={onClose}>Hủy</Button>
              <Button color="primary" onPress={() => handleSubmit(onClose)}>Tạo phòng</Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
