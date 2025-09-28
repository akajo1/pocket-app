import AsyncStorage from "@react-native-async-storage/async-storage";

export const StorageData = () => {
  return {
    set: (key: string, value: unknown) => {
      AsyncStorage.setItem(`@${key}`, JSON.stringify(value));
    },
    get: async (key: string) => {
      const data = await AsyncStorage.getItem(`@${key}`);
      if (data) return JSON.parse(data);
      return null;
    },
    remove: (key: string) => {
      AsyncStorage.removeItem(`@${key}`);
    },
  };
};
