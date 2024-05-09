import { create } from "zustand";
import {
    Notice,
} from "../api/notificationAPI";


interface NoticeState {
    noticeList: Notice[];
    setNoticeList: (notices: Notice[]) => void;
    deleteAllNotices: () => void;
}

const useNoticeStore = create<NoticeState>((set) => ({
    noticeList: [],
    setNoticeList: (notices) => set({ noticeList: notices }),
    deleteAllNotices: () =>
        set({ noticeList: [] })
}));

export default useNoticeStore;