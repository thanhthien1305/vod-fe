import API, { encodeToBase64 } from "@/app/utils/api";

const cognitoDomain = process.env.NEXT_PUBLIC_COGNITO_DOMAIN;
const redirect_url = window.location.href; 
const clientId = process.env.NEXT_PUBLIC_CLIENT_ID; 

export function signin(code?: string) {
    if (!clientId || !cognitoDomain) {
        console.error("Client ID or Cognito Domain is not defined.");
        return;
    }
    if(!code) {
        const queryString: string = new URLSearchParams({
            response_type: "code",
            client_id: clientId,
            redirect_uri: redirect_url
        }).toString();
    
        window.location.href = `${cognitoDomain}/login?${queryString}`;
    } else {
        // Xử lý khi có code, ví dụ gọi API để lấy token
        const params = new URLSearchParams({
            grant_type: "authorization_code",
            client_id: clientId,
            code: code,
            redirect_uri: redirect_url
        }).toString()
        return API.post(`/oauth2/token?${params}`);
    }
}