import styled from "styled-components"
import { useNavigate } from "react-router-dom"
import Button from "../components/Button"
import { useAppSelector } from "../app/hooks"
import { useEffect, useState } from "react"
import { TProduct } from "../types/TProduct"
import { compare } from "../utils/functions"

const Container = styled.div``
const Title = styled.h1`
    color: #222;
    margin: 30px 0;
    display: flex;
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
const ListHeader = styled.div`
    height: 45px;
    padding: 0 5px;
    background-color: #5fb4ff;
    display: flex;
    align-items: center;
    border-bottom: 1px solid lightgray;
    font-size: 12px;
    font-weight: bold;
    border-bottom: 1px solid #cacaca;
`
const ListHeaderItem = styled.p<{ flex?: number, width?: string }>`
    flex: ${props => props.flex ? props.flex : null};
    width: ${props => props.width ? props.width : null};
    padding: 10px;
    cursor: pointer;

    &:active {
        transform: translateY(1px);
        opacity: 0.5;
    }
`
const Product = styled.ul`
    padding: 0 5px;
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
const SubProduct = styled.ul`
    height: 40px;
    display: flex;
    background-color: #eef7ff;
    align-items: center;
    border-bottom: 1px solid #e4e4e4;
    cursor: pointer;

    &:hover {
        background-color: #74bcff;
    }
`
const ProductLi = styled.li<{ flex?: number, color?: string, width?: string }>`
    flex: ${props => props.flex ? props.flex : null};
    background-color: ${props => props.color ? props.color : null};
    font-size: 12px;
    padding: 10px;
    width: ${props => props.width ? props.width : null};
`
const SubProductLi = styled.li`
    display: flex;
    justify-content: center;
    font-size: 13px;
    width: 16%;
    color: #3142a0;
    font-weight: 500;
    padding: 10px;
`
const MenuContainer = styled.div`
    display: flex;
    justify-content: space-between;
`
const Filter = styled.div`
    margin-top: -10px;
    display: flex;
    width: 80%;
    align-items: center;
`
const Label = styled.label`
    margin-right: 5px;
    margin-left: 15px;
`
const Select = styled.select`
    padding: 5px 10px;
`
const Input = styled.input`
    flex: 1;
    padding: 5px 10px;
`

export default function Detalhes() {

    const navigate = useNavigate()
    const productsData = useAppSelector(state => state.produto.produtos)
    const stockOuts = useAppSelector(state => state.stockOut.stockOuts)
    const [category, setCategory] = useState('')
    const [filteredProducts, setFilteredProducts] = useState<TProduct[]>([])
    const [sortedProducts, setSortedProducts] = useState<TProduct[]>([])
    const [sort, setSort] = useState('')
    const [search, setSearch] = useState('')
    let categories = Array.from(new Set(productsData.map(i => i.category)))

    const getStockOutFrequency = (id: number): number | null => {

        let dates: any[] = []
        let distances = []

        stockOuts
            .filter(i => i.product_id === id)
            .map(i => dates.push(new Date(i.date!)))

        if (dates.length <= 1) return null

        for (let j = 0; j < dates.length - 1; j++) {
            distances.push(Math.abs(dates[j + 1] - dates[j]))
        }

        const sum = distances.reduce((partialSum, a) => partialSum + a, 0) / (distances.length);

        return Math.ceil(sum / (1000 * 60 * 60 * 24));
    }

    useEffect(() => {
        let products = productsData.slice().filter(i => i.hide === false)

        setSortedProducts(products)


        if (sort === 'brand') {
            setSortedProducts(compare(products, 'brand'))
        }

        if (sort === 'category') {
            setSortedProducts(compare(products, 'category'))
        }

        if (sort === 'unit') {
            setSortedProducts(compare(products, 'unit'))
        }

        if (sort === 'id') {
            setSortedProducts(compare(products, 'id'))
        }

        if (sort === 'name') {
            setSortedProducts(compare(products, 'name'))
        }
    }, [sort, productsData, category])

    useEffect(() => {
        let filtered = sortedProducts

        if (category) {
            filtered = filtered.filter(i => i.category === category)
        }

        if (search) {
            filtered = filtered.filter(i => i.name.toLowerCase().includes(search.toLowerCase()))
        }

        setFilteredProducts(filtered)

    }, [category, sortedProducts, search])

    return (
        <>
            <Title>Produtos /
                <ProductsBtnContainer>
                    <ProductBtn active={true}>Detalhes</ProductBtn>
                    <ProductBtn onClick={() => navigate('/produtos')} >Resumo</ProductBtn>
                    <ProductBtn onClick={() => navigate('/produtos/escondidos')}>Arquivados</ProductBtn>
                </ProductsBtnContainer>
            </Title>
            <MenuContainer>
                <Button onClick={() => navigate('/novoProduto')} text={'Cadastrar Novo Produto'} />
                <Filter>
                    <Label>Pesquisar:</Label>
                    <Input type='text' onChange={(e) => setSearch(e.target.value)}></Input>
                    <Label>Categoria:</Label>
                    <Select onChange={(e) => setCategory(e.target.value)}>
                        <option></option>
                        {categories.map(i => <option key={i}>{i}</option>)}
                    </Select>
                    <Label>Fornecedor:</Label>
                    <Select >
                        <option></option>
                        <option>Compras</option>
                        <option>Retiradas</option>
                    </Select>
                </Filter>
            </MenuContainer>
            <ListHeader>
                <ListHeaderItem width="26px" onClick={() => setSort('id')}>Id</ListHeaderItem>
                <ListHeaderItem flex={3} onClick={() => setSort('name')}>Produto</ListHeaderItem>
                <ListHeaderItem flex={2}>Observação</ListHeaderItem>
                <ListHeaderItem width="90px">Código</ListHeaderItem>
                <ListHeaderItem width="90px" onClick={() => setSort('category')}>Categoria</ListHeaderItem>
                <ListHeaderItem width="130px" onClick={() => setSort('brand')}>Marca</ListHeaderItem>
                <ListHeaderItem width="65px" onClick={() => setSort('unit')} >Unidade</ListHeaderItem>
                <ListHeaderItem width="65px" style={{ textAlign: 'center' }}>Estoque</ListHeaderItem>
                <ListHeaderItem width="65px" style={{ textAlign: 'center' }}>Est. Mín.</ListHeaderItem>
                <ListHeaderItem width="65px" style={{ textAlign: 'center' }}>Est. Max.</ListHeaderItem>
                <ListHeaderItem width="83px" style={{ textAlign: 'center' }}>Frequência Retirada</ListHeaderItem>
            </ListHeader>
            {
                filteredProducts.map((item) => (
                    <Container key={item.id}>
                        <Product onClick={() => navigate(`/produtos/${item.id}`, { state: item })}>
                            <ProductLi width="26px">{item.id}</ProductLi>
                            <ProductLi flex={3}>{item.name}</ProductLi>
                            <ProductLi flex={2}>{item.observation}</ProductLi>
                            <ProductLi width="90px">{item.code}</ProductLi>
                            <ProductLi width="90px">{item.category}</ProductLi>
                            <ProductLi width="130px">{item.brand}</ProductLi>
                            <ProductLi width="65px">{item.unit}</ProductLi>
                            <ProductLi width="65px" style={{ textAlign: 'center' }}>{item.stock}</ProductLi>
                            <ProductLi width="65px" style={{ textAlign: 'center' }}>{item.min_stock}</ProductLi>
                            <ProductLi width="65px" style={{ textAlign: 'center' }}>{item.max_stock}</ProductLi>
                            <ProductLi width="83px" style={{ textAlign: 'center' }}>{getStockOutFrequency(item.id!)}</ProductLi>
                        </Product>

                        {item.subproducts &&
                            item.subproducts.map((subitem) => (
                                <SubProduct key={subitem.id} onClick={() => navigate(`/produtos/${item.id}/subprodutos/${subitem.id}`, { state: subitem })}>
                                    <SubProductLi>Lote: {subitem.lote}</SubProductLi>
                                    <SubProductLi>Validade: {subitem.validade.slice(0, 10)}</SubProductLi>
                                    <SubProductLi>Quantidade: {subitem.quantity}</SubProductLi>
                                </SubProduct>
                            ))
                        }
                    </Container>
                ))
            }
        </>
    )
}
