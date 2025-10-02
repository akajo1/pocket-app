import AsyncStorage from "@react-native-async-storage/async-storage";
import { createStore } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface OnBoardingStore {
  isOnBoarding: boolean;
}

interface OnBoardingActions {
  completeOnBoarding: () => void;
  resetOnBoarding: () => void;
}

const useOnBoardingStore = createStore<OnBoardingStore & OnBoardingActions>()(
  persist(
    (set) => ({
      isOnBoarding: false,
      completeOnBoarding: () => set({ isOnBoarding: true }),
      resetOnBoarding: () => set({ isOnBoarding: false }),
    }),
    {
      name: "onboarding-store",
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        isOnBoarding: state.isOnBoarding,
      }),
    }
  )
);

export default useOnBoardingStore;
