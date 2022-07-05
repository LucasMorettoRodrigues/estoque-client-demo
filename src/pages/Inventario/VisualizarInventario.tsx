import styled from "styled-components"
import { useLocation, useNavigate } from "react-router-dom"
import { useState } from "react"
import { TProduct } from "../../types/TProduct"
import { formatValidity } from "../../utils/functions"
import ListHeader from "../../components/List/ListHeader"
import Item from "../../components/List/Item"
import ItemsContainer from "../../components/List/ItemsContainer"
import Title from "../../components/UI/Title"
import AdjustButton from "../../components/Inventario/AdjustButton"
import { TMessage } from "../../types/TMessage"
import Mensagem from "../../components/UI/Mensagem"
import InventarioList from "../../components/Inventario/InventarioList"
import InventoryAnalisys from "../../components/Inventario/InventoryAnalisys"

const Container = styled.div``
const HeaderContainer = styled.div`
    display: flex;
    z-index: 1;
    position: sticky;
    top: 0;
`

export default function VizualizarInventario() {

    const { state }: any = useLocation()
    const navigate = useNavigate()

    const products: TProduct[] = state.data
    const [message, setMessage] = useState<TMessage>()

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

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Title title='Inventário' />
                <div style={{ fontSize: 14, color: '#555' }}>
                    <p style={{ marginBottom: '8px' }}>Realizado por {state.user?.name} em {formatValidity(state.createdAt)}</p>
                </div>
            </div>
            <InventoryAnalisys products={products} />

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
                                            <Item width='200px' color='#3142a0' text={`Lote: ${subitem.lote}`} />
                                            <Item width='150px' color='#3142a0' text={`Validade: ${formatValidity(subitem.validade)}`} />
                                            <Item width='90px' color='#3142a0' text={`Qtd (sis): ${subitem.quantity}`} />
                                            <Item width='90px' color='#3142a0' text={`Qtd (inv): ${subitem.inventory}`} />
                                            <Item flex={1} color='#3142a0' text={`Motivo: ${subitem.reason}`} />
                                            <Item flex={2} color='#3142a0' text={`Justificativa: ${subitem.justification}`} />
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