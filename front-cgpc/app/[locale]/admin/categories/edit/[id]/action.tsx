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

export async function fetchAttributes() {
    try {
        const response = await databases.listDocuments(
            process.env.NEXT_PUBLIC_APPWRITE_DATABASE_SHOP!,
            process.env.NEXT_PUBLIC_APPWRITE_ATTRIBUTES_COLLECTION!,
            [Query.limit(1000)],
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

export async function editProductAttributes(
    categoryId: string,
    attributes: {
        attribute_id: string;
        value_fr: string;
        value_en: string;
    }[],
) {
    try {
        // Suppression des anciens attributs liés à la catégorie
        const existingAttributes = await databases.listDocuments(
            process.env.NEXT_PUBLIC_APPWRITE_DATABASE_SHOP!,
            process.env.NEXT_PUBLIC_APPWRITE_PRODUCT_ATTRIBUTES_COLLECTION!,
            [Query.equal('category', categoryId)]
        );

        for (const attribute of existingAttributes.documents) {
            await databases.deleteDocument(
                process.env.NEXT_PUBLIC_APPWRITE_DATABASE_SHOP!,
                process.env.NEXT_PUBLIC_APPWRITE_PRODUCT_ATTRIBUTES_COLLECTION!,
                attribute.$id,
            );
        }

        // Ajout des nouveaux attributs
        for (const newAttribute of attributes) {
            await databases.createDocument(
                process.env.NEXT_PUBLIC_APPWRITE_DATABASE_SHOP!,
                process.env.NEXT_PUBLIC_APPWRITE_PRODUCT_ATTRIBUTES_COLLECTION!,
                ID.unique(),
                {
                    category: categoryId,
                    attribute_id: newAttribute.attribute_id,
                    value_fr: newAttribute.value_fr,
                    value_en: newAttribute.value_en,
                },
            );
        }

        return true;
    } catch (error) {
        console.error('Error editing product attributes:', error);
        throw new Error('Failed to edit product attributes');
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

export async function editCategory(
    attributeId: string,
    formData: {
        name_fr: string;
        name_en: string;
        parent_id: string | null;
        image_id: string;
        attributes: string[];
    },
) {
    try {
        const result = await databases.updateDocument(
            process.env.NEXT_PUBLIC_APPWRITE_DATABASE_SHOP!,
            process.env.NEXT_PUBLIC_APPWRITE_CATEGORIES_COLLECTION!,
            attributeId,
            formData,
        );

        return result;
    } catch (error) {
        // console.error('Error creating product:', error);
        throw new Error('Failed to edit product');
    }
}
