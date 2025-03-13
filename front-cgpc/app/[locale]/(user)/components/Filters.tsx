import { Input, Accordion, AccordionItem } from '@nextui-org/react';
import { parseAsString, useQueryState } from 'nuqs';
import { Models, Client, Databases, Query } from 'appwrite';


import { SearchIcon } from './searchicon';
import RangeSelector from './RangeSelector';
import BrandSelector from './BrandSelector';
import { use, useEffect, useState } from 'react';

export default function Filters({ category }: { category: string }) {
    const [searchValue, setSearchValue] = useQueryState(
        'search',
        parseAsString.withDefault(''),
    );

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(event.target.value);
    };
    const [attributesIds, setAttributesIds] = useState<string[]>();
    const [attributes, setAttributes] = useState<Models.Document[]>();

    useEffect(() => {
        const client = new Client()
            .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT as string)
            .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT as string);
        const database = new Databases(client);
        const fetchCategoryAttributes = async () => {
            const response = await database.listDocuments(
                process.env.NEXT_PUBLIC_APPWRITE_DATABASE_SHOP as string,
                process.env.NEXT_PUBLIC_APPWRITE_CATEGORIES_COLLECTION as string,
                [Query.equal('$id', category)],
            );
            setAttributesIds(response.documents[0].attributes);
            console.log(response.documents[0].attributes);
        }
        fetchCategoryAttributes();
    }
    , [category]);

    useEffect(() => {
        const client = new Client()
            .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT as string)
            .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT as string);
        const database = new Databases(client);
        const fetchAttributes = async () => {
            const response = await database.listDocuments(
                process.env.NEXT_PUBLIC_APPWRITE_DATABASE_SHOP as string,
                process.env.NEXT_PUBLIC_APPWRITE_ATTRIBUTES_COLLECTION as string,
                [Query.contains('$id', attributesIds as string[])],
            );
            setAttributes(response.documents);
            console.log(response.documents);
            console.log(response.documents[0].type);
        }
        if (attributesIds) {
            fetchAttributes();
        }
    }, [attributesIds]);

    return (
        <div className="flex flex-col gap-4">
            <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
                <Accordion variant="splitted">
                    <AccordionItem key="1" aria-label="Filtres" title="Filtres">
                        <Input
                            label="Search"
                            labelPlacement="outside"
                            placeholder="One Peace"
                            startContent={
                                <SearchIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                            }
                            type="search"
                            value={searchValue}
                            onChange={handleInputChange}
                        />
                        {/* foreach attribute, if its type is boolean : slider, select : brandselector or range : pricerangeselector  */}
                        {attributes?.map((attribute) => (
                            <div key={attribute.$id}>
                                {attribute.type === 'boolean' ? (
                                    <div>Slider</div>
                                ) : attribute.type === 'select' ? (
                                    <BrandSelector id={attribute.$id} name_en={attribute.name_en} name_fr={attribute.name_fr} listOfSubAttributes={[]} />
                                ) : (
                                    <RangeSelector id={attribute.$id} name_fr={attribute.name_fr} name_en={attribute.name_en} />
                                )}
                            </div>
                        ))}
                    </AccordionItem>
                </Accordion>
            </div>
        </div>
    );
}
