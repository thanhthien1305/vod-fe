import filmApi from "@/app/utils/filmApi"

const API_ROUTER_URL = "/video";
export function getVideoList(next?: string, limit?: string) {
    const params = new URLSearchParams();
    if (next) {
      params.append("next", next);
    }
    if (limit) {
      params.append("limit", limit);
    }
    return filmApi.get(`${API_ROUTER_URL}?${params.toString()}`);
  }
  
  export function getPresignedUrl(fileName: string) {
    const params = new URLSearchParams({
      fileName: fileName,
    });
    return filmApi.get(`${API_ROUTER_URL}/presigned-url?${params.toString()}`);
  }
  
  export function updateVideo(pk: string, formData: any) {
    return filmApi.put(`${API_ROUTER_URL}/${pk}`, formData);
  }
  
  export function deleteVideo(pk: string) {
    console.log("Deleting video with pk:", pk);
    return filmApi.delete(`${API_ROUTER_URL}/${pk}`);
  }

  export function getTrendingVideo() {
    return filmApi.get(`${API_ROUTER_URL}/trending`);
  }