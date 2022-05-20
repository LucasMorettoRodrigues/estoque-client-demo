import styled from "styled-components"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { TProduct } from "../../types/TProduct"
import { FormEvent, useRef, useState } from "react"
import { AiOutlineDelete } from 'react-icons/ai'
import Button from "../../components/Button"
import { createStockOut } from "../../features/stockOut/stockOut"
import { TSubProduct } from "../../types/TSubProduct"
import EditDeleteButton from "../../components/EditDeleteButton"
import { compareDates, formatValidity, getProduct, getSubProduct } from "../../utils/functions"
import Mensagem from "../../components/Mensagem"
import Input from "../../components/Input"
import Select from "../../components/Select"
import ListHeader from "../../components/List/ListHeader"
import Item from "../../components/List/Item"
import ItemsContainer from "../../components/List/ItemsContainer"
import Form from "../../components/Form"
import Title from "../../components/Title"
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import ModalInput from "../../components/ModalInput"
import Loading from "../../components/Loading"

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

const BottomContainer = styled.div`
    display: flex;
    align-items: center;
`
const BottomInputContainer = styled.div`
    margin-right: 10px;
`

type body = {
    product: TProduct,
    subProduct: TSubProduct | null,
    quantity: number,
    notification: string
}

export default function Retirar() {

    const dispatch = useAppDispatch()
    const products = useAppSelector(state => state.produto.produtos)

    const [quantity, setQuantity] = useState(1)
    const [subProductId, setSubProductId] = useState(0)
    const [productId, setProductId] = useState(0)
    const [productList, setProductList] = useState<body[]>([])
    const [error, setError] = useState('')
    const [warning, setWarning] = useState('')
    const [message, setMessage] = useState('')
    const [password, setPassword] = useState('')
    const [user, setUser] = useState('')
    const [notification, setNotification] = useState('')
    const [loading, setLoading] = useState(false)
    const elmRef = useRef(null as HTMLElement | null);

    const handleOnSubmit = (e?: FormEvent<HTMLFormElement>) => {
        e?.preventDefault()

        const result = validateProduct()

        if (result) {
            addProductToList(result.productToAdd, result.subProductToAdd)
        } else {
            return
        }

        cleanInputs()
    }

    const validateProduct = (): any => {

        if (!productId || !subProductId) return setError('Selecione o produto.')

        const productToAdd = getProduct(products, productId)
        const subProductToAdd = getSubProduct(products, productId, subProductId)

        if (!productToAdd || !subProductToAdd) return setError('Produto não encontrado.')

        if (quantity > productToAdd.stock) return setError(`Existem ${productToAdd.stock} unidades do produto ${productToAdd.name}.`)
        if (quantity > subProductToAdd?.quantity) return setError(`Existem apenas ${subProductToAdd.quantity} unidades do lote ${subProductToAdd.lote}.`)

        let sorted = [...productToAdd.subproducts!].sort(function compare(a, b) { return compareDates(b.validade!, a.validade!) })
        // if (sorted[0].id !== subProductToAdd.id) setWarning(`O produto retirado não possui a data de validade mais próxima.`)
        if (sorted[0].id !== subProductToAdd.id && !notification) return setMessage(`O produto retirado não possui a data de validade mais próxima.`)

        return { productToAdd, subProductToAdd }
    }

    const addProductToList = (productToAdd: TProduct, subProductToAdd: TSubProduct) => {
        if (productList.find(i => i.product.id === productToAdd?.id &&
            productList.find(i => i.subProduct?.id === subProductToAdd?.id))) {
            setProductList(productList.map(item => (
                item.product.id === productToAdd.id &&
                    item.subProduct?.id === subProductToAdd?.id
                    ? { ...item, quantity: item.quantity + quantity }
                    : item
            )))
        } else {
            setProductList([...productList, {
                product: productToAdd,
                subProduct: subProductToAdd,
                quantity: quantity,
                notification: notification
            }])
            setNotification('')
        }
    }

    const cleanInputs = () => {
        Array.from(document.querySelectorAll("input")).forEach(
            input => (input.value = '')
        );

        elmRef.current!.querySelector("button")?.click();

        Array.from(document.querySelectorAll("select")).forEach(
            input => (input.value = '')
        );

        setNotification('')
        setMessage('')
    }

    const handleOnClick = async () => {

        if (!password || !user) {
            return setWarning('Assine a operação.')
        }

        setLoading(true)

        for (const item of productList) {
            try {
                await dispatch(createStockOut({
                    product_id: item.product.id!,
                    quantity: item.quantity,
                    subproduct_id: item.subProduct?.id,
                    username: user,
                    password,
                    notification: item.notification
                })).unwrap()
            } catch (error) {
                cleanAssign()
                return setError('Não foi possivel retirar os produtos.')
            }

            setLoading(false)
        }

        cleanAssign()
        setProductList([])
        setWarning('Produtos retirados com sucesso.')
    }

    const cleanAssign = () => {
        setUser('')
        setPassword('')
    }

    return (
        <>
            < Loading loading={loading} />
            {error && <Mensagem onClick={() => setError('')} error={error} />}
            {warning && <Mensagem onClick={() => setWarning('')} warning={warning} />}
            {message && <ModalInput
                onClose={() => {
                    setMessage('')
                    setNotification('')
                }}
                onConfirm={handleOnSubmit}
                onChange={(e) => setNotification(e.target.value)}
                placeholder={'Justificativa'}
                message={message}
                title='title'
            />}
            <Title title='Retirar Produtos' />
            <div>
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
                    <InputContainer flex={1}>
                        <Select
                            name='lote-validade'
                            label='Lote / Validade'
                            required
                            onChange={(e) => setSubProductId(parseInt(e.target.value))}
                        >
                            <option value={0}></option>
                            {
                                products.filter(item => item.id === productId).map(item => (
                                    item.subproducts?.map((item, index) => (
                                        <option
                                            style={{ backgroundColor: `${index === 0 && 'lightgreen'}` }}
                                            key={item.id}
                                            value={item.id}>{item.lote} / {formatValidity(item.validade)}
                                        </option>
                                    ))
                                ))
                            }
                        </Select>
                    </InputContainer>
                    <InputContainer flex={1}>
                        <Input
                            name='quantity'
                            label='Quantidade'
                            type='number'
                            min={1}
                            onChange={(e) => setQuantity(parseInt(e.target.value))}
                            required
                        />
                    </InputContainer>
                    <Button style={{ padding: '12px 24px', alignSelf: 'flex-end' }} text={'Lançar'} />
                </Form>
            </div>

            {
                productList.length > 0 &&
                <>
                    <ProductListContainer>
                        <ListHeader>
                            <Item flex={1} text='Produto' />
                            <Item flex={0.4} text='Marca' />
                            <Item flex={0.2} text='Lote' />
                            <Item flex={0.25} text='Validade' />
                            <Item flex={0.1} align="center" text='Qtd' />
                            <Item width='50px' text='' align='center' />
                        </ListHeader>
                        <>
                            {
                                productList.map((item, index) => (
                                    <ItemsContainer key={index}>
                                        <Item flex={1} text={item.product.name} />
                                        <Item flex={0.4} text={item.product.brand} />
                                        <Item flex={0.2} text={item.subProduct?.lote} />
                                        <Item flex={0.25} text={formatValidity(item.subProduct?.validade)} />
                                        <Item flex={0.1} text={item.quantity} align="center" />
                                        <EditDeleteButton
                                            width='50px'
                                            onClick={() => setProductList(productList.filter((p, i) => i !== index))}
                                        >
                                            <AiOutlineDelete />
                                        </EditDeleteButton>
                                    </ItemsContainer>
                                ))
                            }
                        </>
                    </ProductListContainer>
                    <BottomContainer>
                        <BottomInputContainer>
                            <Input
                                onChange={(e) => setUser(e.target.value)}
                                type="text"
                                name="user"
                                value={user}
                                label="Usuario"
                                display="flex"
                                style={{ maxWidth: '250px' }}
                            />
                        </BottomInputContainer>
                        <BottomInputContainer>
                            <Input
                                onChange={(e) => setPassword(e.target.value)}
                                type="password"
                                name="sign"
                                value={password}
                                label="Senha"
                                display="flex"
                                style={{ maxWidth: '250px' }}
                            />
                        </BottomInputContainer>
                        <Button
                            onClick={handleOnClick}
                            text={'Finalizar Retirada'}
                            style={{ padding: '12px 24px', alignSelf: 'flex-end' }}
                        />
                    </BottomContainer>
                </>
            }
        </>
    )
}
