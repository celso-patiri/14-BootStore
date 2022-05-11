import * as React from "react";
import ReactDOM from 'react-dom/client';
import App from "./components/App";

import "./styles/reset.css";
import "./styles/styles.css";


const appHeight = () => {
    const body = document.querySelector("body");
    body.style.setProperty('height', `${window.innerHeight}px`)
}
window.addEventListener('resize', appHeight)
appHeight();


const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);
root.render(
    <App />
);