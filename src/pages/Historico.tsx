import styled from "styled-components"
import { useAppSelector } from "../app/hooks"
import { getProduct, getProvider } from "../utils/functions"
import { useEffect, useState } from "react"
import { TStockIn } from "../types/TStockIn"
import { TStockOut } from "../types/TStockOut"
import Select from '../components/Select'
import ListHeader from "../components/List/ListHeader"
import Item from "../components/List/Item"
import ItemsContainer from "../components/List/ItemsContainer"

const Container = styled.div<{ show?: boolean }>`
    visibility: ${props => props.show === false ? 'hidden' : 'visible'};
    height: ${props => props.show === false ? '0px' : 'auto'};
`
const HeaderContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`
const Title = styled.h1`
    color: #222;
    margin: 30px 0;
`
const Filter = styled.div`
    display: flex;
    align-items: center;
`

type Props = {
    productFilter?: string
}

export default function Historico({ productFilter }: Props) {

    const stockOuts = useAppSelector(state => state.stockOut.stockOuts)
    const adjustStock = useAppSelector(state => state.adjustStock.adjustStock)
    const stockIns = useAppSelector(state => state.stockIn.stockIns)
    const products = useAppSelector(state => state.produto.produtos)
    const providers = useAppSelector(state => state.fornecedor.fornecedores)
    const [orderedStocks, setOrderedStocks] = useState<{ [key: string]: any }>({})
    const [filteredStocks, setFilteredStocks] = useState<{ [key: string]: any }>({})
    const [filter, setFilter] = useState('')
    const [show, setShow] = useState('')

    useEffect(() => {

        let stockInByDate: { [key: string]: TStockIn[] } = {}
        let stockOutByDate: { [key: string]: TStockOut[] } = {}
        let adjustStockByDate: { [key: string]: TStockOut[] } = {}

        const filteredIns = productFilter ? stockIns.filter(i => getProduct(products, i.product_id)?.name === productFilter) : stockIns
        const filteredOuts = productFilter ? stockOuts.filter(i => getProduct(products, i.product_id)?.name === productFilter) : stockOuts
        const filteredAdjusts = productFilter ? adjustStock.filter(i => getProduct(products, i.product_id)?.name === productFilter) : adjustStock

        filteredIns.forEach((i) => {
            let index = i.date!.slice(0, 10) + '_in'
            if (stockInByDate[index]) {
                stockInByDate[index].push(i)
            } else {
                stockInByDate[index] = [i]
            }
        })

        filteredOuts.forEach((i) => {
            let index = i.date!.slice(0, 10) + '_out'
            if (stockOutByDate[index]) {
                stockOutByDate[index].push(i)
            } else {
                stockOutByDate[index] = [i]
            }
        })

        filteredAdjusts.forEach((i) => {
            let index = i.date!.slice(0, 10) + '_adjust'
            if (adjustStockByDate[index]) {
                adjustStockByDate[index].push(i)
            } else {
                adjustStockByDate[index] = [i]
            }
        })

        const stocks = { ...stockInByDate, ...stockOutByDate, ...adjustStockByDate }

        let orderedStocks = Object.keys(stocks).sort().reduce(
            (obj: { [key: string]: any }, key) => {
                obj[key] = stocks[key];
                return obj;
            },
            {}
        );

        setOrderedStocks(orderedStocks)

    }, [stockIns, stockOuts, adjustStock, productFilter, products])

    useEffect(() => {
        if (!filter) {
            setFilteredStocks(orderedStocks)
        }

        if (filter === 'Compras') {
            setFilteredStocks(Object.keys(orderedStocks)
                .filter((key) => key.includes('_in'))
                .reduce((cur, key) => { return Object.assign(cur, { [key]: orderedStocks[key] }) }, {})
            )
        }

        if (filter === 'Retiradas') {
            setFilteredStocks(Object.keys(orderedStocks)
                .filter((key) => key.includes('_out'))
                .reduce((cur, key) => { return Object.assign(cur, { [key]: orderedStocks[key] }) }, {})
            )
        }

        if (filter === 'Ajustes') {
            setFilteredStocks(Object.keys(orderedStocks)
                .filter((key) => key.includes('_adjust'))
                .reduce((cur, key) => { return Object.assign(cur, { [key]: orderedStocks[key] }) }, {})
            )
        }
    }, [filter, orderedStocks])

    return (
        <>
            <HeaderContainer>
                <Title>Histórico</Title>
                <Filter>
                    <Select
                        display="flex"
                        name="filter"
                        label="Ação:"
                        onChange={(e) => setFilter(e.target.value)}
                    >
                        <option></option>
                        <option>Compras</option>
                        <option>Retiradas</option>
                        <option>Ajustes</option>
                    </Select>
                </Filter>
            </HeaderContainer>
            <ListHeader>
                <Item flex={0.9} text='Data' />
                <Item flex={1} text='Ação' />
                <Item flex={3} text='Produto' />
                <Item flex={1} text='Fornecedor' />
                <Item flex={1} text='Marca' />
                <Item flex={1} text='Unidade' />
                <Item flex={0.9} text='Preço' />
                <Item flex={0.7} text='Lote' />
                <Item flex={1} text='Validade' />
                <Item flex={0.9} text='Quantidade' align='center' />
            </ListHeader>
            {
                Object.keys(filteredStocks).reverse().map(key => (
                    < Container key={key} >
                        <ItemsContainer
                            bg={key.split('_')[1] === 'in' ? '#a3ff86' : key.split('_')[1] === 'out' ? '#ffa7a7' : '#a8aeff'}
                            onClick={() => setShow(show === key ? '' : key)}
                        >
                            <Item flex={1} text={key.split('_')[0]} />
                            <Item flex={12} text={key.split('_')[1] === 'in' ? "Compra" : key.split('_')[1] === 'out' ? "Retirada" : "Ajuste"} />
                        </ItemsContainer>
                        {
                            filteredStocks[key].map((item: any, index: any) => (
                                < Container key={index} show={show === key ? true : false} >
                                    <ItemsContainer bg={key.split('_')[1] === 'in' ? '#ceffbf' : key.split('_')[1] === 'out' ? '#ffc6c6' : '#c6caff'} >
                                        <Item flex={0.9} text='' />
                                        <Item flex={1} text='' />
                                        <Item flex={3} text={getProduct(products, item.product_id)?.name} />
                                        <Item flex={1} text={item.provider_id && getProvider(providers, item.provider_id)?.name} />
                                        <Item flex={1} text={getProduct(products, item.product_id)?.brand} />
                                        <Item flex={1} text={getProduct(products, item.product_id)?.unit} />
                                        <Item flex={0.9} text='' />
                                        <Item flex={0.7} text={item.lote} />
                                        <Item flex={1} text={item.validade && item.validade.slice(0, 10)} />
                                        <Item flex={0.9} text={key.split('_')[1] === 'out' ? -item.quantity : item.quantity} align='center' />
                                    </ItemsContainer>
                                </Container>
                            ))
                        }
                    </Container>
                ))
            }
        </>
    )
}
