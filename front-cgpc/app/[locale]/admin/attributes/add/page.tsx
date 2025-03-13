'use client';

import {
    Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Input,
    Select,
    SelectItem,
    Selection,
} from '@nextui-org/react';
import { useTranslations } from 'next-intl';
import React, { useState } from 'react';

import { createAttribute } from './action';

interface AttributeFormData {
    name_fr: string;
    name_en: string;
    // type: enum that can be : boolean, select, range
    type: string;
}

export default function NewAttribute() {
    const t = useTranslations('Admin');
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState<AttributeFormData>({
        name_fr: '',
        name_en: '',
        type: '',
    });

    const handleInputChange =
        (field: keyof AttributeFormData) =>
        (
            e: React.ChangeEvent<
                HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
            >,
        ) => {
            setFormData((prev) => ({
                ...prev,
                [field]: e.target.value,
            }));
        };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            await createAttribute(formData);
            window.location.href = '/admin/attributes/add';
        } catch (error) {
            // console.error('Error creating attribute:', error);
        } finally {
            setLoading(false);
        }
    };
    const handleSelectionChange = (keys: Selection) => {
        const selected = Array.from(keys).join('');

        setFormData((prev) => ({
            ...prev,
            type: selected,
        }));
    };

    return (
        <form className="max-w-4xl mx-auto p-6" onSubmit={handleSubmit}>
            <Card>
                <CardHeader>
                    <h1 className="text-2xl font-bold">
                        {t('create_new_attribute')}
                    </h1>
                </CardHeader>

                <CardBody className="gap-4">
                    {/* French Content */}
                    <div className="space-y-4 border-b pb-6">
                        <h2 className="text-xl font-semibold">
                            {t('content_fr')}
                        </h2>
                        <Input
                            required
                            label={t('name_fr')}
                            value={formData.name_fr}
                            onChange={handleInputChange('name_fr')}
                        />
                    </div>

                    {/* English Content */}
                    <div className="space-y-4 border-b pb-6">
                        <h2 className="text-xl font-semibold">
                            {t('content_en')}
                        </h2>
                        <Input
                            required
                            label={t('name_en')}
                            value={formData.name_en}
                            onChange={handleInputChange('name_en')}
                        />
                    </div>
                    {/* Attributes */}
                    <div className="space-y-4">
                        <h2 className="text-xl font-semibold">
                            {t('attributes_enum')}
                        </h2>
                        <Select
                            required
                            className="max-w-xs"
                            label="Attributes"
                            placeholder="Select Attributes"
                            selectionMode="single"
                            onSelectionChange={handleSelectionChange}
                        >
                            <SelectItem key="boolean" value="boolean">
                                Boolean
                            </SelectItem>
                            <SelectItem key="select" value="select">
                                Select
                            </SelectItem>
                            <SelectItem key="range" value="range">
                                Range
                            </SelectItem>
                        </Select>
                    </div>
                </CardBody>

                <CardFooter>
                    <Button
                        className="w-full"
                        color="primary"
                        isLoading={loading}
                        type="submit"
                    >
                        {t('confirm')}
                    </Button>
                </CardFooter>
            </Card>
        </form>
    );
}
