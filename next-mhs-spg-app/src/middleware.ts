import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;
    const token = request.cookies.get("token")?.value;

    if (pathname.includes("/public")) {
        console.log("NEXT");
        return NextResponse.next();
    }

    if (!token && pathname !== "/login") {
        return NextResponse.redirect(new URL("/login", request.url));
    }

    if (token && pathname === "/login") {
        return NextResponse.redirect(new URL("/home", request.url));
    }
}

export const config = {
    matcher: [
        "/login",
        "/public/:path*",
        "/home/:path*",
        "/input/:path*",
        "/report/:path*",
    ],
};
