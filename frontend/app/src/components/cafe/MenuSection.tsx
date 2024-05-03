import { forwardRef } from "react";
import { useNavigate } from "react-router-dom";
import useCafe from "../../store/cafeStore"; // 스토어 임포트

// Assuming the MenuItem interface is defined elsewhere and imported accordingly.
// export interface MenuItem {
//   name: string;
//   temperature?: string[];
//   size?: Partial<Record<string, number>>;
//   description: string;
//   price: number;
//   images: string;
//   options?: Record<string, number>;
// }

export interface Choice {
  choice_name: string;
  price: number;
}
export interface Option {
  option_name: string;
  type: string;
  required: boolean;
  choices: Choice[];
}
export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  options: Option[];
}

interface MenuSectionProps {
  items: MenuItem[];
  title: string;
}

const MenuSection = forwardRef<HTMLDivElement, MenuSectionProps>(
  ({ items, title }, ref) => {
    const navigate = useNavigate();
    const setSelectedItem = useCafe((state) => state.setSelectedItem);

    const handleItemClick = (item: MenuItem) => {
      setSelectedItem(item);
      navigate("/detail");
    };

    return (
      <div ref={ref}>
        <div className="mt-2">
          <h2 className="sticky top-[345px] z-0 bg-bg-color text-white py-2 p-4 w-full font-hyemin-bold text-lg">
            {title} 메뉴
          </h2>
          <ul className="list-none p-0">
            {items.map((item, index) => {
              const tempOption = item.options.find(
                (option) => option.option_name === "온도"
              );
              const tempChoices =
                tempOption &&
                tempOption.choices.map((choice) => choice.choice_name);
              return (
                <li
                  key={index}
                  onClick={() => handleItemClick(item)}
                  className="flex items-center mb-5 border border-gray-300 p-2.5 rounded-lg font-hyemin-bold"
                >
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="w-1/5 mr-2.5 rounded-md"
                  />
                  <div className="flex-grow">
                    <h3 className="mb-1.5 text-lg font-hyemin-bold">
                      {item.name}
                      {tempChoices?.length === 1 &&
                        tempChoices?.includes("ICE") &&
                        " (only ICE)"}
                      {tempChoices?.length === 1 &&
                        tempChoices?.includes("HOT") &&
                        " (only HOT)"}
                    </h3>
                    <p className="text-sm text-gray-600 font-hyemin-regular">
                      {item.description}
                    </p>
                  </div>
                  <div className="min-w-[100px] text-right font-hyemin-bold">
                    <h3 className="text-lg font-semibold">
                      {item.price.toLocaleString()}원
                    </h3>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    );
  }
);

export default MenuSection;
