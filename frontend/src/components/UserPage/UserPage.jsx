import styled from "styled-components";
import { Outlet, useNavigate } from "react-router";
import { useEffect, useContext, useState } from "react";
import UserContext from "../../contexts/UserContext";
import AppContext from "../../contexts/AppContext";

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

    const navigate = useNavigate();

    useEffect(() => {
        setSelectedNavTab("user");
        navigate("./orders");
    }, [token]);

    function logOut() {
        if (window.confirm("Você quer sair?")) {
            localStorage.removeItem("bootstore_token");
            setToken(null);
            setLikes(null);
            setCart(null);
            setUser(null);
            setOrders(null);
        }
    }

    return (
        <Wrapper>
            <HeaderNav>
                <NavTab
                    selected={userPageTab === "orders"}
                    onClick={() => {
                        navigate("/user/orders/");
                    }}
                >
                    Pedidos
                </NavTab>
                <NavTab
                    selected={userPageTab === "settings"}
                    onClick={() => {
                        navigate("/user/settings/");
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
