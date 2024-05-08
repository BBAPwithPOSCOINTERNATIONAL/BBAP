import React from "react";
import { Cafe } from "../../api/cafeAPI";

interface CafeSelectorProps {
  cafeList: Cafe[];
  selectedCafeId: string;
  handleCafeSelect: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const CafeSelector: React.FC<CafeSelectorProps> = ({
  cafeList,
  selectedCafeId,
  handleCafeSelect,
}) => {
  return (
    <div className="sticky top-[105px] bg-white flex flex-col w-full items-center z-20">
      <select
        id="cafe-select"
        value={selectedCafeId}
        onChange={handleCafeSelect}
        className="bg-primary-color text-white border rounded-md p-1 w-11/12 font-hyemin-bold text-center flex justify-center items-center h-9"
      >
        {cafeList.map((cafe) => (
          <option key={cafe.id} value={cafe.id}>
            {cafe.name}({cafe.workPlaceName})
          </option>
        ))}
      </select>
    </div>
  );
};

export default CafeSelector;
