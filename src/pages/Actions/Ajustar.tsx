import styled from "styled-components"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { TProduct } from "../../types/TProduct"
import { FormEvent, useRef, useState } from "react"
import { AiOutlineDelete } from 'react-icons/ai'
import Button from "../../components/Button"
import { TSubProduct } from "../../types/TSubProduct"
import EditDeleteButton from "../../components/EditDeleteButton"
import { getProduct, getSubProduct } from "../../utils/functions"
import Mensagem from "../../components/Mensagem"
import { createAdjustStock } from "../../features/adjustStock/adjustStock"
import Input from "../../components/Input"
import Select from "../../components/Select"
import ListHeader from "../../components/List/ListHeader"
import Item from "../../components/List/Item"
import ItemsContainer from "../../components/List/ItemsContainer"
import Form from "../../components/Form"
import Title from "../../components/Title"
import { Autocomplete, TextField } from "@mui/material"
import { formatValidity } from '../../utils/functions'
import Loading from "../../components/Loading"
import { TMessage } from "../../types/TMessage"

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

    const dispatch = useAppDispatch()
    const products = useAppSelector(state => state.produto.produtos)

    const [quantity, setQuantity] = useState(1)
    const [subProductId, setSubProductId] = useState('')
    const [productId, setProductId] = useState(0)
    const [productList, setProductList] = useState<body[]>([])
    const [message, setMessage] = useState<TMessage>(null)
    const [loading, setLoading] = useState(false)
    const elmRef = useRef(null as HTMLElement | null);


    const handleOnSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const productToAdd = getProduct(products, productId)
        const subProductToAdd = getSubProduct(products, productId, parseInt(subProductId))

        if (quantity < 0) return setMessage({ title: 'Erro', message: 'Quantidade invalida.' })
        if (!subProductId) return setMessage({ title: 'Erro', message: 'Selecione o lote.' })
        if (!productToAdd) return setMessage({ title: 'Erro', message: 'Produto não encontrado.' })
        if (productList.find(i => i.product.id === productToAdd?.id &&
            productList.find(i => i.subProduct?.id === subProductToAdd?.id))) {
            return setMessage({ title: 'Erro', message: `O produto já foi lançado.` })
        }

        setProductList([...productList, {
            product: productToAdd,
            subProduct: subProductToAdd,
            quantity: quantity
        }])

        Array.from(document.querySelectorAll("input")).forEach(
            input => (input.value = '')
        );

        elmRef.current!.querySelector("button")?.click();

        Array.from(document.querySelectorAll("select")).forEach(
            input => (input.value = '')
        );
    }

    const handleOnClick = async () => {
        setLoading(true)
        for (const item of productList) {
            await dispatch(createAdjustStock({
                product_id: item.product.id!,
                quantity: item.quantity,
                subproduct_id: item.subProduct!.id
            }))
        }

        setProductList([])
        setLoading(false)
        setMessage({ title: 'Sucesso', message: `O ajuste foi realizado.` })
    }

    return (
        <>
            < Loading loading={loading} />
            {message && <Mensagem onClick={() => setMessage(null)} message={message} />}
            <Title title='Ajustar Estoque' />
            <Form onSubmit={handleOnSubmit}>
                <InputContainer flex={5}>
                    <Autocomplete
                        ref={elmRef}
                        disablePortal
                        onChange={(event, newValue) => setProductId(newValue?.id || 0)}
                        isOptionEqualToValue={(option, value) => option.id === value.id}
                        id="select"
                        options={
                            products.map(i => ({
                                label: `${i.id} - ${i.name} - ${i.brand} - ${i.unit}`, id: i.id
                            }))
                        }
                        sx={{ backgroundColor: 'white', marginTop: '20px' }}
                        renderInput={(params) => <TextField {...params} label="Produto" size='small' />}
                    />
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
                                    <option key={item.id} value={item.id}>{item.lote} / {formatValidity(item.validade)}</option>
                                ))
                            ))
                        }
                    </Select>
                </InputContainer>
                <InputContainer flex={1}>
                    <Input
                        name="quantity"
                        label="Quantidade"
                        min={0}
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
                            <Item flex={3} text='Produto' />
                            <Item flex={1} text='Marca' />
                            <Item flex={1} text='Lote' />
                            <Item flex={1} text='Validade' />
                            <Item flex={1} text='Quantidade' />
                            <Item width='90px' text='Remover' align='center' />
                        </ListHeader>
                        <>
                            {
                                productList.map((item, index) => (
                                    <ItemsContainer key={index}>
                                        <Item flex={3} text={item.product.name} />
                                        <Item flex={1} text={item.product.brand} />
                                        <Item flex={1} text={item.subProduct?.lote} />
                                        <Item flex={1} text={formatValidity(item.subProduct?.validade)} />
                                        <Item flex={1} text={item.quantity} />
                                        <EditDeleteButton
                                            onClick={() => setProductList(productList.filter((p, i) => i !== index))}
                                        >
                                            <AiOutlineDelete />
                                        </EditDeleteButton>
                                    </ItemsContainer>
                                ))
                            }
                        </>
                    </ProductListContainer>
                    <Button onClick={handleOnClick} text={'Finalizar Ajuste'} />
                </>
            }
        </>
    )
}
