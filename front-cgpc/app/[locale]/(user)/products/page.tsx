'use client';
import { Client, Databases, Query } from 'appwrite';
import { useTranslations, useLocale } from 'next-intl';
import { useEffect, useState } from 'react';
import { Card, CardBody, CardFooter, Image, Button } from '@nextui-org/react';
import Link from 'next/link';

import { title, subtitle } from '@/components/primitives';

export default function ProductCategories() {
    const t = useTranslations('Categories');
    const [categories, setCategories] = useState<any[]>([]);
    const [subcategories, setSubcategories] = useState<any[][]>([]);
    const locale = useLocale();

    type TitleColor =
        | 'violet'
        | 'yellow'
        | 'blue'
        | 'cyan'
        | 'green'
        | 'pink'
        | 'foreground';
    const titleColors: TitleColor[] = [
        'violet',
        'yellow',
        'blue',
        'cyan',
        'green',
        'pink',
        'foreground',
    ];
    const [randomColors, setRandomColors] = useState<TitleColor[]>([]);
    const generateUniqueColors = (count: number): TitleColor[] => {
        const availableColors = [...titleColors];
        const uniqueColors: TitleColor[] = [];
        const numberOfColors = Math.min(count, availableColors.length);

        for (let i = 0; i < numberOfColors; i++) {
            const randomIndex = Math.floor(
                Math.random() * availableColors.length,
            );
            const [selectedColor] = availableColors.splice(randomIndex, 1);

            uniqueColors.push(selectedColor);
        }

        return uniqueColors;
    };

    useEffect(() => {
        const client = new Client()
            .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT as string)
            .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT as string);
        const database = new Databases(client);

        const fetchCategories = async () => {
            try {
                const response = await database.listDocuments(
                    process.env.NEXT_PUBLIC_APPWRITE_DATABASE_SHOP as string,
                    process.env
                        .NEXT_PUBLIC_APPWRITE_CATEGORIES_COLLECTION as string,
                    [Query.isNull('parent_id')],
                );

                setCategories(response.documents);
                fetchSubcategories(response.documents);
                const m = generateUniqueColors(response.documents.length);

                setRandomColors(m);
            } catch (error) {
                // console.log(error);
            }
        };

        const fetchSubcategories = async (categories: any[]) => {
            try {
                const subcategoriesList = await Promise.all(
                    categories.map(async (category) => {
                        const response = await database.listDocuments(
                            process.env
                                .NEXT_PUBLIC_APPWRITE_DATABASE_SHOP as string,
                            process.env
                                .NEXT_PUBLIC_APPWRITE_CATEGORIES_COLLECTION as string,
                            [Query.equal('parent_id', category.$id)],
                        );

                        return response.documents || []; // assure qu'il retourne un tableau vide si aucune sous-catégorie n'est trouvée
                    }),
                );

                setSubcategories(subcategoriesList);
            } catch (error) {
                // console.log(error);
            }
        };

        fetchCategories();
    }, []);

    return (
        <div>
            {categories.map((category, index) => (
                <section
                    key={category.$id}
                    className="flex flex-col items-center justify-center gap-4 py-8 md:py-10"
                >
                    <div className="inline-block max-w-xl text-center justify-center">
                        <Link
                            passHref
                            href={`/${locale}/products/${category.$id}`}
                        >
                            <p
                                className={title({
                                    color: randomColors[index],
                                })}
                            >
                                {locale === 'fr'
                                    ? category.name_fr
                                    : category.name_en}
                            </p>
                        </Link>
                        <div className={subtitle({ class: 'mt-4' })}>
                            {category.description}
                        </div>
                    </div>
                    <div className="gap-2 grid grid-cols-2 sm:grid-cols-4 w-full">
                        {subcategories[index] &&
                            subcategories[index]
                                .slice(0, 8)
                                .map((subcategory) => (
                                    <Link
                                        key={subcategory.$id}
                                        href={`/${locale}/products/${subcategory.$id}`}
                                    >
                                        <Card
                                            key={subcategory.$id}
                                            isPressable
                                            className="w-full"
                                            shadow="sm"
                                        >
                                            <CardBody className="overflow-visible p-0">
                                                <Image
                                                    alt={subcategory.name_en}
                                                    className="w-full object-cover h-[140px]"
                                                    radius="lg"
                                                    shadow="sm"
                                                    src={
                                                        subcategory.imageSrc ||
                                                        '/images/placeholder.jpg'
                                                    }
                                                    width="100%"
                                                />
                                            </CardBody>
                                            <CardFooter className="text-small justify-center">
                                                <b>
                                                    {locale === 'fr'
                                                        ? subcategory.name_fr
                                                        : subcategory.name_en}
                                                </b>
                                            </CardFooter>
                                        </Card>
                                    </Link>
                                ))}
                    </div>
                    {subcategories[index] &&
                        subcategories[index].length > 8 && (
                            <Link passHref href={`/products/${category.$id}`}>
                                <Button className="mt-4">
                                    {t('show_more')}
                                </Button>
                            </Link>
                        )}
                </section>
            ))}
        </div>
    );
}
