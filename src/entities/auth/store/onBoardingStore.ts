import { create } from "zustand";

interface OnBoardingStore {
  isOnBoarding: boolean;
  completeOnBoarding: () => void;
  resetOnBoarding: () => void;
}

const useOnBoardingStore = create<OnBoardingStore>((set) => ({
  isOnBoarding: false,
  completeOnBoarding: () => set({ isOnBoarding: true }),
  resetOnBoarding: () => set({ isOnBoarding: false }),
}));

export default useOnBoardingStore;
