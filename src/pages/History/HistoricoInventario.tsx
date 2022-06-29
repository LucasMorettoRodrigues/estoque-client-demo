import styled from "styled-components"
import { useLocation } from "react-router-dom"
import { formatValidity } from "../../utils/functions"
import Title from "../../components/UI/Title"
import InventarioList from "../../components/Inventario/InventarioList"
import { TProduct } from "../../types/TProduct"
import { TNotification } from "../../types/TNotification"
import Item from "../../components/List/Item"
import ItemsContainer from "../../components/List/ItemsContainer"
import ListHeader from "../../components/List/ListHeader"
import InventoryAnalisys from "../../components/Inventario/InventoryAnalisys"
import { useState } from "react"
import ModalInput from "../../components/UI/ModalInput"
import { useAppDispatch } from "../../app/hooks"
import { archiveNotification } from "../../features/notification/notificationSlice"
import Button from "../../components/UI/Button"

const Container = styled.div``
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

export default function HistoricoInventario() {

    const dispatch = useAppDispatch()
    const { state }: any = useLocation()

    const [products, setProducts] = useState<TProduct[]>(state.data)
    const [showModal, setShowModal] = useState(false)
    const [selectedSubProductId, setSelectedSubProductId] = useState<number | undefined>()
    const [selectedProductId, setSelectedProductId] = useState<number | undefined>()
    const [obs, setObs] = useState('')

    const handleEdit = (productId: number, subProductId: number) => {
        setShowModal(true)
        setSelectedSubProductId(subProductId)
        setSelectedProductId(productId)
    }

    const handleConfirm = async () => {

        const newData = products.map((product) => product.id === selectedProductId
            ? {
                ...product, subproducts:
                    product.subproducts!.map((subProduct: any) => subProduct.id === selectedSubProductId
                        ? { ...subProduct, obs }
                        : subProduct
                    )
            }
            : product
        )

        const notification: TNotification = { ...state, data: newData }

        try {
            await dispatch(archiveNotification(notification)).unwrap()
            setProducts(newData)
        } catch (error) {
            console.log(error)
        } finally {
            setShowModal(false)
        }
    }

    return (
        <>
            {showModal && <ModalInput
                message={{ title: 'Observação', message: 'Digite a observação:' }}
                onConfirm={handleConfirm}
                onChange={(e) => setObs(e.target.value)}
                onClose={() => setShowModal(false)}
            />}

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Title title='Inventário' />
                <MenuContainer>
                    <div style={{ marginTop: '20px' }}>
                        <p style={{ marginBottom: '8px' }}>Realizado por {state.user?.name}</p>
                        <p>em {formatValidity(state.createdAt)} </p>
                    </div>
                </MenuContainer>
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
                                            bg={'#eef7ff'}
                                            key={subitem.id}
                                        >
                                            <Item width='200px' color='#3142a0' text={`Lote: ${subitem.lote}`} />
                                            <Item width='160px' color='#3142a0' text={`Validade: ${formatValidity(subitem.validade)}`} />
                                            <Item width='90px' color='#3142a0' text={`Qtd (sis): ${subitem.quantity}`} />
                                            <Item width='90px' color='#3142a0' text={`Qtd (inv): ${subitem.inventory}`} />
                                            <Item flex={1} color='#3142a0' text={`Motivo: ${subitem.justification}`} />
                                            <Item flex={1} color='#3142a0' text={`Obs: ${subitem.obs}`} />
                                            <Button style={{ padding: '8px 16px', marginRight: '10px' }} text='Editar' onClick={() => handleEdit(item.id!, subitem.id)} bg='blue' />
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