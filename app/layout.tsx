/* eslint-disable no-undef */
"use client";
import StyledComponentsRegistry from "./registry";
import {QueryClient, QueryClientProvider} from "react-query";
import {AlertContextProvider} from "@/context/AlertContextProvider";
import {AnimalContextProvider} from "@/context/AnimalContextProvider";
export const metadata = {
    "title": "ABCPD",
    "description": "Pagina ABCPD"
};
const queryClient = new QueryClient();


export default function RootLayout ({
    children
}: {
  children: React.ReactNode
}) {

    return (
        <AnimalContextProvider>
            <AlertContextProvider>
                <QueryClientProvider client={queryClient}>
                    <StyledComponentsRegistry>
                        <html lang="pt-br">
                            <head>
                                <title>Registro</title>
                            </head>
                            <body style={{"margin": 0,
                                "overflowX": "hidden"}}>{children}</body>
                        </html>
                    </StyledComponentsRegistry>
                </QueryClientProvider>
            </AlertContextProvider>
        </AnimalContextProvider>
    );

}
