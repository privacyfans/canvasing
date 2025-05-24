// import { getToken } from "next-auth/jwt";
// import { withAuth } from "next-auth/middleware";
// import { NextResponse } from "next/server";
// export default withAuth(
//   async function middleware(req) {
//     const { pathname } = req.nextUrl;
//     // Define paths to protect
//     const protectedPaths = ["/*"]; // Protected URLs
//     const pathIsProtected = protectedPaths.some((path) =>
//       pathname.startsWith(path),
//     );
//     // Redirect to sign-in page if accessing protected route without authentication
//     if (pathIsProtected) {
//       const token = await getToken({
//         req,
//         secret: process.env.NEXTAUTH_SECRET,
//       });
//       if (!token) {
//         const signInUrl = new URL("/auth/signin-basic", req.url);
//         signInUrl.searchParams.set("callbackUrl", req.url);
//         return NextResponse.redirect(signInUrl);
//       }
//     }
//     return NextResponse.next();
//   },
//   {
//     callbacks: {
//       authorized: ({ token }) => !!token, // Returns `true` if the user is authenticated
//     },
//   },
// );
// export const config = { matcher: ["/(.*?)"] };
