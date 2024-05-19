import React from "react";

interface MenuButtonsProps {
  selectedMenu: string;
  onSelectMenu: (menu: string) => void;
}

const MenuButtons: React.FC<MenuButtonsProps> = ({
  selectedMenu,
  onSelectMenu,
}) => {
  return (
    <div className="sticky z-0 bg-white flex space-x-3 m-2 ml-6 font-hyemin-bold text-base">
      <button
        onClick={() => onSelectMenu("coffee")}
        className={`rounded-full px-4 py-1 text-base ${
          selectedMenu === "coffee" ? "bg-bg-color text-white" : "bg-[#E2F1FF]"
        }`}
      >
        커피
      </button>
      <button
        onClick={() => onSelectMenu("beverage")}
        className={`rounded-full px-4 py-1 text-base ${
          selectedMenu === "beverage"
            ? "bg-bg-color text-white"
            : "bg-[#E2F1FF]"
        }`}
      >
        음료
      </button>
      <button
        onClick={() => onSelectMenu("dessert")}
        className={`rounded-full px-4 py-1 text-base ${
          selectedMenu === "dessert" ? "bg-bg-color text-white" : "bg-[#E2F1FF]"
        }`}
      >
        디저트
      </button>
    </div>
  );
};

export default MenuButtons;
