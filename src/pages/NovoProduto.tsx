import { useState, FormEvent, ChangeEvent } from "react"
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

export default function NovoProduto() {

    const [name, setName] = useState('')
    const [category, setCategory] = useState('')
    const [unit, setUnit] = useState('')
    const [quantity, setQuantity] = useState(0)

    const handleOnSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        console.log(name, category, unit, quantity);
    }

    return (
        <Container>
            <Wrapper>
                <Title>Novo Produto</Title>
                <form onSubmit={handleOnSubmit}>
                    <Input
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
                        name={'name'}
                        label={'Name'}
                        required
                    />
                    <Input
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setCategory(e.target.value)}
                        name={'categoria'}
                        label={'Categoria'}
                    />
                    <Input
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setUnit(e.target.value)}
                        name={'unidade'}
                        label={'Unidade'}
                    />
                    <Input
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setQuantity(parseInt(e.target.value))}
                        name={'quantidade'}
                        label={'Quantidade'}
                        type='number'
                        min={0}
                    />
                    <Button text={'Cadastrar Produto'} />
                </form>
            </Wrapper>
        </Container>
    )
}
