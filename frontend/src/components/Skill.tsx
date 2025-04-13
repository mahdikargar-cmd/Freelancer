'use client'

import Cookies from "js-cookie";
import { useState, useEffect } from "react";
import { FaEdit, FaTrash, FaCheck } from "react-icons/fa";

interface Data {
    id: number;
    name: string;
}

const Skill = () => {
    const token = Cookies.get("adminToken");
    const [Skills, setSkills] = useState<Data[]>([]);
    const [Input, setInput] = useState("");
    const [editId, setEditId] = useState<number | null>(null);
    const [editValue, setEditValue] = useState("");
    const [searchQuery, setSearchQuery] = useState(""); // تغییر نام متغیر برای شفافیت بیشتر

    useEffect(() => {
        fetch("/api/app/skills", {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        })
            .then((res) => {
                if (!res.ok) throw new Error("Network response was not ok");
                return res.json();
            })
            .then((data: Data[]) => {
                setSkills(data);
            })
            .catch((err) => {
                alert(err)
            });
    }, []);
    const filteredSkills = Skills.filter(skill => 
        skill.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleSubmit = async () => {
        if (!Input.trim()) return alert("لطفاً مهارت را وارد کنید.");
        try {
            const res = await fetch("/api/app/skills", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({ name: Input }),
            });
            if (res.ok) {
                const result = await res.json();
                setSkills(prev => [...prev, result]);
                setInput("");
                alert('مهارت با موفقیت ثبت شد');
            } else {
                const errorText = await res.text();
                alert('خطا در ثبت مهارت');
                console.error(errorText);
            }
        } catch (err) {
            alert(err)
        }
    };

    const handleEdit = (id: number, currentName: string) => {
        setEditId(id);
        setEditValue(currentName);
    };

    const handleUpdate = async (id: number) => {
        if (!editValue.trim()) return alert("لطفاً مقدار جدید مهارت را وارد کنید.");
        try {
            const res = await fetch(`/api/app/skills/${id}`, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({ name: editValue }),
            });

            if (res.ok) {
                setSkills(prev =>
                    prev.map(skill => (skill.id === id ? { ...skill, name: editValue } : skill))
                );
                setEditId(null);
                setEditValue("");
                alert("مهارت با موفقیت ویرایش شد");
            } else {
                const errorText = await res.text();
                alert('خطا در ویرایش مهارت');
                console.error(errorText);
            }
        } catch (err) {
            alert(err)
        }
    };

    const handleDelete = async (id: number) => {
        if (!window.confirm("آیا از حذف این مهارت مطمئن هستید؟")) return;
        try {
            const res = await fetch(`/api/app/skills/${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if (res.ok) {
                setSkills(prev => prev.filter(skill => skill.id !== id));
                alert("مهارت با موفقیت حذف شد");
            } else {
                const errorText = await res.text();
                alert('خطا در حذف مهارت');
                console.error(errorText);
            }
        } catch (err) {
            alert(err);
        }
    };

    return (
        <div className="max-w-3xl mx-auto mt-12 p-8 bg-color6 rounded-xl shadow-xl space-y-8">
            <div className="flex items-center gap-4 bg-color5 p-4 rounded-xl shadow-md">
                <input
                    type="text"
                    value={Input}
                    placeholder="مهارت را وارد کنید"
                    onChange={(e) => setInput(e.target.value)}
                    className="flex-1 px-6 py-3 rounded-xl border border-color3 bg-color2 focus:outline-none focus:ring-2 focus:ring-color4 text-color6 font-primaryRegular"
                />
                <button
                    onClick={handleSubmit}
                    className="bg-color4 text-color6 px-6 py-3 rounded-xl hover:bg-color9 transition font-primaryMedium"
                >
                    ثبت مهارت
                </button>
            </div>
            <div className="bg-color5 p-4 rounded-xl shadow-md">
                <input
                    type="text"
                    value={searchQuery}
                    placeholder="جستجوی مهارت‌ها"
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-6 py-3 rounded-xl border border-color3 bg-color2 focus:outline-none focus:ring-2 focus:ring-color4 text-color6 font-primaryRegular"
                />
            </div>
            <ul className="space-y-6">
                {filteredSkills.map((item) => (
                    <li
                        key={item.id}
                        className="flex items-center justify-between bg-color5 p-6 rounded-xl shadow-sm hover:shadow-lg transition"
                    >
                        {editId === item.id ? (
                            <div className="flex w-full items-center gap-4">
                                <input
                                    type="text"
                                    value={editValue}
                                    onChange={(e) => setEditValue(e.target.value)}
                                    className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-color4 font-primaryRegular text-color6"
                                />
                                <button
                                    onClick={() => handleUpdate(item.id)}
                                    className="bg-color9 text-color2 px-4 py-2 rounded-lg hover:bg-color8"
                                >
                                    <FaCheck className="w-5 h-5" />
                                </button>
                                <button
                                    onClick={() => {
                                        setEditId(null);
                                        setEditValue("");
                                    }}
                                    className="bg-gray-500 text-color2 px-4 py-2 rounded-lg hover:bg-gray-600"
                                >
                                    لغو
                                </button>
                            </div>
                        ) : (
                            <div className="flex justify-between w-full items-center">
                                <span className="text-lg font-primaryMedium text-color2">{item.name}</span>
                                <div className="flex gap-4">
                                    <button
                                        onClick={() => handleEdit(item.id, item.name)}
                                        className="text-color4 hover:text-color9 font-primaryRegular flex items-center gap-2"
                                    >
                                        <FaEdit className="w-5 h-5" />
                                        ویرایش
                                    </button>
                                    <button
                                        onClick={() => handleDelete(item.id)}
                                        className="text-red-500 hover:text-red-400 font-primaryRegular flex items-center gap-2"
                                    >
                                        <FaTrash className="w-5 h-5" />
                                        حذف
                                    </button>
                                </div>
                            </div>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Skill;