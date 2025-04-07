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
        fetchCategories(); // رفرش دسته‌ها بعد از ایجاد
      } else {
        console.error('خطا در ایجاد دسته');
      }
    } catch (error) {
      console.error('خطا در ارتباط با سرور:', error);
    }
  };

  const renderTree = (nodes: Category[]) => (
    <ul className="list-disc pr-4">
      {nodes.map((node) => (
        <li key={node.id}>
          {node.name}
          {node.children && node.children.length > 0 && renderTree(node.children)}
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

        {success && <p className="text-green-600 mt-2 text-center">✅ دسته با موفقیت ایجاد شد!</p>}
      </form>

      <div className="border-t pt-6">
        <h3 className="text-lg font-semibold mb-3 text-center">📂 لیست دسته‌ها:</h3>
        {tree.length > 0 ? renderTree(tree) : <p className="text-center">در حال دریافت دسته‌بندی‌ها...</p>}
      </div>
    </div>
  );
};

export default CreateCategoryForm;
