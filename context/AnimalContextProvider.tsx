/* eslint-disable no-empty-function */
"use strict";
import AnimalDTO from "@/utils/AnimalDTO";
import React, {useEffect, useState, FunctionComponent} from "react";

export type AnimalContentProps = {
  animal: (data?: AnimalDTO) => void;
};

export const AnimalContext = React.createContext<AnimalContentProps>({
    "animal": () => {}
});

export type ProviderProps = {
  children?: React.ReactNode;
};
export const AnimalContextProvider: FunctionComponent<ProviderProps> = ({children}) => {

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
