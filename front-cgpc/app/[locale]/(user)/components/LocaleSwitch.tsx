'use client';
import { Switch } from '@nextui-org/react';
import { useParams } from 'next/navigation';

import { usePathname, useRouter } from '@/i18n/routing';

import { FrenchFlag } from './icons';
import { EnglishFlag } from './icons';

export default function LangSwitcher() {
    const { locale } = useParams();
    const { push } = useRouter();
    const pathname = usePathname();

    const handleSwitch = (event: React.ChangeEvent<HTMLInputElement>) => {
        const checked = event.target.checked;

        push(pathname, { locale: checked ? 'fr' : 'en' });
    };

    return (
        <Switch
            color="default"
            defaultSelected={locale === 'fr'}
            size="lg"
            thumbIcon={({ isSelected, className }) =>
                isSelected ? (
                    <FrenchFlag className={className} />
                ) : (
                    <EnglishFlag className={className} />
                )
            }
            onChange={handleSwitch}
        />
    );
}
