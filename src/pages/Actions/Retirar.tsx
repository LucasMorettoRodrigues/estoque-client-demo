import styled from "styled-components"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { FormEvent, useRef, useState } from "react"
import { AiOutlineDelete } from 'react-icons/ai'
import { createStockOut } from "../../features/stockOut/stockOut"
import { compareDates, formatValidity, getProduct, getSubProduct } from "../../utils/functions"

import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import EditDeleteButton from "../../components/EditDeleteButton"
import Button from "../../components/Button"
import Mensagem from "../../components/Mensagem"
import Input from "../../components/Input"
// import Select from "../../components/Select"
import ListHeader from "../../components/List/ListHeader"
import Item from "../../components/List/Item"
import ItemsContainer from "../../components/List/ItemsContainer"
import Form from "../../components/Form"
import Title from "../../components/Title"
import ModalInput from "../../components/ModalInput"
import Loading from "../../components/Loading"

import { TProduct } from "../../types/TProduct"
import { TMessage } from "../../types/TMessage"
import { TSubProduct } from "../../types/TSubProduct"

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
// const Selecta = styled.select`
//     display: block;
//     width: 100%;
//     padding: 10px;
//     outline-color: lightblue;
//     background-color: white;
//     border: 1px solid lightgray;
//     border-radius: 5px;
//     min-width: 180px;
//     cursor: pointer;
//     -webkit-touch-callout: none; /* iOS Safari */
//     -webkit-user-select: none; /* Safari */
//     -khtml-user-select: none; /* Konqueror HTML */
//     -moz-user-select: none; /* Old versions of Firefox */
//     -ms-user-select: none; /* Internet Explorer/Edge */
//     user-select: none; 
// `
// const Label = styled.label<{ display?: string }>`
//     display: block;
//     margin-left: '4px';
//     margin-right: ${props => props.display === 'flex' ? '8px' : 0};
//     margin-bottom: 4px;
// `

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
    const [message, setMessage] = useState<TMessage>(null)
    const [messageInput, setMessageInput] = useState<TMessage>(null)
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

        if (!productId || !subProductId) return setMessage({ title: 'Erro', message: 'Selecione o produto.' })

        const productToAdd = getProduct(products, productId)
        const subProductToAdd = getSubProduct(products, productId, subProductId)

        if (!productToAdd || !subProductToAdd) return setMessage({ title: 'Erro', message: 'Produto não encontrado.' })

        // if (quantity > productToAdd.stock) return setMessage({ title: 'Erro', message: `Existem ${productToAdd.stock} unidades do produto ${productToAdd.name}.` })
        if (quantity > subProductToAdd?.quantity) return setMessage({ title: 'Erro', message: `Existem apenas ${subProductToAdd.quantity} unidades do lote ${subProductToAdd.lote}.` })

        let sorted = [...productToAdd.subproducts!].sort(function compare(a, b) { return compareDates(b.validade!, a.validade!) })
        // if (sorted[0].id !== subProductToAdd.id) setWarning(`O produto retirado não possui a data de validade mais próxima.`)
        if (sorted[0].id !== subProductToAdd.id && !notification) return setMessageInput({ title: 'Atenção', message: 'O produto retirado não possui a data de validade mais próxima. Tem certeza que deseja retirar esse item? Se sim, justifique o motivo.' })

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
        setMessageInput(null)
    }

    const handleOnClick = async () => {

        if (!password || !user) {
            return setMessage({ title: 'Erro', message: `Assine a operação` })
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
                    notification:
                        item.notification
                            ? {
                                description: 'Notificação de Validade Incorreta',
                                data: {
                                    message: item.notification,
                                    product: item.product.name,
                                    subproduct: item.subProduct?.lote,
                                    validity: item.subProduct?.validade
                                }
                            }
                            : null
                })).unwrap()
            } catch (error) {
                cleanAssign()
                setLoading(false)
                return setMessage({ title: 'Erro', message: `Não foi possível completar a retirada.` })
            }

            setLoading(false)
        }

        cleanAssign()
        setProductList([])
        setMessage({ title: 'Sucesso', message: 'Retirada de produtos enviada.' })
    }

    const cleanAssign = () => {
        setUser('')
        setPassword('')
    }

    return (
        <>
            < Loading loading={loading} />
            {message && <Mensagem onClick={() => setMessage(null)} message={message} />}
            {messageInput && <ModalInput
                onClose={() => {
                    setMessageInput(null)
                    setNotification('')
                }}
                onConfirm={handleOnSubmit}
                onChange={(e) => setNotification(e.target.value)}
                placeholder={'Justificativa'}
                message={messageInput}
            />}
            <Title title='Retirar Produtos' />
            <div>
                <Form onSubmit={handleOnSubmit}>
                    <InputContainer flex={1} minWidth='80vw'>
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

                            renderInput={(params) =>
                                <TextField {...params} label="Produto" size='small' />}
                        />
                    </InputContainer>
                    <InputContainer flex={1} minWidth='60vw'>
                        <FormControl sx={{ m: 0, minWidth: 120, backgroundColor: 'white', marginTop: '20px' }} size="small">
                            <InputLabel id="select-Lote/Validade">Lote/Validade</InputLabel>
                            <Select
                                sx={{ fontSize: '14px', padding: '2px' }}
                                labelId="lote"
                                id="lote"
                                value={subProductId}
                                required
                                label="Lote/Validade"
                                onChange={(e) => typeof e.target.value === 'string'
                                    ? setSubProductId(parseInt(e.target.value))
                                    : setSubProductId(e.target.value)}
                            >
                                {
                                    products.filter(item => item.id === productId).map(item => (
                                        item.subproducts?.map((item, index) => (
                                            <MenuItem style={{ backgroundColor: `${index === 0 && 'lightgreen'}` }} key={item.id} value={item.id}>
                                                {item.lote} / {formatValidity(item.validade)}
                                            </MenuItem>
                                        ))
                                    ))
                                }
                            </Select>
                        </FormControl>
                        {/* <Label>
                            Lote / Validade
                        </Label>
                        <Selecta
                            name='lote-validade'
                            // label='Lote / Validade'
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
                        </Selecta> */}
                    </InputContainer>
                    <InputContainer flex={0.5}>
                        <Input
                            name='quantity'
                            label='Quantidade'
                            type='number'
                            min={1}
                            onChange={(e) => setQuantity(parseInt(e.target.value))}
                            required
                        />
                    </InputContainer>
                    <Button style={{ padding: '12px 24px', marginTop: '10px', marginRight: '20px' }} text={'Lançar'} />
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
