import styled from "styled-components"
import { IProductInventory } from "../../types/TProduct"
import ChartPie from "../Charts/PieChart"

const InfoWrapper = styled.div`
    display: flex;
    align-items: center;
`
const InfoContainer = styled.div`
    display: flex;
    margin: 10px auto;
    max-width: 330px;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 8px;
    padding: 20px;
    border: solid 4px lightgray;
    border-radius: 50px;
    display: none;
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
    products: IProductInventory[]
}

export default function InventoryAnalisys({ products }: Props) {

    const allProducts = products.map(i => i.subproducts!.length).reduce((sum, i) => sum + i, 0)
    const divergentProducts = products.map(i => i.subproducts!.filter(j => j.reason).length).reduce((sum, i) => sum + i, 0)
    const rigthProducts = products.map(i => i.subproducts!.filter(j => !j.reason).length).reduce((sum, i) => sum + i, 0)

    const colors = ['#00B7FF', '#67c7ff', '#0033c0', '#2a9cff', '#0073FF', '#001986', '#005CFF']

    let test: any = []
    products.forEach((item, index) => item.subproducts?.forEach(j => {
        if (j.reason) {
            test.find((i: any) => i.name === j.reason)
                ? test = test.map((k: any) => k.name === j.reason
                    ? { ...k, value: k.value + 1 }
                    : k
                )
                : test.push({ name: j.reason, value: 1 })
        }
    }))

    test = test.map((item: any, index: number) => ({ ...item, color: colors[index] }))
    console.log(test)

    const data = [
        { name: 'Items em acordo', value: rigthProducts, color: '#37bb1c' },
        { name: 'Items em desacordo', value: divergentProducts, color: '#e41f1f' },
    ]

    return (
        <>
            <InfoWrapper>
                <div style={{ flex: 1, height: '300px' }}>
                    <h3 style={{ textAlign: 'center' }}>Resultado do inventário </h3>
                    <ChartPie data={data} radius={90} />
                </div>
                <div style={{ flex: 1, height: '300px' }}>
                    <h3 style={{ textAlign: 'center' }}>Motivos da divergência</h3>
                    <ChartPie data={test} radius={90} />
                </div>
            </InfoWrapper>
            <div style={{ flex: 1 }}>
                <InfoContainer>
                    <Text>Total de Itens:</Text>
                    <Value>{allProducts}</Value>
                    <Text>Itens em desacordo:</Text>
                    <Value>{divergentProducts}</Value>
                    <Text>Porcentagem em desacordo:</Text>
                    <Value>{(divergentProducts * 100 / allProducts).toFixed(2)}%</Value>
                </InfoContainer>
            </div>
        </>

    )
}
