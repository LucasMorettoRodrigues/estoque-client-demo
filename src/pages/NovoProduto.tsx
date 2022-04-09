import { useState, FormEvent, ChangeEvent } from "react"
import { useNavigate } from "react-router-dom"
import styled from "styled-components"
import { useAppDispatch } from "../app/hooks"
import Button from "../components/Button"
import Input from "../components/Input"
import { createProduct } from "../features/produtos/produtoSlice"

const Title = styled.h1`
    margin-bottom: 20px;
`
const Form = styled.form`
    display: flex;
    flex-wrap: wrap;
`

export default function NovoProduto() {

    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const [name, setName] = useState('')
    const [code, setCode] = useState(0)
    const [category, setCategory] = useState('')
    const [brand, setBrand] = useState('')
    const [unit, setUnit] = useState('')
    const [stock, setStock] = useState(0)
    const [minStock, setMinStock] = useState(0)
    const [maxStock, setMaxStock] = useState(0)

    const handleOnSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        dispatch(createProduct({ name, code, category, brand, unit, stock, min_stock: minStock, max_stock: maxStock }))
        navigate('/produtos')
    }

    return (
        <>
            <Title>Novo Produto</Title>
            <Form onSubmit={handleOnSubmit}>
                <Input
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
                    name={'name'}
                    label={'Name'}
                    required
                />
                <Input
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setCode(parseInt(e.target.value))}
                    name={'codigo'}
                    label={'Código'}
                    required
                />
                <Input
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setCategory(e.target.value)}
                    name={'categoria'}
                    label={'Categoria'}
                />
                <Input
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setBrand(e.target.value)}
                    name={'brand'}
                    label={'Marca'}
                />
                <Input
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setUnit(e.target.value)}
                    name={'unit'}
                    label={'Unidade'}
                />
                <Input
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setStock(parseInt(e.target.value))}
                    name={'stock'}
                    label={'Estoque'}
                    type='number'
                    min={0}
                />
                <Input
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setMinStock(parseInt(e.target.value))}
                    name={'minStock'}
                    label={'Estoque Mínimo'}
                    type='number'
                    min={0}
                />
                <Input
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setMaxStock(parseInt(e.target.value))}
                    name={'maxStock'}
                    label={'Estoque Máximo'}
                    type='number'
                    min={0}
                />
                <Button text={'Cadastrar Produto'} />
            </Form>
        </>
    )
}
