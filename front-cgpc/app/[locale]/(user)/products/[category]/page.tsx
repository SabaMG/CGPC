'use client';
import { useLocale } from 'next-intl';
import { Models, Client, Databases, Query } from 'appwrite';
import { useEffect, useState } from 'react';
import { redirect } from 'next/navigation';

import Categories from './Categories';
import Products from './Products';

export default function Product({ params }: { params: { category: string } }) {
    const { category } = params;
    const locale = useLocale();
    const [products, setProducts] = useState<Models.Document[]>();
    const [categories, setCategories] = useState<Models.Document[]>();
    const [displayType, setDisplayType] = useState<
        'products' | 'categories' | 'redirect'
    >('categories');
    const [redirectUrl, setRedirectUrl] = useState<string>('');

    useEffect(() => {
        const client = new Client()
            .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT as string)
            .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT as string);
        const database = new Databases(client);
        const fetchProducts = async () => {
            const response = await database.listDocuments(
                process.env.NEXT_PUBLIC_APPWRITE_DATABASE_SHOP as string,
                process.env.NEXT_PUBLIC_APPWRITE_PRODUCTS_COLLECTION as string,
                // relations are not queriable yet !!!
                [Query.equal('category', category)],
            );

            setProducts(response.documents);
        };
        const fetchCategories = async () => {
            const response = await database.listDocuments(
                process.env.NEXT_PUBLIC_APPWRITE_DATABASE_SHOP as string,
                process.env
                    .NEXT_PUBLIC_APPWRITE_CATEGORIES_COLLECTION as string,
                [Query.equal('parent_id', category)],
            );

            // console.log(response.documents);
            setCategories(response.documents);
            if (!response.documents || response.documents.length === 0) {
                // console.log("HELLO1")
                // display the products of the category
                setDisplayType('products');
                fetchProducts();
            } else if (response.documents?.length === 1) {
                // console.log("HELLO2")
                //then redirect to the category page
                setDisplayType('redirect');
                setRedirectUrl(
                    `/${locale}/products/${response.documents[0].$id}`,
                );
            } else {
                // console.log("HELLO3")
                setDisplayType('categories');
                // choose between the categories
                // display the categories
            }
        };

        fetchCategories();
        // make the 2 components for displaying the categories and the products
        // fetchProducts();
    }, []);
    if (displayType === 'redirect') {
        redirect(redirectUrl);
    }

    return (
        <div>
            {/* Afficher les catégories si elles sont présentes */}
            {categories && categories.length > 0 && (
                <Categories categories={categories} />
            )}

            {/* Afficher les produits si aucune catégorie n'est présente ou si des produits sont spécifiquement chargés */}
            {products && products.length > 0 && (
                <Products params={{ category }} products={products} />
            )}
        </div>
    );
}
