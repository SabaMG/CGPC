'use client';

import { Input, Button, Divider, Card } from '@nextui-org/react';
import Link from 'next/link';
import React from 'react';

import { signUpWithEmail } from '@/lib/server/auth'; // Importez la fonction depuis le fichier serveur

import { EyeFilledIcon } from './EyeFilledIcon';
import { EyeSlashFilledIcon } from './EyeSlashFilledIcon';
import { useTranslations } from 'next-intl';

export default function Register() {
    const [isVisible, setIsVisible] = React.useState(false);
    const toggleVisibility = () => setIsVisible(!isVisible);
    const t = useTranslations('register');

    return (
        <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10 min-h-screen">
            <div className="inline-block max-w-xl text-center justify-center">
                <Card className="p-8 max-w-[400px] w-full">
                    <form action={signUpWithEmail}>
                        {/* Section Connexion */}
                        <div className="flex flex-col gap-4">
                            <h2 className="text-center text-xl font-bold">
                                {t('ident')}
                            </h2>

                            <Input
                                isRequired
                                className="max-w-xs"
                                label="Email"
                                name="email"
                                placeholder="test@test.com"
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
                            {/* <Divider className="my-8" />
                            <h2 className="text-center text-xl font-bold">
                                VOS INFORMATIONS PERSONNELLES:
                            </h2> */}

                            <Input
                                isRequired
                                className="max-w-xs"
                                label={t('name')}
                                name="name"
                                placeholder="Patrick McGill"
                                type="text"
                            />

                            {/* <DatePicker className="max-w-xs" label="Birth date" /> */}

                            <Button
                                className="w-full bg-blue-900 text-white"
                                type="submit"
                            >
                                {t('create')}
                            </Button>
                            <Divider className="my-8" />

                            <div className="flex flex-col gap-4">
                                <h2 className="text-center text-xl font-bold">
                                    {t('new')}
                                </h2>
                                <Link passHref href="/login">
                                    <Button className="w-full bg-blue-900 text-white">
                                        {t('keep')}
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </form>
                </Card>
            </div>
        </section>
    );
}
