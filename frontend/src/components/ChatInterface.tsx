"use client";
import React, { useState, useEffect, useRef } from "react";
import { useAuth } from "@/components/lib/useAuth";
import Cookies from "js-cookie";

interface Message {
    id: number;
    sender: "freelancer" | "client";
    content: string;
    time: string;
}

interface ChatInterfaceProps {
    projectId: number;
    receiverId: number;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ projectId, receiverId }) => {
    const { userId } = useAuth();
    const token = Cookies.get("token");
    const [error, setError] = useState<string | null>(null);
    const [messages, setMessages] = useState<Message[]>([]);
    const [newMessage, setNewMessage] = useState("");
    const [showUserMenu, setShowUserMenu] = useState(false);
    const [showPaymentModal, setShowPaymentModal] = useState(false);
    const [ws, setWs] = useState<WebSocket | null>(null);

    const chatContainerRef = useRef<HTMLDivElement>(null);
    const userMenuRef = useRef<HTMLDivElement>(null);

    // اتصال به WebSocket
    useEffect(() => {
        if (!userId || !token) {
            setError("لطفاً وارد حساب کاربری خود شوید.");
            return;
        }

        const websocket = new WebSocket(`ws://localhost:8080/ws/chat?userId=${userId}&token=${token}`);

        websocket.onopen = () => {
            console.log("WebSocket connected");
            setError(null);
        };

        websocket.onmessage = (event) => {
            try {
                const data = JSON.parse(event.data);
                console.log("Received message:", data);

                if (data.type === "message" || data.type === "sent") {
                    const receivedMessage = data.data;
                    if (!receivedMessage || !receivedMessage.sender || !receivedMessage.sender.id) {
                        console.warn("Invalid message structure:", receivedMessage);
                        return;
                    }
                    setMessages((prevMessages) => [
                        ...prevMessages,
                        {
                            id: receivedMessage.id,
                            sender: receivedMessage.sender.id === userId ? "freelancer" : "client",
                            content: receivedMessage.content,
                            time: new Date(receivedMessage.time).toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                            }),
                        },
                    ]);
                } else if (data.type === "error") {
                    console.error("WebSocket error:", data.message);
                    setError(data.message || "خطایی در ارتباط رخ داد.");
                } else if (data.type === "pong" || data.type === "heartbeat") {
                    websocket.send(JSON.stringify({ type: "ping" }));
                }
            } catch (err) {
                console.error("Error parsing WebSocket message:", err);
                setError("خطا در پردازش پیام.");
            }
        };

        websocket.onclose = () => {
            console.log("WebSocket disconnected");
            setError("اتصال WebSocket قطع شد.");
        };

        websocket.onerror = (error) => {
            console.error("WebSocket error:", error);
            setError("خطا در اتصال WebSocket.");
        };

        setWs(websocket);

        return () => {
            websocket.close();
        };
    }, [userId, token]);

    // بارگذاری پیام‌های قبلی
    useEffect(() => {
        if (!projectId || !token) {
            setError("اطلاعات پروژه یا توکن نامعتبر است.");
            return;
        }

        const fetchMessages = async () => {
            try {
                const response = await fetch(`http://localhost:8080/app/messages?projectId=${projectId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                if (!response.ok) throw new Error("Failed to fetch messages");
                const data = await response.json();
                setMessages(
                    data.map((msg: any) => ({
                        id: msg.id,
                        sender: msg.sender.id === userId ? "freelancer" : "client",
                        content: msg.content,
                        time: new Date(msg.time).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                        }),
                    }))
                );
            } catch (error) {
                console.error("Error fetching messages:", error);
                setError("خطا در بارگذاری پیام‌ها.");
            }
        };

        fetchMessages();
    }, [projectId, userId, token]);

    // اسکرول به پایین چت
    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [messages]);

    // مدیریت کلیک خارج از منوی کاربر
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
                setShowUserMenu(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // ارسال پیام
    const handleSendMessage = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (newMessage.trim() === "" || !ws || ws.readyState !== WebSocket.OPEN) {
            setError("لطفاً پیام را وارد کنید یا اتصال را بررسی کنید.");
            return;
        }

        const messagePayload = {
            type: "message",
            content: newMessage,
            projectId: projectId,
            receiverId: receiverId,
            senderId: userId,
        };

        ws.send(JSON.stringify(messagePayload));
        setNewMessage("");
        setError(null);
    };

    const handleBlockUser = () => {
        alert("کاربر با موفقیت مسدود شد.");
        setShowUserMenu(false);
    };

    const handlePaymentClick = () => {
        setShowPaymentModal(true);
    };

    const handlePaymentSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        alert("پرداخت با موفقیت انجام شد.");
        setShowPaymentModal(false);
    };

    return (
        <div className="max-w-4xl mx-auto my-8 px-4">
            {error && <div className="text-red-500 text-center mb-4">{error}</div>}
            <div className="bg-light-color5 dark:bg-color5 rounded-2xl shadow-lg overflow-hidden">
                {/* Chat header */}
                <div className="bg-light-color1 dark:bg-color1 p-4 border-b border-light-color6 dark:border-color5 flex justify-between items-center">
                    <div className="flex items-center space-x-3">
                        <div className="flex w-10 h-10 rounded-full bg-light-color4 dark:bg-color4 items-center justify-center overflow-hidden">
                            <img src="/api/placeholder/100/100" alt="کاربر" className="w-full h-full object-cover" />
                        </div>
                        <div className="mr-3">
                            <h3 className="font-primaryMedium dark:text-color2 text-light-color2">محمد رضایی</h3>
                            <p className="text-xs text-light-color7 dark:text-color7">آنلاین</p>
                        </div>
                    </div>
                    <div className="flex space-x-2 relative">
                        <button
                            onClick={() => setShowUserMenu(!showUserMenu)}
                            className="p-2 rounded-full hover:bg-light-color6 dark:hover:bg-color5 transition-colors"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5 text-light-color7 dark:text-color7"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                                />
                            </svg>
                        </button>
                        {showUserMenu && (
                            <div
                                ref={userMenuRef}
                                className="absolute left-0 top-10 w-40 bg-light-color1 dark:bg-color1 shadow-lg rounded-lg z-10"
                            >
                                <ul className="py-1">
                                    <li>
                                        <button
                                            onClick={handleBlockUser}
                                            className="w-full text-right px-4 py-2 text-sm text-red-500 hover:bg-light-color6 dark:hover:bg-color5"
                                        >
                                            مسدود کردن کاربر
                                        </button>
                                    </li>
                                    <li>
                                        <button className="w-full text-right px-4 py-2 text-sm text-light-color2 dark:text-color2 hover:bg-light-color6 dark:hover:bg-color5">
                                            گزارش تخلف
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        )}
                    </div>
                </div>

                {/* Chat messages */}
                <div
                    ref={chatContainerRef}
                    className="p-4 h-96 overflow-y-auto flex flex-col space-y-4 bg-light-color5 dark:bg-color6"
                >
                    {messages.map((message) => (
                        <div
                            key={message.id}
                            className={`flex ${message.sender === "freelancer" ? "justify-end" : "justify-start"}`}
                        >
                            <div
                                className={`max-w-xs md:max-w-md rounded-2xl p-3 ${
                                    message.sender === "freelancer"
                                        ? "bg-light-color4 dark:bg-color4 text-light-color2 dark:text-color1"
                                        : "bg-light-color1 dark:bg-color5 text-light-color2 dark:text-color2"
                                }`}
                            >
                                <p className="text-sm">{message.content}</p>
                                <span
                                    className={`text-xs mt-1 block text-right ${
                                        message.sender === "freelancer"
                                            ? "text-light-color2 dark:text-color1"
                                            : "text-light-color7 dark:text-color7"
                                    }`}
                                >
                  {message.time}
                </span>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Chat input */}
                <div className="bg-light-color1 dark:bg-color1 p-4 border-t border-light-color6 dark:border-color5">
                    <form onSubmit={handleSendMessage} className="flex items-center">
                        <button
                            type="button"
                            className="p-2 rounded-full hover:bg-light-color6 dark:hover:bg-color5 transition-colors"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5 text-light-color7 dark:text-color7"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                                />
                            </svg>
                        </button>
                        <button
                            type="button"
                            className="p-2 rounded-full hover:bg-light-color6 dark:hover:bg-color5 transition-colors mx-1"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5 text-light-color7 dark:text-color7"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                                />
                            </svg>
                        </button>
                        <input
                            type="text"
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            placeholder="پیام خود را بنویسید..."
                            className="flex-1 p-2 rounded-lg border border-light-color6 dark:border-color5 bg-light-color5 dark:bg-color5 mx-2 focus:outline-none focus:ring-2 focus:ring-light-color4 dark:focus:ring-color4 text-light-color2 dark:text-color2"
                        />
                        <button
                            type="submit"
                            className="bg-light-color4 dark:bg-color4 text-light-color2 dark:text-color1 p-2 rounded-lg hover:bg-light-color8 dark:hover:bg-color8 transition-colors"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5 transform rotate-180"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                                />
                            </svg>
                        </button>
                    </form>
                </div>
            </div>

            {/* Project info card with payment option */}
            <div className="mt-6 bg-light-color5 dark:bg-color5 rounded-2xl shadow-lg p-4">
                <h3 className="font-primaryMedium text-lg text-light-color2 dark:text-color2 mb-3">اطلاعات پروژه</h3>
                <div className="space-y-3">
                    <div className="flex justify-between items-center">
                        <span className="text-light-color7 dark:text-color7">عنوان:</span>
                        <span className="text-light-color2 dark:text-color2">طراحی وب‌سایت فروشگاهی</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-light-color7 dark:text-color7">بودجه:</span>
                        <span className="text-light-color4 dark:text-color4 font-primaryMedium">۵,۵۰۰,۰۰۰ تومان</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-light-color7 dark:text-color7">مهلت تحویل:</span>
                        <span className="text-light-color2 dark:text-color2">۱۴ روز</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-light-color7 dark:text-color7">وضعیت:</span>
                        <span className="bg-light-color4 dark:bg-color4 text-light-color2 dark:text-color1 px-2 py-1 rounded-md text-xs">
              در حال مذاکره
            </span>
                    </div>
                </div>
                <div className="mt-4 flex justify-end">
                    <button
                        onClick={handlePaymentClick}
                        className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition-colors"
                    >
                        پرداخت پروژه
                    </button>
                </div>
            </div>

            {/* Payment Modal */}
            {showPaymentModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-light-color5 dark:bg-color5 rounded-2xl p-6 w-full max-w-md">
                        <h3 className="text-xl font-primaryMedium text-light-color2 dark:text-color2 mb-4">پرداخت پروژه</h3>
                        <form onSubmit={handlePaymentSubmit}>
                            <div className="mb-4">
                                <label className="block text-light-color7 dark:text-color7 mb-2">مبلغ پرداختی (تومان)</label>
                                <input
                                    type="text"
                                    defaultValue="۵,۵۰۰,۰۰۰"
                                    readOnly
                                    className="w-full p-3 rounded-lg border border-light-color6 dark:border-color5 bg-light-color1 dark:bg-color1 text-light-color2 dark:text-color2"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-light-color7 dark:text-color7 mb-2">روش پرداخت</label>
                                <select className="w-full p-3 rounded-lg border border-light-color6 dark:border-color5 bg-light-color1 dark:bg-color1 text-light-color2 dark:text-color2">
                                    <option>درگاه پرداخت آنلاین</option>
                                    <option>کیف پول</option>
                                    <option>کارت به کارت</option>
                                </select>
                            </div>
                            <div className="flex justify-between mt-6">
                                <button
                                    type="button"
                                    onClick={() => setShowPaymentModal(false)}
                                    className="px-4 py-2 bg-light-color1 dark:bg-color1 text-light-color7 dark:text-color7 rounded-lg hover:bg-light-color6 dark:hover:bg-color5 transition-colors"
                                >
                                    انصراف
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                                >
                                    تایید و پرداخت
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ChatInterface;