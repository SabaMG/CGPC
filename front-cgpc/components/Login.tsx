'use client';
import { Card, Input, Button, Checkbox, Divider } from '@nextui-org/react';
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import {
    signInWithEmail,
    signInWithGoogle,
    AuthResponse,
} from '@/lib/server/auth'; // Importez la fonction depuis le fichier serveur
import { useTranslations } from 'next-intl';
import { EyeFilledIcon } from './EyeFilledIcon';
import { EyeSlashFilledIcon } from './EyeSlashFilledIcon';

export default function Login() {

    const t = useTranslations('login');
    
    const [isVisible, setIsVisible] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const router = useRouter();
    const toggleVisibility = () => setIsVisible(!isVisible);

    const handleSubmit = async (event: React.FormEvent): Promise<void> => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget as HTMLFormElement);
        const response: AuthResponse = await signInWithEmail(formData);

        if (response.success) {
            router.push('/account'); // Redirection en cas de succès
        } else {
            setErrorMessage(response.error ? response.error : 'Aucune erreur'); // Affiche l'erreur en cas d'échec
        }
    };
    const handleGoogleSignIn = async (): Promise<void> => {
        const response: AuthResponse = await signInWithGoogle();

        if (response.success) {
            router.push('/account'); // Redirection en cas de succès
        } else {
            setErrorMessage(response.error ? response.error : 'Aucune erreur'); // Affiche l'erreur en cas d'échec
        }
    };

    return (
        <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10 min-h-screen">
            <div className="inline-block max-w-xl text-center justify-center">
                <Card className="p-8 max-w-[400px] w-full">
                    {errorMessage && (
                        <p className="text-red-500">{errorMessage}</p>
                    )}
                    <form onSubmit={handleSubmit}>
                        <div className="flex flex-col gap-4">
                            <h2 className="text-center text-xl font-bold">
                                {t('clientù')}
                            </h2>

                            <Input
                                isRequired
                                className="max-w-xs"
                                label="Email"
                                name="email"
                                placeholder="text@test.com"
                                type="email"
                            />

                            <div className="relative w-full">
                                <Input
                                    className="max-w-xs"
                                    endContent={
                                        <button
                                            aria-label="toggle password visibility"
                                            className="focus:outline-none"
                                            type="button"
                                            onClick={toggleVisibility}
                                        >
                                            {isVisible ? (
                                                <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                                            ) : (
                                                <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                                            )}
                                        </button>
                                    }
                                    label={t('mdp')}
                                    name="password"
                                    placeholder={t('mdpholder')}
                                    type={isVisible ? 'text' : 'password'}
                                    variant="bordered"
                                />
                            </div>

                            <Link
                                className="text-blue-600 text-center text-sm hover:underline"
                                href="#"
                            >
                                {t('forgot')}
                            </Link>

                            <Button
                                className="w-full bg-blue-900 text-white"
                                type="submit"
                            >
                                {t('connect')}
                            </Button>

                            <Button onClick={handleGoogleSignIn}>
                                {t('google')}
                            </Button>

                            <Checkbox
                                defaultSelected
                                className="mt-2"
                                color="primary"
                            >
                                {t('keep')}
                            </Checkbox>
                        </div>
                    </form>

                    <Divider className="my-8" />

                    <div className="flex flex-col gap-4">
                        <h2 className="text-center text-xl font-bold">
                            {t('new')}
                        </h2>
                        <Link passHref href="/register">
                            <Button className="w-full bg-blue-900 text-white">
                                {t('create')}
                            </Button>
                        </Link>
                    </div>
                </Card>
            </div>
        </section>
    );
}
