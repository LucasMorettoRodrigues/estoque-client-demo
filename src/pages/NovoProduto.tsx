import { useState, FormEvent, ChangeEvent } from "react"
import { useNavigate } from "react-router-dom"
import styled from "styled-components"
import { useAppDispatch } from "../app/hooks"
import Button from "../components/Button"
import Input from "../components/Input"
import { createProduct } from "../features/produtos/produtoSlice"

const Title = styled.h1`
    color: #222;
    margin: 30px 0;
`
const Form = styled.form``

const InputsContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
`

export default function NovoProduto() {

    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const [name, setName] = useState('')
    const [code, setCode] = useState('')
    const [category, setCategory] = useState('')
    const [brand, setBrand] = useState('')
    const [unit, setUnit] = useState('')
    const [stock, setStock] = useState(0)
    const [minStock, setMinStock] = useState(0)
    const [maxStock, setMaxStock] = useState(0)
    const [observation, setObservation] = useState('')

    const handleOnSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        dispatch(createProduct({ name, code, category, brand, unit, stock, min_stock: minStock, max_stock: maxStock, observation }))
        navigate('/produtos')
    }

    return (
        <>
            <Title>Novo Produto</Title>
            <Form onSubmit={handleOnSubmit}>
                <InputsContainer>
                    <Input
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
                        name={'name'}
                        label={'Name'}
                        required
                    />
                    <Input
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setCode(e.target.value)}
                        name={'codigo'}
                        label={'Código'}
                        required
                    />
                    <Input
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setCategory(e.target.value)}
                        name={'categoria'}
                        label={'Categoria'}
                        required
                    />
                    <Input
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setBrand(e.target.value)}
                        name={'brand'}
                        label={'Marca'}
                        required
                    />
                    <Input
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setUnit(e.target.value)}
                        name={'unit'}
                        label={'Unidade'}
                        required
                    />
                    <Input
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setStock(parseInt(e.target.value))}
                        name={'stock'}
                        label={'Estoque'}
                        type='number'
                        min={0}
                        required
                    />
                    <Input
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setMinStock(parseInt(e.target.value))}
                        name={'minStock'}
                        label={'Estoque Mínimo'}
                        type='number'
                        min={0}
                        required
                    />
                    <Input
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setMaxStock(parseInt(e.target.value))}
                        name={'maxStock'}
                        label={'Estoque Máximo'}
                        type='number'
                        min={0}
                        required
                    />
                    <Input
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setObservation(e.target.value)}
                        name={'obervation'}
                        label={'Observação'}
                        type='string'
                    />
                </InputsContainer>
                <Button text={'Cadastrar Produto'} />
            </Form>
        </>
    )
}
