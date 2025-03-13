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
import Link from 'next/link';
import { useTranslations } from 'next-intl';

export const Footer = () => {
    const t = useTranslations('Footer');

    const itemsFirst = [
        {
            key: 'about',
            label: t('about'),
            href: '/about', // Navigation interne
        },
        {
            key: 'cgu',
            label: t('cgu'),
            href: '/cgu', // Navigation interne
        },
        {
            key: 'legal',
            label: t('legal'),
            href: '/legal', // Navigation interne
        },
        {
            key: 'confidentiality',
            label: t('confidentiality'),
            href: '/confidentiality', // Navigation interne
        },
    ];

    const itemsLast = [
        {
            key: 'instagram',
            label: 'Instagram',
            url: 'https://www.instagram.com', // URL externe
        },
        {
            key: 'twitter',
            label: 'Twitter',
            url: 'https://www.twitter.com', // URL externe
        },
    ];

    return (
        <Navbar position="static">
            <NavbarContent justify="start">
                <DropdownFooter items={itemsFirst} title={t('useful-links')} />
            </NavbarContent>
            <NavbarContent justify="end">
                <DropdownFooter items={itemsLast} title={t('socials')} isSocial />
            </NavbarContent>
        </Navbar>
    );
};

// Composant DropdownFooter
function DropdownFooter({
    title,
    items,
    isSocial = false,
}: {
    title: string;
    items: { key: string; label: string; href?: string; url?: string }[];
    isSocial?: boolean;
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
                        onClick={() => {
                            if (item.url) {
                                // Ouvre le lien externe dans un nouvel onglet
                                window.open(item.url, '_blank');
                            } else if (item.href) {
                                // Utilise Link pour la navigation interne
                                window.location.href = item.href;
                            }
                        }}
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