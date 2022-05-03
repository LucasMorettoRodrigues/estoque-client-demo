import { FormEvent } from "react";
import styled from "styled-components"

const SForm = styled.form`
    display: flex;
    align-items: center;
    margin-bottom: 20px;
`
type Props = {
    children: JSX.Element | JSX.Element[],
    onSubmit: (e: FormEvent<HTMLFormElement>) => void
};

export default function Form({ children, onSubmit }: Props) {
    return (
        <SForm onSubmit={onSubmit}>
            {children}
        </SForm>
    )
}
