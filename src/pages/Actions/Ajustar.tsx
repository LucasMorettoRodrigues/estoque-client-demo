import { useState } from "react"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { createAdjustStock } from "../../features/adjustStock/adjustStock"
import { getProduct, getSubProduct } from "../../utils/functions"

import { TSubProduct } from "../../types/TSubProduct"
import { TProduct } from "../../types/TProduct"
import { TMessage } from "../../types/TMessage"

import Mensagem from "../../components/Mensagem"
import Title from "../../components/Title"
import Loading from "../../components/Loading"
import RetirarEAjustarList from "../../components/Retirar/RetirarEAjustarList"
import RetirarForm from "../../components/Retirar/RetirarForm"

type TProductList = {
    product: TProduct,
    subProduct: TSubProduct,
    quantity: number
}

export default function Ajustar() {

    const dispatch = useAppDispatch()
    const products = useAppSelector(state => state.produto.produtos)
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
            <RetirarForm onSubmit={handleOnSubmit} />
            <RetirarEAjustarList
                productList={productList}
                deleteItem={(index) => setProductList(productList.filter((p, i) => i !== index))}
                assign={false}
                handleSubmit={handleOnClick}
            />
        </>
    )
}
