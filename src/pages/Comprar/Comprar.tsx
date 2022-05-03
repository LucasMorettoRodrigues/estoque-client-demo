import styled from "styled-components"
import { useNavigate } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { FormEvent, useState } from "react"
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

    const handleOnSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (!productId || !providerId || !price || !lote || !validade || !quantity) {
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
            <Title title='Comprar Produtos' />
            <Form onSubmit={handleOnSubmit}>
                <InputContainer flex={5}>
                    <Input
                        name="product"
                        label="Produto"
                        required
                        onChange={(e) => setProductId(parseInt(e.target.value.split(' ')[0]))}
                        list='products'
                    />
                    <datalist id="products">
                        {
                            products.map(item => (
                                <option key={item.id}>{item.id} - {item.name} - {item.brand} - {item.unit}</option>
                            ))
                        }
                    </datalist>
                </InputContainer>
                <InputContainer flex={3}>
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
                <InputContainer flex={1}>
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
                <InputContainer flex={1}>
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
                <Button style={{ padding: '12px 24px', alignSelf: 'flex-end' }} text='Lançar' />
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
                                        <Item flex={1} text={item.validade} />
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
                    <Button onClick={handleOnClick} text={'Finalizar Compra'} />
                </>
            }
        </>
    )
}
