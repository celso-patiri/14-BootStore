import styled from "styled-components";

const Input = styled.input`
    border-radius: 8px;
    border-style: none;
    padding: 5px 1rem;
    /* border: 1px solid ${({ theme }) => theme.neutral}; */
    border: 1px solid
        ${(props) => (props.error ? ({ theme }) => theme.wrong : ({ theme }) => theme.neutral)};
    width: 100%;
    height: 2rem;
`;

export default Input;
