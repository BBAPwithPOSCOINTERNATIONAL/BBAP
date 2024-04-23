import React from "react";

// CafeSelector 컴포넌트 정의
interface Cafe {
  value: string;
  label: string;
}

// CafeSelector의 props 타입 정의
interface CafeSelectorProps {
  cafes: Cafe[];
  selectedCafe: string;
  onCafeSelect: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

// CafeSelector 컴포넌트 정의
const CafeSelector: React.FC<CafeSelectorProps> = ({
  cafes,
  selectedCafe,
  onCafeSelect,
}) => {
  return (
    <div className="mt-2 flex flex-col items-center">
      <select
        id="cafe-select"
        value={selectedCafe}
        onChange={onCafeSelect}
        className="bg-primary-color text-white border rounded-md p-1 w-11/12 font-hyemin-bold text-center"
      >
        {cafes.map((cafe) => (
          <option key={cafe.value} value={cafe.value}>
            {cafe.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CafeSelector;
