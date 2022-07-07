import { useState, FormEvent, ChangeEvent } from "react"
import { useNavigate } from "react-router-dom"
import styled from "styled-components"
import { useAppDispatch } from "../../app/hooks"
import Button from "../../components/UI/Button"
import Form from "../../components/UI/Form"
import Input from "../../components/UI/Input"
import Select from "../../components/UI/Select"
import Title from "../../components/UI/Title"
import { createProduct } from "../../features/produtos/produtoSlice"

const InputContainer = styled.div`
    margin-bottom: 20px;
    flex: 1;
`

export default function NovoProduto() {

    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const [name, setName] = useState('')
    const [code, setCode] = useState('')
    const [category, setCategory] = useState('')
    const [brand, setBrand] = useState('')
    const [unit, setUnit] = useState('')
    const [minStock, setMinStock] = useState('')
    const [maxStock, setMaxStock] = useState('')
    const [deliveryTime, setDeliveryTime] = useState('')
    const [observation, setObservation] = useState('')

    const handleOnSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (!inputIsValid()) {
            return
        }

        dispatch(createProduct({ name, code, category, brand, unit, stock: 0, min_stock: parseInt(minStock), max_stock: parseInt(maxStock), delivery_time: parseInt(deliveryTime), observation }))
        navigate('/produtos')
    }

    const inputIsValid = () => {
        if ((deliveryTime && !parseInt(deliveryTime)) || !parseInt(minStock) || !parseInt(maxStock)) {
            return false
        }
        return true
    }

    return (
        <>
            <Title title='Novo Produto' />
            <Form onSubmit={handleOnSubmit}>
                <div style={{ display: 'flex', width: '100%' }}>
                    <InputContainer style={{ marginRight: '40px' }}>
                        <Input
                            onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
                            name={'name'}
                            label={'Name'}
                            required
                        />
                    </InputContainer>
                    <InputContainer>
                        <Input
                            onChange={(e: ChangeEvent<HTMLInputElement>) => setCode(e.target.value)}
                            name={'codigo'}
                            label={'Código'}
                            required
                        />
                    </InputContainer>
                </div>
                <div style={{ display: 'flex', width: '100%' }}>
                    <InputContainer style={{ marginRight: '40px' }}>
                        <Select
                            onChange={(e: ChangeEvent<HTMLSelectElement>) => setCategory(e.target.value)}
                            name={'categoria'}
                            label={'Categoria'}
                            required
                        >
                            <option></option>
                            <option>Reagentes</option>
                            <option>Descartáveis</option>
                            <option>Kits</option>
                        </Select>
                    </InputContainer>
                    <InputContainer>
                        <Input
                            onChange={(e: ChangeEvent<HTMLInputElement>) => setBrand(e.target.value)}
                            name={'brand'}
                            label={'Marca'}
                            required
                        />
                    </InputContainer>
                </div>
                <div style={{ display: 'flex', width: '100%' }}>
                    <InputContainer style={{ marginRight: '40px' }}>
                        <Input
                            onChange={(e: ChangeEvent<HTMLInputElement>) => setUnit(e.target.value)}
                            name={'unit'}
                            label={'Unidade'}
                            required
                        />
                    </InputContainer>
                    <div style={{ display: 'flex', flex: 1 }}>
                        <InputContainer style={{ marginRight: '40px' }}>
                            <Input
                                onChange={(e: ChangeEvent<HTMLInputElement>) => setMinStock(e.target.value)}
                                name={'minStock'}
                                label={'Estoque Mínimo'}
                                type='number'
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
                                min={0}
                                required
                            />
                        </InputContainer>
                    </div>
                </div>
                <div style={{ display: 'flex', width: '100%' }}>
                    <InputContainer style={{ marginRight: '40px' }}>
                        <Input
                            onChange={(e: ChangeEvent<HTMLInputElement>) => setObservation(e.target.value)}
                            name={'obervation'}
                            label={'Observação'}
                            type='string'
                        />
                    </InputContainer>
                    <InputContainer>
                        <Input
                            onChange={(e: ChangeEvent<HTMLInputElement>) => setDeliveryTime(e.target.value)}
                            name={'deliveryTime'}
                            label={'Previsão de entrega (semanas)'}
                            type='number'
                        />
                    </InputContainer>
                </div>
                <Button text={'Cadastrar Produto'} />
            </Form>
        </>
    )
}
