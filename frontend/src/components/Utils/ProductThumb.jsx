import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { UserContext } from "../../contexts/UserContext";

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    padding: 0;
    gap: 10px;
    width: 140px;
    cursor: pointer;
`;

const Main = styled.div`
    height: 160px;
    width: 100%;
    border-radius: 20px;
    background-color: #e2e2e2;
    position: relative;
    overflow: hidden;

    display: flex;
    align-items: center;
    justify-content: center;

    img {
        transition: all 0.2s linear;
        width: 100%;
        height: 100%;
        object-fit: cover;

        :hover {
            width: 110%;
            height: 110%;
        }
    }
`;

const Bottom = styled.div`
    display: flex;
    flex-direction: column;
    padding: 0;
    gap: 5px;
    width: 100%;
`;

const Text = styled.div`
    font-size: 14px;
    font-weight: bold;
`;

const Buttons = styled.div`
    display: flex;
    flex-direction: column;
    gap: 5px;
    position: absolute;
    right: 10px;
    top: 10px;
    z-index: 20;
`;

const LikeButton = styled.div`
    width: 24px;
    height: 24px;
    background-color: white;
    border-radius: 100%;

    display: flex;
    align-items: center;
    justify-content: center;

    ion-icon {
        font-size: 16px;
        --ionicon-stroke-width: ${({ selected }) => (selected ? "0px" : "50px")};
        color: ${({ selected, theme }) => {
            return selected ? theme.special : theme.secondary;
        }};
    }

    cursor: pointer;
    :hover {
        ion-icon {
            color: ${({ theme }) => theme.special};
        }
    }
`;

const CartButton = styled.div`
    width: 24px;
    height: 24px;
    background-color: white;
    border-radius: 100%;

    display: flex;
    align-items: center;
    justify-content: center;
    ion-icon {
        font-size: 16px;
        --ionicon-stroke-width: ${({ selected }) => (selected ? "0px" : "40px")};
        color: ${({ selected, theme }) => {
            return selected ? theme.main : theme.secondary;
        }};
    }

    cursor: pointer;
    :hover {
        ion-icon {
            color: ${({ theme }) => theme.main};
        }
    }
`;

export default function ProductThumb({ product, showCartButton }) {
    const { setCart, setLikes, getData, putData, cart, likes, token } = useContext(UserContext);

    const [isLiked, setIsLiked] = useState(false);
    const [isInCart, setIsInCart] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        if (likes) {
            const likeProduct = likes.find((p) => {
                return p._id === product._id;
            });
            if (likeProduct) {
                setIsLiked(true);
            } else {
                setIsLiked(false);
            }
        }
        if (cart) {
            const cartProduct = cart.find((p) => {
                return p.productId === product._id;
            });
            if (cartProduct) {
                setIsInCart(true);
            } else {
                setIsInCart(false);
            }
        }
    }, [cart, likes, product, token]);

    async function likeButtonPressed(event) {
        event.stopPropagation();
        if (!token) {
            navigate("/signin");
        }
        try {
            await putData("wishlist", {
                productId: product._id,
                action: isLiked ? "delete" : "add",
            });
            setIsLiked(!isLiked);
            await getData("wishlist", setLikes);
        } catch (err) {
            return console.log(err.error);
        }
    }

    async function cartButtonPressed(event) {
        event.stopPropagation();
        if (!token) {
            navigate("/signin");
        }
        try {
            await putData("cart", {
                productId: product._id,
                quantity: isInCart ? "0" : "1",
            });
            setIsInCart(!isInCart);
            await getData("cart", setCart);
        } catch (err) {
            return console.log(err.error);
        }
    }

    return (
        <Wrapper>
            <Main
                onClick={(e) => {
                    navigate(`/products/${product._id}`);
                }}
            >
                <img src={product.thumbnail}></img>
                <Buttons>
                    <LikeButton selected={isLiked} onClick={likeButtonPressed}>
                        <ion-icon name={`heart${isLiked ? "" : "-outline"}`}></ion-icon>
                    </LikeButton>
                    {showCartButton ? (
                        <CartButton selected={isInCart} onClick={cartButtonPressed}>
                            <ion-icon name={`cart${isInCart ? "" : "-outline"}`}></ion-icon>
                        </CartButton>
                    ) : (
                        <></>
                    )}
                </Buttons>
            </Main>
            <Bottom>
                <Text>{product.title}</Text>
                <Text>{`$ ${product.price}`}</Text>
            </Bottom>
        </Wrapper>
    );
}
