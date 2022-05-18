import styled from "styled-components"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { FormEvent, useRef, useState } from "react"
import { AiOutlineDelete } from 'react-icons/ai'
import Button from "../../components/Button"
import { TStockIn } from "../../types/TStockIn"
import { getProduct, getProvider } from "../../utils/functions"
import { createStockIn } from "../../features/stockIn/stockIn"
import EditDeleteButton from "../../components/EditDeleteButton"
import Mensagem from "../../components/Mensagem"
import { createProvider } from "../../features/fornecedor/fornecedorSlice"
import Input from "../../components/Input"
import ListHeader from "../../components/List/ListHeader"
import Item from "../../components/List/Item"
import ItemsContainer from "../../components/List/ItemsContainer"
import Form from "../../components/Form"
import Title from "../../components/Title"
import { Autocomplete, TextField } from "@mui/material"
import { createCart, deleteCart } from "../../features/cart/cartSlice"
import { useLocation } from "react-router-dom"

const InputContainer = styled.div<{ flex: number, minWidth?: string }>`
    flex: ${props => props.flex};
    min-width: ${props => props.minWidth};
    display: flex;
    margin-right: 20px;
    flex-direction: column;
    font-size: 14px;
    margin-bottom: 10px;
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

export default function Comprar() {

    const dispatch = useAppDispatch()
    const { state }: any = useLocation()
    const products = useAppSelector(state => state.produto.produtos)
    const providers = useAppSelector(state => state.fornecedor.fornecedores)
    const auth = useAppSelector(state => state.authentication)

    const [cart, setCart] = useState<TStockIn[]>(state ? state.cart : [])
    const [productId, setProductId] = useState(0)
    const [providerId, setProviderId] = useState('')
    const [quantity, setQuantity] = useState(0)
    const [validade, setValidade] = useState<string | null>(null)
    const [lote, setLote] = useState('')
    const [price, setPrice] = useState('')
    const [error, setError] = useState('')
    const [warning, setWarning] = useState('')
    const [message, setMessage] = useState('')
    const [password, setPassword] = useState('')
    const [username, setUsername] = useState('')
    const elmRef = useRef(null as HTMLElement | null);

    const handleOnSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (!productId || !providerId || !price || !lote || !quantity) {
            return setError(`Por favor preencha todos os campo.`)
        }

        if (!getProduct(products, productId)) {
            return setError(`O produto não existe.`)
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
            let newCart = cart.slice()
            newCart[index].quantity += quantity
            setCart(newCart)
        }

        Array.from(document.querySelectorAll("input")).forEach(
            input => (input.value = '')
        );

        elmRef.current!.querySelector("button")?.click();

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

    const handleCheckout = async () => {
        try {
            await dispatch(createStockIn(cart)).unwrap()
            if (state) {
                await dispatch(deleteCart(state.id))
            }
            setMessage('Compra realizada com sucesso.')

            setCart([])

        } catch (error) {
            setError('Não foi possível realizar a compra.')
        }
    }

    const handleSendToAdmin = async () => {
        if (!password || !username) {
            return setMessage('Assine a operação.')
        }

        try {

            await dispatch(createCart({ cart, username, password })).unwrap()
            setMessage('Solicitação de compra enviada com sucesso.')
            setCart([])

        } catch (error) {
            setError('Não foi possível realizar a compra.')
        }
    }

    return (
        <>
            {error && <Mensagem onClick={() => setError('')} error={error} />}
            {message && <Mensagem onClick={() => setMessage('')} warning={message} />}
            {warning && <Mensagem onClick={handleCreateProvider} onClose={() => setWarning('')} warning={warning} />}
            <Title title='Comprar Produtos' />
            <Form onSubmit={handleOnSubmit}>
                <InputContainer flex={5} minWidth='65vw'>
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
                <InputContainer flex={3} minWidth='15vw'>
                    <Input
                        name="provider"
                        label="Fornecedor"
                        required
                        autoComplete="off"
                        onChange={(e) => setProviderId(e.target.value.split(' ')[0])}
                        list='providers'
                    />
                    <datalist id="providers">
                        {
                            providers.map(item => (
                                <option key={item.id}>{item.id}  -  {item.name}</option>
                            ))
                        }
                    </datalist>
                </InputContainer>
                <InputContainer flex={1} minWidth='150px'>
                    <Input
                        name="price"
                        label="Preço"
                        required
                        type='number'
                        step='.01'
                        min={0}
                        onChange={(e) => setPrice(e.target.value)}
                    />
                </InputContainer>
                <InputContainer flex={1} minWidth='150px'>
                    <Input
                        name="lote"
                        label="Lote"
                        required
                        onChange={(e) => setLote(e.target.value)}
                    />
                </InputContainer>
                <InputContainer flex={1}>
                    <Input
                        name="validade"
                        label="Validade"
                        onChange={(e) => setValidade(e.target.value)}
                        type='date'
                    />
                </InputContainer>
                <InputContainer flex={1}>
                    <Input
                        name="quantity"
                        label="Quantidade"
                        required
                        min={1}
                        type='number'
                        onChange={(e) => setQuantity(parseInt(e.target.value))}
                    />
                </InputContainer>
                <Button
                    style={{ padding: '12px 24px', alignSelf: 'flex-end', marginBottom: '11px' }}
                    text='Lançar' />
            </Form>
            {
                cart.length > 0 &&
                <>
                    <ProductListContainer>
                        <ListHeader>
                            <Item flex={3} text='Produto' />
                            <Item flex={1} text='Fornecedor' />
                            <Item flex={1} text='Lote' />
                            <Item flex={1} text='Validade' />
                            <Item flex={1} text='Preço' />
                            <Item flex={1} text='Quantidade' />
                            <Item width='90px' text='Remover' align='center' />
                        </ListHeader>
                        <>
                            {
                                cart.map((item, index) => (
                                    <ItemsContainer key={index}>
                                        <Item flex={3} text={getProduct(products, item.product_id)?.name} />
                                        <Item flex={1} text={getProvider(providers, item.provider_id)?.name} />
                                        <Item flex={1} text={item.lote} />
                                        <Item flex={1} text={item.validade || 'Indeterminada'} />
                                        <Item flex={1} text={item.price} />
                                        <Item flex={1} text={item.quantity} />
                                        <EditDeleteButton
                                            onClick={() => setCart(cart.filter((p, i) => i !== index))}
                                        >
                                            <AiOutlineDelete />
                                        </EditDeleteButton>
                                    </ItemsContainer>
                                ))
                            }
                        </>
                    </ProductListContainer>
                    {
                        auth.role === 'admin' &&
                        <Button onClick={handleCheckout} text={'Finalizar Compra'} />
                    }
                    {
                        auth.role !== 'admin' &&
                        <BottomContainer>
                            <BottomInputContainer>
                                <Input
                                    onChange={(e) => setUsername(e.target.value)}
                                    type="text"
                                    name="username"
                                    value={username}
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
                                onClick={handleSendToAdmin}
                                text={'Finalizar Compra'}
                                style={{ padding: '12px 24px', alignSelf: 'flex-end' }}
                            />
                        </BottomContainer>
                    }
                </>
            }

        </>
    )
}
