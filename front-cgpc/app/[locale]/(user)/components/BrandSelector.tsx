import { Select, SelectItem, Selection } from '@nextui-org/react';
import { useQueryState } from 'nuqs';

import { Marque_cg } from '../data';

// make a component BrandSelector

export default function BrandSelector({ id, name_en, name_fr, listOfSubAttributes} : {id:string, name_en: string, name_fr: string, listOfSubAttributes: string[] }) {
    const [selectedValues, setSelectedValues] = useQueryState<string[]>(
        'selected',
        {
            defaultValue: [],
            parse: (value) => value.split(',').filter(Boolean),
            serialize: (value) => value.join(','),
        },
    );
    const handleSelectionChange = (keys: Selection) => {
        const selectedArray = Array.from(keys as Set<string>);

        if (JSON.stringify(selectedArray) !== JSON.stringify(selectedValues)) {
            setSelectedValues(selectedArray);
        }
    };

    return (
        <Select
            className="max-w-xs"
            label="Marque"
            placeholder="Select a brand"
            selectedKeys={new Set(selectedValues)}
            selectionMode="multiple"
            onSelectionChange={handleSelectionChange}
        >
            {Marque_cg.map((Marque_cg) => (
                <SelectItem key={Marque_cg.key} value={Marque_cg.key}>
                    {Marque_cg.label}
                </SelectItem>
            ))}
        </Select>
    );
}
