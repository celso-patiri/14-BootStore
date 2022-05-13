import styled from "styled-components";
import { useEffect, useContext, useState } from "react";
import { useParams } from "react-router";
import UserContext from "../../contexts/UserContext";
import AppContext from "../../contexts/AppContext";
import dayjs from "dayjs";
import { Link } from "react-router-dom";

const OrdersPageLink = styled.h1`
    font-size: 14px;
    font-weight: 600;
`;

const Title = styled.h1`
    font-size: 18px;
    font-weight: 700;
`;

const Products = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 10px;
`;

const Product = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    gap: 20px;
`;

const ProductThumb = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 70px;
    height: 70px;
    border-radius: 15px;
    overflow: hidden;

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
`;

const ProductTexts = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

const ProductTitle = styled.h1`
    font-size: 18px;
    font-weight: 700;
`;

const ProductPrice = styled.h1`
    font-size: 14px;
    font-weight: 400;
`;

export default function OrderPage() {
    const { orderId } = useParams();
    const { setUserPageTab } = useContext(AppContext);
    const { token, orders, setOrders, getData } = useContext(UserContext);
    const [order, setOrder] = useState(null);

    useEffect(() => {
        setUserPageTab("orders");
        if (orders) {
            orders.forEach((ord) => {
                if (ord._id === orderId) {
                    setOrder(ord);
                }
            });
        } else {
            getData("/orders", setOrders);
        }
    }, [token, orders]);

    const title = order
        ? `${dayjs(order.date).format("DD/MM")} - Total: $ ${order.totalAmmount}`
        : "Não encontrei :(";

    const products = order ? (
        order.products.map((product, index) => {
            return (
                <Product key={index}>
                    <ProductThumb>
                        <img src={product.thumbnail}></img>
                    </ProductThumb>
                    <ProductTexts>
                        <ProductTitle>{product.title}</ProductTitle>
                        <ProductPrice>
                            {product.quantity} x $ {product.price}
                        </ProductPrice>
                    </ProductTexts>
                </Product>
            );
        })
    ) : (
        <></>
    );

    return (
        <>
            <Link to="/user/orders/">
                <OrdersPageLink>histórico</OrdersPageLink>
            </Link>
            <Title>{title}</Title>
            <Products>{products}</Products>
        </>
    );
}
