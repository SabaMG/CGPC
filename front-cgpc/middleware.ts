import type { NextRequest } from 'next/server';

import createMiddleware from 'next-intl/middleware';
import { NextResponse } from 'next/server';
import { Client, Users } from 'node-appwrite';

import { createSessionClient } from '@/lib/server/appwrite';

import { routing } from './i18n/routing';

const client = new Client()
    .setEndpoint(process.env.APPWRITE_ENDPOINT!)
    .setProject(process.env.APPWRITE_PROJECT_ID!)
    .setKey(process.env.APPWRITE_API_KEY!); // API key avec permission users.read

const users = new Users(client);

// [Vos fonctions existantes i18n restent identiques]
function shouldLocalizePathname(pathname: string) {
    const excludedPatterns = [
        /^\/api\//,
        /\.(jpg|jpeg|png|gif|ico|svg|css|js)$/,
        /^\/favicon.ico$/,
        /^\/\_next\//,
    ];

    return !excludedPatterns.some((pattern) => pattern.test(pathname));
}

function getPreferredLocale(request: NextRequest): string {
    const localeCookie = request.cookies.get('NEXT_LOCALE');

    if (
        localeCookie?.value &&
        routing.locales.includes(localeCookie.value as any)
    ) {
        return localeCookie.value;
    }

    const acceptLanguage = request.headers.get('accept-language');

    if (acceptLanguage) {
        const preferredLocale = acceptLanguage
            .split(',')
            .map((lang) => lang.split(';')[0])
            .find((lang) =>
                routing.locales.includes(lang.substring(0, 2) as any),
            );

        if (preferredLocale) {
            return preferredLocale.substring(0, 2);
        }
    }

    return routing.defaultLocale;
}

// Fonction modifiée pour utiliser node-appwrite
async function checkAdminAccess(request: NextRequest) {
    const session = request.cookies.get('my-custom-session')?.value;

    if (!session) {
        const locale = getPreferredLocale(request);

        return NextResponse.redirect(new URL(`/${locale}/login`, request.url));
    }

    try {
        const client = await createSessionClient();
        const user = await client.account.get();
        // Vérifier si l'utilisateur a le rôle admin
        const isAdmin = user.labels.includes('admin');

        if (!isAdmin) {
            const locale = getPreferredLocale(request);

            return NextResponse.redirect(new URL(`/${locale}`, request.url));
        }

        return null; // Accès autorisé
    } catch (error) {
        const locale = getPreferredLocale(request);

        return NextResponse.redirect(new URL(`/${locale}/login`, request.url));
    }
}

const handleI18nRouting = createMiddleware(routing);

export default async function middleware(request: NextRequest) {
    const pathname = request.nextUrl.pathname;

    // Vérifier si c'est une route admin
    const isAdminRoute = pathname.includes('/admin');

    if (isAdminRoute) {
        const adminCheck = await checkAdminAccess(request);

        if (adminCheck) return adminCheck;
    }

    // Gestion du routage i18n
    const isPathWithLocale = routing.locales.some(
        (locale) =>
            pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`,
    );

    if (!isPathWithLocale && shouldLocalizePathname(pathname)) {
        const preferredLocale = getPreferredLocale(request);
        const newUrl = new URL(request.url);

        newUrl.pathname = `/${preferredLocale}${pathname}`;

        return NextResponse.redirect(newUrl);
    }

    return handleI18nRouting(request);
}

export const config = {
    matcher: [
        '/',
        '/(fr|en)/:path*',
        '/((?!api|_next|.*\\..*).*)',
        '/admin/:path*',
        '/(fr|en)/admin/:path*',
    ],
};
