import { forwardRef } from "react";
import { useNavigate } from "react-router-dom";
import useCafe from "../../store/cafeStore"; // 스토어 임포트
import { CafeMenuItem } from "../../api/cafeAPI";

interface MenuSectionProps {
  items: CafeMenuItem[];
  title: string;
}

const MenuSection = forwardRef<HTMLDivElement, MenuSectionProps>(
  ({ items, title }, ref) => {
    const navigate = useNavigate();
    const setSelectedItem = useCafe((state) => state.setSelectedItem);

    const handleItemClick = (item: CafeMenuItem) => {
      setSelectedItem(item);
      navigate("/detail");
    };

    return (
      <div ref={ref}>
        <div>
          <h2 className="sticky top-[328px] z-0 bg-bg-color text-white py-2 p-4 w-full font-hyemin-bold text-lg">
            {title} 메뉴
          </h2>
          <ul className="list-none p-0">
            {items.map((item, index) => {
              const tempOption = item.options.find(
                (option) => option.optionName === "온도"
              );
              const tempChoices =
                tempOption &&
                tempOption.choice.map((choice) => choice.choiceName);
              return (
                <li
                  key={index}
                  onClick={() => handleItemClick(item)}
                  className="flex items-center border border-gray-300 p-2.5 rounded-lg font-hyemin-bold"
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
