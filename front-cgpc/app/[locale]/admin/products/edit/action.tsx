'use server';

import { Client, Databases, Storage, ID, Query } from 'node-appwrite';

const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT!)
    .setKey(process.env.NEXT_APPWRITE_KEY!);

const databases = new Databases(client);
const storage = new Storage(client);

// Fonction pour éditer un produit existant
export async function editProduct(productId: string, formData: {
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
        const result = await databases.updateDocument(
            process.env.NEXT_PUBLIC_APPWRITE_DATABASE_SHOP!,
            process.env.NEXT_PUBLIC_APPWRITE_PRODUCTS_COLLECTION!,
            productId,
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
        throw new Error('Failed to edit product');
    }
}

// Fonction pour éditer les attributs d'un produit
export async function editProductAttributes(
    productId: string,
    productAttributes: {
        attribute_id: string;
        value_fr: string;
        value_en: string;
    }[],
) {
    try {
        // Suppression des anciens attributs du produit
        const existingAttributes = await databases.listDocuments(
            process.env.NEXT_PUBLIC_APPWRITE_DATABASE_SHOP!,
            process.env.NEXT_PUBLIC_APPWRITE_PRODUCT_ATTRIBUTES_COLLECTION!,
            [Query.equal('product', productId)]
        );

        for (const attribute of existingAttributes.documents) {
            await databases.deleteDocument(
                process.env.NEXT_PUBLIC_APPWRITE_DATABASE_SHOP!,
                process.env.NEXT_PUBLIC_APPWRITE_PRODUCT_ATTRIBUTES_COLLECTION!,
                attribute.$id,
            );
        }

        // Ajout des nouveaux attributs
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
        throw new Error('Failed to edit product attributes');
    }
}
