'use client';
import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { Pencil, Trash2, X, Save } from 'lucide-react';
import API from "@/components/utils/api";

interface Category {
    id: number;
    name: string;
    parentCategory: Category | null;
    children?: Category[];
}

const CreateCategoryForm: React.FC = () => {
    const [showModal, setShowModal] = useState(false);
    const [name, setName] = useState('');
    const [parentId, setParentId] = useState<number | null>(null);
    const [categories, setCategories] = useState<Category[]>([]);
    const [tree, setTree] = useState<Category[]>([]);
    const [success, setSuccess] = useState(false);
    const [editingId, setEditingId] = useState<number | null>(null);
    const [editingName, setEditingName] = useState('');

    const fetchCategories = async () => {
        const token = Cookies.get('adminToken');
        if (!token) return;

        const res = await fetch(`${API}/app/getCategories`, {
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
            const res = await fetch(`${API}/app/createCategory`, {
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
            const res = await fetch(`${API}/app/updateCategory`, {
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

            const res = await fetch(`${API}/app/delById/${categoryId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            if (res.ok) {
                fetchCategories();
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
            const res = await fetch(`${API}/app/delById/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (res.ok) {
                fetchCategories();
            } else {
                console.error('خطا در حذف زیر دسته');
            }
        } catch (error) {
            console.error('خطا در ارتباط با سرور:', error);
        }
    };


    const renderTree = (nodes: Category[]) => (
        <ul className="list-disc pr-4 space-y-3">
            {nodes.map((node) => (
                <li key={node.id} className="flex flex-col gap-2">
                    {editingId === node.id ? (
                        <div className="flex items-center gap-3">
                            <input
                                value={editingName}
                                onChange={(e) => setEditingName(e.target.value)}
                                className="bg-color6 border border-color5 rounded-lg px-3 py-1 text-color2"
                            />
                            <button
                                onClick={() => handleUpdate(node.id)}
                                className="bg-color9 text-color1 rounded-lg px-2 py-1 flex items-center gap-1"
                            >
                                <Save size={16} />
                                ذخیره
                            </button>
                            <button
                                onClick={() => setEditingId(null)}
                                className="text-color7 hover:text-color2 text-sm flex items-center gap-1"
                            >
                                <X size={16} />
                                لغو
                            </button>
                        </div>
                    ) : (
                        <div className="flex items-center gap-4">
                            <span className="font-primaryMedium text-color3">{node.name}</span>
                            <button
                                onClick={() => handleEdit(node)}
                                className="text-color4 hover:text-color8 text-sm flex items-center gap-1"
                            >
                                <Pencil size={16} />
                                ویرایش
                            </button>
                            <button
                                onClick={() => deleteCategoryWithChildren(node.id)}
                                className="text-red-500 hover:text-red-400 text-sm flex items-center gap-1"
                            >
                                <Trash2 size={16} />
                                حذف دسته
                            </button>
                        </div>
                    )}
                    {node.children && node.children.length > 0 && (
                        <ul className="pl-6 mt-2 border-r-2 border-dotted border-white ml-2">
                            <li className='text-color4'>
                            {renderTree(node.children)}
                            </li>
                        </ul>
                    )}
                </li>
            ))}
        </ul>
    );

    return (
        <div className="max-w-2xl mx-auto mt-10 p-6 rounded-2xl shadow-xl bg-color1 text-color3 space-y-10 font-primaryRegular">
            <button
                onClick={() => setShowModal(true)}
                className="bg-color8 hover:bg-color4 text-color1 font-primaryBold py-2 px-4 rounded-xl transition w-full md:w-auto"
            >
                + افزودن دسته جدید
            </button>
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
                    <div className="bg-color1 border border-color5 rounded-2xl p-6 w-full max-w-md mx-auto shadow-2xl">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl text-color4 font-primaryBold">ایجاد دسته / زیر دسته</h2>
                            <button onClick={() => setShowModal(false)} className="text-color7 hover:text-red-400 text-lg font-bold">
                                ×
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div>
                                <label className="block mb-1 text-[#BFBFBF] font-primaryMedium">نام دسته:</label>
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="w-full p-3 bg-color6 border border-color5 rounded-xl text-color2 focus:ring-2 focus:ring-color9 outline-none"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block mb-1 text-color3 font-primaryMedium">انتخاب دسته پدر (اختیاری):</label>
                                <select
                                    value={parentId ?? ''}
                                    onChange={(e) => setParentId(e.target.value ? parseInt(e.target.value) : null)}
                                    className="w-full p-3 bg-color6 border border-color5 rounded-xl text-color2"
                                >
                                    <option value="">--- بدون دسته پدر (اصلی) ---</option>
                                    {categories.map((cat) => (
                                        <option key={cat.id} value={cat.id}>
                                            {cat.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="flex justify-between items-center pt-2">
                                <button
                                    type="button"
                                    onClick={() => setShowModal(false)}
                                    className="bg-color6 text-color2 px-4 py-2 rounded-xl hover:bg-color5 transition border border-color5"
                                >
                                    لغو
                                </button>
                                <button
                                    type="submit"
                                    className="bg-color9 hover:bg-color8 text-color1 font-primaryBold py-2 px-4 rounded-xl transition"
                                >
                                    ایجاد دسته
                                </button>
                            </div>

                            {success && (
                                <p className="text-color8 text-center font-primaryMedium mt-2">
                                    دسته با موفقیت ایجاد شد!
                                </p>
                            )}
                        </form>
                    </div>
                </div>
            )}
            <div>
                <h3 className="text-xl font-primaryDemibold text-center mb-4">لیست دسته‌ها (با امکان ویرایش)</h3>
                {tree.length > 0 ? (
                    <ul className="list-disc pr-4 space-y-3">
                        {renderTree(tree)}
                    </ul>
                ) : (
                    <p className="text-center text-color7">در حال دریافت دسته‌بندی‌ها...</p>
                )}
            </div>
        </div>
    );
};

export default CreateCategoryForm;
