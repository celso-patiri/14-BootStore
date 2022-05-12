import styled from "styled-components";

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    padding: 0;
    gap: 10px;
`;

const Main = styled.div`
    height: 160px;
    width: 140px;
    border-radius: 20px;
    background-color: #e2e2e2;
    position: relative;
    cursor: pointer;
`;

const Bottom = styled.div`
    display: flex;
    flex-direction: column;
    padding: 0;
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
        --ionicon-stroke-width: ${({ selected }) => (selected ? "0px" : "40px")};
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

export default function ProductThumb() {
    const isLiked = true;
    const isInCart = false;

    return (
        <Wrapper>
            <Main>
                <Buttons>
                    <LikeButton selected={isLiked}>
                        <ion-icon name={`heart${isLiked ? "" : "-outline"}`}></ion-icon>
                    </LikeButton>
                    <CartButton selected={isInCart}>
                        <ion-icon name={`cart${isInCart ? "" : "-outline"}`}></ion-icon>
                    </CartButton>
                </Buttons>
            </Main>
            <Bottom>
                <Text>Title</Text>
                <Text>Price</Text>
            </Bottom>
        </Wrapper>
    );
}
