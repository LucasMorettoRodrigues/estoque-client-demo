import { useState, FormEvent, ChangeEvent } from "react"
import { useNavigate } from "react-router-dom"
import styled from "styled-components"
import { useAppDispatch } from "../../app/hooks"
import Button from "../../components/Button"
import Form from "../../components/Form"
import Input from "../../components/Input"
import Title from "../../components/Title"
import { createProduct } from "../../features/produtos/produtoSlice"

const InputsContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
`
const InputContainer = styled.div`
    width: 48%;
    margin-bottom: 20px;
`

export default function NovoProduto() {

    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const [name, setName] = useState('')
    const [code, setCode] = useState('')
    const [category, setCategory] = useState('')
    const [brand, setBrand] = useState('')
    const [unit, setUnit] = useState('')
    const [minStock, setMinStock] = useState(0)
    const [maxStock, setMaxStock] = useState(0)
    const [observation, setObservation] = useState('')

    const handleOnSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        dispatch(createProduct({ name, code, category, brand, unit, stock: 0, min_stock: minStock, max_stock: maxStock, observation }))
        navigate('/produtos')
    }

    return (
        <>
            <Title title='Novo Produto' />
            <Form onSubmit={handleOnSubmit}>
                <InputsContainer>
                    <InputContainer>
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
                    <InputContainer>
                        <Input
                            onChange={(e: ChangeEvent<HTMLInputElement>) => setCategory(e.target.value)}
                            name={'categoria'}
                            label={'Categoria'}
                            required
                        />
                    </InputContainer>
                    <InputContainer>
                        <Input
                            onChange={(e: ChangeEvent<HTMLInputElement>) => setBrand(e.target.value)}
                            name={'brand'}
                            label={'Marca'}
                            required
                        />
                    </InputContainer>
                    <InputContainer>
                        <Input
                            onChange={(e: ChangeEvent<HTMLInputElement>) => setUnit(e.target.value)}
                            name={'unit'}
                            label={'Unidade'}
                            required
                        />
                    </InputContainer>
                    <InputContainer>
                        <Input
                            onChange={(e: ChangeEvent<HTMLInputElement>) => setMinStock(parseInt(e.target.value))}
                            name={'minStock'}
                            label={'Estoque Mínimo'}
                            type='number'
                            min={0}
                            required
                        />
                    </InputContainer>
                    <InputContainer>
                        <Input
                            onChange={(e: ChangeEvent<HTMLInputElement>) => setMaxStock(parseInt(e.target.value))}
                            name={'maxStock'}
                            label={'Estoque Máximo'}
                            type='number'
                            min={0}
                            required
                        />
                    </InputContainer>
                    <InputContainer>
                        <Input
                            onChange={(e: ChangeEvent<HTMLInputElement>) => setObservation(e.target.value)}
                            name={'obervation'}
                            label={'Observação'}
                            type='string'
                        />
                    </InputContainer>
                </InputsContainer>
                <Button text={'Cadastrar Produto'} />
            </Form>
        </>
    )
}
