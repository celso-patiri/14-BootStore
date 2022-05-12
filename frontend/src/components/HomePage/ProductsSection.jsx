import { Link } from "react-router-dom";
import styled from "styled-components";
import ProductThumb from "../Utils/ProductThumb";
import { useContext, useEffect, useState } from "react";
import UserContext from "../../contexts/UserContext";

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

export default function CategoriesSection() {
    const { likes, cart, getData } = useContext(UserContext);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        getData("/products/", setProducts);
    }, []);

    const thumbs = products.map((product, index) => {
        let isLiked = false;
        let isInCart = false;

        if (likes) {
            likes.products.forEach((item) => {
                if (product._id.toString() === item.productId.toString()) {
                    isLiked = true;
                }
            });
        }
        if (cart) {
            cart.forEach((item) => {
                if (product._id.toString() === item.productId.toString()) {
                    isInCart = true;
                }
            });
        }

        return (
            <ProductThumb
                key={index}
                product={product}
                isLiked={isInCart}
                isInCart={isInCart}
                showCartButton={true}
            ></ProductThumb>
        );
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