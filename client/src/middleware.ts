import { NextRequest, NextResponse } from "next/server";

const public_routes = [
    { path: "/", whenAuthenticated: 'next' },
    { path: "/game", whenAuthenticated: 'next' },
    { path: "/search", whenAuthenticated: 'next' },
    { path: "/account/signup", whenAuthenticated: 'redirect' },
];

const REDIRECT_WHEN_NOT_AUTHENTICATE_ROUTE = '/';

export const middleware = (req: NextRequest) => {
    const path = req.nextUrl.pathname;
    const publicRoute = public_routes.find((route) => route.path === path);
    const token = req.cookies.get("AcessToken");

    if (!token && publicRoute) {
        return NextResponse.next();
    }

    if (!token && !publicRoute) {
        const url = req.nextUrl.clone();
        url.pathname = REDIRECT_WHEN_NOT_AUTHENTICATE_ROUTE;

        return NextResponse.redirect(url);
    }

    if (token && publicRoute && publicRoute.whenAuthenticated === "redirect") {
        const url = req.nextUrl.clone();
        url.pathname = REDIRECT_WHEN_NOT_AUTHENTICATE_ROUTE;

        return NextResponse.redirect(url);
    }

    if (token && !publicRoute) {
        return NextResponse.next();
    }

    return NextResponse.next();
}

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