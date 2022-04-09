import { useState, FormEvent, ChangeEvent } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import styled from "styled-components"
import { useAppDispatch } from "../app/hooks"
import Button from "../components/Button"
import Input from "../components/Input"
import { editProduct } from "../features/produtos/produtoSlice"
import { TProduct } from "../types/TProduct"

const Title = styled.h1`
    color: #222;
    margin: 30px 0;
`
const Form = styled.form`
    display: flex;
    flex-wrap: wrap;
`

export default function EditarProduto() {

    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const location = useLocation()
    const product = location.state as TProduct;

    const [name, setName] = useState(product.name)
    const [code, setCode] = useState(product.code)
    const [category, setCategory] = useState(product.category)
    const [brand, setBrand] = useState(product.brand)
    const [unit, setUnit] = useState(product.unit)
    const [stock, setStock] = useState(`${product.stock}`)
    const [minStock, setMinStock] = useState(`${product.min_stock}`)
    const [maxStock, setMaxStock] = useState(`${product.max_stock}`)

    const handleOnSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        dispatch(editProduct({ id: product.id, name, code, category, brand, unit, stock: parseInt(stock), min_stock: parseInt(minStock), max_stock: parseInt(maxStock) }))
        navigate('/produtos/detalhes')
    }

    return (
        <>
            <Title>Editar Produto</Title>
            <Form onSubmit={handleOnSubmit}>
                <Input
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
                    name={'name'}
                    label={'Name'}
                    value={name}
                    required
                />
                <Input
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setCode(parseInt(e.target.value))}
                    name={'codigo'}
                    label={'Código'}
                    value={code}
                    required
                />
                <Input
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setCategory(e.target.value)}
                    name={'categoria'}
                    label={'Categoria'}
                    value={category}
                    required
                />
                <Input
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setBrand(e.target.value)}
                    name={'brand'}
                    label={'Marca'}
                    value={brand}
                    required
                />
                <Input
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setUnit(e.target.value)}
                    name={'unit'}
                    label={'Unidade'}
                    value={unit}
                    required
                />
                <Input
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setStock(e.target.value)}
                    name={'stock'}
                    label={'Estoque'}
                    type='number'
                    value={stock}
                    min={0}
                    required
                />
                <Input
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setMinStock(e.target.value)}
                    name={'minStock'}
                    label={'Estoque Mínimo'}
                    type='number'
                    value={minStock}
                    min={0}
                    required
                />
                <Input
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setMaxStock(e.target.value)}
                    name={'maxStock'}
                    label={'Estoque Máximo'}
                    type='number'
                    value={maxStock}
                    min={0}
                    required
                />
                <Button text={'Editar Produto'} />
            </Form>
        </>
    )
}
