import axios from "axios"
import { useState, FormEvent, ChangeEvent } from "react"
import { useNavigate } from "react-router-dom"
import styled from "styled-components"
import Button from "../../components/Button"
import Form from "../../components/Form"
import Input from "../../components/Input"
import Mensagem from "../../components/Mensagem"
import Select from "../../components/Select"
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

export default function CreateUser() {

    const navigate = useNavigate()

    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [role, setRole] = useState('')
    const [message, setMessage] = useState<any>('')

    const handleOnSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!username || !email || !password || !role) {
            setMessage({ title: 'Erro', message: 'Preencha todos os campos' })
        }

        try {
            await api.post("users", { name: username, email, password, role })
            navigate('/usuarios')
        } catch (error) {
            if (axios.isAxiosError(error)) {
                setMessage({ title: 'Erro', message: `${error.response?.data}` })
            }
        }

    }

    return (
        <>
            {message && <Mensagem message={message} onClick={() => setMessage('')} />}
            <Title title='Novo Usuário' />
            <Form onSubmit={handleOnSubmit}>
                <InputsContainer>
                    <InputContainer>
                        <Input
                            onChange={(e: ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)}
                            name={'username'}
                            label={'Username'}
                            required
                        />
                    </InputContainer>
                    <InputContainer>
                        <Input
                            onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                            name={'email'}
                            label={'E-mail'}
                            required
                        />
                    </InputContainer>
                    <InputContainer>
                        <Input
                            onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                            name={'password'}
                            label={'Senha'}
                            type='password'
                            required
                        />
                    </InputContainer>
                    <InputContainer>
                        <Select
                            onChange={(e: ChangeEvent<HTMLSelectElement>) => setRole(e.target.value)}
                            name={'role'}
                            label={'Permissão'}
                            required
                        >
                            <option></option>
                            <option>admin</option>
                            <option>logar</option>
                            <option>assinar</option>
                        </Select>
                    </InputContainer>
                </InputsContainer>
                <Button text={'Registrar Usuário'} />
            </Form>
        </>
    )
}
