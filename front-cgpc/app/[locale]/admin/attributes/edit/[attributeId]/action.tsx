'use server';

import { Client, Databases, ID } from 'node-appwrite';

const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT!)
    .setKey(process.env.NEXT_APPWRITE_KEY!);

const databases = new Databases(client);

// Récupérer tous les attributs
export async function fetchAttributes() {
    try {
        const response = await databases.listDocuments(
            process.env.NEXT_PUBLIC_APPWRITE_DATABASE_SHOP!,
            process.env.NEXT_PUBLIC_APPWRITE_ATTRIBUTES_COLLECTION!,
        );

        return response.documents;
    } catch (error) {
        console.error('Error fetching attributes:', error);
        throw new Error('Failed to fetch attributes');
    }
}

// Récupérer un attribut par ID
export async function fetchAttributeById(attributeId: string) {
    try {
        const response = await databases.getDocument(
            process.env.NEXT_PUBLIC_APPWRITE_DATABASE_SHOP!,
            process.env.NEXT_PUBLIC_APPWRITE_ATTRIBUTES_COLLECTION!,
            attributeId,
        );

        return response;
    } catch (error) {
        console.error('Error fetching attribute by ID:', error);
        throw new Error('Failed to fetch attribute');
    }
}

// Mettre à jour un attribut
export async function editAttribute(
    attributeId: string,
    formData: {
        name_fr: string;
        name_en: string;
        type: string;
    },
) {
    try {
        console.log('attributeId:', attributeId);
        const result = await databases.updateDocument(
            process.env.NEXT_PUBLIC_APPWRITE_DATABASE_SHOP!,
            process.env.NEXT_PUBLIC_APPWRITE_ATTRIBUTES_COLLECTION!,
            attributeId,
            formData,
        );

        return result;
    } catch (error) {
        console.error('Error editing attribute:', error);
        throw new Error('Failed to edit attribute');
    }
    
}
