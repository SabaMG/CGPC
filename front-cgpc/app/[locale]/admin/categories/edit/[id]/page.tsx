'use client';
import React, { useEffect, useState } from 'react';
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

import { ImageFileUploader } from '../../../../../../components/ImageFileUploader';

import SelecteurCategories from './SelecteurCategories';
import {
    fetchCategories,
    fetchAttributes,
    uploadFile,
    deleteFile,
    editCategory,
    editProductAttributes,
} from './action';

interface CategoryFormData {
    name_fr: string;
    name_en: string;
    parent_id: string | null;
    image_id: string;
    attributes: string[];
}

export default function EditCategory({ params }: { params: { id: string } }) {
    const { id } = params;
    const t = useTranslations('Admin');
    const [categories, setCategories] = useState<any[]>([]);
    const [attributes, setAttributes] = useState<
        { key: string; label: string }[]
    >([]);
    const [formData, setFormData] = useState<CategoryFormData>({
        name_fr: '',
        name_en: '',
        parent_id: null,
        image_id: '',
        attributes: [],
    });
    const [loading, setLoading] = useState(false);

    // Charger les catégories
    useEffect(() => {
        const loadCategories = async () => {
            try {
                const cats = await fetchCategories();
                setCategories(cats);
            } catch (error) {
                console.error('Error loading categories:', error);
            }
        };

        loadCategories();
    }, []);

    // Charger les attributs
    useEffect(() => {
        const loadAttributes = async () => {
            try {
                const attrs = await fetchAttributes();
                setAttributes(
                    attrs.map((attr) => ({
                        key: attr.$id,
                        label: attr.name_fr,
                    })),
                );
            } catch (error) {
                console.error('Error loading attributes:', error);
            }
        };

        loadAttributes();
    }, []);

    // Précharger les données de la catégorie à modifier
    useEffect(() => {
        const loadCategory = async () => {
            try {
                const category = categories.find((cat) => cat.$id === id);
                if (category) {
                    setFormData({
                        name_fr: category.name_fr,
                        name_en: category.name_en,
                        parent_id: category.parent_id || null,
                        image_id: category.image_id || '',
                        attributes: category.attributes || [],
                    });
                }
            } catch (error) {
                console.error('Error loading category data:', error);
            }
        };

        loadCategory();
    }, [categories, id]);

    const handleInputChange =
        (field: keyof CategoryFormData) =>
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

    const handleLeafSelect = (leafId: string) => {
        setFormData((prev) => ({
            ...prev,
            parent_id: leafId,
        }));
    };

    const handleFileUpload = async (files: FileList) => {
        setLoading(true);
        try {
            const file = files[0];
            const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

            if (file.size > MAX_FILE_SIZE) {
                throw new Error('File size too large. Maximum size is 5MB');
            }

            const formData = new FormData();
            formData.append('file', file);

            const fileId = await uploadFile(formData);

            setFormData((prev) => ({
                ...prev,
                image_id: fileId,
            }));
        } catch (error) {
            console.error('Error uploading files:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleFileRemove = async () => {
        setLoading(true);
        try {
            await deleteFile(formData.image_id);
            setFormData((prev) => ({
                ...prev,
                image_id: '',
            }));
        } catch (error) {
            console.error('Error removing file:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSelectionChange = (selection: Selection) => {
        setFormData((prev) => ({
            ...prev,
            attributes: Array.from(selection) as string[],
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            // Mettre à jour la catégorie
            await editCategory(id, formData);

            // Mettre à jour les attributs de la catégorie
            await editProductAttributes(
                id,
                formData.attributes.map((id) => ({
                    attribute_id: id,
                    value_fr: '',
                    value_en: '',
                })),
            );

            window.location.href = '/admin/categories';
        } catch (error) {
            console.error('Error editing category:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form className="max-w-4xl mx-auto p-6" onSubmit={handleSubmit}>
            <Card>
                <CardHeader>
                    <h1 className="text-2xl font-bold">
                        {t('edit_category')}
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

                    {/* Category Details */}
                    <div className="space-y-4">
                        <h2 className="text-xl font-semibold">
                            {t('category_parent')}
                        </h2>
                        <SelecteurCategories
                            categories={categories}
                            currentCategoryId={formData.parent_id || undefined}
                            onLeafSelect={handleLeafSelect}
                        />

                        <div>
                            <label className="block text-sm font-medium mb-2">
                                {t('category_image')}
                            </label>
                            <ImageFileUploader
                                multiple
                                accept="image/*"
                                maxFiles={1}
                                maxSize={5 * 1024 * 1024}
                                onDelete={handleFileRemove}
                                onUpload={handleFileUpload}
                            />
                        </div>
                    </div>

                    {/* Attributes */}
                    <div className="space-y-4">
                        <h2 className="text-xl font-semibold">
                            {t('category_attributes')}
                        </h2>
                        <Select
                            className="max-w-xs"
                            label="Attributes"
                            placeholder="Select Attributes"
                            selectionMode="multiple"
                            value={formData.attributes}
                            selectedKeys={formData.attributes}
                            onSelectionChange={handleSelectionChange}
                        >
                            {attributes.map((attribute) => (
                                <SelectItem
                                    key={attribute.key}
                                    value={attribute.key}
                                >
                                    {attribute.label}
                                </SelectItem>
                            ))}
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
