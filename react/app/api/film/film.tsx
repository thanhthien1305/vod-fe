import filmApi from "@/app/utils/filmApi"

const API_ROUTER_URL = "/video";
export function getListFilm(next?: string, limit?: string) {
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
  
  export function updateFilm(pk: string, formData: any) {
    return filmApi.put(`${API_ROUTER_URL}/${pk}`, formData);
  }
  
  export function deleteFilm(pk: string) {
    console.log("Deleting video with pk:", pk);
    return filmApi.delete(`${API_ROUTER_URL}/${pk}`);
  }

  export function getTrendingFilm() {
    return filmApi.get(`${API_ROUTER_URL}/trending`);
  }

  export function getFilm(pk: string) {
    return filmApi.get(`${API_ROUTER_URL}/${pk}`);
  }