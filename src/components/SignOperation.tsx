import { useEffect, useState } from 'react'
import styled from 'styled-components'
import Button from './Button'
import Input from './Input'

const Container = styled.div`
    display: flex;
    align-items: center;
`
const InputContainer = styled.div`
    margin-right: 10px;
`

type Props = {
    show: boolean,
    handleSubmit: (user: string, password: string) => void
}

export default function SignOperation({show, handleSubmit}: Props) {

    const [user, setUser] = useState('')
    const [password, setPassword] = useState('')

    useEffect(() => {
        setUser('')
        setPassword('')
    }, [show])

    return (
        <>
            { show && 
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
                        onClick={() => handleSubmit(user, password)}
                        text={'Finalizar Retirada'}
                        style={{ padding: '12px 24px', alignSelf: 'flex-end' }}
                    />
                </Container>
            }
        </>
    )
}
