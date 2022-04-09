import styled from "styled-components"

const SButton = styled.button`
    background-color: #3dc73d;
    color: white;
    border: none;
    padding: 15px 30px;
    border-radius: 5px;
    cursor: pointer;
    font-weight: 600;
    margin: 0 20px 20px 0;
`

type Props = {
    text: string,
    onClick?: () => void
}

export default function Button({ text, onClick }: Props) {
    return (
        <SButton onClick={onClick}>{text}</SButton>
    )
}
