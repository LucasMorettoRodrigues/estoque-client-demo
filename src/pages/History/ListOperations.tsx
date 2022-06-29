import styled from "styled-components"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { useEffect, useState } from "react"
import { TStockIn } from "../../types/TStockIn"
import { TStockOut } from "../../types/TStockOut"
import Select from '../../components/UI/Select'
import ListHeader from "../../components/List/ListHeader"
import Item from "../../components/List/Item"
import ItemsContainer from "../../components/List/ItemsContainer"
import Title from "../../components/UI/Title"
import { formatValidity, groupStockByDate } from "../../utils/functions"
import { getAllStockOuts } from "../../features/stockOut/stockOut"
import { getAllStockIns } from "../../features/stockIn/stockIn"
import { getAllAdjustStock } from "../../features/adjustStock/adjustStock"
import Button from "../../components/UI/Button"

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

export default function ListOperations({ productFilter }: Props) {

    const stockOuts = useAppSelector(state => state.stockOut.stockOuts)
    const adjustStock = useAppSelector(state => state.adjustStock.adjustStock)
    const stockIns = useAppSelector(state => state.stockIn.stockIns)
    const products = useAppSelector(state => state.produto.produtos)
    const [orderedStocks, setOrderedStocks] = useState<{ [key: string]: any }>({})
    const [filteredStocks, setFilteredStocks] = useState<{ [key: string]: any }>({})
    const [filter, setFilter] = useState('')

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

    const handleExport = () => {
        const blob = new Blob([JSON.stringify(filteredStocks)], { type: 'text/json' })

        const a = document.createElement('a')
        a.download = 'historico.json'
        a.href = window.URL.createObjectURL(blob)
        const clickEvt = new MouseEvent('click', {
            view: window,
            bubbles: true,
            cancelable: true,
        })
        a.dispatchEvent(clickEvt)
        a.remove()
    }

    return (
        <>
            {console.log(filteredStocks)}
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
                <Item width='90px' text='Horário' />
                <Item flex={4} text='Produto' />
                <Item width='100px' text='Fornecedor' />
                <Item flex={1.5} text='Marca' />
                <Item width='80px' text='Unidade' />
                <Item width='80px' text='Preço' />
                <Item flex={1} text='Lote' />
                <Item width='90px' text='Validade' />
                <Item width='70px' text='Qtd.' align='center' />
                <Item width='80px' text='Usuário' />
            </ListHeader>
            {
                Object.keys(filteredStocks).reverse().map(key => (
                    <ItemsContainer
                        key={key}
                        subproducts={
                            filteredStocks[key].map((item: any, index: any) => (
                                < div key={index}  >
                                    <ItemsContainer bg={key.split('_')[1] === 'in' ? '#ceffbf' : key.split('_')[1] === 'out' ? '#ffc6c6' : '#c6caff'} >
                                        <Item width='90px' text={item.createdAt?.slice(11, 19)} />
                                        <Item flex={4} text={item.product.name} />
                                        <Item width='100px' text={item.provider?.name} />
                                        <Item flex={1.5} text={item.product.brand} />
                                        <Item width='80px' text={item.product.unit} />
                                        <Item width='80px' text={item.price} />
                                        <Item flex={1} text={item.lote} />
                                        <Item width='90px' text={formatValidity(item.validade)} />
                                        <Item width='70px' text={key.split('_')[1] === 'out' ? -item.quantity : item.quantity} align='center' />
                                        <Item width='80px' text={item.user?.name} />
                                    </ItemsContainer>
                                </div>
                            ))
                        }
                        bg={key.split('_')[1] === 'in' ? '#a3ff86' : key.split('_')[1] === 'out' ? '#ffa7a7' : '#a8aeff'}
                    >
                        <Item width='90px' text={key.split('_')[0]} />
                        <Item text={key.split('_')[1] === 'in' ? "Entrada" : key.split('_')[1] === 'out' ? "Retirada" : "Ajuste"} />
                    </ItemsContainer>
                ))
            }
            <Button text='Exportar' onClick={handleExport} bg='blue' style={{ marginTop: '30px', float: 'right' }} />
        </>
    )
}
