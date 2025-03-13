import React, { ChangeEvent } from 'react';
import { Input, Slider } from '@nextui-org/react';
import { parseAsArrayOf, parseAsInteger, useQueryState } from 'nuqs';
import { useLocale } from 'next-intl';

interface RangeSelectorProps {
    className?: string;
    id: string;
    name_fr?: string;
    name_en?: string;
}

const RangeSelector: React.FC<RangeSelectorProps> = ({
    className,
    id,
    name_fr,
    name_en,
}) => {
    const [priceRange, setPriceRange] = useQueryState(
        id,
        parseAsArrayOf(parseAsInteger),
    );
    const locale = useLocale();

    const handleSliderChange = (value: number | number[]) => {
        if (Array.isArray(value)) {
            setPriceRange(value);
        }
    };

    const handleInputChange = (index: number, value: string) => {
        const newValue = parseInt(value) || 0;
        const newPriceRange = priceRange ? [...priceRange] : [0, 0];

        newPriceRange[index] = newValue;

        // Ensure min is not greater than max
        if (index === 0 && priceRange && newValue > priceRange[1]) {
            newPriceRange[1] = newValue;
        } else if (index === 1 && priceRange && newValue < priceRange[0]) {
            newPriceRange[0] = newValue;
        }

        setPriceRange(newPriceRange);
    };
    console.log(name_fr);

    return (
        <div className={`w-full max-w-md space-y-6 p-4 ${className || ''}`}>
            <div className="space-y-2">
                <Slider
                    className="py-4"
                    defaultValue={priceRange || [0, 0]}
                    formatOptions={{ style: 'currency', currency: 'EUR' }}
                    label={locale === 'fr' ? name_fr : name_en}
                    maxValue={2000}
                    minValue={0}
                    step={50}
                    value={priceRange || [0, 300]}
                    onChange={handleSliderChange}
                />
            </div>
            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <div className="relative">
                    <Input
                        label="Min Price"
                        placeholder="0"
                        max={2000}
                        min={0}
                        type="number"
                        value={(priceRange ? priceRange[0] : 0).toString()}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => {
                            const newValue = Math.min(
                                2000,
                                Math.max(0, parseInt(e.target.value) || 0) // Clamp value between 0 and 2000
                            );
                            handleInputChange(0, newValue.toString());
                        }}
                    />
                    </div>
                </div>
                <div className="space-y-2">
                    <div className="relative">
                        <Input
                            label="Max Price"
                            placeholder="0"
                            max={2000}
                            min={0}
                            type="number"
                            value={(priceRange ? priceRange[1] : 0).toString()}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                const newValue = Math.min(
                                    2000,
                                    Math.max(0, parseInt(e.target.value) || 0) // Clamp value between 0 and 2000
                                );
                                handleInputChange(1, newValue.toString());
                            }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RangeSelector;
