import styled from "styled-components"
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai'
import { useNavigate } from "react-router-dom"
import Button from "../components/Button"
import { useAppDispatch, useAppSelector } from "../app/hooks"
import { deleteProductById, deleteSubProductById } from "../features/produtos/produtoSlice"

const Container = styled.div``
const Title = styled.h1`
    color: #222;
    margin: 30px 0;
`
const ListHeader = styled.div`
    height: 45px;
    padding: 0 10px;
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
`
const Product = styled.ul`
    padding: 0 10px;
    height: 40px;
    background-color: #cbe6ff;
    display: flex;
    align-items: center;
    border-bottom: 1px solid #cacaca;
`
const SubProduct = styled.ul`
    height: 40px;
    padding-right: 10px;
    display: flex;
    background-color: #eef7ff;
    align-items: center;
    border-bottom: 1px solid #e4e4e4;
`
const ProductLi = styled.li<{ flex?: number, color?: string, width?: string }>`
    flex: ${props => props.flex ? props.flex : null};
    background-color: ${props => props.color ? props.color : null};
    font-size: 12px;
    padding: 10px;
    width: ${props => props.width ? props.width : null};
`
const SubProductLi = styled.li<{ flex?: number }>`
    flex: ${props => props.flex ? props.flex : null};
    font-size: 14px;
    margin-left: 60px;
    color: #555;
    padding: 10px;
`
const ActionButton = styled.li<{ width: string }>`
    display: flex;
    width: ${props => props.width};
    align-items: center;
    justify-content: center;
    text-align: center;
    font-size: 20px;
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
    const stockOuts = useAppSelector(state => state.stockOut.stockOuts)

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

    return (
        <>
            <Title>Produtos / Detalhes</Title>
            <Button onClick={() => navigate('/novoProduto')} text={'Cadastrar Novo Produto'} />
            <Button onClick={() => navigate('/produtos')} text={'Resumo'} />
            <Button onClick={() => navigate('/produtos/escondidos')} text={'Produtos Escondidos'} />
            <ListHeader>
                <ListHeaderItem width="30px">Id</ListHeaderItem>
                <ListHeaderItem flex={3}>Produto</ListHeaderItem>
                <ListHeaderItem flex={0.8} style={{ textAlign: 'center' }}>Código</ListHeaderItem>
                <ListHeaderItem flex={1}>Categoria</ListHeaderItem>
                <ListHeaderItem flex={1}>Marca</ListHeaderItem>
                <ListHeaderItem flex={1}>Unidade</ListHeaderItem>
                <ListHeaderItem flex={0.8} style={{ textAlign: 'center' }}>Estoque</ListHeaderItem>
                <ListHeaderItem flex={0.8} style={{ textAlign: 'center' }}>Est. Mín.</ListHeaderItem>
                <ListHeaderItem flex={0.8} style={{ textAlign: 'center' }}>Est. Max.</ListHeaderItem>
                <ListHeaderItem flex={1} style={{ textAlign: 'center' }}>Tempo Médio Retirada</ListHeaderItem>
                <ListHeaderItem width="50px">Editar</ListHeaderItem>
                <ListHeaderItem width="60px">Deletar</ListHeaderItem>
            </ListHeader>
            {
                products.map((item) => (
                    <Container key={item.id}>
                        <Product>
                            <ProductLi width="30px">{item.id}</ProductLi>
                            <ProductLi flex={3}>{item.name}</ProductLi>
                            <ProductLi flex={0.8} style={{ textAlign: 'center' }}>{item.code}</ProductLi>
                            <ProductLi flex={1}>{item.category}</ProductLi>
                            <ProductLi flex={1}>{item.brand}</ProductLi>
                            <ProductLi flex={1}>{item.unit}</ProductLi>
                            <ProductLi flex={0.8} style={{ textAlign: 'center' }}>{item.stock}</ProductLi>
                            <ProductLi flex={0.8} style={{ textAlign: 'center' }}>{item.min_stock}</ProductLi>
                            <ProductLi flex={0.8} style={{ textAlign: 'center' }}>{item.max_stock}</ProductLi>
                            <ProductLi flex={1} style={{ textAlign: 'center' }}>{getStockOutFrequency(item.id!)}
                            </ProductLi>
                            <ActionButton width="50px"
                                onClick={() => navigate(`/produtos/${item.id}`, { state: item })}
                            >
                                <AiOutlineEdit />
                            </ActionButton>
                            <ActionButton width="60px"
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
                                    <ActionButton width="50px"
                                        onClick={() => navigate(`/produtos/${item.id}/subprodutos/${subitem.id}`, { state: subitem })}
                                    >
                                        <AiOutlineEdit /></ActionButton>
                                    <ActionButton width="60px"
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
        </>
    )
}
