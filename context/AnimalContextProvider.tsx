/* eslint-disable no-empty-function */
"use client";
import AnimalDTO from "@/utils/AnimalDTO";
import React, {useEffect, useState} from "react";

export type AnimalContentProps = {
  animal: Function
}

export const AnimalContext = React.createContext<AnimalContentProps>({
    "animal": () => {}
});

export type ProviderProps = {
  children?: React.ReactNode
}
export const AnimalContextProvider: React.FC<ProviderProps> = ({
    children
}) => {

    const [
        animalData,
        setAnimalData
    ] = useState({});
    function animal (data?: AnimalDTO) {

        setAnimalData(data || {});
        return animalData;

    }

    return (
        <AnimalContext.Provider value={{animal}}>
            {children}
        </AnimalContext.Provider>
    );

};
