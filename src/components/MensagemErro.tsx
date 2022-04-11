import styled from "styled-components"

const Container = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background-color: #00000084;
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
    margin-bottom: 20px;

    >p {
        font-size: 14px;
    }
`
const Button = styled.button`
    background-color: #3dc73d;
    color: white;
    border: none;
    padding: 10px 30px;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;

    &:hover {
        background-color: #19c219;
    }
`

type Props = {
    errors: string[]
    onClick: () => void
}

export default function MensagemErro({ errors, onClick }: Props) {
    return (
        <Container>
            <Wrapper>
                <Box>
                    <Title>Erro</Title>
                    <ErrorsContainer>
                        {errors.map(item => (
                            <p>{item}</p>
                        ))}
                    </ErrorsContainer>
                    <Button onClick={onClick}>OK</Button>
                </Box>
            </Wrapper>
        </Container>
    )
}
