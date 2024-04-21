import { create } from "zustand";
import { Menu } from "../types";

interface ModalState {
	isMenuModalOpen: boolean;
	selectedMenu: Menu | undefined;
	openMenuModal: (menuData: Menu) => void;
	closeMenuModal: () => void;
}

const useModalStore = create<ModalState>((set) => ({
	isMenuModalOpen: false,
	selectedMenu: undefined,
	openMenuModal: (menuData: Menu) =>
		set({ selectedMenu: menuData, isMenuModalOpen: true }),
	closeMenuModal: () =>
		set({ selectedMenu: undefined, isMenuModalOpen: false }),
}));

export default useModalStore;
