import styled from "styled-components"
import { useAppDispatch, useAppSelector } from "../app/hooks"
import { useEffect, useState } from "react"
import { TStockIn } from "../types/TStockIn"
import { TStockOut } from "../types/TStockOut"
import Select from '../components/UI/Select'
import ListHeader from "../components/List/ListHeader"
import Item from "../components/List/Item"
import ItemsContainer from "../components/List/ItemsContainer"
import Title from "../components/UI/Title"
import { formatValidity, groupStockByDate } from "../utils/functions"
import { getAllStockOuts } from "../features/stockOut/stockOut"
import { getAllStockIns } from "../features/stockIn/stockIn"
import { getAllAdjustStock } from "../features/adjustStock/adjustStock"

const Container = styled.div<{ show?: boolean }>`
    visibility: ${props => props.show === false ? 'hidden' : 'visible'};
    height: ${props => props.show === false ? '0px' : 'auto'};
`
const HeaderContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
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
    const [orderedStocks, setOrderedStocks] = useState<{ [key: string]: any }>({})
    const [filteredStocks, setFilteredStocks] = useState<{ [key: string]: any }>({})
    const [filter, setFilter] = useState('')
    const [show, setShow] = useState('')

    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(getAllStockOuts())
        dispatch(getAllStockIns())
        dispatch(getAllAdjustStock())
    }, [dispatch])

    useEffect(() => {

        let filteredIns = productFilter ? stockIns.filter(i => i.product?.name === productFilter) : stockIns
        let filteredOuts = productFilter ? stockOuts.filter(i => i.product?.name === productFilter) : stockOuts
        let filteredAdjusts = productFilter ? adjustStock.filter(i => i.product?.name === productFilter) : adjustStock

        const stockInByDate = groupStockByDate(filteredIns, '_in') as { [key: string]: TStockIn[] }
        const stockOutByDate = groupStockByDate(filteredOuts, '_out') as { [key: string]: TStockOut[] }
        const adjustStockByDate = groupStockByDate(filteredAdjusts, '_adjust') as { [key: string]: TStockOut[] }

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
        if (filter) {
            setFilteredStocks(Object.keys(orderedStocks)
                .filter((key) => key.includes(filter))
                .reduce((cur, key) => { return Object.assign(cur, { [key]: orderedStocks[key] }) }, {})
            )
        } else {
            setFilteredStocks(orderedStocks)
        }
    }, [filter, orderedStocks])

    return (
        <>
            <HeaderContainer>
                <Title title='Histórico' />
                <Filter>
                    <Select
                        display="flex"
                        name="filter"
                        label="Ação:"
                        onChange={(e) => setFilter(e.target.value)}
                    >
                        <option></option>
                        <option value="_in">Compras</option>
                        <option value="_out">Retiradas</option>
                        <option value="_adjust">Ajustes</option>
                    </Select>
                </Filter>
            </HeaderContainer>
            <ListHeader>
                <Item flex={4} text='Produto' />
                <Item flex={1} text='Fornecedor' />
                <Item flex={1.5} text='Marca' />
                <Item flex={1} text='Unidade' />
                <Item flex={0.9} text='Preço' />
                <Item flex={1} text='Lote' />
                <Item flex={1} text='Validade' />
                <Item flex={0.9} text='Quantidade' align='center' />
                <Item flex={0.9} text='Usuário' />
            </ListHeader>
            {
                Object.keys(filteredStocks).reverse().map(key => (
                    < Container key={key} >
                        <ItemsContainer
                            bg={key.split('_')[1] === 'in' ? '#a3ff86' : key.split('_')[1] === 'out' ? '#ffa7a7' : '#a8aeff'}
                            onClick={() => setShow(show === key ? '' : key)}
                        >
                            <Item flex={1} text={key.split('_')[0]} />
                            <Item flex={12} text={key.split('_')[1] === 'in' ? "Entrada" : key.split('_')[1] === 'out' ? "Retirada" : "Ajuste"} />
                        </ItemsContainer>
                        {
                            filteredStocks[key].map((item: any, index: any) => (
                                < Container key={index} show={show === key ? true : false} >
                                    <ItemsContainer bg={key.split('_')[1] === 'in' ? '#ceffbf' : key.split('_')[1] === 'out' ? '#ffc6c6' : '#c6caff'} >
                                        <Item flex={4} text={item.product.name} />
                                        <Item flex={1} text={item.provider?.name} />
                                        <Item flex={1.5} text={item.product.brand} />
                                        <Item flex={1} text={item.product.unit} />
                                        <Item flex={0.9} text={item.price} />
                                        <Item flex={1} text={item.lote} />
                                        <Item flex={1} text={formatValidity(item.validade)} />
                                        <Item flex={0.9} text={key.split('_')[1] === 'out' ? -item.quantity : item.quantity} align='center' />
                                        <Item flex={0.9} text={item.user?.name} />
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
