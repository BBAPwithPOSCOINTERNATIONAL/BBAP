import { create } from "zustand";

type Department = {
  departmentId: number;
  departmentName: string;
};

type Position = {
  positionId: number;
  positionName: string;
};

type Workplace = {
  workplaceId: number;
  workplaceName: string;
};

type UserState = {
  empId?: number;
  empNo?: string;
  empName?: string;
  department?: Department;
  position?: Position;
  workplace?: Workplace;
  updateUserData: (userData: Partial<UserState>) => void;
};

export const useUserStore = create<UserState>((set) => ({
  empId: 0,
  empNo: "",
  empName: "",
  department: {
    departmentId: 0,
    departmentName: "",
  },
  position: {
    positionId: 0,
    positionName: "",
  },
  workplace: {
    workplaceId: 0,
    workplaceName: "",
  },
  updateUserData: (userData) => set((state) => ({ ...state, ...userData })),
}));
