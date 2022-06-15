import styled from "styled-components"
import { useAppSelector } from "../app/hooks"

import Title from "../components/UI/Title"
import ListHeader from "../components/List/ListHeader"
import Item from "../components/List/Item"
import ItemsContainer from "../components/List/ItemsContainer"
import { formatValidity } from "../utils/functions"

const Container = styled.div``
const HeaderContainer = styled.div`
    display: flex;
    z-index: 1;
    position: sticky;
    top: 0;
`

export default function Inventario() {

    const products = useAppSelector(state => state.produto.produtos.filter(i => i.hide === false))

    return (
        <>
            <Title title='Inventario' />
            <HeaderContainer>
                <ListHeader fontSize='12px'>
                    <Item width="26px" text='Id' />
                    <Item flex={3} text='Produto' />
                    <Item flex={2} text='Observação' fontSize='12px' />
                    <Item width="90px" text='Código' fontSize='12px' />
                    <Item width="90px" text='Categoria' />
                    <Item width="130px" text='Marca' fontSize='12px' />
                    <Item width="65px" text='Unidade' fontSize='12px' />
                    <Item width="65px" text='Estoque' align='center' fontSize='12px' />
                </ListHeader>
            </HeaderContainer>

            {
                products.map((item) => (
                    <Container key={item.id}>
                        <div style={{ display: 'flex' }}>
                            <ItemsContainer>
                                <Item width="26px" text={item.id} fontSize='12px' />
                                <Item flex={3} text={item.name} fontSize='12px' />
                                <Item flex={2} text={item.observation} fontSize='12px' />
                                <Item width="90px" text={item.code} fontSize='12px' />
                                <Item width="90px" text={item.category} fontSize='12px' />
                                <Item width="130px" text={item.brand} fontSize='12px' />
                                <Item width="65px" text={item.unit} fontSize='12px' />
                                <Item width="65px" text={item.stock} align='center' fontSize='12px' />
                            </ItemsContainer>

                        </div>

                        {item.subproducts &&
                            item.subproducts.map((subitem) => (
                                <ItemsContainer
                                    type="subItem"
                                    bg='#eef7ff'
                                    key={subitem.id}
                                >
                                    <div style={{ marginLeft: '60px' }}>
                                        <Item width='200px' color='#3142a0' text={`Lote: ${subitem.lote}`} />
                                    </div>
                                    <Item width='280px' color='#3142a0' text={`Validade: ${formatValidity(subitem.validade)}`} />
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
