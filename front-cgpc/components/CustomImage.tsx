'use client';

import Image from 'next/image';
import { Image as NextUIImage } from '@nextui-org/react';
import { Client, Storage, ImageGravity, ImageFormat } from 'appwrite';
import { useEffect, useState } from 'react';

const client = new Client();
const storage = new Storage(client);

client
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT as string)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT as string);

async function getProductImages(fileId: string) {
    return storage.getFileDownload(
        process.env.NEXT_PUBLIC_APPWRITE_PRODUCTS_BUCKET as string,
        fileId,
    );
}

async function getProductImagesPreview(fileId: string) {
    return storage.getFilePreview(
        process.env.NEXT_PUBLIC_APPWRITE_PRODUCTS_BUCKET as string,
        fileId,
        50, // width (optional)
        50, // height (optional)
        ImageGravity.Center, // gravity (optional)
        50, // quality (optional)
        undefined, // borderWidth (optional)
        undefined, // borderColor (optional) - code couleur hexadécimal valide
        undefined, // borderRadius (optional)
        undefined, // opacity (optional)
        undefined, // rotation (optional)
        undefined, // background (optional)
        ImageFormat.Png, // output (optional)
    );
}

export const CustomImage = ({
    fileId,
    alt,
    className,
    isZoomed,
}: {
    fileId: string;
    alt?: string;
    className?: string;
    isZoomed?: boolean;
}) => {
    const [imageSrc, setImageSrc] = useState<string | null>(null);
    const [previewSrc, setPreviewSrc] = useState<string | null>(null);
    const [isImageLoaded, setIsImageLoaded] = useState(false);

    const handleImageLoad = () => {
        setIsImageLoaded(true);
    };

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const previewImgSrc = await getProductImagesPreview(fileId);

                setPreviewSrc(previewImgSrc);
                const imgSrc = await getProductImages(fileId);

                setImageSrc(imgSrc);
            } catch (error) {
                console.error('Error fetching images:', error);
            }
        };

        fetchImages();
    }, [fileId]);

    if (!imageSrc || !previewSrc)
        return (
            <NextUIImage height={300} src={previewSrc as string} width={300} />
        );

    const loader = ({
        width,
        quality,
        src,
    }: {
        width: number;
        quality?: number;
        src: string;
    }) => {
        return imageSrc;
    };

    return (
        <div className={`relative w-full h-full ${className}`}>
            {previewSrc && !isImageLoaded && (
                <Image
                    fill
                    unoptimized
                    alt={alt || 'Thumbnail Low Quality'}
                    sizes="10px"
                    src={previewSrc}
                />
            )}
            <Image
                fill
                priority
                alt={alt || 'Thumbnail High Quality'}
                loader={loader}
                sizes="10px"
                src={previewSrc}
                onLoad={handleImageLoad}
            />
        </div>
    );
};
