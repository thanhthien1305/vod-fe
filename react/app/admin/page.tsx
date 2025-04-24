"use client";
import React, { useEffect, useState } from "react";
import { deleteVideo, getVideoList } from "../api/film/film";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Button,
} from "@heroui/react";
import UpdateVideoDialog from "./UpdateVideoDialog";

export default function Admin() {
  const [films, setFilms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);

  const fetchFilms = async () => {
    setLoading(true);
    try {
      const res = await getVideoList();
      setFilms(res?.videos || []);
    } catch (error) {
      console.error("Failed to fetch videos", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchFilms();
  }, []);

  const handleDelete = async (pk: string) => {
    if (confirm("Bạn có chắc chắn muốn xóa phim này?")) {
      try {
        console.log("Deleting video with pk:", pk);
        const id = pk.replace("VIDEO#", "");
        await deleteVideo(id);
        alert("Đã xóa thành công!");
        fetchFilms();
      } catch (err) {
        alert("Lỗi khi xóa phim!");
        console.error(err);
      }
    }
  };

  const handleEdit = (video: any) => {
    setSelectedVideo(video);
    setIsDialogOpen(true);
  };

  return (
    <div className="p-10 w-[100vw] md:w-[80vw] lg:w-[60vw] mx-auto  rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold mb-4 mt-10">Quản lý phim</h2>
        <div className="mt-4">
          <Button>Thêm phim</Button>
        </div>
      </div>
      {loading ? (
        <div>Đang tải danh sách phim...</div>
      ) : (
        <>
          <UpdateVideoDialog
            isOpen={isDialogOpen}
            onClose={() => setIsDialogOpen(false)}
            videoData={selectedVideo}
          />
          <Table aria-label="Danh sách phim" className="w-full">
            <TableHeader>
              <TableColumn>#</TableColumn>
              <TableColumn>Tên phim</TableColumn>
              <TableColumn>Video</TableColumn>
              <TableColumn>Thumbnail</TableColumn>
              <TableColumn>Hành động</TableColumn>
            </TableHeader>
            <TableBody>
              {films?.map((film: any, index: number) => (
                <TableRow key={film.pk}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{film.title || "(Chưa đặt tiêu đề)"}</TableCell>
                  <TableCell>
                    <a
                      href={film.hlsUrl}
                      className="text-blue-600 underline"
                      target="_blank"
                      rel="noreferrer"
                    >
                      Xem
                    </a>
                  </TableCell>
                  <TableCell>
                    <img
                      src={film.thumbNailsUrls}
                      alt={film.title}
                      className="w-20 h-10 object-cover"
                    />
                  </TableCell>
                  <TableCell className="flex gap-2">
                    <button
                      className="bg-red-500 text-white px-2 py-1 rounded"
                      onClick={() => handleDelete(film.pk)}
                    >
                      Xóa {film.pk}
                    </button>
                    <button
                      className="bg-yellow-500 text-white px-2 py-1 rounded"
                      onClick={() => handleEdit(film)}
                    >
                      Sửa
                    </button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </>
      )}
    </div>
  );
}