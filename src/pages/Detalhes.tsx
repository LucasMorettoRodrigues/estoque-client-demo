import styled from "styled-components"
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai'
import { useNavigate } from "react-router-dom"
import Button from "../components/Button"
import { useAppDispatch, useAppSelector } from "../app/hooks"
import { deleteProductById, deleteSubProductById } from "../features/produtos/produtoSlice"

const Container = styled.div``
const Wrapper = styled.div`
    max-width: 1300px;
    margin: 0 auto;
    padding: 40px 20px;
`
const ListHeader = styled.div`
    height: 45px;
    background-color: #5fb4ff;
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
    padding-left: 75px;
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

export default function Detalhes() {

    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const products = useAppSelector(state => state.produto.produtos)

    return (
        <Container>
            <Wrapper>
                <Button onClick={() => navigate('/novoProduto')} text={'Cadastrar Novo Produto'} />
                <ListHeader>
                    <ListHeaderItem>Id</ListHeaderItem>
                    <ListHeaderItem flex={3}>Produto</ListHeaderItem>
                    <ListHeaderItem flex={1}>Código</ListHeaderItem>
                    <ListHeaderItem flex={1}>Categoria</ListHeaderItem>
                    <ListHeaderItem flex={1}>Marca</ListHeaderItem>
                    <ListHeaderItem flex={1}>Unidade</ListHeaderItem>
                    <ListHeaderItem flex={1}>Estoque</ListHeaderItem>
                    <ListHeaderItem flex={1}>Est. Mín.</ListHeaderItem>
                    <ListHeaderItem flex={1}>Est. Max.</ListHeaderItem>
                    <ListHeaderItem>Editar</ListHeaderItem>
                    <ListHeaderItem>Deletar</ListHeaderItem>
                </ListHeader>
                {
                    products.map((item) => (
                        <Container key={item.id}>
                            <Product >
                                <ProductLi>{item.id}</ProductLi>
                                <ProductLi flex={3}>{item.name}</ProductLi>
                                <ProductLi flex={1}>{item.code}</ProductLi>
                                <ProductLi flex={1}>{item.category}</ProductLi>
                                <ProductLi flex={1}>{item.brand}</ProductLi>
                                <ProductLi flex={1}>{item.unit}</ProductLi>
                                <ProductLi flex={1}> {item.stock}</ProductLi>
                                <ProductLi flex={1}>{item.min_stock}</ProductLi>
                                <ProductLi flex={1}>{item.max_stock}</ProductLi>
                                <ActionButton
                                    onClick={() => navigate(`/produtos/${item.id}`, { state: item })}
                                >
                                    <AiOutlineEdit />
                                </ActionButton>
                                <ActionButton
                                    onClick={() => dispatch(deleteProductById(item.id!))}
                                >
                                    <AiOutlineDelete />
                                </ActionButton>
                            </Product>

                            {item.subproducts &&
                                item.subproducts.map((subitem) => (
                                    <SubProduct key={subitem.id}>
                                        <SubProductLi>Lote: {subitem.lote}</SubProductLi>
                                        <SubProductLi>Validade: {subitem.validade.slice(0, 10)}</SubProductLi>
                                        <SubProductLi flex={1}>Quantidade: {subitem.quantity}</SubProductLi>
                                        <ActionButton
                                            onClick={() => navigate(`/produtos/${item.id}/subprodutos/${subitem.id}`, { state: subitem })}
                                        >
                                            <AiOutlineEdit /></ActionButton>
                                        <ActionButton
                                            onClick={() => dispatch(deleteSubProductById(subitem.id))}
                                        >
                                            <AiOutlineDelete />
                                        </ActionButton>
                                    </SubProduct>
                                ))
                            }
                        </Container>
                    ))
                }

            </Wrapper>
        </Container>
    )
}
