import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import styled from "styled-components";

import AppContext from "../contexts/AppContext";
import UserContext from "../contexts/UserContext";

const View = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    overflow-y: hidden;
    align-items: center;
`;

const Page = styled.main`
    flex: 1 1 auto;
    width: 100%;
    overflow-y: auto;
    border-bottom-left-radius: 50px;
    border-bottom-right-radius: 50px;
`;

const FooterNav = styled.nav`
    flex: 0 0 auto;
    width: 100%;
    max-width: 500px;
    height: 70px;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
`;

const NavButton = styled.div`
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 54px;
    height: 54px;
    border-radius: 100%;

    background-color: ${({ selected, theme }) => {
        return selected ? theme.main : theme.background;
    }};
    :hover {
        background-color: ${({ selected, theme }) => {
            return selected ? theme.hoverMain : theme.hoverBackground;
        }};
    }

    ion-icon {
        color: ${({ selected, theme }) => {
            return selected ? theme.overMain : theme.secondary;
        }};
        font-size: 26px;
        --ionicon-stroke-width: ${({ selected }) => (selected ? "0px" : "40px")};
    }

    position: relative;
`;

const Notification = styled.div`
    width: 8px;
    height: 8px;
    background-color: ${({ theme }) => theme.special};
    border-radius: 100%;
    position: absolute;
    top: 12px;
    right: 12px;
    z-index: 3;
`;

export default function AppStructure() {
    const { selectedNavTab, setSelectedNavTab } = useContext(AppContext);
    const { token, cart, likes } = useContext(UserContext);

    const [isLogged, setIsLogged] = useState(false);
    const [hasLikedProducts, setHasLikedProducts] = useState(false);
    const [hasProductsInCart, setHasProductsInCart] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        setIsLogged(token ? true : false);
        if (likes) {
            setHasProductsInCart(likes.length > 0);
        }
        if (cart) {
            setHasProductsInCart(cart.length > 0);
        }
    }, [token, likes, cart]);

    function goTo(path, tab) {
        setSelectedNavTab(tab);
        navigate(path);
    }

    return (
        <View>
            <Page>
                <Outlet />
            </Page>
            <FooterNav>
                <NavButton
                    selected={selectedNavTab === "explore"}
                    onClick={() => {
                        goTo("/", "explore");
                    }}
                >
                    <ion-icon
                        name={`planet${selectedNavTab === "explore" ? "" : "-outline"}`}
                    ></ion-icon>
                </NavButton>

                <NavButton
                    selected={selectedNavTab === "likes"}
                    onClick={() => {
                        isLogged ? goTo("/likes", "likes") : goTo("/signin", "user");
                    }}
                >
                    <ion-icon
                        name={`heart${selectedNavTab === "likes" ? "" : "-outline"}`}
                    ></ion-icon>
                </NavButton>

                <NavButton
                    selected={selectedNavTab === "cart"}
                    onClick={() => {
                        isLogged ? goTo("/cart", "cart") : goTo("/signin", "user");
                    }}
                >
                    {selectedNavTab !== "cart" && hasProductsInCart ? (
                        <Notification></Notification>
                    ) : (
                        <></>
                    )}
                    <ion-icon
                        name={`cart${selectedNavTab === "cart" ? "" : "-outline"}`}
                    ></ion-icon>
                </NavButton>

                <NavButton
                    selected={selectedNavTab === "user"}
                    onClick={() => {
                        isLogged ? goTo("/user", "user") : goTo("/signin", "user");
                    }}
                >
                    <ion-icon
                        name={`person${selectedNavTab === "user" ? "" : "-outline"}`}
                    ></ion-icon>
                </NavButton>
            </FooterNav>
        </View>
    );
}
