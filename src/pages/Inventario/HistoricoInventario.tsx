import styled from "styled-components"
import { useLocation } from "react-router-dom"
import { formatValidity } from "../../utils/functions"
import Title from "../../components/UI/Title"
import InventarioList from "../../components/Inventario/InventarioList"

const MenuContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 20px;
`

export default function HistoricoInventario() {

    const { state }: any = useLocation()
    const products = state.data

    return (
        <>
            <Title title='Inventário' />
            <MenuContainer>
                <div style={{ flex: 1 }}>
                    <p style={{ marginBottom: '8px' }}>Realizado por {state.user?.name}</p>
                    <p>em {formatValidity(state.createdAt)} </p>
                </div>
            </MenuContainer>

            <InventarioList products={products} />
        </>
    )
}