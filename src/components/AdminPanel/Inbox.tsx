import styled from "styled-components"
import { useAppSelector } from "../../app/hooks"
import Notification from "../UI/Notification"

const Info = styled.div`
    font-size: 18px;
    margin-bottom: 30px;
    margin-left: 50px;
`

export default function Inbox() {

    const notifications = useAppSelector(state =>
        state.notification.notifications.filter(i => !i.archived))

    return (
        <>
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
