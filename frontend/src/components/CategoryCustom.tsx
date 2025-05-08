'use client';

import * as Select from '@radix-ui/react-select';
import { Check, ChevronDown } from 'lucide-react';
import {JSX, useMemo} from 'react';

type Category = {
    id: number;
    name: string;
    parentCategory: Category | null;
};

interface CategorySelectProps {
    categories: Category[] | null;
    value: number | null;
    onChange: (val: number | null) => void;
    isLoading?: boolean;
    error?: string | null;
}

export function CategorySelect({
                                   categories,
                                   value,
                                   onChange,
                                   isLoading = false,
                                   error = null,
                               }: CategorySelectProps) {
    // بهینه‌سازی رندر دسته‌بندی‌ها با useMemo
    const categoryOptions = useMemo(() => {
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
                            disabled={isTopLevel}
                            className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm ${
                                isTopLevel
                                    ? 'opacity-50 cursor-not-allowed'
                                    : 'cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700'
                            } text-gray-700 dark:text-gray-300 hover:dark:text-white transition-all duration-200 ease-in-out`}
                        >
                            <Select.ItemText>{`${indent}${icon} ${cat.name}`}</Select.ItemText>
                            {!isTopLevel && (
                                <Select.ItemIndicator className="ml-auto">
                                    <Check className="w-4 h-4" />
                                </Select.ItemIndicator>
                            )}
                        </Select.Item>,
                        ...renderCategoryOptions(categories, cat.id, level + 1),
                    ];
                });
        };

        return categories && categories.length > 0 ? renderCategoryOptions(categories) : [];
    }, [categories]);

    // مدیریت حالت‌های لودینگ و خطا
    if (isLoading) {
        return (
            <div className="flex items-center justify-center w-full px-4 py-3 text-sm text-gray-500 bg-gray-50 dark:bg-gray-800 rounded-lg">
                در حال بارگذاری...
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex items-center justify-center w-full px-4 py-3 text-sm text-red-600 bg-red-50 dark:bg-red-900 rounded-lg">
                خطا: {error}
            </div>
        );
    }

    return (
        <Select.Root
            value={value !== null ? value.toString() : 'none'}
            onValueChange={(val) => onChange(val === 'none' ? null : Number(val))}
        >
            <Select.Trigger
                aria-label="انتخاب دسته‌بندی"
                className="inline-flex  items-center justify-between w-full  rounded-lg bg-white dark:bg-gray-800 px-4 py-3 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 font-medium text-sm md:text-base transition-all duration-200"
            >
                <Select.Value placeholder="-- انتخاب دسته‌بندی --" />
                <Select.Icon>
                    <ChevronDown className="w-4 h-4" />
                </Select.Icon>
            </Select.Trigger>

            <Select.Portal>
                <Select.Content
                    className="z-50 bg-white dark:bg-gray-800 rounded-lg shadow-lg max-h-[250px] overflow-auto border border-gray-300 dark:border-gray-600 scrollbar-thin scrollbar-thumb-gray-400 dark:scrollbar-thumb-gray-500 scrollbar-track-transparent w-[var(--radix-select-trigger-width)] font-medium"
                    dir="rtl"
                    position="popper"
                    sideOffset={5}
                >
                    <Select.Viewport className="p-1">
                        {/* گزینه پیش‌فرض: همه دسته‌بندی‌ها */}
                        <Select.Item
                            value="none"
                            className="flex items-center gap-2 px-3 py-2 rounded-md text-sm cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 hover:dark:text-white transition-all duration-200 ease-in-out"
                        >
                            <Select.ItemText>📂 همه دسته‌بندی‌ها</Select.ItemText>
                            {value === null && (
                                <Select.ItemIndicator className="ml-auto">
                                    <Check className="w-4 h-4" />
                                </Select.ItemIndicator>
                            )}
                        </Select.Item>

                        {/* نمایش پیام در صورت خالی بودن دسته‌بندی‌ها */}
                        {categoryOptions.length === 0 && (
                            <Select.Item
                                value="empty"
                                disabled
                                className="flex items-center gap-2 px-3 py-2 rounded-md text-sm text-gray-500 dark:text-gray-400"
                            >
                                <Select.ItemText>هیچ دسته‌بندی‌ای یافت نشد</Select.ItemText>
                            </Select.Item>
                        )}

                        {categoryOptions}
                    </Select.Viewport>
                </Select.Content>
            </Select.Portal>
        </Select.Root>
    );
}