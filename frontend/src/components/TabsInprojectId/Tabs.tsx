'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';

interface Tab {
    id: 'description' | 'details' | 'proposal';
    label: string;
    icon: React.ReactNode;
    content: React.ReactNode;
}

interface TabsProps {
    tabs: Tab[];
}

const Tabs = ({ tabs }: TabsProps) => {
    const [activeTab, setActiveTab] = useState(tabs[0].id);

    return (
        <div className="bg-light-color5 dark:bg-color5">
            <div className="border-b border-light-color6 dark:border-color6 overflow-x-auto">
                <nav className="flex gap-4 sm:gap-6 min-w-max">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`pb-3 sm:pb-4 px-1 flex items-center gap-1 sm:gap-2 text-sm sm:text-base transition-colors ${
                                activeTab === tab.id
                                    ? 'border-b-2 border-light-color4 dark:border-color4 text-light-color4 dark:text-color4'
                                    : 'text-light-color7 dark:text-color7 hover:text-light-color3 dark:hover:text-color3'
                            }`}
                        >
                            {tab.icon}
                            {tab.label}
                        </button>
                    ))}
                </nav>
            </div>

            <div className="pt-4 sm:pt-6">
                <motion.div
                    key={activeTab}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                >
                    {tabs.find((tab) => tab.id === activeTab)?.content}
                </motion.div>
            </div>
        </div>
    );
};

export default Tabs;