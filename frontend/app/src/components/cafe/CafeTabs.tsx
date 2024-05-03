import React from "react";

interface TabsProps {
  content: string;
  setContent: (content: string) => void;
  tabs: Tab[];
}

// Tab 객체의 타입 정의
interface Tab {
  key: string;
  label: string;
}

const Tabs: React.FC<TabsProps> = ({ content, setContent, tabs }) => {
  return (
    <div className="flex justify-center space-x-4 mt-4">
      {tabs.map((tab) => (
        <a
          key={tab.key}
          href="#"
          className={`font-hyemin-bold py-1 px-4 pt-3 w-full text-center border-b-2 ${
            content === tab.key && "border-blue-700"
          }`}
          onClick={() => setContent(tab.key)}
        >
          {tab.label}
        </a>
      ))}
    </div>
  );
};

export default Tabs;
