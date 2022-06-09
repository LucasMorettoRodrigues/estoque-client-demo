import { useState } from "react"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { createStockOut } from "../../features/stockOut/stockOut"
import { compareDates, getProduct, getSubProduct } from "../../utils/functions"

import { TProduct } from "../../types/TProduct"
import { TMessage } from "../../types/TMessage"
import { TSubProduct } from "../../types/TSubProduct"

import Mensagem from "../../components/Mensagem"
import Title from "../../components/Title"
import ModalInput from "../../components/ModalInput"
import Loading from "../../components/Loading"
import RetirarEAjustarList from "../../components/Retirar/RetirarEAjustarList"
import SignOperation from "../../components/SignOperation"
import RetirarForm from "../../components/Retirar/RetirarForm"

type TProductList = {
    product: TProduct,
    subProduct: TSubProduct,
    quantity: number,
    notification: string
}

export default function Retirar() {

    const dispatch = useAppDispatch()
    const products = useAppSelector(state => state.produto.produtos)

    const [memoQuantity, setMemoQuantity] = useState(1)
    const [memoSubProductId, setMemoSubProductId] = useState(0)
    const [memoProductId, setMemoProductId] = useState(0)
    const [productList, setProductList] = useState<TProductList[]>([])
    const [message, setMessage] = useState<TMessage>(null)
    const [messageInput, setMessageInput] = useState<TMessage>(null)
    const [notification, setNotification] = useState('')
    const [loading, setLoading] = useState(false)

    const handleOnSubmit = (productId: number, subProductId: number, quantity: number) => {

        const result = validateProduct(productId, subProductId, quantity)

        if (result) {
            addProductToList(result.productToAdd, result.subProductToAdd, quantity)
        } else {
            return
        }

        cleanInputs()
    }

    const validateProduct = (productId: number, subProductId: number, quantity: number) => {

        if (!productId || !subProductId) return setMessage({ title: 'Erro', message: 'Selecione o produto.' })

        const productToAdd = getProduct(products, productId)
        const subProductToAdd = getSubProduct(products, productId, subProductId)

        if (!productToAdd || !subProductToAdd) return setMessage({ title: 'Erro', message: 'Produto não encontrado.' })
        if (quantity > subProductToAdd.quantity) return setMessage({ title: 'Erro', message: `Existem apenas ${subProductToAdd.quantity} unidades do lote ${subProductToAdd.lote}.` })

        let sorted = [...productToAdd.subproducts!].sort(function compare(a, b) { return compareDates(b.validade!, a.validade!) })
        if (sorted[0].id !== subProductToAdd.id && !notification) {
            setMemoProductId(productId)
            setMemoSubProductId(subProductId)
            setMemoQuantity(quantity)

            return setMessageInput({
                title: 'Atenção',
                message: 'O produto retirado não possui a data de validade mais próxima. Tem certeza que deseja retirar esse item? Se sim, justifique o motivo.'
            })
        }

        return { productToAdd, subProductToAdd }
    }

    const addProductToList = (productToAdd: TProduct, subProductToAdd: TSubProduct, quantity: number) => {
        if (productList.find(i =>
            i.product.id === productToAdd?.id &&
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
        }
        console.log(productList)
    }

    const cleanInputs = () => {
        setMessageInput(null)
        notification && setNotification('')
    }

    const sendRequest = async (user: string, password: string) => {

        if (!user || !password) {
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
                setLoading(false)
                return setMessage({ title: 'Erro', message: `Não foi possível completar a retirada.` })
            }

            setLoading(false)
        }

        setProductList([])
        setMessage({ title: 'Sucesso', message: 'O(s) Produto(s) foram retirados.' })
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
                onConfirm={() => handleOnSubmit(memoProductId, memoSubProductId, memoQuantity)}
                onChange={(e) => setNotification(e.target.value)}
                placeholder={'Justificativa'}
                message={messageInput}
            />}
            <Title title='Retirar Produtos' />
            <RetirarForm onSubmit={handleOnSubmit} />
            <RetirarEAjustarList
                productList={productList}
                deleteItem={(index) => setProductList(productList.filter((p, i) => i !== index))}
                assign={true}
            />
            <SignOperation
                show={productList.length > 0}
                handleSubmit={sendRequest}
            />
        </>
    )
}
