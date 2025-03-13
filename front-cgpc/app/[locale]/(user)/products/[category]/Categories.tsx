'use client';
import { useTranslations, useLocale } from 'next-intl';
import {
    Button,
    Card,
    CardBody,
    CardFooter,
    Image,
    Link,
} from '@nextui-org/react';
import { Models, Databases, Client } from 'appwrite';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface CategoriesProps {
    categories: Models.Document[];
}

export default function Categories({ categories }: CategoriesProps) {
    const locale = useLocale();
    const t = useTranslations('Categories'); // Assurez-vous que les traductions pour "Categories" sont disponibles
    const parentCategoryId: string | undefined = categories[0].parent_id;
    const [category, setCategory] = useState<Models.Document>();
    const router = useRouter();

    useEffect(() => {
        if (!parentCategoryId) {
            return;
        }
        const client = new Client()
            .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT as string)
            .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT as string);
        const database = new Databases(client);
        const fetchParentCategory = async () => {
            const response = await database.getDocument(
                process.env.NEXT_PUBLIC_APPWRITE_DATABASE_SHOP as string,
                process.env
                    .NEXT_PUBLIC_APPWRITE_CATEGORIES_COLLECTION as string,
                parentCategoryId,
            );

            setCategory(response);
        };

        try {
            fetchParentCategory();
        } catch (error) {
            // console.error(error);
        }
    }, []);

    return (
        <div>
            {/* Bouton de retour */}
            {category?.parent_id && (
                <div className="container mx-auto py-4">
                    <Button
                        isIconOnly
                        onClick={() =>
                            router.push(
                                `/${locale}/products/${category.parent_id}`,
                            )
                        }
                    >
                        <Image alt="Go back" src="/images/go_back.png" />
                    </Button>
                </div>
            )}
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
                    <h1 className="text-violet-500 text-3xl font-bold">
                        {(category && locale === 'fr'
                            ? category.name_fr
                            : category?.name_en) || t('title')}
                    </h1>
                </div>
            </section>

            {/* Main Content */}
            <div className="container mx-auto">
                <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
                    <div className="gap-2 grid grid-cols-2 sm:grid-cols-4 w-full">
                        {categories?.map((category) => (
                            <Link
                                key={category.$id}
                                href={`/${locale}/products/${category.$id}`}
                            >
                                <Card
                                    key={category.$id}
                                    isPressable
                                    className="w-full"
                                    shadow="sm"
                                >
                                    <CardBody className="overflow-visible p-0">
                                        <Image
                                            alt={
                                                locale === 'fr'
                                                    ? category.name_fr
                                                    : category.name_en
                                            }
                                            className="object-cover h-[200px] rounded-t-lg"
                                            radius="lg"
                                            shadow="sm"
                                            src={
                                                category.image ||
                                                '/images/placeholder.jpg'
                                            }
                                            width="100%"
                                        />
                                    </CardBody>
                                    <CardFooter className="text-small justify-center">
                                        <b className="font-semibold text-lg">
                                            {locale === 'fr'
                                                ? category.name_fr
                                                : category.name_en}
                                        </b>
                                        {/* <p className="text-sm mb-4 text-default-500">
                                            {locale === 'fr' ? category.description_fr : category.description_en}
                                        </p> */}
                                    </CardFooter>
                                </Card>
                            </Link>
                        ))}
                        {categories?.length === 0 && (
                            <div className="w-full h-96 flex items-center justify-center text-center">
                                <h2 className="text-2xl font-bold text-gray-500">
                                    {t('No categories found')}
                                </h2>
                            </div>
                        )}
                    </div>
                </section>
            </div>
        </div>
    );
}
