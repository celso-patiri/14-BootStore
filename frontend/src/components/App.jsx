import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from "axios";

import ConfigContext from "../contexts/ConfigContext";
import AppContext from "../contexts/AppContext";
import UserContext from "../contexts/UserContext";

import AppStructure from "./AppStructure";
import HomePage from "./HomePage/HomePage.jsx";
import SignInPage from "./SignInPage/SignInPage.jsx";
import SignUpPage from "./SignUpPage/SignUpPage.jsx";
import CategoryPage from "./CategoryPage/CategoryPage.jsx";
import ProductsPage from "./ProductsPage/ProductsPage.jsx";
import ProductPage from "./ProductPage/ProductPage.jsx";
import LikesPage from "./LikesPage/LikesPage.jsx";
import CartPage from "./CartPage/CartPage.jsx";
import UserPage from "./UserPage/UserPage.jsx";
import SettingsPage from "./SettingsPage/SettingsPage.jsx";
import CheckOutPage from "./CheckOutPage/CheckOutPage";
import SuccessPage from "./SuccessPage/SuccessPage";
import OrdersPage from "./OrdersPage/OrdersPage.jsx";
import OrderPage from "./OrderPage/OrderPage.jsx";
import { useState } from "react";
import Theme from "../styles/themes/Theme";
import { useEffect } from "react";

export default function App() {
    const apiLink = "http://localhost:5000";

    // App Context
    const [theme, setTheme] = useState("light"); // 'light', 'dark'
    const [selectedNavTab, setSelectedNavTab] = useState(""); // 'explore, likes, cart, user'
    const [userPageTab, setUserPageTab] = useState(""); // 'orders', 'settings'

    // User Data
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [cart, setCart] = useState(null);
    const [likes, setLikes] = useState(null);
    const [orders, setOrders] = useState(null);

    useEffect(() => {
        if (!token) {
            const download = JSON.parse(localStorage.getItem("bootstore_token"));
            if (download) {
                setToken(download);
            }
        }
        if (token) {
            if (!user) {
                getData("/user", setUser);
            }
            if (!cart) {
                getData("/cart", setCart);
            }
            if (!likes) {
                getData("/wishlist", setLikes);
            }
        } else {
            setUser(null);
            setCart(null);
            setLikes(null);
        }
    }, [token, user]);

    async function getData(url, setFunction) {
        console.log(apiLink + url);
        const config = { headers: { Authorization: `Bearer ${token}` } };
        try {
            const promise = await axios.get(apiLink + url, config);
            console.log("get " + url, promise.data);
            await setFunction(promise.data);
        } catch (err) {
            console.log(err);
        }
    }

    async function postData(url, body) {
        console.log(apiLink + url);
        const config = { headers: { Authorization: `Bearer ${token}` } };
        try {
            const promise = await axios.post(apiLink + url, body, config);
        } catch (err) {
            console.log(err);
        }
    }

    async function putData(url, body) {
        console.log(`trying to put at ${apiLink + url}`, body);
        const config = { headers: { Authorization: `Bearer ${token}` } };
        try {
            const promise = await axios.put(apiLink + url, body, config);
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <ConfigContext.Provider value={{ apiLink }}>
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
                <UserContext.Provider
                    value={{
                        user,
                        setUser,
                        token,
                        setToken,
                        cart,
                        setCart,
                        likes,
                        setLikes,
                        orders,
                        setOrders,
                        getData,
                        postData,
                        putData,
                    }}
                >
                    <Theme>
                        <BrowserRouter>
                            <Routes>
                                <Route path="/" element={<AppStructure />}>
                                    <Route index element={<HomePage />}></Route>
                                    <Route path="signin" element={<SignInPage />}></Route>
                                    <Route path="signup" element={<SignUpPage />}></Route>
                                    <Route
                                        path="/categories/:categoryName"
                                        element={<CategoryPage />}
                                    />
                                    <Route path="products" element={<ProductsPage />} />
                                    <Route
                                        path="products/:productId"
                                        element={<ProductPage />}
                                    ></Route>
                                    <Route path="likes" element={<LikesPage />}></Route>
                                    <Route path="cart" element={<CartPage />}></Route>
                                    <Route path="checkout" element={<CheckOutPage />}>
                                        <Route path="success" element={<SuccessPage />}></Route>
                                    </Route>
                                    <Route path="user" element={<UserPage />}>
                                        <Route index element={<OrdersPage />} />
                                        <Route path="orders" element={<OrdersPage />} />
                                        <Route
                                            path="orders/:orderId"
                                            element={<OrderPage />}
                                        ></Route>
                                        <Route path="settings" element={<SettingsPage />}></Route>
                                    </Route>
                                </Route>
                            </Routes>
                        </BrowserRouter>
                    </Theme>
                </UserContext.Provider>
            </AppContext.Provider>
        </ConfigContext.Provider>
    );
}
