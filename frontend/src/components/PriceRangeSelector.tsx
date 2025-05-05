'use client';
import React, { useState, useEffect } from 'react';
import { FaSliders } from 'react-icons/fa6';

interface PriceRangeSelectorProps {
    onPriceRangeChange: (priceRange: string) => void;
}

const PriceRangeSelector: React.FC<PriceRangeSelectorProps> = ({ onPriceRangeChange }) => {
    const [showSlider, setShowSlider] = useState(false);
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(100000000);
    const [displayText, setDisplayText] = useState("محدوده قیمت");

    // تابع قالب‌بندی اعداد به فرمت فارسی
    const formatPrice = (price: number): string => {
        return new Intl.NumberFormat('fa-IR').format(price);
    };

    useEffect(() => {
        if (minPrice === 0 && maxPrice === 100000000) {
            onPriceRangeChange("");
            setDisplayText("محدوده قیمت");
        } else {
            onPriceRangeChange(`${minPrice}-${maxPrice}`);
            setDisplayText(`از ${formatPrice(minPrice)} تا ${formatPrice(maxPrice)}میلیون تومان`);
        }
    }, [minPrice, maxPrice, onPriceRangeChange]);

    const handleQuickOption = (min: number, max: number) => {
        setMinPrice(min);
        setMaxPrice(max);
        setShowSlider(false);
    };

    // برای بستن پاپ‌آپ هنگام کلیک خارج از آن
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as HTMLElement;
            if (showSlider && !target.closest('.price-range-container')) {
                setShowSlider(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showSlider]);

    return (
        <div className="relative w-full md:w-1/4 price-range-container">
            <button
                onClick={() => setShowSlider(!showSlider)}
                className="p-2 rounded-lg bg-light-color5 text-light-color2 font-primaryMedium w-full flex items-center justify-between dark:bg-color5 dark:text-color2"
            >
                {displayText}
                <FaSliders className="mr-2" />
            </button>

            {showSlider && (
                <div className="absolute z-10 mt-2 w-full bg-white dark:bg-color4 rounded-lg shadow-lg border border-light-color5 dark:border-color5 p-4">
                    <div className="mb-4">
                        <div className="flex justify-between mb-2">
                            <span className="font-primaryMedium text-sm">از: {formatPrice(minPrice)} میلیون تومان</span>
                            <span className="font-primaryMedium text-sm">تا: {formatPrice(maxPrice)} میلیون تومان</span>
                        </div>

                        <div className="grid grid-cols-1 gap-2">
                            <input
                                type="range"
                                min="0"
                                max="900000"
                                step="1000000"
                                value={minPrice}
                                onChange={(e) => setMinPrice(Math.min(parseInt(e.target.value), maxPrice - 1000000))}
                                className="w-full"
                            />
                            <input
                                type="range"
                                min="1000000"
                                max="100000000"
                                step="1000000"
                                value={maxPrice}
                                onChange={(e) => setMaxPrice(Math.max(parseInt(e.target.value), minPrice + 1000000))}
                                className="w-full"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                        <button
                            onClick={() => handleQuickOption(0, 10000000)}
                            className="p-1 text-sm rounded bg-light-color6 dark:bg-color6 hover:bg-light-color4 dark:hover:bg-color8"
                        >
                            همه قیمت‌ها
                        </button>
                        <button
                            onClick={() => handleQuickOption(0, 2000000)}
                            className="p-1 text-sm rounded bg-light-color6 dark:bg-color6 hover:bg-light-color4 dark:hover:bg-color8"
                        >
                            تا ۲ میلیون تومان
                        </button>
                        <button
                            onClick={() => handleQuickOption(2000000, 5000000)}
                            className="p-1 text-sm rounded bg-light-color6 dark:bg-color6 hover:bg-light-color4 dark:hover:bg-color8"
                        >
                            ۲ تا ۵ میلیون تومان
                        </button>
                        <button
                            onClick={() => handleQuickOption(5000000, 1000000000)}
                            className="p-1 text-sm rounded bg-light-color6 dark:bg-color6 hover:bg-light-color4 dark:hover:bg-color8"
                        >
                            بیش از ۵ میلیون تومان
                        </button>
                    </div>

                    <div className="mt-3 flex justify-end">
                        <button
                            onClick={() => setShowSlider(false)}
                            className="px-3 py-1 bg-light-color4 dark:bg-color4 text-light-color5 dark:text-color5 rounded hover:bg-light-color8 dark:hover:bg-color8"
                        >
                            تایید
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PriceRangeSelector;