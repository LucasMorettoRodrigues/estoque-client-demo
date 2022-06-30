import styled from "styled-components"
import { useNavigate } from "react-router-dom"
import Button from "../../components/UI/Button"
import ListHeader from "../../components/List/ListHeader"
import Item from "../../components/List/Item"
import ItemsContainer from "../../components/List/ItemsContainer"
import Title from "../../components/UI/Title"
import { useEffect, useState } from "react"
import { api } from "../../services/api.service"
import { TUser } from "../../types/TUser"
import ListWrapper from "../../components/UI/ListWrapper"

const ButtonContainer = styled.div`
    margin-bottom: 20px;
`

export default function Users() {

    const [users, setUsers] = useState<TUser[]>([])
    const navigate = useNavigate()

    useEffect(() => {
        const getUsers = async () => {
            let res = await api.get("/users")
            setUsers(res.data as TUser[])
        }

        getUsers()
    }, [])

    return (
        <>
            <Title title='Gerenciar usuários' />
            <ButtonContainer>
                <Button onClick={() => navigate('/usuarios/novo')} text={'Cadastrar Novo Usuário'} />
            </ButtonContainer>

            <ListWrapper>
                <ListHeader>
                    <Item width="50px" align="center" text='Id' />
                    <Item flex={1} text='Username' />
                    <Item flex={2} text='Email' />
                    <Item width="150px" text='Permissão' />
                    <Item width="150px" text='Status' />
                </ListHeader>
                <>
                    {
                        users.map((item) => (
                            <ItemsContainer
                                key={item.id}
                                onClick={() => navigate(`/usuarios/${item.id}`, { state: item })}
                            >
                                <Item width="50px" align="center" text={item.id} />
                                <Item flex={1} text={item.name} />
                                <Item flex={2} text={item.email} />
                                <Item width="150px" text={item.role} />
                                <Item width="150px" text={item.status} />
                            </ItemsContainer>
                        ))
                    }
                </>
            </ListWrapper>
        </>
    )
}
