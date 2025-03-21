import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { decrypt } from "./app/lib/session";

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
}

export default async function middleware(request: NextRequest) {
  const url = request.nextUrl;
  const path = `${url.pathname}${url.searchParams.toString() ? `?${url.searchParams.toString()}` : ""}`;
  const cookie = (await cookies()).get('video-on-demand')?.value;

  const session = await decrypt(cookie);
  // Xử lý nếu không được xác thực
  if (!session) {
    if (path.startsWith("/auth")) {
      return NextResponse.next();
    } else {
      return NextResponse.redirect(new URL("/auth", url));
    }
  }

  // Trường hợp đã được xác thực và đang ở trang login
  if (session && path === "/auth") {
    return NextResponse.redirect(new URL("/", url));
  }
  return NextResponse.next();
}