import styled from "styled-components"
import { useAppSelector } from "../../app/hooks"

import Title from "../../components/UI/Title"
import ListHeader from "../../components/List/ListHeader"
import Item from "../../components/List/Item"
import ItemsContainer from "../../components/List/ItemsContainer"
import { formatValidity } from "../../utils/functions"
import { useNavigate } from "react-router-dom"
import ListWrapper from "../../components/UI/ListWrapper"

const Container = styled.div``

export default function ListInventarios() {

    const navigate = useNavigate()

    const notifications = useAppSelector(state => state.notification.notifications.filter(
        i => i.description === 'Inventário'
    ))

    return (
        <>
            <Title title='Histórico de Inventários' />

            <ListWrapper>
                <ListHeader>
                    <Item width="100px" text='Data' />
                    <Item width="90px" text='Hora' />
                    <Item flex={1} text='Responsável' />
                </ListHeader>
                <>
                    {
                        notifications.map((item) => (
                            <Container key={item.id}>
                                <ItemsContainer onClick={() => navigate(`/inventarios/${item.id}`, { state: item })}>
                                    <Item width="100px" text={formatValidity(item.createdAt)} />
                                    <Item width='90px' text={item.createdAt?.slice(11, 19)} />
                                    <Item flex={1} text={item.user!.name} />
                                </ItemsContainer>
                            </Container>
                        ))
                    }
                </>
            </ListWrapper>
        </>
    )
}
