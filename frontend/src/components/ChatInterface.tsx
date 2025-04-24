"use client";
import React, { useState, useEffect, useRef, useCallback } from "react";
import { useAuth } from "@/components/lib/useAuth";
import Cookies from "js-cookie";
import axios from "axios";
import { api } from "@/components/lib/api";

interface Message {
    id: number;
    sender: string; // "freelancer" 或 "employer"
    content: string;
    time: string;
}

interface Project {
    id: number;
    subject: string;
    priceStarted: number;
    priceEnded: number;
    deadline: number;
    status: string;
    freelancerId?: number;
}

interface Profile {
    firstName: string;
    lastName: string;
    profileImageUrl?: string;
    phoneNumber?: string;
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
    const [project, setProject] = useState<Project | null>(null);
    const [freelancerProfile, setFreelancerProfile] = useState<Profile | null>(null);
    const [ws, setWs] = useState<WebSocket | null>(null);
    const [isReceiverOnline, setIsReceiverOnline] = useState<boolean>(false);

    const chatContainerRef = useRef<HTMLDivElement>(null);
    const userMenuRef = useRef<HTMLDivElement>(null);
    const wsRef = useRef<WebSocket | null>(null);

    useEffect(() => {
        const fetchProject = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/app/${projectId}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                let projectData = response.data;
                // تبدیل createdDate از آرایه به رشته
                if (Array.isArray(projectData.createdDate)) {
                    const [year, month, day] = projectData.createdDate;
                    projectData.createdDate = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
                }
                projectData = { ...projectData, freelancerId: receiverId };
                console.log("Project API Response:", projectData);
                setProject(projectData);
                setError(null);
            } catch (err) {
                console.error("Error fetching project:", err);
                setError("خطا در دریافت اطلاعات پروژه.");
            }
        };

        if (projectId && token) {
            fetchProject();
        } else {
            setError("اطلاعات پروژه یا توکن نامعتبر است.");
        }
    }, [projectId, token, receiverId]);

    useEffect(() => {
        const fetchFreelancerProfile = async () => {
            try {
                const response = await api.get(`/api/profileByUserId/${receiverId}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                console.log("Freelancer Profile API Response:", response.data);
                if (response.data.status === "not_found") {
                    setFreelancerProfile({
                        firstName: "نامشخص",
                        lastName: "",
                    });
                } else {
                    setFreelancerProfile({
                        firstName: response.data.firstName || "نامشخص",
                        lastName: response.data.lastName || "",
                        profileImageUrl: response.data.profileImageUrl,
                        phoneNumber: response.data.phoneNumber,
                    });
                }
                setError(null);
            } catch (err) {
                console.error("Error fetching freelancer profile:", err);
                setError("خطا در دریافت اطلاعات پروفایل فریلنسر.");
                setFreelancerProfile({
                    firstName: "نامشخص",
                    lastName: "",
                });
            }
        };

        if (receiverId && token) {
            fetchFreelancerProfile();
        }
    }, [receiverId, token]);

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const response = await api.get(`/app/messages?projectId=${projectId}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                console.log("Messages API Response:", response.data);

                if (!Array.isArray(response.data)) {
                    console.error("Unexpected API response format: Expected an array");
                    setError("فرمت پاسخ API نامعتبر است.");
                    return;
                }

                setMessages(
                    response.data
                        .sort((a, b) => new Date(a.time).getTime() - new Date(b.time).getTime()) // مرتب‌سازی بر اساس زمان
                        .map((msg: any) => {
                            if (!msg.id || !msg.content || !msg.sender) {
                                console.error("Invalid message structure:", msg);
                                return {
                                    id: msg.id || Date.now(),
                                    sender: "unknown",
                                    content: msg.content || "پیام نامعتبر",
                                    time: "نامعتبر",
                                };
                            }

                            const time = msg.time ? new Date(msg.time) : new Date();
                            if (isNaN(time.getTime())) {
                                console.error("Invalid time format:", msg.time);
                                return {
                                    id: msg.id,
                                    sender: receiverId === msg.sender.id ? "freelancer" : "employer",
                                    content: msg.content,
                                    time: "نامعتبر",
                                };
                            }

                            return {
                                id: msg.id,
                                sender: receiverId === msg.sender.id ? "freelancer" : "employer",
                                content: msg.content,
                                time: time.toLocaleTimeString("fa-IR", {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                }),
                            };
                        })
                );
                setError(null);
            } catch (error: any) {
                console.error("Error fetching messages:", error.response?.data || error.message);
                setError("خطا در بارگذاری پیام‌ها: " + (error.response?.data?.message || error.message));
            }
        };

        if (projectId && token && project) {
            fetchMessages();
        } else {
            console.warn("Missing required dependencies:", { projectId, token, project });
            setError("اطلاعات پروژه یا توکن نامعتبر است.");
        }
    }, [projectId, token, project, receiverId]);

    useEffect(() => {
        const fetchOnlineStatus = async () => {
            try {
                const response = await api.get(`/app/isUserOnline/${receiverId}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setIsReceiverOnline(response.data.online);
            } catch (err) {
                console.error("Error fetching online status:", err);
                setIsReceiverOnline(false);
            }
        };

        if (receiverId && token) {
            fetchOnlineStatus();
            const interval = setInterval(fetchOnlineStatus, 30000);
            return () => clearInterval(interval);
        }
    }, [receiverId, token]);

    useEffect(() => {
        if (!userId || !token || !projectId || !receiverId) {
            setError("لطفاً وارد حساب کاربری شوید یا پروژه را انتخاب کنید.");
            return;
        }

        let pingInterval: NodeJS.Timeout | null = null;
        let reconnectAttempts = 0;
        const maxReconnectAttempts = 5;

        const connectWebSocket = () => {
            // اگر اتصال باز است، از ایجاد اتصال جدید جلوگیری کنید
            if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
                console.log("WebSocket already connected, skipping new connection");
                return;
            }

            if (reconnectAttempts >= maxReconnectAttempts) {
                setError("تلاش برای اتصال مجدد به سرور ناموفق بود. لطفاً صفحه را رفرش کنید.");
                return;
            }

            try {
                const websocket = new WebSocket(
                    `ws://localhost:8080/ws/chat?userId=${userId}&token=${encodeURIComponent(token)}`
                );
                wsRef.current = websocket;
                setWs(websocket);

                websocket.onopen = () => {
                    console.log("WebSocket connected");
                    setError(null);
                    reconnectAttempts = 0;
                    pingInterval = setInterval(() => {
                        if (websocket.readyState === WebSocket.OPEN) {
                            websocket.send(JSON.stringify({ type: "ping" }));
                        }
                    }, 10000); // کاهش فاصله پینگ به 10 ثانیه
                };

                websocket.onmessage = (event) => {
                    try {
                        const data = JSON.parse(event.data);
                        console.log("Received WebSocket message:", JSON.stringify(data, null, 2));

                        if (data.type === "message" || data.type === "sent") {
                            const receivedMessage = data.data.message; // تغییر به data.message
                            console.log("Received message data:", receivedMessage);
                            if (!receivedMessage || !receivedMessage.time) {
                                console.warn("Message missing time field:", receivedMessage);
                                return;
                            }

                            const time = new Date(receivedMessage.time);
                            if (isNaN(time.getTime())) {
                                console.error("Invalid time format:", receivedMessage.time);
                                return;
                            }

                            setMessages((prevMessages) => [
                                ...prevMessages,
                                {
                                    id: receivedMessage.id,
                                    sender: receiverId === receivedMessage.sender.id ? "freelancer" : "employer",
                                    content: receivedMessage.content,
                                    time: time.toLocaleTimeString("fa-IR", {
                                        hour: "2-digit",
                                        minute: "2-digit",
                                    }),
                                },
                            ]);
                        } else if (data.type === "connected") {
                            console.log("WebSocket connection confirmed:", data.message);
                        } else if (data.type === "heartbeat" || data.type === "pong") {
                            console.log("Received control message:", data.type);
                        } else if (data.type === "error") {
                            console.error("WebSocket error:", data.message);
                            setError(data.message || "خطایی در ارتباط رخ داد.");
                        }
                    } catch (err) {
                        console.error("Error parsing WebSocket message:", err);
                        setError("خطا در پردازش پیام.");
                    }
                };

                websocket.onclose = (event) => {
                    console.log("WebSocket disconnected", {
                        code: event.code,
                        reason: event.reason,
                        wasClean: event.wasClean,
                        reconnectAttempts,
                        userId,
                        projectId,
                        receiverId,
                    });
                    if (pingInterval) clearInterval(pingInterval);
                    wsRef.current = null;
                    if (!event.wasClean && reconnectAttempts < maxReconnectAttempts) {
                        setError("اتصال WebSocket قطع شد. در حال تلاش برای اتصال مجدد...");
                        reconnectAttempts++;
                        setTimeout(connectWebSocket, Math.min(5000 * reconnectAttempts, 10000));
                    }
                };

                websocket.onerror = (error) => {
                    console.error("WebSocket error:", error);
                    setError("خطا در اتصال WebSocket.");
                };
            } catch (err) {
                console.error("Error creating WebSocket:", err);
                setError("خطا در ایجاد اتصال WebSocket.");
                reconnectAttempts++;
                setTimeout(connectWebSocket, Math.min(3000 * reconnectAttempts, 10000));
            }
        };

        // فقط در صورتی که اتصال وجود ندارد یا بسته شده، اتصال جدید ایجاد کنید
        if (!wsRef.current || wsRef.current.readyState === WebSocket.CLOSED) {
            connectWebSocket();
        }

        return () => {
            // در هنگام unmount، اتصال را به درستی ببندید
            if (pingInterval) clearInterval(pingInterval);
            if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
                wsRef.current.close(1000, "Component unmounted");
                wsRef.current = null;
            }
        };
    }, [userId, token, projectId, receiverId]);


    // 滚动到聊天底部
    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [messages]);

    // 处理点击用户菜单外部
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
                setShowUserMenu(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // 发送消息
    const handleSendMessage = useCallback(
        (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            if (newMessage.trim() === "") {
                setError("لطفاً پیام خود را وارد کنید.");
                return;
            }

            if (!ws || ws.readyState !== WebSocket.OPEN) {
                setError("اتصال با سرور قطع شده است. لطفاً دوباره تلاش کنید.");
                return;
            }

            const messagePayload = {
                type: "message",
                content: newMessage,
                projectId: Number(projectId),
                receiverId: Number(receiverId),
                senderId: Number(userId),
            };

            try {
                ws.send(JSON.stringify(messagePayload));
                setNewMessage("");
                setError(null);
            } catch (err) {
                console.error("Error sending message:", err);
                setError("خطا در ارسال پیام. لطفاً دوباره تلاش کنید.");
            }
        },
        [newMessage, ws, projectId, receiverId, userId]
    );
    // 处理选择自由职业者（将来实现）
    const handleAssignFreelancer = useCallback(async () => {
        try {
            // فرض می‌کنیم یک API برای تخصیص فریلنسر وجود دارد
            await api.post(
                `/app/assignFreelancer`,
                { projectId, freelancerId: receiverId },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setProject((prev) => (prev ? { ...prev, freelancerId: receiverId } : prev));
            alert("فریلنسر با موفقیت انتخاب شد.");
        } catch (err) {
            console.error("Error assigning freelancer:", err);
            setError("خطا در تخصیص فریلنسر.");
        }
    }, [projectId, receiverId, token]);

    const handleBlockUser = useCallback(() => {
        alert("کاربر با موفقیت مسدود شد.");
        setShowUserMenu(false);
    }, []);

    const handlePaymentClick = useCallback(() => {
        setShowPaymentModal(true);
    }, []);

    const handlePaymentSubmit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        alert("پرداخت با موفقیت انجام شد.");
        setShowPaymentModal(false);
    }, []);

    if (!project || !freelancerProfile) {
        return (
            <div className="max-w-4xl mx-auto my-8 px-4">
                {error && <div className="text-red-500 text-center mb-4">{error}</div>}
                <div className="bg-light-color5 dark:bg-color5 rounded-2xl shadow-lg p-6 text-center">
                    <p className="text-light-color7 dark:text-color7">در حال بارگذاری اطلاعات پروژه...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto my-8 px-4">
            {error && <div className="text-red-500 text-center mb-4">{error}</div>}
            <div className="bg-light-color5 dark:bg-color5 rounded-2xl shadow-lg overflow-hidden">
                {/* Chat header */}
                <div className="bg-light-color1 dark:bg-color1 p-4 border-b border-light-color6 dark:border-color5 flex justify-between items-center">
                    <div className="flex items-center space-x-3">
                        <div className="flex w-10 h-10 rounded-full bg-light-color4 dark:bg-color4 items-center justify-center overflow-hidden">
                            {freelancerProfile.profileImageUrl ? (
                                <img
                                    src={`http://localhost:8080/api/profileImages/${freelancerProfile.profileImageUrl}`}
                                    alt="تصویر پروفایل"
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-light-color2 dark:text-color2 bg-light-color6 dark:bg-color6">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-6 w-6"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                        />
                                    </svg>
                                </div>
                            )}
                        </div>
                        <div className="mr-3">
                            <h3 className="font-primaryMedium dark:text-color2 text-light-color2">
                                {freelancerProfile.firstName} {freelancerProfile.lastName}
                            </h3>
                            <p className="text-xs text-light-color7 dark:text-color7">
                                {isReceiverOnline ? "آنلاین" : "آفلاین"}
                            </p>
                        </div>
                    </div>
                    <div className="flex space-x-2 relative">
                        <button
                            onClick={() => setShowUserMenu(!showUserMenu)}
                            className="p-2 rounded-full hover:bg-light-color6 dark:hover:bg-color5 transition-colors"
                            aria-label="منوی کاربر"
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
                                        <button
                                            className="w-full text-right px-4 py-2 text-sm text-light-color2 dark:text-color2 hover:bg-light-color6 dark:hover:bg-color5"
                                        >
                                            گزارش تخلف
                                        </button>
                                    </li>
                                    <li>
                                        <button
                                            onClick={handleAssignFreelancer}
                                            className="w-full text-right px-4 py-2 text-sm text-green-500 hover:bg-light-color6 dark:hover:bg-color5"
                                        >
                                            انتخاب فریلنسر
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
                    {messages.length === 0 ? (
                        <p className="text-center text-light-color7 dark:text-color7">
                            هنوز پیامی وجود ندارد. شروع به چت کنید!
                        </p>
                    ) : (
                        messages.map((message) => (
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
                        ))
                    )}
                </div>

                {/* Chat input */}
                <div className="bg-light-color1 dark:bg-color1 p-4 border-t border-light-color6 dark:border-color5">
                    <form onSubmit={handleSendMessage} className="flex items-center">
                        <button
                            type="button"
                            className="p-2 rounded-full hover:bg-light-color6 dark:hover:bg-color5 transition-colors"
                            aria-label="پیوست فایل"
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
                            aria-label="پیوست تصویر"
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
                            aria-label="ورودی پیام"
                        />
                        <button
                            type="submit"
                            className="bg-light-color4 dark:bg-color4 text-light-color2 dark:text-color1 p-2 rounded-lg hover:bg-light-color8 dark:hover:bg-color8 transition-colors"
                            aria-label="ارسال پیام"
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
                <h3 className="font-primaryMedium text-lg text-light-color2 dark:text-color2 mb-3">
                    اطلاعات پروژه
                </h3>
                <div className="space-y-3">
                    <div className="flex justify-between items-center">
                        <span className="text-light-color7 dark:text-color7">عنوان:</span>
                        <span className="text-light-color2 dark:text-color2">{project.subject}</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-light-color7 dark:text-color7">بودجه:</span>
                        <span className="text-light-color4 dark:text-color4 font-primaryMedium">
                            {project.priceStarted.toLocaleString()} - {project.priceEnded.toLocaleString()} تومان
                        </span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-light-color7 dark:text-color7">مهلت تحویل:</span>
                        <span className="text-light-color2 dark:text-color2">{project.deadline} روز</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-light-color7 dark:text-color7">وضعیت:</span>
                        <span
                            className="bg-light-color4 dark:bg-color4 text-light-color2 dark:text-color1 px-2 py-1 rounded-md text-xs"
                        >
                            {project.status === "OPEN"
                                ? "باز"
                                : project.status === "IN_PROGRESS"
                                    ? "در حال انجام"
                                    : project.status === "COMPLETED"
                                        ? "تکمیل شده"
                                        : project.status === "CANCELLED"
                                            ? "لغو شده"
                                            : "در حال مذاکره"}
                        </span>
                    </div>
                </div>
                <div className="mt-4 flex justify-end">
                    <button
                        onClick={handlePaymentClick}
                        className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition-colors"
                        aria-label="پرداخت پروژه"
                    >
                        پرداخت هزینه
                    </button>
                </div>
            </div>

            {/* Payment Modal */}
            {showPaymentModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-light-color5 dark:bg-color5 rounded-2xl p-6 w-full max-w-md">
                        <h3 className="text-xl font-primaryMedium text-light-color2 dark:text-color2 mb-4">
                            پرداخت پروژه
                        </h3>
                        <form onSubmit={handlePaymentSubmit}>
                            <div className="mb-4">
                                <label className="block text-light-color7 dark:text-color7 mb-2">
                                    مبلغ پرداختی (تومان)
                                </label>
                                <input
                                    type="text"
                                    defaultValue={`${project.priceStarted.toLocaleString()}`}
                                    readOnly
                                    className="w-full p-3 rounded-lg border border-light-color6 dark:border-color5 bg-light-color1 dark:bg-color1 text-light-color2 dark:text-color2"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-light-color7 dark:text-color7 mb-2">روش پرداخت</label>
                                <select
                                    className="w-full p-3 rounded-lg border border-light-color6 dark:border-color5 bg-light-color1 dark:bg-color1 text-light-color2 dark:text-color2"
                                    aria-label="روش پرداخت"
                                >
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
                                    aria-label="انصراف از پرداخت"
                                >
                                    انصراف
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                                    aria-label="تایید و پرداخت"
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