import filmApi from "@/app/utils/filmApi"

const API_ROUTER_URL = "video/comment";
export function getComment(videoId: string) {
  return filmApi.get(`${API_ROUTER_URL}/${videoId}`);
}

export function addComment( data: any) {
  return filmApi.post(`${API_ROUTER_URL}`, data);
}

export function deleteComment(commentId: string) {
  return filmApi.delete(`${API_ROUTER_URL}/${commentId}`);
}

export function likeComment(commentId: string) {
  return filmApi.post(`${API_ROUTER_URL}/like/${commentId}`);
}