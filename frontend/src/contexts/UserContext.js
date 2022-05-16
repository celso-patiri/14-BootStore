import { React, useState, useEffect, createContext, useContext } from 'react';
import { ConfigContext } from './ConfigContext';
import axios from "axios";

export const UserContext = createContext();

export function UserContextProvider({ children }) {

    const { apiLink } = useContext(ConfigContext);

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
        const config = { headers: { Authorization: `Bearer ${token}` } };
        try {
            const promise = await axios.get(apiLink + url, config);
            // console.log("get " + url, promise.data);
            await setFunction(promise.data);
        } catch (err) {
            console.log(err);
        }
    }

    async function postData(url, body) {
        const config = { headers: { Authorization: `Bearer ${token}` } };
        try {
            const promise = await axios.post(apiLink + url, body, config);
        } catch (err) {
            console.log(err);
        }
    }

    async function putData(url, body) {
        const config = { headers: { Authorization: `Bearer ${token}` } };
        try {
            const promise = await axios.put(apiLink + url, body, config);
        } catch (err) {
            console.log(err);
        }
    }

    return (
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
            {children}
        </UserContext.Provider>
    )
}