import { NextRequest } from "next/server";
import { updateSession, getSession } from '@/lib'
import { DEFAULT_REDIRECT_ROUTE, apiAuthPrefix, authRoutes, publicRoutes } from "@/routes";
export default async function middlewareTest(req) {
  const { nextUrl } = req
  const session = await getSession()
  console.log(session)
  if (!session) {
    return Response.redirect(new URL(DEFAULT_REDIRECT_ROUTE, nextUrl));
  }
  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isProtectedRoute = authRoutes.includes(nextUrl.pathname);
  if (isApiAuthRoute) {
    return null;
  }
  if (isProtectedRoute) {
    if (session) {
      return Response.redirect(new URL(DEFAULT_REDIRECT_ROUTE, nextUrl));
    }
    return null;
  }
  if (!session && !isPublicRoute) {
    return Response.redirect(new URL("/", nextUrl));
  }
}


// Optionally, don't invoke Middleware on some paths
// export const config = {
//   matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
// };
export const configTest = {
  matcher: [
    // Match all routes except the root and static files
    "/((?!^/$|.+\\.[\\w]+$|_next).*)",
    // Ensure API and TRPC routes are matched
    "/(api|trpc)(.*)"
  ],
};
