import { Autocomplete, TextField } from "@mui/material"
import { useState, FormEvent, ChangeEvent } from "react"
import { useNavigate } from "react-router-dom"
import styled from "styled-components"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import Button from "../../components/UI/Button"
import Form from "../../components/UI/Form"
import Input from "../../components/UI/Input"
import Select from "../../components/UI/Select"
import Title from "../../components/UI/Title"
import { createProduct } from "../../features/product/productSlice"

const InputContainer = styled.div`
    margin-bottom: 20px;
    flex: 1;
`

export default function NovoProduto() {

    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const products = useAppSelector(state => state.product.products)

    const [name, setName] = useState('')
    const [code, setCode] = useState('')
    const [category, setCategory] = useState('')
    const [brand, setBrand] = useState('')
    const [unit, setUnit] = useState('')
    const [minStock, setMinStock] = useState('')
    const [maxStock, setMaxStock] = useState('')
    const [deliveryTime, setDeliveryTime] = useState('')
    const [observation, setObservation] = useState('')
    const [childProductId, setChildProductId] = useState<number | null>(null)
    const [qtyToChild, setQtyToChild] = useState('')

    const handleOnSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (!inputIsValid()) {
            return
        }

        dispatch(createProduct({ name, code, category, brand, unit, stock: 0, min_stock: parseInt(minStock), max_stock: parseInt(maxStock), delivery_time: parseInt(deliveryTime), observation, product_child_id: childProductId, qty_to_child: parseInt(qtyToChild) }))
        navigate('/produtos')
    }

    const inputIsValid = () => {
        if ((deliveryTime && !parseInt(deliveryTime)) ||
            (qtyToChild && !parseInt(qtyToChild)) ||
            !parseInt(minStock) ||
            !parseInt(maxStock)) {
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
                <div style={{ display: 'flex', width: '100%' }}>
                    <InputContainer>
                        <p style={{ marginLeft: '2px', marginBottom: '4px', color: '#666', fontSize: '15px', fontWeight: 400 }}>Aliquotagem:</p>
                        <Autocomplete
                            disablePortal
                            onChange={(_, newValue) => setChildProductId(newValue?.id || null)}
                            isOptionEqualToValue={(option, value) => option.id === value.id}
                            id="select"
                            options={
                                products.map(i => ({
                                    label: `${i.id} - ${i.name} - ${i.brand} - ${i.unit}`, id: i.id
                                }))
                            }
                            sx={{ backgroundColor: 'white' }}
                            renderInput={(params) => <TextField {...params} label="Produto" size='small' />}
                        />
                    </InputContainer>
                    <InputContainer
                        style={{ marginLeft: '40px', minWidth: '240px', flex: 0 }}
                    >
                        <Input
                            onChange={(e: ChangeEvent<HTMLInputElement>) => setQtyToChild(e.target.value)}
                            name={'qtyToChild'}
                            label={'Qtd. de aliq. mín. para estoque'}
                            type='number'
                        />
                    </InputContainer>
                </div>
                <Button text={'Cadastrar Produto'} />
            </Form>
        </>
    )
}
