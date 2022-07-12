import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import Title from "../components/UI/Title";
import { getAllNotifications } from "../features/notification/notificationSlice";
import { useEffect } from "react";
import Button from "../components/UI/Button";
import Notification from "../components/UI/Notification";
import DeliveryInfoAlert from "../components/Alerts/ItemsToBuyAlert";

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

export default function AdminPanel() {

    const navigate = useNavigate()
    const notifications = useAppSelector(state =>
        state.notification.notifications.filter(i => !i.archived))
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(getAllNotifications())
    }, [dispatch])

    return (
        <>
            <DeliveryInfoAlert />
            <HeaderContainer>
                <Title title='Bem Vindo'></Title>
                <div>
                    <Button style={{ marginRight: '10px' }} text='DashBoard' onClick={() => navigate('/dashboard')} />
                    <Button style={{ marginRight: '10px' }} text='Notificações' onClick={() => navigate('/historico/notificacoes')} />
                    <Button text='Inventários' onClick={() => navigate('/historico/inventarios')} />
                </div>
            </HeaderContainer>
            <Info>Você possui {notifications.length} notificações.</Info>
            {notifications.length > 0 && notifications.map((item, index) => (
                <Notification
                    notification={item} key={index}
                />
            ))
            }
        </>
    )
}
