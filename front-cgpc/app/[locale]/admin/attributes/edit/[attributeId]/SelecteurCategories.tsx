import React, { useState, useEffect } from 'react';
import { Select, SelectItem } from '@nextui-org/react';
import { Models } from 'appwrite';
import { useLocale, useTranslations } from 'next-intl';

interface Category {
    $id: string;
    name_fr: string;
    name_en: string;
    parent_id: string | null;
    children: Category[];
}

interface SelecteurCategoriesProps {
    categories: Models.Document[];
    currentCategoryId?: string; // ID de la catégorie pré-sélectionnée
    onLeafSelect: (leafId: string) => void;
}

// Fonction utilitaire pour convertir Document[] en Category[]
function transformDocumentsToCategories(
    documents: Models.Document[],
): Category[] {
    return documents.map((doc) => ({
        $id: doc.$id,
        name_fr: doc.name_fr,
        name_en: doc.name_en,
        parent_id: doc.parent_id,
        children: [],
    }));
}

// Fonction utilitaire pour structurer les catégories en arbre
function buildCategoryTree(categories: Category[]): Category[] {
    const idMap = new Map<string, Category>();

    // Créer une map de toutes les catégories pour un accès rapide
    categories.forEach((category) => {
        idMap.set(category.$id, category);
    });

    const roots: Category[] = [];

    // Parcourir les catégories pour établir les relations parent-enfant
    categories.forEach((category) => {
        if (category.parent_id === null) {
            roots.push(category); // Ajouter les catégories racines
        } else {
            const parentCategory = idMap.get(category.parent_id);
            if (parentCategory) {
                parentCategory.children.push(category);
            }
        }
    });

    return roots;
}

// Fonction pour trouver le chemin des catégories (parents) jusqu'à une feuille
function findCategoryPath(
    categoryId: string,
    tree: Category[],
    path: Category[] = [],
): Category[] | null {
    for (const category of tree) {
        const currentPath = [...path, category];

        if (category.$id === categoryId) {
            return currentPath;
        }

        const childPath = findCategoryPath(categoryId, category.children, currentPath);
        if (childPath) {
            return childPath;
        }
    }
    return null;
}

// Composant principal
const SelecteurCategories: React.FC<SelecteurCategoriesProps> = ({
    categories,
    currentCategoryId,
    onLeafSelect,
}) => {
    const locale = useLocale();
    const t = useTranslations('Admin');
    const [categoryTree, setCategoryTree] = useState<Category[] | null>(null);
    const [currentCategories, setCurrentCategories] = useState<Category[][]>([]);
    const [selection, setSelection] = useState<string[]>([]);

    useEffect(() => {
        if (categories.length > 0) {
            const categoryList = transformDocumentsToCategories(categories);
            const tree = buildCategoryTree(categoryList);

            setCategoryTree(tree);
            setCurrentCategories([tree]); // Initialise les catégories racines

            // Précharger les sélections si currentCategoryId est défini
            if (currentCategoryId) {
                const path = findCategoryPath(currentCategoryId, tree);
                if (path) {
                    const selectedIds = path.map((cat) => cat.$id);
                    setSelection(selectedIds);

                    const updatedCategories: Category[][] = [];
                    for (let i = 0; i < path.length; i++) {
                        updatedCategories[i] = i === 0 ? tree : path[i - 1].children;
                    }

                    setCurrentCategories(updatedCategories);
                }
            }
        }
    }, [categories, currentCategoryId]);

    const handleSelection = (level: number, categoryId: string) => {
        const newSelection = [...selection];
        newSelection[level] = categoryId;
        newSelection.length = level + 1;
        setSelection(newSelection);

        const selectedCategory = currentCategories[level].find(
            (cat) => cat.$id === categoryId,
        );
        const nextCategories = selectedCategory ? selectedCategory.children : [];
        const updatedCategories = [...currentCategories];

        if (nextCategories.length > 0) {
            updatedCategories[level + 1] = nextCategories;
            updatedCategories.length = level + 2;
        } else {
            updatedCategories.length = level + 1;
            onLeafSelect(categoryId); // Informe le parent que l'utilisateur a sélectionné une feuille
        }

        setCurrentCategories(updatedCategories);
    };

    if (!categoryTree) {
        return <div>{t('loading_categories')}</div>; // Message de chargement
    }

    return (
        <div>
            {currentCategories.map((categories, level) => (
                <Select
                    key={level}
                    placeholder={`${t('select_cat')} ${level + 1}`}
                    value={selection[level] || ''}
                    onChange={(e) => handleSelection(level, e.target.value)}
                >
                    {categories.map((category) => (
                        <SelectItem key={category.$id} value={category.$id}>
                            {locale === 'fr'
                                ? category.name_fr
                                : category.name_en}
                        </SelectItem>
                    ))}
                </Select>
            ))}
        </div>
    );
};

export default SelecteurCategories;
