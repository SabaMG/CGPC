import { redirect } from 'next/navigation';

import { getLoggedInUser } from '@/lib/server/appwrite';
import Login from '@/components/Login';

export default async function LoginPage() {
    const user = await getLoggedInUser();

    if (user) {
        redirect('/account');
    }

    return <Login />;
}
