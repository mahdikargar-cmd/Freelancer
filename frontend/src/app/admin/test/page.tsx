'use client';
import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';

interface Category {
    id: number;
    name: string;
    parentCategory: Category | null;
    children?: Category[];
}

const CreateCategoryForm: React.FC = () => {
    const [name, setName] = useState('');
    const [parentId, setParentId] = useState<number | null>(null);
    const [categories, setCategories] = useState<Category[]>([]);
    const [tree, setTree] = useState<Category[]>([]);
    const [success, setSuccess] = useState(false);
    const [editingId, setEditingId] = useState<number | null>(null);
    const [editingName, setEditingName] = useState('');

    const fetchCategories = async () => {
        const token = Cookies.get('token');
        if (!token) return;

        const res = await fetch('/api/app/getCategories', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });

        const data: Category[] = await res.json();
        setCategories(data);
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    useEffect(() => {
        if (categories.length > 0) {
            const map = new Map<number, Category>(
                categories.map((cat) => [cat.id, { ...cat, children: [] }])
            );

            const treeData = categories
                .map((cat) => {
                    if (cat.parentCategory) {
                        const parent = map.get(cat.parentCategory.id);
                        if (parent) {
                            parent.children?.push(map.get(cat.id)!);
                            return null;
                        }
                    }
                    return map.get(cat.id)!;
                })
                .filter((cat): cat is Category => cat !== null);

            setTree(treeData);
        }
    }, [categories]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const token = Cookies.get('token');
        if (!token) return;

        const body = parentId
            ? { name, parentCategory: { id: parentId } }
            : { name, parentCategory: null };

        try {
            const res = await fetch('/api/app/createCategory', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(body),
            });

            if (res.ok) {
                setSuccess(true);
                setName('');
                setParentId(null);
                fetchCategories();
            } else {
                console.error('خطا در ایجاد دسته');
            }
        } catch (error) {
            console.error('خطا در ارتباط با سرور:', error);
        }
    };

    const handleEdit = (category: Category) => {
        setEditingId(category.id);
        setEditingName(category.name);
    };

    const handleUpdate = async (id: number) => {
        const token = Cookies.get('token');
        if (!token) return;

        const category = categories.find((cat) => cat.id === id);
        if (!category) return;

        try {
            const res = await fetch('/api/app/updateCategory', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({
                    id,
                    name: editingName,
                    parentCategory: category.parentCategory
                        ? { id: category.parentCategory.id }
                        : null,
                }),
            });

            if (res.ok) {
                setEditingId(null);
                setEditingName('');
                fetchCategories();
            } else {
                console.error('خطا در بروزرسانی');
            }
        } catch (error) {
            console.error('خطا در ارتباط با سرور:', error);
        }
    };

    // حذف دسته اصلی به همراه زیر دسته‌ها
    const deleteCategoryWithChildren = async (categoryId: number) => {
        const token = Cookies.get('token');

        try {
            // ابتدا تمام زیر دسته‌ها را حذف کنیم
            const category = categories.find((cat) => cat.id === categoryId);
            if (category && category.children) {
                // حذف هر زیر دسته به صورت بازگشتی
                for (const child of category.children) {
                    await deleteCategoryWithChildren(child.id);
                }
            }

            // حالا خود دسته اصلی را حذف می‌کنیم
            const res = await fetch(`/api/app/delById/${categoryId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            if (res.ok) {
                fetchCategories();  // بروزرسانی دسته‌ها
            } else {
                console.error('خطا در حذف دسته');
            }
        } catch (error) {
            console.error('خطا در ارتباط با سرور:', error);
        }
    };

    const handleDeleteById = async (id: number) => {
        const token = Cookies.get('token');
        if (!token) return;

        try {
            const res = await fetch(`/api/app/delById/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (res.ok) {
                fetchCategories();  // بروزرسانی دسته‌ها
            } else {
                console.error('خطا در حذف زیر دسته');
            }
        } catch (error) {
            console.error('خطا در ارتباط با سرور:', error);
        }
    };


    const renderTree = (nodes: Category[]) => (
        <ul className="list-disc pr-4 space-y-2">
            {nodes.map((node) => (
                <li key={node.id} className="flex flex-col gap-1">
                    {editingId === node.id ? (
                        <div className="flex items-center gap-2">
                            <input
                                value={editingName}
                                onChange={(e) => setEditingName(e.target.value)}
                                className="border rounded p-1 text-black"
                            />
                            <button
                                onClick={() => handleUpdate(node.id)}
                                className="bg-green-500 text-white px-2 py-1 rounded"
                            >
                                ذخیره
                            </button>
                            <button
                                onClick={() => setEditingId(null)}
                                className="text-sm text-gray-500 hover:underline"
                            >
                                لغو
                            </button>
                        </div>
                    ) : (
                        <div className="flex items-center gap-3">
                            <span>{node.name}</span>
                            <button
                                onClick={() => handleEdit(node)}
                                className="text-blue-600 text-sm hover:underline"
                            >
                                ویرایش
                            </button>
                            {/* دکمه حذف دسته اصلی */}
                            <button
                                onClick={() => deleteCategoryWithChildren(node.id)}
                                className="text-red-600 text-sm hover:underline"
                            >
                                حذف دسته اصلی
                            </button>
                            {/* دکمه حذف زیر دسته */}
                            {node.parentCategory && (
                                <button
                                    onClick={() => handleDeleteById(node.id)}
                                    className="text-red-600 text-sm hover:underline"
                                >
                                    حذف زیر دسته
                                </button>
                            )}
                        </div>
                    )}
                    {node.children && node.children.length > 0 && (
                        <ul className="pl-6 mt-2 space-y-1 text-pink-500">{renderTree(node.children)}</ul>
                    )}
                </li>
            ))}
        </ul>
    );

    return (
        <div className="max-w-2xl mx-auto mt-6 p-4 space-y-8">
            <form onSubmit={handleSubmit} className="p-4 border rounded-xl shadow-sm space-y-4">
                <h2 className="text-xl font-bold mb-2 text-center">ایجاد دسته / زیر دسته</h2>

                <div>
                    <label className="block mb-1">نام دسته:</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full p-2 border rounded text-black"
                        required
                    />
                </div>

                <div>
                    <label className="block mb-1">انتخاب دسته پدر (اختیاری):</label>
                    <select
                        value={parentId ?? ''}
                        onChange={(e) => setParentId(e.target.value ? parseInt(e.target.value) : null)}
                        className="w-full p-2 border rounded text-black"
                    >
                        <option value="">--- بدون دسته پدر (اصلی) ---</option>
                        {categories.map((cat) => (
                            <option key={cat.id} value={cat.id}>
                                {cat.name}
                            </option>
                        ))}
                    </select>
                </div>

                <button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded w-full"
                >
                    ایجاد دسته
                </button>

                {success && <p className="text-green-600 mt-2 text-center"> دسته با موفقیت ایجاد شد!</p>}
            </form>

            <div className="border-t pt-6">
                <h3 className="text-lg font-semibold mb-3 text-center"> لیست دسته‌ها (با امکان ویرایش):</h3>
                {tree.length > 0 ? renderTree(tree) : <p className="text-center">در حال دریافت دسته‌بندی‌ها...</p>}
            </div>
        </div>
    );
};

export default CreateCategoryForm;
