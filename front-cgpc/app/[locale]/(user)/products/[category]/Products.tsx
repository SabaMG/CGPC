'use client';
import { useTranslations, useLocale } from 'next-intl';
import { Models } from 'appwrite';

import { subtitle, title } from '@/components/primitives';

import Filters from '../../components/Filters';
import { ProductCard } from '../../components/productCard';

interface ProductsProps {
    params: { category: string };
    products: Models.Document[];
}

export default function Products({ params, products }: ProductsProps) {
    const locale = useLocale();
    const t = useTranslations('Products');
    const { category } = params; // Récupération de la catégorie pour générer l'URL

    return (
        <div>
            {/* Hero Banner */}
            <section
                className="relative w-full flex flex-col items-center justify-center gap-4 py-8 md:py-10"
                style={{
                    backgroundImage:
                        "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('/images/cyberpunk-bitcoin-illustration.jpg')",
                    backgroundSize: 'cover',
                    minHeight: '300px',
                }}
            >
                <div className="inline-block max-w-xl text-center justify-center z-10">
                    <span className={title({ color: 'violet' })}>
                        {t('title')}&nbsp;
                    </span>
                    <br />
                    <div className={subtitle({ class: 'mt-4' })}>
                        {t('description')}
                    </div>
                </div>
            </section>

            {/* Main Content */}
            <div className="container mx-auto">
                <div className="flex gap-2 relative mt-8">
                    {/* Sticky Sidebar */}
                    <div className="w-80 sticky top-4 h-[calc(100vh-2rem)] overflow-y-auto">
                        <div className="bg-background rounded-large ">
                            <Filters category={category} />
                        </div>
                    </div>

                    {/* Products Grid */}
                    <div className="flex-1">
                        <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
                            <div className="gap-4 grid grid-cols-1 lg:grid-cols-1 xl:grid-cols-2">
                                {products?.map((product) => (
                                    <ProductCard
                                        key={product.$id}
                                        Add2Bag={t('add_to_bag')}
                                        altText={
                                            locale === 'fr'
                                                ? product.name_fr
                                                : product.name_en
                                        }
                                        buyNow={t('buy_now')}
                                        description={
                                            locale === 'fr'
                                                ? product.subtitle_fr
                                                : product.subtitle_en
                                        }
                                        discount={product.discount_price}
                                        imageSrc={
                                            product.images?.[0] ||
                                            '/images/placeholder.jpg'
                                        }
                                        price={product.price}
                                        quantite={t('quantite')}
                                        title={
                                            locale === 'fr'
                                                ? product.name_fr
                                                : product.name_en
                                        }
                                        url={`/${locale}/products/${category}/${product.$id}`}
                                    />
                                ))}
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
}
