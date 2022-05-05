import styled from "styled-components"
import { useNavigate } from "react-router-dom"
import Button from "../components/Button"
import { useAppDispatch, useAppSelector } from "../app/hooks"
import { TProduct } from "../types/TProduct"
import { AiOutlineEye } from "react-icons/ai"
import { editProduct } from "../features/produtos/produtoSlice"
import EditDeleteButton from "../components/EditDeleteButton"
import ListHeader from "../components/List/ListHeader"
import Item from "../components/List/Item"
import ItemsContainer from "../components/List/ItemsContainer"
import ProductBtn from "../components/ProductBtn"
import Title from "../components/Title"

const Container = styled.div``

const TitleContainer = styled.div`
    display: flex;
`
const ButtonContainer = styled.div`
    margin-bottom: 20px;
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
            <TitleContainer>
                <Title title='Produtos /' />
                <ProductBtn onClick={() => navigate('/produtos/detalhes')} text='Detalhes' />
                <ProductBtn onClick={() => navigate('/produtos')} text='Resumo' />
                <ProductBtn active={true} text='Arquivados' />
            </TitleContainer>

            <ButtonContainer>
                <Button onClick={() => navigate('/novoProduto')} text={'Cadastrar Novo Produto'} />
            </ButtonContainer>
            <ListHeader>
                <Item flex={3} text='Produto' />
                <Item flex={0.7} text='Categoria' />
                <Item flex={0.7} text='Unidade' />
                <Item flex={0.5} text='Estoque' align='center' />
                <Item flex={0.5} text='Est. Mín.' align='center' />
                <Item flex={0.5} text='Est. Max' align='center' />
                <Item width="90px" text='Mostrar' align='center' />
            </ListHeader>
            {
                resumedProducts.map((item) => (
                    <Container key={item.id}>
                        <ItemsContainer>
                            <Item flex={3} text={item.name} />
                            <Item flex={0.7} text={item.category} />
                            <Item flex={0.7} text={item.unit} />
                            <Item flex={0.5} text={item.stock} align='center'
                                bg={item.stock < item.min_stock ? '#ff5353' : 'inherit'} />
                            <Item flex={0.5} align='center' text={item.min_stock} />
                            <Item flex={0.5} align='center' text={item.max_stock} />
                            <EditDeleteButton onClick={() => dispatch(editProduct({ ...item, hide: false }))}>
                                <AiOutlineEye />
                            </EditDeleteButton>
                        </ItemsContainer>

                        {item.subproducts &&
                            item.subproducts.map((subitem) => (
                                <ItemsContainer key={subitem.id} type='subItem' bg='#eef7ff' >
                                    <div style={{ marginLeft: '60px' }}>
                                        <Item width='200px' color='#3142a0' text={`Lote: ${subitem.lote}`} />
                                    </div>
                                    <Item width='280px' color='#3142a0' text={`Validade: ${subitem.validade.slice(0, 10)}`} />
                                    <Item width='200px' color='#3142a0' text={`Quantidade: ${subitem.quantity}`} />
                                </ItemsContainer>
                            ))
                        }
                    </Container>
                ))
            }
        </>
    )
}
