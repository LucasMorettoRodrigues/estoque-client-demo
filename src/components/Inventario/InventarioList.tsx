import styled from "styled-components"
import { TProduct } from "../../types/TProduct"
import { formatValidity } from "../../utils/functions"
import Item from "../List/Item"
import ItemsContainer from "../List/ItemsContainer"
import ListHeader from "../../components/List/ListHeader"

const Container = styled.div``
const HeaderContainer = styled.div`
    display: flex;
    z-index: 1;
    position: sticky;
    top: 0;
`

type Props = {
    products: TProduct[]
}

export default function InventarioList({ products }: Props) {
    return (
        <>
            <HeaderContainer>
                <ListHeader fontSize='12px'>
                    <Item width="26px" text='Id' fontSize='12px' />
                    <Item flex={3} text='Produto' fontSize='12px' />
                    <Item flex={2} text='Observação' fontSize='12px' />
                    <Item width="90px" text='Código' fontSize='12px' />
                    <Item width="90px" text='Categoria' fontSize='12px' />
                    <Item width="130px" text='Marca' fontSize='12px' />
                    <Item width="65px" text='Unidade' fontSize='12px' />
                    <Item width="65px" text='Estoque' align='center' fontSize='12px' />
                </ListHeader>
            </HeaderContainer>
            {
                products.map((item) => (
                    <Container key={item.id}>
                        <div style={{ display: 'flex' }}>
                            {/* <ExpandIconContainer
                                bg='#cbe6ff'
                                onClick={() => (
                                    isOpen.includes(item.id!)
                                        ? setIsOpen(isOpen.filter(id => id !== item.id))
                                        : setIsOpen([...isOpen, item.id!])
                                )}>
                                <BsFillPlusSquareFill color="#333" size='15px' />
                            </ExpandIconContainer> */}
                            <ItemsContainer>
                                <Item width="26px" text={item.id} fontSize='12px' />
                                <Item flex={3} text={item.name} fontSize='12px' />
                                <Item flex={2} text={item.observation} fontSize='12px' />
                                <Item width="90px" text={item.code} fontSize='12px' />
                                <Item width="90px" text={item.category} fontSize='12px' />
                                <Item width="130px" text={item.brand} fontSize='12px' />
                                <Item width="65px" text={item.unit} fontSize='12px' />
                                <Item width="65px" text={item.stock} align='center' fontSize='12px' />
                                {/* <Item width="65px" text={item.min_stock} align='center' fontSize='12px' /> */}
                                {/* <Item width="65px" text={item.max_stock} align='center' fontSize='12px' /> */}
                            </ItemsContainer>

                        </div>

                        {/* {item.subproducts && (isOpen.includes(item.id!) || isAllOpen) && */}
                        {item.subproducts &&
                            item.subproducts.map((subitem) => (
                                <ItemsContainer
                                    type="subItem"
                                    bg={subitem.justification ? '#ffd2d2' : '#eef7ff'}
                                    key={subitem.id}
                                >
                                    <div style={{ marginLeft: '60px' }}>
                                        <Item width='200px' color='#3142a0' text={`Lote: ${subitem.lote}`} />
                                    </div>
                                    <Item width='180px' color='#3142a0' text={`Validade: ${formatValidity(subitem.validade)}`} />
                                    <Item width='120px' color='#3142a0' text={`Qtd (sis): ${subitem.quantity}`} />
                                    <Item width='120px' color='#3142a0' text={`Qtd (inv): ${subitem.inventory}`} />
                                    <>
                                        {subitem.justification &&
                                            <Item flex={1} color='#3142a0' text={`Motivo: ${subitem.justification}`} />
                                        }
                                    </>
                                </ItemsContainer>
                            ))
                        }
                    </Container>
                ))
            }
        </>
    )
}
