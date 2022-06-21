import styled from "styled-components"
import { useAppSelector } from "../app/hooks"

import Title from "../components/UI/Title"
import ListHeader from "../components/List/ListHeader"
import Item from "../components/List/Item"
import ItemsContainer from "../components/List/ItemsContainer"
import { formatValidity } from "../utils/functions"
import { useNavigate } from "react-router-dom"

const Container = styled.div``

export default function Inventarios() {

    const navigate = useNavigate()

    const notifications = useAppSelector(state => state.notification.notifications.filter(
        i => i.description === 'Inventário'
    ))

    return (
        <>
            <Title title='Histórico de Inventários' />
            <ListHeader>
                <Item width="100px" text='Data' />
                <Item flex={1} text='Realizado por' />
            </ListHeader>
            {
                notifications.map((item) => (
                    <Container key={item.id}>
                        <ItemsContainer onClick={() => navigate(`/historico/inventarios/${item.id}`, { state: item })}>
                            <Item width="100px" text={formatValidity(item.createdAt)} />
                            <Item flex={1} text={item.user!.name} />
                        </ItemsContainer>
                    </Container>
                ))
            }
        </>
    )
}
