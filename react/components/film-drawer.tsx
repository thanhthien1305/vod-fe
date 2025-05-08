import { addComment, deleteComment, getComment, likeComment } from "@/app/api/comment/comment";
import { useAppContext } from "@/app/context/AppContext";
import { Film } from "@/app/interface.tsx/film";
import {
    Drawer,
    DrawerContent,
    DrawerHeader,
    DrawerBody,
    DrawerFooter,
    Button,
    useDisclosure,
    Image,
    Link,
    Tooltip,
    Avatar,
    AvatarGroup,
} from "@heroui/react";
import { Play, SeparatorHorizontal } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Comment } from "./comment-item";

interface FilmDrawerProps {
    film: Film;
    isOpen: boolean;
    onOpenChange: () => void;
}
const mockData = [
    {
        "PK": "VIDEO#255a0113-5687-4f98-8fc1-2803f7ebe1e9",
        "SK": "COMMENT#2025-05-03T11:19:35.006982917Z#a9bb1897-7d1d-401d-b728-3db6b5720315",
        "commentId": "a9bb1897-7d1d-401d-b728-3db6b5720315",
        "videoId": "255a0113-5687-4f98-8fc1-2803f7ebe1e9",
        "userId": "f94a056c-9021-70f5-86f5-6dc37489e655",
        "content": "Phim hay lắm, rất đáng xem nha",
        "timestamp": "2025-05-03T11:19:35.006982917Z",
        "likeCount": 0,
        "replyCount": 0
    },
    {
        "PK": "VIDEO#255a0113-5687-4f98-8fc1-2803f7ebe1e9",
        "SK": "COMMENT#2025-05-03T11:19:42.859743148Z#26205278-8437-4e31-bda4-360f077e3811",
        "commentId": "26205278-8437-4e31-bda4-360f077e3811",
        "videoId": "255a0113-5687-4f98-8fc1-2803f7ebe1e9",
        "userId": "f94a056c-9021-70f5-86f5-6dc37489e655",
        "content": "Hayyyyyyyyyyyyyyyyy",
        "timestamp": "2025-05-03T11:19:42.859743148Z",
        "likeCount": 0,
        "replyCount": 0
    },
    {
        "PK": "VIDEO#255a0113-5687-4f98-8fc1-2803f7ebe1e9",
        "SK": "COMMENT#2025-05-03T11:19:49.413249693Z#7ff2dc3c-369c-42fb-92df-d6982fb0d409",
        "commentId": "7ff2dc3c-369c-42fb-92df-d6982fb0d409",
        "videoId": "255a0113-5687-4f98-8fc1-2803f7ebe1e9",
        "userId": "f94a056c-9021-70f5-86f5-6dc37489e655",
        "content": "Tẹeeeeeeeeeeeeeeeeeeeeeeeeeee",
        "timestamp": "2025-05-03T11:19:49.413249693Z",
        "likeCount": 0,
        "replyCount": 1
    }
];
export default function FilmDrawer({ film, isOpen, onOpenChange }: FilmDrawerProps) {
    const { user } = useAppContext();
    const router = useRouter();
    const [comment, setComment] = useState<any[]>(mockData);
    const [loading, setLoading] = useState(false);
    const [newComment, setNewComment] = useState("");

    const fetchComment = async (videoId: string) => {
        setLoading(true);
        const res = await getComment(videoId);
        if (res) {
            setComment(res.data);
        }
        setLoading(false);
    };

    useEffect(() => {
        if (film?.PK) {
            fetchComment(film.PK.replace("VIDEO#", ""));
        }
    }, [film]);

    return (
        <>
            <Drawer
                hideCloseButton
                backdrop="blur"
                classNames={{
                    base: "data-[placement=right]:sm:m-2 data-[placement=left]:sm:m-2  rounded-medium",
                }}
                isOpen={isOpen}
                onOpenChange={onOpenChange}
            >
                <DrawerContent className="w-[60%]">
                    {(onClose) => (
                        <>
                            <DrawerHeader className="absolute top-0 inset-x-0 z-50 flex flex-row gap-2 border-b border-default-200/50 justify-between bg-content1/50 backdrop-saturate-150 backdrop-blur-lg">
                                <Tooltip content="Close">
                                    <Button
                                        isIconOnly
                                        className="text-default-400"
                                        size="sm"
                                        variant="light"
                                        onPress={onClose}
                                    >
                                        <svg
                                            fill="none"
                                            height="20"
                                            stroke="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            viewBox="0 0 24 24"
                                            width="20"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path d="m13 17 5-5-5-5M6 17l5-5-5-5" />
                                        </svg>
                                    </Button>
                                </Tooltip>
                            </DrawerHeader>
                            <DrawerBody className="pt-16 px-0">
                                <div className="flex w-full justify-center items-center  rounded-none">
                                    <Image
                                        isBlurred
                                        isZoomed
                                        alt="Event image"
                                        className=" w-full hover:scale-110"
                                        height={300}
                                        src={film.thumbNailsUrls[0] || "https://nextuipro.nyc3.cdn.digitaloceanspaces.com/components-images/places/san-francisco.png"}
                                    />
                                </div>
                                <div className="flex flex-col gap-2 px-6">
                                    <h1 className="text-3xl font-bold leading-7">{film?.title}</h1>
                                    <p className="flex text-stone-400 gap-3 text-sm tracking-wider font-semibold items-center justify-start">
                                        <img src="./main/N.png" className="w-4 h-6 " />
                                        S E R I E S
                                    </p>

                                    <div className="flex flex-col mt-4 gap-3 items-start">
                                        <span className="text-small text-default-500">Genres:{" "}
                                            {film?.genres.map((genre, index) => (
                                                <Link
                                                    key={index}
                                                    className="text-small text-white font-bold hover:text-primary-500"
                                                    href={`/genres/${genre}`}
                                                >
                                                    {genre}{index < film.genres.length - 1 ? ', ' : '.'}
                                                </Link>
                                            ))}
                                        </span>

                                    </div>
                                    <div className="mt-4 flex flex-col gap-3">
                                        <div className="flex flex-col mt-4 gap-3 items-start">
                                            <span className="text-medium font-medium">About the film</span>
                                            <div className="text-medium text-default-500 flex flex-col gap-2">
                                                <p>
                                                    {film?.description}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex flex-col mt-4 gap-3 items-start">
                                            <span className="text-small text-default-500">Directed By</span>
                                            {film?.directors.map((director, index) => (
                                                <div key={index} className="flex gap-2 items-center">
                                                    <Avatar
                                                        className="data-[hover=true]:!translate-x-0"
                                                        name={director}
                                                        src={`https://i.pravatar.cc/150?u=${director}`}
                                                    />
                                                    <span className="text-small text-default-500 text-white font-bold">
                                                        {director}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>


                                        <div className="flex flex-col mt-4 gap-3 items-start">
                                            <span className="text-small text-default-500">Cast:</span>
                                            {film?.cast.map((actor, index) => (
                                                <div key={index} className="flex gap-2 items-center">
                                                    <Avatar
                                                        className="data-[hover=true]:!translate-x-0"
                                                        name={actor.name}
                                                        src={`https://i.pravatar.cc/150?u=${actor.name}`}
                                                    />
                                                    <div className="flex flex-col">
                                                        <span className="text-small text-white font-bold">{actor.name}</span>
                                                        <span className="text-tiny text-default-500 italic">as {actor.role}</span>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>


                                        <div className="flex flex-col mt-4 gap-3 items-start">
                                            <span className="text-small text-default-500">{film.views} view</span>
                                            <div className="flex gap-2 items-center">
                                                <AvatarGroup
                                                    isBordered
                                                    classNames={{
                                                        base: "pl-2",
                                                        count: "text-default-500 text-tiny bg-default-100",
                                                    }}
                                                    size="sm"
                                                    total={film.views}
                                                >
                                                    <Tooltip content="Alex">
                                                        <Avatar
                                                            className="data-[hover=true]:!translate-x-0"
                                                            name="Alex"
                                                            src="https://i.pravatar.cc/150?u=a04258114e29026708c"
                                                        />
                                                    </Tooltip>
                                                    <Tooltip content="Joe">
                                                        <Avatar
                                                            className="data-[hover=true]:!translate-x-0"
                                                            name="Joe"
                                                            src="https://i.pravatar.cc/150?u=a04258114e290267084"
                                                        />
                                                    </Tooltip>
                                                    <Tooltip content="John">
                                                        <Avatar
                                                            className="data-[hover=true]:!translate-x-0"
                                                            name="John"
                                                            src="https://i.pravatar.cc/150?u=a04258a2462d826712d"
                                                        />
                                                    </Tooltip>
                                                    <Tooltip content="Jane">
                                                        <Avatar
                                                            className="data-[hover=true]:!translate-x-0"
                                                            name="Jane"
                                                            src="https://i.pravatar.cc/150?u=a04258114e29026702d"
                                                        />
                                                    </Tooltip>
                                                </AvatarGroup>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <SeparatorHorizontal />
                                <div className="flex flex-col gap-3 px-6 mt-6">
                                    <h3 className="text-lg font-bold text-white">Comments</h3>
                                    {loading ? (
                                        <p className="text-default-500">Loading comments...</p>
                                    ) : comment?.length === 0 ? (
                                        <p className="text-default-500 italic">No comments yet.</p>
                                    ) : (
                                        comment?.map((c) => (
                                            <Comment key={c.commentId} comment={c} film={film} />
                                        ))
                                    )}
                                </div>

                                <div className="flex flex-col gap-2 px-6 mt-6">
                                    <h3 className="text-lg font-bold text-white">Add a comment</h3>
                                    <textarea
                                        value={newComment}
                                        onChange={(e) => setNewComment(e.target.value)}
                                        placeholder="Write your comment here..."
                                        className="text-sm p-2 rounded-md border bg-black text-white border-default-100 resize-none"
                                        rows={3}
                                    />
                                    <Button
                                        className="bg-primary text-white w-fit"
                                        onPress={async () => {
                                            if (!newComment.trim()) return;
                                            await addComment({
                                                videoId: film.PK.replace("VIDEO#", ""),
                                                userId: user.id,
                                                content: newComment,
                                            });
                                            setNewComment("");
                                            fetchComment(film.PK.replace("VIDEO#", ""));
                                        }}
                                    >
                                        Submit
                                    </Button>
                                </div>
                            </DrawerBody>

                            <DrawerFooter className="flex flex-col gap-1 justify-center items-end px-6 pb-4">
                                <Button className="bg-white text-black hover:bg-gray-200 rounded-sm px-4 py-2 max-w-[200px]"
                                    onPress={() => {
                                        router.push(`/watch/${film?.PK.replace("VIDEO#", "")}`);
                                    }}>
                                    <Play className="w-4 h-4 mr-2" />
                                    Play
                                </Button>
                            </DrawerFooter>
                        </>
                    )}
                </DrawerContent>
            </Drawer>
        </>
    );
}
