'use client'
import { useState } from 'react';

export default function FreelancerDashboard() {
    const [activeTab, setActiveTab] = useState('workspace');
    const [activeProjectTab, setActiveProjectTab] = useState('myProjects');
    const [suggestedProjects, setSuggestedProjects] = useState([
        { title: 'طراحی وبسایت', skills: ['React', 'CSS'] },
        { title: 'برنامه‌نویسی بک‌اند', skills: ['Node.js', 'MongoDB'] },
        { title: 'طراحی رابط کاربری', skills: ['Figma', 'UI/UX'] },
    ]);

    return (
        <div className="min-h-screen bg-black font-primaryRegular p-6 max-w-screen-xl mx-auto rounded-xl my-4">
            <header className="flex justify-evenly items-center p-4 bg-color1 rounded-xl shadow-lg max-w-screen-xl mx-auto">
                <button onClick={() => setActiveTab('workspace')} className={`p-2 ${activeTab === 'workspace' ? 'bg-color4 text-color6' : 'bg-color6 text-color2'} rounded-md`}>اتاق کار</button>
                <button onClick={() => setActiveTab('profile')} className={`p-2 ${activeTab === 'profile' ? 'bg-color4 text-color6' : 'bg-color6 text-color2'} rounded-md`}>پروفایل</button>
            </header>

            {activeTab === 'workspace' && (
                <>
                    <nav className="flex justify-evenly mt-4 bg-color1 p-2 rounded-xl shadow-md">
                        <button onClick={() => setActiveProjectTab('myProjects')} className={`p-2 ${activeProjectTab === 'myProjects' ? 'bg-color4 text-color6' : 'bg-color6 text-color2'} rounded-md`}>پروژه‌های من</button>
                        <button onClick={() => setActiveProjectTab('suggestedProjects')} className={`p-2 ${activeProjectTab === 'suggestedProjects' ? 'bg-color4 text-color6' : 'bg-color6 text-color2'} rounded-md`}>پیشنهادات</button>
                    </nav>

                    {activeProjectTab === 'suggestedProjects' && (
                        <div className="bg-color1 text-color2 p-4 rounded-2xl mt-6 shadow-lg">
                            <h2 className="text-xl font-primaryBold mb-4">پروژه‌های پیشنهادی</h2>
                            {suggestedProjects.length > 0 ? (
                                <ul>
                                    {suggestedProjects.map((project, index) => (
                                        <li key={index} className="text-color7 bg-color6 p-2 rounded-md mb-2">
                                            <h3>{project.title}</h3>
                                            <ul>
                                                {project.skills.map((skill, skillIndex) => (
                                                    <li key={`${index}-${skillIndex}`} className="text-sm text-color4">{skill}</li>
                                                ))}
                                            </ul>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="text-color7">هیچ پروژه‌ای متناسب با مهارت‌های شما یافت نشد.</p>
                            )}
                        </div>
                    )}

                    {activeProjectTab === 'myProjects' && (
                        <div className="bg-color1 text-color2 p-4 rounded-2xl mt-6 shadow-lg">
                            <h2 className="text-xl font-primaryBold mb-4">پروژه های در حال انجام</h2>
                            <p className="text-color7">شما هنوز پروژه‌ای ثبت نکرده‌اید.</p>
                        </div>
                    )}
                </>
            )}

            {activeTab === 'profile' && (
                <div className="bg-color1 text-color2 p-6 rounded-2xl mt-6 shadow-lg grid grid-cols-2 gap-4">
                    <div className="flex flex-col items-center">
                        <div className="w-32 h-32 bg-gray-300 rounded-full flex items-center justify-center text-gray-600 text-xl">
                            عکس پروفایل
                        </div>
                        <button className="mt-2 bg-color4 text-white px-4 py-1 rounded-md text-sm">
                            تغییر عکس
                        </button>
                        <div className="flex gap-6 mt-4">
                            <div className="text-center">
                                <p className="text-lg font-bold">250</p>
                                <p className="text-sm text-gray-400">دنبال‌کننده</p>
                            </div>
                            <div className="text-center">
                                <p className="text-lg font-bold">180</p>
                                <p className="text-sm text-gray-400">دنبال‌شونده</p>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col justify-center">
                        <h2 className="text-xl font-primaryBold mb-2">اطلاعات پروفایل</h2>
                        <p><span >نام:</span> محمد احمدی</p>
                        <p><span >ایمیل:</span> mohamad@example.com</p>
                        <p><span >مهارت‌ها:</span></p>
                        <ul className="flex flex-wrap gap-2 mt-2">
                            <li className="bg-color4 text-black px-2 py-1 rounded-md text-xs">React</li>
                            <li className="bg-color4 text-black px-2 py-1 rounded-md text-xs">Node.js</li>
                            <li className="bg-color4 text-black px-2 py-1 rounded-md text-xs">MongoDB</li>
                            <li className="bg-color4 text-black px-2 py-1 rounded-md text-xs">Tailwind CSS</li>
                        </ul>
                    </div>
                </div>
            )}
        </div>
    );
}
