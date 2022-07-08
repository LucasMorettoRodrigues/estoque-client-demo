import { ChangeEvent, useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { getProduct } from "../../utils/functions"
import { ImArrowRight, ImArrowLeft } from 'react-icons/im'

import { TProduct } from "../../types/TProduct"
import { TMessage } from "../../types/TMessage"

import Mensagem from "../../components/UI/Mensagem"
import Title from "../../components/UI/Title"
import Loading from "../../components/UI/Loading"
import SignOperation from "../../components/Actions/SignOperation"
import { Navigate, useNavigate, useParams } from "react-router-dom"
import styled from "styled-components"
import Card from "./Card"
import { margin } from "@mui/system"
import { set } from "immer/dist/internal"

const IconContainer = styled.div<{ completed: boolean }>`
    cursor: pointer;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    opacity: ${props => props.completed ? 0.2 : 0.8};
    pointer-events: ${props => props.completed ? 'none' : 'all'};;

    &:hover {
        opacity: 1;
    }
`

interface TSelectedProduct extends TProduct {
    subProduct: {
        id: number,
        product_id: number,
        lote: string,
        validade: string,
        quantity: number
    }
}

export default function Aliquoting() {

    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const [message, setMessage] = useState<TMessage>(null)
    const [loading, setLoading] = useState(true)
    const [originProduct, setOriginProduct] = useState<any>()
    const [destinyProduct, setDestinyProduct] = useState<any>()
    const [completed, setCompleted] = useState(false)


    const { productId, subProductId } = useParams()
    const products = useAppSelector(state => state.produto.produtos)

    useEffect(() => {

        let selectedProduct: any = products
            .filter(pro => pro.id === parseInt(productId!))
            .map(pro => (
                {
                    ...pro,
                    subProduct: pro.subproducts!.find(sub => sub.id === parseInt(subProductId!))
                }
            ))[0]

        let productToCreate: any = getProduct(products, selectedProduct.product_child_id!)!
        productToCreate = { ...productToCreate, subProduct: { ...selectedProduct.subProduct, quantity: 0 } }

        setOriginProduct(selectedProduct)
        setDestinyProduct(productToCreate)

        setLoading(false)
    }, [])

    const handleAddAliquot = () => {
        setOriginProduct({ ...originProduct, subProduct: { ...originProduct.subProduct, quantity: originProduct.subProduct.quantity - 1 } })
        setDestinyProduct({ ...destinyProduct, subProduct: { ...destinyProduct.subProduct, quantity: originProduct.qty_to_child } })
        setCompleted(true)
    }

    const handleOnConclude = async (username: string, password: string) => {
        setLoading(true)

        if (!completed) {
            setMessage({ title: 'Erro', message: 'Realize a aliquotagem para continuar.' })
            return setLoading(false)
        }

        try {
            // dispatch(createAliquot({
            //     originSubProductId: originProduct.subProduct.id,
            //     destinySubProductId: destinyProduct.subProduct.id
            // })).unwrap()
            setMessage({ title: 'Sucesso', message: 'A ação foi concluida.' })
        } catch (error) {
            setMessage({ title: 'Erro', message: 'Não foi possivel concluir a ação.' })
        } finally {
            setLoading(false)
        }
    }

    const handleMessageClick = () => {
        if (message!.title === 'Sucesso') {
            navigate('/inserir')
        } else {
            setMessage(null)
        }
    }

    if (loading) {
        return < Loading loading={loading} />
    }

    return (
        <>

            {message && <Mensagem onClick={handleMessageClick} message={message} />}
            <Title title='Realizar Aliquotagem' />

            <div style={{ display: 'flex', justifyContent: 'space-evenly', alignItems: 'center' }}>
                {originProduct &&
                    <Card
                        title='Origem'
                        name={originProduct.name}
                        brand={originProduct.brand}
                        obs={originProduct.observation ? originProduct.observation : ''}
                        lote={originProduct.subProduct!.lote!}
                        validade={originProduct.subProduct!.validade!}
                        quantity={originProduct.subProduct!.quantity!}
                        unit={originProduct.unit}
                    />
                }
                <IconContainer
                    onClick={handleAddAliquot}
                    completed={completed}
                >
                    <p style={{ marginBottom: '10px' }}>Clique para aliquotar</p>
                    <ImArrowRight
                        size={80}
                        color='green'
                    />
                </IconContainer>
                {destinyProduct &&
                    <Card
                        title='Destino'
                        name={destinyProduct.name}
                        brand={destinyProduct.brand}
                        obs={destinyProduct.observation ? destinyProduct.observation : ''}
                        lote={destinyProduct.subProduct!.lote!}
                        validade={destinyProduct.subProduct!.validade!}
                        quantity={destinyProduct.subProduct?.quantity!}
                        unit={destinyProduct.unit}
                    />
                }
            </div>

            <div style={{ width: 'fit-content', margin: '40px auto' }}>
                <SignOperation
                    show={true}
                    handleSubmit={handleOnConclude}
                    buttonText='Concluir'
                />
            </div>

        </>
    )
}
