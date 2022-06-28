import { useEffect, useState } from 'react'
import styled from 'styled-components'
import Button from '../UI/Button'
import Input from '../UI/Input'

const Container = styled.div`
    display: flex;
    align-items: center;
`
const InputContainer = styled.div`
    margin-right: 10px;
`
const Error = styled.p`
    color: red;
    font-size: 12px;
    margin: 10px 5px;
`

type Props = {
    show: boolean,
    handleSubmit: (user: string, password: string) => void
    buttonText?: string
}

export default function SignOperation({ show, handleSubmit, buttonText }: Props) {

    const [user, setUser] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(false)

    useEffect(() => {
        setUser('')
        setPassword('')
    }, [show])

    const handleOnClick = () => {
        if (!user || !password) {
            return setError(true)
        }

        error && setError(false)

        handleSubmit(user, password)
    }

    return (
        <>
            {show &&
                <Container>
                    <InputContainer>
                        <Input
                            onChange={(e) => setUser(e.target.value)}
                            type="text"
                            name="user"
                            value={user}
                            label="Usuario"
                            display="flex"
                            style={{ maxWidth: '250px' }}
                        />
                    </InputContainer>
                    <InputContainer>
                        <Input
                            onChange={(e) => setPassword(e.target.value)}
                            type="password"
                            name="sign"
                            value={password}
                            label="Senha"
                            display="flex"
                            style={{ maxWidth: '250px' }}
                        />
                    </InputContainer>
                    <Button
                        onClick={handleOnClick}
                        text={buttonText ? buttonText : 'Finalizar Retirada'}
                        style={{ padding: '12px 24px', alignSelf: 'flex-end' }}
                    />
                </Container>
            }
            {show && error && <Error>Por favor, digite o usuário e senha.</Error>}
        </>
    )
}
