'use client';
import { useTranslations } from 'next-intl';
import {
    Card,
    CardBody,
    CardFooter,
    Image,
    Select,
    SelectItem,
    Avatar,
    Divider,
} from '@nextui-org/react';
import React, { useState } from 'react';

import { title, subtitle } from '@/components/primitives';

import { Bundle } from '../data_bundle';

export default function Recommandations() {
    const t = useTranslations('Bundle');
    const [selectedUser, setSelectedUser] = useState<any>(null);
    const bundle = Bundle;
    const handleSelectChange = (value: any) => {
        const user = bundle.find(
            (item) => item.id === parseInt([...value][0] as string, 10),
        );

        setSelectedUser(user);
    };

    return (
        <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
            <div className="inline-block max-w-xl text-center justify-center flex-grid">
                <span className={title({ color: 'yellow' })}>{t('title')}</span>
                <div className={subtitle({ class: 'mt-4' })}>
                    {t('description')}
                </div>
            </div>
            <div className="flex justify-left px-8 w-full">
                <Select
                    classNames={{
                        base: 'max-w-xs ml-4', // Move the Select component to the right with Tailwind margin-left
                        trigger: 'h-12',
                    }}
                    items={bundle}
                    label={t('ass')}
                    labelPlacement="outside"
                    placeholder={t('asshold')}
                    renderValue={(items) => {
                        return items.map((item) => (
                            <div
                                key={item.key}
                                className="flex items-center gap-2"
                            >
                                <Avatar
                                    alt={item.data?.name}
                                    className="flex-shrink-0"
                                    size="sm"
                                    src={item.data?.avatar}
                                />
                                <div className="flex flex-col">
                                    <span>{item.data?.name}</span>
                                    <span className="text-default-500 text-tiny">
                                        ({item.data?.team})
                                    </span>
                                </div>
                            </div>
                        ));
                    }}
                    onSelectionChange={handleSelectChange}
                >
                    {(user) => (
                        <SelectItem key={user.id} textValue={user.name}>
                            <div className="flex gap-2 items-center">
                                <Avatar
                                    alt={user.name}
                                    className="flex-shrink-0"
                                    size="sm"
                                    src={user.avatar}
                                />
                                <div className="flex flex-col">
                                    <span className="text-small">
                                        {user.name}
                                    </span>
                                    <span className="text-tiny text-default-400">
                                        {user.team}
                                    </span>
                                </div>
                            </div>
                        </SelectItem>
                    )}
                </Select>
            </div>

            <Divider className="my-5" />
            <div className="gap-2 grid grid-cols-2 sm:grid-cols-4">
                <Card key="Components.motherboard" isPressable shadow="sm">
                    <CardBody className="overflow-visible p-0">
                        <Image
                            alt={t('Components.motherboard')}
                            className="w-full object-cover h-[140px]"
                            radius="lg"
                            shadow="sm"
                            src={
                                selectedUser
                                    ? selectedUser.motherboard
                                    : '/images/Components.motherboard.jpg'
                            }
                            width="100%"
                        />
                    </CardBody>
                    <CardFooter className="text-small justify-center">
                        <b>{t('Components.motherboard')}</b>
                    </CardFooter>
                </Card>
                <Card key="Components.graphicscard" isPressable shadow="sm">
                    <CardBody className="overflow-visible p-0">
                        <Image
                            alt={t('Components.graphicscard')}
                            className="w-full object-cover h-[140px]"
                            radius="lg"
                            shadow="sm"
                            src={
                                selectedUser
                                    ? selectedUser.graphicscard
                                    : '/images/Components.graphicscard.jpg'
                            }
                            width="100%"
                        />
                    </CardBody>
                    <CardFooter className="text-small justify-center">
                        <b>{t('Components.graphicscard')}</b>
                    </CardFooter>
                </Card>
                <Card key="Components.case" isPressable shadow="sm">
                    <CardBody className="overflow-visible p-0">
                        <Image
                            alt={t('Components.case')}
                            className="w-full object-cover h-[140px]"
                            radius="lg"
                            shadow="sm"
                            src={
                                selectedUser
                                    ? selectedUser.case
                                    : '/images/Components.case.jpg'
                            }
                            width="100%"
                        />
                    </CardBody>
                    <CardFooter className="text-small justify-center">
                        <b>{t('Components.case')}</b>
                    </CardFooter>
                </Card>
                <Card key="Components.ram" isPressable shadow="sm">
                    <CardBody className="overflow-visible p-0">
                        <Image
                            alt={t('Components.ram')}
                            className="w-full object-cover h-[140px]"
                            radius="lg"
                            shadow="sm"
                            src={
                                selectedUser
                                    ? selectedUser.ram
                                    : '/images/Components.ram.jpg'
                            }
                            width="100%"
                        />
                    </CardBody>
                    <CardFooter className="text-small justify-center">
                        <b>{t('Components.ram')}</b>
                    </CardFooter>
                </Card>

                <Card key="Components.cooling" isPressable shadow="sm">
                    <CardBody className="overflow-visible p-0">
                        <Image
                            alt={t('Components.cooling')}
                            className="w-full object-cover h-[140px]"
                            radius="lg"
                            shadow="sm"
                            src={
                                selectedUser
                                    ? selectedUser.cooling
                                    : '/images/Components.cooling.jpg'
                            }
                            width="100%"
                        />
                    </CardBody>
                    <CardFooter className="text-small justify-center">
                        <b>{t('Components.cooling')}</b>
                    </CardFooter>
                </Card>
                <Card key="Components.cpu" isPressable shadow="sm">
                    <CardBody className="overflow-visible p-0">
                        <Image
                            alt={t('Components.cpu')}
                            className="w-full object-cover h-[140px]"
                            radius="lg"
                            shadow="sm"
                            src={
                                selectedUser
                                    ? selectedUser.cpu
                                    : '/images/Components.cpu.jpg'
                            }
                            width="100%"
                        />
                    </CardBody>
                    <CardFooter className="text-small justify-center">
                        <b>{t('Components.cpu')}</b>
                    </CardFooter>
                </Card>
                <Card key="Components.storage" isPressable shadow="sm">
                    <CardBody className="overflow-visible p-0">
                        <Image
                            alt={t('Components.storage')}
                            className="w-full object-cover h-[140px]"
                            radius="lg"
                            shadow="sm"
                            src={
                                selectedUser
                                    ? selectedUser.storage
                                    : '/images/Components.storage.jpg'
                            }
                            width="100%"
                        />
                    </CardBody>
                    <CardFooter className="text-small justify-center">
                        <b>{t('Components.storage')}</b>
                    </CardFooter>
                </Card>
                <Card key="Components.psu" isPressable shadow="sm">
                    <CardBody className="overflow-visible p-0">
                        <Image
                            alt={t('Components.psu')}
                            className="w-full object-cover h-[140px]"
                            radius="lg"
                            shadow="sm"
                            src={
                                selectedUser
                                    ? selectedUser.psu
                                    : '/images/Components.psu.jpg'
                            }
                            width="100%"
                        />
                    </CardBody>
                    <CardFooter className="text-small justify-center">
                        <b>{t('Components.psu')}</b>
                    </CardFooter>
                </Card>
                <Card key="Peripherals.keyboard" isPressable shadow="sm">
                    <CardBody className="overflow-visible p-0">
                        <Image
                            alt={t('Peripherals.keyboard')}
                            className="w-full object-cover h-[140px]"
                            radius="lg"
                            shadow="sm"
                            src={
                                selectedUser
                                    ? selectedUser.keyboard
                                    : '/images/Components.keyboard.jpg'
                            }
                            width="100%"
                        />
                    </CardBody>
                    <CardFooter className="text-small justify-center">
                        <b>{t('Peripherals.keyboard')}</b>
                    </CardFooter>
                </Card>
                <Card key="Peripherals.mice" isPressable shadow="sm">
                    <CardBody className="overflow-visible p-0">
                        <Image
                            alt={t('Peripherals.mice')}
                            className="w-full object-cover h-[140px]"
                            radius="lg"
                            shadow="sm"
                            src={
                                selectedUser
                                    ? selectedUser.mice
                                    : '/images/Components.mice.jpg'
                            }
                            width="100%"
                        />
                    </CardBody>
                    <CardFooter className="text-small justify-center">
                        <b>{t('Peripherals.mice')}</b>
                    </CardFooter>
                </Card>
                <Card key="Peripherals.headset" isPressable shadow="sm">
                    <CardBody className="overflow-visible p-0">
                        <Image
                            alt={t('Peripherals.headset')}
                            className="w-full object-cover h-[140px]"
                            radius="lg"
                            shadow="sm"
                            src={
                                selectedUser
                                    ? selectedUser.headset
                                    : '/images/Components.headset.jpg'
                            }
                            width="100%"
                        />
                    </CardBody>
                    <CardFooter className="text-small justify-center">
                        <b>{t('Peripherals.headset')}</b>
                    </CardFooter>
                </Card>
                <Card key="Peripherals.microphone" isPressable shadow="sm">
                    <CardBody className="overflow-visible p-0">
                        <Image
                            alt={t('Peripherals.microphone')}
                            className="w-full object-cover h-[140px]"
                            radius="lg"
                            shadow="sm"
                            src={
                                selectedUser
                                    ? selectedUser.microphone
                                    : '/images/Components.microphone.jpg'
                            }
                            width="100%"
                        />
                    </CardBody>
                    <CardFooter className="text-small justify-center">
                        <b>{t('Peripherals.microphone')}</b>
                    </CardFooter>
                </Card>
                <Card key="Peripherals.cam" isPressable shadow="sm">
                    <CardBody className="overflow-visible p-0">
                        <Image
                            alt={t('Peripherals.cam')}
                            className="w-full object-cover h-[140px]"
                            radius="lg"
                            shadow="sm"
                            src={
                                selectedUser
                                    ? selectedUser.cam
                                    : '/images/Components.cam.jpg'
                            }
                            width="100%"
                        />
                    </CardBody>
                    <CardFooter className="text-small justify-center">
                        <b>{t('Peripherals.cam')}</b>
                    </CardFooter>
                </Card>
                <Card key="Peripherals.pad" isPressable shadow="sm">
                    <CardBody className="overflow-visible p-0">
                        <Image
                            alt={t('Peripherals.pad')}
                            className="w-full object-cover h-[140px]"
                            radius="lg"
                            shadow="sm"
                            src={
                                selectedUser
                                    ? selectedUser.pad
                                    : '/images/Components.pad.jpg'
                            }
                            width="100%"
                        />
                    </CardBody>
                    <CardFooter className="text-small justify-center">
                        <b>{t('Peripherals.pad')}</b>
                    </CardFooter>
                </Card>
                <Card key="Peripherals.seat" isPressable shadow="sm">
                    <CardBody className="overflow-visible p-0">
                        <Image
                            alt={t('Peripherals.seat')}
                            className="w-full object-cover h-[140px]"
                            radius="lg"
                            shadow="sm"
                            src={
                                selectedUser
                                    ? selectedUser.seat
                                    : '/images/Components.seat.jpg'
                            }
                            width="100%"
                        />
                    </CardBody>
                    <CardFooter className="text-small justify-center">
                        <b>{t('Peripherals.seat')}</b>
                    </CardFooter>
                </Card>
                <Card key="Peripherals.screen" isPressable shadow="sm">
                    <CardBody className="overflow-visible p-0">
                        <Image
                            alt={t('Peripherals.screen')}
                            className="w-full object-cover h-[140px]"
                            radius="lg"
                            shadow="sm"
                            src={
                                selectedUser
                                    ? selectedUser.screen
                                    : '/images/Components.screen.jpg'
                            }
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
