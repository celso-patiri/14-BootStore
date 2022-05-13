import axios from "axios";
import { useContext, useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ConfigContext from "../../contexts/ConfigContext";
import UserContext from "../../contexts/UserContext";
import AppContext from "../../contexts/AppContext";

import { isValidEmail } from "../../utils/forms";
import ErrorMessage from "../AuthPage/ErrorMessage.jsx";
import Main from "../AuthPage/MainContainer.jsx";
import Form from "../AuthPage/StyledForm.jsx";
import Button from "../AuthPage/SubmitButton.jsx";
import Input from "../AuthPage/TextInput.jsx";
import Title from "../AuthPage/Title.jsx";

export default function SignInPage() {
    const navigate = useRef(useNavigate());
    const { apiLink } = useContext(ConfigContext);
    const { setUser, setToken, token } = useContext(UserContext);

    const { setSelectedNavTab } = useContext(AppContext);

    useEffect(() => {
        if (token) navigate.current("/");
    }, [token]);

    setSelectedNavTab("user");

    const [formInput, setFormInput] = useState({});
    const [inputErrors, setInputErrors] = useState([false, false, false, false]);

    const validateInput = () => {
        const { email, password } = formInput;
        inputErrors[0] = !email || !isValidEmail(email);
        inputErrors[1] = !password || password.length < 4;

        return inputErrors.every((isError) => !isError);
    };

    const handleInput = (e) => {
        formInput[e.target.name] = e.target.value;
        setFormInput(formInput);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validateInput()) return setInputErrors([...inputErrors]);

        const { email, password } = formInput;
        axios
            .post(`${apiLink}/auth/signin`, { email, password })
            .then(({ data }) => {
                const { name, email, token } = data;
                setUser({ name, email });
                setToken(token);
                localStorage.setItem("bootstore_token", JSON.stringify(token));
            })
            .catch(console.error);
    };

    return (
        <Main>
            <Title>TheBestStore</Title>
            <Form>
                <Input
                    type="email"
                    placeholder="Email"
                    name="email"
                    onChange={handleInput}
                    error={inputErrors[0]}
                />
                <ErrorMessage isError={inputErrors[0]}>
                    O email deve ter formato valido
                </ErrorMessage>
                <Input
                    type="password"
                    placeholder="Senha"
                    name="password"
                    onChange={handleInput}
                    error={inputErrors[1]}
                />
                <ErrorMessage isError={inputErrors[1]}>
                    A senha deve ter pelo menos 4 caracteres
                </ErrorMessage>
                <Button onClick={handleSubmit}>Entrar</Button>
            </Form>
            <Link to="/signup">Não tem login? Cadastre-se!</Link>
        </Main>
    );
}
