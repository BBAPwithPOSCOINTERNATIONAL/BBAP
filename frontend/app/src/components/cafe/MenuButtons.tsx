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
    <div className="sticky z-0 bg-white flex space-x-4 m-2 font-hyemin-bold">
      <button
        onClick={() => onSelectMenu("coffee")}
        className={`rounded-full px-4 py-3 ${
          selectedMenu === "coffee" ? "bg-bg-color text-white" : "bg-[#E2F1FF]"
        }`}
      >
        커피
      </button>
      <button
        onClick={() => onSelectMenu("beverage")}
        className={`rounded-full px-4 py-3 ${
          selectedMenu === "beverage"
            ? "bg-bg-color text-white"
            : "bg-[#E2F1FF]"
        }`}
      >
        음료
      </button>
      <button
        onClick={() => onSelectMenu("dessert")}
        className={`rounded-full px-4 py-3  ${
          selectedMenu === "dessert" ? "bg-bg-color text-white" : "bg-[#E2F1FF]"
        }`}
      >
        디저트
      </button>
    </div>
  );
};

export default MenuButtons;
