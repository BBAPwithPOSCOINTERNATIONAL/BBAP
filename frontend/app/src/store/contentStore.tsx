import { create } from "zustand";

interface ContentState {
  content: string;
  setContent: (newContent: string) => void;
}

const useContentStore = create<ContentState>((set) => ({
  content: "alone",
  setContent: (newContent: string) => set({ content: newContent }),
}));

export default useContentStore;
