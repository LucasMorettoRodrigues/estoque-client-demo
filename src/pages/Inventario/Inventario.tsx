import styled from "styled-components"
import { useAppDispatch, useAppSelector } from "../../app/hooks"

import Title from "../../components/UI/Title"
import ListHeader from "../../components/List/ListHeader"
import Item from "../../components/List/Item"
import ItemsContainer from "../../components/List/ItemsContainer"
import { formatValidity } from "../../utils/functions"
import { useEffect, useState } from "react"
import SignOperation from "../../components/Actions/SignOperation"
import { TProduct } from "../../types/TProduct"
import Mensagem from "../../components/UI/Mensagem"
import { TMessage } from "../../types/TMessage"
import { createNotification } from "../../features/notification/notificationSlice"
import Modal from "../../components/UI/Modal"
import { useNavigate } from "react-router-dom"

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
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const [products, setProducts] = useState<TProduct[]>([])
    const [verifiedStock, setVerifiedStock] = useState<any>({})
    const [divergentItemsList, setDivergentItemsList] = useState<number[]>([])
    const [message, setMessage] = useState<TMessage>(null)
    const [submissionCounter, setSubmissionCounter] = useState(0)
    const [modalIsOpen, setModalIsOpen] = useState(true)
    const [category, setCategory] = useState<string[]>([])
    const [systemStock, setSystemStock] = useState<any>({})

    useEffect(() => {

        if (category.length > 0) {
            let products = productsData.filter(i => i.hide === false && i.subproducts!.length > 0)
            products = productsData.filter(i => category.includes(i.category))

            if (divergentItemsList.length > 0) {
                products = products.map(i => ({ ...i, subproducts: i.subproducts?.filter(j => divergentItemsList.includes(j.id)) }))
                products = products.filter(i => i.subproducts!.length > 0)
            }

            setProducts(products)
        }

    }, [productsData, divergentItemsList, category])

    useEffect(() => {
        if (category.length > 0) {
            const systemStockObj: any = {}
            productsData.filter(i => category.includes(i.category)).forEach((product) => {
                product.subproducts && product.subproducts.forEach((subproduct) => {
                    systemStockObj[subproduct.id] = subproduct.quantity
                })
            })
            setSystemStock(systemStockObj)
        }
    }, [category, productsData])

    const submitInventory = (username: string, password: string) => {
        if (!isValidated()) return

        const divergentItems = getDivergentItems()

        if (divergentItems.length === 0 || submissionCounter === 2) {
            return sendInventory(username, password)
        }

        setDivergentItemsList(divergentItems)

        if (submissionCounter === 0) {
            setMessage({
                title: 'Atenção',
                message: `${divergentItems.length} itens apresentaram divergência. 
                Confira novamente o estoque dos itens a seguir por favor.`
            })
            setSubmissionCounter(1)
            let newVerifiedStock = { ...verifiedStock }
            divergentItems.forEach(i => delete newVerifiedStock[i])
            Array.from(document.querySelectorAll("input")).forEach(
                input => (input.value = '')
            );
            setVerifiedStock(newVerifiedStock)
        }

        if (submissionCounter === 1) {
            setMessage({
                title: 'Atenção',
                message: `${divergentItems.length} itens ainda apresentam divergência. 
                Compare com a quantidade no sistema e justifique a divergência.`
            })
            setSubmissionCounter(2)
        }
    }

    const sendInventory = async (username: string, password: string) => {

        if (submissionCounter === 2 && !justificationIsValid()) {
            return setMessage({ title: 'Erro', message: 'Por favor preencha todas as justificativas.' })
        }

        if (!username || !password) {
            return setMessage({ title: 'Erro', message: 'Por favor preencha o usuário e senha.' })
        }

        const data = productsData.filter(i => category.includes(i.category)).slice().map(item => (
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

        try {
            await dispatch(createNotification({
                notification: { description: 'Inventário', data },
                username,
                password
            })).unwrap()
            setMessage({ title: 'Sucesso', message: 'O inventário foi submetido.' })
        } catch (error) {
            console.log(error)
            setMessage({ title: 'Erro', message: 'Não foi possivel concluir a ação.' })
        }
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

    const selectCategory = (category: string[]) => {
        setCategory(category)
        setModalIsOpen(false)
    }

    const handleMessageClick = (title: string) => {
        if (title === "Sucesso") {
            navigate('/inserir')
        }

        setMessage(null)
    }

    return (
        <>
            {modalIsOpen && <Modal selectCategory={selectCategory} />}
            {message && <Mensagem onClick={handleMessageClick} message={message} />}
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
                                            <Label>Contagem:</Label>
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
                <SignOperation show={true} handleSubmit={submitInventory} buttonText='Submeter Inventário' />
            </div>
        </>
    )
}
