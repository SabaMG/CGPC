'use client';
import {
    Navbar,
    NavbarContent,
    Button,
    Dropdown,
    DropdownTrigger,
    DropdownMenu,
    DropdownItem,
} from '@nextui-org/react';
import { useTranslations } from 'next-intl';

export const Footer = () => {
    const t = useTranslations('Footer');
    const itemsFirst = [
        {
            key: 'about',
            label: t('about'),
        },
        {
            key: 'cgu',
            label: t('cgu'),
        },
        {
            key: 'legal',
            label: t('legal'),
        },
        {
            key: 'confidentiality',
            label: t('confidentiality'),
        },
    ];
    const itemsLast = [
        {
            key: 'instagram',
            label: 'Instagram',
        },
        {
            key: 'tik_tok',
            label: 'TikTok',
        },
        {
            key: 'youtube',
            label: 'Youtube',
        },
        {
            key: 'twitch',
            label: 'Twitch',
        },
        {
            key: 'twitter',
            label: 'Twitter',
        },
    ];

    return (
        <Navbar position="static">
            <NavbarContent justify="start">
                <DropdownFooter items={itemsFirst} title={t('useful-links')} />
            </NavbarContent>
            <NavbarContent justify="end">
                <DropdownFooter
                    items={itemsLast}
                    title={t('social-networks')}
                />
            </NavbarContent>
        </Navbar>
    );
};

// en fonction du titre du footer
function DropdownFooter({
    title,
    items,
}: {
    title: string;
    items: { key: string; label: string }[];
}) {
    return (
        <Dropdown>
            <DropdownTrigger>
                <Button variant="bordered">{title}</Button>
            </DropdownTrigger>
            <DropdownMenu aria-label="Dynamic Actions" items={items}>
                {(item) => (
                    <DropdownItem
                        key={item.key}
                        className={item.key === 'delete' ? 'text-danger' : ''}
                        color={item.key === 'delete' ? 'danger' : 'default'}
                    >
                        {item.label}
                    </DropdownItem>
                )}
            </DropdownMenu>
        </Dropdown>
    );
}
