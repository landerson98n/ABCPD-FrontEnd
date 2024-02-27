/* eslint-disable no-undef */
import React from "react";
import StyledComponentsRegistry from "./registry";
import {QueryClient, QueryClientProvider} from "react-query";
import {AlertContextProvider} from "@/context/AlertContextProvider";
import {AnimalContextProvider} from "@/context/AnimalContextProvider";

export const metadata = {
    "title": "ABCPD",
    "description": "Pagina ABCPD"
};

const queryClient = new QueryClient();

const RootLayoutProviders: React.FC = ({children}) => <AnimalContextProvider>
    <AlertContextProvider>
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    </AlertContextProvider>
</AnimalContextProvider>;

const RootLayout: React.FC = ({children}) => <StyledComponentsRegistry>
    <html lang="pt-br">
        <head>
            <title>Registro</title>
        </head>
        <body style={{"margin": 0,
            "overflowX": "hidden"}}>{children}</body>
    </html>
</StyledComponentsRegistry>;

const RootLayoutWithProviders: React.FC = ({children}) => <RootLayoutProviders>
    <RootLayout>{children}</RootLayout>
</RootLayoutProviders>;
export default RootLayoutWithProviders;

