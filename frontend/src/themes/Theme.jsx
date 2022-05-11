import React, { useContext } from "react";
import { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme } from "./themes.js";
import GlobalTheme from "./globals";

import AppContext from "../contexts/AppContext";

export default function Theme({ children }) {
    const { theme } = useContext(AppContext);
    return (
        <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
            <GlobalTheme />
            {children}
        </ThemeProvider>
    );
}
