import { Autocomplete, TextField } from "@mui/material"
import { useState, FormEvent, ChangeEvent } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import styled from "styled-components"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import Button from "../../components/UI/Button"
import Form from "../../components/UI/Form"
import Input from "../../components/UI/Input"
import Select from "../../components/UI/Select"
import Title from "../../components/UI/Title"
import { editProduct } from "../../features/produtos/produtoSlice"
import { TProduct } from "../../types/TProduct"
import { getProduct } from "../../utils/functions"
import ListOperations from "../Historic/ListOperations"

const InputContainer = styled.div`
    margin-bottom: 20px;
    flex: 1;
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
    const products = useAppSelector(state => state.produto.produtos)

    const options = products.map(i => ({
        label: `${i.id} - ${i.name} - ${i.brand} - ${i.unit}`, id: i.id
    }))

    options.unshift({ label: 'Sem Aliquotagem', id: undefined })

    const [name, setName] = useState(product.name)
    const [code, setCode] = useState(product.code)
    const [category, setCategory] = useState(product.category)
    const [brand, setBrand] = useState(product.brand)
    const [unit, setUnit] = useState(product.unit)
    const [minStock, setMinStock] = useState(`${product.min_stock}`)
    const [maxStock, setMaxStock] = useState(`${product.max_stock}`)
    const [observation, setObservation] = useState(product.observation)
    const [deliveryTime, setDeliveryTime] = useState(product.delivery_time?.toString())
    const [childProductId, setChildProductId] = useState(product.product_child_id)
    const [openAutoComplete, setOpenAutoComplete] = useState(false)

    const selectedChildProduct = product.product_child_id && getProduct(products, product.product_child_id)
    console.log(selectedChildProduct)

    const handleOnSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (!inputIsValid()) {
            return
        }

        const selectedChildProductId = openAutoComplete ? childProductId : product.product_child_id

        dispatch(editProduct({ id: product.id, name, code, category, brand, unit, stock: product.stock, min_stock: parseInt(minStock), max_stock: parseInt(maxStock), delivery_time: parseInt(deliveryTime!), observation, product_child_id: selectedChildProductId }))
        navigate('/produtos/detalhes')
    }

    const inputIsValid = () => {
        if ((deliveryTime && !parseInt(deliveryTime)) || !parseInt(minStock) || !parseInt(maxStock)) {
            return false
        }
        return true
    }

    return (
        <>
            <Title title='Editar Produto' />
            <Form onSubmit={handleOnSubmit}>
                <div style={{ display: 'flex', width: '100%' }}>
                    <InputContainer style={{ marginRight: '40px' }}>
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
                </div>
                <div style={{ display: 'flex', width: '100%' }}>
                    <InputContainer style={{ marginRight: '40px' }}>
                        <Select
                            onChange={(e: ChangeEvent<HTMLSelectElement>) => setCategory(e.target.value)}
                            name={'categoria'}
                            label={'Categoria'}
                            value={category}
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
                            value={brand}
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
                            value={unit}
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
                    </div>
                </div>
                <div style={{ display: 'flex', width: '100%' }}>
                    <InputContainer style={{ marginRight: '40px' }}>
                        <Input
                            onChange={(e: ChangeEvent<HTMLInputElement>) => setObservation(e.target.value)}
                            name={'obervation'}
                            label={'Observação'}
                            value={observation ? observation : ''}
                        />
                    </InputContainer>
                    <InputContainer>
                        <Input
                            onChange={(e: ChangeEvent<HTMLInputElement>) => setDeliveryTime(e.target.value)}
                            name={'deliveryTime'}
                            label={'Previsão de entrega (semanas)'}
                            value={deliveryTime ? deliveryTime : ''}
                            type='number'
                        />
                    </InputContainer>
                </div>
                <div style={{ width: '100%' }}>
                    <InputContainer>
                        {!openAutoComplete &&
                            <div style={{ display: 'flex' }}>
                                <div style={{ width: '100%' }}>
                                    <Input disabled name="child" label='Aliquotagem' value={selectedChildProduct ? `${selectedChildProduct.name} - ${selectedChildProduct.brand} - ${selectedChildProduct.unit}` : 'Sem Aliquotagem'} />
                                </div>
                                <Button style={{ height: '39px', marginBottom: '1px', whiteSpace: 'nowrap', alignSelf: 'end' }} bg='blue' text="Editar Aliquotagem" onClick={() => setOpenAutoComplete(true)} />
                            </ div>
                        }
                        {openAutoComplete &&
                            <>
                                <p style={{ marginLeft: '2px', marginBottom: '4px', color: '#666', fontSize: '15px', fontWeight: 400 }}>Aliquotagem</p>
                                <Autocomplete
                                    disablePortal
                                    onChange={(_, newValue) => setChildProductId(newValue?.id || null)}
                                    isOptionEqualToValue={(option, value) => option.id === value.id}
                                    id="select"
                                    options={options}
                                    sx={{ backgroundColor: 'white' }}
                                    renderInput={(params) => <TextField {...params} label="Produto" size='small' />}
                                />
                            </>
                        }
                    </InputContainer>
                </div>
                <ButtonContainer>
                    <Button text='Concluir Edição' />
                    <Button
                        onClick={() => dispatch(editProduct({ ...product, hide: true }))}
                        text='Arquivar'
                        bg='blue'
                    />
                </ButtonContainer>
            </Form>
            <ListOperations productFilter={product.name} />
        </>
    )
}
