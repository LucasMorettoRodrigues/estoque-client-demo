import { FC, InputHTMLAttributes } from "react"
import styled from "styled-components"

const Label = styled.label`
    display: block;
    margin-left: 2px;
`
const SInput = styled.input`
    display: block;
    width: 100%;
    padding: 10px 10px;
    outline-color: lightblue;
    border: 1px solid lightgray;
    border-radius: 5px;
    margin-bottom: 20px;
`

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    name: string,
    label: string
}

const Input: FC<InputProps> = ({ name, label, ...rest }: InputProps) => {
    return (
        <>
            <Label htmlFor={name}>{label}</Label>
            <SInput id={name} {...rest}></SInput>
        </>
    )
}

export default Input
