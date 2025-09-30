import { create } from "zustand";

export interface User {
  id: string;
  email: string;
  name: string;
  token: string;
}

interface UserStore {
  user: User | null;
  rememberMe: boolean;
  setRememberMe: (rememberMe: boolean) => void;
  setUser: (user: UserStore["user"]) => void;
  clearUser: () => void;
}

const useUserStore = create<UserStore>((set) => ({
  user: null,
  rememberMe: false,
  setRememberMe: (rememberMe) => set({ rememberMe }),
  setUser: (user) => set({ user }),
  clearUser: () => set({ user: null }),
}));

export default useUserStore;
