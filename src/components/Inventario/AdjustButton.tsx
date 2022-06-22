import { useEffect, useState } from "react"
import { useAppDispatch } from "../../app/hooks"
import { createAdjustStock } from "../../features/adjustStock/adjustStock"
import { TMessage } from "../../types/TMessage"
import Mensagem from "../UI/Mensagem"
import Button from "../UI/Button"

type Props = {
    subProduct: any
}

export default function AdjustButton({ subProduct }: Props) {

    const dispatch = useAppDispatch()
    const [text, setText] = useState('Ajustar')
    const [message, setMessage] = useState<TMessage>()

    useEffect(() => {

    }, [])

    const handleOnClick = async () => {
        if (text === 'Ajustar') {
            setText('Carregando')
            console.log(subProduct)

            try {
                await dispatch(createAdjustStock({
                    product_id: subProduct.product_id,
                    quantity: subProduct.inventory,
                    subproduct_id: subProduct.id
                })).unwrap()
                setText('Ajustado')
            } catch (error) {
                setText('Erro')
            }
        }
    }

    return (
        <>
            {message && <Mensagem onClick={() => setMessage(null)} message={message} />}
            <Button
                style={{ padding: '5px 10px', marginRight: '10px' }}
                bg={text === 'Erro' ? 'red' : text === 'Ajustado' ? 'green' : 'blue'}
                text={text}
                onClick={handleOnClick}
            />
        </>
    )
}
