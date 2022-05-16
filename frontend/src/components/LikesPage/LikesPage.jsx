import styled from "styled-components";
import ProductThumb from "../Utils/ProductThumb";
import { useContext, useEffect, useRef, useState } from "react";
import { UserContext } from "../../contexts/UserContext";
import { AppContext } from "../../contexts/AppContext";
import { useLinkClickHandler, useNavigate, useParams, Link } from "react-router-dom";

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    position: relative;
    width: 100%;
    height: 100%;
    align-items: center;
`;

const Header = styled.div`
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

const Main = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-content: center;
    width: 100%;
    padding: 25px;
    gap: 25px;
    flex: 1 1 auto;
    overflow-y: auto;

    p {
        text-align: center;
    }
`;

const Title = styled.div`
    font-size: 18px;
    font-weight: bold;
    text-align: center;
`;

const Products = styled.div`
    justify-content: center;
    display: flex;
    flex-wrap: wrap;
    gap: 30px;
    width: 100%;
    align-content: start;
`;

const Button = styled.button`
    align-self: center;
    border-radius: 12px;
    border-style: none;
    background-color: ${({ theme }) => theme.main};
    :hover {
        background-color: ${({ theme }) => theme.hoverMain};
    }
    color: ${({ theme }) => theme.overMain};
    font-weight: 700;
    font-size: 18px;
    padding: 20px 0;
    width: 100%;
    max-width: 500px;
    cursor: pointer;
`;

const PageTitle = styled.div``;

export default function LikesPage() {
    const { setSelectedNavTab } = useContext(AppContext);
    const { token, user, likes, setLikes, getData, postData, setCart } = useContext(UserContext);
    const navigate = useRef(useNavigate());

    useEffect(() => {
        if (!token) {
            const localToken = JSON.parse(localStorage.getItem("bootstore_token"));
            if (!localToken) navigate.current("/");
        }

        setSelectedNavTab("likes");
        if (token && !likes) {
            getData(`wishlist`, setLikes);
        }
    }, [token]);

    const thumbs = likes ? (
        likes.map((product, index) => {
            return (
                <ProductThumb key={index} product={product} showCartButton={true}></ProductThumb>
            );
        })
    ) : (
        <></>
    );

    const noLikesMsg = (
        <>
            <p>Você ainda não tem nenhuma curtida.</p>
            <p>
                Que tal <Link to="/">explorar?</Link> um pouco?
            </p>
        </>
    );

    async function addAllToCart() {
        try {
            await postData("wishlist/addToCart", {});
            await getData("cart", setCart);
        } catch {}
    }

    return (
        <Wrapper>
            <Header>
                <Title>Meus likes ❤️</Title>
            </Header>
            <Main>
                <Products>{thumbs}</Products>
                {likes && likes.length > 0 ? (
                    <Button onClick={addAllToCart}>Adicione todos ao carrinho</Button>
                ) : (
                    noLikesMsg
                )}
            </Main>
        </Wrapper>
    );
}
