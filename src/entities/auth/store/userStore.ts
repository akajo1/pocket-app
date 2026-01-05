import AsyncStorage from "@react-native-async-storage/async-storage";
import {create} from "zustand";
import {createJSONStorage, persist} from "zustand/middleware";
import {QueryClient} from "@tanstack/react-query";


export interface User {
    id: string;
    email: string;
    name: string;
    phone: string;
    token: string;
}

export interface Loginresponse {
    userId: string
    token: string
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

const queryClient = new QueryClient();
type PositionStore = UserStore & UserActions;

const useUserStore = create<PositionStore>()(
    persist(
        (set, get) => ({
            user: null,
            rememberMe: false,
            setRememberMe: (rememberMe) => set({rememberMe}),
            setUser: (user) => set({user}),
            clearUser: () => {
                set({user: null})
                queryClient.clear();
            },
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
