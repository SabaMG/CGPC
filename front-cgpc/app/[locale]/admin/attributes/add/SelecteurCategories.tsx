import React, { useState, useEffect } from 'react';
import { Select, SelectItem } from '@nextui-org/react';
import { Models } from 'appwrite';
import { useLocale, useTranslations } from 'next-intl';

// Interface Category avec children comme tableau vide pour chaque catégorie
interface Category {
    $id: string;
    name_fr: string;
    name_en: string;
    parent_id: string | null;
    children: Category[];
}

interface SelecteurCategoriesProps {
    categories: Models.Document[];
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
            // Ajouter les catégories racines à la liste des roots
            roots.push(category);
        } else {
            // Ajouter la catégorie comme enfant de son parent
            const parentCategory = idMap.get(category.parent_id);

            if (parentCategory) {
                parentCategory.children.push(category);
            }
        }
    });

    return roots;
}

// Composant principal de sélection dynamique
const SelecteurCategories: React.FC<SelecteurCategoriesProps> = ({
    categories,
    onLeafSelect,
}) => {
    const locale = useLocale();
    const t = useTranslations('Admin');
    const [categoryTree, setCategoryTree] = useState<Category[] | null>(null);
    const [currentCategories, setCurrentCategories] = useState<Category[][]>(
        [],
    );
    const [selection, setSelection] = useState<string[]>([]);

    useEffect(() => {
        // Vérifie si les catégories sont disponibles
        if (categories.length > 0) {
            const categoryList = transformDocumentsToCategories(categories);
            const tree = buildCategoryTree(categoryList);

            setCategoryTree(tree);
            setCurrentCategories([tree]); // Initialise currentCategories avec les racines
        }
    }, [categories]);

    const handleSelection = (level: number, categoryId: string) => {
        const newSelection = [...selection];

        newSelection[level] = categoryId;
        newSelection.length = level + 1;
        setSelection(newSelection);

        // Trouver la catégorie sélectionnée pour charger ses enfants
        const selectedCategory = currentCategories[level].find(
            (cat) => cat.$id === categoryId,
        );
        const nextCategories = selectedCategory
            ? selectedCategory.children
            : [];
        const updatedCategories = [...currentCategories];

        if (nextCategories.length > 0) {
            updatedCategories[level + 1] = nextCategories;
            updatedCategories.length = level + 2;
        } else {
            updatedCategories.length = level + 1;
            onLeafSelect(categoryId);
        }

        setCurrentCategories(updatedCategories);
    };

    if (!categoryTree) {
        return <div>Chargement des catégories...</div>; // Affiche un message de chargement
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
