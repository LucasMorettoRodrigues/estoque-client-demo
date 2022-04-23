import styled from "styled-components"
import { useNavigate } from "react-router-dom"
import Button from "../components/Button"
import { useAppDispatch, useAppSelector } from "../app/hooks"
import { TProduct } from "../types/TProduct"
import { AiOutlineEye } from "react-icons/ai"
import { editProduct } from "../features/produtos/produtoSlice"
import EditDeleteButton from "../components/EditDeleteButton"

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

export default function ProdutosEscondidos() {

    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const products = useAppSelector(state => state.produto.produtos.filter(i => i.hide === true))
    const resumedProducts: TProduct[] = []

    for (let i in products) {
        let index = resumedProducts.findIndex((item) => item.name === products[i].name)

        if (index < 0) {
            resumedProducts.push(products[i])
        } else {
            resumedProducts[index].stock = resumedProducts[index].stock + products[i].stock
            resumedProducts[index].subproducts = [...resumedProducts[index].subproducts!, ...products[i].subproducts!]
        }
    }

    return (
        <>
            <Title>Produtos /
                <ProductsBtnContainer>
                    <ProductBtn onClick={() => navigate('/produtos/detalhes')} >Detalhes</ProductBtn>
                    <ProductBtn onClick={() => navigate('/produtos')} >Resumo</ProductBtn>
                    <ProductBtn active={true}>Arquivados</ProductBtn>
                </ProductsBtnContainer>
            </Title>
            <Button onClick={() => navigate('/novoProduto')} text={'Cadastrar Novo Produto'} />
            <ListHeader>
                <ListHeaderItem flex={3}>Produto</ListHeaderItem>
                <ListHeaderItem flex={0.8}>Categoria</ListHeaderItem>
                <ListHeaderItem flex={0.8}>Unidade</ListHeaderItem>
                <ListHeaderItem flex={0.5} style={{ textAlign: 'center' }}>Estoque</ListHeaderItem>
                <ListHeaderItem flex={0.5} style={{ textAlign: 'center' }}>Est. Mín.</ListHeaderItem>
                <ListHeaderItem flex={0.5} style={{ textAlign: 'center' }}>Est. Max.</ListHeaderItem>
                <ListHeaderItem style={{ textAlign: 'center' }}>Mostrar</ListHeaderItem>
            </ListHeader>
            {
                resumedProducts.map((item) => (
                    <Container key={item.id}>
                        <Product>
                            <ProductLi flex={3}>{item.name}</ProductLi>
                            <ProductLi flex={0.8}>{item.category}</ProductLi>
                            <ProductLi flex={0.8}>{item.unit}</ProductLi>
                            <ProductLi
                                color={item.stock < item.min_stock ? '#ff5353' : 'inherit'}
                                flex={0.5}
                                style={{ textAlign: 'center' }}> {item.stock}
                            </ProductLi>
                            <ProductLi flex={0.5} style={{ textAlign: 'center' }}>{item.min_stock}</ProductLi>
                            <ProductLi flex={0.5} style={{ textAlign: 'center' }}>{item.max_stock}</ProductLi>
                            <EditDeleteButton onClick={() => dispatch(editProduct({ ...item, hide: false }))}>
                                <AiOutlineEye />
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
