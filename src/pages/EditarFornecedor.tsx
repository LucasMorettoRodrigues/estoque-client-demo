import { useState, FormEvent, ChangeEvent } from "react"
import { useAppDispatch } from "../app/hooks"
import { useLocation, useNavigate } from "react-router-dom"
import styled from "styled-components"
import Button from "../components/Button"
import Input from "../components/Input"
import { editProvider } from "../features/fornecedor/fornecedorSlice"

const Container = styled.div``
const Wrapper = styled.div`
    max-width: 1300px;
    margin: 0 auto;
    padding: 40px 20px;
`
const Title = styled.h1`
    margin-bottom: 20px;
`

type stateType = {
    id: number,
    name: string
}

export default function EditarFornecedor() {

    const location = useLocation()
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const provider = location.state as stateType;

    const [name, setName] = useState(provider.name)

    const handleOnSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        dispatch(editProvider({ id: provider.id, name: name }))
        navigate('/fornecedores')
    }

    return (
        <Container>
            <Wrapper>
                <form onSubmit={handleOnSubmit}>
                    <Title>Editar Fornecedor</Title>
                    <Input
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
                        name={'name'}
                        label={'Name'}
                        value={name}
                        required
                    />
                    <Button text={'Editar Fornecedor'} />
                </form>
            </Wrapper>
        </Container>
    )
}
