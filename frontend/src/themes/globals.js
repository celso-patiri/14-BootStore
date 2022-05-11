import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
    *,
    *::after,
    *::before {
        box-sizing: border-box;  
    }
    body {
        background: ${({ theme }) => theme.background};
        color: ${({ theme }) => theme.simpleText};
        margin: 0;    
        padding: 0;    
        font-family: sans-serif;    
        transition: all 0.25s linear;

        a {
            color: ${({ theme }) => theme.linkText};
        }
    }
`;