import styled from "styled-components"

const ProductCard = styled.div`
    padding: 20px;
    min-width: 280px;
    text-align: center;
    border: 5px solid #5fb4ff;
    border-radius: 20px;
    background-color: white;
`

const SubTitle = styled.p`
    font-size: 18px;
    color: #111;
    font-weight: bold;
    margin-bottom: 15px;
`
const Name = styled.p`
    font-size: 22px;
    color: #168eff;
    font-weight: 300;
`
const Brand = styled.p`
    font-size: 14px;
    color: #168eff;
    font-weight: bold;
    margin-bottom: 15px;
    align-self: flex-end;
`
const Obs = styled.p`
    font-size: 14px;
    color: #111;
    font-weight: 200;
    margin-bottom: 15px;
`
const SubProductInfo = styled.p`
    font-size: 14px;
    color: #444;
    font-weight: 500;
`
const QuantityLabel = styled.p`
    font-size: 20px;
    color: #168eff;
    font-weight: 500;
    margin-top: 15px;
    margin-bottom: 5px;
`
const QuantityValue = styled.div`
    display: flex;
    align-items: flex-end;
    justify-content: center;
    font-size: 24px;
    color: white;
    font-weight: bold;
    margin: 0 50px;
    background-color: #168eff;
    border-radius: 15px;
`
const Unit = styled.p`
    font-size: 14px;
    color: white;
    font-weight: bold;
    margin-left: 3px;
    margin-bottom: 3px;
`
const IconContainer = styled.div`
    margin: 40px 0;
    opacity: 0.7;

    &:hover {
        opacity: 1;
    }
`

type Props = {
    title: string,
    name: string,
    brand: string,
    obs?: string,
    lote: string,
    validade: string,
    unit: string,
    quantity: number
}

export default function Card({ title, name, brand, obs, lote, validade, quantity, unit }: Props) {
    return (
        <ProductCard>
            <SubTitle>{title}</SubTitle>
            <Name>{name}</Name>
            <Brand>{brand}</Brand>
            {obs && <Obs>{obs}</Obs>}
            <SubProductInfo>Lote: {lote}</SubProductInfo>
            <SubProductInfo>Validade: {validade!.slice(0, 10)}</SubProductInfo>
            <QuantityLabel>Quantidade: </QuantityLabel>
            <QuantityValue>{quantity}<Unit>{unit}</Unit></QuantityValue>
        </ProductCard>
    )
}

// quantidade de aliquota minima para estoque