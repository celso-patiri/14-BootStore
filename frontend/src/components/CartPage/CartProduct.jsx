import axios from "axios";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import ConfigContext from "../../contexts/ConfigContext";
import UserContext from "../../contexts/UserContext";

const Product = styled.article`
    display: flex;
    justify-content: space-between;
    width: 100%;

    img {
        -webkit-filter: ${({ quantity }) => (quantity > 0 ? "none" : "grayscale(100%)")};
        filter: ${({ quantity }) => (quantity > 0 ? "none" : "grayscale(100%)")};

        background-color: ${({ quantity, theme }) => (quantity > 0 ? theme.main : theme.lightGray)};
        object-fit: cover;
        width: 3.5rem;
        height: 3.5rem;
        border-radius: 15px;
    }

    > div {
        display: flex;
        gap: 5px;
        cursor: pointer;

        div {
            display: flex;
            flex-direction: column;
            margin-top: 5px;
            h1 {
                font-weight: 700;
                width: 100%;
                max-width: 35vw;
            }
            p {
                font-size: 0.8rem;
            }
        }
    }
`;

const QuantityCounter = styled.div`
    display: flex;
    flex-direction: row !important;
    align-items: center;
    gap: 5px;

    p {
        font-size: 2rem !important;
    }

    div:first-child {
        padding-bottom: 4px;
        background-color: ${({ quantity, theme }) => (quantity > 0 ? theme.main : theme.lightGray)};
    }

    div:last-child {
        background-color: ${({ quantity, theme }) => (quantity < 5 ? theme.main : theme.lightGray)};
    }

    div {
        display: flex;
        align-items: center;
        justify-content: center;
        color: ${({ theme }) => theme.overMain};
        font-size: 2rem !important;
        height: 1.5rem;
        width: 1.5rem;
        border-radius: 50%;
        margin-bottom: 5px;
        cursor: pointer;

        -webkit-user-select: none; /* Safari */
        -moz-user-select: none; /* Firefox */
        -ms-user-select: none; /* IE10+/Edge */
        user-select: none; /* Standard */
    }
`;

export default function CartProduct({ productData, quantity, setCart, index }) {
    const navigate = useNavigate();
    const { token } = useContext(UserContext);
    const { apiLink } = useContext(ConfigContext);

    const updateCart = (newQuantity) => {
        setCart((prevCart) => {
            prevCart[index] = { ...prevCart[index], quantity: newQuantity };
            return [...prevCart];
        });
        axios
            .put(
                `${apiLink}/cart`,
                { productId: productData._id, quantity: newQuantity },
                { headers: { authorization: `Bearer ${token}` } }
            )
            .catch(console.error);
    };
    return (
        <Product quantity={quantity}>
            <div onClick={() => navigate(`/products/${productData._id}`)}>
                <img src={productData.thumbnail} alt="img" />
                <div>
                    <h1>{productData.title}</h1>
                    <p>{productData.price.toFixed(2)}</p>
                </div>
            </div>
            <QuantityCounter quantity={quantity}>
                <div onClick={() => quantity > 0 && updateCart(quantity - 1)}>-</div>
                <p>{quantity}</p>
                <div onClick={() => quantity < 5 && updateCart(quantity + 1)}>+</div>
            </QuantityCounter>
        </Product>
    );
}
