"use client";
import React, {useState, ReactNode, createContext, FunctionComponent} from "react";
import {AlertComponent} from "@/components/Alert";

export type AlertContentProps = {
    alert: Function;
};

export const AlertContext = createContext<AlertContentProps>({
    "alert": () => {}
});

export type ProviderProps = {
    children?: ReactNode;
};

export const AlertContextProvider: FunctionComponent<ProviderProps> = ({children}) => {

    const [
        alertMessage,
        setAlertMessage
    ] = useState<string>("");
    const [
        alertIsOpen,
        setAlertIsOpen
    ] = useState<boolean>(false);
    const [
        alertType,
        setAlertType
    ] = useState<string>("warning");

    function alert (message: string, type?: string) {

        setAlertMessage(message);
        setAlertIsOpen(true);
        setAlertType(type || "warning");

    }

    return (
        <AlertContext.Provider value={{alert}}>
            {children}
            <AlertComponent
                isOpen={alertIsOpen}
                message={alertMessage}
                onClose={() => setAlertIsOpen(false)}
                type={alertType}
            />
        </AlertContext.Provider>
    );

};
