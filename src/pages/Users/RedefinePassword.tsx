import axios from "axios"
import { useState, FormEvent, ChangeEvent } from "react"
import { useNavigate, useParams } from "react-router-dom"
import styled from "styled-components"
import Button from "../../components/Button"
import Form from "../../components/Form"
import Input from "../../components/Input"
import Mensagem from "../../components/Mensagem"
import Title from "../../components/Title"
import { api } from "../../services/api.service"

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

export default function RedefinePassword() {

    const navigate = useNavigate()
    const { id } = useParams()

    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [message, setMessage] = useState('')

    const handleOnSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!password) {
            setError('Preencha a nova senha.')
        }

        try {
            await api.patch(`users/${id}`, { password })
            setMessage('Senha alterada com sucesso.')
        } catch (error) {
            if (axios.isAxiosError(error)) {
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
                            onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                            name={'password'}
                            label={'Nova Senha'}
                            required
                        />
                    </InputContainer>
                </InputsContainer>
                <Button text={'Confirmar'} />
            </Form>
        </>
    )
}
