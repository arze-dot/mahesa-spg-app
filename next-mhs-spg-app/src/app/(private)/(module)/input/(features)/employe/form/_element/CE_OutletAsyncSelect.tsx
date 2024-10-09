'use client';

import React, { useCallback, useState } from 'react';
import { debounce } from '@/lib/utils/debouncer';

import AsyncSelect from 'react-select/async';
import {
    components,
    CSSObjectWithLabel,
} from 'react-select';
import { ACT_GetOutletList } from '../../../outlet/_action/action.get.outlet.list';
import { useFieldArray } from 'react-hook-form';


interface SelectOption {
    id?: string | number;
    name?: string | number;
    value: string | number;
    label: string;
    description?: string;
}

const { Menu } = components;
const CustomMenu = (props: any) => {
    return (
        <Menu {...props}>
            <div className="z-50">{props?.children}</div>
        </Menu>
    );
};

export interface ColourOption {
    readonly value: string;
    readonly label: string;
    readonly color: string;
    readonly isFixed?: boolean;
    readonly isDisabled?: boolean;
}

export const colourOptions: readonly ColourOption[] = [
    { value: 'ocean', label: 'Ocean', color: '#00B8D9', isFixed: true },
    { value: 'blue', label: 'Blue', color: '#0052CC', isDisabled: true },
    { value: 'purple', label: 'Purple', color: '#5243AA' },
    { value: 'red', label: 'Red', color: '#FF5630', isFixed: true },
    { value: 'orange', label: 'Orange', color: '#FF8B00' },
    { value: 'yellow', label: 'Yellow', color: '#FFC400' },
    { value: 'green', label: 'Green', color: '#36B37E' },
    { value: 'forest', label: 'Forest', color: '#00875A' },
    { value: 'slate', label: 'Slate', color: '#253858' },
    { value: 'silver', label: 'Silver', color: '#666666' },
];

const CE_OutletAsyncSelect = ({ register, setValue, indexId }: { register: any, setValue: any, indexId: string }) => {
    const [selectedData, setSelectedData] = useState<{
        label: string;
        value: string;
    } | null>(null);

    const asyncOptions = useCallback(
        async (inputValue: string, callback: (options: SelectOption[]) => void) => {
            const data = await ACT_GetOutletList()
            if (!data?.length) return

            if (!inputValue) {
                const dataMapped = data?.map((i: any) => {
                    return {
                        value: i?.outlet?.name, label: i?.outlet?.name
                    }
                });
                callback(dataMapped);
            }

            const dataFiltered = data?.filter((i: any) =>
                i?.outlet.name.toLowerCase().includes(inputValue?.toLowerCase())
            );
            const dataMapped = dataFiltered.map((i: any) => {
                return {
                    value: i?.outlet?.name, label: i?.outlet?.name, raw: i
                }
            });
            callback(dataMapped);
        },
        []
    );
    const loadOptions = debounce(asyncOptions, 1000);

    return (
        <AsyncSelect
            value={selectedData}
            styles={{
                control: (base: CSSObjectWithLabel) => ({
                    ...base,
                    width: '100',
                    minHeight: 45,
                    backgroundColor: '#FFFFFF',
                    border: '1px solid #E2E8F0',
                    borderRadius: '5px',
                }),
            }}
            components={{
                Menu: CustomMenu,
            }}
            onChange={(selectedOption: any) => {
                setValue(indexId, selectedOption?.raw?.outlet)
                setSelectedData(selectedOption);
            }}
            placeholder="Ketikan Nama Toko"
            loadOptions={loadOptions}
            defaultOptions
            menuPosition="fixed"
            isClearable
        />
    );
};

export default CE_OutletAsyncSelect;
