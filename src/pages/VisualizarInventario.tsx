import styled from "styled-components"
import { useLocation, useNavigate } from "react-router-dom"
import { useAppDispatch } from "../app/hooks"
import { useState } from "react"
import { TProduct } from "../types/TProduct"
import { formatValidity } from "../utils/functions"
import ListHeader from "../components/List/ListHeader"
import Item from "../components/List/Item"
import ItemsContainer from "../components/List/ItemsContainer"
import Title from "../components/UI/Title"
import AdjustButton from "../components/AdjustButton"
import { archiveNotification } from "../features/notification/notificationSlice"
import Button from "../components/UI/Button"
import { TMessage } from "../types/TMessage"
import Mensagem from "../components/Mensagem"
import InventarioList from "../components/Inventario/InventarioList"

const Container = styled.div``
const TitleContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`
const MenuContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 20px;
`
const HeaderContainer = styled.div`
    display: flex;
    z-index: 1;
    position: sticky;
    top: 0;
`

export default function VizualizarInventario() {

    const { state }: any = useLocation()
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const products: TProduct[] = state.data

    const [message, setMessage] = useState<TMessage>()

    const handleArchive = async () => {
        try {
            await dispatch(archiveNotification({ ...state, archived: true })).unwrap()
            setMessage({ title: 'Sucesso', message: 'Ação concluida.' })
        } catch (error) {
            setMessage({ title: 'Erro', message: 'Não foi possivel concluir a ação.' })
        }
    }

    const handleMessage = () => {
        if (message!.title === 'Sucesso') {
            navigate('/panel')
        } else {
            setMessage(null)
        }
    }

    return (
        <>
            {message && <Mensagem onClick={handleMessage} message={message} />}
            <TitleContainer>
                <Title title='Inventário' />
                <Button text="Arquivar" onClick={handleArchive} bg='red' />
            </TitleContainer>
            <MenuContainer>
                <div style={{ flex: 1 }}>
                    <p style={{ marginBottom: '8px' }}>Realizado por {state.user?.name}</p>
                    <p>em {formatValidity(state.createdAt)} </p>
                </div>
            </MenuContainer>
            <h3 style={{ marginTop: '30px', marginBottom: '10px' }}>Produtos com Divergência</h3>
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
                products
                    .map(i => ({ ...i, subproducts: i.subproducts?.filter(j => j.justification) }))
                    .filter(i => i.subproducts!.length > 0)
                    .map((item) => (
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
                                item.subproducts
                                    .filter(i => i.justification)
                                    .map((subitem) => (
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
                                            <AdjustButton subProduct={subitem} />
                                        </ItemsContainer>
                                    ))
                            }
                        </Container>
                    ))
            }

            <h3 style={{ marginTop: '40px', marginBottom: '10px' }}>
                Inventário completo
            </h3>
            <InventarioList products={products} />
        </>
    )
}