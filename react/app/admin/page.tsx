"use client";
import React, { useEffect, useState } from "react";
import { deleteVideo, getVideoList } from "../api/film/film";

export default function Admin() {
  const [films, setFilms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedFilm, setSelectedFilm] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  
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
        await deleteVideo(pk);
        alert("Đã xóa thành công!");
        fetchFilms();
      } catch (err) {
        alert("Lỗi khi xóa phim!");
        console.error(err);
      }
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4 mt-10">Quản lý phim</h2>
      {loading ? (
        <div>Đang tải danh sách phim...</div>
      ) : (
        <table className="w-full border border-collapse">
          <thead className="bg-black text-white">
            <tr className="bg-gray-200">
              <th className="border p-2 bg-black">#</th>
              <th className="border p-2 bg-black">Tên phim</th>
              <th className="border p-2 bg-black">Video</th>
              <th className="border p-2 bg-black">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {films?.map((film: any, index: number) => (
              <tr key={film.pk}>
                <td className="border p-2 text-center">{index + 1}</td>
                <td className="border p-2">{film.title || "(Chưa đặt tiêu đề)"}</td>
                <td className="border p-2">
                  <a
                    href={film.hlsUrl}
                    className="text-blue-600 underline"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Xem
                  </a>
                </td>
                <td className="border p-2 space-x-2 text-center">
                  <button
                    className="bg-red-500 text-white px-2 py-1 rounded"
                    onClick={() => handleDelete(film.pk)}
                  >
                    Xóa
                  </button>
                  <button
                    className="bg-yellow-500 text-white px-2 py-1 rounded"
                    onClick={() => alert("Tính năng sửa đang phát triển")}
                  >
                    Sửa
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Nút thêm phim (mở modal, form hoặc chuyển trang tùy theo thiết kế) */}
      <div className="mt-4">
        <button
          className="bg-green-600 text-white px-4 py-2 rounded"
          onClick={() => alert("Tính năng thêm đang phát triển")}
        >
          Thêm phim mới
        </button>
      </div>
    </div>
  );
}
