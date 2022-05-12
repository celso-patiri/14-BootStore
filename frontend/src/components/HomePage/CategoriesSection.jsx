import { useContext } from "react";
import styled from "styled-components";

import CategoryThumb from "./CategoryThumb";

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    padding: 0;
    gap: 30px;
    width: 100%;
`;

const Title = styled.div`
    font-size: 18px;
    font-weight: bold;
    padding-left: 25px;
`;

const Categories = styled.div`
    display: flex;
    flex-wrap: no-wrap;
    justify-content: flex-start;
    gap: 30px;
    width: 100%;
    overflow-x: auto;
    overflow-y: hidden;
    padding: 0px 25px;
    ::-webkit-scrollbar {
        display: none;
    }
`;

// apagar
const categories = [
    "smart",
    "teste",
    "smart",
    "teste",
    "smart",
    "teste",
    "smart",
    "teste",
    "smart",
    "teste",
    "smart",
    "teste",
    "smart",
    "teste",
];

export default function CategoriesSection() {
    const thumbs = categories.map((category) => {
        return <CategoryThumb></CategoryThumb>;
    });

    return (
        <Wrapper>
            <Title>O que você está buscando hoje?</Title>
            <Categories>{thumbs}</Categories>
        </Wrapper>
    );
}
