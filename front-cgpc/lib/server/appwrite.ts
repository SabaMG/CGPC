'use server';
import { Client, Account } from 'node-appwrite';
import { cookies } from 'next/headers';

interface SessionClient {
    account: Account;
}

export async function createSessionClient(): Promise<SessionClient> {
    const client = new Client()
        .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT as string)
        .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT as string);

    const session = cookies().get('my-custom-session');

    if (!session || !session.value) {
        throw new Error('No session');
    }

    client.setSession(session.value);

    return {
        get account() {
            return new Account(client);
        },
    };
}

interface AdminClient {
    account: Account;
}

export async function createAdminClient(): Promise<AdminClient> {
    const client = new Client()
        .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT as string)
        .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT as string)
        .setKey(process.env.NEXT_APPWRITE_KEY as string);

    return {
        get account() {
            return new Account(client);
        },
    };
}

export async function getLoggedInUser() {
    try {
        const account = await createSessionClient();

        return await account.account.get();
    } catch (error) {
        return null;
    }
}
// https://appwrite.io/docs/tutorials/nextjs-ssr-auth/step-4
