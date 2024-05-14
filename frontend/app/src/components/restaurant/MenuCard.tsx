import React from "react";
import { Menu } from "../../api/restaurantAPI";
import { IoMdPerson } from "react-icons/io";

interface MenuCardProps {
  menu: Menu;
}

const MenuCard: React.FC<MenuCardProps> = ({ menu }) => (
  <div className="flex flex-col bg-white border-2 shadow-sm rounded-md dark:bg-neutral-900 dark:border-neutral-900 dark:shadow-neutral-700/70 h-full">
    <div className="flex gap-[1px] bg-[#739DB5] text-white border rounded-t-md py-2 px-4 md:py-4 md:px-5 dark:bg-neutral-900 dark:border-neutral-700">
      <h1 className="text-lg mx-auto font-hyemin-bold dark:text-white text-center">
        {menu.menuName}
      </h1>
      <IoMdPerson className="text-lg mr-1 mt-1 font-hyemin-bold dark:text-white align-center" />
      <h1 className="text-lg mr-1rem font-hyemin-bold dark:text-white text-center">
        {menu.eatCount}
      </h1>
    </div>
    <div className="flex-grow p-1 md:p-1">
      {menu.menuImage && (
        <img
          src={menu.menuImage}
          alt="Menu"
          className="w-4/5 h-auto my-1 border flex mx-auto"
          style={{ maxHeight: "200px" }}
        />
      )}
      <p className="mt-2 text-center bg-[#E2F1FF] p-2 rounded-md text-sm text-gray-800 dark:text-neutral-400">
        {menu.menuDetail}
      </p>
    </div>
    <hr className="h-1" />
    <div className="font-bold bg-[#739DB5] text-white rounded-b-md py-1 px-4 md:py-4 md:px-5 dark:bg-neutral-900 dark:border-neutral-700">
      <p className="mt-1 text-lg text-center">{menu.menuPrice} 원</p>
    </div>
  </div>
);

export default MenuCard;
