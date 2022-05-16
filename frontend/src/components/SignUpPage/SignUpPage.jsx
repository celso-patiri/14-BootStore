import axios from "axios";
import { useContext, useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ConfigContext } from "../../contexts/ConfigContext.js";
import { UserContext } from "../../contexts/UserContext.js";
import { isValidEmail } from "../../utils/forms.js";
import ErrorMessage from "../AuthPage/ErrorMessage.jsx";
import Main from "../AuthPage/MainContainer.jsx";
import Form from "../AuthPage/StyledForm.jsx";
import Button from "../AuthPage/SubmitButton.jsx";
import Title from "../AuthPage/Title.jsx";
import Input from "../AuthPage/TextInput.jsx";

export default function SignUpPage() {
    const navigate = useRef(useNavigate());
    const { apiLink } = useContext(ConfigContext);
    const { setUser, setToken, token } = useContext(UserContext);

    const [formInput, setFormInput] = useState({});
    const [inputErrors, setInputErrors] = useState([false, false, false, false]);
    const [apiError, setApiError] = useState(null);

    useEffect(() => {
        if (token) navigate.current("/");
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
        formInput[e.target.name] = e.target.value;
        setFormInput(formInput);
    };

    const handleSubmit = (e) => {
        setApiError(null);

        e.preventDefault();
        if (!validateInput()) return setInputErrors([...inputErrors]);

        const { name, email, password } = formInput;
        axios
            .post(`${apiLink}/auth/signup`, { name, email, password })
            .then(({ data }) => {
                const { name, email, token } = data;
                setUser({ name, email });
                setToken({ token });
                localStorage.setItem("bootstore_token", JSON.stringify(token));
                navigate("/");
            })
            .catch((error) => {
                console.log(error);
                setApiError(error.response.data.error);
            });
    };

    const ApiErrorsEl = apiError ? <ErrorMessage isError={true}>{apiError}</ErrorMessage> : <></>;

    return (
        <Main>
            <Title>TheBestStore</Title>
            <Form>
                <Input
                    type="text"
                    placeholder="Nome"
                    name="name"
                    onChange={handleInput}
                    error={inputErrors[0]}
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
                {ApiErrorsEl}
                <Button onClick={handleSubmit}>Cadastrar</Button>
            </Form>
            <Link to="/signin">Ja tem login? Clique para entrar</Link>
        </Main>
    );
}
