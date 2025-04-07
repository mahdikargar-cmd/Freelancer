'use client';

import { useEffect, useState } from 'react';
import Cookies from 'js-cookie'
interface Category {
  id: number;
  name: string | null;
  parentCategory: Category | null;
}

interface ProjectPayload {
  title: string;
  description: string;
  categoryId: number;
  subCategoryId: number;
}

export default function CategorySelector() {
  const [allCategories, setAllCategories] = useState<Category[]>([]);
  const [mainCategories, setMainCategories] = useState<Category[]>([]);
  const [subCategories, setSubCategories] = useState<Category[]>([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>('');
  const [selectedSubCategoryId, setSelectedSubCategoryId] = useState<string>('');
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  
  const token = Cookies.get('token')
  

  useEffect(() => {
    fetch('/api/app/getCategories', {
    method:"GET",
      headers: {
        'Content-Type': 'application/json',
         Authorization: `Bearer ${token}`
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        return res.json(); // تبدیل پاسخ به JSON
      })
      .then((data: Category[]) => {
        setAllCategories(data);
        const mains = data.filter(
          (cat) => cat.parentCategory === null && cat.name !== null
        );
        setMainCategories(mains);
      })
      .catch((err) => {
        console.error('Error fetching categories:', err);
        alert('خطا در دریافت دسته‌بندی‌ها');
      });
  }, []);
  

  useEffect(() => {
    if (selectedCategoryId) {
      const subs = allCategories.filter(
        (cat) =>
          cat.parentCategory && String(cat.parentCategory.id) === selectedCategoryId
      );
      setSubCategories(subs);
    } else {
      setSubCategories([]);
    }
  }, [selectedCategoryId, allCategories]);

  const handleSubmit = async () => {
    if (!title || !description || !selectedCategoryId || !selectedSubCategoryId) {
      alert('لطفاً همه فیلدها را پر کنید');
      return;
    }

    const payload: ProjectPayload = {
      title,
      description,
      categoryId: Number(selectedCategoryId),
      subCategoryId: Number(selectedSubCategoryId),
    };

    try {
      const res = await fetch('/api/app/createCategory', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
           Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        const result = await res.json();
        alert('✅ پروژه با موفقیت ثبت شد');
        console.log(result);
      } else {
        const errorText = await res.text();
        alert('❌ خطا در ثبت پروژه');
        console.error(errorText);
      }
    } catch (err) {
      console.error('Error submitting project:', err);
    }
  };

  return (
    <div className="p-4 space-y-4 max-w-xl mx-auto">
      <h2 className="text-xl font-bold">ثبت پروژه</h2>

      <input
        type="text"
        placeholder="عنوان پروژه"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="border rounded p-2 w-full"
      />

      <textarea
        placeholder="توضیحات پروژه"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="border rounded p-2 w-full"
      />

      <select
        value={selectedCategoryId}
        onChange={(e) => setSelectedCategoryId(e.target.value)}
        className="border rounded p-2 w-full"
      >
        <option value="">انتخاب دسته</option>
        {mainCategories.map((cat) => (
          <option key={cat.id} value={String(cat.id)}>
            {cat.name}
          </option>
        ))}
      </select>

      <select
        value={selectedSubCategoryId}
        onChange={(e) => setSelectedSubCategoryId(e.target.value)}
        className="border rounded p-2 w-full"
        disabled={subCategories.length === 0}
      >
        <option value="">انتخاب زیر دسته</option>
        {subCategories.map((sub) => (
          <option key={sub.id} value={String(sub.id)}>
            {sub.name}
          </option>
        ))}
      </select>

      <button
        onClick={handleSubmit}
        className="bg-green-600 text-white px-4 py-2 rounded"
      >
        ثبت پروژه
      </button>
    </div>
  );
}
