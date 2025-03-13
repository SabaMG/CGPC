import { redirect } from 'next/navigation';

import { getLoggedInUser } from '@/lib/server/appwrite';
import Register from '@/components/Register';

export default async function RegisterPage() {
    const user = await getLoggedInUser();

    if (user) {
        redirect('/account');
    }

    return <Register />;
}
