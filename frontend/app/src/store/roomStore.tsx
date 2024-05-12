import create from 'zustand';
import {Cafe, CafeMenus} from "../api/cafeAPI.tsx";
import {devtools} from 'zustand/middleware';


export type Employee = {
  empNo: number;
  empName: string;
  isWinner: boolean;
};


interface RoomStore {
  currentCafe: Cafe | undefined;
  currentCafeMenuList: CafeMenus | undefined;
  orderers: Employee[];

  setCafe: (cafe: Cafe) => void;
  setCafeMenus: (menus: CafeMenus) => void;
  setOrderers: (orderers: Employee[]) => void;
  setWinner: (winner: Employee) => void;

}

// Define the store
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
export const useRoomStore = create<RoomStore>(devtools((set) => ({
  currentCafe: undefined,
  currentCafeMenuList: undefined,
  orderers: [],

  setCafe: (cafe) => set({currentCafe: cafe}),
  setCafeMenus: (menus) => set({currentCafeMenuList: menus}),

  setOrderers: (orderers) => set({ orderers: orderers }),
  setWinner: (winner) => set((state) => {
    const updatedOrderers = state.orderers.map((orderer) => {
      if (orderer.empNo === winner.empNo) {
        return {...orderer, isWinner: true};
      } else {
        return {...orderer, isWinner: false};
      }
    });
    return { orderers: updatedOrderers };
  })


  // Define other initial states and actions as needed
})));

// Now, in your component, you can use this store
// const { currentCafe, currentCafeMenuList, setCafe, setCafeMenus } = useRoomStore()
