'use client';
import { useTranslations, useLocale } from 'next-intl';
import { Card, CardBody, CardFooter, Image } from '@nextui-org/react';
import Link from 'next/link';

import { title, subtitle } from '@/components/primitives';

export default function Products() {
    const t = useTranslations('Products');
    const locale = useLocale();

    return (
        <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
            <Link href={`${locale}/products`}>
                <div className="inline-block max-w-xl text-center justify-center">
                    <span className={title({ color: 'green' })}>
                        {t('title')}
                    </span>
                    <div className={subtitle({ class: 'mt-4' })}>
                        {t('description')}
                    </div>
                </div>
            </Link>
            <div className="gap-2 grid grid-cols-1 sm:grid-cols-3">
                <Link href={`${locale}/products/672e03ba003ab795497a`}>
                    <Card
                        key="components"
                        isPressable
                        shadow="sm"
                        // onPress={() => console.log('item pressed')}
                    >
                        <CardBody className="overflow-visible p-0">
                            <Image
                                alt={t('components')}
                                className="w-full object-cover h-[140px]"
                                radius="lg"
                                shadow="sm"
                                src="/images/components.jpg"
                                width="100%"
                            />
                        </CardBody>
                        <CardFooter className="text-small justify-center">
                            <b>{t('components')}</b>
                        </CardFooter>
                    </Card>
                </Link>
                <Link href={`${locale}/products/672e03d7000cd0aad594`}>
                    <Card
                        key="peripherals"
                        isPressable
                        shadow="sm"
                        // onPress={() => console.log('item pressed')}
                    >
                        <CardBody className="overflow-visible p-0">
                            <Image
                                alt={t('peripherals')}
                                className="w-full object-cover h-[140px]"
                                radius="lg"
                                shadow="sm"
                                src="/images/peripherals.jpg"
                                width="100%"
                            />
                        </CardBody>
                        <CardFooter className="text-small justify-center">
                            <b>{t('peripherals')}</b>
                        </CardFooter>
                    </Card>
                </Link>
                <Link href={`${locale}/products/672f83d5002360e0995e`}>
                    <Card
                        key="computer"
                        isPressable
                        shadow="sm"
                        // onPress={() => console.log('item pressed')}
                    >
                        <CardBody className="overflow-visible p-0">
                            <Image
                                alt={t('computer')}
                                className="w-full object-cover h-[140px]"
                                radius="lg"
                                shadow="sm"
                                src="/images/comparator.jpg"
                                width="100%"
                            />
                        </CardBody>
                        <CardFooter className="text-small justify-center">
                            <b>{t('computer')}</b>
                        </CardFooter>
                    </Card>
                </Link>
            </div>
        </section>
    );
}
