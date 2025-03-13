'use client';
import { useTranslations } from 'next-intl';

import { title, subtitle } from '@/components/primitives';

import Services from './components/SevicesHome';
import Products from './components/products';
import Bundle from './components/Bundle';

export default function HomePage() {
    const t = useTranslations('HomePage');

    return (
        <div>
            {/* Bandeau principal */}
            <section
                className="flex flex-col items-center justify-center gap-4 py-8 md:py-10"
                style={{
                    backgroundImage:
                        "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('/images/cyberpunk-bitcoin-illustration.jpg')",
                    backgroundSize: 'cover',
                }}
            >
                {/* Overlay pour le mode sombre avec dégradé */}
                <div
                    className="absolute inset-0 bg-black dark:bg-transparent dark:opacity-0 opacity-0 pointer-events-none"
                    style={{
                        backgroundImage:
                            'linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6))',
                    }}
                />

                {/* Contenu du bandeau */}
                <div className="inline-block max-w-xl text-center justify-center">
                    <span className={title({ color: 'violet' })}>
                        {t('title')}&nbsp;
                    </span>
                    <br />
                    <span className={title()}>{t('subtitle')}</span>
                    <div className={subtitle({ class: 'mt-4' })}>
                        {t('description')}
                    </div>
                </div>
            </section>
            <Services />
            <Products />
            <Bundle />
        </div>
    );
}
