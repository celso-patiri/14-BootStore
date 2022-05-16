import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { UserContext } from "../../contexts/UserContext";

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
    justify-content: space-between;
    align-items: start;
    padding: 0 25px;
    position: absolute;
    width: 100%;
    height: 70px;
    z-index: 20;
    top: 30px;
`;

const LikeButton = styled.div`
    width: 56px;
    height: 56px;
    background-color: white;
    border-radius: 100%;

    display: flex;
    align-items: center;
    justify-content: center;

    ion-icon {
        font-size: 24px;
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

const BackButton = styled.div`
    width: 56px;
    height: 56px;
    background-color: rgba(255, 255, 255, 0.2);
    border-radius: 100%;

    display: flex;
    align-items: center;
    justify-content: center;

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

const ImageArea = styled.div`
    width: 100%;
    flex: 1 1 auto;
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
    width: 100%;
    max-width: 500px;
    height: 200px;
    flex: 0 0 auto;
    padding: 25px;
    justify-content: space-between;
`;

const Texts = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 10px;
`;

const TextsTop = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
`;

const Title = styled.h1`
    font-weight: bold;
    font-size: 24px;
`;

const Price = styled.h2`
    font-weight: bold;
    font-size: 36x;
`;

const Description = styled.p`
    font-size: 14px;
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
    cursor: pointer;
`;

export default function ProductPage() {
    const { productId } = useParams();

    const { setCart, setLikes, getData, putData, cart, likes, token } = useContext(UserContext);

    const [isLiked, setIsLiked] = useState(false);
    const [isInCart, setIsInCart] = useState(false);
    const [product, setProduct] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        if (!product) {
            getData(`/products/${productId}`, setProduct);
        }

        if (product && likes) {
            const likeProduct = likes.find((p) => {
                return p._id === product._id;
            });
            if (likeProduct) {
                setIsLiked(true);
            } else {
                setIsLiked(false);
            }
        }
        if (product && cart) {
            const cartProduct = cart.find((p) => {
                return p.productId === product._id;
            });
            if (cartProduct) {
                setIsInCart(true);
            } else {
                setIsInCart(false);
            }
        }
    }, [cart, likes, token, product]);

    async function likeButtonPressed(event) {
        event.stopPropagation();
        if (!token) {
            navigate("/signin");
        }
        try {
            await putData("/wishlist", {
                productId: product._id,
                action: isLiked ? "delete" : "add",
            });
            setIsLiked(!isLiked);
            await getData("/wishlist", setLikes);
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
            const cartProduct = cart.find((p) => {
                return p.productId === product._id;
            });

            if (isInCart) {
                navigate("/cart");
                return;
            } else {
                await putData("/cart", {
                    productId: product._id,
                    quantity: 1,
                });
                setIsInCart(!isInCart);
                await getData("/cart", setCart);
            }
        } catch (err) {
            return console.log(err.error);
        }
    }

    async function backButtonPressed(event) {
        navigate(-1);
    }

    const Image = product ? <img src={product.thumbnail}></img> : <></>;

    const bottom = product ? (
        <>
            <Texts>
                <TextsTop>
                    <Title>{product.title}</Title>
                    <Price>{product.price}</Price>
                </TextsTop>
                <Description>{product.description}</Description>
            </Texts>
            <Button onClick={cartButtonPressed}>
                {token
                    ? isInCart
                        ? `Você já pegou esse item. Ver carrinho!`
                        : "Adicionar ao carrinho"
                    : "Fazer login"}
            </Button>
        </>
    ) : (
        <></>
    );

    return (
        <Wrapper>
            <Header>
                <BackButton onClick={backButtonPressed}>
                    <ion-icon name="chevron-back-outline"></ion-icon>
                </BackButton>
                <LikeButton selected={isLiked} onClick={likeButtonPressed}>
                    <ion-icon name={`heart${isLiked ? "" : "-outline"}`}></ion-icon>
                </LikeButton>
            </Header>
            <ImageArea>{Image}</ImageArea>
            <Bottom>{bottom}</Bottom>
        </Wrapper>
    );
}
