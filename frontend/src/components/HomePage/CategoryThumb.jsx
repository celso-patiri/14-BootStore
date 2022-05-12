import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 95px;
    gap: 10px;
    cursor: pointer;

    :hover {
        img {
            width: 115%;
            height: 115%;
        }
    }
`;

const Circle = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;

    width: 70px;
    height: 70px;
    border-radius: 100%;
    background-color: #e2e2e2;
    overflow: hidden;

    img {
        transition: all 0.2s linear;
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
`;

const Title = styled.div`
    font-size: 14px;
    font-weight: 600;
    text-align: center;
`;

export default function CategoryThumb({ category }) {
    const navigate = useNavigate();
    return (
        <Wrapper
            onClick={() => {
                navigate(`/categories/${category.category}`);
            }}
        >
            <Circle>
                <img src={category.thumbnail}></img>
            </Circle>
            <Title>{category.title}</Title>
        </Wrapper>
    );
}
