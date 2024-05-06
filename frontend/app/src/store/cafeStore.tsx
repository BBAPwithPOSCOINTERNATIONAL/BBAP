import { create } from "zustand";
import { CafeMenuItem } from "../api/cafeAPI";

interface CafeStore {
  menuData: CafeMenuItem[] | null;
  setMenuData: (data: CafeMenuItem[]) => void;
  selectedItem: CafeMenuItem | null;
  setSelectedItem: (item: CafeMenuItem | null) => void;
}

const useCafe = create<CafeStore>((set) => ({
  menuData: null,
  setMenuData: (data) => set({ menuData: data }),
  selectedItem: null,
  setSelectedItem: (item) => set({ selectedItem: item }),
}));

export default useCafe;
