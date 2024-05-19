import React from "react";

interface MealTypeSelectorProps {
  mealTypes: number[];
  mealTypeDisplayNames: Record<number, string>;
  mealType: number;
  setMealType: (type: number) => void;
}

const MealTypeSelector: React.FC<MealTypeSelectorProps> = ({
  mealTypes,
  mealTypeDisplayNames,
  mealType,
  setMealType,
}) => (
  <div className="mx-1 flex flex-wrap justify-start">
    {mealTypes.map((type) => (
      <button
        key={type}
        onClick={() => setMealType(type)}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
        className={`m-1 font-hyemin-bold py-2 px-1 rounded-full w-16 h-8 ${
          mealType === type ? "bg-[#739DB5] text-white" : "bg-[#E2F1FF]"
        }`}
      >
        {mealTypeDisplayNames[type]}
      </button>
    ))}
  </div>
);

export default MealTypeSelector;
