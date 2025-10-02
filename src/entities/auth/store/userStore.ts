import AsyncStorage from "@react-native-async-storage/async-storage";
import { createStore } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export interface User {
  id: string;
  email: string;
  name: string;
  token: string;
}

interface UserStore {
  user: User | null;
  rememberMe: boolean;
}
interface UserActions {
  setRememberMe: (rememberMe: boolean) => void;
  setUser: (user: UserStore["user"]) => void;
  clearUser: () => void;
}

type PositionStore = UserStore & UserActions;

const useUserStore = createStore<PositionStore>()(
  persist(
    (set) => ({
      user: null,
      rememberMe: false,
      setRememberMe: (rememberMe) => set({ rememberMe }),
      setUser: (user) => set({ user }),
      clearUser: () => set({ user: null }),
    }),
    {
      name: "user-store",
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        user: state.user,
        rememberMe: state.rememberMe,
      }),
    }
  )
);

export default useUserStore;
