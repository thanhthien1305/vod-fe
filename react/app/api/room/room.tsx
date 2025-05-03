import filmApi from "@/app/utils/filmApi"

const API_ROUTER_URL = "/rooms";
  
  export function createRoom(data: any) {
    return filmApi.post(`${API_ROUTER_URL}`, data);
  }