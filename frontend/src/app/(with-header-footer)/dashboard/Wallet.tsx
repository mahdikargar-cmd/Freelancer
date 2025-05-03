'use client';
import { useState, useEffect } from 'react';
import { CreditCard, ArrowDown, ArrowUp, Plus, BarChart3 } from 'lucide-react';

type Transaction = {
    id: number;
    type: 'deposit' | 'withdrawal';
    amount: number;
    date: string;
    status: 'completed' | 'pending' | 'failed';
    description: string;
};

const Wallet = () => {
    const [balance, setBalance] = useState(0);
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchWalletData = setTimeout(() => {
            setBalance(2580.75);
            setTransactions([
                {
                    id: 1,
                    type: 'deposit',
                    amount: 500.00,
                    date: '2025-04-25',
                    status: 'completed',
                    description: 'Deposit from Bank'
                },
                // ... بقیه تراکنش‌ها
            ]);
            setLoading(false);
        }, 1000);

        return () => clearTimeout(fetchWalletData);
    }, []);

    const formatCurrency = (amount: number): string => {
        return new Intl.NumberFormat('fa-IR', {
            style: 'currency',
            currency: 'IRR',
            maximumFractionDigits: 0
        }).format(amount * 50000);
    };

    return (
        <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8 bg-light-color5 dark:bg-color1 rounded-xl min-h-screen">
            <h2 className="text-xl sm:text-2xl font-primaryDemibold mb-6 text-light-color2 dark:text-color2">کیف پول دیجیتال</h2>

            {loading ? (
                <div className="flex justify-center py-10">
                    <div className="animate-pulse w-full space-y-6">
                        <div className="h-32 bg-light-color6 dark:bg-color5 rounded-lg"></div>
                        <div className="h-12 bg-light-color6 dark:bg-color5 rounded-lg"></div>
                        <div className="h-12 bg-light-color6 dark:bg-color5 rounded-lg"></div>
                    </div>
                </div>
            ) : (
                <>
                    {/* Balance Card */}
                    <div className="bg-light-color1 dark:bg-color5 rounded-xl p-4 sm:p-6 mb-6 shadow-md">
                        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                            <div>
                                <p className="text-light-color7 dark:text-color7 text-sm">موجودی کل</p>
                                <h3 className="text-2xl sm:text-3xl font-primaryBold mt-2 text-light-color2 dark:text-color2">{formatCurrency(balance)}</h3>
                            </div>
                            <div className="bg-light-color4 dark:bg-color4 p-4 rounded-full">
                                <CreditCard className="w-6 h-6 text-light-color1 dark:text-color1" />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                            <button className="flex items-center justify-center gap-2 bg-light-color5 dark:bg-color6 hover:bg-light-color6 dark:hover:bg-color5 transition-colors py-3 px-6 rounded-lg w-full">
                                <ArrowDown className="w-5 h-5 text-light-color4 dark:text-color4" />
                                <span className="font-primaryMedium">برداشت</span>
                            </button>
                            <button className="flex items-center justify-center gap-2 bg-light-color4 dark:bg-color4 hover:bg-light-color8 dark:hover:bg-color8 transition-colors py-3 px-6 rounded-lg w-full">
                                <ArrowUp className="w-5 h-5 text-light-color1 dark:text-color1" />
                                <span className="font-primaryMedium text-light-color1 dark:text-color1">واریز</span>
                            </button>
                        </div>
                    </div>

                    {/* Analytics Overview */}
                    <div className="bg-light-color1 dark:bg-color5 rounded-xl p-4 sm:p-6 mb-6 shadow-md">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg sm:text-xl font-primaryDemibold">آمار مالی</h3>
                            <BarChart3 className="w-5 h-5 text-light-color7 dark:text-color7" />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-center">
                            <div className="p-4 rounded-lg bg-light-color5 dark:bg-color6">
                                <p className="text-light-color7 dark:text-color7 text-sm mb-1">واریزها</p>
                                <p className="text-base sm:text-lg font-primaryBold text-light-color8 dark:text-color8">{formatCurrency(1500)}</p>
                            </div>
                            <div className="p-4 rounded-lg bg-light-color5 dark:bg-color6">
                                <p className="text-light-color7 dark:text-color7 text-sm mb-1">برداشت‌ها</p>
                                <p className="text-base sm:text-lg font-primaryBold text-light-color3 dark:text-color7">{formatCurrency(205.75)}</p>
                            </div>
                        </div>
                    </div>

                    {/* Transactions */}
                    <div className="bg-light-color1 dark:bg-color5 rounded-xl p-4 sm:p-6 shadow-md">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg sm:text-xl font-primaryDemibold">تراکنش‌های اخیر</h3>
                            <button
                                className="bg-light-color5 dark:bg-color6 p-2 rounded-full hover:bg-light-color6 dark:hover:bg-color1 transition-colors"
                                aria-label="اضافه کردن تراکنش جدید"
                            >
                                <Plus className="w-4 h-4" />
                            </button>
                        </div>

                        <div className="space-y-4">
                            {transactions.map((transaction) => (
                                <div
                                    key={transaction.id}
                                    className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 bg-light-color5 dark:bg-color6 rounded-lg gap-4"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className={`p-2 rounded-full ${
                                            transaction.type === 'deposit'
                                                ? 'bg-light-color8/20 dark:bg-color8/20'
                                                : 'bg-light-color7/20 dark:bg-color7/20'
                                        }`}>
                                            {transaction.type === 'deposit' ? (
                                                <ArrowDown className="w-4 h-4 text-light-color8 dark:text-color8" />
                                            ) : (
                                                <ArrowUp className="w-4 h-4 text-light-color7 dark:text-color7" />
                                            )}
                                        </div>
                                        <div>
                                            <p className="font-primaryMedium text-sm">{transaction.description}</p>
                                            <p className="text-xs text-light-color7 dark:text-color7">{transaction.date}</p>
                                        </div>
                                    </div>
                                    <div className="text-right w-full sm:w-auto">
                                        <p className={`font-primaryDemibold text-sm sm:text-base ${
                                            transaction.type === 'deposit'
                                                ? 'text-light-color8 dark:text-color8'
                                                : 'text-light-color3 dark:text-color7'
                                        }`}>
                                            {transaction.type === 'deposit' ? '+' : '-'}{formatCurrency(transaction.amount)}
                                        </p>
                                        <p className={`text-xs ${
                                            transaction.status === 'completed'
                                                ? 'text-light-color8 dark:text-color8'
                                                : transaction.status === 'pending'
                                                    ? 'text-yellow-500'
                                                    : 'text-red-500'
                                        }`}>
                                            {transaction.status === 'completed' ? 'تکمیل شده' : transaction.status === 'pending' ? 'در انتظار' : 'ناموفق'}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <button className="w-full mt-4 py-3 text-center bg-light-color5 dark:bg-color6 hover:bg-light-color6 dark:hover:bg-color1 transition-colors rounded-lg font-primaryMedium">
                            مشاهده همه تراکنش‌ها
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};

export default Wallet;