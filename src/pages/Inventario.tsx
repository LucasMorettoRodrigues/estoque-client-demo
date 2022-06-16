import styled from "styled-components"
import { useAppSelector } from "../app/hooks"

import Title from "../components/UI/Title"
import ListHeader from "../components/List/ListHeader"
import Item from "../components/List/Item"
import ItemsContainer from "../components/List/ItemsContainer"
import { formatValidity } from "../utils/functions"
import { useEffect, useState } from "react"
import SignOperation from "../components/Actions/SignOperation"
import { TProduct } from "../types/TProduct"
import Mensagem from "../components/Mensagem"
import { TMessage } from "../types/TMessage"

const Container = styled.div``
const HeaderContainer = styled.div`
    display: flex;
    z-index: 1;
    position: sticky;
    top: 0;
`
const Label = styled.label`
    margin-left: auto;
    font-size: 12px;
`
const InputQuantidade = styled.input`
    padding: 6px;
    border-radius: 5px;
    width: 80px;
    border: 2px solid #e6e6e6;
    outline-color: lightblue;
    margin-left: 10px;
    margin-right: 20px;
`
const InputJustification = styled.input`
    padding: 6px;
    border-radius: 5px;
    width: 20%;
    border: 2px solid #e6e6e6;
    outline-color: lightblue;
    margin-left: 10px;
    margin-right: 20px;
`

export default function Inventario() {

    const productsData = useAppSelector(state => state.produto.produtos)

    const [products, setProducts] = useState<TProduct[]>([])
    const [verifiedStock, setVerifiedStock] = useState<any>({})
    const [divergentItemsList, setDivergentItemsList] = useState<number[]>([])
    const [message, setMessage] = useState<TMessage>(null)
    const [submissionCounter, setSubmissionCounter] = useState(0)

    useEffect(() => {

        let products = productsData.filter(i => i.hide === false && i.subproducts!.length > 0)

        if (divergentItemsList.length > 0) {
            products = products.map(i => ({ ...i, subproducts: i.subproducts?.filter(j => divergentItemsList.includes(j.id)) }))
            products = products.filter(i => i.subproducts!.length > 0)
        }

        setProducts(products)

    }, [productsData, divergentItemsList])

    const systemStock: any = {}
    productsData.forEach((product) => {
        product.subproducts && product.subproducts.forEach((subproduct) => {
            systemStock[subproduct.id] = subproduct.quantity
        })
    })

    const submitInventory = () => {
        if (!isValidated()) return

        if (submissionCounter === 0) firstSubmition()
        if (submissionCounter === 1) secoundSubmition()
        if (submissionCounter === 2) thirdSubmition()
    }

    const firstSubmition = () => {
        const divergentItems = getDivergentItems()

        if (divergentItems.length === 0) {
            sendInventory()
        }

        setDivergentItemsList(divergentItems)
        setMessage({
            title: 'Atenção',
            message: `${divergentItems.length} items apresentaram divergência. Confira o estoque novamente por favor.`
        })
        setSubmissionCounter(1)
    }

    const secoundSubmition = () => {
        const divergentItems = getDivergentItems()

        if (divergentItems.length === 0) {
            sendInventory()
        }

        setDivergentItemsList(divergentItems)
        setSubmissionCounter(2)
        setMessage({
            title: 'Atenção',
            message: `${divergentItems.length} items ainda apresentam divergência. 
                Verifique a quantidade no sistema e justifique a divergência.`
        })
    }

    const thirdSubmition = () => {
        sendInventory()
    }

    const sendInventory = () => {

        if (!justificationIsValid()) {
            return setMessage({ title: 'Erro', message: 'Por favor preencha todos os campos.' })
        }

        const data = productsData.slice().map(item => (
            {
                ...item, subproducts:
                    item.subproducts!.map(subitem => (
                        {
                            ...subitem,
                            inventory: verifiedStock[subitem.id].inventory,
                            justification: verifiedStock[subitem.id].justification
                        }
                    ))
            }
        ))

        setMessage({ title: 'Sucesso', message: 'O inventário foi submetido.' })
        console.log('ak', data)
    }

    const justificationIsValid = () => {
        for (const value of divergentItemsList) {
            if (!verifiedStock[value].justification) {
                return false
            }
        }
        return true
    }

    const isValidated = () => {
        if (Object.keys(verifiedStock).length !== Object.keys(systemStock).length) {
            setMessage({ title: 'Erro', message: 'Por favor preencha todos os campos.' })
            return false
        }
        return true
    }

    const getDivergentItems = () => {
        const divergentItems: number[] = []

        for (const [key,] of Object.entries(systemStock)) {
            if (systemStock[key] !== verifiedStock[key].inventory) {
                divergentItems.push(Number(key))
            }
        }

        return divergentItems
    }

    return (
        <>
            {message && <Mensagem onClick={() => setMessage(null)} message={message} />}
            <Title title='Inventario' />
            <HeaderContainer>
                <ListHeader fontSize='12px'>
                    <Item width="26px" text='Id' fontSize='12px' />
                    <Item flex={3} text='Produto' fontSize='12px' />
                    <Item flex={2} text='Observação' fontSize='12px' />
                    <Item width="90px" text='Código' fontSize='12px' />
                    <Item width="90px" text='Categoria' fontSize='12px' />
                    <Item width="180px" text='Marca' fontSize='12px' />
                    <Item width="65px" text='Unidade' fontSize='12px' />
                </ListHeader>
            </HeaderContainer>

            {
                products.map((item) => (
                    <Container key={item.id}>
                        <div style={{ display: 'flex' }}>
                            <ItemsContainer>
                                <Item width="26px" text={item.id} fontSize='12px' />
                                <Item flex={3} text={item.name} fontSize='12px' />
                                <Item flex={2} text={item.observation} fontSize='12px' />
                                <Item width="90px" text={item.code} fontSize='12px' />
                                <Item width="90px" text={item.category} fontSize='12px' />
                                <Item width="180px" text={item.brand} fontSize='12px' />
                                <Item width="65px" text={item.unit} fontSize='12px' />
                            </ItemsContainer>
                        </div>

                        {item.subproducts &&
                            item.subproducts.map((subitem) => (
                                <ItemsContainer
                                    type="subItem"
                                    bg='#eef7ff'
                                    key={subitem.id}
                                >
                                    <Item width='160px' color='#3142a0' text={`Lote: ${subitem.lote}`} />
                                    <Item width='160px' color='#3142a0' text={`Validade: ${formatValidity(subitem.validade)}`} />
                                    {submissionCounter === 2
                                        ? <>
                                            <Item width='100px' color='#ff0000' text={`Qtd (sis): ${subitem.quantity}`} />
                                            <Item width='100px' color='#ff0000' text={`Qtd (inv): ${verifiedStock[subitem.id].inventory}`} />
                                            <Label>Justificativa:</Label>
                                            <InputJustification
                                                type='text'
                                                onChange={(e) => setVerifiedStock({ ...verifiedStock, [subitem.id]: { ...verifiedStock[subitem.id], justification: e.target.value } })}
                                            />
                                        </>
                                        : <>
                                            <Label>Em estoque:</Label>
                                            <InputQuantidade
                                                type='number'
                                                min='0'
                                                onChange={(e) => setVerifiedStock({ ...verifiedStock, [subitem.id]: { inventory: Number(e.target.value) } })}
                                            />
                                        </>
                                    }
                                </ItemsContainer>
                            ))
                        }
                    </Container>
                ))
            }
            <div style={{ margin: '30px 0' }}>
                <SignOperation show={true} handleSubmit={submitInventory} />
            </div>
        </>
    )
}
