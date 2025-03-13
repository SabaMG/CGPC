'use client';

import {
    Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    DateRangePicker,
    Input,
    Textarea,
} from '@nextui-org/react';
import { DateValue } from '@react-types/datepicker';
import { RangeValue } from '@react-types/shared';
import { useLocale, useTranslations } from 'next-intl';
import React, { useEffect, useState } from 'react';

import { ImageFileUploader } from '../../../../../components/ImageFileUploader';

import SelecteurCategories from './SelecteurCategories';
import {
    createProduct,
    createProductAttributes,
    deleteFile,
    fetchCategories,
    fetchAttributes,
    uploadFile,
} from './action';

interface ProductFormData {
    name_fr: string;
    name_en: string;
    description_fr: string;
    description_en: string;
    subtitle_fr: string;
    subtitle_en: string;
    price: number;
    discountPrice: number | null;
    promotionDateRange?: RangeValue<DateValue>;
    stock: number;
    categoryId: string;
    images: string[];
}

interface ProductAttributes {
    attribute_id: string;
    value_fr: string;
    value_en: string;
}

export default function NewProduct() {
    const t = useTranslations('Admin');
    const [categories, setCategories] = useState<any[]>([]);
    const [attributes, setAttributes] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const locale = useLocale();

    const [formData, setFormData] = useState<ProductFormData>({
        name_fr: '',
        name_en: '',
        description_fr: '',
        description_en: '',
        subtitle_fr: '',
        subtitle_en: '',
        price: 0,
        discountPrice: null,
        promotionDateRange: undefined,
        stock: 0,
        categoryId: '',
        images: [],
    });

    const [productAttributes, setProductAttributes] = useState<
        ProductAttributes[]
    >([]);

    useEffect(() => {
        const loadCategories = async () => {
            try {
                const cats = await fetchCategories();

                // console.log('Categories:', cats);
                setCategories(cats);
            } catch (error) {
                // console.error('Error loading categories:', error);
            }
        };

        loadCategories();
    }, []);

    useEffect(() => {
        setProductAttributes([]);
        setAttributes([]);
        const loadAttributes = async () => {
            try {
                const ids = categories.find(
                    (cat) => cat.$id === formData.categoryId,
                )?.attributes;

                if (!ids) {
                    return;
                }
                const attrs = await fetchAttributes(ids);

                // console.log('Attributes:', attrs);
                setAttributes(attrs);
            } catch (error) {
                // console.error('Error loading attributes:', error);
            }
        };

        loadAttributes();
    }, [formData.categoryId]);

    const handleInputChange =
        (field: keyof ProductFormData) =>
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

    const handleDateRangeChange = (range: RangeValue<DateValue>) => {
        setFormData((prev) => ({
            ...prev,
            promotionDateRange: range,
        }));
    };

    const handleLeafSelect = (leafId: string) => {
        setFormData((prev) => ({
            ...prev,
            categoryId: leafId,
        }));
    };
    const handleAttributeChangeFr =
        (attrId: string) =>
        (
            e: React.ChangeEvent<
                HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
            >,
        ) => {
            console.log('Attribute change:', attrId, e.target.value);
            setProductAttributes((prev) => {
                const existingAttr = prev.find(
                    (attr) => attr.attribute_id === attrId,
                );

                if (existingAttr) {
                    return prev.map((attr) =>
                        attr.attribute_id === attrId
                            ? { ...attr, value_fr: e.target.value }
                            : attr,
                    );
                } else {
                    return [
                        ...prev,
                        {
                            attribute_id: attrId,
                            value_fr: e.target.value,
                            value_en: '',
                        },
                    ];
                }
            });
        };
    const handleAttributeChangeEn =
        (attrId: string) =>
        (
            e: React.ChangeEvent<
                HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
            >,
        ) => {
            console.log('Attribute change:', attrId, e.target.value);
            setProductAttributes((prev) => {
                const existingAttr = prev.find(
                    (attr) => attr.attribute_id === attrId,
                );

                if (existingAttr) {
                    return prev.map((attr) =>
                        attr.attribute_id === attrId
                            ? { ...attr, value_en: e.target.value }
                            : attr,
                    );
                } else {
                    return [
                        ...prev,
                        {
                            attribute_id: attrId,
                            value_fr: '',
                            value_en: e.target.value,
                        },
                    ];
                }
            });
        };

    const handleFileUpload = async (files: FileList) => {
        setLoading(true);
        try {
            const file = files[0];

            // Check file type
            if (!file.type.startsWith('image/')) {
                throw new Error('Please upload only image files');
            }

            // Check file size (e.g., 5MB limit)
            const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

            if (file.size > MAX_FILE_SIZE) {
                throw new Error('File size too large. Maximum size is 5MB');
            }

            const formData = new FormData();

            formData.append('file', file);

            const fileId = await uploadFile(formData);

            setFormData((prev) => ({
                ...prev,
                images: [...prev.images, fileId],
            }));
        } catch (error) {
            console.error('Error uploading files:', error);
            throw new Error('Failed to upload file');
        } finally {
            setLoading(false);
        }
    };

    const handleFileRemove = async (index: number, file: File) => {
        setLoading(true);
        try {
            await deleteFile(formData.images[index]);
            setFormData((prev) => ({
                ...prev,
                images: prev.images.filter((_, i) => i !== index),
            }));
        } catch (error) {
            console.error('Error removing file:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const apiData = {
                ...formData,
                promotionStartDate: formData.promotionDateRange?.start
                    ? new Date(
                          formData.promotionDateRange.start.toString(),
                      ).toISOString()
                    : null,
                promotionEndDate: formData.promotionDateRange?.end
                    ? new Date(
                          formData.promotionDateRange.end.toString(),
                      ).toISOString()
                    : null,
            };

            delete (apiData as any).promotionDateRange;

            const res = await createProduct(apiData);

            console.log('Product created:', res);
            const productId = res.$id;

            await createProductAttributes(productId, productAttributes);
            window.location.href = '/admin/products/add';
        } catch (error) {
            console.error('Error creating product:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form className="max-w-4xl mx-auto p-6" onSubmit={handleSubmit}>
            <Card>
                <CardHeader>
                    <h1 className="text-2xl font-bold">
                        {t('create_new_product')}
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
                        <Input
                            required
                            label={t('subtitle_fr')}
                            value={formData.subtitle_fr}
                            onChange={handleInputChange('subtitle_fr')}
                        />
                        <Textarea
                            required
                            label={t('description_fr')}
                            value={formData.description_fr}
                            onChange={handleInputChange('description_fr')}
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
                        <Input
                            required
                            label={t('subtitle_en')}
                            value={formData.subtitle_en}
                            onChange={handleInputChange('subtitle_en')}
                        />
                        <Textarea
                            required
                            label={t('description_en')}
                            value={formData.description_en}
                            onChange={handleInputChange('description_en')}
                        />
                    </div>

                    {/* Product Details */}
                    <div className="space-y-4">
                        <h2 className="text-xl font-semibold">
                            {t('product_details')}
                        </h2>

                        <div className="grid grid-cols-2 gap-4">
                            <Input
                                required
                                label={t('price')}
                                min={0}
                                type="number"
                                value={formData.price.toString()}
                                onChange={handleInputChange('price')}
                            />
                            <Input
                                label={t('discount_price')}
                                min={0}
                                type="number"
                                value={formData.discountPrice?.toString() || ''}
                                onChange={handleInputChange('discountPrice')}
                            />
                        </div>

                        <DateRangePicker
                            value={formData.promotionDateRange}
                            label={t('promotion_dates')}
                            // placeholder="Select promotion dates"
                            className="w-full"
                            onChange={handleDateRangeChange}
                            // dd/mm/yyyy
                            // minValue={today(getLocalTimeZone())}
                            // locale="fr"
                        />

                        <Input
                            required
                            label={t('stock')}
                            type="number"
                            value={formData.stock.toString()}
                            onChange={handleInputChange('stock')}
                        />
                        <h2 className="text-xl font-semibold">
                            {t('category')}
                        </h2>
                        <SelecteurCategories
                            categories={categories}
                            onLeafSelect={handleLeafSelect}
                        />

                        {formData.categoryId !== '' && (
                            <div className="space-y-4">
                                <h2 className="text-xl font-semibold">
                                    {t('attributes')}
                                </h2>
                                {/* with the formData.categoryId, find it inside categories then map the attributes array */}
                                {attributes.map(
                                    (attr: {
                                        $id: string;
                                        name_fr: string;
                                        name_en: string;
                                        parent_id: string;
                                    }) => (
                                        <div
                                            key={attr.$id}
                                            className="space-y-4 border-b pb-6"
                                        >
                                            <h3 className="text-lg font-semibold">
                                                {locale === 'fr'
                                                    ? attr.name_fr
                                                    : attr.name_en}
                                            </h3>
                                            <Input
                                                key={attr.$id.concat('_fr')}
                                                required
                                                label={t('value_fr')}
                                                // value={formData.attributes?.find(a => a.attribute_id === attr.id)?.value_fr || ''}
                                                onChange={handleAttributeChangeFr(
                                                    attr.$id as string,
                                                )}
                                            />
                                            <Input
                                                key={attr.$id.concat('_en')}
                                                required
                                                label={t('value_en')}
                                                // value={formData.attributes?.find(a => a.attribute_id === attr.id)?.value_en || ''}
                                                onChange={handleAttributeChangeEn(
                                                    attr.$id as string,
                                                )}
                                            />
                                        </div>
                                    ),
                                )}
                            </div>
                        )}

                        <div>
                            <label className="block text-sm font-medium mb-2">
                                {t('product_images')}
                            </label>
                            <ImageFileUploader
                                multiple
                                accept="image/*"
                                maxFiles={5}
                                maxSize={5 * 1024 * 1024}
                                onDelete={handleFileRemove}
                                onUpload={handleFileUpload}
                            />
                        </div>
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
