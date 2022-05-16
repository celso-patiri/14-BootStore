import { useContext, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { UserContext } from "../../contexts/UserContext";

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    position: relative;
    width: 60%;
    height: 100%;
    margin: auto auto;
    justify-content: center;
    font-weight: 600;
    gap: 1rem;

    div {
        margin: 0 auto;
        h1 {
            font-size: 1.5rem;
            text-align: center;
        }
        display: flex;
        align-items: center;
        gap: 5px;
        img {
            width: 3rem;
        }
    }

    h2 {
        font-size: 1.3rem;
        text-align: center;
    }
`;

const Button = styled.button`
    align-self: center;
    border-radius: 12px;
    border-style: none;
    color: ${({ theme }) => theme.overMain};
    font-weight: 700;
    font-size: 1rem;
    width: 80%;
    height: 3rem;
    margin: 1rem;
    background-color: ${({ theme }) => theme.main};
    cursor: pointer;
`;
export default function SuccessPage() {
    const navigate = useRef(useNavigate());
    const { token } = useContext(UserContext);

    useEffect(() => {
        if (!token) {
            const localToken = JSON.parse(localStorage.getItem("bootstore_token"));
            if (!localToken) navigate.current("/");
        }
    }, [token]);

    return (
        <Wrapper>
            <div>
                <h1>Uhuuul!</h1>
                <img src="/success.gif" alt="sucess" />
            </div>
            <h2>Seu pedido foi feito com sucesso 🎉 Enviamos seu email de confirmacao :)</h2>
            <h2>Enquanto seu pedido chega, que tal checar 👀 novos produtos?</h2>
            <Button onClick={() => navigate.current("/")}>Ir para Home</Button>
        </Wrapper>
    );
}
