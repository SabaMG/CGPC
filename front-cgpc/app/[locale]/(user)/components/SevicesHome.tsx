'use client';
import { useTranslations } from 'next-intl';

import { title, subtitle } from '@/components/primitives';

export default function ServicesHome() {
    const t = useTranslations('Services');

    return (
        <div>
            {/* Bandeau principal */}
            <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
                <div className="inline-block max-w-xl text-center justify-center flex-grid">
                    <span className={title({ color: 'yellow' })}>
                        {t('title')}
                    </span>
                    <div className={subtitle({ class: 'mt-4' })}>
                        {t('description')}
                    </div>
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
        </div>
    );
}
