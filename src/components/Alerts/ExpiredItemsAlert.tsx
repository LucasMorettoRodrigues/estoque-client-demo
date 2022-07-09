import { useEffect, useState } from "react"
import { useAppSelector } from "../../app/hooks"
import { TMessage } from "../../types/TMessage"
import { TSubProduct } from "../../types/TSubProduct"
import Mensagem from "../UI/Mensagem"
import ValidityInfoItem from "./AlertItem"

interface AlertList extends TSubProduct {
    product: string
}

type AlertItems = {
    expired: AlertList[],
    toExpire: AlertList[]
}

export default function ExpiredItemsAlert() {

    const products = useAppSelector(state => state.product.products)

    const [message, setMessage] = useState<TMessage>(null)
    const [alertItems, setAlertItems] = useState<AlertItems>({ expired: [], toExpire: [] })

    useEffect(() => {
        const today = new Date()
        const following7Day = new Date(today.getTime() + 7 * 86400000); // + 1 day in ms
        following7Day.toLocaleDateString();
        const alertItemsAux: AlertItems = { expired: [], toExpire: [] }

        products.forEach(product => {
            product.subproducts?.forEach(subproduct => {
                if (subproduct.validade) {
                    if (new Date(subproduct.validade.slice(0, 10)) < today) {
                        alertItemsAux.expired.push({ ...subproduct, product: product.name })
                    }
                    else if (new Date(subproduct.validade.slice(0, 10)) < following7Day) {
                        alertItemsAux.toExpire.push({ ...subproduct, product: product.name })
                    }
                }
            })
        })

        if (alertItemsAux.expired.length > 0 || alertItemsAux.toExpire.length > 0) {
            setAlertItems(alertItemsAux)

            setMessage({
                title: 'Atenção',
                message: ``
            })
        }
    }, [products])

    return (
        <>
            {message &&
                <Mensagem width='650px' onClick={() => setMessage(null)} message={message} >
                    <div style={{ overflowY: 'auto', maxHeight: '60vh' }}>
                        <div style={{ fontSize: '14px', marginBottom: '20px' }}>
                            {alertItems.expired.length > 0 && <p style={{ marginLeft: '2px' }}>Produto(s) vencido(s) no estoque:</p>}
                            {alertItems.expired.map((i: any) => (
                                <ValidityInfoItem bColor="rgb(255, 162, 162)" product={i.product} lote={i.lote} validity={`${i.validade.slice(8, 10)}/${i.validade.slice(5, 7)}`} />
                            ))}
                        </div>
                        <div style={{ fontSize: '14px' }}>
                            {alertItems.toExpire.length > 0 && <p style={{ marginLeft: '2px' }}>Produto(s) com data de validade próxima:</p>}
                            {alertItems.toExpire.map((i: any) => (
                                <ValidityInfoItem bColor="#fffd80" product={i.product} lote={i.lote} validity={`${i.validade.slice(8, 10)}/${i.validade.slice(5, 7)}`} />
                            ))}
                        </div>
                    </div>
                </Mensagem>}
        </>
    )

}
