import { useState, FormEvent, ChangeEvent } from "react"
import { useAppDispatch } from "../app/hooks"
import { useLocation, useNavigate } from "react-router-dom"
import styled from "styled-components"
import Button from "../components/Button"
import Input from "../components/Input"
import { editProvider } from "../features/fornecedor/fornecedorSlice"

const Title = styled.h1`
    color: #222;
    margin: 30px 0;
`
const InputContainer = styled.div`
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
        <>
            <form onSubmit={handleOnSubmit}>
                <Title>Editar Fornecedor</Title>
                <InputContainer>
                    <Input
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
                        name={'name'}
                        label={'Name'}
                        value={name}
                        required
                    />
                </InputContainer>
                <Button text={'Editar Fornecedor'} />
            </form>
        </>
    )
}
