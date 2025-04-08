'use client';
import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { Pencil, Trash2, X, Save } from 'lucide-react';

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
        <ul className="list-disc pr-4 space-y-3">
            {nodes.map((node) => (
                <li key={node.id} className="flex flex-col gap-2">
                    {editingId === node.id ? (
                        <div className="flex items-center gap-3">
                            <input
                                value={editingName}
                                onChange={(e) => setEditingName(e.target.value)}
                                className="bg-[#1A1A1A] border border-[#333] rounded-lg px-3 py-1 text-white"
                            />
                            <button
                                onClick={() => handleUpdate(node.id)}
                                className="bg-[#8FD400] text-[#1C1C1C] rounded-lg px-2 py-1 flex items-center gap-1"
                            >
                                <Save size={16} />
                                ذخیره
                            </button>
                            <button
                                onClick={() => setEditingId(null)}
                                className="text-[#BFBFBF] hover:text-[#E4E4E7] text-sm flex items-center gap-1"
                            >
                                <X size={16} />
                                لغو
                            </button>
                        </div>
                    ) : (
                        <div className="flex items-center gap-4 text-[#E4E4E7]">
                            <span className="font-primaryMedium">{node.name}</span>
                            <button
                                onClick={() => handleEdit(node)}
                                className="text-[#CAFF33] hover:text-[#A4E600] text-sm flex items-center gap-1"
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
                        <ul className="pl-6 mt-2 border-r-2 border-dotted border-[#333] ml-2">
                            {renderTree(node.children)}
                        </ul>
                    )}
                </li>
            ))}
        </ul>

    );

    return (
        <div className="max-w-2xl mx-auto mt-10 p-6 rounded-2xl shadow-xl bg-[#1C1C1C] text-[#E4E4E7] space-y-10 font-primaryRegular">
            {/* فرم افزودن دسته */}
            <form
                onSubmit={handleSubmit}
                className="bg-[#262626] rounded-2xl p-6 space-y-5 border border-[#333] shadow-md"
            >
                <h2 className="text-2xl font-primaryBold text-[#CAFF33] text-center">ایجاد دسته / زیر دسته</h2>

                <div>
                    <label className="block mb-1 text-[#BFBFBF] font-primaryMedium">نام دسته:</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full p-3 bg-[#1A1A1A] border border-[#333] rounded-xl text-white focus:ring-2 focus:ring-[#8FD400] outline-none"
                        required
                    />
                </div>

                <div>
                    <label className="block mb-1 text-[#BFBFBF] font-primaryMedium">انتخاب دسته پدر (اختیاری):</label>
                    <select
                        value={parentId ?? ''}
                        onChange={(e) => setParentId(e.target.value ? parseInt(e.target.value) : null)}
                        className="w-full p-3 bg-[#1A1A1A] border border-[#333] rounded-xl text-white"
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
                    className="w-full bg-[#8FD400] hover:bg-[#A4E600] text-[#1C1C1C] font-primaryBold py-2 rounded-xl transition"
                >
                    ایجاد دسته
                </button>

                {success && (
                    <p className="text-[#A4E600] text-center font-primaryMedium mt-2">
                        دسته با موفقیت ایجاد شد!
                    </p>
                )}
            </form>

            {/* لیست دسته‌ها */}
            <div>
                <h3 className="text-xl font-primaryDemibold text-center mb-4">لیست دسته‌ها (با امکان ویرایش)</h3>
                {tree.length > 0 ? (
                    <ul className="list-disc pr-4 space-y-3">
                        {renderTree(tree)}
                    </ul>
                ) : (
                    <p className="text-center text-[#BFBFBF]">در حال دریافت دسته‌بندی‌ها...</p>
                )}
            </div>
        </div>

    );
};

export default CreateCategoryForm;
