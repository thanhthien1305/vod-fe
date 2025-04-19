// filmApi.ts
"use client";
import axios, {
  AxiosRequestHeaders,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import { toast } from "sonner";

const filmApiBaseURL = process.env.NEXT_PUBLIC_COGNITO_FILM;

const filmApi = axios.create({
  baseURL: filmApiBaseURL ? `https://${filmApiBaseURL}/dev` : undefined,
  responseType: "json",
  withCredentials: true,
  timeout: 5000 * 60,
});

const requestHandler = (request: InternalAxiosRequestConfig) => {
  request.headers = request.headers || ({} as AxiosRequestHeaders);
  const token = localStorage.getItem("video-on-demand");
  if (token) {
    request.headers.Authorization = `Bearer ${token}`;
  }
  return request;
};

const successHandler = (response: AxiosResponse) => response;

const errorHandler = async (error: any) => {
  const originalRequest = error.config;
  const errorRes = error.response;

  if (originalRequest._retry) {
    return Promise.reject(error);
  }

  if (errorRes) {
    if (errorRes.status === 401) {
      // Logic xử lý lỗi 401 cho API film (nếu có)
      // Ví dụ: Gọi một API khác để lấy token mới
      // Sau đó thử lại request ban đầu
      // originalRequest._retry = true;
      // try {
      //   const newTokenResponse = await refreshTokenFilmApi();
      //   if (newTokenResponse?.data?.accessToken) {
      //     localStorage.setItem("video-on-demand-token", newTokenResponse.data.accessToken);
      //     originalRequest.headers.Authorization = `Bearer ${newTokenResponse.data.accessToken}`;
      //     return axios(originalRequest);
      //   }
      // } catch (refreshError) {
      //   console.error("Lỗi refresh token API film:", refreshError);
      //   // Có thể logout người dùng hoặc xử lý khác
      //   toast.error("Phiên đăng nhập hết hạn!");
      //   // ...
      //   return Promise.reject(refreshError);
      // }
    }

    if (!originalRequest._toastShown) {
      originalRequest._toastShown = true;
      showError({ error: errorRes.data || {}, status: errorRes.status });
    }
  } else {
    if (!originalRequest._toastShown) {
      originalRequest._toastShown = true;
      toast.error("Lỗi kết nối API Film!", {
        description: "Vui lòng kiểm tra lại kết nối mạng đến API Film.",
      });
    }
  }
  return Promise.reject(error);
};

const showError = ({ error, status }: { error: any; status: number }) => {
  let messageText = "Có lỗi xảy ra với API Film!";
  if (typeof error === "string") {
    messageText = error;
  } else if (error.details) {
    messageText = error.details;
  } else if (error.message || error.error) {
    messageText = error.message || error.error;
  } else {
    switch (status) {
      case 401:
        messageText = "Bạn cần xác thực với API Film!";
        break;
      case 403:
        messageText = "Bạn không có quyền truy cập API Film!";
        break;
      case 404:
        messageText = "Không tìm thấy tài nguyên trên API Film!";
        break;
      case 500:
        messageText = "Lỗi máy chủ API Film!";
        break;
      case 502:
      case 504:
        messageText = "Lỗi cổng hoặc timeout API Film!";
        break;
      default:
        break;
    }
  }
  toast.error("Lỗi API Film!", { description: messageText });
};

filmApi.interceptors.request.use(requestHandler);
filmApi.interceptors.response.use(successHandler, errorHandler);

export default filmApi;