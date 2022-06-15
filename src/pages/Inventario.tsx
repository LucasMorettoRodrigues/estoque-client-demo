import styled from "styled-components"
import { useAppSelector } from "../app/hooks"

import Title from "../components/UI/Title"
import ListHeader from "../components/List/ListHeader"
import Item from "../components/List/Item"
import ItemsContainer from "../components/List/ItemsContainer"
import { formatValidity } from "../utils/functions"
import { useState } from "react"
import SignOperation from "../components/Actions/SignOperation"

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

export default function Inventario() {

    const [verifiedStock, setVerifiedStock] = useState<any>({})

    const products = useAppSelector(state => state.produto.produtos.filter(i => i.hide === false))
    const systemStock: any = {}
    products.forEach((product) => {
        product.subproducts && product.subproducts.forEach((subproduct) => {
            systemStock[subproduct.id] = subproduct.quantity
        })
    })
    products.forEach((product) => {
        product.subproducts && product.subproducts.forEach((subproduct) => {
            systemStock[subproduct.id] = subproduct.quantity
        })
    })

    const handleSubmit = () => {
        if (!isValidated()) return

        for (const [key,] of Object.entries(systemStock)) {
            if (systemStock[key] === verifiedStock[key]) {
                console.log(key, 'esta correto.')
            } else {
                console.log(key, '')
            }
        }
    }

    const isValidated = () => {
        if (JSON.stringify(Object.keys(verifiedStock).sort()) !== JSON.stringify(Object.keys(systemStock).sort())) {
            console.log('Preencha todos os campos.')
            return false
        }

        return
    }

    return (
        <>
            {console.log(verifiedStock)}
            {console.log(systemStock)}
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
                    <Item width="65px" text='Estoque' align='center' fontSize='12px' />
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
                                <Item width="65px" text={item.stock} align='center' fontSize='12px' />
                            </ItemsContainer>
                        </div>

                        {item.subproducts &&
                            item.subproducts.map((subitem) => (
                                <ItemsContainer
                                    type="subItem"
                                    bg='#eef7ff'
                                    key={subitem.id}
                                >
                                    <div style={{ marginLeft: '60px' }}>
                                        <Item width='160px' color='#3142a0' text={`Lote: ${subitem.lote}`} />
                                    </div>
                                    <Item width='160px' color='#3142a0' text={`Validade: ${formatValidity(subitem.validade)}`} />
                                    <Item width='100px' color='#3142a0' text={`Qtd: ${subitem.quantity}`} />
                                    <Label>Em estoque:</Label>
                                    <InputQuantidade
                                        type='number'
                                        min='0'
                                        onChange={(e) => setVerifiedStock({ ...verifiedStock, [subitem.id]: Number(e.target.value) })}
                                    />
                                </ItemsContainer>
                            ))
                        }
                    </Container>
                ))
            }
            <div style={{ margin: '30px 0' }}>
                <SignOperation show={true} handleSubmit={handleSubmit} />
            </div>
        </>
    )
}
