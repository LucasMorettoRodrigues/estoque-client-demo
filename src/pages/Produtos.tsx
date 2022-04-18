import styled from "styled-components"
import { useNavigate } from "react-router-dom"
import Button from "../components/Button"
import { useAppDispatch, useAppSelector } from "../app/hooks"
import { AiOutlineEyeInvisible } from "react-icons/ai"
import { editProduct } from "../features/produtos/produtoSlice"
import EditDeleteButton from "../components/EditDeleteButton"
import { mergeProducts } from "../utils/functions"
import { useEffect, useState } from "react"
import { TProduct } from "../types/TProduct"

const Container = styled.div``
const Title = styled.h1`
    color: #222;
    margin: 30px 0;
`
const InputContainer = styled.div`
    margin-bottom: 20px;
    padding: 5px;
`
const Label = styled.label`
    margin-left: 10px;
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
`
const SubProduct = styled.ul`
    height: 40px;
    display: flex;
    background-color: #eef7ff;
    align-items: center;
    border-bottom: 1px solid #e4e4e4;
`
const ProductLi = styled.li<{ flex?: number, color?: string }>`
    flex: ${props => props.flex ? props.flex : null};
    background-color: ${props => props.color ? props.color : null};
    font-size: 14px;
    min-width: 75px;
    padding: 10px;
`
const SubProductLi = styled.li<{ flex?: number }>`
    flex: ${props => props.flex ? props.flex : null};
    font-size: 14px;
    margin-left: 60px;
    color: #555;
    padding: 10px;
`

export default function Produtos() {

    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const products = useAppSelector(state => state.produto.produtos)
    const [filteredProducts, setFilteredProducts] = useState<TProduct[]>([])
    const [lowStockFilter, setLowStockFilter] = useState(false)

    useEffect(() => {
        if (lowStockFilter) {
            setFilteredProducts(mergeProducts(products).filter(i => i.hide === false)
                .filter(i => i.stock < i.min_stock))
        } else {
            setFilteredProducts(mergeProducts(products).filter(i => i.hide === false))
        }
    }, [lowStockFilter, products])

    return (
        <>
            <Title>Produtos / Resumo</Title>
            <Button onClick={() => navigate('/novoProduto')} text={'Cadastrar Novo Produto'} />
            <Button onClick={() => navigate('/produtos/detalhes')} text={'Detalhes'} />
            <Button onClick={() => navigate('/produtos/escondidos')} text={'Produtos Escondidos'} />
            <InputContainer>
                <input onChange={() => setLowStockFilter(!lowStockFilter)} id="lowStock" name="lowStock" type='checkbox'></input>
                <Label htmlFor="lowStock">Produtos em falta</Label>
            </InputContainer>

            <ListHeader>
                <ListHeaderItem flex={8}>Produto</ListHeaderItem>
                <ListHeaderItem flex={1} style={{ textAlign: 'center' }}>Estoque</ListHeaderItem>
                <ListHeaderItem flex={1} style={{ textAlign: 'center' }}>Est. Mín.</ListHeaderItem>
                <ListHeaderItem flex={1} style={{ textAlign: 'center' }}>Est. Max.</ListHeaderItem>
                <ListHeaderItem style={{ textAlign: 'center' }}>Esconder</ListHeaderItem>
            </ListHeader>
            {
                filteredProducts.map((item) => (
                    <Container key={item.id}>
                        <Product>
                            <ProductLi flex={8}>{item.name}</ProductLi>
                            <ProductLi
                                color={item.stock < item.min_stock ? '#ff5353' : 'inherit'}
                                flex={1}
                                style={{ textAlign: 'center' }}> {item.stock}
                            </ProductLi>
                            <ProductLi flex={1} style={{ textAlign: 'center' }}>{item.min_stock}</ProductLi>
                            <ProductLi flex={1} style={{ textAlign: 'center' }}>{item.max_stock}</ProductLi>
                            <EditDeleteButton onClick={() => dispatch(editProduct({ ...item, hide: true }))}>
                                <AiOutlineEyeInvisible />
                            </EditDeleteButton>
                        </Product>

                        {item.subproducts &&
                            item.subproducts.map((subitem) => (
                                <SubProduct key={subitem.id}>
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
