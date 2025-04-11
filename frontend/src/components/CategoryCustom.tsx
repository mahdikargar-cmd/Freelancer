'use client';

import * as Select from '@radix-ui/react-select';
import { Check, ChevronDown } from 'lucide-react';
import { JSX } from 'react';

type Category = {
    id: number
    name: string
    parentCategory: Category | null
}

const getIndentedCategories = (
    categories: Category[],
    parentId: number | null = null,
    level = 0
): { id: number; name: string; label: string }[] => {
    return categories
        .filter(cat => (cat.parentCategory ? cat.parentCategory.id : null) === parentId)
        .flatMap(cat => {
            const indent = '—'.repeat(level);
            const icon = level === 0 ? '📁' : '🔖';
            const label = `${indent} ${icon} ${cat.name}`;
            return [
                { id: cat.id, name: cat.name, label },
                ...getIndentedCategories(categories, cat.id, level + 1)
            ];
        });
};

export function CategorySelect({
    categories,
    value,
    onChange,
}: {
    categories: Category[];
    value: number | null;
    onChange: (val: number) => void;
}) {
    const options = getIndentedCategories(categories);
    const renderCategoryOptions = (
        categories: Category[],
        parentId: number | null = null,
        level: number = 0
    ): JSX.Element[] => {
        return categories
            .filter(cat => (cat.parentCategory ? cat.parentCategory.id : null) === parentId)
            .flatMap(cat => {
                const isTopLevel = level === 0;
                const indent = '\u00A0\u00A0'.repeat(level);
                const icon = isTopLevel ? '📁' : '🔖';

                return [
                    <Select.Item
                        key={cat.id}
                        value={cat.id.toString()}
                        disabled={isTopLevel} // غیرفعال کردن دسته‌های اصلی
                        className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm ${isTopLevel
                                ? 'opacity-50 cursor-not-allowed'
                                : 'cursor-pointer hover:bg-light-color4 dark:hover:bg-color4'
                            } text-light-color3 hover:dark:text-color6 dark:text-color3 transition-all duration-200 ease-in-out`}
                    >
                        <Select.ItemText>{`${indent}${icon} ${cat.name}`}</Select.ItemText>
                        {!isTopLevel && ( // فقط برای دسته‌های غیراصلی نشانگر انتخاب نمایش داده شود
                            <Select.ItemIndicator className="ml-auto">
                                <Check className="w-4 h-4" />
                            </Select.ItemIndicator>
                        )}
                    </Select.Item>,
                    ...renderCategoryOptions(categories, cat.id, level + 1)
                ];
            });
    };
    return (
        <Select.Root value={value !== null ? value.toString() : ""}
            onValueChange={(val) => onChange(Number(val))}>
            <Select.Trigger className="inline-flex items-center justify-between w-full rounded-lg bg-light-color6 dark:bg-color6 px-4 py-3 text-light-color3 dark:text-color3 shadow-sm border border-light-color5 dark:border-color5 focus:outline-none focus:ring-2 focus:ring-light-color4 dark:focus:ring-color4 font-primaryMedium text-sm md:text-base">
                <Select.Value placeholder="-- انتخاب دسته‌بندی --" />
                <Select.Icon>
                    <ChevronDown className="w-4 h-4" />
                </Select.Icon>
            </Select.Trigger>

            <Select.Portal>
                <Select.Content
                    className="z-50 bg-white dark:bg-color6 rounded-lg shadow-lg max-h-[250px] overflow-auto border border-light-color5 dark:border-color5 scrollbar-thin scrollbar-thumb-light-color4 dark:scrollbar-thumb-color4 scrollbar-track-transparent w-[var(--radix-select-trigger-width)] font-primaryMedium"
                    dir="rtl"
                    position="popper"
                    sideOffset={5}
                >
                    <Select.Viewport className="p-1">
                        {renderCategoryOptions(categories)}
                    </Select.Viewport>
                </Select.Content>
            </Select.Portal>
        </Select.Root>
    );
}
