import React, { useState } from "react";

// CafeSelector 컴포넌트 정의
const CafeSelector: React.FC = () => {
  const [selectedCafe, setSelectedCafe] = useState("A카페");
  const cafes = [
    { value: "A카페", label: "A카페" },
    { value: "B카페", label: "B카페" },
    { value: "C카페", label: "C카페" },
  ];

  const handleCafeSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCafe(e.target.value);
  };

  return (
    <div className="mt-2 flex flex-col items-center">
      <select
        id="cafe-select"
        value={selectedCafe}
        onChange={handleCafeSelect}
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
