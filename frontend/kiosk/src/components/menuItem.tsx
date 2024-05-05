import React from "react";
import { Menu } from "../types";
import useModalStore from "../store/modalStore";

interface MenuItemProps {
  menuItemData: Menu;
}

const MenuItem: React.FC<MenuItemProps> = ({ menuItemData }) => {
  const { openMenuModal } = useModalStore();
  const tempOption = menuItemData.options.find(
    (option) => option.optionName === "온도"
  );
  const tempChoices = tempOption && tempOption.choice.map((c) => c.choiceName);
  

  return (
    <div
      id="menu-item"
      className="relative rounded-2xl shadow-xl h-[250px] m-4 p-4 flex flex-col bg-[#F5F5F5]"
      onClick={() => {
        openMenuModal(menuItemData);
      }}
    >
      {tempChoices && (
        <div className="flex justify-start space-x-3 text-2xs font-bold mb-2">
          {tempChoices.map((item, index) => {
            if (item === "HOT") {
              return (
                <p className="text-red-500" key={index}>
                  {item} {tempChoices.length == 1 && "Only"}
                </p>
              );
            } else if (item === "ICE") {
              return (
                <p className="text-blue-500" key={index}>
                  {item} {tempChoices.length == 1 && "Only"}
                </p>
              );
            }
          })} 
        </div>
      )}
      <img
        src={menuItemData.imageUrl}
        alt={menuItemData.name}
        className="w-1/2 absolute top-14 left-14"
      />
      <div id="menu-info" className="absolute w-full pr-4 bottom-1">
        <p className="text-xs break-keep font-bold">{menuItemData.name}</p>
        <p className="text-xs text-end font-bold pr-4">
          {menuItemData.price.toLocaleString()} 원
        </p>
      </div>
    </div>
  );
};

export default MenuItem;
