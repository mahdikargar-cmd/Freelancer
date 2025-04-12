"use client"
import { useState, useEffect, useRef } from "react";

const ChatInterface = () => {
    const [messages, setMessages] = useState([
        { id: 1, sender: "client", text: "سلام، پروژه شما رو دیدم و می‌خواستم بیشتر در موردش صحبت کنیم", time: "10:30" },
        { id: 2, sender: "freelancer", text: "سلام، خوشحالم که علاقه‌مند شدید. چه سوالی دارید؟", time: "10:32" },
        { id: 3, sender: "client", text: "زمان تحویل پروژه چقدر هست؟", time: "10:33" },
    ]);
    const [newMessage, setNewMessage] = useState("");
    // تعیین نوع برای رفرنس: HTMLDivElement برای المان <div> که حاوی پیام‌هاست.
    const chatContainerRef = useRef<HTMLDivElement>(null);

    // Auto-scroll to bottom when new messages arrive
    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [messages]);

    // تعیین نوع پارامتر e به عنوان رویداد فرم
    const handleSendMessage = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (newMessage.trim() === "") return;

        const newMsg = {
            id: messages.length + 1,
            sender: "freelancer",
            text: newMessage,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };

        setMessages([...messages, newMsg]);
        setNewMessage("");
    };

    return (
        <div className="max-w-4xl mx-auto my-8 px-4">
            <div className="bg-light-color5 dark:bg-color5 rounded-2xl shadow-lg overflow-hidden">
                {/* Chat header */}
                <div className="bg-light-color1 dark:bg-color1 p-4 border-b border-light-color6 dark:border-color5 flex justify-between items-center">
                    <div className="flex items-center space-x-3">
                        <div className="flex w-10 h-10 rounded-full bg-light-color4 dark:bg-color4 items-center justify-center overflow-hidden">
                            <img
                                src="/api/placeholder/100/100"
                                alt="کاربر"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div className="mr-3">
                            <h3 className="font-primaryMedium dark:text-color2 text-light-color2">محمد رضایی</h3>
                            <p className="text-xs text-light-color7 dark:text-color7">آنلاین</p>
                        </div>
                    </div>
                    <div className="flex space-x-2">
                        <button className="p-2 rounded-full hover:bg-light-color6 dark:hover:bg-color5 transition-colors">
                            {/* SVG icons */}
                        </button>
                        <button className="p-2 rounded-full hover:bg-light-color6 dark:hover:bg-color5 transition-colors">
                            {/* SVG icons */}
                        </button>
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
                            className={`flex ${message.sender === 'freelancer' ? 'justify-end' : 'justify-start'}`}
                        >
                            <div
                                className={`max-w-xs md:max-w-md rounded-2xl p-3 ${
                                    message.sender === 'freelancer'
                                        ? 'bg-light-color4 dark:bg-color4 text-light-color2 dark:text-color1'
                                        : 'bg-light-color1 dark:bg-color5 text-light-color2 dark:text-color2'
                                }`}
                            >
                                <p className="text-sm">{message.text}</p>
                                <span className={`text-xs mt-1 block text-right ${
                                    message.sender === 'freelancer'
                                        ? 'text-light-color2 dark:text-color1'
                                        : 'text-light-color7 dark:text-color7'
                                }`}>
                  {message.time}
                </span>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Chat input */}
                <div className="bg-light-color1 dark:bg-color1 p-4 border-t border-light-color6 dark:border-color5">
                    <form onSubmit={handleSendMessage} className="flex items-center">
                        <button type="button" className="p-2 rounded-full hover:bg-light-color6 dark:hover:bg-color5 transition-colors">
                            {/* SVG icons */}
                        </button>
                        <button type="button" className="p-2 rounded-full hover:bg-light-color6 dark:hover:bg-color5 transition-colors mx-1">
                            {/* SVG icons */}
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
                            {/* SVG icons */}
                        </button>
                    </form>
                </div>
            </div>

            {/* Project info card */}
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
                        <span className="bg-light-color4 dark:bg-color4 text-light-color2 dark:text-color1 px-2 py-1 rounded-md text-xs">در حال مذاکره</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChatInterface;
