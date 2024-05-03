import { create } from "zustand";
import { MenuItem } from "../components/cafe/MenuSection";

interface CafeStore {
  menuData: MenuItem[] | null;
  setMenuData: (data: MenuItem[]) => void;
  selectedItem: MenuItem | null;
  setSelectedItem: (item: MenuItem | null) => void;
}

const useCafe = create<CafeStore>((set) => ({
  menuData: null,
  setMenuData: (data) => set({ menuData: data }),
  selectedItem: null,
  setSelectedItem: (item) => set({ selectedItem: item }),
}));

export default useCafe;
