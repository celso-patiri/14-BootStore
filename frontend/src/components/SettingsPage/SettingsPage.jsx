import styled from "styled-components";
import { useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router";
import { UserContext } from "../../contexts/UserContext";
import { ConfigContext } from "../../contexts/ConfigContext";
import { AppContext } from "../../contexts/AppContext";
import axios from "axios";

import { isValidEmail } from "../../utils/forms";
import ErrorMessage from "../AuthPage/ErrorMessage.jsx";
import Form from "../AuthPage/StyledForm.jsx";
import Button from "../AuthPage/SubmitButton.jsx";
import Input from "../AuthPage/TextInput.jsx";

const PageTitle = styled.h1`
    font-size: 18px;
    font-weight: 700;
`;

const Orders = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 10px;
`;

const Order = styled.div`
    padding: 0 10px;
    display: flex;
    align-items: center;

    height: 40px;
    width: 100%;
    border-radius: 5px;
    background-color: ${({ theme }) => {
        return theme.lightGray;
    }};
    :hover {
        background-color: ${({ theme }) => {
            return theme.gray;
        }};
    }

    cursor: pointer;
`;

const ApiMessage = styled.p`
    color: ${({ success, theme }) => {
        return success ? theme.right : theme.wrong;
    }};
`;

export default function SettingsPage() {
    const { apiLink } = useContext(ConfigContext);
    const { setUserPageTab } = useContext(AppContext);
    const { user, setUser, token, setToken, orders, setOrders, getData, putData } =
        useContext(UserContext);

    const navigate = useNavigate();

    const [formInput, setFormInput] = useState({});
    const [inputErrors, setInputErrors] = useState([false, false, false, false]);
    const [apiMsg, setApiMsg] = useState(null);
    const [wasSaved, setWasSaved] = useState(false);

    useEffect(() => {
        setUserPageTab("settings");
        if (user) {
            setFormInput({ name: user.name, email: user.email });
        }
    }, [token]);

    const validateInput = () => {
        const { name, email, password, confirmPassword } = formInput;
        inputErrors[0] = !name || name.length < 2;
        inputErrors[1] = !email || !isValidEmail(email);
        inputErrors[2] = !password || password.length < 4;
        inputErrors[3] = !confirmPassword || password !== confirmPassword;

        return inputErrors.every((isError) => !isError);
    };

    const handleInput = (e) => {
        let newForm = { ...formInput };
        newForm[e.target.name] = e.target.value;
        setFormInput(newForm);
    };

    const handleSubmit = (e) => {
        setApiMsg(null);
        e.preventDefault();
        if (!validateInput()) return setInputErrors([...inputErrors]);
        let { name, email, password } = formInput;

        const config = { headers: { Authorization: `Bearer ${token}` } };
        axios
            .put(`${apiLink}user`, { name, email, password }, config)
            .then(({ data }) => {
                name = data.name;
                email = data.email;
                setUser({ name, email });
                setApiMsg("O cadastro foi atualizado!");
                setWasSaved(true);
            })
            .catch((error) => {
                console.log(error);
                setApiMsg("Não foi possível atualizar o cadastro.");
                setWasSaved(false);
            });
    };

    const ApiMsgEl = apiMsg ? <ApiMessage success={wasSaved}>{apiMsg}</ApiMessage> : <></>;

    return (
        <>
            <PageTitle>Atualizar Cadastro</PageTitle>
            <Form>
                <Input
                    type="text"
                    placeholder="Nome"
                    name="name"
                    onChange={handleInput}
                    error={inputErrors[0]}
                    value={formInput["name"]}
                />
                <ErrorMessage isError={inputErrors[0]}>
                    O nome deve ter pelo menos 2 caracteres
                </ErrorMessage>
                <Input
                    type="email"
                    placeholder="Email"
                    name="email"
                    onChange={handleInput}
                    error={inputErrors[1]}
                    value={formInput["email"]}
                />
                <ErrorMessage isError={inputErrors[1]}>
                    O email deve ter formato valido
                </ErrorMessage>
                <Input
                    type="password"
                    placeholder="Senha"
                    name="password"
                    onChange={handleInput}
                    error={inputErrors[2]}
                />
                <ErrorMessage isError={inputErrors[2]}>
                    A senha deve ter pelo menos 4 caracteres
                </ErrorMessage>
                <Input
                    type="password"
                    placeholder="Confirmar senha"
                    name="confirmPassword"
                    onChange={handleInput}
                    error={inputErrors[3]}
                />
                <ErrorMessage isError={inputErrors[3]}>As senhas devem ser iguais</ErrorMessage>
                <Button onClick={handleSubmit}>Cadastrar</Button>
                {ApiMsgEl}
            </Form>
        </>
    );
}
