'use client';
import { useTranslations } from 'next-intl';

import { title, subtitle } from '@/components/primitives';

import { ProductCard } from './productCard';

export default function Services() {
    const t = useTranslations('Services');

    return (
        <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
            <div className="inline-block max-w-xl text-center">
                <span className={title({ color: 'blue' })}>{t('title')}</span>
                <div className={subtitle({ class: 'mt-4' })}>
                    {t('description')}
                </div>
            </div>
            <div className="gap-4 grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
                <ProductCard
                    Add2Bag={t('add_to_bag')}
                    altText={t('montage')}
                    buyNow={t('buy_now')}
                    description={t('montage_des')}
                    discount={t('montage_discount')}
                    imageSrc="/images/cm-manga.webp"
                    price={t('montage_prix')}
                    quantite={t('quantite')}
                    title={t('montage')}
                />
                <ProductCard
                    Add2Bag={t('add_to_bag')}
                    altText={t('config')}
                    buyNow={t('buy_now')}
                    description={t('config_des')}
                    discount={t('config_discount')}
                    imageSrc="/images/rtx-manga.webp"
                    price={t('config_prix')}
                    quantite={t('quantite')}
                    title={t('config')}
                />
                <ProductCard
                    Add2Bag={t('add_to_bag')}
                    altText={t('config')}
                    buyNow={t('buy_now')}
                    description={t('config_des')}
                    discount={t('config_discount')}
                    imageSrc="/images/rtx-manga.webp"
                    price={t('config_prix')}
                    quantite={t('quantite')}
                    title={t('config')}
                />
            </div>
        </section>
    );
}
