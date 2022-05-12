import { useEffect, useContext } from "react";
import styled from "styled-components";

import ConfigContext from "../../contexts/ConfigContext.js";
import UserContext from "../../contexts/UserContext.js";

import CategoriesSection from "./CategoriesSection";
import ProductsSection from "./ProductsSection";

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
`;

const Header = styled.header`
    background-color: black;
    width: 100%;
    height: 100%;
    padding: 25px;
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const Main = styled.div`
    display: flex;
    flex-direction: column;
    padding: 30px 0;
    gap: 30px;
`;

const Hello = styled.h1`
    padding: 0 25px;
    font-size: 28px;
    font-weight: bold;
`;

export default function HomePage() {
    const { user } = useContext(UserContext);
    const hello = `Bem vindo${user ? `, ${user.name}` : ""}!`;

    return (
        <Wrapper>
            <Main>
                <Hello>{hello}</Hello>
                <CategoriesSection />
                <ProductsSection />
            </Main>
        </Wrapper>
    );
}
