import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import Button from '../UI/Button'
import Title from '../UI/Title'

const HeaderContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 10px;
`

type Props = {
    title: string,
    active: string,
}

export default function AdminPanelHeader({ title, active }: Props) {
    const navigate = useNavigate()

    return (
        <HeaderContainer>
            <Title title={title}></Title>
            <div>
                <div style={{ display: 'inline-block', opacity: active === 'Inbox' ? 0.5 : 1 }}>
                    <Button style={{ marginRight: '10px' }} text='Caixa de Entrada' onClick={() => navigate('/inbox')} />
                </div>
                <div style={{ display: 'inline-block', opacity: active === 'DashBoard' ? 0.5 : 1 }}>
                    <Button style={{ marginRight: '10px' }} text='DashBoard' onClick={() => navigate('/dashboard')} />
                </div>
                <div style={{ display: 'inline-block', opacity: active === 'Notifications' ? 0.5 : 1 }}>
                    <Button style={{ marginRight: '10px' }} text='Notificações' onClick={() => navigate('/historico/notificacoes')} />
                </div>
                <div style={{ display: 'inline-block', opacity: active === 'Inventories' ? 0.5 : 1 }}>
                    <Button text='Inventários' onClick={() => navigate('/historico/inventarios')} />
                </div>
            </div>
        </HeaderContainer>
    )
}
