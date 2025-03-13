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
import React, { useEffect, useState } from 'react';

import { fetchAttributeById, editAttribute } from './action';

interface AttributeFormData {
    name_fr: string;
    name_en: string;
    type: string; // Peut être : boolean, select, range
}

export default function EditAttribute({params }: { params: { attributeId: string } }) {
    const { attributeId } = params;
    const t = useTranslations('Admin');
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState<AttributeFormData>({
        name_fr: '',
        name_en: '',
        type: '',
    });

    // Charger les données de l'attribut actuel
    useEffect(() => {
        const loadAttribute = async () => {
            try {
                const attribute = await fetchAttributeById(attributeId);
                setFormData({
                    name_fr: attribute.name_fr,
                    name_en: attribute.name_en,
                    type: attribute.type,
                });
            } catch (error) {
                console.error('Error loading attribute:', error);
            }
        };

        loadAttribute();
    }, [attributeId]);

    const handleInputChange =
        (field: keyof AttributeFormData) =>
            (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
                setFormData((prev) => ({
                    ...prev,
                    [field]: e.target.value,
                }));
            };

    const handleSelectionChange = (keys: Selection) => {
        const selected = Array.from(keys).join('');
        setFormData((prev) => ({
            ...prev,
            type: selected,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            await editAttribute(attributeId, formData);
            window.location.href = '/admin/attributes/edit';
        } catch (error) {
            console.error('Error editing attribute:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form className="max-w-4xl mx-auto p-6" onSubmit={handleSubmit}>
            <Card>
                <CardHeader>
                    <h1 className="text-2xl font-bold">{t('edit_attribute')}</h1>
                </CardHeader>

                <CardBody className="gap-4">
                    {/* French Content */}
                    <div className="space-y-4 border-b pb-6">
                        <h2 className="text-xl font-semibold">{t('content_fr')}</h2>
                        <Input
                            required
                            label={t('name_fr')}
                            value={formData.name_fr}
                            onChange={handleInputChange('name_fr')}
                        />
                    </div>

                    {/* English Content */}
                    <div className="space-y-4 border-b pb-6">
                        <h2 className="text-xl font-semibold">{t('content_en')}</h2>
                        <Input
                            required
                            label={t('name_en')}
                            value={formData.name_en}
                            onChange={handleInputChange('name_en')}
                        />
                    </div>

                    {/* Type Selection */}
                    <div className="space-y-4">
                        <h2 className="text-xl font-semibold">{t('attributes_enum')}</h2>
                        <Select
                            required
                            className="max-w-xs"
                            label="Attribute Type"
                            placeholder="Select Attribute Type"
                            selectionMode="single"
                            value={formData.type}
                            selectedKeys={[formData.type]}
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
