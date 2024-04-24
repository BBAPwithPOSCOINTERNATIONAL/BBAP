import React, { forwardRef } from "react";

// Assuming the MenuItem interface is defined elsewhere and imported accordingly.
interface MenuItem {
  name: string;
  price: number;
  description: string;
  images: string;
}

interface MenuSectionProps {
  items: MenuItem[];
  title: string;
}

const MenuSection = forwardRef<HTMLDivElement, MenuSectionProps>(
  ({ items, title }, ref) => {
    return (
      <div ref={ref}>
        <div className="mt-2">
          <h2 className="sticky top-[380px] z-0 bg-bg-color text-white py-2 p-4 w-full font-hyemin-bold">
            {title} 메뉴
          </h2>
          <ul className="list-none p-0">
            {items.map((item, index) => (
              <li
                key={index}
                className="flex items-center mb-5 border border-gray-300 p-2.5 rounded-lg font-hyemin-bold"
              >
                <img
                  src={item.images}
                  alt={item.name}
                  className="w-1/5 mr-2.5 rounded-md"
                />
                <div className="flex-grow">
                  <h3 className="mb-1.5 text-lg font-hyemin-bold">
                    {item.name}
                  </h3>
                  <p className="text-sm text-gray-600 font-hyemin-regular">
                    {item.description}
                  </p>
                </div>
                <div className="min-w-[100px] text-right font-hyemin-bold">
                  <h3 className="text-lg font-semibold">{item.price}원</h3>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
);

export default MenuSection;
