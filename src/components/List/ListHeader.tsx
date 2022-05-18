import styled from "styled-components"

const ListHeader = styled.div<{ fontSize?: string }>`
    position: sticky;
    top: 0;
    z-index: 1;
    height: 45px;
    background-color: #5fb4ff;
    display: flex;
    align-items: center;
    border-bottom: 1px solid lightgray;
    font-size: ${props => props.fontSize ? props.fontSize : '15px'};
    font-weight: bold;
    border-bottom: 1px solid #cacaca;
`

type Props = {
    children: JSX.Element[]
    fontSize?: string
}

export default function ListHeaderItem({ children, fontSize }: Props) {
    return (
        <ListHeader fontSize={fontSize}>
            {children}
        </ListHeader>
    )
}
