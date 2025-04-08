'use client'

import Cookies from "js-cookie";
import { useState, useEffect } from "react";

interface Data {
    id: number;
    name: string;
}

const Skill = () => {
    const token = Cookies.get("token");
    const [Skills, setSkills] = useState<Data[]>([]);
    const [Input, setInput] = useState("");
    const [editId, setEditId] = useState<number | null>(null);
    const [editValue, setEditValue] = useState("");

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
        <div className="max-w-md mx-auto mt-10 p-4 bg-white shadow-lg rounded-2xl space-y-6">
            <div className="flex items-center gap-2">
                <input
                    type="text"
                    value={Input}
                    placeholder="مهارت را وارد کنید"
                    onChange={(e) => setInput(e.target.value)}
                    className="flex-1 px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <button
                    onClick={handleSubmit}
                    className="bg-blue-500 text-white px-4 py-2 rounded-xl hover:bg-blue-600 transition"
                >
                    ثبت
                </button>
            </div>
            <ul className="space-y-3">
                {Skills.map((item) => (
                    <li
                        key={item.id}
                        className="flex items-center justify-between border p-3 rounded-xl shadow-sm hover:shadow-md transition"
                    >
                        {editId === item.id ? (
                            <div className="flex w-full items-center gap-2">
                                <input
                                    type="text"
                                    value={editValue}
                                    onChange={(e) => setEditValue(e.target.value)}
                                    className="flex-1 px-3 py-1 border rounded-lg focus:outline-none"
                                />
                                <button
                                    onClick={() => handleUpdate(item.id)}
                                    className="bg-green-500 text-white px-3 py-1 rounded-lg hover:bg-green-600"
                                >
                                    ذخیره
                                </button>
                                <button
                                    onClick={() => {
                                        setEditId(null);
                                        setEditValue("");
                                    }}
                                    className="bg-gray-400 text-white px-3 py-1 rounded-lg hover:bg-gray-500"
                                >
                                    لغو
                                </button>
                            </div>
                        ) : (
                            <>
                                <span className="font-medium">{item.name}</span>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => handleEdit(item.id, item.name)}
                                        className="text-blue-500 hover:text-blue-700 font-semibold"
                                    >
                                        ویرایش
                                    </button>
                                    <button
                                        onClick={() => handleDelete(item.id)}
                                        className="text-red-500 hover:text-red-700 font-semibold"
                                    >
                                        حذف
                                    </button>
                                </div>
                            </>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Skill;
