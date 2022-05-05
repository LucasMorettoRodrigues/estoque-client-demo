import { InputHTMLAttributes } from "react"
import styled from "styled-components"

const Label = styled.label<{ display?: string }>`
    display: block;
    margin-left: 4px;
    margin-right: ${props => props.display === 'flex' ? '8px' : 0};
    margin-bottom: 4px;
`
const SInput = styled.input`
    display: block;
    width: 100%;
    padding: 12px;
    outline-color: lightblue;
    border: 1px solid lightgray;
    border-radius: 5px;
`

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    name: string,
    label: string,
    display?: string
}

export default function Input({ name, label, display, ...rest }: InputProps) {
    return (
        <>
            <Label htmlFor={name} display={display}>{label}</Label>
            <SInput id={name} {...rest}></SInput>
        </>
    )
}
