"use client";
import React, { useState, useEffect } from "react";
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    Input,
    Textarea,
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
    const [formData, setFormData] = useState<any>(videoData || {});

    useEffect(() => {
        if (videoData) {
            setFormData(videoData);
        }
    }, [videoData]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev: any) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleArrayChange = (e: React.ChangeEvent<HTMLInputElement>, name: string, index: number) => {
        const { value } = e.target;
        setFormData((prev: any) => {
            const newArray = [...(prev[name] || [])];
            newArray[index] = value;
            return { ...prev, [name]: newArray };
        });
    };

    const handleAddToArray = (name: string) => {
        setFormData((prev: any) => ({
            ...prev,
            [name]: [...(prev[name] || []), ""],
        }));
    };

    const handleRemoveFromArray = (name: string, index: number) => {
        setFormData((prev: any) => ({
            ...prev,
            [name]: prev[name].filter((_: any, i: number) => i !== index),
        }));
    };

    const handleCastChange = (e: React.ChangeEvent<HTMLInputElement>, index: number, field: 'name' | 'role') => {
        const { value } = e.target;
        setFormData((prev: any) => {
            const newCast = [...(prev.cast || [])];
            newCast[index] = { ...newCast[index], [field]: value };
            return { ...prev, cast: newCast };
        });
    };

    const handleAddCast = () => {
        setFormData((prev: any) => ({
            ...prev,
            cast: [...(prev.cast || []), { name: "", role: "" }],
        }));
    };

    const handleRemoveCast = (index: number) => {
        setFormData((prev: any) => ({
            ...prev,
            cast: prev.cast.filter((_: any, i: number) => i !== index),
        }));
    };

    const handleCriticRatingChange = (e: React.ChangeEvent<HTMLInputElement>, provider: string) => {
        const { value } = e.target;
        setFormData((prev: any) => ({
            ...prev,
            criticRatings: {
                ...prev.criticRatings,
                [provider]: parseFloat(value),
            },
        }));
    };

    const handleSave = async () => {
        try {
            await updateFilm(formData.PK.replaceAll("VIDEO#", ""), formData);
            alert("Cập nhật thành công!");
            onClose();
        } catch (error) {
            console.error("Lỗi khi cập nhật phim:", error);
            alert("Lỗi khi cập nhật phim!");
        }
    };

    return (
        <Modal isOpen={isOpen} onOpenChange={onClose} size="xl">
            <ModalContent>
                {(onCloseModal) => (
                    <>
                        <ModalHeader className="text-xl font-bold">Cập nhật phim</ModalHeader>
                        <ModalBody className="max-h-[600px] overflow-y-auto">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                <Input label="Tiêu đề" name="title" value={formData?.title || ""} onChange={handleChange} />
                                <Input label="Tiêu đề gốc" name="originalTitle" value={formData?.originalTitle || ""} onChange={handleChange} />
                                <Textarea label="Mô tả" name="description" value={formData?.description || ""} onChange={handleChange} />
                                <Textarea label="Tóm tắt nội dung" name="plotSummary" value={formData?.plotSummary || ""} onChange={handleChange} />
                                <Input label="Ngày phát hành" type="date" name="releaseDate" value={formData?.releaseDate?.split("T")[0] || ""} onChange={handleChange} />
                                <Input label="Năm sản xuất" type="number" name="productionYear" value={formData?.productionYear || ""} onChange={handleChange} />
                                <Input label="Quốc gia sản xuất" name="countryOfOrigin" value={formData?.countryOfOrigin || ""} onChange={handleChange} />
                                <Input label="Đánh giá độ tuổi" name="ageRating" value={formData?.ageRating || ""} onChange={handleChange} />
                                <div>
                                    <label className="block text-sm font-medium mb-1">ThumbNailsUrls</label>
                                    {(formData?.thumbNailsUrls || []).map((url: string, index: number) => (
                                        <div key={index} className="flex items-center mb-2">
                                            <Input value={url} onChange={(e) => handleArrayChange(e, "thumbNailsUrls", index)} className="mr-2" />
                                            <Button size="sm" color="danger" onPress={() => handleRemoveFromArray("thumbNailsUrls", index)}>Xóa</Button>
                                        </div>
                                    ))}
                                    <Button size="sm" onPress={() => handleAddToArray("thumbNailsUrls")}>Thêm ngôn ngữ</Button>
                                </div>
                                <Input
                                    label="HLS URL"
                                    name="hlsUrl"
                                    value={formData?.hlsUrl || ""}
                                    onChange={handleChange}
                                />

                                {/* Languages */}
                                <div>
                                    <label className="block text-sm font-medium mb-1">Ngôn ngữ</label>
                                    {(formData?.languages || []).map((lang: string, index: number) => (
                                        <div key={index} className="flex items-center mb-2">
                                            <Input value={lang} onChange={(e) => handleArrayChange(e, "languages", index)} className="mr-2" />
                                            <Button size="sm" color="danger" onPress={() => handleRemoveFromArray("languages", index)}>Xóa</Button>
                                        </div>
                                    ))}
                                    <Button size="sm" onPress={() => handleAddToArray("languages")}>Thêm ngôn ngữ</Button>
                                </div>

                                {/* Subtitle Languages */}
                                <div>
                                    <label className="block text-sm font-medium mb-1">Ngôn ngữ phụ đề</label>
                                    {(formData?.subtitleLanguages || []).map((lang: string, index: number) => (
                                        <div key={index} className="flex items-center mb-2">
                                            <Input value={lang} onChange={(e) => handleArrayChange(e, "subtitleLanguages", index)} className="mr-2" />
                                            <Button size="sm" color="danger" onPress={() => handleRemoveFromArray("subtitleLanguages", index)}>Xóa</Button>
                                        </div>
                                    ))}
                                    <Button size="sm" onPress={() => handleAddToArray("subtitleLanguages")}>Thêm ngôn ngữ phụ đề</Button>
                                </div>

                                {/* Genres */}
                                <div>
                                    <label className="block text-sm font-medium mb-1">Thể loại</label>
                                    {(formData?.genres || []).map((genre: string, index: number) => (
                                        <div key={index} className="flex items-center mb-2">
                                            <Input value={genre} onChange={(e) => handleArrayChange(e, "genres", index)} className="mr-2" />
                                            <Button size="sm" color="danger" onPress={() => handleRemoveFromArray("genres", index)}>Xóa</Button>
                                        </div>
                                    ))}
                                    <Button size="sm" onPress={() => handleAddToArray("genres")}>Thêm thể loại</Button>
                                </div>

                                {/* Tags */}
                                <div>
                                    <label className="block text-sm font-medium mb-1">Tags</label>
                                    {(formData?.tags || []).map((tag: string, index: number) => (
                                        <div key={index} className="flex items-center mb-2">
                                            <Input value={tag} onChange={(e) => handleArrayChange(e, "tags", index)} className="mr-2" />
                                            <Button size="sm" color="danger" onPress={() => handleRemoveFromArray("tags", index)}>Xóa</Button>
                                        </div>
                                    ))}
                                    <Button size="sm" onPress={() => handleAddToArray("tags")}>Thêm tag</Button>
                                </div>

                                {/* Themes */}
                                <div>
                                    <label className="block text-sm font-medium mb-1">Chủ đề</label>
                                    {(formData?.themes || []).map((theme: string, index: number) => (
                                        <div key={index} className="flex items-center mb-2">
                                            <Input value={theme} onChange={(e) => handleArrayChange(e, "themes", index)} className="mr-2" />
                                            <Button size="sm" color="danger" onPress={() => handleRemoveFromArray("themes", index)}>Xóa</Button>
                                        </div>
                                    ))}
                                    <Button size="sm" onPress={() => handleAddToArray("themes")}>Thêm chủ đề</Button>
                                </div>

                                <Input label="Đạo diễn" name="directors" value={(formData?.directors || []).join(", ")} onChange={handleChange} />
                                <Input label="Nhà sản xuất" name="producers" value={(formData?.producers || []).join(", ")} onChange={handleChange} />
                                <Input label="Biên kịch" name="writers" value={(formData?.writers || []).join(", ")} onChange={handleChange} />
                                <Input label="Nhà quay phim" name="cinematographer" value={formData?.cinematographer || ""} onChange={handleChange} />
                                <Input label="Nhà soạn nhạc" name="musicComposer" value={formData?.musicComposer || ""} onChange={handleChange} />
                                <Input label="Biên tập viên" name="editor" value={formData?.editor || ""} onChange={handleChange} />
                                <Input label="Thiết kế sản xuất" name="productionDesigner" value={formData?.productionDesigner || ""} onChange={handleChange} />
                                <Input label="Thiết kế phục trang" name="costumeDesigner" value={formData?.costumeDesigner || ""} onChange={handleChange} />

                                {/* Cast */}
                                <div>
                                    <label className="block text-sm font-medium mb-1">Diễn viên</label>
                                    {(formData?.cast || []).map((actor: any, index: number) => (
                                        <div key={index} className="grid grid-cols-2 gap-2 mb-2">
                                            <Input label="Tên" value={actor.name || ""} onChange={(e) => handleCastChange(e, index, 'name')} />
                                            <Input label="Vai diễn" value={actor.role || ""} onChange={(e) => handleCastChange(e, index, 'role')} />
                                            <Button size="sm" color="danger" onPress={() => handleRemoveCast(index)}>Xóa</Button>
                                        </div>
                                    ))}
                                    <Button size="sm" onPress={handleAddCast}>Thêm diễn viên</Button>
                                </div>

                                <Input label="Thông tin series" name="seriesInformation" value={JSON.stringify(formData?.seriesInformation || "")} onChange={handleChange} />
                                <Input label="Phần trước/Phần sau" name="sequelPrequel" value={JSON.stringify(formData?.sequelPrequel || "")} onChange={handleChange} />
                                <Input label="Phim tương tự" name="similarMovies" value={(formData?.similarMovies || []).join(", ")} onChange={handleChange} />

                                {/* Poster URLs */}
                                <div>
                                    <label className="block text-sm font-medium mb-1">Poster URLs</label>
                                    {(formData?.posterUrls || []).map((url: string, index: number) => (
                                        <div key={index} className="flex items-center mb-2">
                                            <Input value={url} onChange={(e) => handleArrayChange(e, "posterUrls", index)} className="mr-2" />
                                            <Button size="sm" color="danger" onPress={() => handleRemoveFromArray("posterUrls", index)}>Xóa</Button>
                                        </div>
                                    ))}
                                    <Button size="sm" onPress={() => handleAddToArray("posterUrls")}>Thêm Poster URL</Button>
                                </div>

                                {/* Trailer URLs */}
                                <div>
                                    <label className="block text-sm font-medium mb-1">Trailer URLs</label>
                                    {(formData?.trailerUrls || []).map((url: string, index: number) => (
                                        <div key={index} className="flex items-center mb-2">
                                            <Input value={url} onChange={(e) => handleArrayChange(e, "trailerUrls", index)} className="mr-2" />
                                            <Button size="sm" color="danger" onPress={() => handleRemoveFromArray("trailerUrls", index)}>Xóa</Button>
                                        </div>
                                    ))}
                                    <Button size="sm" onPress={() => handleAddToArray("trailerUrls")}>Thêm Trailer URL</Button>
                                </div>

                                {/* Behind The Scenes */}
                                <div>
                                    <label className="block text-sm font-medium mb-1">Behind The Scenes URLs</label>
                                    {(formData?.behindTheScenes || []).map((url: string, index: number) => (
                                        <div key={index} className="flex items-center mb-2">
                                            <Input value={url} onChange={(e) => handleArrayChange(e, "behindTheScenes", index)} className="mr-2" />
                                            <Button size="sm" color="danger" onPress={() => handleRemoveFromArray("behindTheScenes", index)}>Xóa</Button>
                                        </div>
                                    ))}
                                    <Button size="sm" onPress={() => handleAddToArray("behindTheScenes")}>Thêm Behind The Scenes URL</Button>
                                </div>

                                {/* Commentary Tracks */}
                                <div>
                                    <label className="block text-sm font-medium mb-1">Commentary Tracks URLs</label>
                                    {(formData?.commentaryTracks || []).map((url: string, index: number) => (
                                        <div key={index} className="flex items-center mb-2">
                                            <Input value={url} onChange={(e) => handleArrayChange(e, "commentaryTracks", index)} className="mr-2" />
                                            <Button size="sm" color="danger" onPress={() => handleRemoveFromArray("commentaryTracks", index)}>Xóa</Button>
                                        </div>
                                    ))}
                                    <Button size="sm" onPress={() => handleAddToArray("commentaryTracks")}>Thêm Commentary Track URL</Button>
                                </div>

                                {/* Deleted Scenes */}
                                <div>
                                    <label className="block text-sm font-medium mb-1">Deleted Scenes URLs</label>
                                    {(formData?.deletedScenes || []).map((url: string, index: number) => (
                                        <div key={index} className="flex items-center mb-2">
                                            <Input value={url} onChange={(e) => handleArrayChange(e, "deletedScenes", index)} className="mr-2" />
                                            <Button size="sm" color="danger" onPress={() => handleRemoveFromArray("deletedScenes", index)}>Xóa</Button>
                                        </div>
                                    ))}
                                    <Button size="sm" onPress={() => handleAddToArray("deletedScenes")}>Thêm Deleted Scene URL</Button>
                                </div>

                                {/* Interviews */}
                                <div>
                                    <label className="block text-sm font-medium mb-1">Interviews URLs</label>
                                    {(formData?.interviews || []).map((url: string, index: number) => (
                                        <div key={index} className="flex items-center mb-2">
                                            <Input value={url} onChange={(e) => handleArrayChange(e, "interviews", index)} className="mr-2" />
                                            <Button size="sm" color="danger" onPress={() => handleRemoveFromArray("interviews", index)}>Xóa</Button>
                                        </div>
                                    ))}
                                    <Button size="sm" onPress={() => handleAddToArray("interviews")}>Thêm Interview URL</Button>
                                </div>

                                <Input label="Giải thưởng" name="awards" value={(formData?.awards || []).join(", ")} onChange={handleChange} />

                                {/* Critic Ratings */}
                                <div className="col-span-1 md:col-span-2 lg:col-span-3">
                                    <label className="block text-sm font-medium mb-1">Đánh giá từ giới phê bình</label>
                                    <div className="grid grid-cols-3 gap-2">
                                        <Input label="IMDb" type="number" name="IMDb" value={formData?.criticRatings?.IMDb || ""} onChange={(e) => handleCriticRatingChange(e, "IMDb")} />
                                        <Input label="RottenTomatoes" type="number" name="RottenTomatoes" value={formData?.criticRatings?.RottenTomatoes || ""} onChange={(e) => handleCriticRatingChange(e, "RottenTomatoes")} />
                                        <Input label="Metacritic" type="number" name="Metacritic" value={formData?.criticRatings?.Metacritic || ""} onChange={(e) => handleCriticRatingChange(e, "Metacritic")} />
                                    </div>
                                </div>

                                <Input label="Đánh giá người dùng" type="number" name="userRating" value={formData?.userRating || ""} onChange={handleChange} />
                                <Input label="Doanh thu phòng vé" type="number" name="boxOfficePerformance" value={formData?.boxOfficePerformance || ""} onChange={handleChange}
                                />
                                <Input label="Lượt xem" type="number" name="views" value={formData?.views || ""} onChange={handleChange} />
                            </div>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="danger" variant="light" onPress={onCloseModal}>
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