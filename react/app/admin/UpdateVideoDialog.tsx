"use client";
import React, { useState, useEffect } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@heroui/react";
import { updateFilm } from "../api/film/film";

interface UpdateVideoDialogProps {
  isOpen: boolean;
  onClose: () => void;
  videoData: any;
}

export default function UpdateVideoDialog({
  isOpen,
  onClose,
  videoData,
}: UpdateVideoDialogProps) {
  const [formData, setFormData] = useState(videoData || {});

  useEffect(() => {
    if (videoData) {
      setFormData(videoData);
    }
  }, [videoData]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev: typeof formData) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    try {
      await updateFilm(formData.pk.replaceAll("VIDEO#", ""), formData);
      alert("Cập nhật thành công!");
      onClose();
    } catch (error) {
      console.error("Error updating video:", error);
      alert("Lỗi khi cập nhật video!");
    }
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={onClose}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="text-xl font-bold">Cập nhật phim</ModalHeader>
            <ModalBody>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium">Tiêu đề</label>
                  <input
                    type="text"
                    name="title"
                    value={formData?.title || ""}
                    onChange={handleChange}
                    className="w-full border rounded px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium">Tiêu đề gốc</label>
                  <input
                    type="text"
                    name="originalTitle"
                    value={formData?.originalTitle || ""}
                    onChange={handleChange}
                    className="w-full border rounded px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium">Mô tả</label>
                  <textarea
                    name="description"
                    value={formData?.description || ""}
                    onChange={handleChange}
                    className="w-full border rounded px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium">Tóm tắt nội dung</label>
                  <textarea
                    name="plotSummary"
                    value={formData?.plotSummary || ""}
                    onChange={handleChange}
                    className="w-full border rounded px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium">Ngày phát hành</label>
                  <input
                    type="date"
                    name="releaseDate"
                    value={formData?.releaseDate?.split("T")[0] || ""}
                    onChange={handleChange}
                    className="w-full border rounded px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium">Năm sản xuất</label>
                  <input
                    type="number"
                    name="productionYear"
                    value={formData?.productionYear || ""}
                    onChange={handleChange}
                    className="w-full border rounded px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium">Quốc gia sản xuất</label>
                  <input
                    type="text"
                    name="countryOfOrigin"
                    value={formData?.countryOfOrigin || ""}
                    onChange={handleChange}
                    className="w-full border rounded px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium">Giới hạn độ tuổi</label>
                  <input
                    type="text"
                    name="ageRating"
                    value={formData?.ageRating || ""}
                    onChange={handleChange}
                    className="w-full border rounded px-3 py-2"
                  />
                </div>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Hủy
              </Button>
              <Button color="primary" onPress={handleSave}>
                Lưu
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}