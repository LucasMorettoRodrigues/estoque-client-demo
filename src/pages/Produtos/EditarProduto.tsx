import { useState, FormEvent, ChangeEvent } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import styled from "styled-components"
import { useAppDispatch } from "../../app/hooks"
import Button from "../../components/UI/Button"
import Form from "../../components/UI/Form"
import Input from "../../components/UI/Input"
import Title from "../../components/UI/Title"
import { editProduct } from "../../features/produtos/produtoSlice"
import { TProduct } from "../../types/TProduct"
import Historico from "../Historico"

const InputContainer = styled.div`
    width: 48%;
    margin-bottom: 20px;
`
const ButtonContainer = styled.div`
    display: flex;
    width: 100%;
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
    const [minStock, setMinStock] = useState(`${product.min_stock}`)
    const [maxStock, setMaxStock] = useState(`${product.max_stock}`)
    const [observation, setObservation] = useState(product.observation)

    const handleOnSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        dispatch(editProduct({ id: product.id, name, code, category, brand, unit, stock: product.stock, min_stock: parseInt(minStock), max_stock: parseInt(maxStock), observation }))
        navigate('/produtos/detalhes')
    }

    return (
        <>
            <Title title='Editar Produto' />
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
                <InputContainer>
                    <Input
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setCode(e.target.value)}
                        name={'codigo'}
                        label={'Código'}
                        value={code}
                        required
                    />
                </InputContainer>
                <InputContainer>
                    <Input
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setCategory(e.target.value)}
                        name={'categoria'}
                        label={'Categoria'}
                        value={category}
                        required
                    />
                </InputContainer>
                <InputContainer>
                    <Input
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setBrand(e.target.value)}
                        name={'brand'}
                        label={'Marca'}
                        value={brand}
                        required
                    />
                </InputContainer>
                <InputContainer>
                    <Input
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setUnit(e.target.value)}
                        name={'unit'}
                        label={'Unidade'}
                        value={unit}
                        required
                    />
                </InputContainer>
                <InputContainer>
                    <Input
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setMinStock(e.target.value)}
                        name={'minStock'}
                        label={'Estoque Mínimo'}
                        type='number'
                        value={minStock}
                        min={0}
                        required
                    />
                </InputContainer>
                <InputContainer>
                    <Input
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setMaxStock(e.target.value)}
                        name={'maxStock'}
                        label={'Estoque Máximo'}
                        type='number'
                        value={maxStock}
                        min={0}
                        required
                    />
                </InputContainer>
                <InputContainer>
                    <Input
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setObservation(e.target.value)}
                        name={'obervation'}
                        label={'Observação'}
                        value={observation ? observation : ''}
                    />
                </InputContainer>
                <ButtonContainer>
                    <Button text='Editar Produto' />
                    <Button
                        onClick={() => dispatch(editProduct({ ...product, hide: true }))}
                        text='Arquivar'
                        bg='blue'
                    />
                </ButtonContainer>
            </Form>
            <Historico productFilter={product.name} />
        </>
    )
}
