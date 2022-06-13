import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import EditDeleteButton from "../components/UI/EditDeleteButton";
import Title from "../components/UI/Title";
import { archiveNotification, deleteNotification, getAllNotifications } from "../features/notification/notificationSlice";
import { formatValidity } from "../utils/functions";
import { AiOutlineDelete } from 'react-icons/ai'
import { useEffect } from "react";
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
const Box = styled.div`
    padding: 10px;
    width: 80%;
    margin: 5px auto;
    padding-left: 35px;
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
const BoxItem = styled.div`
    display: flex;
    align-items: center;
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

    const handleDelete = (item: TNotification) => {
        if (item.description === 'Solicitação para Inserir') {
            dispatch(deleteNotification(item.id!))
        } else if (item.description === 'Notificação de Validade Incorreta') {
            dispatch(archiveNotification({ ...item, archived: true }))
        }
    }

    return (
        <>
            <HeaderContainer>
                <Title title='Bem Vindo'></Title>
                <Button text='Histórico de Notificações' onClick={() => navigate('/notificacoes')} />
            </HeaderContainer>
            <Info>Você possui {notifications.length} solicitações pendentes.</Info>
            {notifications.length > 0 && notifications.map((item, index) => (
                <Box key={index} >
                    <>
                        <div style={{ display: 'flex', flex: 1 }}
                            onClick={() => {
                                (item.description === 'Solicitação para Inserir' || item.description === 'Solicitação de Compra') &&
                                    navigate('/inserir', { state: item })
                            }}>
                            <BoxItem style={{ flex: 1, color: item.description === 'Solicitação para Inserir' ? 'green' : 'red' }}>
                                {item.description}
                            </BoxItem>
                            <BoxItem style={{ flex: 1 }}><Text>Enviado por:</Text>{item.user?.name}</BoxItem>
                            <BoxItem style={{ width: '90px' }}>{formatValidity(item.createdAt)}</BoxItem>
                            <EditDeleteButton width="40px"
                                onClick={() => handleDelete(item)}>
                                <AiOutlineDelete />
                            </EditDeleteButton>
                        </div>
                        {item.description === 'Notificação de Validade Incorreta' &&
                            <>
                                <div>
                                    <p style={{ paddingBottom: '10px' }}><Text>Motivo:</Text>{item.data!.message}</p>
                                </div>
                                <p style={{ paddingBottom: '10px' }}><Text>Produto:</Text>{item.data!.product}</p>
                                <div style={{ display: 'flex' }}>
                                    <p style={{ paddingBottom: '10px', width: '390px' }}><Text>Lote:</Text>{item.data!.subproduct}</p>
                                    <p style={{ paddingBottom: '10px' }}><Text>Validade:</Text>{formatValidity(item.data!.validity)}</p>
                                </div>
                            </>
                        }
                    </>
                </Box>
            ))
            }
        </>
    )
}
