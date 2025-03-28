import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';

import { createSessionClient, getLoggedInUser } from '@/lib/server/appwrite';

async function signOut() {
    'use server';

    const { account } = await createSessionClient();

    cookies().delete('my-custom-session');
    await account.deleteSession('current');

    redirect('/login');
}

export default async function HomePage() {
    const user = await getLoggedInUser();

    if (!user) redirect('/login');

    return (
        <>
            <ul>
                <li>
                    <strong>Email:</strong> {user.email}
                </li>
                <li>
                    <strong>Name:</strong> {user.name}
                </li>
                <li>
                    <strong>ID: </strong> {user.$id}
                </li>
            </ul>

            <form action={signOut}>
                <button type="submit">Sign out</button>
            </form>
        </>
    );
}
