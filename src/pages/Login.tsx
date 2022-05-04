import { FormEvent, useState } from "react"
import styled from "styled-components"
import Button from "../components/Button"
import Form from "../components/Form"
import Input from "../components/Input"
import { login } from "../services/auth.service"

const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 80vh;
`
const Wrapper = styled.div`
    background-color: white;
    max-width: 400px;
    padding: 30px 30px 10px 30px;
    box-shadow: rgba(0, 0, 0, 0.15) 0px 5px 15px 0px;
`
const Title = styled.h2`
    margin-bottom: 20px;
    text-align: center;
`
const Message = styled.div`
    width: 100%;
    padding: 15px;
    margin-bottom: 20px;
    background-color: #ffc1c1;
    color: #ff3333;
    border-radius: 5px;
    font-size: 14px;
`
const InputContainer = styled.div`
    margin-bottom: 20px;
    width: 100%;
`

const Login = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()

        if (!email || !password) return setError("Preencha todos os campos.")

        try {
            await login(email, password)
            window.location.href = "/produtos";
        } catch (error: any) {
            setError(error.response.data)
        }
    }

    return (
        <Container>
            <Wrapper>
                <Title>Login</Title>
                {error && <Message>{error}</Message>}
                <Form onSubmit={handleSubmit}>
                    <InputContainer>
                        <Input
                            name="email"
                            label="Email"
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </InputContainer>
                    <InputContainer>
                        <Input
                            type="password"
                            name="password"
                            label="Senha"
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </InputContainer>
                    <Button text="Entrar" style={{ width: '100%' }} />
                </Form>
            </Wrapper>
        </Container>
    )
}

export default Login
