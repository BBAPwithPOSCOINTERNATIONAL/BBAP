import create from 'zustand';
import {Cafe, CafeMenus} from "../api/cafeAPI.tsx";
import { devtools } from 'zustand/middleware';


interface RoomStore {
  currentCafe: Cafe | undefined;
  currentCafeMenuList: CafeMenus | undefined;

  setCafe: (cafe: Cafe) => void;
  setCafeMenus: (menus: CafeMenus) => void;

}

// Define the store
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
export const useRoomStore = create<RoomStore>(devtools((set) => ({
  currentCafe: undefined,
  currentCafeMenuList: undefined,

  setCafe: (cafe) => set({ currentCafe: cafe }),
  setCafeMenus: (menus) => set({ currentCafeMenuList: menus }),

  // Define other initial states and actions as needed
})));

// Now, in your component, you can use this store
// const { currentCafe, currentCafeMenuList, setCafe, setCafeMenus } = useRoomStore()
