export const getDominantColors = async (
    imageSrc: string,
    numColors: number = 2,
): Promise<string[]> => {
    return new Promise((resolve) => {
        const img = new Image();

        img.crossOrigin = 'Anonymous';

        img.onload = () => {
            const canvas = document.createElement('canvas');
            const context = canvas.getContext('2d');

            canvas.width = img.width;
            canvas.height = img.height;

            context?.drawImage(img, 0, 0);

            const imageData = context?.getImageData(
                0,
                0,
                img.width,
                img.height,
            ).data;

            if (!imageData) {
                resolve(['#ffffff', '#f0f0f0']); // Default colors if we can't process

                return;
            }

            // Create color buckets to group similar colors
            const colorMap = new Map<string, number>();

            for (let i = 0; i < imageData.length; i += 4) {
                const r = Math.floor(imageData[i] / 32) * 32; // Reduce to 8 levels
                const g = Math.floor(imageData[i + 1] / 32) * 32;
                const b = Math.floor(imageData[i + 2] / 32) * 32;

                const color = `rgb(${r},${g},${b})`;

                colorMap.set(color, (colorMap.get(color) || 0) + 1);
            }

            // Convert to array and sort by frequency
            const sortedColors = Array.from(colorMap.entries())
                .map(([color, count]) => ({ color, count }))
                .sort((a, b) => b.count - a.count)
                .slice(0, numColors)
                .map(({ color }) => color);

            resolve(sortedColors);
        };

        img.src = imageSrc;
    });
};
