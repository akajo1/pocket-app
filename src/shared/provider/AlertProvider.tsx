import React, {createContext, useCallback, useContext, useState} from "react";

type alertTypeProp = "success" | "error" | "warning" | "info";

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

export default function AlertProvider({children}: {
    children: React.ReactNode;
}) {
    const [alertMessage, setAlertMessage] = useState<AlertTypo>({
        visible: false,
        message: "",
        title: "",
        type: "info",
        onPress: () => {
        },
        btnText: "ok",
    });
    const onSetAlertMessage: any = (body: any) => {
        let message: string= ""
        if(Array.isArray(body.message)) {
            message = body.message.map(message => message.message).join(",\n ");
        }else message= body.message;

        body.message = message;
        setAlertMessage(body)
    }

    return (
        <AlertContext.Provider value={{alertMessage, setAlertMessage : onSetAlertMessage}}>
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
