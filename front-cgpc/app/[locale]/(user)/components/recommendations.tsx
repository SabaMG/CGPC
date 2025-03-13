'use client';
import { useTranslations } from 'next-intl';
import { Card, CardBody, CardFooter, Image } from '@nextui-org/react';

import { title, subtitle } from '@/components/primitives';

export default function Recommandations() {
    const t = useTranslations('Recommendations');

    return (
        <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
            <div className="inline-block max-w-xl text-center justify-center">
                <span className={title({ color: 'yellow' })}>{t('title')}</span>
                <div className={subtitle({ class: 'mt-4' })}>
                    {t('description')}
                </div>
            </div>
            <div className="gap-2 grid grid-cols-2 sm:grid-cols-4">
                <Card
                    key="Components.motherboard"
                    isPressable
                    shadow="sm"
                    // onPress={() => console.log('item pressed')}
                >
                    <CardBody className="overflow-visible p-0">
                        <Image
                            alt={t('Components.motherboard')}
                            className="w-full object-cover h-[140px]"
                            radius="lg"
                            shadow="sm"
                            src="/images/Components.motherboard.jpg"
                            width="100%"
                        />
                    </CardBody>
                    <CardFooter className="text-small justify-center">
                        <b>{t('Components.motherboard')}</b>
                    </CardFooter>
                </Card>
                <Card
                    key="Components.graphicscard"
                    isPressable
                    shadow="sm"
                    // onPress={() => console.log('item pressed')}
                >
                    <CardBody className="overflow-visible p-0">
                        <Image
                            alt={t('Components.graphicscard')}
                            className="w-full object-cover h-[140px]"
                            radius="lg"
                            shadow="sm"
                            src="/images/Components.graphicscard.jpg"
                            width="100%"
                        />
                    </CardBody>
                    <CardFooter className="text-small justify-center">
                        <b>{t('Components.graphicscard')}</b>
                    </CardFooter>
                </Card>
                <Card
                    key="Components.case"
                    isPressable
                    shadow="sm"
                    // onPress={() => console.log('item pressed')}
                >
                    <CardBody className="overflow-visible p-0">
                        <Image
                            alt={t('Components.case')}
                            className="w-full object-cover h-[140px]"
                            radius="lg"
                            shadow="sm"
                            src="/images/Components.case.jpg"
                            width="100%"
                        />
                    </CardBody>
                    <CardFooter className="text-small justify-center">
                        <b>{t('Components.case')}</b>
                    </CardFooter>
                </Card>
                <Card
                    key="Components.ram"
                    isPressable
                    shadow="sm"
                    // onPress={() => console.log('item pressed')}
                >
                    <CardBody className="overflow-visible p-0">
                        <Image
                            alt={t('Components.ram')}
                            className="w-full object-cover h-[140px]"
                            radius="lg"
                            shadow="sm"
                            src="/images/Components.ram.jpg"
                            width="100%"
                        />
                    </CardBody>
                    <CardFooter className="text-small justify-center">
                        <b>{t('Components.ram')}</b>
                    </CardFooter>
                </Card>

                <Card
                    key="Components.cooling"
                    isPressable
                    shadow="sm"
                    // onPress={() => console.log('item pressed')}
                >
                    <CardBody className="overflow-visible p-0">
                        <Image
                            alt={t('Components.cooling')}
                            className="w-full object-cover h-[140px]"
                            radius="lg"
                            shadow="sm"
                            src="/images/Components.cooling.jpg"
                            width="100%"
                        />
                    </CardBody>
                    <CardFooter className="text-small justify-center">
                        <b>{t('Components.cooling')}</b>
                    </CardFooter>
                </Card>
                <Card
                    key="Components.cpu"
                    isPressable
                    shadow="sm"
                    // onPress={() => console.log('item pressed')}
                >
                    <CardBody className="overflow-visible p-0">
                        <Image
                            alt={t('Components.cpu')}
                            className="w-full object-cover h-[140px]"
                            radius="lg"
                            shadow="sm"
                            src="/images/Components.cpu.jpg"
                            width="100%"
                        />
                    </CardBody>
                    <CardFooter className="text-small justify-center">
                        <b>{t('Components.cpu')}</b>
                    </CardFooter>
                </Card>
                <Card
                    key="Components.storage"
                    isPressable
                    shadow="sm"
                    // onPress={() => console.log('item pressed')}
                >
                    <CardBody className="overflow-visible p-0">
                        <Image
                            alt={t('Components.storage')}
                            className="w-full object-cover h-[140px]"
                            radius="lg"
                            shadow="sm"
                            src="/images/Components.storage.jpg"
                            width="100%"
                        />
                    </CardBody>
                    <CardFooter className="text-small justify-center">
                        <b>{t('Components.storage')}</b>
                    </CardFooter>
                </Card>
                <Card
                    key="Components.psu"
                    isPressable
                    shadow="sm"
                    // onPress={() => console.log('item pressed')}
                >
                    <CardBody className="overflow-visible p-0">
                        <Image
                            alt={t('Components.psu')}
                            className="w-full object-cover h-[140px]"
                            radius="lg"
                            shadow="sm"
                            src="/images/Components.psu.jpg"
                            width="100%"
                        />
                    </CardBody>
                    <CardFooter className="text-small justify-center">
                        <b>{t('Components.psu')}</b>
                    </CardFooter>
                </Card>
            </div>
            <div className="inline-block max-w-xl text-center justify-center">
                <span className={title({ color: 'violet' })}>
                    {t('title_r')}
                </span>
                <div className={subtitle({ class: 'mt-4' })}>
                    {t('description')}
                </div>
            </div>
            <div className="gap-2 grid grid-cols-2 sm:grid-cols-4">
                <Card
                    key="Peripherals.keyboard"
                    isPressable
                    shadow="sm"
                    // onPress={() => console.log('item pressed')}
                >
                    <CardBody className="overflow-visible p-0">
                        <Image
                            alt={t('Peripherals.keyboard')}
                            className="w-full object-cover h-[140px]"
                            radius="lg"
                            shadow="sm"
                            src="/images/Peripherals.keyboard.jpg"
                            width="100%"
                        />
                    </CardBody>
                    <CardFooter className="text-small justify-center">
                        <b>{t('Peripherals.keyboard')}</b>
                    </CardFooter>
                </Card>
                <Card
                    key="Peripherals.mice"
                    isPressable
                    shadow="sm"
                    // onPress={() => console.log('item pressed')}
                >
                    <CardBody className="overflow-visible p-0">
                        <Image
                            alt={t('Peripherals.mice')}
                            className="w-full object-cover h-[140px]"
                            radius="lg"
                            shadow="sm"
                            src="/images/Peripherals.mice.jpg"
                            width="100%"
                        />
                    </CardBody>
                    <CardFooter className="text-small justify-center">
                        <b>{t('Peripherals.mice')}</b>
                    </CardFooter>
                </Card>
                <Card
                    key="Peripherals.headset"
                    isPressable
                    shadow="sm"
                    // onPress={() => console.log('item pressed')}
                >
                    <CardBody className="overflow-visible p-0">
                        <Image
                            alt={t('Peripherals.headset')}
                            className="w-full object-cover h-[140px]"
                            radius="lg"
                            shadow="sm"
                            src="/images/Peripherals.headset.jpg"
                            width="100%"
                        />
                    </CardBody>
                    <CardFooter className="text-small justify-center">
                        <b>{t('Peripherals.headset')}</b>
                    </CardFooter>
                </Card>
                <Card
                    key="Peripherals.microphone"
                    isPressable
                    shadow="sm"
                    // onPress={() => console.log('item pressed')}
                >
                    <CardBody className="overflow-visible p-0">
                        <Image
                            alt={t('Peripherals.microphone')}
                            className="w-full object-cover h-[140px]"
                            radius="lg"
                            shadow="sm"
                            src="/images/Peripherals.microphone.jpg"
                            width="100%"
                        />
                    </CardBody>
                    <CardFooter className="text-small justify-center">
                        <b>{t('Peripherals.microphone')}</b>
                    </CardFooter>
                </Card>
                <Card
                    key="Peripherals.cam"
                    isPressable
                    shadow="sm"
                    // onPress={() => console.log('item pressed')}
                >
                    <CardBody className="overflow-visible p-0">
                        <Image
                            alt={t('Peripherals.cam')}
                            className="w-full object-cover h-[140px]"
                            radius="lg"
                            shadow="sm"
                            src="/images/Peripherals.cam.jpg"
                            width="100%"
                        />
                    </CardBody>
                    <CardFooter className="text-small justify-center">
                        <b>{t('Peripherals.cam')}</b>
                    </CardFooter>
                </Card>
                <Card
                    key="Peripherals.pad"
                    isPressable
                    shadow="sm"
                    // onPress={() => console.log('item pressed')}
                >
                    <CardBody className="overflow-visible p-0">
                        <Image
                            alt={t('Peripherals.pad')}
                            className="w-full object-cover h-[140px]"
                            radius="lg"
                            shadow="sm"
                            src="/images/Peripherals.pad.jpg"
                            width="100%"
                        />
                    </CardBody>
                    <CardFooter className="text-small justify-center">
                        <b>{t('Peripherals.pad')}</b>
                    </CardFooter>
                </Card>
                <Card
                    key="Peripherals.seat"
                    isPressable
                    shadow="sm"
                    // onPress={() => console.log('item pressed')}
                >
                    <CardBody className="overflow-visible p-0">
                        <Image
                            alt={t('Peripherals.seat')}
                            className="w-full object-cover h-[140px]"
                            radius="lg"
                            shadow="sm"
                            src="/images/Peripherals.seat.jpg"
                            width="100%"
                        />
                    </CardBody>
                    <CardFooter className="text-small justify-center">
                        <b>{t('Peripherals.seat')}</b>
                    </CardFooter>
                </Card>
                <Card
                    key="Peripherals.screen"
                    isPressable
                    shadow="sm"
                    // onPress={() => console.log('item pressed')}
                >
                    <CardBody className="overflow-visible p-0">
                        <Image
                            alt={t('Peripherals.screen')}
                            className="w-full object-cover h-[140px]"
                            radius="lg"
                            shadow="sm"
                            src="/images/Peripherals.screen.jpg"
                            width="100%"
                        />
                    </CardBody>
                    <CardFooter className="text-small justify-center">
                        <b>{t('Peripherals.screen')}</b>
                    </CardFooter>
                </Card>
            </div>
        </section>
    );
}
