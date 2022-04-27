import styled from "styled-components"
import { useNavigate } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../app/hooks"
import { TProduct } from "../types/TProduct"
import { FormEvent, useState } from "react"
import { AiOutlineDelete } from 'react-icons/ai'
import Button from "../components/Button"
import { TSubProduct } from "../types/TSubProduct"
import EditDeleteButton from "../components/EditDeleteButton"
import { getProduct, getSubProduct } from "../utils/functions"
import Mensagem from "../components/Mensagem"
import { createAdjustStock } from "../features/adjustStock/adjustStock"
import Input from "../components/Input"
import Select from "../components/Select"
import ListHeader from "../components/List/ListHeader"

const Title = styled.h1`
    color: #222;
    margin: 30px 0;
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
const ProductListContainer = styled.div`
    margin-bottom: 30px;
`

type body = {
    product: TProduct,
    subProduct: TSubProduct | null,
    quantity: number
}

export default function Ajustar() {

    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const products = useAppSelector(state => state.produto.produtos)

    const [quantity, setQuantity] = useState(1)
    const [subProductId, setSubProductId] = useState('')
    const [productId, setProductId] = useState(0)
    const [productList, setProductList] = useState<body[]>([])
    const [error, setError] = useState('')
    const [warning, setWarning] = useState('')

    const handleOnSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const productToAdd = getProduct(products, productId)
        const subProductToAdd = getSubProduct(products, productId, parseInt(subProductId))

        if (quantity === 0) return setError('A quantidade deve ser diferente de 0.')
        if (!subProductId) return setError('Selecione o lote.')
        if (!productToAdd) return setError('Produto não encontrado.')
        if (subProductToAdd && quantity < 0 && -quantity > subProductToAdd?.quantity) {
            return setError(`Existem apenas ${subProductToAdd.quantity} unidades do lote ${subProductToAdd.lote}.`)
        }
        if (productList.find(i => i.product.id === productToAdd?.id &&
            productList.find(i => i.subProduct?.id === subProductToAdd?.id))) {
            return setError(`O produto já foi lançado.`)
        }

        setProductList([...productList, {
            product: productToAdd,
            subProduct: subProductToAdd,
            quantity: quantity
        }])

        Array.from(document.querySelectorAll("input")).forEach(
            input => (input.value = '')
        );

        Array.from(document.querySelectorAll("select")).forEach(
            input => (input.value = '')
        );
    }

    const handleOnClick = async () => {
        for (const item of productList) {
            await dispatch(createAdjustStock({
                product_id: item.product.id!,
                quantity: item.quantity,
                subproduct_id: item.subProduct!.id
            }))
        }

        navigate('/historico')
    }

    return (
        <>
            {error && <Mensagem onClick={() => setError('')} error={error} />}
            {warning && <Mensagem onClick={() => setWarning('')} warning={warning} />}
            <Title>Ajustar Estoque</Title>
            <Form onSubmit={handleOnSubmit}>
                <InputContainer flex={5}>
                    <Input
                        name="product"
                        label="Produto"
                        required
                        onChange={(e) => setProductId(parseInt(e.target.value.split(' ')[0]))}
                        list='products'>
                    </Input>
                    <datalist id="products">
                        {
                            products.map(item => (
                                <option key={item.id}>{item.id} - {item.name} - {item.brand} - {item.unit}</option>
                            ))
                        }
                    </datalist>
                </InputContainer>
                <InputContainer flex={2}>
                    <Select
                        required
                        name="lote-validade"
                        label="Lote / Validade"
                        onChange={(e) => setSubProductId(e.target.value)}>
                        <option></option>
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
                    <Input
                        name="quantity"
                        label="Quantidade"
                        required
                        type='number'
                        onChange={(e) => setQuantity(parseInt(e.target.value))}>
                    </Input>
                </InputContainer>
                <Button style={{ padding: '12px 24px', alignSelf: 'flex-end' }} text={'Lançar'} />
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
