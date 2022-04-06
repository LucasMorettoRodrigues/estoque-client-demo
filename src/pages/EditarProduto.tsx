import { useState, FormEvent, ChangeEvent } from "react"
import { useLocation } from "react-router-dom"
import styled from "styled-components"
import Button from "../components/Button"
import Input from "../components/Input"

const Container = styled.div``
const Wrapper = styled.div`
    max-width: 1300px;
    margin: 0 auto;
    padding: 40px 20px;
`
const Title = styled.h1`
    margin-bottom: 20px;
`

type stateType = {
    id: number,
    name: string,
    category: string,
    unit: string,
    quantity: number
}

export default function EditarProduto() {

    const location = useLocation()
    const produto = location.state as stateType;

    const [name, setName] = useState(produto.name)
    const [category, setCategory] = useState(produto.category)
    const [unit, setUnit] = useState(produto.unit)
    const [quantity, setQuantity] = useState(produto.quantity)

    const handleOnSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        console.log(name);
    }

    return (
        <Container>
            <Wrapper>
                <Title>Editar Produto</Title>
                <form onSubmit={handleOnSubmit}>
                    <Input
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
                        name={'name'}
                        label={'Name'}
                        value={name}
                        required
                    />
                    <Input
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setCategory(e.target.value)}
                        name={'categoria'}
                        label={'Categoria'}
                        value={category}
                    />
                    <Input
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setUnit(e.target.value)}
                        name={'unidade'}
                        label={'Unidade'}
                        value={unit}
                    />
                    <Input
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setQuantity(parseInt(e.target.value))}
                        name={'quantidade'}
                        label={'Quantidade'}
                        type='number'
                        value={quantity}
                        min={0}
                    />
                    <Button text={'Editar Produto'} />
                </form>
            </Wrapper>
        </Container>
    )
}
