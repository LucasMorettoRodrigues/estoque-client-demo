import styled from "styled-components"

const ActionButton = styled.li<{ width?: string }>`
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
    width: ${props => props.width ? props.width : '90px'};
    padding: 10px;
    color: gray;
    cursor: pointer;

    &:hover {
        color: black;
    }
`

type Props = {
    onClick: () => void,
    width?: string,
    children: JSX.Element | JSX.Element[],
}

export default function EditDeleteButton({ onClick, children, width }: Props) {
    return (
        <ActionButton onClick={onClick} width={width}>
            {children}
        </ActionButton>
    )
}
