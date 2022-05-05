import { useState, FormEvent, ChangeEvent } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import styled from "styled-components"
import { useAppDispatch } from "../app/hooks"
import Button from "../components/Button"
import Form from "../components/Form"
import Input from "../components/Input"
import Title from "../components/Title"
import { editSubProduct } from "../features/produtos/produtoSlice"
import { TSubProduct } from "../types/TSubProduct"

const InputContainer = styled.div`
    width: 48%;
    margin-bottom: 20px;
`

export default function EditarSubProduto() {

    const location = useLocation()
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const subProduct = location.state as TSubProduct;

    const [lote, setLote] = useState(subProduct.lote)
    const [validade, setValidade] = useState(subProduct.validade.slice(0, 10))

    const handleOnSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        dispatch(editSubProduct({ id: subProduct.id, lote, validade, quantity: subProduct.quantity }))
        navigate('/produtos/detalhes')
    }

    return (
        <>
            <Title title='Editar SubProduto' />
            <Form onSubmit={handleOnSubmit}>
                <InputContainer>
                    <Input
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setLote(e.target.value)}
                        name={'lote'}
                        label={'Lote'}
                        value={lote}
                        required
                    />
                </InputContainer>
                <InputContainer>
                    <Input
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setValidade(e.target.value)}
                        name={'validade'}
                        label={'Validade'}
                        type='date'
                        value={validade}
                        required
                    />
                </InputContainer>
                <Button text='Editar Produto' />
            </Form>
        </>
    )
}
