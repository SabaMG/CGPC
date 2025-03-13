import { useState, useEffect } from 'react';
import Image from 'next/image';

import { getDominantColors } from './colorExtractor';

interface ImageBackgroundProps {
    imageSrc: string;
    className?: string;
}

const ImageBackground = ({
    imageSrc,
    className = '',
}: ImageBackgroundProps) => {
    const [gradientColors, setGradientColors] = useState<string[]>([
        'transparent',
        'transparent',
    ]);

    useEffect(() => {
        const extractColors = async () => {
            try {
                const colors = await getDominantColors(imageSrc, 2);

                setGradientColors(colors);
            } catch (error) {
                // console.error('Error extracting colors:', error);
            }
        };

        if (imageSrc) {
            extractColors();
        }
    }, [imageSrc]);

    return (
        <Image
            alt="Background"
            className={`p-4 transition-all duration-500 ${className}`}
            layout="fill"
            src={imageSrc}
            style={{
                background: `radial-gradient(circle, ${gradientColors[1]}, ${gradientColors[0]})`,
            }}
        />
    );
};

export default ImageBackground;
