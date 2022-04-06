import { useState, FormEvent, ChangeEvent } from "react"
import { useNavigate } from "react-router-dom"
import styled from "styled-components"
import { useAppDispatch } from "../app/hooks"
import Button from "../components/Button"
import Input from "../components/Input"
import { createProvider } from "../features/fornecedor/fornecedorSlice"

const Container = styled.div``
const Wrapper = styled.div`
    max-width: 1300px;
    margin: 0 auto;
    padding: 40px 20px;
`
const Title = styled.h1`
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
        <Container>
            <Wrapper>
                <form onSubmit={handleOnSubmit}>
                    <Title>Novo Fornecedor</Title>
                    <Input
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
                        name={'name'}
                        label={'Name'}
                        required
                    />
                    <Button text={'Cadastrar Fornecedor'} />
                </form>
            </Wrapper>
        </Container>
    )
}
