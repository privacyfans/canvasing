import { getToken } from "next-auth/jwt";
import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  async function middleware(req) {
    const { pathname } = req.nextUrl;
    
    // Define paths to protect
    const protectedPaths = ["/dashboards", "/apps", "/page"]; 
    const authPaths = ["/auth"];
    const debugPaths = ["/debug"];
    
    const pathIsProtected = protectedPaths.some((path) =>
      pathname.startsWith(path),
    );
    
    const pathIsAuth = authPaths.some((path) =>
      pathname.startsWith(path),
    );

    const pathIsDebug = debugPaths.some((path) =>
      pathname.startsWith(path),
    );

    try {
      const token = await getToken({
        req,
        secret: process.env.NEXTAUTH_SECRET,
      });

      // Debug mode - allow access to debug page if there's any token
      if (pathIsDebug) {
        console.log('Debug page access - Token exists:', !!token);
        return NextResponse.next();
      }

      // Redirect to sign-in page if accessing protected route without authentication
      if (pathIsProtected) {
        if (!token) {
          console.log('No token found, redirecting to signin');
          const signInUrl = new URL("/auth/signin", req.url);
          signInUrl.searchParams.set("callbackUrl", req.url);
          return NextResponse.redirect(signInUrl);
        }

        // Check if token has error
        if (token.error) {
          console.log('Token has error:', token.error);
          
          if (token.error === 'RefreshTokenExpired' || token.error === 'RefreshAccessTokenError') {
            console.log('Token expired, redirecting to signin');
            const signInUrl = new URL("/auth/signin", req.url);
            signInUrl.searchParams.set("callbackUrl", req.url);
            signInUrl.searchParams.set("error", "SessionExpired");
            return NextResponse.redirect(signInUrl);
          }
        }

        // Check if token is about to expire (within 30 seconds)
        if (token.expiresAt && Date.now() > token.expiresAt - 30 * 1000) {
          console.log('Token expiring soon, but allowing access');
          // Allow access but the JWT callback will handle refresh
        }
      }

      // Redirect authenticated users away from auth pages
      if (pathIsAuth && token && !token.error) {
        console.log('Authenticated user accessing auth page, redirecting to dashboard');
        return NextResponse.redirect(new URL("/dashboards", req.url));
      }

    } catch (error) {
      console.error('Middleware error:', error);
      
      // If there's an error getting the token and it's a protected path, redirect to signin
      if (pathIsProtected) {
        const signInUrl = new URL("/auth/signin", req.url);
        signInUrl.searchParams.set("callbackUrl", req.url);
        signInUrl.searchParams.set("error", "AuthError");
        return NextResponse.redirect(signInUrl);
      }
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const { pathname } = req.nextUrl;
        
        // Allow access to debug pages
        if (pathname.startsWith("/debug")) {
          return true;
        }
        
        // Allow access to auth pages
        if (pathname.startsWith("/auth")) {
          return true;
        }
        
        // For protected paths, require a valid token
        const protectedPaths = ["/dashboards", "/apps", "/page"];
        const pathIsProtected = protectedPaths.some((path) =>
          pathname.startsWith(path),
        );
        
        if (pathIsProtected) {
          return !!token && !token.error;
        }
        
        // Allow access to other paths
        return true;
      },
    },
  },
);

export const config = { 
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};