import { useState, FormEvent, ChangeEvent } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import styled from "styled-components"
import { useAppDispatch } from "../app/hooks"
import Button from "../components/Button"
import Input from "../components/Input"
import { deleteProductById, editProduct } from "../features/produtos/produtoSlice"
import { TProduct } from "../types/TProduct"
import Historico from "./Historico"

const Title = styled.h1`
    color: #222;
    margin: 30px 0;
`
const Form = styled.form`
    display: flex;
    flex-wrap: wrap;
`
const ButtonContainer = styled.div`
    display: flex;
    width: 93%;
    justify-content: space-between;
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
    const [observation, setObservation] = useState(product.observation)

    const handleOnSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        dispatch(editProduct({ id: product.id, name, code, category, brand, unit, stock: parseInt(stock), min_stock: parseInt(minStock), max_stock: parseInt(maxStock), observation }))
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
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setCode(e.target.value)}
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
                <Input
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setObservation(e.target.value)}
                    name={'obervation'}
                    label={'Observação'}
                    value={observation ? observation : ''}
                />
                <ButtonContainer>
                    <Button text='Editar Produto' />
                    <div>
                        <Button
                            onClick={() => dispatch(editProduct({ ...product, hide: true }))}
                            text='Arquivar'
                            bg='blue'
                        />
                        <Button
                            onClick={() => dispatch(deleteProductById(product.id!))}
                            text='Deletar'
                            bg='red'
                        />
                    </div>
                </ButtonContainer>
            </Form>
            <Historico productFilter={product.name} />
        </>
    )
}
