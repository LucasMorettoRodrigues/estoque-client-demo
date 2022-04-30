import { useState, FormEvent, ChangeEvent } from "react"
import { useNavigate } from "react-router-dom"
import styled from "styled-components"
import { useAppDispatch } from "../app/hooks"
import Button from "../components/Button"
import Input from "../components/Input"
import { createProvider } from "../features/fornecedor/fornecedorSlice"

const Title = styled.h1`
    color: #222;
    margin: 30px 0;
`
const InputContainer = styled.div`
    margin-bottom: 20px;
`

export default function NovoFornecedor() {

    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const [name, setName] = useState('')

    const handleOnSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        dispatch(createProvider({ name: name }))
        navigate('/fornecedores')
    }

    return (
        <>
            <form onSubmit={handleOnSubmit}>
                <Title>Novo Fornecedor</Title>
                <InputContainer>
                    <Input
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
                        name={'name'}
                        label={'Name'}
                        required
                    />
                </InputContainer>
                <Button text={'Cadastrar Fornecedor'} />
            </form>
        </>
    )
}
