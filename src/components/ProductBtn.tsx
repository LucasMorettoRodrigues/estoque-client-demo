import styled from "styled-components"

const Btn = styled.button<{ active?: boolean }>`
    font-size: 30px;
    color: ${props => props.active ? '#222' : '#c0c0c0'};
    font-weight: bold;
    margin-left: 10px;
    border: none;
    background-color: inherit;
    cursor: ${props => props.active ? 'default' : 'pointer'};

    &:hover {
        color: #222;
    }
`
type Props = {
    active?: boolean,
    text: string,
    onClick?: () => void
}

export default function ProductBtn({ active, onClick, text }: Props) {
    return (
        <Btn onClick={onClick} active={active}>
            {text}
        </Btn>
    )
}
