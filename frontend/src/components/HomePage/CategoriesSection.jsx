import { useContext, useState, useEffect } from "react";
import { UserContext } from "../../contexts/UserContext";
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

export default function CategoriesSection() {
    const { getData } = useContext(UserContext);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        getData("products/categories", setCategories);
    }, []);

    const thumbs = categories.map((category, index) => {
        return <CategoryThumb category={category} key={index}></CategoryThumb>;
    });

    return (
        <Wrapper>
            <Title>O que você está buscando hoje?</Title>
            <Categories>{thumbs}</Categories>
        </Wrapper>
    );
}
