import { Link } from "react-router-dom";
import styled from "styled-components";
import ProductThumb from "../Utils/ProductThumb";

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    padding: 0;
    gap: 30px;
    width: 100%;
`;

const Header = styled.div`
    display: flex;
    padding: 0 25px;
    width: 100%;
    gap: 20px;
`;

const Title = styled.div`
    font-size: 18px;
    font-weight: bold;
`;

const SeeAll = styled.div`
    font-size: 14px;
    font-weight: bold;
`;

const Products = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 30px;
    width: 100%;
    padding: 0px 25px;
`;

// apagar
const products = [
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
    const thumbs = products.map((category) => {
        return <ProductThumb></ProductThumb>;
    });

    return (
        <Wrapper>
            <Header>
                <Title>Mais vendidos</Title>
                <Link to="/products">
                    <SeeAll>ver todos</SeeAll>
                </Link>
            </Header>
            <Products>{thumbs}</Products>
        </Wrapper>
    );
}
