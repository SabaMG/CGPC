'use client';
import { Button, Card, Input } from '@nextui-org/react';
import React from 'react';

import { CustomImage } from '@/components/CustomImage';

interface ProductCardProps {
    imageSrc: string;
    altText: string;
    title: string;
    description: string;
    price: string;
    discount: string;
    buyNow: string;
    Add2Bag: string;
    quantite: string;
    url?: string;
}

export const ProductCard: React.FC<ProductCardProps> = ({
    imageSrc,
    altText,
    title,
    description,
    price,
    discount,
    buyNow,
    Add2Bag,
    quantite,
    url,
}) => {
    return (
        <Card
            className="relative w-full h-full rounded-lg overflow-hidden"
            shadow="sm"
        >
            <div className="flex flex-col lg:flex-row p-4 gap-4">
                {/* Container pour l'image avec position relative */}
                <div className="relative w-full lg:w-48 h-48 overflow-hidden rounded-lg">
                    {/* <ImageBackground
                        className="absolute inset-0 w-full h-full object-cover"
                        imageSrc={imageSrc}
                    /> */}
                    <a className="cursor-pointer" href={url}>
                        <CustomImage
                            alt={altText}
                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 ease-in-out hover:scale-125"
                            // layout="fill"
                            fileId={imageSrc}
                        />
                    </a>
                </div>

                {/* Contenu */}
                <div className="flex-1 flex flex-col justify-between">
                    <a className="cursor-pointer" href={url}>
                        <div className="flex justify-between items-start">
                            <div>
                                <h2 className="text-xl font-bold">{title}</h2>
                                <p className="text-gray-400">{description}</p>
                            </div>
                            <i className="fas fa-star text-gray-400" />
                        </div>

                        <div className="mt-4">
                            {discount ? (
                                <>
                                    <span className="text-2xl font-bold">
                                        {discount}€
                                    </span>
                                    <span className="line-through text-gray-500 ml-2">
                                        {price}€
                                    </span>
                                    <span className="text-green-500 ml-2">
                                        -
                                        {(
                                            ((Number(price) -
                                                Number(discount)) /
                                                Number(price)) *
                                            100
                                        ).toFixed(0)}
                                        {/* 2 */}%
                                    </span>
                                </>
                            ) : (
                                <span className="text-2xl font-bold">
                                    {price}€
                                </span>
                            )}
                        </div>
                    </a>

                    {/* Input Quantité */}
                    <div className="mt-4 flex items-center gap-2">
                        <p className="text-gray-400">{quantite}</p>
                        <Input
                            className="w-16"
                            defaultValue="1"
                            min="0"
                            type="number"
                        />
                    </div>

                    {/* Boutons */}
                    <div className="flex gap-4 mt-4">
                        <Button
                            className="transition-transform duration-300 ease-in-out hover:scale-110"
                            color="primary"
                        >
                            {buyNow}
                        </Button>
                        <Button
                            className="rounded-full transition-transform duration-300 ease-in-out hover:scale-110"
                            color="primary"
                            variant="bordered"
                        >
                            {Add2Bag}
                        </Button>
                    </div>
                </div>
            </div>
        </Card>
    );
};
