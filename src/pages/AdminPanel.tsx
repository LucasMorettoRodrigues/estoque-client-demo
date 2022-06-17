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
            dispatch(deleteNotification(item.id!))
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
                <Button text='Histórico de Notificações' onClick={() => navigate('/notificacoes')} />
            </HeaderContainer>
            <Info>Você possui {notifications.length} notificações.</Info>
            {notifications.length > 0 && notifications.map((item, index) => (
                <Box key={index} >
                    <>
                        <div style={{ display: 'flex', flex: 1 }}
                            onClick={() => handleClick(item)}>
                            <BoxItem style={{ flex: 1 }}>
                                <Description bk={item.description}>
                                    {item.description}
                                </Description>
                            </BoxItem>
                            <BoxItem style={{ flex: 1 }}><Text>Enviado por:</Text>{item.user?.name}</BoxItem>
                            <BoxItem style={{ width: '90px' }}>{formatValidity(item.createdAt)}</BoxItem>
                            <EditDeleteButton width="40px"
                                onClick={(e) => handleDelete(e, item)}>
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
