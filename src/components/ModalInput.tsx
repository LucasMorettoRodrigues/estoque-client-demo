import { ChangeEvent } from "react"
import styled from "styled-components"
import Input from "./Input"

const Container = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background-color: #00000084;
    z-index: 100;
`
const Title = styled.h2`
    color: #ff3232;
    margin-bottom: 15px;
`
const Wrapper = styled.div`
    display: flex;
    height: 100vh;
    align-items: center;
    justify-content: center;
`
const Box = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 320px;
    justify-content: center;
    border-radius: 15px;
    background-color: white;
    padding: 20px;
`
const ErrorsContainer = styled.div`
    margin-bottom: 10px;
    >p {
        font-size: 14px;
    }
`
const Button = styled.button<{ bg: string }>`
    background-color: ${props => props.bg};
    color: white;
    border: none;
    margin: 0 10px;
    padding: 10px 30px;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;

    &:hover {
        opacity: 0.95;
    }
`
const ButtonContainer = styled.div`
    margin-top: 15px;
    display: flex;
    justify-content: center;
`

type Props = {
    title: string,
    message: string,
    placeholder: string,
    onConfirm: () => void,
    onClose?: () => void
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void
}

export default function ModalInput({ title, message, placeholder, onConfirm, onClose, onChange }: Props) {
    return (
        <Container>
            <Wrapper>
                <Box>
                    <Title>{title}</Title>
                    <ErrorsContainer>
                        <p>{message}</p>
                    </ErrorsContainer>
                    <Input onChange={onChange} required name='input' placeholder={placeholder}></Input>
                    <ButtonContainer>
                        <Button bg={'#ff3232'} onClick={onClose}>Cancelar</Button>
                        <Button bg={'#3dc73d'} onClick={onConfirm}>Confirmar</Button>
                    </ButtonContainer>
                </Box>
            </Wrapper>
        </Container>
    )
}
