import styled from "styled-components"

const ActionButton = styled.li`
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
    width: 90px;
    padding: 10px;
    color: gray;
    cursor: pointer;

    &:hover {
        color: black;
    }
`

type Props = {
    onClick: () => void,
    children: JSX.Element | JSX.Element[],
}

export default function EditDeleteButton({ onClick, children }: Props) {
    return (
        <ActionButton onClick={onClick}>
            {children}
        </ActionButton>
    )
}
