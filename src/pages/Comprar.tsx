import styled from "styled-components"
import { useNavigate } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../app/hooks"
import { FormEvent, useState } from "react"
import { AiOutlineDelete } from 'react-icons/ai'
import Button from "../components/Button"
import { TStockIn } from "../types/TStockIn"
import { getProduct, getProvider } from "../utils/functions"
import { createStockIn } from "../features/stockIn/stockIn"
import EditDeleteButton from "../components/EditDeleteButton"
import Mensagem from "../components/Mensagem"
import { createProvider } from "../features/fornecedor/fornecedorSlice"

const Title = styled.h1`
    color: #222;
    margin: 30px 0;
`
const ListHeader = styled.div`
    background-color: #5fb4ff;
    height: 45px;
    display: flex;
    align-items: center;
    border-bottom: 1px solid lightgray;
    font-size: 15px;
    font-weight: bold;
    border-bottom: 1px solid #cacaca;
`
const ListHeaderItem = styled.p<{ flex?: number }>`
    flex: ${props => props.flex ? props.flex : null};
    min-width: 90px;
    padding: 10px;
`
const Product = styled.ul`
    height: 40px;
    background-color: #cbe6ff;
    display: flex;
    align-items: center;
    border-bottom: 1px solid #cacaca;
`
const ProductLi = styled.li<{ flex?: number, color?: string }>`
    flex: ${props => props.flex ? props.flex : null};
    background-color: ${props => props.color ? props.color : null};
    font-size: 14px;
    min-width: 75px;
    padding: 10px;
`
const Form = styled.form`
    display: flex;
    align-items: center;
    margin-bottom: 20px;
`
const InputContainer = styled.div<{ flex: number }>`
    flex: ${props => props.flex};
    display: flex;
    margin-right: 20px;
    flex-direction: column;
    font-size: 14px;
`
const Label = styled.label`
    margin-left: 4px;
    margin-bottom: 4px;
`
const Input = styled.input`
    padding: 10px;
    width: 100%;
    outline-color: lightblue;
    background-color: white;
    border: 1px solid lightgray;
    border-radius: 5px;
    margin-bottom: 20px;
`
const FormButton = styled.button`
    background-color: #3dc73d;
    color: white;
    border: none;
    padding: 11px 25px;
    border-radius: 5px;
    cursor: pointer;
    font-weight: 600;
    margin-bottom: 4px;
`
const ProductListContainer = styled.div`
    margin-bottom: 30px;
`

export default function Comprar() {

    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const products = useAppSelector(state => state.produto.produtos)
    const providers = useAppSelector(state => state.fornecedor.fornecedores)

    const [cart, setCart] = useState<TStockIn[]>([])
    const [productId, setProductId] = useState(0)
    const [providerId, setProviderId] = useState('')
    const [quantity, setQuantity] = useState(0)
    const [validade, setValidade] = useState<string | null>(null)
    const [lote, setLote] = useState('')
    const [price, setPrice] = useState('')
    const [error, setError] = useState('')
    const [warning, setWarning] = useState('')
    const [message, setMessage] = useState('')

    const handleOnSubmit = (e?: FormEvent<HTMLFormElement>) => {
        e && e.preventDefault()

        if ((validade && !lote) || (!validade && lote)) {
            return setError(`Campo validade ou lote faltando.`)
        }

        if (!findOrCreateProvider(providerId)) return

        const index = cart.findIndex(i => ((i.product_id === productId) && (i.lote === lote) && (i.provider_id === parseInt(providerId))))

        if (index < 0) {
            setCart([...cart, {
                product_id: productId,
                provider_id: parseInt(providerId),
                price: price,
                lote: lote,
                validade: validade,
                quantity: quantity
            }])
        } else {
            return setError('Produto ja lançado.')
        }

        Array.from(document.querySelectorAll("input")).forEach(
            input => (input.value = '')
        );

        clearFields()
    }

    const clearFields = () => {
        setProductId(0)
        setProviderId('')
        setQuantity(0)
        setValidade(null)
        setLote('')
        setPrice('')
        setError('')
    }

    const findOrCreateProvider = (provider: string) => {
        const res = providers.find(i => i.id === parseInt(provider))

        if (!res) {
            setWarning(`Fornecedor ${provider} não cadastrado. Deseja cadastra-lo?`)
            return false
        }

        return true
    }

    const handleCreateProvider = () => {
        dispatch(createProvider({ name: providerId }))
            .unwrap()
            .then((res) => {
                setProviderId(res.id)
            })
            .then(() => setWarning(''))
            .then(() => setMessage(`Fornecedor cadastrado com sucesso`))
    }

    const handleOnClick = () => {
        dispatch(createStockIn(cart))
        navigate('/produtos')
    }

    return (
        <>
            {error && <Mensagem onClick={() => setError('')} error={error} />}
            {message && <Mensagem onClick={() => setMessage('')} warning={message} />}
            {warning && <Mensagem onClick={handleCreateProvider} onClose={() => setWarning('')} warning={warning} />}
            <Title>Comprar Produtos</Title>
            <Form onSubmit={handleOnSubmit}>
                <InputContainer flex={5}>
                    <Label>Produto</Label>
                    <Input required onChange={(e) => setProductId(parseInt(e.target.value.split(' ')[0]))} list='products'></Input>
                    <datalist id="products">
                        {
                            products.map(item => (
                                <option key={item.id}>{item.id} - {item.name} - {item.brand} - {item.unit}</option>
                            ))
                        }
                    </datalist>
                </InputContainer>
                <InputContainer flex={3}>
                    <Label>Fornecedor</Label>
                    <Input required autoComplete="off" id="provider" onChange={(e) => setProviderId(e.target.value.split(' ')[0])} list='providers'></Input>
                    <datalist id="providers">
                        {
                            providers.map(item => (
                                <option key={item.id}>{item.id}  -  {item.name}</option>
                            ))
                        }
                    </datalist>
                </InputContainer>
                <InputContainer flex={1}>
                    <Label>Preço</Label>
                    <Input required type='number' step='.01' min={0} onChange={(e) => setPrice(e.target.value)}></Input>
                </InputContainer>
                <InputContainer flex={1}>
                    <Label>Lote</Label>
                    <Input required onChange={(e) => setLote(e.target.value)}></Input>
                </InputContainer>
                <InputContainer flex={1}>
                    <Label>Validade</Label>
                    <Input onChange={(e) => setValidade(e.target.value)} type='date'></Input>
                </InputContainer>
                <InputContainer flex={1}>
                    <Label>Quantidade</Label>
                    <Input required min={1} type='number' onChange={(e) => setQuantity(parseInt(e.target.value))}></Input>
                </InputContainer>
                <FormButton>Lançar</FormButton>
            </Form>
            {
                cart.length > 0 &&
                <>
                    <ProductListContainer>
                        <ListHeader>
                            <ListHeaderItem flex={3}>Produto</ListHeaderItem>
                            <ListHeaderItem flex={1}>Fornecedor</ListHeaderItem>
                            <ListHeaderItem flex={1}>Lote</ListHeaderItem>
                            <ListHeaderItem flex={1}>Validade</ListHeaderItem>
                            <ListHeaderItem flex={1}>Preço</ListHeaderItem>
                            <ListHeaderItem flex={1}>Quantidade</ListHeaderItem>
                            <ListHeaderItem style={{ textAlign: 'center' }}>Remover</ListHeaderItem>
                        </ListHeader>
                        <>
                            {
                                cart.map((item, index) => (
                                    <Product key={index}>
                                        <ProductLi flex={3}>{getProduct(products, item.product_id)?.name}</ProductLi>
                                        <ProductLi flex={1}>{getProvider(providers, item.provider_id)?.name}</ProductLi>
                                        <ProductLi flex={1}>{item.lote}</ProductLi>
                                        <ProductLi flex={1}>{item.validade}</ProductLi>
                                        <ProductLi flex={1}>{item.price}</ProductLi>
                                        <ProductLi flex={1}>{item.quantity}</ProductLi>
                                        <EditDeleteButton
                                            onClick={() => setCart(cart.filter((p, i) => i !== index))}
                                        >
                                            <AiOutlineDelete />
                                        </EditDeleteButton>
                                    </Product>
                                ))
                            }
                        </>
                    </ProductListContainer>
                    <Button onClick={handleOnClick} text={'Finalizar Compra'} />
                </>
            }
        </>
    )
}
