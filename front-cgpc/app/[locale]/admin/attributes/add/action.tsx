'use server';

import { Client, Databases, ID } from 'node-appwrite';

const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT!)
    .setKey(process.env.NEXT_APPWRITE_KEY!);

const databases = new Databases(client);

export async function createAttribute(formData: {
    name_fr: string;
    name_en: string;
    type: string;
}) {
    try {
        const result = await databases.createDocument(
            process.env.NEXT_PUBLIC_APPWRITE_DATABASE_SHOP!,
            process.env.NEXT_PUBLIC_APPWRITE_ATTRIBUTES_COLLECTION!,
            ID.unique(),
            formData,
        );

        return result;
    } catch (error) {
        // console.error('Error creating product:', error);
        throw new Error('Failed to create product');
    }
}
