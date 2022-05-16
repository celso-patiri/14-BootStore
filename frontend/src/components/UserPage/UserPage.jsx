import { useContext, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Outlet } from "react-router";
import styled from "styled-components";
import { AppContext } from "../../contexts/AppContext";
import { UserContext } from "../../contexts/UserContext";

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    align-items: center;
    overflow: hidden;
`;

const HeaderNav = styled.nav`
    width: 100%;
    max-width: 500px;

    height: 70px;
    flex: 0 0 auto;
    padding: 10px;
    display: flex;
    justify-items: flex-start;
    align-content: flex-start;
    gap: 10px;
`;

const NavTab = styled.div`
    height: 100%;
    padding: 0px 25px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: ${({ selected, theme }) => {
        return selected ? theme.main : theme.secondary;
    }};
    color: ${({ selected, theme }) => {
        return selected ? theme.overMain : theme.overSecondary;
    }};

    font-weight: 600;
    font-size: 14px;
    border-radius: 10px;

    cursor: pointer;

    :hover {
        background-color: ${({ selected, theme }) => {
            return selected ? theme.hoverMain : theme.hoverSecondary;
        }};
    }
`;

const Main = styled.div`
    width: 100%;
    flex: 1 1 auto;
    max-width: 500px;
    padding: 25px;
    display: flex;
    flex-direction: column;
    gap: 20px;
    align-items: flex-start;
    overflow: auto;
`;

export default function UserPage() {
    const { setSelectedNavTab, userPageTab, setUserPageTab } = useContext(AppContext);
    const { token, setToken, setUser, setLikes, setCart, setOrders } = useContext(UserContext);

    const navigate = useRef(useNavigate());

    useEffect(() => {
        if (!token) {
            const localToken = JSON.parse(localStorage.getItem("bootstore_token"));
            if (!localToken) navigate.current("/");
        } else {
            setSelectedNavTab("user");
        }
    }, [token]);

    function logOut() {
        if (window.confirm("Você quer sair?")) {
            localStorage.removeItem("bootstore_token");
            setToken(null);
            setLikes(null);
            setCart(null);
            setUser(null);
            setOrders(null);
            navigate.current("/");
        }
    }

    return (
        <Wrapper>
            <HeaderNav>
                <NavTab
                    selected={userPageTab === "orders"}
                    onClick={() => {
                        navigate.current("/user/orders/");
                    }}
                >
                    Pedidos
                </NavTab>
                <NavTab
                    selected={userPageTab === "settings"}
                    onClick={() => {
                        navigate.current("/user/settings/");
                    }}
                >
                    Cadastro
                </NavTab>
                <NavTab selected={userPageTab === "log-off"} onClick={logOut}>
                    Sair
                </NavTab>
            </HeaderNav>
            <Main>
                <Outlet />
            </Main>
        </Wrapper>
    );
}
