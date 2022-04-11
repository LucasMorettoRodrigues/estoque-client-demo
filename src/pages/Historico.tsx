import styled from "styled-components"
import { useAppSelector } from "../app/hooks"
import { getProduct } from "../utils/functions"
import { useEffect, useState } from "react"

const Container = styled.div``
const Title = styled.h1`
    color: #222;
    margin: 30px 0;
`
const ListHeader = styled.div`
    background-color: #5fb4ff;
    height: 45px;
    display: flex;
    align-items: center;
    border-bottom: 1px solid lightgray;
    font-size: 15px;
    font-weight: bold;
    border-bottom: 1px solid #cacaca;
`
const ListHeaderItem = styled.p<{ flex?: number }>`
    flex: ${props => props.flex ? props.flex : null};
    min-width: 75px;
    padding: 10px;
`
const Product = styled.ul<{ backgroundColor: string }>`
    height: 40px;
    background-color: ${props => props.backgroundColor};
    display: flex;
    align-items: center;
    border-bottom: 1px solid #cacaca;
`
const ProductLi = styled.li<{ flex?: number, color?: string }>`
    flex: ${props => props.flex ? props.flex : null};
    background-color: ${props => props.color ? props.color : null};
    font-size: 14px;
    min-width: 75px;
    padding: 10px;
`

export default function Historico() {

    const stockOuts = useAppSelector(state => state.stockOut.stockOuts)
    const stockIns = useAppSelector(state => state.stockIn.stockIns)
    const products = useAppSelector(state => state.produto.produtos)
    const [historic, setHistoric] = useState<any[]>([])

    useEffect(() => {
        setHistoric([...stockIns, ...stockOuts].sort(function compare(a, b) {
            let dateA: any = new Date(a.date!);
            let dateB: any = new Date(b.date!);
            return dateB - dateA;
        }))
    }, [stockIns, stockOuts])

    return (
        <>
            <Title>Histórico</Title>
            <ListHeader>
                <ListHeaderItem flex={0.9}>Data</ListHeaderItem>
                <ListHeaderItem flex={1.5}>Ação</ListHeaderItem>
                <ListHeaderItem flex={3}>Produto</ListHeaderItem>
                <ListHeaderItem flex={1}>Brand</ListHeaderItem>
                <ListHeaderItem flex={0.9}>Preço</ListHeaderItem>
                <ListHeaderItem flex={0.7}>Lote</ListHeaderItem>
                <ListHeaderItem flex={1}>Validade</ListHeaderItem>
                <ListHeaderItem flex={0.8} style={{ textAlign: 'center' }}>Quantidade</ListHeaderItem>
            </ListHeader>
            {
                historic.map((item, index) => (
                    !item.price
                        ? (
                            <Container key={index}>
                                <Product backgroundColor='#ffa7a7' >
                                    <ProductLi flex={0.9}>{item.date.slice(0, 10)}</ProductLi>
                                    <ProductLi flex={1.5}>Retirada de Estoque</ProductLi>
                                    <ProductLi flex={3}>{getProduct(products, item.product_id)?.name}</ProductLi>
                                    <ProductLi flex={1}>{getProduct(products, item.product_id)?.brand}</ProductLi>
                                    <ProductLi flex={0.9}></ProductLi>
                                    <ProductLi flex={0.7}>{item.lote}</ProductLi>
                                    <ProductLi flex={1}>{item.validade && item.validade.slice(0, 10)}</ProductLi>
                                    <ProductLi flex={0.8} style={{ textAlign: 'center' }}>{item.quantity}</ProductLi>
                                </Product>
                            </Container>
                        )
                        : (
                            <Container key={index}>
                                <Product backgroundColor='#a3ff86'>
                                    <ProductLi flex={0.9}>{item.date.slice(0, 10)}</ProductLi>
                                    <ProductLi flex={1.5}>Compra</ProductLi>
                                    <ProductLi flex={3}>{getProduct(products, item.product_id)?.name}</ProductLi>
                                    <ProductLi flex={1}>{getProduct(products, item.product_id)?.brand}</ProductLi>
                                    <ProductLi flex={0.9}>R$ {item.price.replace('.', ',')}</ProductLi>
                                    <ProductLi flex={0.7}>{item.lote}</ProductLi>
                                    <ProductLi flex={1}>{item.validade && item.validade.slice(0, 10)}</ProductLi>
                                    <ProductLi flex={0.8} style={{ textAlign: 'center' }}>{item.quantity}</ProductLi>
                                </Product>
                            </Container>
                        )
                ))
            }
        </>
    )
}
