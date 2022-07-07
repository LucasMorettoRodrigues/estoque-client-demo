import styled from "styled-components"

const Container = styled.div<{ bColor: string }>`
    background-color: ${props => props.bColor};
    margin: 4px 0;
    font-size: 14px;
    padding: 4px 5px;
    border-radius: 5px;
`
const InnerContainer = styled.div`
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;
`
const Product = styled.h5`
    flex: 2;
    font-size: 12px;
`
const Text = styled.p`
    display: flex;
    align-items: center;
    font-size: 12px;
`
const SecondaryText = styled.p`
    font-size: 12px;
    color: #111;
    margin-right: 5px;
`

type Props = {
    product: string,
    lote?: string,
    validity?: string,
    bColor: string
}

export default function ValidityInfoItem({ bColor, product, lote, validity }: Props) {
    return (
        <Container bColor={bColor}>
            <InnerContainer>
                <Product>{product}</Product>
                <Text style={{ flex: 1 }}><SecondaryText>{lote && 'Lote:'} </ SecondaryText>{lote}</Text>
                <Text><SecondaryText>{validity && 'Validade:'} </SecondaryText>{validity}</Text>
            </InnerContainer>
        </Container>
    )
}
