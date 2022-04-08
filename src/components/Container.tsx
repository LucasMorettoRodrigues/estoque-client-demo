import styled from "styled-components"

const SContainer = styled.div`
    background-color: #f5f5f5;
`
const Wrapper = styled.div`
    max-width: 1300px;
    margin: 0 auto;
    padding: 10px 20px;
    min-height: 90vh;
`

type Props = {
    children: JSX.Element | JSX.Element[],
};

export default function Container({ children }: Props) {
    return (
        <SContainer>
            <Wrapper>
                {children}
            </Wrapper>
        </SContainer>
    )
}
