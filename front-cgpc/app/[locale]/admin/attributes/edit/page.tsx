'use client'
import { Client, Databases, Query } from 'appwrite';
import { useTranslations, useLocale } from 'next-intl';
import { useEffect, useState } from 'react';
import { Card, CardBody, CardFooter, Image, Button } from '@nextui-org/react';
import Link from 'next/link';

import { title, subtitle } from '@/components/primitives';

export default function ProductAttributes() {
    const t = useTranslations('editAttributes');
    const [attributes, setAttributes] = useState<any[]>([]);
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

        const fetchAttributes = async () => {
            try {
                const response = await database.listDocuments(
                    process.env.NEXT_PUBLIC_APPWRITE_DATABASE_SHOP as string,
                    process.env
                        .NEXT_PUBLIC_APPWRITE_ATTRIBUTES_COLLECTION as string
                );

                setAttributes(response.documents);
                const m = generateUniqueColors(response.documents.length);

                setRandomColors(m);
            } catch (error) {
                console.error(error);
            }
        };

        fetchAttributes();
    }, []);

    return (
        <div>
            {attributes.map((attribute, index) => (
                <section
                    key={attribute.$id}
                    className="flex flex-col items-center justify-center gap-4 py-8 md:py-10"
                >
                    <div className="inline-block max-w-xl text-center justify-center">
                        <Link
                            passHref
                            href={`/${locale}/admin/attributes/edit/${attribute.$id}`}
                        >
                            <p
                                className={title({
                                    color: randomColors[index],
                                })}
                            >
                                {locale === 'fr'
                                    ? attribute.name_fr
                                    : attribute.name_en}
                            </p>
                        </Link>
                        <div className={subtitle({ class: 'mt-4' })}>
                            {attribute.description}
                        </div>
                    </div>
                </section>
            ))}
        </div>
    );
}
