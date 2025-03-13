'use client';
import { Button, Card } from '@nextui-org/react';
import React from 'react';
import Image from 'next/image';
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
}) => {
    return (
        <Card className="relative max-w-sm bg-gray-900/60 backdrop-blur-sm border-gray-800 border rounded-lg p-4">
            {/* Image container */}
            <div className="relative w-full h-48 mb-4 overflow-hidden rounded-lg bg-gradient-to-b from-gray-800 to-gray-900">
                <Image
                    alt={altText}
                    className="w-full h-full object-contain hover:scale-105 transition-transform duration-300"
                    src={imageSrc}
                />
            </div>

            {/* Title and Description */}
            <div className="mb-4">
                <h2 className="text-xl font-semibold text-white mb-1">
                    {title}
                </h2>
                <p className="text-gray-400 text-sm">{description}</p>
            </div>

            {/* Price and Discount */}
            <div className="flex items-center mb-4">
                <span className="text-2xl font-bold text-white">{price}€</span>
                <span className="ml-2 text-gray-400 line-through">
                    {discount}€
                </span>
                <span className="ml-2 text-green-500">
                    -
                    {(
                        ((Number(discount) - Number(price)) /
                            Number(discount)) *
                        100
                    ).toFixed(2)}
                    %
                </span>
            </div>

            {/* Quantity */}
            <div className="flex items-center gap-2 mb-4">
                <span className="text-gray-400">{quantite}</span>
                <div className="relative inline-block">
                    <select
                        className="bg-gray-800 text-white rounded px-2 py-1 appearance-none pr-8 outline-none focus:ring-2 focus:ring-blue-500"
                        defaultValue="1"
                    >
                        {[1, 2, 3, 4, 5].map((num) => (
                            <option key={num} value={num}>
                                {num}
                            </option>
                        ))}
                    </select>
                    <div className="absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none">
                        <svg
                            className="w-4 h-4 text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                d="M19 9l-7 7-7-7"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                            />
                        </svg>
                    </div>
                </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-3">
                <Button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded transition-colors duration-200">
                    {buyNow}
                </Button>
                <Button
                    className="flex-1 border border-blue-600 text-blue-600 hover:bg-blue-600/10 font-medium py-2 px-4 rounded transition-colors duration-200"
                    variant="bordered"
                >
                    {Add2Bag}
                </Button>
            </div>
        </Card>
    );
};
