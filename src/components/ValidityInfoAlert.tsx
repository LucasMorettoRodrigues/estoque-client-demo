import { useEffect, useState } from "react"
import { useAppSelector } from "../app/hooks"
import { TMessage } from "../types/TMessage"
import { TSubProduct } from "../types/TSubProduct"
import Mensagem from "./UI/Mensagem"

export default function ValidityInfoAlert() {

    const products = useAppSelector(state => state.produto.produtos)

    const [message, setMessage] = useState<TMessage>(null)
    const [alertItems, setAlertItems] = useState<{ vencidos: any, avencer: any }>({ vencidos: [], avencer: [] })
    // const alertItems: { vencidos: any, avencer: any } = { vencidos: [], avencer: [] }

    useEffect(() => {
        const today = new Date()
        const following7Day = new Date(today.getTime() + 7 * 86400000); // + 1 day in ms
        following7Day.toLocaleDateString();
        const alertItemsAux: { vencidos: any, avencer: any } = { vencidos: [], avencer: [] }

        products.forEach(product => {
            product.subproducts?.forEach(subproduct => {
                if (subproduct.validade) {
                    if (new Date(subproduct.validade.slice(0, 10)) < today) {
                        alertItemsAux.vencidos.push({ ...subproduct, product: product.name })
                    }
                    else if (new Date(subproduct.validade.slice(0, 10)) < following7Day) {
                        alertItemsAux.avencer.push({ ...subproduct, product: product.name })
                    }
                }
            })
        })

        setAlertItems(alertItemsAux)

        setMessage({
            title: 'Atenção',
            message: ``
        })

    }, [products])

    return (
        <>
            {console.log(alertItems)}
            {message &&
                <Mensagem width='500px' onClick={() => setMessage(null)} message={message} >
                    {alertItems.vencidos.length > 0 && <p>Produtos vencidos:</p>}
                    {alertItems.vencidos.map((i: any) => (
                        <div style={{ backgroundColor: 'lightgray', margin: '5px', fontSize: '14px' }}>
                            <p style={{ flex: '5', margin: '2px' }}>{i.product}</p>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <p style={{ margin: '2px' }}>Lote: {i.lote}</p>
                                <p style={{ margin: '2px' }}>Validade: {i.validade.slice(0, 10)}</p>
                            </div>
                        </div>
                    ))}

                    {alertItems.avencer.length > 0 && <p>Produtos com data de validade pŕoxima:</p>}

                    {alertItems.avencer.map((i: any) => (
                        <div style={{ backgroundColor: 'lightgray', margin: '5px', fontSize: '14px' }}>
                            <p style={{ flex: '5', margin: '2px' }}>{i.product}</p>
                            <div style={{ display: 'flex', width: '100%', justifyContent: 'space-between' }}>
                                <p style={{ margin: '2px' }}>Lote: {i.lote}</p>
                                <p style={{ margin: '2px' }}>Validade: {i.validade.slice(0, 10)}</p>
                            </div>
                        </div>
                    ))}
                </Mensagem>}
        </>
    )

}
