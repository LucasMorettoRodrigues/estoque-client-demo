import styled from "styled-components"
import { useLocation } from "react-router-dom"
import { useAppSelector } from "../app/hooks"
import { useEffect, useState } from "react"
import { TProduct } from "../types/TProduct"
import { compare, formatValidity } from "../utils/functions"
import ListHeader from "../components/List/ListHeader"
import Item from "../components/List/Item"
import Title from "../components/UI/Title"
import InventarioList from "../components/Inventario/InventarioList"

const TitleContainer = styled.div`
    display: flex;
`
const MenuContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 20px;
`
const HeaderContainer = styled.div`
    display: flex;
    z-index: 1;
    position: sticky;
    top: 0;
`

export default function HistoricoInventario() {

    const { state }: any = useLocation()

    const productsData = state.data
    const providerFilter = useAppSelector(state => state.produto.providerFilter)
    const categoryFilter = useAppSelector(state => state.produto.categoryFilter)
    const searchFilter = useAppSelector(state => state.produto.searchFilter)

    const [filteredProducts, setFilteredProducts] = useState<TProduct[]>([])
    const [sortedProducts, setSortedProducts] = useState<TProduct[]>([])
    const [sort, setSort] = useState('')

    useEffect(() => {
        let products = productsData.slice()

        sort ? setSortedProducts(compare(products, sort)) : setSortedProducts(products)

    }, [sort, productsData])

    useEffect(() => {
        let filtered = sortedProducts

        if (categoryFilter) {
            filtered = filtered.filter(i => i.category === categoryFilter)
        }

        if (providerFilter) {
            filtered = filtered.filter(i => i.providers?.includes(providerFilter))
        }

        if (searchFilter) {
            filtered = filtered.filter(i => i.name.toLowerCase().includes(searchFilter))
        }

        setFilteredProducts(filtered)

    }, [categoryFilter, sortedProducts, searchFilter, providerFilter])

    return (
        <>
            <TitleContainer>
                <Title title='Inventário' />
            </TitleContainer>
            <MenuContainer>
                <div style={{ flex: 1 }}>
                    <p style={{ marginBottom: '8px' }}>Realizado por {state.user?.name}</p>
                    <p>em {formatValidity(state.createdAt)} </p>
                </div>
            </MenuContainer>

            <HeaderContainer>
                <ListHeader fontSize='12px'>
                    <Item width="26px" text='Id' onClick={() => setSort('id')} cursor='pointer' fontSize='12px' />
                    <Item flex={3} text='Produto' onClick={() => setSort('name')} cursor='pointer' fontSize='12px' />
                    <Item flex={2} text='Observação' fontSize='12px' />
                    <Item width="90px" text='Código' fontSize='12px' />
                    <Item width="90px" text='Categoria' onClick={() => setSort('category')} cursor='pointer' fontSize='12px' />
                    <Item width="130px" text='Marca' onClick={() => setSort('brand')} cursor='pointer' fontSize='12px' />
                    <Item width="65px" text='Unidade' onClick={() => setSort('unit')} cursor='pointer' fontSize='12px' />
                    <Item width="65px" text='Estoque' align='center' fontSize='12px' />
                </ListHeader>
            </HeaderContainer>

            <InventarioList products={filteredProducts} />
        </>
    )
}