import styled from "styled-components";

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 95px;
    gap: 10px;
    cursor: pointer;
`;

const Circle = styled.div`
    width: 70px;
    height: 70px;
    border-radius: 100%;
    background-color: #e2e2e2;
`;

const Title = styled.div`
    font-size: 14px;
    font-weight: 600;
`;

export default function CategoryThumb() {
    return (
        <Wrapper>
            <Circle></Circle>
            <Title>Teste</Title>
        </Wrapper>
    );
}
