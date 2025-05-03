import React from 'react';
import { BarChart3, Briefcase, Calendar, User, Users } from "lucide-react";

export default function DashboardAd() {
    return (
        <div className="w-full animate-fade animate-once animate-duration-500 animate-ease-in">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
                {[
                    {
                        title: "تعداد کاربران",
                        icon: <Users size={18} />,
                        value: "8,249",
                        change: "+12%"
                    },
                    {
                        title: "درآمد کل",
                        icon: <BarChart3 size={18} />,
                        value: "25,430,000 تومان",
                        change: "+8%"
                    },
                    {
                        title: "پروژه‌های فعال",
                        icon: <Briefcase size={18} />,
                        value: "145",
                        change: "+24%"
                    }
                ].map((card, index) => (
                    <div
                        key={card.title}
                        className="bg-color5 p-6 rounded-xl shadow-md transition-all duration-300 hover:scale-105 hover:shadow-lg"
                        style={{ animationDelay: `${index * 100}ms` }}
                    >
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="font-primaryDemibold text-color2 transition-colors duration-200 hover:text-color4">
                                {card.title}
                            </h3>
                            <div className="bg-color1 p-2 rounded-full text-color4 transition-transform duration-200 hover:rotate-12">
                                {card.icon}
                            </div>
                        </div>
                        <p className="text-3xl font-primaryBold text-color2 animate-fade-up animate-once animate-duration-500">
                            {card.value}
                        </p>
                        <div className="flex items-center mt-2 text-color4 text-sm">
                            <span className="mr-1 ml-2 animate-pulse">{card.change}</span>
                            <span className="text-color7">از ماه گذشته</span>
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="bg-color5 p-6 rounded-xl shadow-md lg:col-span-2 transition-all duration-300 hover:shadow-xl">
                    <h3 className="font-primaryDemibold text-color2 mb-4">فعالیت اخیر</h3>
                    <div className="space-y-4">
                        {[1, 2, 3, 4].map((item) => (
                            <div
                                key={item}
                                className="flex items-center p-3 bg-color6 rounded-lg transition-all duration-200 hover:bg-color1 hover:-translate-y-1 group cursor-pointer"
                            >
                                <div className="w-10 h-10 ml-2.5 rounded-full bg-color4 flex items-center justify-center text-color1 mr-3 transition-transform duration-200 group-hover:scale-110">
                                    <User size={16} />
                                </div>
                                <div>
                                    <p className="font-primaryMedium text-color2 transition-colors duration-200 group-hover:text-color4">
                                        ثبت کاربر جدید
                                    </p>
                                    <p className="text-color7 text-sm">14 دقیقه پیش</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-color5 p-6 rounded-xl shadow-md transition-all duration-300 hover:shadow-xl">
                    <h3 className="font-primaryDemibold text-color2 mb-4">رویدادهای آینده</h3>
                    <div className="space-y-4">
                        {[1, 2, 3].map((item) => (
                            <div
                                key={item}
                                className="flex p-3 border-r-4 border-color4 bg-color6 rounded-r-lg transition-all duration-200 hover:bg-color1 hover:border-color2"
                            >
                                <div>
                                    <p className="font-primaryMedium text-color2 transition-colors duration-200 hover:text-color4">
                                        جلسه با تیم طراحی
                                    </p>
                                    <div className="flex items-center text-color7 text-sm mt-1 transition-opacity duration-200 hover:opacity-80">
                                        <Calendar size={14} className="mr-1 ml-2.5 animate-spin animate-duration-[3000ms]" />
                                        <span>یکشنبه، 14 مهر</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}