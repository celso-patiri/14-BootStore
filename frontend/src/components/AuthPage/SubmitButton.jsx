import styled from "styled-components";

const Button = styled.button`
    align-self: center;
    border-radius: 12px;
    border-style: none;
    background-color: ${({ theme }) => theme.main};
    color: ${({ theme }) => theme.overMain};
    font-weight: 700;
    font-size: 1rem;
    width: 60%;
    height: 2.5rem;
`;

export default Button;
