import React from "react";
import { Restaurant } from "../../api/restaurantAPI";

interface RestaurantSelectorProps {
  restaurant: number;
  restaurantList: Restaurant[];
  setRestaurant: (id: number) => void;
  rendering: (id: number) => void;
}

const RestaurantSelector: React.FC<RestaurantSelectorProps> = ({
  restaurant,
  restaurantList,
  setRestaurant,
  rendering,
}) => (
  <select
    className="font-hyemin-bold bg-blue-200 w-11/12 text-lg h-9 text-center rounded-md mt-2"
    value={restaurant}
    onChange={(e) => {
      const id = parseInt(e.target.value);
      setRestaurant(id);
      rendering(id);
      localStorage.setItem("restaurantId", e.target.value);
    }}
  >
    {restaurantList?.map((r) => (
      <option key={r.restaurantId} value={r.restaurantId}>
        {r.restaurantName}({r.workplaceName})
      </option>
    ))}
  </select>
);

export default RestaurantSelector;
