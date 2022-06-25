import styled from "styled-components"
import { TProduct } from "../../types/TProduct"
import ChartPie from "../PieChart"

const InfoWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-evenly;
`
const InfoContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 8px;
    padding: 20px;
    border: solid 4px lightgray;
    border-radius: 50px;
`
const Text = styled.p`
    color: #333;
    font-size: 20px;
    font-weight: 400;
`
const Value = styled.p`
    color: #555;
    font-size: 26px;
    font-weight: bold;
`

type Props = {
    products: TProduct[]
}

export default function InventoryAnalisys({ products }: Props) {

    const allProducts = products.map(i => i.subproducts!.length).reduce((sum, i) => sum + i, 0)
    const divergentProducts = products.map(i => i.subproducts!.filter(j => j.justification).length).reduce((sum, i) => sum + i, 0)
    const rigthProducts = products.map(i => i.subproducts!.filter(j => !j.justification).length).reduce((sum, i) => sum + i, 0)

    let test: any = []
    products.forEach(item => item.subproducts?.forEach(j => {
        if (j.obs) {
            test.find((i: any) => i.name === j.obs)
                ? test = test.map((k: any) => k.name === j.obs
                    ? { ...k, value: k.value + 1 }
                    : k
                )
                : test.push({ name: j.obs, value: 1, color: '#37bb1c' })
        }
    }))

    const data = [
        { name: 'Acordo', value: rigthProducts, color: '#37bb1c' },
        { name: 'Desacordo', value: divergentProducts, color: '#e41f1f' },
    ]

    return (
        <>
            <InfoWrapper>
                <div style={{ width: '300px', height: '300px' }}>
                    <ChartPie data={test} radius={130} />
                </div>
                <div style={{ width: '300px', height: '300px' }}>
                    <ChartPie data={data} radius={130} />
                </div>
                <InfoContainer>
                    <Text>Total de Itens:</Text>
                    <Value>{allProducts}</Value>
                    <Text>Itens em desacordo:</Text>
                    <Value>{divergentProducts}</Value>
                    <Text>Porcentagem em desacordo:</Text>
                    <Value>{(divergentProducts * 100 / allProducts).toFixed(2)}%</Value>
                </InfoContainer>
            </InfoWrapper>
        </>

    )
}
