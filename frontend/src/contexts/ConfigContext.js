import { React, useState, createContext } from 'react';

export const ConfigContext = createContext();

export function ConfigContextProvider({ children }) {

    const apiLink = "http://localhost:5000";

    return (
        <ConfigContext.Provider
            value={{
                apiLink
            }}
        >
            {children}
        </ConfigContext.Provider>
    )
}