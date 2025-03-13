// page.tsx
'use client';

import { Client, Databases, Query } from 'appwrite';
import React, { useEffect, useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import {
    Card,
    CardBody,
    Button,
    Select,
    SelectItem,
    Image,
} from '@nextui-org/react';
import {
    Star,
    MessageCircle,
    Package,
    Moon,
    Clock,
    RefreshCw,
} from 'react-feather';

import { CustomImage } from '@/components/CustomImage';

import Table from '../../../components/table'; // Assurez-vous que le chemin est correct

export default function ProductPage({ params }: { params: { id: string } }) {
    const { id } = params;
    const locale = useLocale();
    const t = useTranslations('page_product');
    const [quantity, setQuantity] = useState(1);
    const [selectedImage, setSelectedImage] = useState(0);
    const [imagesId, setImagesId] = useState<string[]>(['']);
    const [title, setTitle] = useState<string>('');
    const [subtitle, setSubtitle] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [price, setPrice] = useState<number>(0);
    const [discountPrice, setDiscountPrice] = useState<number>();

    useEffect(() => {
        const client = new Client()
            .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT as string)
            .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT as string);
        const database = new Databases(client);

        const fetchImages = async () => {
            try {
                const response = await database.listDocuments(
                    process.env.NEXT_PUBLIC_APPWRITE_DATABASE_SHOP as string,
                    process.env
                        .NEXT_PUBLIC_APPWRITE_PRODUCTS_COLLECTION as string,
                    [Query.equal('$id', id)],
                );
                const product = response.documents[0];

                setImagesId(product.images);
                setPrice(product.price);
                setDiscountPrice(product.discount_price);
                setTitle(locale === 'fr' ? product.name_fr : product.name_en);
                setSubtitle(
                    locale === 'fr' ? product.subtitle_fr : product.subtitle_en,
                );
                setDescription(
                    locale === 'fr'
                        ? product.description_fr
                        : product.description_en,
                );
            } catch (error) {
                // console.log(error);
            }
        };

        fetchImages();
    }, [id]);

    return (
        <div className="max-w-7xl mx-auto p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Left Column - Images */}
                <div className="space-y-4">
                    <div className="aspect-square relative">
                        <CustomImage
                            isZoomed
                            // alt={t('title')}
                            alt={title}
                            className="w-full h-full object-contain rounded-lg transition-transform duration-300 ease-in-out hover:scale-125"
                            fileId={imagesId[selectedImage]}
                        />
                    </div>
                    <div className="flex gap-2 overflow-x-auto">
                        {imagesId.map((thumb, index) => (
                            <button
                                key={index}
                                className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 
                                ${selectedImage === index ? 'border-blue-500' : 'border-gray-200'}`}
                                onClick={() => setSelectedImage(index)}
                            >
                                <CustomImage
                                    alt={`Thumbnail ${index + 1}`}
                                    className="w-full h-full object-contain"
                                    fileId={thumb}
                                />
                            </button>
                        ))}
                    </div>
                </div>

                {/* Right Column - Product Info */}
                <div className="space-y-6">
                    <div className="space-y-2">
                        {/* <h1 className="text-2xl font-bold">{t('title')}</h1> */}
                        <h1 className="text-2xl font-bold">{title}</h1>
                        <p className="text-gray-600">{subtitle}</p>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                                <Star
                                    key={i}
                                    className={`w-5 h-5 ${i < parseFloat(t('rating')) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                                />
                            ))}
                        </div>
                        <span className="text-blue-600">
                            {t('rewiews')} avis clients
                        </span>
                        <span className="text-blue-600">
                            <MessageCircle className="inline mr-1" />
                            {parseInt(t('questions'))} questions / réponses
                        </span>
                    </div>

                    <Card>
                        <CardBody className="p-6">
                            <div className="flex justify-between items-center">
                                <div>
                                    {discountPrice ? (
                                        <>
                                            <span className="text-3xl font-bold text-green-500">
                                                {discountPrice}€
                                            </span>
                                            <span className="text-3xl font-bold text-gray-500 line-through ml-2">
                                                {price}€
                                            </span>
                                            <span className="text-xl font-semibold text-red-500 ml-2">
                                                (-
                                                {(
                                                    ((price - discountPrice) /
                                                        price) *
                                                    100
                                                ).toFixed(0)}
                                                %)
                                            </span>
                                        </>
                                    ) : (
                                        <span className="text-3xl font-bold">
                                            {price}€
                                        </span>
                                    )}
                                    {/* <p className="text-sm text-gray-500">
                                        {t('ecopart')}
                                        {t('ecoTax')}€
                                    </p> */}
                                </div>
                                <div className="flex items-center gap-2 min-w-[100px]">
                                    <Select
                                        className="w-full"
                                        label={t('Quantity')}
                                        selectedKeys={[quantity.toString()]}
                                        size="sm"
                                        onChange={(e) => {
                                            setQuantity(Number(e.target.value));
                                        }}
                                    >
                                        {[1, 2, 3, 4, 5].map((num) => (
                                            <SelectItem
                                                key={num.toString()}
                                                textValue={num.toString()}
                                                value={num}
                                            >
                                                {num}
                                            </SelectItem>
                                        ))}
                                    </Select>
                                </div>
                            </div>
                            <div className="space-y-3 mt-4">
                                <Button className="w-full bg-yellow-400 hover:bg -yellow-500 text-black">
                                    {t('add_to_bag')}
                                </Button>
                                <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white">
                                    {t('buy_now')}
                                </Button>
                            </div>
                        </CardBody>
                    </Card>

                    <div className="space-y-4">
                        <div className="flex items-center gap-2 text-gray-600">
                            <Package className="w-5 h-5" />
                            <span>
                                {t('Delivery')}
                                {t('livraison_date')}
                                {t('before')}
                                {t('livraison_hour')}
                            </span>
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-4">
                        <Image alt="NVIDIA" className="h-10" src="#" />
                        <Image alt="G-SYNC" className="h-10" src="#" />
                        <Image alt="Garantie" className="h-10" src="#" />
                    </div>

                    <div className="space-y-2">
                        <h3 className="font-semibold">
                            {/* {t('number_promo')} {t('Promo_sentence')} */}
                            {t('Promo_sentence')}
                        </h3>
                        <div className="space-y-2">
                            <div className="text-blue-600 hover:underline cursor-pointer">
                                Obtenez le jeu Star Wars Outlaws avec NVIDIA
                            </div>
                            <div className="text-blue-600 hover:underline cursor-pointer">
                                -5% avec le code MONSTER
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="pt-4">
                <Table
                    description={description}
                    reviews="empty"
                    specs="empty"
                />
            </div>
        </div>
    );
}
