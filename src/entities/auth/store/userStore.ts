import { create } from "zustand";

export interface User {
  id: string;
  email: string;
  name: string;
  token: string;
}

interface UserStore {
  user: User | null;
  setUser: (user: UserStore["user"]) => void;
  clearUser: () => void;
}

const useUserStore = create<UserStore>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  clearUser: () => set({ user: null }),
}));

export default useUserStore;
