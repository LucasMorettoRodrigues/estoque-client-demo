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
    lote: string,
    validade: string
}

export default function EditarSubProduto() {

    const location = useLocation()
    const subproduto = location.state as stateType;

    const [lote, setLote] = useState(subproduto.lote)
    const [validade, setValidade] = useState(subproduto.validade.slice(0, 10))

    const handleOnSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
    }

    return (
        <Container>
            <Wrapper>
                <Title>Editar Produto</Title>
                <form onSubmit={handleOnSubmit}>
                    <Input
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setLote(e.target.value)}
                        name={'lote'}
                        label={'Lote'}
                        value={lote}
                        required
                    />
                    <Input
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setValidade(e.target.value)}
                        name={'validade'}
                        label={'Validade'}
                        type='date'
                        value={validade}
                    />
                    <Button text={'Editar Produto'} />
                </form>
            </Wrapper>
        </Container>
    )
}
