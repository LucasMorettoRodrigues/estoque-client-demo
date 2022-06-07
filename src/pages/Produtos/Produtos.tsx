import styled from "styled-components"
import { useNavigate } from "react-router-dom"
import Button from "../../components/Button"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { compare, mergeProducts } from "../../utils/functions"
import { useEffect, useState } from "react"
import { TProduct } from "../../types/TProduct"
import Select from "../../components/Select"
import Input from "../../components/Input"
import ListHeader from "../../components/List/ListHeader"
import Item from "../../components/List/Item"
import ItemsContainer from "../../components/List/ItemsContainer"
import ProductBtn from "../../components/ProductBtn"
import { setProviderFilter, switchMissingFilter } from "../../features/produtos/produtoSlice"
import Title from "../../components/Title"

const Container = styled.div``
const TitleContainer = styled.div`
    display: flex;
`
const MenuContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 20px;
`
const Filter = styled.div`
    display: flex;
    align-items: center;
`
const InputContainer = styled.div`
    display: flex;
    align-items: center;
    margin-right: 20px;
`
const Label = styled.label`
    margin-right: 5px;
    cursor: pointer;
`
const CheckBox = styled.input`
    padding: 5px 10px;
    margin-right: 10px;
`

export default function Produtos() {

    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    const products = useAppSelector(state => state.produto.produtos)
    const providers = useAppSelector(state => state.fornecedor.fornecedores)
    const missingFilter = useAppSelector(state => state.produto.missingFilter)
    const providerFilter = useAppSelector(state => state.produto.providerFilter)

    const [filteredProducts, setFilteredProducts] = useState<TProduct[]>([])
    const [search, setSearch] = useState('')
    const [sort, setSort] = useState('')
    const [sortedProducts, setSortedProducts] = useState<TProduct[]>([])

    useEffect(() => {
        let produtos = products.slice()

        sort ? setSortedProducts(compare(produtos, sort)) : setSortedProducts(produtos)

    }, [sort, products])

    useEffect(() => {
        let filtered = []

        if (missingFilter) {
            filtered = mergeProducts(sortedProducts).filter(i => i.stock < i.min_stock)
        } else {
            filtered = mergeProducts(sortedProducts)
        }

        if (search) {
            filtered = filtered.filter(i => i.name.toLowerCase().includes(search.toLowerCase()))
        }

        if (providerFilter) {
            filtered = filtered.filter(i => i.providers?.includes(providerFilter))
        }

        setFilteredProducts(filtered)
    }, [missingFilter, sortedProducts, search, providerFilter])

    return (
        <>
            <TitleContainer>
                <Title title='Produtos /' />
                <ProductBtn onClick={() => navigate('/produtos/detalhes')} text='Detalhes' />
                <ProductBtn active={true} text='Resumo' />
                <ProductBtn onClick={() => navigate('/produtos/escondidos')} text='Arquivados' />
            </TitleContainer>
            <MenuContainer>
                <Button onClick={() => navigate('/novoProduto')} text={'Cadastrar Novo Produto'} />
                <Filter>
                    <InputContainer>
                        <Input name="search" label="Pesquisar:" display="flex" type='text' onChange={(e) => setSearch(e.target.value)}></Input>
                    </InputContainer>
                    <InputContainer>
                        <Select name="providers" label="Fornecedores:"
                            display="flex" value={providerFilter}
                            onChange={(e) => dispatch(setProviderFilter(e.target.value))}>
                            <option></option>
                            {providers.map(i => <option key={i.id} value={i.name}>{i.name}</option>)}
                        </Select>
                    </InputContainer>
                    <CheckBox
                        style={{ width: '18px', height: '18px', cursor: 'pointer' }}
                        onChange={() => dispatch(switchMissingFilter())}
                        id="lowStock"
                        name="lowStock"
                        type='checkbox'
                        checked={missingFilter}
                    >
                    </CheckBox>
                    <Label htmlFor="lowStock">Produtos em falta</Label>
                </Filter>
            </MenuContainer>
            <ListHeader>
                <Item flex={8} text='Produto' cursor='pointer' onClick={() => setSort('name')} />
                <Item flex={2} text='Fornecedores' cursor='pointer' onClick={() => setSort('providers')} />
                <Item flex={1} text='Estoque' align='center' />
                <Item flex={1} text='Est. Mín' align='center' />
                <Item flex={1} text='Est. Max' align='center' />
            </ListHeader>
            {
                filteredProducts.map((item) => (
                    <Container key={item.id}>
                        <ItemsContainer onClick={() => navigate(`/produtos/${item.id}/historico`, { state: item })}>
                            <Item flex={8} text={item.name} />
                            <Item flex={2} text={item.providers?.map(i => `${i} `)} />
                            <Item flex={1} text={item.stock} align='center'
                                bg={item.stock < item.min_stock
                                    ? '#ff5353'
                                    : (item.stock === 0 && item.min_stock === 0) ? '#ff5353' : 'inherit'
                                } />
                            <Item flex={1} text={item.min_stock} align='center' />
                            <Item flex={1} text={item.max_stock} align='center' />
                        </ItemsContainer>
                    </Container>
                ))
            }
        </>
    )
}
