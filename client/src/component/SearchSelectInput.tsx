import React, { useState, useEffect, ChangeEvent } from 'react';
import { Icon } from '@iconify/react';

interface Option {
    label: string;
    value: string | number;
}

interface SearchSelectInputProps {
    placeholder?: string;
    options: Option[];
    onChange: (selectedOption: Option) => void;
}

const SearchSelectInput: React.FC<SearchSelectInputProps> = ({ placeholder = 'Search...', options, onChange }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredOptions, setFilteredOptions] = useState<Option[]>([]);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [, setSelectedOption] = useState<Option | null>(null);

    useEffect(() => {
        setFilteredOptions(
            options.filter(option =>
                option.label.toLowerCase().includes(searchTerm.toLowerCase())
            )
        );
    }, [searchTerm, options]);

    const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    const handleOptionSelect = (option: Option) => {
        setSelectedOption(option);
        onChange(option);
        setSearchTerm(option.label);
        setIsDropdownOpen(false);
    };

    const handleDropdownToggle = () => {
        setIsDropdownOpen(prev => !prev);
    };

    const handleClickOutside = (e: MouseEvent) => {
        if (!(e.target as HTMLElement).closest('.search-select-input')) {
            setIsDropdownOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    return (
        <div className="relative search-select-input">
            <input
                type="text"
                placeholder={placeholder}
                value={searchTerm}
                onChange={handleSearchChange}
                onFocus={handleDropdownToggle}
                className="w-full p-2 border border-gray-400 rounded-md"
            />
            {isDropdownOpen && (
                <div className="absolute w-full mt-1 border border-gray-400 rounded-md bg-white shadow-lg z-10">
                    {filteredOptions.length > 0 ? (
                        filteredOptions.map(option => (
                            <div
                                key={option.value}
                                onClick={() => handleOptionSelect(option)}
                                className="p-2 hover:bg-gray-200 cursor-pointer"
                            >
                                {option.label}
                            </div>
                        ))
                    ) : (
                        <div className="p-2 text-gray-500">No options found</div>
                    )}
                </div>
            )}
            <button
                type="button"
                onClick={handleDropdownToggle}
                className="absolute right-2 top-2 text-gray-500"
            >
                <Icon icon="material-symbols:search" />
            </button>
        </div>
    );
};

export default SearchSelectInput;
