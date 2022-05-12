import styled from "styled-components";
import ProductThumb from "../Utils/ProductThumb";
import { useContext, useEffect, useState } from "react";
import UserContext from "../../contexts/UserContext";
import { useNavigate, useParams } from "react-router-dom";

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

const PageTitle = styled.div``;

export default function CategoryPage() {
    const { categoryName } = useParams();

    const [products, setProducts] = useState(null);
    const [newProducts, setNewProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [category, setCategory] = useState(null);
    const [lastPage, setLastPage] = useState(0);
    const { getData } = useContext(UserContext);

    const navigate = useNavigate();

    useEffect(() => {
        if (categories.length === 0) {
            getData(`/products/categories/`, setCategories);
        }
        if (!category) {
            setCategory(
                categories.find((c) => {
                    return c.category === categoryName;
                })
            );
        }
        if (!products) {
            getData(`/products/category/${categoryName}`, setProducts);
        }
    }, [categories]);

    async function backButtonPressed(event) {
        navigate(-1);
    }

    const thumbs = products ? (
        products.map((product, index) => {
            return (
                <ProductThumb key={index} product={product} showCartButton={true}></ProductThumb>
            );
        })
    ) : (
        <></>
    );

    return (
        <Wrapper>
            <Header>
                <BackButton onClick={backButtonPressed}>
                    <ion-icon name="chevron-back-outline"></ion-icon>
                </BackButton>
                {category ? <Title>{category.title}</Title> : <></>}
            </Header>
            <Products>{thumbs}</Products>
        </Wrapper>
    );
}
