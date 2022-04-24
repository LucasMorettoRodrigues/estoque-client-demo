import styled from "styled-components"
import { useNavigate } from "react-router-dom"
import Button from "../components/Button"
import { useAppSelector } from "../app/hooks"
import { getProvider, mergeProducts, reduceStockIns } from "../utils/functions"
import { useEffect, useState } from "react"
import { TProduct } from "../types/TProduct"

const Container = styled.div``
const Title = styled.h1`
    display: flex;
    color: #222;
    margin: 30px 0;
`
const ProductsBtnContainer = styled.div`
    display: flex;
`
const ProductBtn = styled.button<{ active?: boolean }>`
    font-size: 30px;
    color: ${props => props.active ? '#222' : '#c0c0c0'};
    font-weight: bold;
    margin-left: 10px;
    border: none;
    background-color: inherit;
    cursor: pointer;

    &:hover {
        color: #222;
    }
`
const MenuContainer = styled.div`
    display: flex;
    margin-right: 0;
    justify-content: space-between;
`
const Filter = styled.div`
    margin-top: -10px;
    width: 70%;
    display: flex;
    align-items: center;
`
const Label = styled.label`
    margin-right: 5px;
`
const Input = styled.input`
    padding: 5px 10px;
    margin-right: 10px;
`
const Select = styled.select`
    padding: 5px 10px;
    margin-right: 20px;
    flex: 1;
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
    min-width: 90px;
    padding: 10px;
`
const Product = styled.ul`
    height: 40px;
    background-color: #cbe6ff;
    display: flex;
    align-items: center;
    border-bottom: 1px solid #cacaca;
    cursor: pointer;

    &:hover {
        background-color: #74bcff;
    }
`
// const SubProduct = styled.ul`
//     height: 40px;
//     display: flex;
//     background-color: #eef7ff;
//     align-items: center;
//     border-bottom: 1px solid #e4e4e4;
// `
const ProductLi = styled.li<{ flex?: number, color?: string }>`
    flex: ${props => props.flex ? props.flex : null};
    background-color: ${props => props.color ? props.color : null};
    font-size: 14px;
    min-width: 75px;
    padding: 10px;
`
// const SubProductLi = styled.li`
//     display: flex;
//     justify-content: center;
//     font-size: 14px;
//     width: 16%;
//     color: #3142a0;
//     font-weight: 500;
//     padding: 10px;
// `

export default function Produtos() {

    const navigate = useNavigate()
    const products = useAppSelector(state => state.produto.produtos)
    const providers = useAppSelector(state => state.fornecedor.fornecedores)
    const stockIns = useAppSelector(state => state.stockIn.stockIns)
    const [productsAndProviders, setProductsAndProviders] = useState<TProduct[]>([])
    const [filteredProducts, setFilteredProducts] = useState<TProduct[]>([])
    const [lowStockFilter, setLowStockFilter] = useState(false)
    const [search, setSearch] = useState('')
    const [provider, setProvider] = useState('')

    useEffect(() => {
        let productProviders = reduceStockIns(stockIns, 'product_id')

        setProductsAndProviders(products.map(i => (
            { ...i, providers: productProviders[i.id!] ? [...productProviders[i.id!]] : [] }
        )))

    }, [products, stockIns])

    useEffect(() => {
        let filtered = []

        if (lowStockFilter) {
            filtered = mergeProducts(productsAndProviders).filter(i => i.hide === false)
                .filter(i => i.stock < i.min_stock)
        } else {
            filtered = mergeProducts(productsAndProviders).filter(i => i.hide === false)
        }

        if (search) {
            filtered = filtered.filter(i => i.name.toLowerCase().includes(search.toLowerCase()))
        }

        if (provider) {
            filtered = filtered.filter(i => i.providers!.includes(parseInt(provider)))
        }

        setFilteredProducts(filtered)
    }, [lowStockFilter, productsAndProviders, search, provider])

    return (
        <>
            <Title>Produtos /
                <ProductsBtnContainer>
                    <ProductBtn onClick={() => navigate('/produtos/detalhes')} >Detalhes</ProductBtn>
                    <ProductBtn active={true} >Resumo</ProductBtn>
                    <ProductBtn onClick={() => navigate('/produtos/escondidos')}>Arquivados</ProductBtn>
                </ProductsBtnContainer>
            </Title>
            <MenuContainer>
                <Button onClick={() => navigate('/novoProduto')} text={'Cadastrar Novo Produto'} />
                <Filter>
                    <Label>Pesquisar:</Label>
                    <Input style={{ flex: 2, marginRight: '20px' }} type='text' onChange={(e) => setSearch(e.target.value)}></Input>
                    <Label>Fornecedor:</Label>
                    <Select onChange={(e) => setProvider(e.target.value)}>
                        <option></option>
                        {providers.map(i => <option key={i.id} value={i.id}>{i.name}</option>)}
                    </Select>
                    <Input style={{ width: '18px', height: '18px', cursor: 'pointer' }} onChange={() => setLowStockFilter(!lowStockFilter)} id="lowStock" name="lowStock" type='checkbox'></Input>
                    <Label style={{ cursor: 'pointer' }} htmlFor="lowStock">Produtos em falta</Label>
                </Filter>
            </MenuContainer>
            <ListHeader>
                <ListHeaderItem flex={8}>Produto</ListHeaderItem>
                <ListHeaderItem flex={2}>Fornecedores</ListHeaderItem>
                <ListHeaderItem flex={1} style={{ textAlign: 'center' }}>Estoque</ListHeaderItem>
                <ListHeaderItem flex={1} style={{ textAlign: 'center' }}>Est. Mín.</ListHeaderItem>
                <ListHeaderItem flex={1} style={{ textAlign: 'center' }}>Est. Max.</ListHeaderItem>
            </ListHeader>
            {
                filteredProducts.map((item) => (
                    <Container key={item.id}>
                        <Product onClick={() => navigate(`/produtos/${item.id}/historico`, { state: item })}>
                            <ProductLi flex={8}>{item.name}</ProductLi>
                            <ProductLi flex={2}>{item.providers && item.providers.map(i => `${getProvider(providers, i)?.name} `)}</ProductLi>
                            <ProductLi
                                color={item.stock < item.min_stock ? '#ff5353' : 'inherit'}
                                flex={1}
                                style={{ textAlign: 'center' }}> {item.stock}
                            </ProductLi>
                            <ProductLi flex={1} style={{ textAlign: 'center' }}>{item.min_stock}</ProductLi>
                            <ProductLi flex={1} style={{ textAlign: 'center' }}>{item.max_stock}</ProductLi>
                        </Product>

                        {/* {item.subproducts &&
                            item.subproducts.map((subitem) => (
                                <SubProduct key={subitem.id}>
                                    <SubProductLi>Lote: {subitem.lote}</SubProductLi>
                                    <SubProductLi>Validade: {subitem.validade.slice(0, 10)}</SubProductLi>
                                    <SubProductLi>Quantidade: {subitem.quantity}</SubProductLi>
                                </SubProduct>
                            ))
                        } */}
                    </Container>
                ))
            }
        </>
    )
}
