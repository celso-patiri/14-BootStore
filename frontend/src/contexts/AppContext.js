import { React, useState, createContext } from 'react';

export const AppContext = createContext();

export function AppContextProvider({ children }) {

    const [theme, setTheme] = useState("light"); // 'light', 'dark'
    const [selectedNavTab, setSelectedNavTab] = useState(""); // 'explore, likes, cart, user'
    const [userPageTab, setUserPageTab] = useState(""); // 'orders', 'settings'

    return (
        <AppContext.Provider
            value={{
                theme,
                setTheme,
                selectedNavTab,
                setSelectedNavTab,
                userPageTab,
                setUserPageTab,
            }}
        >
            {children}
        </AppContext.Provider>
    )
}