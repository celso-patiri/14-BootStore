import { React, useState, createContext } from "react";

export const ConfigContext = createContext();

export function ConfigContextProvider({ children }) {
    let apiLink = process.env.REACT_APP_API_URL;

    return (
        <ConfigContext.Provider
            value={{
                apiLink,
            }}
        >
            {children}
        </ConfigContext.Provider>
    );
}
