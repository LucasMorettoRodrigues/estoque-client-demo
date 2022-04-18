import styled from "styled-components"

const SButton = styled.button<{ bg?: string }>`
    background-color: ${props => props.bg === 'red' ? '#ff3232' : (props.bg === 'blue' ? '#3d69c7' : '#3dc73d')};
    color: white;
    border: none;
    padding: 15px 30px;
    border-radius: 5px;
    cursor: pointer;
    font-weight: 600;
    margin: 0 20px 20px 0;

    &:hover {
        opacity: 0.95;
    }
`

type Props = {
    text: string,
    onClick?: () => void,
    bg?: string
}

export default function Button({ text, onClick, bg }: Props) {
    return (
        <SButton bg={bg} onClick={onClick}>{text}</SButton>
    )
}
