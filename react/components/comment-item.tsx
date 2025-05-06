import { addComment, deleteComment, getComment, likeComment } from "@/app/api/comment/comment";
import { useAppContext } from "@/app/context/AppContext";
import { Film } from "@/app/interface.tsx/film";
import { Avatar, Button } from "@heroui/react";
import { Reply } from "lucide-react";
import { useEffect, useState } from "react";

export interface CommentData {
    PK: string;
    SK: string;
    commentId: string;
    videoId: string;
    userId: string;
    userName: string;
    content: string;
    timestamp: string;
    likeCount: number;
    replyCount: number;
    parentId?: string;
}

interface CommentProps {
    comment: CommentData;
    film: Film;
}

export const Comment: React.FC<CommentProps> = ({ comment, film }) => {
    const [showReplies, setShowReplies] = useState(false);
    const [replies, setReplies] = useState<CommentData[]>([]);
    const { user } = useAppContext();
    const [isAddComment, setIsAddComment] = useState(false);
    const [newComment, setNewComment] = useState("")
    const fetchReplies = async (videoId: string, parentId?: string) => {
        const res = await getComment(videoId, parentId);
        if (res) {
            setReplies(res);
        }
    };

    useEffect(() => {
        if (comment.replyCount === 0) return;
        if (film.PK && film.SK) {
            fetchReplies(film.PK.replace("VIDEO#", ""), encodeURIComponent(comment.SK.replace("COMMENT#", "")));
        }
    }, [film]);

    return (
        <div className="flex flex-col gap-2">
            <div
                key={comment.commentId}
                className="flex gap-3 items-start justify-between p-3 bg-default-100/10 rounded-md relative"
            >
                <Avatar
                    src={`https://i.pravatar.cc/150?u=${comment.userName}`}
                    className="mt-1"
                />
                <div className="flex flex-col w-[80%]">
                    <div className="flex justify-between">
                        <span className="text-sm font-semibold text-white">{comment.userName}</span>
                        <span className="text-xs text-default-400">
                            {new Date(comment.timestamp).toLocaleString("vi-VN", {
                                day: "2-digit",
                                month: "2-digit",
                                year: "numeric",
                                hour: "2-digit",
                                minute: "2-digit",
                            })}
                        </span>
                    </div>
                    <p className="text-sm text-default-500 mt-1 truncate ">{comment.content}</p>
                    <div className="flex items-center mt-2 justify-between">
                        <button
                            onClick={async () => {
                                await likeComment(comment.commentId);
                                fetchReplies(film.PK.replace("VIDEO#", ""), film.SK.replace("COMMENT#", ""));
                            }}
                            className="text-xs text-white hover:text-primary-500 flex items-center gap-1"
                        >
                            ❤️ {comment.likeCount}
                        </button>
                        <span className="text-xs text-default-400">
                            Replies: {comment.replyCount}
                        </span>
                        {comment.replyCount > 0 && (
                            <button
                                onClick={() => setShowReplies(!showReplies)}
                                className="text-xs text-blue-400 hover:underline"
                            >
                                {showReplies ? "Hide replies" : "Show replies"}
                            </button>
                        )}
                        <Button className="p-0 m-0 w-fit h-fit bg-transparent" onPress={() => setIsAddComment(!isAddComment)}>
                            <Reply className="w-4 h-4"/>
                        </Button>

                        {comment.userId === user?.sub && (
                    <button
                        onClick={async () => {
                            await deleteComment(comment.commentId, film.PK.replace("VIDEO#", ""));
                            fetchReplies(film.PK.replace("VIDEO#", ""), film.SK.replace("COMMENT#", ""));
                        }}
                        className="text-red-400 hover:text-red-600 text-xs"
                        title="Delete comment"
                    >
                        ❌
                    </button>
                )}
                    </div>
                    {isAddComment && (
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
                                        content: newComment,
                                        parentId: comment.SK.replace("COMMENT#", ""),
                                    });
                                    setNewComment("");
                                    setIsAddComment(false);
                                    fetchReplies(film.PK.replace("VIDEO#", ""), encodeURIComponent(comment.SK.replace("COMMENT#", "")));
                                }}
                            >
                                Send
                            </Button>
                        </div>
                    )}
                </div>

                
            </div>

            {showReplies && replies && replies.length > 0 && (
                <div className="ml-6 border-l border-default-200 pl-3">
                    {replies.map(reply => (
                        <Comment
                            comment={reply}
                            film={film}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};
