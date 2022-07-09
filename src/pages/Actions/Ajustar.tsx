import { useState } from "react"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { createAdjustStock } from "../../features/AsyncThunkFunctions"
import { getProduct, getSubProduct } from "../../utils/functions"

import { TSubProduct } from "../../types/TSubProduct"
import { TProduct } from "../../types/TProduct"
import { TMessage } from "../../types/TMessage"

import Mensagem from "../../components/UI/Mensagem"
import Title from "../../components/UI/Title"
import Loading from "../../components/UI/Loading"
import RetirarEAjustarList from "../../components/Actions/RetirarEAjustarList"
import RetirarForm from "../../components/Actions/RetirarForm"
import SignOperation from "../../components/Actions/SignOperation"

type TProductList = {
    product: TProduct,
    subProduct: TSubProduct,
    quantity: number
}

export default function Ajustar() {

    const dispatch = useAppDispatch()
    const products = useAppSelector(state => state.product.products)
    const [productList, setProductList] = useState<TProductList[]>([])
    const [message, setMessage] = useState<TMessage>(null)
    const [loading, setLoading] = useState(false)

    const handleOnSubmit = (productId: number, subProductId: number, quantity: number) => {

        if (quantity < 0) return setMessage({ title: 'Erro', message: 'Quantidade invalida.' })
        if (!subProductId || !subProductId) return setMessage({ title: 'Erro', message: 'Selecione o produto.' })

        const productToAdd = getProduct(products, productId)
        const subProductToAdd = getSubProduct(products, productId, subProductId)

        if (!productToAdd || !subProductToAdd) return setMessage({ title: 'Erro', message: 'Produto não encontrado.' })

        if (productList.find(i => i.product.id === productToAdd?.id &&
            productList.find(i => i.subProduct?.id === subProductToAdd?.id))) {
            return setMessage({ title: 'Erro', message: `O produto já foi lançado.` })
        }

        setProductList([...productList, {
            product: productToAdd,
            subProduct: subProductToAdd,
            quantity: quantity
        }])
    }

    const handleOnConclude = async (username: string, password: string) => {
        setLoading(true)

        for (const item of productList) {
            try {
                await dispatch(createAdjustStock({
                    username,
                    password,
                    product_id: item.product.id!,
                    quantity: item.quantity,
                    subproduct_id: item.subProduct!.id
                })).unwrap()
                setMessage({ title: 'Sucesso', message: `O ajuste foi realizado.` })
            } catch (error) {
                console.log(error)
                setMessage({ title: 'Erro', message: `Não foi possivel realizar o ajuste.` })
            } finally {
                setProductList([])
                setLoading(false)
            }
        }
    }

    return (
        <>
            < Loading loading={loading} />
            {message && <Mensagem onClick={() => setMessage(null)} message={message} />}
            <Title title='Ajustar Estoque' />
            <RetirarForm onSubmit={handleOnSubmit} />
            <RetirarEAjustarList
                productList={productList}
                deleteItem={(index) => setProductList(productList.filter((p, i) => i !== index))}
            />
            <SignOperation
                show={productList.length > 0}
                handleSubmit={handleOnConclude}
                buttonText='Concluir'
            />
        </>
    )
}
