import styled from "styled-components"
import { useNavigate } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../app/hooks"
import { FormEvent, useState } from "react"
import { AiOutlineDelete } from 'react-icons/ai'
import Button from "../components/Button"
import { TStockIn } from "../types/TStockIn"
import { getProduct, getProvider } from "../utils/functions"
import { createStockIn } from "../features/stockIn/stockIn"

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
    min-width: 75px;
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
const ActionButton = styled.li`
    display: flex;
    align-items: center;
    font-size: 20px;
    min-width: 75px;
    padding: 10px;
    color: gray;
    cursor: pointer;

    &:hover {
        color: black;
    }
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
    const [providerId, setProviderId] = useState(0)
    const [quantity, setQuantity] = useState(0)
    const [validade, setValidade] = useState('')
    const [lote, setLote] = useState('')
    const [price, setPrice] = useState('')

    const handleOnSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setCart([...cart, { product_id: productId, provider_id: providerId, lote: lote, quantity: quantity, price: price, validade: validade ? validade : null }])
    }

    const handleOnClick = () => {
        cart.map(item => dispatch(createStockIn(item)))
        navigate('/produtos')
    }

    return (
        <>
            <Title>Comprar Produtos</Title>
            <Form onSubmit={handleOnSubmit}>
                <InputContainer flex={5}>
                    <Label>Produto</Label>
                    <Input required onChange={(e) => setProductId(parseInt(e.target.value.split(' ')[0]))} list='products'></Input>
                    <datalist id="products">
                        {
                            products.map(item => (
                                <option key={item.id}>{item.id} - {item.name} - {item.brand}</option>
                            ))
                        }
                    </datalist>
                </InputContainer>
                <InputContainer flex={3}>
                    <Label>Fornecedor</Label>
                    <Input required onChange={(e) => setProviderId(parseInt(e.target.value.split(' ')[0]))} list='providers'></Input>
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
                    <Input onChange={(e) => setLote(e.target.value)}></Input>
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
                            <ListHeaderItem>Remover</ListHeaderItem>
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
                                        <ActionButton
                                            onClick={() => setCart(cart.filter((p, i) => i !== index))}
                                        >
                                            <AiOutlineDelete />
                                        </ActionButton>
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
