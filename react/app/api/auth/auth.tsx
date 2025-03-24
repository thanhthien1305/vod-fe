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
    
        window.location.href = `${cognitoDomain}login?${queryString}`;
    } else {
        // Xử lý khi có code, ví dụ gọi API để lấy token
        fetch(`${cognitoDomain}/oauth2/token`, {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: new URLSearchParams({
                grant_type: "authorization_code",
                client_id: clientId,
                code: code,
                redirect_uri: redirect_url
            }).toString()
        })
        .then(response => response.json())
        .then(data => {
            console.log("Tokens received:", data);
        })
        .catch(error => {
            console.error("Error fetching tokens:", error);
        });
    }
}