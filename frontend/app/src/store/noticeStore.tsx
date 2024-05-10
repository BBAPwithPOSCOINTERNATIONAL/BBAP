import { create } from "zustand";
import {
    Notice,
} from "../api/notificationAPI";


interface NoticeState {
    noticeList: Notice[];
    setNoticeList: (notices: Notice[]) => void;
    deleteNotice: (noticeId: number) => void;
    deleteAllNotices: () => void;
}

const useNoticeStore = create<NoticeState>((set) => ({
    noticeList: [],
    setNoticeList: (notices) => set({ noticeList: notices }),
    deleteNotice: (noticeId: number) =>
        set((state) => ({
            noticeList: state.noticeList.filter(notice => notice.noticeId !== noticeId)
        })),
    deleteAllNotices: () =>
        set({ noticeList: [] })
}));

export default useNoticeStore;