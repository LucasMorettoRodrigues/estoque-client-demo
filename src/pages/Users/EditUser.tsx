import axios from "axios"
import { useState, FormEvent, ChangeEvent } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import styled from "styled-components"
import Button from "../../components/Button"
import Form from "../../components/Form"
import Input from "../../components/Input"
import Mensagem from "../../components/Mensagem"
import Select from "../../components/Select"
import Title from "../../components/Title"
import { api } from "../../services/api.service"
import { TUser } from "../../types/TUser"

const InputsContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    width: 100%;
`
const InputContainer = styled.div`
    width: 48%;
    margin-bottom: 20px;
`

export default function EditUser() {

    const navigate = useNavigate()
    const location = useLocation()
    const user = location.state as TUser;

    const [username, setUsername] = useState(user.name)
    const [email, setEmail] = useState(user.email)
    const [role, setRole] = useState(user.role)
    const [status, setStatus] = useState(user.status)
    const [error, setError] = useState('')
    const [message, setMessage] = useState('')

    const handleOnSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!username || !email || !role || !status) {
            setError('Preencha todos os campos')
        }

        try {
            await api.patch(`users/${user.id}`, { name: username, email, role, status })
            setMessage('Usuário editado com sucesso.')
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.log(error)
                setError(`${error.response?.data}`)
            }
        }
    }

    return (
        <>
            {error && <Mensagem error={error} onClick={() => setError('')} />}
            {message && <Mensagem warning={message} onClick={() => navigate('/usuarios')} />}
            <Title title='Editar Usuário' />
            <Form onSubmit={handleOnSubmit}>
                <InputsContainer>
                    <InputContainer>
                        <Input
                            onChange={(e: ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)}
                            name={'username'}
                            value={username}
                            label={'Username'}
                            required
                        />
                    </InputContainer>
                    <InputContainer>
                        <Input
                            onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                            name={'email'}
                            value={email}
                            label={'E-mail'}
                            required
                        />
                    </InputContainer>
                    <InputContainer>
                        <Select
                            onChange={(e: ChangeEvent<HTMLSelectElement>) => setRole(e.target.value)}
                            name={'role'}
                            value={role}
                            label={'Permissão'}
                            required
                        >
                            <option></option>
                            <option>admin</option>
                            <option>logar</option>
                            <option>assinar</option>
                        </Select>
                    </InputContainer>
                    <InputContainer>
                        <Select
                            onChange={(e: ChangeEvent<HTMLSelectElement>) => setStatus(e.target.value)}
                            name={'status'}
                            value={status}
                            label={'Status'}
                            required
                        >
                            <option>ativo</option>
                            <option>inativo</option>
                        </Select>
                    </InputContainer>
                </InputsContainer>
                <Button text={'Confirmar'} />

            </Form>
            <Button
                text={'Redefinir Senha'} bg='blue'
                onClick={() => navigate(`/usuarios/${user.id}/redefinirSenha`)} />
        </>
    )
}
