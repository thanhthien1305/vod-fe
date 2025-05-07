import filmApi from "@/app/utils/filmApi"

const API_ROUTER_URL = "/rooms";
  
  export function createRoom(data: any) {
    return filmApi.post(`${API_ROUTER_URL}`, data);
  }

  export function getRoomState(roomId: string) {
    return filmApi.get(`${API_ROUTER_URL}/state/${roomId}`);
  }

  export function getRoomChat(roomId: string) {
    return filmApi.get(`${API_ROUTER_URL}/chat/${roomId}`);
  }