import styled from "styled-components"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { useEffect, useState } from "react"
import { TStockIn } from "../../types/TStockIn"
import Select from '../../components/UI/Select'
import ListHeader from "../../components/List/ListHeader"
import Item from "../../components/List/Item"
import ItemsContainer from "../../components/List/ItemsContainer"
import Title from "../../components/UI/Title"
import { formatValidity, groupStockByDateB } from "../../utils/functions"
import ExportJSON from "../../components/Actions/ExportJSON"
import ListWrapper from "../../components/UI/ListWrapper"
import { getAllHistoric } from "../../features/historic/historicSlice"

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

    const historic = useAppSelector(state => state.historic.historic)
    const products = useAppSelector(state => state.produto.produtos)
    const [orderedHistoric, setOrderedHistoric] = useState<{ [key: string]: any }>({})
    const [filteredHistoric, setFilteredHistoric] = useState<{ [key: string]: any }>({})
    const [filter, setFilter] = useState('')

    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(getAllHistoric())
    }, [dispatch])

    useEffect(() => {

        let filteredHistoric = productFilter ? historic.filter(i => i.product?.name === productFilter) : historic
        const historicByDate = groupStockByDateB(filteredHistoric) as { [key: string]: TStockIn[] }
        setOrderedHistoric(historicByDate)

    }, [productFilter, products, historic])

    useEffect(() => {
        if (filter) {
            setFilteredHistoric(Object.keys(orderedHistoric)
                .filter((key) => key.includes(filter))
                .reduce((cur, key) => { return Object.assign(cur, { [key]: orderedHistoric[key] }) }, {})
            )
        } else {
            setFilteredHistoric(orderedHistoric)
        }
    }, [filter, orderedHistoric])

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
                        <option value="Entrada">Entradas</option>
                        <option value="Retirada">Retiradas</option>
                        <option value="Ajuste">Ajustes</option>
                    </Select>
                </Filter>
            </HeaderContainer>

            <ListWrapper>
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
                <>
                    {
                        Object.keys(filteredHistoric).reverse().map(key => (
                            <ItemsContainer
                                key={key}
                                subproducts={
                                    filteredHistoric[key].map((item: any, index: any) => (
                                        < div key={index}  >
                                            <ItemsContainer bg={item.description === 'Entrada' ? '#ceffbf' : item.description === 'Retirada' ? '#ffc6c6' : '#c6caff'} >
                                                <Item width='90px' text={item.createdAt?.slice(11, 19)} />
                                                <Item flex={4} text={item.product.name} />
                                                <Item width='100px' text={item.provider?.name} />
                                                <Item flex={1.5} text={item.product.brand} />
                                                <Item width='80px' text={item.product.unit} />
                                                <Item width='80px' text={item.price} />
                                                <Item flex={1} text={item.lote} />
                                                <Item width='90px' text={formatValidity(item.validade)} />
                                                <Item width='70px' text={item.description === 'Retirada' ? -item.quantity : item.quantity} align='center' />
                                                <Item width='80px' text={item.user?.name} />
                                            </ItemsContainer>
                                        </div>
                                    ))
                                }
                                bg={key.split('_')[1] === 'Entrada' ? '#a3ff86' : key.split('_')[1] === 'Retirada' ? '#ffa7a7' : '#a8aeff'}
                            >
                                <Item width='90px' text={key.split('_')[0]} />
                                <Item text={key.split('_')[1]} />
                            </ItemsContainer>
                        ))
                    }
                </>
            </ListWrapper>
            <ExportJSON data={filteredHistoric} fileName='historico.json' />
        </>
    )
}
