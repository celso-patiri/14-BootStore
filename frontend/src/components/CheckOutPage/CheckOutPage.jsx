import { useContext, useEffect, useRef, useState } from "react";
import CartProduct from "../CartPage/CartProduct.jsx";
import ConfigContext from "../../contexts/ConfigContext";
import UserContext from "../../contexts/UserContext";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";

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

const SubTotal = styled.div`
    h1 {
        font-weight: bold;
    }
    display: flex;
    width: 80%;
    justify-content: space-between;
    color: ${({ theme }) => theme.black};
    font-size: 1.2rem;
    margin-top: 1rem;
`;

const Frete = styled.div`
    display: flex;
    width: 80%;
    justify-content: space-between;
    color: ${({ theme }) => theme.black};
    font-size: 1.2rem;
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

const BackButton = styled.div`
    width: 56px;
    height: 56px;
    background-color: rgba(255, 255, 255, 0.2);
    border-radius: 100%;
    left: 0px;

    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;

    ion-icon {
        font-size: 24px;
        --ionicon-stroke-width: 50px;
        color: black;
    }
    cursor: pointer;
    :hover {
        background-color: rgba(255, 255, 255, 0.4);
    }
`;

export default function CheckOutPage() {
    const navigate = useRef(useNavigate());

    const { token } = useContext(UserContext);
    const { apiLink } = useContext(ConfigContext);

    const [cart, setCart] = useState();

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

    const frete = 20;
    const total = cart
        ? cart.reduce((total, { quantity, productData }) => total + quantity * productData.price, 0)
        : null;

    const postOrder = () => {
        axios
            .post(`${apiLink}/order`, { headers: { Authorization: `Bearer ${token}` } })
            .then(({ data }) => setCart(data))
            .catch(console.error);
    };

    return (
        <Wrapper>
            <Header>
                <Title>Confira seu pedido :)</Title>
                <BackButton onClick={() => navigate.current("/cart")}>
                    <ion-icon name="chevron-back-outline"></ion-icon>
                </BackButton>
            </Header>
            <Main>
                {cart?.map(({ productData, quantity }, index) => (
                    <CartProduct
                        productData={productData}
                        setCart={setCart}
                        quantity={quantity}
                        index={index}
                        key={index + productData.toString()}
                    />
                ))}
            </Main>
            {total > 0 && (
                <SubTotal>
                    <h1>Subtotal</h1>
                    <p>{total?.toFixed(2)}</p>
                </SubTotal>
            )}

            {total > 0 && (
                <Frete>
                    <h1>Frete</h1>
                    <p>{frete?.toFixed(2)}</p>
                </Frete>
            )}

            <Total>
                <h1>Total</h1>
                <p>{total && (frete + total).toFixed(2)}</p>
            </Total>
            <Button onClick={() => total > 0 && navigate.current("/checkout")} total={total}>
                Finalizar Compra
            </Button>
        </Wrapper>
    );
}
