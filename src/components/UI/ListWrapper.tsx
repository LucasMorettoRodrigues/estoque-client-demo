import styled from "styled-components"

const Wrapper = styled.div`
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
`

type Props = {
    children: JSX.Element[] | JSX.Element
}

export default function ListWrapper({ children }: Props) {
    return (
        <Wrapper>
            {children}
        </Wrapper>
    )
}
