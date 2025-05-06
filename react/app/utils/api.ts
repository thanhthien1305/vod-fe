import axios, {
  AxiosRequestHeaders,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import { toast } from "sonner";
import { logoutApp } from "../actions/auth";

export function encodeToBase64(clientId: string, clientSecret: string): string {
  const credentials = `${clientId}:${clientSecret}`;
  return Buffer.from(credentials).toString('base64');
}
const clientSecret = process.env.NEXT_PUBLIC_CLIENT_SECRET;
const clientId = process.env.NEXT_PUBLIC_CLIENT_ID;

const API = axios.create({
  baseURL: process.env.NEXT_PUBLIC_COGNITO_DOMAIN,
  responseType: "json",
  withCredentials: false,
  timeout: 5000 * 60,
});

const requestHandler = (request: InternalAxiosRequestConfig) => {
  request.headers = request.headers || ({} as AxiosRequestHeaders);
  if (
    localStorage.getItem("video-on-demand") == undefined &&
    localStorage.getItem("video-on-demand") == null
  ) {
    request.headers["Content-Type"] = "application/x-www-form-urlencoded";
    if (clientSecret && clientId) {
      const authorization_code = encodeToBase64(clientId, clientSecret);
      request.headers.Authorization = `Basic ` +  authorization_code;
    }
  } else {
    request.headers.Authorization = `Bearer ${localStorage.getItem(
      "video-on-demand"
    )}`;
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
    if (!localStorage.getItem("video-on-demand")) {
      localStorage.removeItem("video-on-demand");
      logoutApp();
      setTimeout(() => window.location.reload(), 1000);
      return Promise.reject(error);
    }
    // if (errorRes.status === 401) {
    //   originalRequest._retry = true;
    //   try {
    //     const newAccessToken = await refreshToken(
    //       localStorage.getItem("video-on-demand") ?? ""
    //     );
    //     if (newAccessToken?.data.data.accessToken) {
    //       originalRequest.headers.Authorization = `Bearer ${newAccessToken.data.data.accessToken}`;
    //       localStorage.setItem(
    //         "video-on-demand",
    //         newAccessToken.data.data.accessToken
    //       );
    //       // refreshTokenApp();
    //       return axios(originalRequest);
    //     } else {
    //       localStorage.removeItem("video-on-demand");
    //       logoutApp();
    //       setTimeout(() => window.location.reload(), 500);
    //       return Promise.reject();
    //     }
    //   } catch (refreshError) {
    //     localStorage.removeItem("video-on-demand");
    //     logoutApp();
    //     setTimeout(() => window.location.reload(), 1000);
    //     return Promise.reject(refreshError);
    //   }
    // }

    if (errorRes.status === 409) {
      setTimeout(() => window.location.reload(), 1000);
    }

    if (!originalRequest._toastShown) {
      originalRequest._toastShown = true;
      showError({ error: errorRes.data || {}, status: errorRes.status });
    }
  } else {
    if (!originalRequest._toastShown) {
      originalRequest._toastShown = true;
      toast.error("Lỗi kết nối!", {
        description: "Vui lòng kiểm tra lại kết nối mạng.",
      });
    }
  }
  return Promise.reject(error);
};

const showError = ({ error, status }: { error: any; status: number }) => {
  let messageText = "Có lỗi xảy ra!";
  if (typeof error === "string") {
    messageText = error;
  } else if (error.details) {
    messageText = error.details;
  } else if (error.message || error.error) {
    messageText = error.message || error.error;
  } else {
    switch (status) {
      case 401:
        messageText = "Bạn cần đăng nhập!";
        break;
      case 403:
        messageText = "Bạn không có quyền!";
        break;
      case 404:
        messageText = "Không tìm thấy!";
        break;
      case 502:
      case 504:
        messageText = "Lỗi máy chủ!";
        break;
      default:
        break;
    }
  }
  if (status === 409) {
    messageText = "Tài khoản đã đăng nhập nơi khác!";
  }
  toast.error("Thông báo lỗi!", { description: messageText });
};

API.interceptors.request.use(requestHandler);
API.interceptors.response.use(successHandler, errorHandler);

export default API;
