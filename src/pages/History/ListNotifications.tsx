import styled from "styled-components"
import { useAppSelector } from "../../app/hooks"

import Title from "../../components/UI/Title"
import ListHeader from "../../components/List/ListHeader"
import Item from "../../components/List/Item"
import ItemsContainer from "../../components/List/ItemsContainer"
import { formatValidity } from "../../utils/functions"

const Container = styled.div``

export default function ListNotifications() {

    const notifications = useAppSelector(state => state.notification.notifications.filter(
        i => i.description === 'Notificação de Validade Incorreta'
    ))

    return (
        <>
            <Title title='Histórico de Notificações (Produtos Retirados com Validade Incorreta)' />
            <ListHeader>
                <Item width="100px" text='Data' />
                <Item flex={1} text='Produto' />
                <Item flex={1} text='Motivo' />
                <Item width="100px" text='Lote' />
                <Item width="100px" text='Validade' />
                <Item width="100px" text='Usuário' />
            </ListHeader>
            {
                notifications.map((item) => (
                    <Container key={item.id}>
                        <ItemsContainer>
                            <Item width="100px" text={formatValidity(item.createdAt)} />
                            <Item flex={1} text={item.data!.product} />
                            <Item flex={1} text={item.data!.message} />
                            <Item width="100px" text={item.data!.subproduct} />
                            <Item width="100px" text={formatValidity(item.data!.validity)} />
                            <Item width="100px" text={item.user!.name} />
                        </ItemsContainer>
                    </Container>
                ))
            }
        </>
    )
}
