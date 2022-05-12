import styled from "styled-components";

const ErrorMessage = styled.p`
    font-size: 0.8rem;
    color: ${({ theme }) => theme.wrong};
`;

export default function ErrorComponent({ isError, children }) {
    return isError && <ErrorMessage>{children}</ErrorMessage>;
}
