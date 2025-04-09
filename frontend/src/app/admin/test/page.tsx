'use client'

import CreateCategoryForm from "@/components/CreateCategoryForm";
import Skill from "@/components/Skill";
import { useState } from "react";

const ProjectSetting = () => {
  const [activeTab, setActiveTab] = useState<string>('CreateCategoryForm');

  const tabs = [
    { id: 'CreateCategoryForm', label: ' مدیریت دسته بندی' },
    { id: 'Skill', label: 'مدیریت مهارت ها' },
  ];

  const renderTabContent = (tab: string) => {
    switch (tab) {
      case 'CreateCategoryForm':
        return <CreateCategoryForm />;
      case 'Skill':
        return <Skill />;
      default:
        return <CreateCategoryForm />;
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto mt-10 p-8 bg-color1 rounded-xl text-color2 space-y-8">
      {/* Header tabs */}
      <div className="border-b border-color5 pb-3">
        <ul className="flex gap-8 justify-center">
          {tabs.map((tab) => (
            <li key={tab.id}>
              <button
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-3 text-xl rounded-md transition ease-in-out duration-200 font-primaryRegular ${
                  activeTab === tab.id
                    ? 'bg-color9 text-color1 font-bold'
                    : 'bg-color5 text-color7'
                }`}
              >
                {tab.label}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Content */}
      <div className="bg-color5 p-8 rounded-xl border border-color5 space-y-6">
        {renderTabContent(activeTab)}
      </div>
    </div>
  );
}

export default ProjectSetting;
