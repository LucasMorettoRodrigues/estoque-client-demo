import { SelectHTMLAttributes } from "react"
import styled from "styled-components"

const Label = styled.label<{ display?: string }>`
    display: block;
    margin-left: '4px';
    margin-right: ${props => props.display === 'flex' ? '8px' : 0};
    margin-bottom: 4px;
`
const Select = styled.select`
    display: block;
    width: 100%;
    padding: 10px;
    outline-color: lightblue;
    background-color: white;
    border: 1px solid lightgray;
    border-radius: 5px;
    min-width: 180px;
    cursor: pointer;
`

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
    name: string,
    label: string,
    display?: string
}

export default function Input({ name, label, display, ...rest }: SelectProps) {
    return (
        <>
            <Label htmlFor={name} display={display}>{label}</Label>
            <Select id={name} {...rest}></Select>
        </>
    )
}
