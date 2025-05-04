"use client";
import React, { useState, useEffect } from 'react';
import { Bell, Check, X, AlertCircle, Users, Briefcase, MessageSquare, Wallet, ArrowRight } from 'lucide-react';
import axios from 'axios';
import API from "@/components/utils/api";
import Success from "@/components/Toast/success";
import {api} from "@/components/lib/api";

const NotificationType = {
    PROJECT_INVITE: 'project_invite',
    PAYMENT: 'payment',
    MESSAGE: 'message',
    REVIEW: 'review',
    DEADLINE: 'deadline',
    PROPOSAL_ACCEPTED: 'proposal_accepted',
    SYSTEM: 'system',
};

interface NotificationData {
    id: number;
    type: string;
    title: string;
    message: string;
    time: string;
    read: boolean;
    action: string;
    data: { [key: string]: any };
}

export default function Notification() {
    const [notifications, setNotifications] = useState<NotificationData[]>([]);
    const [unreadCount, setUnreadCount] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');

    const handleShowToast = (message: string) => {
        setToastMessage(message);
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
    };

    useEffect(() => {
        const fetchNotifications = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`${API}/api/notifications`, { withCredentials: true });
                setNotifications(response.data);
                const count = response.data.filter((n: NotificationData) => !n.read).length;
                setUnreadCount(count);
            } catch (err: any) {
                console.error('Error fetching notifications:', err);
                setError('خطا در بارگذاری نوتیفیکیشن‌ها');
            } finally {
                setLoading(false);
            }
        };
        fetchNotifications();
    }, []);

    const markAllAsRead = async () => {
        try {
            await api.put('/api/notifications/mark-all-read', {}, { withCredentials: true });
            setNotifications(notifications.map((n) => ({ ...n, read: true })));
            setUnreadCount(0);
            handleShowToast('همه نوتیفیکیشن‌ها به عنوان خوانده‌شده علامت‌گذاری شدند');
        } catch (err) {
            console.error('Error marking all as read:', err);
            handleShowToast('خطا در علامت‌گذاری همه نوتیفیکیشن‌ها');
        }
    };

    const markAsRead = async (id: number) => {
        try {
            await api.put('/api/notifications/${id}/mark-read', {}, { withCredentials: true });
            setNotifications(notifications.map((n) => (n.id === id ? { ...n, read: true } : n)));
            setUnreadCount((prev) => Math.max(0, prev - 1));
            handleShowToast('نوتیفیکیشن به عنوان خوانده‌شده علامت‌گذاری شد');
        } catch (err) {
            console.error('Error marking as read:', err);
            handleShowToast('خطا در علامت‌گذاری نوتیفیکیشن');
        }
    };

    const removeNotification = async (id: number) => {
        try {
            await api.delete('/api/notifications/${id}', { withCredentials: true });
            const notif = notifications.find((n) => n.id === id);
            setNotifications(notifications.filter((n) => n.id !== id));
            if (!notif?.read) {
                setUnreadCount((prev) => Math.max(0, prev - 1));
            }
            handleShowToast('نوتیفیکیشن با موفقیت حذف شد');
        } catch (err) {
            console.error('Error removing notification:', err);
            handleShowToast('خطا در حذف نوتیفیکیشن');
        }
    };

    const getNotificationIcon = (type: string) => {
        switch (type) {
            case NotificationType.PROJECT_INVITE:
                return <Users className="text-color4 dark:text-color4" size={20} />;
            case NotificationType.PAYMENT:
                return <Wallet className="text-color4 dark:text-color4" size={20} />;
            case NotificationType.MESSAGE:
                return <MessageSquare className="text-color4 dark:text-color4" size={20} />;
            case NotificationType.REVIEW:
                return <Check className="text-color4 dark:text-color4" size={20} />;
            case NotificationType.DEADLINE:
                return <AlertCircle className="text-color4 dark:text-color4" size={20} />;
            case NotificationType.PROPOSAL_ACCEPTED:
                return <Briefcase className="text-color4 dark:text-color4" size={20} />;
            default:
                return <Bell className="text-color4 dark:text-color4" size={20} />;
        }
    };

    const handleActionClick = (notification: NotificationData) => {
        // منطق برای هدایت به صفحه مرتبط با نوتیفیکیشن
        switch (notification.type) {
            case NotificationType.PROJECT_INVITE:
            case NotificationType.DEADLINE:
            case NotificationType.PROPOSAL_ACCEPTED:
                window.location.href = `/projects/${notification.data.projectId}`;
                break;
            case NotificationType.PAYMENT:
                window.location.href = `/transactions/${notification.data.transactionId}`;
                break;
            case NotificationType.MESSAGE:
                window.location.href = `/chat/${notification.data.chatId}`;
                break;
            default:
                console.log('No action defined for this notification type');
        }
        markAsRead(notification.id);
    };

    if (loading) {
        return <div className="p-4 text-center text-light-color7 dark:text-color7">در حال بارگذاری...</div>;
    }

    if (error) {
        return <div className="p-4 text-center text-red-500">{error}</div>;
    }

    return (
        <div className="bg-light-color1 dark:bg-color1 rounded-lg shadow-lg border border-light-color6 dark:border-color5 p-4">
            {showToast && <Success showToast={() => setShowToast(false)} text={toastMessage} />}
            <div className="flex justify-between items-center mb-4">
                <h3 className="font-primaryMedium text-lg text-light-color2 dark:text-color2">نوتیفیکیشن‌ها</h3>
                <div className="flex space-x-2 rtl:space-x-reverse">
                    {unreadCount > 0 && (
                        <button
                            onClick={markAllAsRead}
                            className="text-xs text-light-color4 dark:text-color4 hover:underline"
                        >
                            علامت‌گذاری همه به عنوان خوانده‌شده
                        </button>
                    )}
                </div>
            </div>

            <div className="divide-y divide-light-color6 dark:divide-color5">
                {notifications.length === 0 ? (
                    <div className="p-4 text-center text-light-color7 dark:text-color7">نوتیفیکیشنی موجود نیست</div>
                ) : (
                    notifications.map((notification) => (
                        <div
                            key={notification.id}
                            className={`p-4 flex gap-3 hover:bg-light-color5 dark:hover:bg-color5 transition-colors ${
                                notification.read ? '' : 'bg-light-color5/50 dark:bg-color5/50'
                            }`}
                        >
                            <div className="mt-1 w-8 h-8 rounded-full flex items-center justify-center bg-light-color5 dark:bg-color6">
                                {getNotificationIcon(notification.type)}
                            </div>

                            <div className="flex-1">
                                <div className="flex justify-between items-start">
                                    <h4 className="font-primaryMedium text-sm text-light-color2 dark:text-color2">
                                        {notification.title}
                                    </h4>
                                    <div className="flex items-center space-x-1 rtl:space-x-reverse">
                                        <button
                                            onClick={() => removeNotification(notification.id)}
                                            className="text-light-color7 dark:text-color7 hover:text-light-color3 dark:hover:text-color3"
                                        >
                                            <X size={16} />
                                        </button>
                                    </div>
                                </div>

                                <p className="text-sm text-light-color3 dark:text-color3 mt-1">{notification.message}</p>

                                <div className="flex justify-between items-center mt-2">
                                    <span className="text-xs text-light-color7 dark:text-color7">{notification.time}</span>
                                    <button
                                        onClick={() => handleActionClick(notification)}
                                        className="text-xs flex items-center text-light-color4 dark:text-color4 hover:text-light-color8 dark:hover:text-color8 transition-colors font-primaryMedium"
                                    >
                                        {notification.action}
                                        <ArrowRight size={14} className="mr-1 rtl:ml-1 rtl:mr-0" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}