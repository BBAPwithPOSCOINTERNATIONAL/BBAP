import create from 'zustand';
import {Cafe, CafeMenus} from "../api/cafeAPI.tsx";
import {devtools} from 'zustand/middleware';
import {MenuOption} from "../api/useWebSocket.tsx";


export type Employee = {
  empNo: number;
  empName: string;
  isWinner: boolean;
};


type Product = {
  cnt: number;
  owner: boolean;
  orderItemId: string;
  name: string;
  menuname: string;
  optionsString: string[];
  options: MenuOption[]
  price: number;
  menuId: string;
};


interface RoomStore {
  currentCafe: Cafe | undefined;
  currentCafeMenuList: CafeMenus | undefined;
  orderers: Employee[];
  products: Product[];


  setCafe: (cafe: Cafe) => void;
  setCafeMenus: (menus: CafeMenus) => void;
  setOrderers: (orderers: Employee[]) => void;
  setWinner: (winner: Employee) => void;
  setProducts: (products: Product[]) => void;

}

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
export const useRoomStore = create<RoomStore>(devtools((set) => ({
  currentCafe: undefined,
  currentCafeMenuList: undefined,
  orderers: [],
  products: [],

  setCafe: (cafe) => set({currentCafe: cafe}),
  setCafeMenus: (menus) => set({currentCafeMenuList: menus}),

  setOrderers: (orderers) => set({orderers: orderers}),
  setWinner: (winner) => set((state) => {
    const updatedOrderers = state.orderers.map((orderer) => {
      if (orderer.empNo === winner.empNo) {
        return {...orderer, isWinner: true};
      } else {
        return {...orderer, isWinner: false};
      }
    });
    return {orderers: updatedOrderers};
  }),
  setProducts: (products) => set({products}),


})));
