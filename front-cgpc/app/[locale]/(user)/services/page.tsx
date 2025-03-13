'use client';
import { useTranslations } from 'next-intl';
import { Card, CardBody, CardFooter, Image } from '@nextui-org/react';

import { title, subtitle } from '@/components/primitives';
import Link from 'next/link'

export default function Services() {
    const t = useTranslations('Services');

    return (
        <div>
            {/* Bandeau principal */}
            <section
                className="relative flex flex-col items-center justify-center gap-4 py-8 md:py-10 min-h-screen" // Ajout de min-h-screen
                style={{
                    backgroundImage:
                        "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('/images/cyberpunk-bitcoin-illustration.jpg')",
                    backgroundSize: 'cover',
                    minHeight: '300px', // Centrer l'image de fond
                }}
            >
                {/* Overlay pour le mode sombre avec dégradé */}
                <div
                    className="absolute inset-0 bg-black opacity-50 pointer-events-none"
                    style={{
                        backgroundImage:
                            'linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6))',
                    }}
                />
                {/* Contenu de la bannière */}
                <div className="relative z-10 text-white text-center">
                    {' '}
                    {/* z-10 pour que le texte soit au-dessus de l'overlay */}
                    <h1 className={title({ color: 'yellow' })}>{t('title')}</h1>
                    <div className={subtitle({ class: 'mt-4' })}>
                        {t('description')}
                    </div>
                </div>
            </section>

            {/* Section des services */}
            <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
                <div className="gap-2 grid grid-cols-1 sm:grid-cols-3 w-full">
                    {' '}
                    {/* Ajout de w-full ici */}
                    <Card
                        key="montage"
                        isPressable
                        className="w-full"
                        shadow="sm"
                        // onPress={() => console.log('item pressed')}
                    >
                        {' '}
                        {/* Ajout de w-full ici */}
                        <CardBody className="overflow-visible p-0">
                            <Image
                                alt={t('montage')}
                                className="w-full object-cover h-[140px]"
                                radius="lg"
                                shadow="sm"
                                src="/images/montage.jpg"
                                width="100%"
                            />
                        </CardBody>
                        <CardFooter className="text-small justify-center">
                            <b>{t('montage')}</b>
                        </CardFooter>
                    </Card>
                    <Card
                        key="assist"
                        isPressable
                        className="w-full"
                        shadow="sm"
                        // onPress={() => console.log('item pressed')}
                    >
                        <CardBody className="overflow-visible p-0">
                            <Image
                                alt={t('assist')}
                                className="w-full object-cover h-[140px]"
                                radius="lg"
                                shadow="sm"
                                src="/images/assist.jpg"
                                width="100%"
                            />
                        </CardBody>
                        <CardFooter className="text-small justify-center">
                            <b>{t('assist')}</b>
                        </CardFooter>
                    </Card>
                    <Card
                        key="config"
                        isPressable
                        className="w-full"
                        shadow="sm"
                        // onPress={() => console.log('item pressed')}
                    >
                        <CardBody className="overflow-visible p-0">
                            <Image
                                alt={t('config')}
                                className="w-full object-cover h-[140px]"
                                radius="lg"
                                shadow="sm"
                                src="/images/Computer.config.jpg"
                                width="100%"
                            />
                        </CardBody>
                        <CardFooter className="text-small justify-center">
                            <b>{t('config')}</b>
                        </CardFooter>
                    </Card>
                </div>
            </section>
            <a
                className="relative flex flex-col items-center rounded-lg justify-center gap-4 py-8 md:py-10"
                href="/votre-url"
                style={{
                    backgroundImage:
                        "linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0)), url('/images/Custom_PC.jpg')",
                    backgroundSize: 'cover', // Changé de "contain" à "cover" pour mieux gérer l'espace
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                    minHeight: '300px',
                    height: 'auto',
                    // Élargir le conteneur à 150% pour déborder sur les sections adjacentes
                    position: 'relative',
                    marginRight: '10%',
                    marginLeft: '10%',
                }}
            >
                {/* Overlay pour le mode sombre avec dégradé */}
                <div
                    className="absolute inset-0 bg-black opacity-50 pointer-events-none"
                    style={{
                        backgroundImage:
                            'linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, ))',
                    }}
                />

                {/* Contenu de la bannière */}
                <div className="relative z-10 text-white text-center">
                    <h1 className={title({ color: 'yellow' })}>
                        {t('serv_ass')}
                    </h1>
                    <div className={subtitle({ class: 'mt-4' })}>
                        {t('serv_ass_desc')}
                    </div>
                </div>
            </a>
            <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
                <div className="gap-2 grid grid-cols-1 sm:grid-cols-3 w-full">
                    {' '}
                    {/* Ajout de w-full ici */}
                    <Card
                        key="appointement"
                        isPressable
                        className="w-full"
                        shadow="sm"
                        // onPress={() => console.log('item pressed')}
                    >
                        {' '}
                        {/* Ajout de w-full ici */}
                        <CardBody className="overflow-visible p-0">
                            <Image
                                alt={t('appointement')}
                                className="w-full object-cover h-[140px]"
                                radius="lg"
                                shadow="sm"
                                src="/images/appointement.jpg"
                                width="100%"
                            />
                        </CardBody>
                        <CardFooter className="text-small justify-center">
                            <b>{t('appointement')}</b>
                        </CardFooter>
                    </Card>
                    <Card
                        key="sav"
                        isPressable
                        className="w-full"
                        shadow="sm"
                        // onPress={() => console.log('item pressed')}
                    >
                        <CardBody className="overflow-visible p-0">
                            <Image
                                alt={t('sav')}
                                className="w-full object-cover h-[140px]"
                                radius="lg"
                                shadow="sm"
                                src="/images/sav.jpg"
                                width="100%"
                            />
                        </CardBody>
                        <CardFooter className="text-small justify-center">
                            <b>{t('sav')}</b>
                        </CardFooter>
                    </Card>
                    <Card
                        key="b_a"
                        isPressable
                        className="w-full"
                        shadow="sm"
                        // onPress={() => console.log('item pressed')}
                    >
                        <CardBody className="overflow-visible p-0">
                            <Link href="/comparateur" passHref>
                                <Image
                                    alt={t('b_a')}
                                    className="w-full object-cover h-[140px]"
                                    radius="lg"
                                    shadow="sm"
                                    src="/images/b_a.jpg"
                                    width="100%"
                                    href='/comparateur'
                                />
                            </Link>
                        </CardBody>
                        <CardFooter className="text-small justify-center">
                            <b>{t('b_a')}</b>
                        </CardFooter>
                    </Card>
                </div>
            </section>
        </div>
    );
}
