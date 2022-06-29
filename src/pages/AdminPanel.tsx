import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import EditDeleteButton from "../components/UI/EditDeleteButton";
import Title from "../components/UI/Title";
import { archiveNotification, deleteNotification, getAllNotifications } from "../features/notification/notificationSlice";
import { formatValidity } from "../utils/functions";
import { AiOutlineDelete } from 'react-icons/ai'
import { MouseEvent, useEffect } from "react";
import Button from "../components/UI/Button";
import { TNotification } from "../types/TNotification";

const HeaderContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`
const Info = styled.div`
    font-size: 18px;
    margin-bottom: 30px;
    margin-left: 50px;
`
const NotificationContainer = styled.div`
    padding: 10px;
    width: 80%;
    margin: 5px auto;
    padding-left: 20px;
    border-radius: 5px;
    background-color: white;
    border: 2px solid #d8d8d8;
    align-self: center;
    justify-self:center;
    cursor: pointer;

    &:hover {
        background-color: #badaf8;
    }
`
const NotificationRow = styled.div`
    display: flex;
    align-items: center;
`
const NotificationItem = styled.div`
    margin: 5px;
    display: flex;
    align-items: center;
`
const Description = styled.div<{ bk: string }>`
    width: fit-content;
    padding: 2px 6px;
    border-radius: 5px;
    color: white;
    font-weight: 600;
    background-color: ${props => props.bk === 'Solicitação para Inserir' ? '#3dc73d' : props.bk === 'Inventário' ? '#168eff' : '#ff3e3e'};
`
const Text = styled.span`
    margin-top: 2px;    
    margin-right: 5px;
    color: #666;
    font-size: 14px;
`

export default function AdminPanel() {

    const navigate = useNavigate()
    const notifications = useAppSelector(state =>
        state.notification.notifications.filter(i => !i.archived))
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(getAllNotifications())
    }, [dispatch])

    const handleDelete = (e: MouseEvent<HTMLLIElement>, item: TNotification) => {
        e.stopPropagation()

        if (item.description === 'Solicitação para Inserir') {
            dispatch(deleteNotification(item.id!))
        }

        if (item.description === 'Notificação de Validade Incorreta') {
            dispatch(archiveNotification({ ...item, archived: true }))
        }

        if (item.description === 'Inventário') {
            dispatch(archiveNotification({ ...item, archived: true }))
        }
    }

    const handleClick = (item: TNotification) => {
        if (item.description === 'Solicitação para Inserir') {
            navigate('/inserir', { state: item })
        }

        if (item.description === 'Inventário') {
            navigate(`/inventario/${item.id}`, { state: item })
        }
    }

    return (
        <>
            <HeaderContainer>
                <Title title='Bem Vindo'></Title>
                <div>
                    <Button style={{ marginRight: '10px' }} text='Notificações' onClick={() => navigate('/historico/notificacoes')} />
                    <Button text='Inventários' onClick={() => navigate('/historico/inventarios')} />
                </div>
            </HeaderContainer>
            <Info>Você possui {notifications.length} notificações.</Info>
            {notifications.length > 0 && notifications.map((item, index) => (
                <NotificationContainer key={index} >
                    <NotificationRow onClick={() => handleClick(item)}>
                        <NotificationItem style={{ flex: 1 }}>
                            <Description bk={item.description}>
                                {item.description}
                            </Description>
                        </NotificationItem>
                        <NotificationItem style={{ flex: 1 }}><Text>Enviado por:</Text>{item.user?.name}</NotificationItem>
                        <NotificationItem style={{ width: '90px', fontSize: '14px', color: '#666' }}>{formatValidity(item.createdAt)}</NotificationItem>
                        <EditDeleteButton width="40px"
                            onClick={(e) => handleDelete(e, item)}>
                            <AiOutlineDelete />
                        </EditDeleteButton>
                    </NotificationRow>

                    {item.description === 'Notificação de Validade Incorreta' &&
                        <>
                            <NotificationRow style={{ display: 'flex' }}>
                                <NotificationItem style={{ width: '42%' }}><Text>Produto:</Text>{item.data!.product}</NotificationItem>
                                <NotificationItem ><Text>Qtd. Retirada:</Text>{item.data.quantity}</NotificationItem>
                            </NotificationRow>
                            <NotificationRow style={{ display: 'flex' }}>
                                <NotificationItem style={{ width: '42%' }}><Text>Lote:</Text>{item.data!.subproduct}</NotificationItem>
                                <NotificationItem><Text>Validade:</Text>{formatValidity(item.data!.validity)}</NotificationItem>
                            </NotificationRow>
                            <NotificationRow style={{ display: 'flex' }}>
                                <NotificationItem ><Text>Motivo:</Text>{item.data!.message}</NotificationItem>
                            </NotificationRow>
                        </>
                    }
                </NotificationContainer>
            ))
            }
        </>
    )
}
