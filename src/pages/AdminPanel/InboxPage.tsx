import { useAppDispatch } from "../../app/hooks";
import { getAllNotifications } from "../../features/notification/notificationSlice";
import { useEffect } from "react";
import DeliveryInfoAlert from "../../components/Alerts/ItemsToBuyAlert";
import AdminPanelHeader from "../../components/AdminPanel/AdminPanelHeader";
import Inbox from "../../components/AdminPanel/Inbox";

export default function InboxPage() {

    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(getAllNotifications())
    }, [dispatch])

    return (
        <>
            <DeliveryInfoAlert />
            <AdminPanelHeader title={'Caixa de Entrada'} active={'Inbox'} />
            <Inbox />
        </>
    )
}
