'use server';

import { Client, Databases, Storage, ID, Query } from 'node-appwrite';

const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT!)
    .setKey(process.env.NEXT_APPWRITE_KEY!);

const databases = new Databases(client);
const storage = new Storage(client);

export async function fetchCategories() {
    try {
        const response = await databases.listDocuments(
            process.env.NEXT_PUBLIC_APPWRITE_DATABASE_SHOP!,
            process.env.NEXT_PUBLIC_APPWRITE_CATEGORIES_COLLECTION!,
            [Query.limit(1000)],
        );

        return response.documents;
    } catch (error) {
        // console.error('Error fetching categories:', error);
        throw new Error('Failed to fetch categories');
    }
}

export async function fetchAttributes(ids = []) {
    try {
        const response = await databases.listDocuments(
            process.env.NEXT_PUBLIC_APPWRITE_DATABASE_SHOP!,
            process.env.NEXT_PUBLIC_APPWRITE_ATTRIBUTES_COLLECTION!,
            [Query.equal('$id', ids)],
        );

        return response.documents;
    } catch (error) {
        // console.error('Error fetching attributes:', error);
        throw new Error('Failed to fetch attributes');
    }
}

export async function uploadFile(formData: FormData) {
    try {
        const file = formData.get('file') as File;

        if (!file) {
            throw new Error('No file provided');
        }

        const result = await storage.createFile(
            process.env.NEXT_PUBLIC_APPWRITE_PRODUCTS_BUCKET!,
            ID.unique(),
            file,
        );

        return result.$id;
    } catch (error) {
        // console.error('Error uploading file:', error);
        throw new Error('Failed to upload file');
    }
}

export async function deleteFile(fileId: string) {
    try {
        const result = await storage.deleteFile(
            process.env.NEXT_PUBLIC_APPWRITE_PRODUCTS_BUCKET!,
            fileId,
        );

        return result;
    } catch (error) {
        // console.error('Error deleting file:', error);
        throw new Error('Failed to delete file');
    }
}

export async function createProduct(formData: {
    name_fr: string;
    name_en: string;
    description_fr: string;
    description_en: string;
    subtitle_fr: string;
    subtitle_en: string;
    price: number;
    discountPrice: number | null;
    promotionStartDate: string | null;
    promotionEndDate: string | null;
    stock: number;
    categoryId: string;
    images: string[];
}) {
    try {
        const result = await databases.createDocument(
            process.env.NEXT_PUBLIC_APPWRITE_DATABASE_SHOP!,
            process.env.NEXT_PUBLIC_APPWRITE_PRODUCTS_COLLECTION!,
            ID.unique(),
            {
                name_fr: formData.name_fr,
                name_en: formData.name_en,
                description_fr: formData.description_fr,
                description_en: formData.description_en,
                subtitle_fr: formData.subtitle_fr,
                subtitle_en: formData.subtitle_en,
                price: parseFloat(formData.price.toString()),
                discount_price: formData.discountPrice,
                promotion_start_date: formData.promotionStartDate,
                promotion_end_date: formData.promotionEndDate,
                stock: parseInt(formData.stock.toString(), 10),
                category: formData.categoryId,
                images: formData.images,
            },
        );

        return result;
    } catch (error) {
        // console.error('Error creating product:', error);
        throw new Error('Failed to create product');
    }
}
export async function createProductAttributes(
    productId: string,
    productAttributes: {
        attribute_id: string;
        value_fr: string;
        value_en: string;
    }[],
) {
    try {
        for (const productAttribute of productAttributes) {
            await databases.createDocument(
                process.env.NEXT_PUBLIC_APPWRITE_DATABASE_SHOP!,
                process.env.NEXT_PUBLIC_APPWRITE_PRODUCT_ATTRIBUTES_COLLECTION!,
                ID.unique(),
                {
                    product: productId,
                    spec: productAttribute.attribute_id,
                    value_fr: productAttribute.value_fr,
                    value_en: productAttribute.value_en,
                },
            );
        }

        return true;
    } catch (error) {
        // console.error('Error creating product attributes:', error);
        throw new Error('Failed to create product attributes');
    }
}
