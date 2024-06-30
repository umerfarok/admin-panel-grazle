import { NextResponse } from "next/server";

export default async function middleware(request) {
    console.log("target =========> ")
    const authToken = request.cookies.get('session');
    console.log("target authToken =========> ", authToken);
    const isAuthPage = ("/" === request.nextUrl.pathname) || ("/register" === request.nextUrl.pathname)  ? true : false;
    console.log("target isAuthPage =========> ", isAuthPage)
    if (!authToken && !isAuthPage) {
        return NextResponse.redirect(new URL("/", request.url))
    }
    if (authToken && isAuthPage) {
        return NextResponse.redirect(new URL("/dashboard", request.url))
    }
    return NextResponse.next();
}

export const config = {
    matcher: ["/","/register", "/dashboard"]
}