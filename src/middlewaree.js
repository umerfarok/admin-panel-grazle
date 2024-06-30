// import { NextRequest } from "next/server";
// import { updateSession, getSession } from '@/lib'
// import { DEFAULT_REDIRECT_ROUTE, apiAuthPrefix, authRoutes, publicRoutes } from "@/routes";
// export default async function middlewaaare(req) {
//   const { nextUrl } = req
//   const session = await getSession()
//   const isLoggedIn = !!session
//   console.log(isLoggedIn)
//   if (!isLoggedIn) {
//     return Response.redirect(new URL(publicRoutes, nextUrl));
//   }
//   const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
//   const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
//   const isProtectedRoute = authRoutes.includes(nextUrl.pathname);
//   // if (isApiAuthRoute) {
//   //   return null;
//   // }
//   if (isProtectedRoute) {
//     if (isLoggedIn) {
//       return Response.redirect(new URL(DEFAULT_REDIRECT_ROUTE, nextUrl));
//     }
//     return null;
//   }
//   if (!isLoggedIn && !isPublicRoute) {
//     return Response.redirect(new URL("/", nextUrl));
//   }
// }


// // Optionally, don't invoke Middleware on some paths
// // export const config = {
// //   matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
// // };
// export const config = {
//   matcher: [
//     "/dashboard"
//   ],
// };
