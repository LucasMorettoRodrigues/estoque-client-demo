import styled from "styled-components"
import { useNavigate } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../app/hooks"
import { TProduct } from "../types/TProduct"
import { FormEvent, useState } from "react"
import { AiOutlineDelete } from 'react-icons/ai'
import Button from "../components/Button"
import { createStockOut } from "../features/stockOut/stockOut"
import { TSubProduct } from "../types/TSubProduct"
import EditDeleteButton from "../components/EditDeleteButton"
import { getProduct, getSubProduct } from "../utils/functions"
import MensagemErro from "../components/MensagemErro"

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
const Select = styled.select`
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

type body = {
    product: TProduct,
    subProduct: TSubProduct | null,
    quantity: number
}

export default function Retirar() {

    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const products = useAppSelector(state => state.produto.produtos)

    const [quantity, setQuantity] = useState(1)
    const [subProductId, setSubProductId] = useState(0)
    const [productId, setProductId] = useState(0)
    const [productList, setProductList] = useState<body[]>([])
    const [errors, setErrors] = useState<string[]>([])

    const handleOnSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const productToAdd = getProduct(products, productId)
        const subProductToAdd = getSubProduct(products, productId, subProductId)

        if (!productToAdd) return setErrors([...errors, 'Produto não encontrado.'])
        if (quantity > productToAdd.stock) return setErrors([...errors, `Existem apenas ${productToAdd.stock} unidades do produto ${productToAdd.name}.`])
        if (subProductToAdd && quantity > subProductToAdd?.quantity) return setErrors([...errors, `Existem apenas ${subProductToAdd.quantity} unidades do lote ${subProductToAdd.lote}.`])
        if (productList.find(i => i.product.id === productToAdd?.id &&
            productList.find(i => i.subProduct?.id === subProductToAdd?.id))) {
            return setErrors([...errors, 'Produto ja foi lançado.'])
        }

        setProductList([...productList, {
            product: productToAdd,
            subProduct: subProductToAdd,
            quantity: quantity
        }])
        cleanFields()
    }

    const cleanFields = () => {
        setQuantity(1)
        setSubProductId(0)
    }

    const handleOnClick = () => {
        productList.map((item) => (
            dispatch(createStockOut({
                product_id: item.product.id!,
                quantity: item.quantity,
                subproduct_id: item.subProduct ? item.subProduct.id : null
            }))
        ))
        navigate('/historico')
    }

    if (errors.length > 0) {
        return (
            <MensagemErro onClick={() => setErrors([])} errors={errors} />
        )
    }

    return (
        <>
            <Title>Retirar Produtos</Title>
            <Form onSubmit={handleOnSubmit}>
                <InputContainer flex={5}>
                    <Label>Produto</Label>
                    <Input
                        required
                        onChange={(e) => setProductId(parseInt(e.target.value.split(' ')[0]))}
                        list='products'>
                    </Input>
                    <datalist id="products">
                        {
                            products.map(item => (
                                <option key={item.id}>{item.id} - {item.name} - {item.brand}</option>
                            ))
                        }
                    </datalist>
                </InputContainer>
                <InputContainer flex={2}>
                    <Label>Lote / Validade</Label>
                    <Select onChange={(e) => setSubProductId(parseInt(e.target.value))}>
                        <option value={0}></option>
                        {
                            products.filter(item => item.id === productId).map(item => (
                                item.subproducts?.map((item) => (
                                    <option key={item.id} value={item.id}>{item.lote} / {item.validade.slice(0, 10)}</option>
                                ))
                            ))
                        }
                    </Select>
                </InputContainer>
                <InputContainer flex={1}>
                    <Label>Quantidade</Label>
                    <Input
                        required
                        min={1}
                        type='number'
                        onChange={(e) => setQuantity(parseInt(e.target.value))}>
                    </Input>
                </InputContainer>
                <FormButton>Lançar</FormButton>
            </Form>
            {
                productList.length > 0 &&
                <>
                    <ProductListContainer>
                        <ListHeader>
                            <ListHeaderItem flex={3}>Produto</ListHeaderItem>
                            <ListHeaderItem flex={1}>Marca</ListHeaderItem>
                            <ListHeaderItem flex={1}>Lote</ListHeaderItem>
                            <ListHeaderItem flex={1}>Validade</ListHeaderItem>
                            <ListHeaderItem flex={1}>Quantidade</ListHeaderItem>
                            <ListHeaderItem style={{ textAlign: 'center' }}>Remover</ListHeaderItem>
                        </ListHeader>
                        <>
                            {
                                productList.map((item, index) => (
                                    <Product key={index}>
                                        <ProductLi flex={3}>{item.product.name}</ProductLi>
                                        <ProductLi flex={1}>{item.product.brand}</ProductLi>
                                        <ProductLi flex={1}>{item.subProduct?.lote}</ProductLi>
                                        <ProductLi flex={1}>{item.subProduct?.validade.slice(0, 10)}</ProductLi>
                                        <ProductLi flex={1}>{item.quantity}</ProductLi>
                                        <EditDeleteButton
                                            onClick={() => setProductList(productList.filter((p, i) => i !== index))}
                                        >
                                            <AiOutlineDelete />
                                        </EditDeleteButton>
                                    </Product>
                                ))
                            }
                        </>
                    </ProductListContainer>
                    <Button onClick={handleOnClick} text={'Finalizar Retirada'} />
                </>
            }
        </>
    )
}
