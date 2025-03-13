'use server';

import { ID, OAuthProvider } from 'node-appwrite';
import { cookies, headers } from 'next/headers';
import { redirect } from 'next/navigation';

import { createAdminClient } from '@/lib/server/appwrite';

export async function signUpWithEmail(formData: FormData) {
    const email = (formData.get('email') as string | null) ?? '';
    const password = (formData.get('password') as string | null) ?? '';
    const name = (formData.get('name') as string | null) ?? '';

    const { account } = await createAdminClient();

    await account.create(ID.unique(), email, password, name);
    const session = await account.createEmailPasswordSession(email, password);

    cookies().set('my-custom-session', session.secret, {
        path: '/',
        httpOnly: true,
        sameSite: 'strict',
        secure: true,
    });

    redirect('/account');
}

export async function signInWithEmail(formData: FormData) {
    const email = (formData.get('email') as string | null) ?? '';
    const password = (formData.get('password') as string | null) ?? '';

    const { account } = await createAdminClient();

    try {
        const session = await account.createEmailPasswordSession(
            email,
            password,
        );

        cookies().set('my-custom-session', session.secret, {
            path: '/',
            httpOnly: true,
            sameSite: 'strict',
            secure: true,
        });

        return { success: true };
    } catch (error) {
        console.error('Login failed', error);

        return {
            success: false,
            error: 'Login failed. Please check your credentials.',
        };
    }
}

export async function signInWithGoogle() {
    const { account } = await createAdminClient();

    const origin = headers().get('origin');

    const redirectUrl = await account.createOAuth2Token(
        OAuthProvider.Google,
        `${origin}/oauth`,
        `${origin}/register`,
    );

    return redirect(redirectUrl);
}

// AuthResponse
export interface AuthResponse {
    success: boolean;
    error?: string;
}
