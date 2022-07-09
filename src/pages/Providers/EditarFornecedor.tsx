import { useState, FormEvent, ChangeEvent } from "react"
import { useAppDispatch } from "../../app/hooks"
import { useLocation, useNavigate } from "react-router-dom"
import styled from "styled-components"
import Button from "../../components/UI/Button"
import Input from "../../components/UI/Input"
import { editProvider } from "../../features/provider/providerSlice"
import Title from "../../components/UI/Title"
import Form from "../../components/UI/Form"

const InputContainer = styled.div`
    margin-bottom: 20px;
`
const ButtonContainer = styled.div`
    display: flex;
    width: 100%;
    justify-content: space-between;
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
            <Title title='Editar Fornecedor' />
            <Form onSubmit={handleOnSubmit}>
                <InputContainer>
                    <Input
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
                        name={'name'}
                        label={'Name'}
                        value={name}
                        required
                    />
                </InputContainer>
                <ButtonContainer>
                    <Button text={'Editar Fornecedor'} />
                </ButtonContainer>
            </Form>
        </>
    )
}
