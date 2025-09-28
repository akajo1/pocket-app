// src/components/contexts/AlertContext.tsx
import { alertTypeProp } from "@/src/lib/types";
import React, { createContext, useContext, useState } from "react";

type AlertTypo = {
  visible: boolean;
  message: string;
  title?: string;
  type?: alertTypeProp;
  onPress?: () => void;
  btnText: string;
};

export const AlertContext = createContext<{
  alertMessage: AlertTypo;
  setAlertMessage: React.Dispatch<React.SetStateAction<AlertTypo>>;
} | null>(null);

export function AlertProvider({ children }: { children: React.ReactNode }) {
  const [alertMessage, setAlertMessage] = useState<AlertTypo>({
    visible: false,
    message: "",
    title: "",
    type: "info",
    onPress: () => {},
    btnText: "ok",
  });

  return (
    <AlertContext.Provider value={{ alertMessage, setAlertMessage }}>
      {children}
    </AlertContext.Provider>
  );
}

export function useAlert() {
  const context = useContext(AlertContext);
  if (!context)
    throw new Error("useAlert must be used within an AlertProvider");
  return context;
}
