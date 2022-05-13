import axios from "axios";
import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import ConfigContext from "../../contexts/ConfigContext";
import UserContext from "../../contexts/UserContext";
import CartProduct from "./CartProduct.jsx";

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    position: relative;
    width: 100%;
    height: 100%;
    align-items: center;
`;

const Header = styled.header`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 25px;
    position: relative;
    height: 70px;
    width: 100%;
    flex: 0 0 auto;
    z-index: 20;
`;

const Title = styled.h1`
    font-weight: 700;
    font-size: 1.5rem;
`;

const Main = styled.main`
    display: flex;
    flex-direction: column;
    gap: 5px;
    position: relative;
    width: 90%;
    height: 100%;
    align-items: center;
`;

const Total = styled.div`
    h1 {
        font-weight: bold;
    }
    display: flex;
    width: 80%;
    justify-content: space-between;
    color: ${({ theme }) => theme.main};
    font-size: 1.5rem;
    margin-top: 1rem;
`;

const Button = styled.button`
    align-self: center;
    border-radius: 12px;
    border-style: none;
    color: ${({ theme }) => theme.overMain};
    font-weight: 700;
    font-size: 1rem;
    width: 80%;
    min-height: 3rem;
    height: 5rem;
    margin: 1rem;
    background-color: ${({ theme, total }) => (total > 0 ? theme.main : theme.lightGray)};
    cursor: ${({ total }) => (total > 0 ? "pointer" : "")};
`;

const EmptyCartMessage = styled.div`
    margin: auto auto;
    color: ${({ theme }) => theme.gray};
    font-size: 2rem;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const EmptyCartButton = styled.button`
    align-self: center;
    border-radius: 12px;
    border-style: none;
    color: ${({ theme }) => theme.overMain};
    font-weight: 700;
    font-size: 1rem;
    width: 40%;
    height: 3rem;
    margin: 1rem;
    background-color: ${({ theme }) => theme.main};
    cursor: pointer;
`;

export default function CartPage() {
    const navigate = useRef(useNavigate());

    const { token } = useContext(UserContext);
    const { apiLink } = useContext(ConfigContext);

    const [cart, setCart] = useState([]);

    useEffect(() => {
        if (token) {
            axios
                .get(`${apiLink}/cart`, { headers: { Authorization: `Bearer ${token}` } })
                .then(({ data }) => setCart(data))
                .catch(console.error);
        } else {
            navigate.current("/signin");
        }
    }, [token, apiLink]);

    const emptyCart = !cart.some((productIsNotNull) => productIsNotNull);
    const total = cart.reduce(
        (total, { quantity, productData }) => total + quantity * productData.price,
        0
    );

    return (
        <Wrapper>
            <Header>
                <Title>Carrinho</Title>
            </Header>
            {emptyCart ? (
                <EmptyCartMessage>
                    <h2>Seu carrinho esta vazio :(</h2>
                    <EmptyCartButton onClick={() => navigate.current("/")}>
                        Ir as compras
                    </EmptyCartButton>
                </EmptyCartMessage>
            ) : (
                <>
                    <Main>
                        {cart.map(({ productData, quantity }, index) => (
                            <CartProduct
                                productData={productData}
                                setCart={setCart}
                                quantity={quantity}
                                index={index}
                                key={index + productData.toString()}
                            />
                        ))}
                    </Main>
                    <Total>
                        <h1>Total</h1>
                        <p>{total?.toFixed(2)}</p>
                    </Total>
                    <Button
                        onClick={() => total > 0 && navigate.current("/checkout")}
                        total={total}
                    >
                        Checkout
                    </Button>
                </>
            )}
        </Wrapper>
    );
}
