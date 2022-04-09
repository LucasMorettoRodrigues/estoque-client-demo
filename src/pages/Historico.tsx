import styled from "styled-components"
import { useNavigate } from "react-router-dom"
import Button from "../components/Button"
import { useAppSelector } from "../app/hooks"
import { getProduct, getSubProduct } from "../utils/functions"
import { useEffect, useState } from "react"
import { TStockIn } from "../types/TStockIn"
import { TStockOut } from "../types/TStockOut"

const Container = styled.div``
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

    const navigate = useNavigate()
    const stockOuts = useAppSelector(state => state.stockOut.stockOuts)
    const stockIns = useAppSelector(state => state.stockIn.stockIns)
    const products = useAppSelector(state => state.produto.produtos)
    const [historic, setHistoric] = useState<any[]>([])

    useEffect(() => {
        setHistoric([...stockIns, ...stockOuts])
    }, [])

    return (
        <>
            <Button onClick={() => navigate('/novoProduto')} text={'Cadastrar Novo Produto'} />
            <Button onClick={() => navigate('/produtos/detalhes')} text={'Detalhes'} />
            <ListHeader>
                <ListHeaderItem flex={1}>Data</ListHeaderItem>
                <ListHeaderItem flex={2}>Ação</ListHeaderItem>
                <ListHeaderItem flex={3}>Produto</ListHeaderItem>
                <ListHeaderItem flex={1}>Brand</ListHeaderItem>
                <ListHeaderItem flex={1}>Preço</ListHeaderItem>
                <ListHeaderItem flex={1}>Lote</ListHeaderItem>
                <ListHeaderItem flex={1}>Validade</ListHeaderItem>
                <ListHeaderItem flex={1}>Quantidade</ListHeaderItem>
            </ListHeader>
            {
                historic.map((item) => (
                    !item.price
                        ? (
                            <Container key={item.id}>
                                <Product backgroundColor='#ffa7a7' >
                                    <ProductLi flex={1}>{item.date.slice(0, 10)}</ProductLi>
                                    <ProductLi flex={2}>Retirada de Estoque</ProductLi>
                                    <ProductLi flex={3}>{getProduct(products, item.product_id)?.name}</ProductLi>
                                    <ProductLi flex={1}>{getProduct(products, item.product_id)?.brand}</ProductLi>
                                    <ProductLi flex={1}></ProductLi>
                                    <ProductLi flex={1}>{getSubProduct(products, item.product_id, item.subproduct_id)?.lote}</ProductLi>
                                    <ProductLi flex={1}>{getSubProduct(products, item.product_id, item.subproduct_id)?.validade.slice(0, 10)}</ProductLi>
                                    <ProductLi flex={1}>{item.quantity}</ProductLi>
                                </Product>
                            </Container>
                        )
                        : (
                            <Container key={item.id}>
                                <Product backgroundColor='#a3ff86'>
                                    <ProductLi flex={1}>{item.date.slice(0, 10)}</ProductLi>
                                    <ProductLi flex={2}>Compra</ProductLi>
                                    <ProductLi flex={3}>{getProduct(products, item.product_id)?.name}</ProductLi>
                                    <ProductLi flex={1}>{getProduct(products, item.product_id)?.brand}</ProductLi>
                                    <ProductLi flex={1}>R$ {item.price.replace('.', ',')}</ProductLi>
                                    <ProductLi flex={1}>{item.lote}</ProductLi>
                                    <ProductLi flex={1}>{item.validade && item.validade.slice(0, 10)}</ProductLi>
                                    <ProductLi flex={1}>{item.quantity}</ProductLi>
                                </Product>
                            </Container>
                        )
                ))
            }
        </>
    )
}
