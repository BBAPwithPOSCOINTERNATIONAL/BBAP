import { create } from "zustand";
import { Menu } from "../types";
import { ReactElement } from "react";

interface ModalState {
	isMenuModalOpen: boolean;
	isConfirmModalOpen: boolean;
	selectedMenu: Menu | undefined;
	confirmContent: ReactElement;
	openMenuModal: (menuData: Menu) => void;
	closeMenuModal: () => void;
	openConfirmModal: (content: ReactElement) => void;
	closeConfirmModal: () => void;
}

const useModalStore = create<ModalState>((set) => ({
	isConfirmModalOpen: false,
	isMenuModalOpen: false,
	selectedMenu: undefined,
	confirmContent: <></>,
	openMenuModal: (menuData: Menu) =>
		set({ selectedMenu: menuData, isMenuModalOpen: true }),
	closeMenuModal: () =>
		set({ selectedMenu: undefined, isMenuModalOpen: false }),
	openConfirmModal: (content: ReactElement) =>
		set({ confirmContent: content, isConfirmModalOpen: true }),
	closeConfirmModal: () =>
		set({ confirmContent: <></>, isConfirmModalOpen: false }),
}));

export default useModalStore;
