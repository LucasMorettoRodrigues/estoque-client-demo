import styled from "styled-components"
import { useNavigate } from "react-router-dom"
import Button from "../components/Button"
import { useAppDispatch, useAppSelector } from "../app/hooks"
import { TProduct } from "../types/TProduct"
import { AiOutlineEyeInvisible } from "react-icons/ai"
import { editProduct } from "../features/produtos/produtoSlice"

const Container = styled.div``
const Title = styled.h1`
    color: #222;
    margin: 30px 0;
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
    min-width: 75px;
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
    margin-left: 20px;
    color: #555;
    min-width: 120px;
    padding: 10px;
`
const ActionButton = styled.li`
    display: flex;
    align-items: center;
    font-size: 20px;
    min-width: 75px;
    padding: 10px;
    color: gray;
    cursor: pointer;

    &:hover {
        color: black;
    }
`

export default function Produtos() {

    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const products = useAppSelector(state => state.produto.produtos.filter(i => i.hide === false))
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
            <Title>Produtos / Resumo</Title>
            <Button onClick={() => navigate('/novoProduto')} text={'Cadastrar Novo Produto'} />
            <Button onClick={() => navigate('/produtos/detalhes')} text={'Detalhes'} />
            <Button onClick={() => navigate('/produtos/escondidos')} text={'Produtos Escondidos'} />
            <ListHeader>
                <ListHeaderItem flex={3}>Produto</ListHeaderItem>
                <ListHeaderItem flex={1}>Categoria</ListHeaderItem>
                <ListHeaderItem flex={1}>Unidade</ListHeaderItem>
                <ListHeaderItem flex={1}>Estoque</ListHeaderItem>
                <ListHeaderItem flex={1}>Est. Mín.</ListHeaderItem>
                <ListHeaderItem flex={1}>Est. Max.</ListHeaderItem>
                <ListHeaderItem>Esconder</ListHeaderItem>
            </ListHeader>
            {
                resumedProducts.map((item) => (
                    <Container key={item.id}>
                        <Product>
                            <ProductLi flex={3}>{item.name}</ProductLi>
                            <ProductLi flex={1}>{item.category}</ProductLi>
                            <ProductLi flex={1}>{item.unit}</ProductLi>
                            <ProductLi
                                color={item.stock < item.min_stock ? '#ff5353' : 'inherit'}
                                flex={1}> {item.stock}
                            </ProductLi>
                            <ProductLi flex={1}>{item.min_stock}</ProductLi>
                            <ProductLi flex={1}>{item.max_stock}</ProductLi>
                            <ActionButton onClick={() => dispatch(editProduct({ ...item, hide: true }))}>
                                <AiOutlineEyeInvisible />
                            </ActionButton>
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
