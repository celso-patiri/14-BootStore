import { BrowserRouter, Routes, Route } from "react-router-dom";

import { ConfigContextProvider } from "../contexts/ConfigContext";
import { AppContextProvider } from "../contexts/AppContext";
import { UserContextProvider } from "../contexts/UserContext";

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
import Theme from "../styles/themes/Theme";

export default function App() {
    return (
        <ConfigContextProvider>
            <AppContextProvider>
                <UserContextProvider>
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
                                    <Route path="checkout" element={<CheckOutPage />} />
                                    <Route path="order/success" element={<SuccessPage />}></Route>
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
                </UserContextProvider>
            </AppContextProvider>
        </ConfigContextProvider>
    );
}
