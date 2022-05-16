import styled from "styled-components";
import ProductThumb from "../Utils/ProductThumb";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../contexts/UserContext";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { ConfigContext } from "../../contexts/ConfigContext";

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
    gap: 30px;
`;

const Title = styled.div`
    font-size: 18px;
    font-weight: bold;
    text-align: center;
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

const Products = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 30px;
    width: 100%;
    padding: 0px 25px 50px 25px;
    flex: 1 1 auto;
    overflow-y: auto;
    align-content: start;
`;

const WalkButtons = styled.div`
    display: flex;
    gap: 10px;
`;

const WalkButton = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;

    width: 30px;
    height: 30px;
    border-radius: 100%;
    background-color: rgba(0, 0, 0, 0.1);
    :hover {
        background-color: rgba(0, 0, 0, 0.2);
    }

    ion-icon {
        font-size: 15px;
        --ionicon-stroke-width: 50px;
    }
    cursor: pointer;
`;

export default function ProductsPage() {
    const { categoryName } = useParams();

    const [products, setProducts] = useState(null);
    const [pageIndex, setPageIndex] = useState(0);
    const [lastPage, setLastPage] = useState(null);
    const { token, getData } = useContext(UserContext);
    const { apiLink } = useContext(ConfigContext);

    const navigate = useNavigate();

    useEffect(() => {
        if (!products) {
            getData(`products?skip=${10 * pageIndex}`, setProducts);
        }
    }, []);

    async function backButtonPressed(event) {
        navigate(-1);
    }

    async function walkButtonPressed(forward) {
        const config = { headers: { Authorization: `Bearer ${token}` } };

        let valorInicial = pageIndex;
        let page = pageIndex;
        let lastPageFound = lastPage;

        let change = true;

        try {
            if (!lastPageFound) {
                let promise = await axios.get(`${apiLink}products?skip=${10 * (page + 1)}`, config);
                if (promise.data.length === 0) {
                    setLastPage(page + 1);
                    lastPageFound = page + 1;
                }
            }

            if (forward) {
                if (lastPageFound && page + 1 >= lastPageFound) {
                    page = 0;
                } else {
                    page += 1;
                }
            } else {
                if (page - 1 < 0) {
                    if (lastPageFound) {
                        page = lastPageFound - 1;
                    } else {
                        change = false;
                    }
                } else {
                    page = page - 1;
                }
            }
            if (change && valorInicial != page) {
                let promise = await axios.get(`${apiLink}products?skip=${10 * page}`, config);
                setProducts(promise.data);
                setPageIndex(page);
            }
        } catch {}
    }

    const thumbs = products ? (
        products.map((product, index) => {
            return (
                <ProductThumb key={index} product={product} showCartButton={false}></ProductThumb>
            );
        })
    ) : (
        <></>
    );

    const walkBackwardButton = (
        <WalkButton
            onClick={() => {
                walkButtonPressed(false);
            }}
        >
            <ion-icon name="arrow-back-outline"></ion-icon>
        </WalkButton>
    );
    const walkForwardButton = (
        <WalkButton
            onClick={() => {
                walkButtonPressed(true);
            }}
        >
            <ion-icon name="arrow-forward-outline"></ion-icon>
        </WalkButton>
    );

    const walkButtons =
        lastPage && lastPage === 1 ? (
            <></>
        ) : (
            <WalkButtons>
                {!lastPage && pageIndex === 0 ? <></> : walkBackwardButton}
                {walkForwardButton}
            </WalkButtons>
        );

    return (
        <Wrapper>
            <Header>
                <BackButton onClick={backButtonPressed}>
                    <ion-icon name="chevron-back-outline"></ion-icon>
                </BackButton>
                <Title>Todos os produtos</Title>
                {walkButtons}
            </Header>
            <Products>{thumbs}</Products>
        </Wrapper>
    );
}
