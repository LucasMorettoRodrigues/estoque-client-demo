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
    background-color: #add9ff;
    display: flex;
    align-items: center;
    border-bottom: 1px solid lightgray;
    font-size: 18px;
`
const ListHeaderItem = styled.p<{ flex?: number }>`
    flex: ${props => props.flex ? props.flex : null};
    min-width: 75px;
    padding: 10px;
`
const ProductsList = styled.div``
const Product = styled.ul<{ backColor: string }>`
    background-color: ${props => props.backColor};
    display: flex;
    align-items: center;
    border-bottom: 1px solid lightgray;
`
const ProductName = styled.li`
    flex: 2;
    padding: 10px;
`
const ProductCategory = styled.li`
    flex: 1;
    padding: 10px;
`
const ProductUnity = styled.li`
    flex: 2;
    padding: 10px;
`
const ProductStock = styled.li`
    flex: 1;
    padding: 10px;
`
const ProductLote = styled.li`
    flex: 1;
    padding: 10px;
`
const ProductValidade = styled.li`
    flex: 2;
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
    const produtos = useAppSelector(state => state.produto.produtos)

    return (
        <Container>
            <Wrapper>
                <Button onClick={() => navigate('/novoProduto')} text={'Cadastrar Novo Produto'} />
                <ListHeader>
                    <ListHeaderItem flex={2}>Produto</ListHeaderItem>
                    <ListHeaderItem flex={1}>Categoria</ListHeaderItem>
                    <ListHeaderItem flex={2}>Unidade</ListHeaderItem>
                    <ListHeaderItem flex={1}>Estoque</ListHeaderItem>
                    <ListHeaderItem>Editar</ListHeaderItem>
                    <ListHeaderItem>Deletar</ListHeaderItem>
                </ListHeader>
                <ProductsList>
                    {
                        produtos.map((item) => (
                            <Container key={item.id}>
                                <Product backColor='aliceblue'>
                                    <ProductName>{item.name}</ProductName>
                                    <ProductCategory>teste</ProductCategory>
                                    <ProductUnity>teste</ProductUnity>
                                    <ProductStock>{item.quantity}</ProductStock>
                                    <ActionButton
                                        onClick={() => navigate(`/produtos/${item.id}`, { state: item })}
                                    >
                                        <AiOutlineEdit />
                                    </ActionButton>
                                    <ActionButton
                                        onClick={() => dispatch(deleteProductById(item.id))}
                                    >
                                        <AiOutlineDelete />
                                    </ActionButton>
                                </Product>

                                {item.subproducts &&
                                    item.subproducts.map((subitem) => (
                                        <Product backColor='white' key={subitem.id}>
                                            <ProductName></ProductName>
                                            <ProductLote>Lote: {subitem.lote}</ProductLote>
                                            <ProductValidade>Validade: {subitem.validade.slice(0, 10)}</ProductValidade>
                                            <ProductStock>{subitem.quantity}</ProductStock>
                                            <ActionButton
                                                onClick={() => navigate(`/produtos/${item.id}/subprodutos/${subitem.id}`, { state: subitem })}
                                            >
                                                <AiOutlineEdit /></ActionButton>
                                            <ActionButton
                                                onClick={() => dispatch(deleteSubProductById(subitem.id))}
                                            >
                                                <AiOutlineDelete />
                                            </ActionButton>
                                        </Product>
                                    ))
                                }
                            </Container>
                        ))
                    }
                </ProductsList>
            </Wrapper>
        </Container>
    )
}
